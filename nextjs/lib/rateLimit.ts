// Lightweight serverless-compatible rate limiter.
// Uses a module-level Map — persists across warm invocations
// within the same Lambda container, resets on cold start.
// Good enough for auth endpoints at this scale.

interface RateLimitEntry {
  count: number;
  resetAt: number;
}

const store = new Map<string, RateLimitEntry>();

export function rateLimit(
  identifier: string,
  options: { max: number; windowMs: number } = { max: 10, windowMs: 15 * 60 * 1000 }
): { allowed: boolean; remaining: number } {
  const now = Date.now();
  const entry = store.get(identifier);

  if (!entry || now > entry.resetAt) {
    store.set(identifier, { count: 1, resetAt: now + options.windowMs });
    return { allowed: true, remaining: options.max - 1 };
  }

  if (entry.count >= options.max) {
    return { allowed: false, remaining: 0 };
  }

  entry.count++;
  return { allowed: true, remaining: options.max - entry.count };
}

// Periodically clean up expired entries to avoid memory leaks
setInterval(() => {
  const now = Date.now();
  store.forEach((entry, key) => {
    if (now > entry.resetAt) store.delete(key);
  });
}, 60_000);
