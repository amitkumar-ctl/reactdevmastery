import { NextRequest } from 'next/server';
import { connectDB } from '@/lib/db';
import { requireAuth } from '@/lib/auth';
import User from '@/lib/models/User';

export async function POST(request: NextRequest) {
  const authUser = await requireAuth(request);
  if (!authUser) return Response.json({ message: 'Unauthorised' }, { status: 401 });

  try {
    const { indices } = await request.json();
    if (!Array.isArray(indices)) {
      return Response.json({ message: 'indices must be an array' }, { status: 400 });
    }

    await connectDB();
    const user = await User.findById(authUser._id);
    if (!user) return Response.json({ message: 'User not found' }, { status: 404 });

    const current = new Set<number>(user.flashCardsSeen);
    indices.forEach((i: number) => current.add(Number(i)));
    user.flashCardsSeen = [...current];
    user.updateStreak();
    await user.save();

    return Response.json({ success: true, flashCardsSeen: user.flashCardsSeen });
  } catch (err: any) {
    console.error('[progress/flash]', err);
    return Response.json({ message: 'Server error' }, { status: 500 });
  }
}
