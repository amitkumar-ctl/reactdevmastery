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

// ── GET /api/auth/me ──────────────────────────────────────────────────
router.get('/me', protect, async (req, res) => {
  res.json({ success: true, user: req.user.toPublicJSON() });
});

module.exports = router;
