import { NextRequest } from 'next/server';
import { connectDB } from '@/lib/db';
import { requireAuth } from '@/lib/auth';
import User from '@/lib/models/User';

export async function PATCH(request: NextRequest) {
  const authUser = await requireAuth(request);
  if (!authUser) return Response.json({ message: 'Unauthorised' }, { status: 401 });

  try {
    const { currentPassword, newPassword } = await request.json();

    if (!currentPassword || !newPassword) {
      return Response.json(
        { message: 'Both current and new password are required' },
        { status: 400 }
      );
    }
    if (newPassword.length < 8) {
      return Response.json(
        { message: 'New password must be at least 8 characters' },
        { status: 400 }
      );
    }

    await connectDB();
    const user = await User.findById(authUser._id).select('+password');
    if (!user) return Response.json({ message: 'User not found' }, { status: 404 });

    if (user.authProvider === 'google') {
      return Response.json(
        { message: 'Google accounts cannot set a password here' },
        { status: 400 }
      );
    }

    const isMatch = await user.comparePassword(currentPassword);
    if (!isMatch) {
      return Response.json({ message: 'Current password is incorrect' }, { status: 401 });
    }

    user.password = newPassword;
    await user.save();

    return Response.json({ success: true, message: 'Password updated successfully' });
  } catch (err: any) {
    console.error('[users/password]', err);
    return Response.json({ message: 'Server error' }, { status: 500 });
  }
}
