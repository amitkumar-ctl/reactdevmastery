import { NextRequest } from 'next/server';
import { requireAuth } from '@/lib/auth';

export async function GET(request: NextRequest) {
  const user = await requireAuth(request);
  if (!user) {
    return Response.json({ message: 'Unauthorised' }, { status: 401 });
  }
  return Response.json({ success: true, user: user.toPublicJSON() });
}
