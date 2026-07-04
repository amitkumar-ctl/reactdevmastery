import { NextRequest } from 'next/server';
import { connectDB } from '@/lib/db';
import { requireAuth } from '@/lib/auth';
import User from '@/lib/models/User';

export async function POST(request: NextRequest) {
  const authUser = await requireAuth(request);
  if (!authUser) {
    return Response.json({ message: 'Unauthorised' }, { status: 401 });
  }

  try {
    const { conceptId, topicId } = await request.json();
    if (!conceptId || !topicId) {
      return Response.json({ message: 'conceptId and topicId are required' }, { status: 400 });
    }

    await connectDB();
    const user = await User.findById(authUser._id);
    if (!user) return Response.json({ message: 'User not found' }, { status: 404 });

    const alreadyDone = user.completedConcepts.some(
      (c: any) => c.conceptId === conceptId
    );

    if (!alreadyDone) {
      user.completedConcepts.push({ conceptId, topicId });
      user.updateStreak();
    }

    const today = new Date().toISOString().slice(0, 10);
    const log = user.activityLog || new Map();
    log.set(today, (log.get(today) || 0) + 1);
    user.activityLog = log;

    await user.save();
    return Response.json({ success: true, user: user.toPublicJSON() });
  } catch (err: any) {
    console.error('[progress/concept]', err);
    return Response.json({ message: 'Server error' }, { status: 500 });
  }
}
