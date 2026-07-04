import { NextRequest } from 'next/server';
import { connectDB } from '@/lib/db';
import User from '@/lib/models/User';
import { generateAccessToken, generateRefreshToken, setRefreshCookie } from '@/lib/jwt';
import { rateLimit } from '@/lib/rateLimit';

async function sendAuthResponse(user: any, status = 200) {
  user.updateStreak();
  await user.save();

  const accessToken = generateAccessToken(user._id.toString());
  const refreshToken = generateRefreshToken(user._id.toString());

  user.refreshTokens = [...(user.refreshTokens || []), refreshToken].slice(-5);
  await user.save({ validateBeforeSave: false });

  const response = Response.json(
    { success: true, accessToken, user: user.toPublicJSON() },
    { status }
  );
  setRefreshCookie(response, refreshToken);
  return response;
}

export async function POST(request: NextRequest) {
  const ip = request.headers.get('x-forwarded-for') ?? 'unknown';
  const { allowed } = rateLimit(`register:${ip}`, { max: 10, windowMs: 15 * 60 * 1000 });
  if (!allowed) {
    return Response.json(
      { message: 'Too many attempts — please try again in 15 minutes' },
      { status: 429 }
    );
  }

  try {
    const { name, email, password } = await request.json();

    if (!name || !email || !password) {
      return Response.json({ message: 'Name, email and password are required' }, { status: 400 });
    }
    if (password.length < 8) {
      return Response.json({ message: 'Password must be at least 8 characters' }, { status: 400 });
    }

    await connectDB();

    const existing = await User.findOne({ email: email.toLowerCase() });
    if (existing) {
      return Response.json({ message: 'Email already registered' }, { status: 409 });
    }

    const user = await User.create({ name, email, password, authProvider: 'local' });
    return sendAuthResponse(user, 201);
  } catch (err: any) {
    console.error('[register]', err);
    return Response.json({ message: 'Server error' }, { status: 500 });
  }
}
