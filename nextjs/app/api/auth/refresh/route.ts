import { NextRequest } from 'next/server';
import { connectDB } from '@/lib/db';
import User from '@/lib/models/User';
import {
  verifyRefreshToken,
  generateAccessToken,
  generateRefreshToken,
  setRefreshCookie,
  clearRefreshCookie,
  getRefreshToken,
} from '@/lib/jwt';

export async function POST(request: NextRequest) {
  try {
    const token = await getRefreshToken();
    if (!token) {
      return Response.json({ message: 'No refresh token' }, { status: 401 });
    }

    const decoded = verifyRefreshToken(token);

    await connectDB();

    const user = await User.findById(decoded.id).select('+refreshTokens');
    if (!user || !user.refreshTokens?.includes(token)) {
      const response = Response.json(
        { message: 'Invalid refresh token — please login again' },
        { status: 401 }
      );
      clearRefreshCookie(response);
      return response;
    }

    // Rotate: remove old, issue new
    user.refreshTokens = user.refreshTokens.filter((t: string) => t !== token);
    const newRefreshToken = generateRefreshToken(user._id.toString());
    user.refreshTokens.push(newRefreshToken);
    await user.save({ validateBeforeSave: false });

    const accessToken = generateAccessToken(user._id.toString());

    const response = Response.json({
      success: true,
      accessToken,
      user: user.toPublicJSON(),
    });
    setRefreshCookie(response, newRefreshToken);
    return response;
  } catch (err: any) {
    const response = Response.json(
      { message: 'Session expired — please login again' },
      { status: 401 }
    );
    clearRefreshCookie(response);
    return response;
  }
}
