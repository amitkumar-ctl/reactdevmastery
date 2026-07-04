import { NextRequest } from 'next/server';
import { connectDB } from '@/lib/db';
import { requireAuth } from '@/lib/auth';
import User from '@/lib/models/User';

export async function POST(request: NextRequest) {
  const authUser = await requireAuth(request);
  if (!authUser) return Response.json({ message: 'Unauthorised' }, { status: 401 });

  try {
    const { topicId } = await request.json();
    if (!topicId) return Response.json({ message: 'topicId is required' }, { status: 400 });

    await connectDB();
    const user = await User.findById(authUser._id);
    if (!user) return Response.json({ message: 'User not found' }, { status: 404 });

    if (!user.completedTopics.includes(topicId)) {
      user.completedTopics.push(topicId);
      user.updateStreak();
      await user.save();
    }

    return Response.json({ success: true, user: user.toPublicJSON() });
  } catch (err: any) {
    console.error('[progress/topic]', err);
    return Response.json({ message: 'Server error' }, { status: 500 });
  }
}
