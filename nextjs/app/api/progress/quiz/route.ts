import { NextRequest } from 'next/server';
import { connectDB } from '@/lib/db';
import { requireAuth } from '@/lib/auth';
import User from '@/lib/models/User';

export async function POST(request: NextRequest) {
  const authUser = await requireAuth(request);
  if (!authUser) return Response.json({ message: 'Unauthorised' }, { status: 401 });

  try {
    const { conceptId, topicId, correct } = await request.json();
    if (conceptId === undefined || correct === undefined) {
      return Response.json({ message: 'conceptId and correct are required' }, { status: 400 });
    }

    await connectDB();
    const user = await User.findById(authUser._id);
    if (!user) return Response.json({ message: 'User not found' }, { status: 404 });

    user.quizAttempts.push({ conceptId, topicId, correct });
    if (correct) user.quizCorrect += 1;
    user.quizTotal += 1;
    user.updateStreak();
    await user.save();

    return Response.json({
      success: true,
      stats: {
        quizCorrect: user.quizCorrect,
        quizTotal: user.quizTotal,
        quizAccuracy: user.quizAccuracy,
      },
    });
  } catch (err: any) {
    console.error('[progress/quiz]', err);
    return Response.json({ message: 'Server error' }, { status: 500 });
  }
}
