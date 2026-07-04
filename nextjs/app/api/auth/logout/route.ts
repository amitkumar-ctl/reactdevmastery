import { NextRequest } from 'next/server';
import { connectDB } from '@/lib/db';
import User from '@/lib/models/User';
import { requireAuth } from '@/lib/auth';
import { clearRefreshCookie, getRefreshToken } from '@/lib/jwt';

export async function POST(request: NextRequest) {
  try {
    const user = await requireAuth(request);
    if (!user) {
      return Response.json({ message: 'Unauthorised' }, { status: 401 });
    }

    const token = await getRefreshToken();

    await connectDB();
    const dbUser = await User.findById(user._id).select('+refreshTokens');
    if (dbUser && token) {
      dbUser.refreshTokens = (dbUser.refreshTokens || []).filter((t: string) => t !== token);
      await dbUser.save({ validateBeforeSave: false });
    }

    const response = Response.json({ success: true, message: 'Logged out successfully' });
    clearRefreshCookie(response);
    return response;
  } catch (err: any) {
    console.error('[logout]', err);
    return Response.json({ message: 'Server error' }, { status: 500 });
  }
}
