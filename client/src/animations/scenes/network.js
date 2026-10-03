import { C, sequence } from '../engine/helpers';

// ── HTTP caching ───────────────────────────────────────────────────────
const caching = sequence({
  title: 'Browser cache → CDN → origin',
  accent: C.green,
  chipW: 130,
  lanes: [
    { id: 'page', label: 'Page', color: C.blue },
    { id: 'bc', label: 'Browser cache', color: C.yellow },
    { id: 'cdn', label: 'CDN edge', color: C.purple },
    { id: 'origin', label: 'Origin', color: C.gray },
  ],
  msgs: [
    { from: 'page', to: 'cdn', label: 'GET app.js', say: 'First visit: nothing cached, so the request goes out to the CDN…' },
    { from: 'cdn', to: 'origin', label: 'miss → fetch', color: C.purple, say: '…which misses too and fetches from the origin.' },
    { from: 'origin', to: 'bc', label: 'max-age=60 · ETag', color: C.green, say: 'The response carries Cache-Control: max-age=60 and an ETag. The CDN and browser both store it.', zones: { cdn: { label: 'CDN edge · stored' }, bc: { label: 'Browser cache · fresh' } } },
    { from: 'bc', to: 'page', label: '⚡ 0ms (fresh)', color: C.green, say: 'Within 60s: served from the browser cache. No network request at all.' },
    { from: 'page', to: 'origin', label: 'If-None-Match: "abc"', color: C.yellow, w: 150, say: 'After it expires, the browser revalidates with a conditional request…', zones: { bc: { label: 'Browser cache · stale' } } },
    { from: 'origin', to: 'bc', label: '304 Not Modified', color: C.green, say: '…unchanged → 304 with no body. The cached copy is reused. Hashed files (app.3f9a.js) can use max-age=1y, immutable.', zones: { bc: { label: 'Browser cache · fresh' } } },
  ],
});

// ── CSRF ───────────────────────────────────────────────────────────────
const csrf = sequence({
  title: 'CSRF: a forged request rides on your cookie',
  accent: C.red,
  lanes: [
    { id: 'evil', label: 'evil.com (open tab)', color: C.red },
    { id: 'browser', label: 'Your browser · 🍪 bank session', color: C.blue },
    { id: 'bank', label: 'bank.com', color: C.green },
  ],
  msgs: [
    { say: 'You are logged into bank.com. Your browser holds its session cookie.', zones: { browser: { hi: true } } },
    { from: 'evil', to: 'browser', label: 'hidden <form> auto-submits', w: 170, color: C.red, say: 'You visit evil.com. It contains a hidden form targeting bank.com/transfer.' },
    { from: 'browser', to: 'bank', label: 'POST /transfer + 🍪', color: C.orange, w: 170, say: 'The browser automatically attaches bank.com’s cookie. The request looks legit!' },
    { from: 'bank', to: 'browser', label: '💸 ₹50,000 sent', color: C.red, say: 'Without protection, the bank executes it. The attacker never saw your cookie, they just used it.', zones: { bank: { color: C.red } } },
    { say: 'Fix 1: SameSite=Lax/Strict cookies are not sent on cross-site POSTs.', tone: C.green, zones: { bank: { color: C.green }, browser: { label: 'Your browser · 🍪 SameSite=Lax' } } },
    { from: 'browser', to: 'bank', label: 'POST /transfer (no 🍪)', color: C.gray, w: 170, say: 'Fix 2: a CSRF token in the form that evil.com cannot read. Request rejected → 403.' },
  ],
});

// ── CORS ───────────────────────────────────────────────────────────────
const cors = sequence({
  title: 'CORS: the browser asks the server for permission',
  accent: C.purple,
  chipW: 180,
  lanes: [
    { id: 'js', label: 'JS on app.com', color: C.blue },
    { id: 'browser', label: 'Browser', color: C.purple },
    { id: 'api', label: 'api.other.com', color: C.green },
  ],
  msgs: [
    { from: 'js', to: 'browser', label: "fetch(url, { PUT, JSON })", say: 'Your JS calls a different origin with a non-simple request (PUT + JSON).' },
    { from: 'browser', to: 'api', label: 'OPTIONS (preflight)', color: C.yellow, say: 'Before sending it, the browser sends a preflight: Origin: app.com, Access-Control-Request-Method: PUT.' },
    { from: 'api', to: 'browser', label: 'Allow-Origin: app.com', color: C.green, say: 'The server replies with which origins, methods and headers it allows.' },
    { from: 'browser', to: 'api', label: 'PUT /items', color: C.blue, say: 'Permission granted, so the real request is sent.' },
    { from: 'api', to: 'browser', label: '200 + Allow-Origin', color: C.green, say: 'The response also must carry Access-Control-Allow-Origin…' },
    { from: 'browser', to: 'js', label: '✓ data', color: C.green, say: '…then the browser hands it to your JS.' },
    { from: 'api', to: 'browser', label: '200 (no CORS header)', color: C.red, say: 'If the header is missing, the server STILL responded, but the browser blocks JS from reading it. CORS protects users, not servers.', zones: { browser: { color: C.red, label: 'Browser · ✗ blocked' } } },
  ],
});

// ── CSP ────────────────────────────────────────────────────────────────
const csp = {
  title: 'Content-Security-Policy filters what can run',
  accent: C.green,
  h: 290,
  zones: {
    src: { x: 12, y: 12, w: 190, h: 266, label: 'Scripts on the page', color: C.gray, layout: 'col' },
    gate: { x: 230, y: 12, w: 180, h: 266, label: 'CSP gate', color: C.yellow, text: "script-src 'self'\n  cdn.trusted.com", layout: 'center' },
    run: { x: 438, y: 12, w: 190, h: 128, label: 'Executed ✓', color: C.green, layout: 'col' },
    block: { x: 438, y: 150, w: 190, h: 128, label: 'Blocked ✗', color: C.red, layout: 'col' },
  },
  actors: {
    s1: { label: '/app.js', color: C.blue, w: 160 },
    s2: { label: 'cdn.trusted.com/lib.js', color: C.blue, w: 170 },
    s3: { label: 'injected inline <script>', color: C.red, w: 170 },
    s4: { label: 'evil.com/x.js', color: C.red, w: 160 },
  },
  steps: [
    { say: 'The server sends a CSP header listing where scripts may come from.', set: { s1: { in: 'src' }, s2: { in: 'src' }, s3: { in: 'src' }, s4: { in: 'src' } }, zones: { gate: { hi: true } } },
    { say: "Your own /app.js matches 'self', so it runs.", tone: C.green, set: { s1: { in: 'run', glow: true } }, zones: { run: { hi: true } } },
    { say: 'The whitelisted CDN script runs too.', tone: C.green, set: { s2: { in: 'run', glow: true } }, zones: { run: { hi: true } } },
    { say: 'An injected inline script (XSS) is blocked. Inline code needs a nonce or hash to run.', tone: C.red, set: { s3: { in: 'block', shake: true } }, zones: { block: { hi: true } } },
    { say: 'A script from an unlisted domain is blocked as well. Violations can be reported via report-to.', tone: C.red, set: { s4: { in: 'block', shake: true } }, zones: { block: { hi: true } } },
    { say: 'CSP is defense in depth: even if XSS slips into your HTML, the payload cannot execute.', tone: C.green, zones: { gate: { hi: true, color: C.green } } },
  ],
};

// ── OAuth 2.0 + PKCE ───────────────────────────────────────────────────
const oauth = sequence({
  title: 'OAuth 2.0 Authorization Code + PKCE',
  accent: C.cyan,
  chipW: 170,
  lanes: [
    { id: 'app', label: 'SPA (your app)', color: C.blue },
    { id: 'auth', label: 'Auth server', color: C.cyan },
    { id: 'api', label: 'Resource API', color: C.green },
  ],
  msgs: [
    { say: 'The app creates a random code_verifier and its hash, code_challenge = SHA256(verifier). The verifier stays secret.', zones: { app: { label: 'SPA · 🔑 verifier (secret)', hi: true } } },
    { from: 'app', to: 'auth', label: '/authorize + challenge', say: 'Redirect to the auth server with the challenge (the hash, not the secret).' },
    { say: 'The user logs in and consents on the auth server’s own page. The app never sees the password.', tone: C.cyan, zones: { auth: { hi: true, label: 'Auth server · login ✓' } } },
    { from: 'auth', to: 'app', label: '?code=xyz (one-time)', color: C.yellow, say: 'Redirect back with a short-lived authorization code.' },
    { from: 'app', to: 'auth', label: 'POST /token + verifier', color: C.blue, say: 'The app exchanges the code AND sends the original verifier.' },
    { from: 'auth', to: 'app', label: 'access_token ✓', color: C.green, say: 'SHA256(verifier) equals the stored challenge → tokens issued. A stolen code is useless without the verifier.' },
    { from: 'app', to: 'api', label: 'Authorization: Bearer …', color: C.green, w: 190, say: 'The app calls the API with the access token.' },
  ],
});

// ── Authentication vs authorization ────────────────────────────────────
const authAuthz = {
  title: 'Authentication: who are you? Authorization: what may you do?',
  accent: C.blue,
  h: 280,
  zones: {
    start: { x: 12, y: 60, w: 110, h: 160, label: 'Request', color: C.gray, layout: 'col' },
    authn: { x: 150, y: 40, w: 150, h: 200, label: '1 · AuthN: identity', color: C.blue, layout: 'center' },
    authz: { x: 328, y: 40, w: 150, h: 200, label: '2 · AuthZ: role', color: C.purple, layout: 'center' },
    dash: { x: 506, y: 40, w: 122, h: 92, label: '/dashboard', color: C.green, layout: 'center' },
    admin: { x: 506, y: 148, w: 122, h: 92, label: '/admin', color: C.red, layout: 'center' },
  },
  actors: {
    anon: { label: '👤 no token', color: C.gray, w: 96 },
    ana: { label: '👩 Ana', color: C.yellow, w: 90 },
  },
  steps: [
    { say: 'An anonymous request with no valid token…', set: { anon: { in: 'start' } } },
    { say: '…fails authentication → 401 Unauthorized (“I don’t know who you are”).', tone: C.red, set: { anon: { in: 'authn', shake: true, label: '401 ✗', color: C.red } }, zones: { authn: { hi: true } } },
    { say: 'Ana logs in. Her identity is verified (authenticated) ✓', tone: C.blue, set: { anon: null, ana: { in: 'authn', glow: true } }, zones: { authn: { hi: true, color: C.green } } },
    { say: 'Gate 2 checks what her role allows. Viewer may open /dashboard ✓', tone: C.green, set: { ana: { in: 'dash', glow: true } }, zones: { authz: { hi: true }, dash: { hi: true } } },
    { say: 'But /admin needs role: admin → 403 Forbidden (“I know you, but no”).', tone: C.red, set: { ana: { in: 'authz', label: '403 ✗', color: C.red, shake: true } }, zones: { authz: { hi: true, color: C.red }, admin: { hi: true } } },
    { say: 'Always enforce authorization on the server. Hiding a button in the UI is not security.', tone: C.purple, set: { ana: { in: 'dash', label: '👩 Ana', color: C.yellow } } },
  ],
};

// ── Compression ────────────────────────────────────────────────────────
const compression = sequence({
  title: 'Compression shrinks text over the wire',
  accent: C.teal,
  lanes: [
    { id: 'browser', label: 'Browser', color: C.blue },
    { id: 'server', label: 'Server / CDN', color: C.teal },
  ],
  msgs: [
    { from: 'browser', to: 'server', label: 'Accept-Encoding: br, gzip', w: 210, say: 'The browser advertises which compression formats it can decode.' },
    { say: 'The server picks Brotli and compresses app.js: 500KB → ~90KB (pre-compressed at build time is best).', tone: C.teal, zones: { server: { hi: true, label: 'Server · 500KB → 90KB (br)' } } },
    { from: 'server', to: 'browser', label: 'Content-Encoding: br · 90KB', w: 220, color: C.green, say: '82% fewer bytes cross the network, which means a faster download, especially on mobile.' },
    { say: 'The browser decompresses transparently. Compress text (JS, CSS, HTML, JSON, SVG). JPEG, PNG and WOFF2 are already compressed.', tone: C.blue, zones: { browser: { hi: true, label: 'Browser · decoded 500KB' } } },
  ],
});

// ── REST vs GraphQL round trips ────────────────────────────────────────
const apiDesign = sequence({
  title: 'REST round trips vs one GraphQL query',
  accent: C.pink,
  chipW: 180,
  lanes: [
    { id: 'client', label: 'Client', color: C.blue },
    { id: 'server', label: 'API', color: C.pink },
  ],
  msgs: [
    { from: 'client', to: 'server', label: 'GET /users/1', say: 'REST: to render a profile card, first fetch the user…' },
    { from: 'server', to: 'client', label: '{ …30 fields }', color: C.gray, say: '…which returns 30 fields when you needed 2 (over-fetching).' },
    { from: 'client', to: 'server', label: 'GET /users/1/posts', say: 'Then a second round trip for their posts (under-fetching → waterfall).' },
    { from: 'server', to: 'client', label: '[posts…]', color: C.gray, say: 'Each round trip adds latency.' },
    { from: 'client', to: 'server', label: 'POST /graphql { user { name posts } }', w: 280, color: C.pink, say: 'GraphQL: describe exactly the shape you need in ONE request.' },
    { from: 'server', to: 'client', label: '{ name, posts: [{ title }] }', w: 260, color: C.green, say: 'Exactly those fields, one round trip. Trade-off: harder HTTP caching and more server complexity.' },
  ],
});

// ── Observability pipeline ─────────────────────────────────────────────
const monitoring = sequence({
  title: 'From a user’s crash to your alert',
  accent: C.orange,
  chipW: 120,
  lanes: [
    { id: 'browser', label: 'User’s browser', color: C.blue },
    { id: 'sdk', label: 'SDK (Sentry…)', color: C.purple },
    { id: 'collector', label: 'Collector', color: C.orange },
    { id: 'team', label: 'On-call', color: C.red },
  ],
  msgs: [
    { from: 'browser', to: 'sdk', label: '💥 TypeError', color: C.red, say: 'An error is thrown in production, inside minified code.' },
    { say: 'The SDK captures stack trace, breadcrumbs (clicks, requests), release and device info.', tone: C.purple, zones: { sdk: { hi: true, label: 'SDK · + context' } } },
    { from: 'sdk', to: 'collector', label: 'sendBeacon(event)', color: C.purple, say: 'It is sent in the background without blocking the user.' },
    { say: 'Uploaded source maps turn app.3f9a.js:1:48213 back into Cart.tsx:42. Errors are grouped and counted.', tone: C.orange, zones: { collector: { hi: true, label: 'Collector · symbolicated' } } },
    { from: 'collector', to: 'team', label: '🔔 120/min', color: C.red, say: 'Rate crosses a threshold → alert. Pair with RUM (Core Web Vitals) and logs for the full picture.' },
  ],
});

export default {
  caching,
  csrf,
  'si-cors': cors,
  'si-csp': csp,
  'si-oauth': oauth,
  'rf-auth-authz': authAuthz,
  'pi-compression': compression,
  'sd-api-design': apiDesign,
  'sd-monitoring': monitoring,
};
