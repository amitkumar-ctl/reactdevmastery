import { C, pipeline, sequence } from '../engine/helpers';

// ── Redux one-way data flow ────────────────────────────────────────────
const redux = pipeline({
  title: 'Redux: one-way data flow',
  accent: C.purple,
  perRow: 3,
  token: { label: "{ type: 'cart/add' }", color: C.yellow, w: 170 },
  stages: [
    { id: 'ui', label: '1 · UI event', color: C.blue, out: '🖱 Add to cart', say: 'The user clicks “Add to cart”.' },
    { id: 'dispatch', label: '2 · dispatch(action)', color: C.yellow, out: "{ type: 'cart/add' }", say: 'The component dispatches a plain action object describing WHAT happened.' },
    { id: 'mw', label: '3 · Middleware', color: C.orange, out: 'thunk / logger', say: 'Middleware sees every action first: async work, logging, analytics.' },
    { id: 'reducer', label: '4 · Reducer', color: C.purple, out: '(state, action) → new', say: 'A pure reducer returns NEW state. No mutation, no side effects.' },
    { id: 'store', label: '5 · Store', color: C.green, out: 'cart: 3 items', say: 'The store saves the new state and notifies subscribers.' },
    { id: 'rerender', label: '6 · useSelector', color: C.cyan, out: '🛒 badge: 3', say: 'Components whose selected slice changed re-render.' },
  ],
  outro: 'Every change goes through the same loop, which makes it predictable and time-travel debuggable.',
});

// ── Zustand vs Redux hops ──────────────────────────────────────────────
const zustand = {
  title: 'Same update: Redux path vs Zustand path',
  accent: C.orange,
  h: 250,
  zones: {
    rLane: { x: 12, y: 12, w: 616, h: 104, label: 'Redux Toolkit', color: C.purple },
    zLane: { x: 12, y: 132, w: 616, h: 104, label: 'Zustand', color: C.orange },
    r1: { x: 28, y: 40, w: 100, h: 50, color: C.blue, text: 'component' },
    r2: { x: 148, y: 40, w: 100, h: 50, color: C.yellow, text: 'dispatch' },
    r3: { x: 268, y: 40, w: 100, h: 50, color: C.purple, text: 'slice\nreducer' },
    r4: { x: 388, y: 40, w: 100, h: 50, color: C.green, text: 'store\n(Provider)' },
    r5: { x: 508, y: 40, w: 100, h: 50, color: C.cyan, text: 'useSelector' },
    z1: { x: 28, y: 160, w: 100, h: 50, color: C.blue, text: 'component' },
    z2: { x: 268, y: 160, w: 100, h: 50, color: C.orange, text: 'store.inc()\nset()' },
    z3: { x: 508, y: 160, w: 100, h: 50, color: C.cyan, text: 'useStore(sel)' },
  },
  edges: [['r1', 'r2'], ['r2', 'r3'], ['r3', 'r4'], ['r4', 'r5'], ['z1', 'z2'], ['z2', 'z3']],
  actors: {
    rt: { label: 'inc', color: C.purple, w: 46, h: 22, shape: 'pill' },
    zt: { label: 'inc', color: C.orange, w: 46, h: 22, shape: 'pill' },
  },
  steps: [
    { say: 'Both libraries do the same job: a global store, components subscribe with selectors.', set: { rt: { x: 78, y: 104 }, zt: { x: 78, y: 224 } }, zones: { r1: { hi: true }, z1: { hi: true } } },
    { say: 'Redux: action → dispatch…', tone: C.purple, set: { rt: { x: 198, y: 104 } }, zones: { r2: { hi: true } } },
    { say: 'Zustand: the component just calls a function on the store.', tone: C.orange, set: { zt: { x: 318, y: 224 } }, zones: { z2: { hi: true } } },
    { say: '…reducer → store. More concepts, but strict structure, middleware and great DevTools.', tone: C.purple, set: { rt: { x: 438, y: 104 } }, zones: { r3: { hi: true }, r4: { hi: true } } },
    { say: 'Zustand subscribers update. No Provider, almost no boilerplate.', tone: C.orange, set: { zt: { x: 558, y: 224, glow: true } }, zones: { z3: { hi: true } } },
    { say: 'Redux arrives too. Choose Redux for large teams that need conventions; Zustand for lean apps.', tone: C.green, set: { rt: { x: 558, y: 104, glow: true } }, zones: { r5: { hi: true }, z3: { hi: true } } },
  ],
};

// ── React Query: server-state cache ────────────────────────────────────
const reactQuery = sequence({
  title: 'React Query dedupes, caches and refetches server state',
  accent: C.red,
  chipW: 124,
  lanes: [
    { id: 'a', label: '<TodoList>', color: C.blue },
    { id: 'b', label: '<TodoCount>', color: C.cyan },
    { id: 'cache', label: 'Query cache', color: C.red },
    { id: 'api', label: 'API', color: C.gray },
  ],
  msgs: [
    { from: 'a', to: 'cache', label: 'useQuery(todos)', say: 'TodoList asks for the "todos" key. Cache miss → loading.' },
    { from: 'cache', to: 'api', label: 'GET /todos', color: C.red, say: 'One request goes out.' },
    { from: 'b', to: 'cache', label: 'useQuery(todos)', color: C.cyan, say: 'TodoCount asks for the same key mid-flight → deduped. No second request.' },
    { from: 'api', to: 'cache', label: '[12 todos]', color: C.green, say: 'Data arrives and is cached by key. Both components render it.', zones: { cache: { label: 'Cache · fresh' } } },
    { say: 'After staleTime it is marked stale, but still shown instantly when used.', tone: C.orange, zones: { cache: { label: 'Cache · stale' } } },
    { from: 'cache', to: 'api', label: 'refetch on focus', color: C.yellow, say: 'Refocusing the tab triggers a background refetch. The UI keeps showing old data meanwhile.' },
    { from: 'api', to: 'cache', label: '[13 todos]', color: C.green, say: 'Fresh data swaps in. With Redux you would hand-write loading flags, caching and refetch logic.', zones: { cache: { label: 'Cache · fresh' } } },
  ],
});

// ── Optimistic updates ─────────────────────────────────────────────────
const optimistic = {
  title: 'Update the UI first, confirm with the server later',
  accent: C.pink,
  h: 280,
  zones: {
    ui: { x: 12, y: 12, w: 200, h: 256, label: 'UI', color: C.blue, text: '♡ 10', big: true },
    snap: { x: 226, y: 12, w: 188, h: 256, label: 'Snapshot (for rollback)', color: C.gray, layout: 'col' },
    server: { x: 428, y: 12, w: 200, h: 256, label: 'Server', color: C.green, layout: 'col' },
  },
  actors: {
    snap: { label: 'likes: 10', color: C.gray, w: 140 },
    req: { label: 'POST /like', color: C.yellow, w: 140 },
    ok: { label: '200 ✓', color: C.green, w: 140 },
    req2: { label: 'POST /like', color: C.yellow, w: 140 },
    fail: { label: '500 ✗', color: C.red, w: 140 },
  },
  steps: [
    { say: 'The user taps ♥. First, snapshot the current value.', set: { snap: { in: 'snap', from: 'ui' } }, zones: { snap: { hi: true } } },
    { say: 'Update the UI immediately. It feels instant, with no spinner.', tone: C.pink, zones: { ui: { text: '♥ 11', hi: true, color: C.pink } } },
    { say: 'Meanwhile the real request goes to the server.', tone: C.yellow, set: { req: { in: 'server', from: 'ui' } }, arrows: [['ui', 'server', { color: C.yellow }]] },
    { say: 'Success → nothing to do (maybe re-sync with the server’s value). Discard the snapshot.', tone: C.green, set: { ok: { in: 'server', glow: true }, snap: { dim: true } }, zones: { server: { hi: true } } },
    { say: 'Next tap: optimistic again → ♥ 12…', tone: C.pink, set: { req: null, ok: null, snap: { label: 'likes: 11', dim: false }, req2: { in: 'server', from: 'ui' } }, zones: { ui: { text: '♥ 12', hi: true } } },
    { say: '…but this time the server fails. Roll back to the snapshot and show a toast.', tone: C.red, set: { fail: { in: 'server', shake: true } }, zones: { ui: { text: '♥ 11 ↩', hi: true, color: C.red }, server: { color: C.red } } },
    { say: 'Use it for actions that almost always succeed: likes, toggles, reordering. React 19 adds useOptimistic.', tone: C.green, zones: { ui: { color: C.blue }, server: { color: C.green } } },
  ],
};

// ── Normalized state ───────────────────────────────────────────────────
const normalized = {
  title: 'Normalize: store each entity once, reference by id',
  accent: C.cyan,
  h: 300,
  zones: {
    nested: { x: 12, y: 12, w: 300, h: 276, label: 'Nested (duplicated)', color: C.orange, layout: 'col' },
    users: { x: 328, y: 12, w: 300, h: 90, label: 'users.byId', color: C.green, layout: 'row' },
    posts: { x: 328, y: 118, w: 300, h: 170, label: 'posts.byId', color: C.cyan, layout: 'col' },
  },
  actors: {
    p1: { label: "post 1 · author: { Ana }", color: C.orange, w: 260 },
    p2: { label: "post 2 · author: { Ana }", color: C.orange, w: 260 },
    p3: { label: "post 3 · author: { Ana }", color: C.orange, w: 260 },
    u1: { label: "1: { name: 'Ana' }", color: C.green, w: 180 },
    q1: { label: 'post 1 · authorId: 1', color: C.cyan, w: 220 },
    q2: { label: 'post 2 · authorId: 1', color: C.cyan, w: 220 },
    q3: { label: 'post 3 · authorId: 1', color: C.cyan, w: 220 },
  },
  steps: [
    { say: 'API responses often nest data, so the same author is copied into every post.', set: { p1: { in: 'nested' }, p2: { in: 'nested' }, p3: { in: 'nested' } }, zones: { nested: { hi: true } } },
    { say: 'Ana renames herself. You update one copy and forget the others → inconsistent UI.', tone: C.red, set: { p1: { label: 'post 1 · author: { Anna }', color: C.yellow, glow: true } }, zones: { nested: { color: C.red } } },
    { say: 'Normalized: each user is stored ONCE in a lookup table keyed by id.', tone: C.green, set: { u1: { in: 'users', glow: true } }, zones: { users: { hi: true }, nested: { dim: true } } },
    { say: 'Posts keep only authorId, like foreign keys in a database.', tone: C.cyan, set: { q1: { in: 'posts' }, q2: { in: 'posts' }, q3: { in: 'posts' } }, zones: { posts: { hi: true } }, arrows: [['posts', 'users', { label: 'authorId → user', color: C.cyan }]] },
    { say: 'Rename once, and every post shows “Anna” instantly. O(1) lookups too. createEntityAdapter does this for you.', tone: C.green, set: { u1: { label: "1: { name: 'Anna' }", glow: true } }, zones: { users: { hi: true } }, arrows: [['posts', 'users', { color: C.green }]] },
  ],
};

// ── Stale-while-revalidate ─────────────────────────────────────────────
const swr = sequence({
  title: 'Stale-while-revalidate: instant now, fresh soon',
  accent: C.teal,
  lanes: [
    { id: 'ui', label: 'UI', color: C.blue },
    { id: 'cache', label: 'Cache · v1 (stale)', color: C.yellow },
    { id: 'server', label: 'Server · v2', color: C.green },
  ],
  msgs: [
    { from: 'ui', to: 'cache', label: 'need /profile', say: 'The user opens the page. We already have an older copy cached.' },
    { from: 'cache', to: 'ui', label: '⚡ v1 (stale)', color: C.yellow, say: 'Return the stale copy IMMEDIATELY. The screen is never blank.' },
    { from: 'cache', to: 'server', label: 'revalidate', color: C.teal, say: 'At the same time, revalidate in the background.' },
    { from: 'server', to: 'cache', label: 'v2', color: C.green, say: 'Fresh data arrives and replaces the cached copy.', zones: { cache: { label: 'Cache · v2 (fresh)' } } },
    { from: 'cache', to: 'ui', label: '✓ v2', color: C.green, say: 'The UI updates quietly. Same idea as the HTTP header Cache-Control: stale-while-revalidate=60 and the SWR library.' },
  ],
});

export default {
  'redux-arch': redux,
  'zustand-vs-redux': zustand,
  'react-query-vs-redux': reactQuery,
  'optimistic-updates': optimistic,
  'normalized-state': normalized,
  'stale-while-revalidate': swr,
};
