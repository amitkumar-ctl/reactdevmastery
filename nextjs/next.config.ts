import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // ── Use webpack (not Turbopack) for compatibility ───────────────────
  turbopack: {},

  // ── Security headers on every response ──────────────────────────────
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
        ],
      },
    ];
  },

  // ── Allow images from Google profile pictures ───────────────────────
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'lh3.googleusercontent.com' },
      { protocol: 'https', hostname: 'avatars.githubusercontent.com' },
    ],
  },

  // ── Transpile the content package (ESM) ─────────────────────────────
  transpilePackages: ['reactdevmastery-content'],
};

export default nextConfig;
