import { NextRequest } from 'next/server';
import crypto from 'crypto';
import { connectDB } from '@/lib/db';
import User from '@/lib/models/User';
import { rateLimit } from '@/lib/rateLimit';

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ token: string }> }
) {
  const ip = request.headers.get('x-forwarded-for') ?? 'unknown';
  const { allowed } = rateLimit(`reset:${ip}`, { max: 5, windowMs: 15 * 60 * 1000 });
  if (!allowed) {
    return Response.json(
      { message: 'Too many attempts — please try again in 15 minutes' },
      { status: 429 }
    );
  }

  try {
    const { token } = await params;
    const { password } = await request.json();

    if (!password || password.length < 8) {
      return Response.json(
        { message: 'Password must be at least 8 characters' },
        { status: 400 }
      );
    }

    const hashedToken = crypto.createHash('sha256').update(token).digest('hex');

    await connectDB();

    const user = await User.findOne({
      passwordResetToken: hashedToken,
      passwordResetExpires: { $gt: Date.now() },
    }).select('+passwordResetToken +passwordResetExpires +refreshTokens');

    if (!user) {
      return Response.json(
        { message: 'Reset link is invalid or has expired' },
        { status: 400 }
      );
    }

    user.password = password;
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    user.refreshTokens = [];
    await user.save();

    return Response.json({ message: 'Password reset successful — you can now log in' });
  } catch (err: any) {
    console.error('[reset-password]', err);
    return Response.json({ message: 'Server error' }, { status: 500 });
  }
}
