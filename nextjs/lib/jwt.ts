import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';

const JWT_SECRET = process.env.JWT_SECRET!;
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET!;
const JWT_EXPIRE = process.env.JWT_EXPIRE || '15m';
const JWT_REFRESH_EXPIRE = process.env.JWT_REFRESH_EXPIRE || '7d';

export const generateAccessToken = (userId: string): string =>
  jwt.sign({ id: userId }, JWT_SECRET, { expiresIn: JWT_EXPIRE as any });

export const generateRefreshToken = (userId: string): string =>
  jwt.sign({ id: userId }, JWT_REFRESH_SECRET, { expiresIn: JWT_REFRESH_EXPIRE as any });

export const verifyAccessToken = (token: string): { id: string } =>
  jwt.verify(token, JWT_SECRET) as { id: string };

export const verifyRefreshToken = (token: string): { id: string } =>
  jwt.verify(token, JWT_REFRESH_SECRET) as { id: string };

// Cookie helpers for Next.js Route Handlers
export const REFRESH_COOKIE = 'refreshToken';
const COOKIE_PATH = '/api/auth';
const MAX_AGE = 7 * 24 * 60 * 60; // 7 days in seconds

export const setRefreshCookie = (response: Response, token: string): void => {
  const secure = process.env.NODE_ENV === 'production';
  const cookieValue = [
    `${REFRESH_COOKIE}=${token}`,
    `Path=${COOKIE_PATH}`,
    `Max-Age=${MAX_AGE}`,
    'HttpOnly',
    secure ? 'Secure' : '',
    'SameSite=Strict',
  ].filter(Boolean).join('; ');

  response.headers.append('Set-Cookie', cookieValue);
};

export const clearRefreshCookie = (response: Response): void => {
  const cookieValue = [
    `${REFRESH_COOKIE}=`,
    `Path=${COOKIE_PATH}`,
    'Max-Age=0',
    'HttpOnly',
  ].join('; ');
  response.headers.append('Set-Cookie', cookieValue);
};

export const getRefreshToken = async (): Promise<string | undefined> => {
  const cookieStore = await cookies();
  return cookieStore.get(REFRESH_COOKIE)?.value;
};
