// Helpers for "send me back where I was" after login / sign-up.
//
// Only same-site paths are accepted ("/architect/kanban"), never full URLs or
// protocol-relative ones ("//evil.com"), so ?next= can't be used as an open
// redirect.

export const getNextPath = (search, fallback = '/') => {
  const next = new URLSearchParams(search || '').get('next');
  if (!next || !next.startsWith('/') || next.startsWith('//') || next.startsWith('/\\')) return fallback;
  return next;
};

export const withNext = (path, next) => (next && next !== '/' ? `${path}?next=${encodeURIComponent(next)}` : path);
