import { C, sequence } from '../engine/helpers';

// ── App Router nested layouts ──────────────────────────────────────────
const appRouter = {
  title: 'Nested layouts persist across navigation',
  accent: C.blue,
  h: 300,
  zones: {
    root: { x: 12, y: 12, w: 616, h: 276, label: 'app/layout.tsx  (html, navbar)', color: C.blue },
    dash: { x: 32, y: 46, w: 576, h: 222, label: 'app/dashboard/layout.tsx  (sidebar · state: open)', color: C.purple },
    side: { x: 50, y: 80, w: 150, h: 170, label: 'Sidebar', color: C.purple, layout: 'col' },
    page: { x: 218, y: 80, w: 372, h: 170, label: 'page.tsx', color: C.green, text: '📊 /dashboard', big: true },
    url: { x: 360, y: 14, w: 260, h: 26, color: C.gray, text: '/dashboard', round: 6 },
  },
  actors: {
    l1: { label: 'Overview', color: C.green, w: 120 },
    l2: { label: 'Settings', color: C.gray, w: 120 },
    l3: { label: 'Billing', color: C.gray, w: 120 },
  },
  steps: [
    { say: 'Each folder can have a layout.tsx. Layouts wrap their child segments.', set: { l1: { in: 'side' }, l2: { in: 'side' }, l3: { in: 'side' } }, zones: { root: { hi: true }, dash: { hi: true } } },
    { say: 'Click “Settings”: the URL changes to /dashboard/settings…', tone: C.yellow, set: { l2: { glow: true, color: C.yellow } }, zones: { url: { text: '/dashboard/settings', hi: true } } },
    { say: '…and ONLY the page segment re-renders. Both layouts keep their state and DOM.', tone: C.green, set: { l1: { color: C.gray }, l2: { color: C.green } }, zones: { page: { text: '⚙ /settings', hi: true } } },
    { say: 'Billing: same thing. The sidebar never unmounts, so its scroll position and open state survive.', tone: C.green, set: { l2: { color: C.gray }, l3: { color: C.green, glow: true } }, zones: { page: { text: '💳 /billing', hi: true }, url: { text: '/dashboard/billing' } } },
    { say: 'The old Pages Router re-rendered the whole page per route, so shared layouts had to be hacked in _app.', tone: C.orange, zones: { root: { hi: true, color: C.orange }, dash: { hi: true, color: C.orange }, page: { hi: true, color: C.orange } } },
    { say: 'App Router also adds loading.tsx and error.tsx per segment, giving each segment its own Suspense and Error boundary.', tone: C.blue, zones: { root: { color: C.blue }, dash: { color: C.purple }, page: { color: C.green, hi: true } } },
  ],
};

// ── Server Components ──────────────────────────────────────────────────
const serverComponents = sequence({
  title: 'Server Components send HTML, not JavaScript',
  accent: C.green,
  code: `// ProductPage.tsx — Server Component (default)
const product = await db.product.find(id);    // direct DB access
return <><Details p={product} /><LikeButton /></>;

// LikeButton.tsx
'use client';  // only this ships JS`,
  lanes: [
    { id: 'db', label: 'Database', color: C.gray },
    { id: 'server', label: 'Server (RSC)', color: C.green },
    { id: 'browser', label: 'Browser', color: C.blue },
  ],
  msgs: [
    { from: 'server', to: 'db', label: 'db.product.find()', color: C.green, say: 'A Server Component can be async and query the DB directly. No API route, and no secrets leak.', line: 2 },
    { from: 'db', to: 'server', label: 'product row', color: C.gray, say: 'Data stays on the server.' },
    { from: 'server', to: 'browser', label: 'HTML + RSC payload', color: C.green, w: 170, say: 'It renders to HTML plus a compact RSC payload. Its own code is never sent to the browser.', line: 3 },
    { from: 'server', to: 'browser', label: 'LikeButton.js (2kb)', color: C.yellow, w: 170, say: "Only 'use client' components ship JS, and they hydrate for interactivity.", line: 6 },
    { say: 'Result: big libraries (markdown, date, DB clients) used in Server Components add 0 kb to your bundle.', tone: C.green, zones: { browser: { label: 'Browser · JS: 2kb ✓', hi: true } } },
  ],
});

// ── Next.js caching layers ─────────────────────────────────────────────
const nextCaching = sequence({
  title: 'A request falls through four caches',
  accent: C.orange,
  chipW: 104,
  lanes: [
    { id: 'router', label: 'Router cache', color: C.blue },
    { id: 'route', label: 'Full route', color: C.purple },
    { id: 'memo', label: 'Req. memo', color: C.cyan },
    { id: 'data', label: 'Data cache', color: C.orange },
    { id: 'api', label: 'API / DB', color: C.gray },
  ],
  msgs: [
    { from: 'router', to: 'route', label: 'miss', color: C.blue, say: 'Client-side Router Cache (in memory) has no RSC payload for this route yet.' },
    { from: 'route', to: 'memo', label: 'miss · render', color: C.purple, say: 'Full Route Cache (built HTML/RSC on the server) misses, so the route renders.' },
    { from: 'memo', to: 'data', label: 'fetch()', color: C.cyan, say: 'Request Memoization dedupes identical fetch() calls within ONE render pass.' },
    { from: 'data', to: 'api', label: 'miss', color: C.orange, say: 'The persistent Data Cache misses, so it actually hits the API.' },
    { from: 'api', to: 'data', label: 'JSON → stored', color: C.green, say: 'The response is stored in the Data Cache (until revalidate or revalidateTag).' },
    { from: 'route', to: 'router', label: 'RSC → stored', color: C.green, say: 'The rendered route is cached on the server and in the client Router Cache.' },
    { zones: { router: { hi: true, label: 'Router ⚡ hit' } }, tone: C.green, say: 'Navigate back: served instantly from the Router Cache. revalidatePath / router.refresh() clears layers.' },
  ],
});

// ── Server Actions ─────────────────────────────────────────────────────
const serverActions = sequence({
  title: 'A form calls a server function directly',
  accent: C.purple,
  code: `async function addTodo(formData) {
  'use server';
  await db.todo.create({ text: formData.get('text') });
  revalidatePath('/todos');
}
<form action={addTodo}> … </form>`,
  lanes: [
    { id: 'form', label: 'Browser · <form>', color: C.blue },
    { id: 'action', label: "Server action", color: C.purple },
    { id: 'db', label: 'Database', color: C.gray },
  ],
  msgs: [
    { from: 'form', to: 'action', label: 'POST formData', say: 'Submitting sends a POST to the action. No API route or fetch code to write.', line: 6 },
    { from: 'action', to: 'db', label: 'todo.create()', color: C.purple, say: 'The function runs on the server, so it can talk to the DB and use secrets.', line: 3 },
    { from: 'db', to: 'action', label: '✓ saved', color: C.green, say: 'Write succeeds.' },
    { say: 'revalidatePath purges cached data for /todos.', tone: C.orange, line: 4, zones: { action: { hi: true, label: 'Action · revalidate' } } },
    { from: 'action', to: 'form', label: 'fresh RSC payload', color: C.green, say: 'Updated UI comes back in the same round trip. Works even before JS loads (progressive enhancement).' },
  ],
});

// ── next/image ─────────────────────────────────────────────────────────
const nextImage = sequence({
  title: 'next/image serves the right size, in the right format',
  accent: C.cyan,
  lanes: [
    { id: 'phone', label: 'Phone · 390px', color: C.blue },
    { id: 'opt', label: '/_next/image optimizer', color: C.cyan },
    { id: 'src', label: 'hero.jpg (4000px · 4.2MB)', color: C.gray },
  ],
  msgs: [
    { say: 'Space is reserved from width/height (or fill), so there is no layout shift. Off-screen images are lazy.', zones: { phone: { label: 'Phone · ▭ reserved box' } } },
    { from: 'phone', to: 'opt', label: 'w=828 · Accept: avif', w: 170, say: 'The browser picks a candidate from srcset for its viewport and DPR, and says it accepts AVIF.' },
    { from: 'opt', to: 'src', label: 'read original', color: C.cyan, say: 'On the first request, the optimizer loads the original…' },
    { say: '…resizes to 828px and converts to AVIF, then caches the result.', tone: C.cyan, zones: { opt: { hi: true, label: 'resize + AVIF + cache' } } },
    { from: 'opt', to: 'phone', label: 'hero.avif · 48KB', color: C.green, say: '4.2MB → 48KB. Later requests are served from cache. Use priority on the LCP image.' },
  ],
});

// ── Edge middleware ────────────────────────────────────────────────────
const edge = {
  title: 'Middleware runs at the edge, close to the user',
  accent: C.teal,
  h: 280,
  zones: {
    user: { x: 12, y: 90, w: 130, h: 100, label: 'User · Mumbai', color: C.blue, layout: 'center' },
    edge: { x: 190, y: 70, w: 190, h: 140, label: 'Edge node · Mumbai', color: C.teal, layout: 'col' },
    origin: { x: 470, y: 70, w: 158, h: 140, label: 'Origin · us-east', color: C.gray, layout: 'col' },
    lat: { x: 190, y: 226, w: 438, h: 44, color: C.gray, text: '', round: 8 },
  },
  actors: {
    req: { label: 'GET /dashboard', color: C.yellow, w: 140 },
    mw: { label: 'middleware.ts', color: C.teal, w: 140 },
    redir: { label: '307 → /login', color: C.red, w: 130 },
    req2: { label: 'GET /dashboard', color: C.yellow, w: 140 },
  },
  steps: [
    { say: 'A request leaves the user’s browser.', set: { req: { in: 'user', glow: true } } },
    { say: 'It hits the nearest edge location first, ~10ms away instead of ~250ms.', tone: C.teal, set: { req: { in: 'edge' }, mw: { in: 'edge' } }, zones: { edge: { hi: true }, lat: { text: 'user → edge: ~10ms' } }, arrows: [['user', 'edge', { label: '10ms', color: C.teal }]] },
    { say: 'Middleware checks the auth cookie before any page renders. No session → redirect right from the edge.', tone: C.red, set: { redir: { in: 'user', from: 'edge', glow: true } }, arrows: [['edge', 'user', { color: C.red }]] },
    { say: 'Valid session → the request continues to the origin (or is rewritten for A/B tests or geo).', tone: C.green, set: { redir: null, req: null, req2: { in: 'origin', from: 'edge', glow: true } }, zones: { origin: { hi: true }, lat: { text: 'edge → origin: ~240ms (only when needed)' } }, arrows: [['edge', 'origin', { color: C.gray, label: '240ms' }]] },
    { say: 'Edge runtime: fast cold starts, but limited APIs (no Node fs, small bundles). Keep middleware light.', tone: C.teal, zones: { edge: { hi: true } } },
  ],
};

export default {
  'app-router': appRouter,
  'server-components': serverComponents,
  'nextjs-caching': nextCaching,
  'server-actions': serverActions,
  'nextjs-image': nextImage,
  'edge-functions': edge,
};
