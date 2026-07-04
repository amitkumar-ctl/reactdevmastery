import { NextRequest } from 'next/server';
import { connectDB } from '@/lib/db';
import { requireAuth } from '@/lib/auth';
import User from '@/lib/models/User';

const VALID_LEVELS = ['junior', 'mid-early', 'mid-senior', 'senior'] as const;
const VALID_GOALS = ['active-interview', 'future-interview', 'upskilling', 'gaps'] as const;
const VALID_DAILY = [1, 3, 5, 10];

export async function POST(request: NextRequest) {
  const authUser = await requireAuth(request);
  if (!authUser) return Response.json({ message: 'Unauthorised' }, { status: 401 });

  try {
    const { currentLevel, goal, dailyGoal } = await request.json();

    if (!VALID_LEVELS.includes(currentLevel)) {
      return Response.json({ message: 'Invalid level' }, { status: 400 });
    }
    if (!VALID_GOALS.includes(goal)) {
      return Response.json({ message: 'Invalid goal' }, { status: 400 });
    }

    await connectDB();
    const user = await User.findByIdAndUpdate(
      authUser._id,
      {
        currentLevel,
        goal,
        dailyGoal: VALID_DAILY.includes(Number(dailyGoal)) ? Number(dailyGoal) : 3,
        onboardingCompleted: true,
      },
      { new: true, runValidators: true }
    );

    if (!user) return Response.json({ message: 'User not found' }, { status: 404 });

    return Response.json({ success: true, user: user.toPublicJSON() });
  } catch (err: any) {
    console.error('[users/onboarding]', err);
    return Response.json({ message: 'Server error' }, { status: 500 });
  }
}
