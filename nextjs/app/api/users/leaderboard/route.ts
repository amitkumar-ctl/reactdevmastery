import { NextRequest } from 'next/server';
import { connectDB } from '@/lib/db';
import User from '@/lib/models/User';

export async function GET(request: NextRequest) {
  try {
    await connectDB();

    const users = await User.find(
      {},
      'name avatar quizCorrect quizTotal completedTopics streak'
    )
      .sort({ quizCorrect: -1 })
      .limit(20)
      .lean();

    const board = users.map((u: any) => ({
      id: u._id,
      name: u.name,
      avatar: u.avatar,
      initials: u.name
        .split(' ')
        .map((w: string) => w[0])
        .join('')
        .toUpperCase()
        .slice(0, 2),
      quizCorrect: u.quizCorrect,
      quizTotal: u.quizTotal,
      accuracy:
        u.quizTotal > 0 ? Math.round((u.quizCorrect / u.quizTotal) * 100) : 0,
      topicsCompleted: u.completedTopics.length,
      streak: u.streak,
    }));

    return Response.json({ success: true, leaderboard: board });
  } catch (err: any) {
    console.error('[users/leaderboard]', err);
    return Response.json({ message: 'Server error' }, { status: 500 });
  }
}
