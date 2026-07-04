import { NextRequest } from 'next/server';
import { connectDB } from '@/lib/db';
import { requireAuth } from '@/lib/auth';
import User from '@/lib/models/User';

export async function GET(request: NextRequest) {
  const authUser = await requireAuth(request);
  if (!authUser) return Response.json({ message: 'Unauthorised' }, { status: 401 });

  try {
    await connectDB();
    const user = await User.findById(authUser._id);
    if (!user) return Response.json({ message: 'User not found' }, { status: 404 });
    return Response.json({ success: true, user: user.toPublicJSON() });
  } catch (err: any) {
    console.error('[users/profile GET]', err);
    return Response.json({ message: 'Server error' }, { status: 500 });
  }
}

export async function PATCH(request: NextRequest) {
  const authUser = await requireAuth(request);
  if (!authUser) return Response.json({ message: 'Unauthorised' }, { status: 401 });

  try {
    const { name, avatar } = await request.json();
    const updates: Record<string, string> = {};
    if (name && name.trim().length >= 2) updates.name = name.trim();
    if (avatar !== undefined) updates.avatar = avatar;

    await connectDB();
    const user = await User.findByIdAndUpdate(authUser._id, updates, {
      new: true,
      runValidators: true,
    });
    if (!user) return Response.json({ message: 'User not found' }, { status: 404 });

    return Response.json({ success: true, user: user.toPublicJSON() });
  } catch (err: any) {
    console.error('[users/profile PATCH]', err);
    return Response.json({ message: 'Server error' }, { status: 500 });
  }
}
