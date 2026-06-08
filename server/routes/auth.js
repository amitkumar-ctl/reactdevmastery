const express = require('express');
const router = express.Router();
const { OAuth2Client } = require('google-auth-library');
const rateLimit = require('express-rate-limit');
const User = require('../models/User');
const { protect } = require('../middleware/auth');
const {
  generateAccessToken,
  generateRefreshToken,
  verifyRefreshToken,
  setRefreshCookie,
  clearRefreshCookie,
} = require('../config/jwt');

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

// ── Rate limiting ─────────────────────────────────────────────────────
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 min
  max: 10,
  message: { message: 'Too many attempts — please try again in 15 minutes' },
  standardHeaders: true,
  legacyHeaders: false,
});

// ── Helper ────────────────────────────────────────────────────────────
const sendAuthResponse = async (res, user, statusCode = 200) => {
  user.updateStreak();
  await user.save();

  const accessToken = generateAccessToken(user._id);
  const refreshToken = generateRefreshToken(user._id);

  // Store refresh token (keep last 5 devices)
  user.refreshTokens = [...(user.refreshTokens || []), refreshToken].slice(-5);
  await user.save({ validateBeforeSave: false });

  setRefreshCookie(res, refreshToken);

  res.status(statusCode).json({
    success: true,
    accessToken,
    user: user.toPublicJSON(),
  });
};

// ── POST /api/auth/register ───────────────────────────────────────────
router.post('/register', authLimiter, async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: 'Name, email and password are required' });
    }
    if (password.length < 8) {
      return res.status(400).json({ message: 'Password must be at least 8 characters' });
    }

    const existing = await User.findOne({ email: email.toLowerCase() });
    if (existing) {
      return res.status(409).json({ message: 'Email already registered' });
    }

    const user = await User.create({ name, email, password, authProvider: 'local' });
    await sendAuthResponse(res, user, 201);
  } catch (err) {
    next(err);
  }
});

// ── POST /api/auth/login ──────────────────────────────────────────────
router.post('/login', authLimiter, async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    const user = await User.findOne({ email: email.toLowerCase() }).select('+password +refreshTokens');
    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }
    if (user.authProvider === 'google') {
      return res.status(400).json({ message: 'This account uses Google Sign-In. Please continue with Google.' });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    await sendAuthResponse(res, user);
  } catch (err) {
    next(err);
  }
});

// ── POST /api/auth/google ─────────────────────────────────────────────
router.post('/google', authLimiter, async (req, res, next) => {
  try {
    const { credential } = req.body;
    if (!credential) {
      return res.status(400).json({ message: 'Google credential is required' });
    }

    // Verify Google ID token
    const ticket = await client.verifyIdToken({
      idToken: credential,
      audience: process.env.GOOGLE_CLIENT_ID,
    });
    const payload = ticket.getPayload();
    const { sub: googleId, email, name, picture } = payload;

    // Find or create user
    let user = await User.findOne({ $or: [{ googleId }, { email }] }).select('+refreshTokens');

    if (user) {
      // Link Google if logging into an existing email-only account
      if (!user.googleId) {
        user.googleId = googleId;
        user.authProvider = 'google';
        user.avatar = picture || user.avatar;
      }
    } else {
      user = await User.create({
        name,
        email,
        googleId,
        avatar: picture || '',
        authProvider: 'google',
        isVerified: true,
      });
    }

    await sendAuthResponse(res, user);
  } catch (err) {
    if (err.message?.includes('Token used too late')) {
      return res.status(401).json({ message: 'Google session expired — please try again' });
    }
    next(err);
  }
});

// ── POST /api/auth/refresh ────────────────────────────────────────────
router.post('/refresh', async (req, res, next) => {
  try {
    const token = req.cookies?.refreshToken;
    if (!token) {
      return res.status(401).json({ message: 'No refresh token' });
    }

    const decoded = verifyRefreshToken(token);
    const user = await User.findById(decoded.id).select('+refreshTokens');
    if (!user || !user.refreshTokens?.includes(token)) {
      clearRefreshCookie(res);
      return res.status(401).json({ message: 'Invalid refresh token — please login again' });
    }

    // Rotate: remove old, issue new
    user.refreshTokens = user.refreshTokens.filter((t) => t !== token);
    const newRefreshToken = generateRefreshToken(user._id);
    user.refreshTokens.push(newRefreshToken);
    await user.save({ validateBeforeSave: false });

    setRefreshCookie(res, newRefreshToken);
    const accessToken = generateAccessToken(user._id);

    res.json({ success: true, accessToken, user: user.toPublicJSON() });
  } catch (err) {
    clearRefreshCookie(res);
    next(err);
  }
});

// ── POST /api/auth/logout ─────────────────────────────────────────────
router.post('/logout', protect, async (req, res, next) => {
  try {
    const token = req.cookies?.refreshToken;
    const user = await User.findById(req.user._id).select('+refreshTokens');
    if (user && token) {
      user.refreshTokens = (user.refreshTokens || []).filter((t) => t !== token);
      await user.save({ validateBeforeSave: false });
    }
    clearRefreshCookie(res);
    res.json({ success: true, message: 'Logged out successfully' });
  } catch (err) {
    next(err);
  }
});

// ── POST /api/auth/forgot-password ───────────────────────────────────
router.post('/forgot-password', authLimiter, async (req, res, next) => {
  try {
    const { email } = req.body;
    if (!email) return res.status(400).json({ message: 'Email is required' });

    const user = await User.findOne({ email: email.toLowerCase() })
      .select('+passwordResetToken +passwordResetExpires');

    // Always respond the same way — don't reveal if email exists
    const genericMsg = { message: 'If that email is registered you will receive a reset link shortly' };

    if (!user) return res.json(genericMsg);
    if (user.authProvider === 'google') {
      return res.json({ message: 'This account uses Google Sign-In — no password to reset' });
    }

    // Generate a secure random token
    const crypto = require('crypto');
    const rawToken   = crypto.randomBytes(32).toString('hex');
    const hashedToken = crypto.createHash('sha256').update(rawToken).digest('hex');

    user.passwordResetToken   = hashedToken;
    user.passwordResetExpires = Date.now() + 60 * 60 * 1000; // 1 hour
    await user.save({ validateBeforeSave: false });

    // Send email via Resend
    const resetURL = `${process.env.CLIENT_URL}/reset-password/${rawToken}`;

    try {
      const { Resend } = require('resend');
      const resend = new Resend(process.env.RESEND_API_KEY);

      await resend.emails.send({
        from: 'ReactDevMastery <noreply@reactdevmastery.dev>',
        to: user.email,
        subject: 'Reset your password — ReactDevMastery',
        html: `
          <div style="font-family:monospace;max-width:520px;margin:0 auto;background:#060910;color:#e2e8f0;padding:40px;border-radius:12px;border:1px solid #1e2d40">
            <div style="color:#00ff88;font-size:20px;font-weight:700;margin-bottom:8px">⚡ ReactDevMastery</div>
            <h2 style="color:#e2e8f0;margin:24px 0 8px">Reset your password</h2>
            <p style="color:#9ca3af;margin-bottom:24px">Click the button below to set a new password. This link expires in <strong style="color:#eab308">1 hour</strong>.</p>
            <a href="${resetURL}"
               style="display:inline-block;background:linear-gradient(135deg,#00ff88,#4facfe);color:#060910;padding:12px 28px;border-radius:8px;font-weight:700;text-decoration:none;font-size:14px">
              Reset Password →
            </a>
            <p style="color:#4b5563;font-size:12px;margin-top:32px">If you didn't request this, you can safely ignore this email.<br/>Your password won't change until you click the link above.</p>
          </div>
        `,
      });
    } catch (emailErr) {
      // If email fails, clear the token so user can retry
      user.passwordResetToken   = undefined;
      user.passwordResetExpires = undefined;
      await user.save({ validateBeforeSave: false });
      console.error('Email send failed:', emailErr.message);
      return res.status(500).json({ message: 'Failed to send reset email — please try again' });
    }

    res.json(genericMsg);
  } catch (err) {
    next(err);
  }
});

// ── POST /api/auth/reset-password/:token ─────────────────────────────
router.post('/reset-password/:token', authLimiter, async (req, res, next) => {
  try {
    const { password } = req.body;
    if (!password || password.length < 8) {
      return res.status(400).json({ message: 'Password must be at least 8 characters' });
    }

    const crypto = require('crypto');
    const hashedToken = crypto.createHash('sha256').update(req.params.token).digest('hex');

    const user = await User.findOne({
      passwordResetToken:   hashedToken,
      passwordResetExpires: { $gt: Date.now() },
    }).select('+passwordResetToken +passwordResetExpires +refreshTokens');

    if (!user) {
      return res.status(400).json({ message: 'Reset link is invalid or has expired' });
    }

    // Set new password and clear reset fields
    user.password             = password;
    user.passwordResetToken   = undefined;
    user.passwordResetExpires = undefined;
    user.refreshTokens        = []; // invalidate all sessions
    await user.save();

    res.json({ message: 'Password reset successful — you can now log in' });
  } catch (err) {
    next(err);
  }
});


router.get('/me', protect, async (req, res) => {
  res.json({ success: true, user: req.user.toPublicJSON() });
});

module.exports = router;