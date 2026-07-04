import { NextRequest } from 'next/server';
import { OAuth2Client } from 'google-auth-library';
import { connectDB } from '@/lib/db';
import User from '@/lib/models/User';
import { generateAccessToken, generateRefreshToken, setRefreshCookie } from '@/lib/jwt';
import { rateLimit } from '@/lib/rateLimit';

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

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
  const { allowed } = rateLimit(`google:${ip}`, { max: 10, windowMs: 15 * 60 * 1000 });
  if (!allowed) {
    return Response.json(
      { message: 'Too many attempts — please try again in 15 minutes' },
      { status: 429 }
    );
  }

  try {
    const { credential } = await request.json();
    if (!credential) {
      return Response.json({ message: 'Google credential is required' }, { status: 400 });
    }

    const ticket = await client.verifyIdToken({
      idToken: credential,
      audience: process.env.GOOGLE_CLIENT_ID,
    });
    const payload = ticket.getPayload();
    if (!payload) {
      return Response.json({ message: 'Invalid Google token' }, { status: 401 });
    }

    const { sub: googleId, email, name, picture } = payload;

    await connectDB();

    let user = await User.findOne({
      $or: [{ googleId }, { email }],
    }).select('+refreshTokens');

    if (user) {
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

    return sendAuthResponse(user);
  } catch (err: any) {
    if (err.message?.includes('Token used too late')) {
      return Response.json(
        { message: 'Google session expired — please try again' },
        { status: 401 }
      );
    }
    console.error('[google]', err);
    return Response.json({ message: 'Server error' }, { status: 500 });
  }
}
