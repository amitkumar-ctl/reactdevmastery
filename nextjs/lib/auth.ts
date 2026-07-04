import { NextRequest } from 'next/server';
import { verifyAccessToken } from './jwt';
import { connectDB } from './db';
import User from './models/User';

export interface AuthUser {
  _id: string;
  name: string;
  email: string;
  avatar: string;
  role: string;
  authProvider: string;
  refreshTokens?: string[];
  toPublicJSON: () => Record<string, unknown>;
  // allow saving
  save: (opts?: any) => Promise<any>;
  [key: string]: any;
}

/**
 * Extracts and verifies the Bearer token from the Authorization header.
 * Returns the full User document on success, or null on failure.
 * Usage: const user = await requireAuth(request);
 *        if (!user) return Response.json({ message: 'Unauthorised' }, { status: 401 });
 */
export async function requireAuth(request: NextRequest): Promise<AuthUser | null> {
  try {
    const authHeader = request.headers.get('authorization');
    if (!authHeader?.startsWith('Bearer ')) return null;

    const token = authHeader.slice(7);
    const decoded = verifyAccessToken(token);

    await connectDB();
    const user = await User.findById(decoded.id);
    if (!user) return null;

    return user as unknown as AuthUser;
  } catch {
    return null;
  }
}

/**
 * Same as requireAuth but also checks user.role === 'admin'.
 */
export async function requireAdmin(request: NextRequest): Promise<AuthUser | null> {
  const user = await requireAuth(request);
  if (!user || user.role !== 'admin') return null;
  return user;
}
