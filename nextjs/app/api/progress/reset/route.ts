import { NextRequest } from 'next/server';
import { connectDB } from '@/lib/db';
import { requireAuth } from '@/lib/auth';
import User from '@/lib/models/User';

export async function DELETE(request: NextRequest) {
  const authUser = await requireAuth(request);
  if (!authUser) return Response.json({ message: 'Unauthorised' }, { status: 401 });

  try {
    await connectDB();
    const user = await User.findById(authUser._id);
    if (!user) return Response.json({ message: 'User not found' }, { status: 404 });

    user.completedConcepts = [];
    user.completedTopics = [];
    user.quizAttempts = [];
    user.quizCorrect = 0;
    user.quizTotal = 0;
    user.flashCardsSeen = [];
    user.streak = 0;
    user.lastActiveDate = null;
    user.activityLog = new Map();
    await user.save();

    return Response.json({ success: true, message: 'Progress reset', user: user.toPublicJSON() });
  } catch (err: any) {
    console.error('[progress/reset]', err);
    return Response.json({ message: 'Server error' }, { status: 500 });
  }
}
