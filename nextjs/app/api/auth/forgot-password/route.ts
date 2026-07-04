import { NextRequest } from 'next/server';
import crypto from 'crypto';
import { connectDB } from '@/lib/db';
import User from '@/lib/models/User';
import { rateLimit } from '@/lib/rateLimit';

export async function POST(request: NextRequest) {
  const ip = request.headers.get('x-forwarded-for') ?? 'unknown';
  const { allowed } = rateLimit(`forgot:${ip}`, { max: 5, windowMs: 15 * 60 * 1000 });
  if (!allowed) {
    return Response.json(
      { message: 'Too many attempts — please try again in 15 minutes' },
      { status: 429 }
    );
  }

  try {
    const { email } = await request.json();
    if (!email) {
      return Response.json({ message: 'Email is required' }, { status: 400 });
    }

    const genericMsg = {
      message: 'If that email is registered you will receive a reset link shortly',
    };

    await connectDB();

    const user = await User.findOne({ email: email.toLowerCase() }).select(
      '+passwordResetToken +passwordResetExpires'
    );

    if (!user) return Response.json(genericMsg);
    if (user.authProvider === 'google') {
      return Response.json({
        message: 'This account uses Google Sign-In — no password to reset',
      });
    }

    const rawToken = crypto.randomBytes(32).toString('hex');
    const hashedToken = crypto.createHash('sha256').update(rawToken).digest('hex');

    user.passwordResetToken = hashedToken;
    user.passwordResetExpires = Date.now() + 60 * 60 * 1000; // 1 hour
    await user.save({ validateBeforeSave: false });

    const resetURL = `${process.env.NEXT_PUBLIC_APP_URL || 'https://reactdevmastery.com'}/reset-password/${rawToken}`;

    try {
      const { Resend } = await import('resend');
      const resend = new Resend(process.env.RESEND_API_KEY);

      await resend.emails.send({
        from: 'ReactDevMastery <noreply@reactdevmastery.com>',
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
            <p style="color:#4b5563;font-size:12px;margin-top:32px">If you didn't request this, you can safely ignore this email.</p>
          </div>
        `,
      });
    } catch (emailErr: any) {
      user.passwordResetToken = undefined;
      user.passwordResetExpires = undefined;
      await user.save({ validateBeforeSave: false });
      console.error('Email send failed:', emailErr.message);
      return Response.json(
        { message: 'Failed to send reset email — please try again' },
        { status: 500 }
      );
    }

    return Response.json(genericMsg);
  } catch (err: any) {
    console.error('[forgot-password]', err);
    return Response.json({ message: 'Server error' }, { status: 500 });
  }
}
