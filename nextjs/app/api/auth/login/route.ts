import { NextRequest } from 'next/server';
import { connectDB } from '@/lib/db';
import User from '@/lib/models/User';
import { generateAccessToken, generateRefreshToken, setRefreshCookie } from '@/lib/jwt';
import { rateLimit } from '@/lib/rateLimit';

async function sendAuthResponse(user: any) {
  user.updateStreak();
  await user.save();

  const accessToken = generateAccessToken(user._id.toString());
  const refreshToken = generateRefreshToken(user._id.toString());

  user.refreshTokens = [...(user.refreshTokens || []), refreshToken].slice(-5);
  await user.save({ validateBeforeSave: false });

  const response = Response.json({ success: true, accessToken, user: user.toPublicJSON() });
  setRefreshCookie(response, refreshToken);
  return response;
}

export async function POST(request: NextRequest) {
  const ip = request.headers.get('x-forwarded-for') ?? 'unknown';
  const { allowed } = rateLimit(`login:${ip}`, { max: 10, windowMs: 15 * 60 * 1000 });
  if (!allowed) {
    return Response.json(
      { message: 'Too many attempts — please try again in 15 minutes' },
      { status: 429 }
    );
  }

  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return Response.json({ message: 'Email and password are required' }, { status: 400 });
    }

    await connectDB();

    const user = await User.findOne({ email: email.toLowerCase() }).select('+password +refreshTokens');
    if (!user) {
      return Response.json({ message: 'Invalid email or password' }, { status: 401 });
    }
    if (user.authProvider === 'google') {
      return Response.json(
        { message: 'This account uses Google Sign-In. Please continue with Google.' },
        { status: 400 }
      );
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return Response.json({ message: 'Invalid email or password' }, { status: 401 });
    }

    return sendAuthResponse(user);
  } catch (err: any) {
    console.error('[login]', err);
    return Response.json({ message: 'Server error' }, { status: 500 });
  }
}
