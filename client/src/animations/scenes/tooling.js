import { C, pipeline, sequence, rows } from '../engine/helpers';

// ── Webpack ────────────────────────────────────────────────────────────
const webpack = {
  title: 'Webpack: entry → dependency graph → bundles',
  accent: C.blue,
  h: 300,
  zones: {
    src: { x: 12, y: 12, w: 200, h: 276, label: 'Dependency graph', color: C.gray, layout: 'col' },
    loaders: { x: 226, y: 12, w: 180, h: 276, label: 'Loaders', color: C.orange, text: 'ts → js\nscss → css → js\npng → url', layout: 'col' },
    main: { x: 420, y: 12, w: 208, h: 170, label: 'main.[hash].js', color: C.green, layout: 'col' },
    chunk: { x: 420, y: 196, w: 208, h: 92, label: 'admin.[hash].js (lazy)', color: C.purple, layout: 'col' },
  },
  actors: {
    entry: { label: 'index.tsx (entry)', color: C.yellow, w: 170 },
    app: { label: 'App.tsx', color: C.blue, w: 170 },
    css: { label: 'styles.scss', color: C.pink, w: 170 },
    logo: { label: 'logo.png', color: C.gray, w: 170 },
    admin: { label: "import('./Admin')", color: C.purple, w: 170 },
  },
  steps: [
    { say: 'Webpack starts from the entry point.', set: { entry: { in: 'src', glow: true } }, zones: { src: { hi: true } } },
    { say: 'It follows every import to build a dependency graph: JS, CSS, images, everything.', tone: C.blue, set: { app: { in: 'src' }, css: { in: 'src' }, logo: { in: 'src' }, admin: { in: 'src' } }, zones: { src: { hi: true } } },
    { say: 'Loaders transform non-JS files into modules webpack understands.', tone: C.orange, set: { app: { in: 'loaders', label: 'App.tsx → js' }, css: { in: 'loaders', label: 'scss → js module' }, logo: { in: 'loaders', label: 'png → url' } }, zones: { loaders: { hi: true, text: undefined } } },
    { say: 'Modules are concatenated into a bundle. Plugins then minify it and hash file names.', tone: C.green, set: { entry: { in: 'main' }, app: { in: 'main' }, css: { in: 'main' }, logo: { in: 'main' } }, zones: { main: { hi: true } } },
    { say: 'A dynamic import() becomes its own chunk, loaded only when needed (code splitting).', tone: C.purple, set: { admin: { in: 'chunk', glow: true } }, zones: { chunk: { hi: true } } },
  ],
};

// ── Vite ───────────────────────────────────────────────────────────────
const vite = {
  title: 'Dev server startup: bundle-first vs native ESM',
  accent: C.purple,
  h: 270,
  zones: {
    ...rows([
      ['wp', 'Bundler-based dev server (webpack)', C.blue],
      ['vt', 'Vite (native ES modules)', C.purple],
    ], { top: 14, h: 112, gap: 16 }),
  },
  actors: {
    wpBar: { label: 'bundling 2,000 modules…', color: C.blue, w: 0, h: 26, shape: 'bar' },
    wpReady: { label: 'ready · 28s', color: C.blue, w: 110 },
    vtReady: { label: 'ready · 0.3s', color: C.green, w: 110 },
    pre: { label: 'esbuild pre-bundles deps', color: C.yellow, w: 210 },
    m1: { label: '/src/main.tsx', color: C.purple, w: 120, fs: 10 },
    m2: { label: '/src/App.tsx', color: C.purple, w: 120, fs: 10 },
    m3: { label: '/src/Home.tsx', color: C.purple, w: 120, fs: 10 },
    hmr: { label: '⚡ HMR: only Home.tsx', color: C.green, w: 190 },
  },
  steps: [
    { say: 'A bundler-based dev server must crawl and bundle the WHOLE app before serving anything.', tone: C.blue, set: { wpBar: { x: 28, y: 74, w: 420, anchor: 'left', visible: true } }, zones: { wp: { hi: true } } },
    { say: 'Big app → long wait on every cold start.', tone: C.blue, set: { wpReady: { x: 520, y: 74, glow: true } }, zones: { wp: { hi: true } } },
    { say: 'Vite starts instantly. It pre-bundles node_modules once with esbuild (written in Go, very fast)…', tone: C.purple, set: { vtReady: { x: 90, y: 202, glow: true }, pre: { x: 270, y: 168 } }, zones: { vt: { hi: true } } },
    { say: '…then serves YOUR source files as native ESM, on demand. The browser requests only what the page imports.', tone: C.purple, set: { m1: { x: 225, y: 210 }, m2: { x: 355, y: 210 }, m3: { x: 485, y: 210 } }, zones: { vt: { hi: true } }, arrows: [['m1', 'm2'], ['m2', 'm3']] },
    { say: 'Edit Home.tsx → only that module is invalidated and swapped. HMR stays fast no matter the app size.', tone: C.green, set: { m3: { glow: true, color: C.green }, hmr: { x: 500, y: 168, glow: true }, pre: null } },
    { say: 'For production, Vite still bundles (with Rollup) for optimal loading.', tone: C.yellow },
  ],
};

// ── Tree shaking ───────────────────────────────────────────────────────
const treeShaking = {
  title: 'Tree shaking drops exports nobody imports',
  accent: C.green,
  h: 270,
  code: `// utils.js
export const add = (a, b) => a + b;
export const sub = …; export const mul = …; export const div = …;
// app.js
import { add } from './utils';`,
  zones: {
    utils: { x: 12, y: 12, w: 300, h: 160, label: 'utils.js exports', color: C.gray, layout: 'grid' },
    bundle: { x: 328, y: 12, w: 300, h: 160, label: 'bundle.js', color: C.green, layout: 'grid' },
    note: { x: 12, y: 186, w: 616, h: 72, color: C.gray, text: 'Needs ES modules (static import/export) and sideEffects: false in package.json', round: 8 },
  },
  actors: {
    add: { label: 'add', color: C.blue, w: 80 },
    sub: { label: 'sub', color: C.blue, w: 80 },
    mul: { label: 'mul', color: C.blue, w: 80 },
    div: { label: 'div', color: C.blue, w: 80 },
  },
  steps: [
    { say: 'utils.js exports four functions.', line: [2, 3], set: { add: { in: 'utils' }, sub: { in: 'utils' }, mul: { in: 'utils' }, div: { in: 'utils' } }, zones: { utils: { hi: true } } },
    { say: 'app.js imports only add. Because ES imports are static, the bundler knows this at build time.', line: 5, set: { add: { glow: true, color: C.green } } },
    { say: 'Unused exports are marked as dead code…', tone: C.red, set: { sub: { strike: true }, mul: { strike: true }, div: { strike: true } } },
    { say: '…and removed during minification. Only add ships.', tone: C.green, set: { add: { in: 'bundle', glow: true }, sub: null, mul: null, div: null }, zones: { bundle: { hi: true } } },
    { say: 'CommonJS require() is dynamic and can’t be shaken. Prefer lodash-es or per-method imports over import _ from "lodash".', tone: C.orange, zones: { note: { hi: true, color: C.orange } } },
  ],
};

// ── Babel ──────────────────────────────────────────────────────────────
const babel = pipeline({
  title: 'Babel: parse → transform → generate',
  accent: C.yellow,
  perRow: 3,
  token: { label: 'const f = a => a ?? 1', color: C.blue, w: 180 },
  stages: [
    { id: 'parse', label: '1 · Parse', color: C.blue, out: 'AST (tree)', say: 'Source code is parsed into an Abstract Syntax Tree. Every node is a typed object.' },
    { id: 'transform', label: '2 · Transform', color: C.purple, out: 'plugins rewrite nodes', say: 'Plugins visit nodes: arrow functions become functions, ?? becomes a ternary, JSX becomes calls.' },
    { id: 'generate', label: '3 · Generate', color: C.green, out: 'var f = function(a){…}', say: 'The modified AST is printed back to code, plus a source map.' },
  ],
  outro: '@babel/preset-env picks transforms from your browserslist. Syntax is transpiled; missing APIs need polyfills (core-js).',
});

// ── CI/CD pipeline ─────────────────────────────────────────────────────
const cicd = pipeline({
  title: 'Every push runs the same pipeline',
  accent: C.green,
  perRow: 3,
  token: { label: 'git push (PR)', color: C.yellow },
  stages: [
    { id: 'install', label: '1 · Install', color: C.gray, out: 'npm ci (cached)', say: 'A clean, reproducible install from the lockfile, cached between runs.' },
    { id: 'lint', label: '2 · Lint + types', color: C.blue, out: 'eslint · tsc ✓', say: 'Fast static checks fail early and cheaply.' },
    { id: 'test', label: '3 · Test', color: C.purple, out: 'unit + integration ✓', say: 'Tests run in parallel. A failure blocks the merge.' },
    { id: 'build', label: '4 · Build', color: C.orange, out: 'dist/ + bundle size', say: 'Production build, with bundle-size budgets checked.' },
    { id: 'preview', label: '5 · Preview deploy', color: C.cyan, out: 'pr-42.app.dev', say: 'A preview URL per PR for reviewers, and E2E tests run against it.' },
    { id: 'prod', label: '6 · Production', color: C.green, out: '🚀 live', say: 'Merge to main → deploy to production, with instant rollback to the previous build.' },
  ],
});

// ── Bundle analysis ────────────────────────────────────────────────────
const BX = 150;
const bb = (w, label, color) => ({ x: BX, w, anchor: 'left', label, color, h: 26, shape: 'bar', visible: true, fs: 10 });
const bundlePerf = {
  title: 'Find what’s heavy, then cut it',
  accent: C.orange,
  h: 280,
  zones: {
    chart: { x: 12, y: 12, w: 616, h: 222, label: 'main.js (gzipped) · 412 KB', color: C.orange },
    total: { x: 12, y: 244, w: 616, h: 30, color: C.gray, text: 'Run: npx source-map-explorer dist/*.js  ·  webpack-bundle-analyzer', round: 6 },
    l1: { x: 24, y: 46, w: 120, h: 26, color: '#0000', text: 'moment', ghost: true },
    l2: { x: 24, y: 86, w: 120, h: 26, color: '#0000', text: 'lodash', ghost: true },
    l3: { x: 24, y: 126, w: 120, h: 26, color: '#0000', text: 'chart lib', ghost: true },
    l4: { x: 24, y: 166, w: 120, h: 26, color: '#0000', text: 'your code', ghost: true },
  },
  actors: { b1: {}, b2: {}, b3: {}, b4: {} },
  steps: [
    { say: 'A bundle analyzer shows each dependency’s share of the bundle.', set: { b1: { ...bb(230, '230 KB · all locales', C.red), y: 59 }, b2: { ...bb(72, '72 KB', C.orange), y: 99 }, b3: { ...bb(160, '160 KB', C.yellow), y: 139 }, b4: { ...bb(110, '110 KB', C.blue), y: 179 } }, zones: { chart: { hi: true } } },
    { say: 'moment ships every locale. Replace it with date-fns or dayjs.', tone: C.green, set: { b1: { w: 12, label: '', color: C.green } }, zones: { chart: { label: 'main.js (gzipped) · 194 KB' } } },
    { say: 'import _ from "lodash" pulls everything. Import single functions instead.', tone: C.green, set: { b2: { w: 8, label: '', color: C.green } }, zones: { chart: { label: 'main.js (gzipped) · 130 KB' } } },
    { say: 'The chart is only used on /reports. Lazy-load it into its own chunk.', tone: C.purple, set: { b3: { w: 0, visible: false } }, zones: { chart: { label: 'main.js · 118 KB  (+ reports chunk on demand)', hi: true, color: C.green } } },
    { say: '412 KB → 118 KB on first load. Add a size budget in CI so it never creeps back.', tone: C.green, set: { b4: { glow: true } } },
  ],
};

// ── Testing pyramid ────────────────────────────────────────────────────
const pyramid = {
  title: 'The testing pyramid',
  accent: C.purple,
  h: 290,
  zones: {
    e2e: { x: 230, y: 14, w: 180, h: 70, label: 'E2E', color: C.red, layout: 'row' },
    int: { x: 150, y: 96, w: 340, h: 80, label: 'Integration', color: C.orange, layout: 'grid' },
    unit: { x: 50, y: 188, w: 540, h: 90, label: 'Unit', color: C.green, layout: 'grid' },
    meta: { x: 470, y: 14, w: 158, h: 70, color: C.gray, ghost: true, text: '' },
  },
  actors: {},
  steps: [
    { say: 'Unit tests: many, tiny, milliseconds each. Pure functions, hooks, reducers.', tone: C.green, zones: { unit: { hi: true } } },
    { say: 'Integration tests: fewer, check that pieces work together (component + store + mocked API).', tone: C.orange, zones: { int: { hi: true } } },
    { say: 'E2E tests: a handful of critical user journeys in a real browser (Playwright, Cypress). Slow and flaky-prone.', tone: C.red, zones: { e2e: { hi: true } } },
    { say: 'Higher = more confidence per test, but slower and costlier. Lower = fast feedback.', tone: C.purple, zones: { e2e: { hi: true }, int: { hi: true }, unit: { hi: true }, meta: { text: '↑ confidence\n↓ speed', show: true } } },
    { say: 'The “testing trophy” view: weight integration tests most for frontend, since they test how users actually use the app.', tone: C.orange, zones: { int: { hi: true, x: 100, w: 440 }, unit: { x: 140, w: 360 } } },
  ],
};
// fill the layers with little test chips
const fill = (zone, n, color, label, w) => {
  const out = {};
  for (let i = 0; i < n; i++) out[`${zone}${i}`] = { label, color, w, h: 20, fs: 9 };
  return out;
};
pyramid.actors = { ...fill('u', 12, C.green, '2ms', 34), ...fill('i', 5, C.orange, '200ms', 52), ...fill('e', 2, C.red, '30s', 44) };
pyramid.steps[0].set = Object.fromEntries(Object.keys(fill('u', 12)).map((id) => [id, { in: 'unit' }]));
pyramid.steps[1].set = Object.fromEntries(Object.keys(fill('i', 5)).map((id) => [id, { in: 'int' }]));
pyramid.steps[2].set = Object.fromEntries(Object.keys(fill('e', 2)).map((id) => [id, { in: 'e2e' }]));

// ── Mocking ────────────────────────────────────────────────────────────
const mocking = sequence({
  title: 'Mocks replace slow or unpredictable dependencies',
  accent: C.purple,
  chipW: 130,
  lanes: [
    { id: 'test', label: 'Test', color: C.blue },
    { id: 'comp', label: '<UserCard />', color: C.cyan },
    { id: 'mock', label: 'MSW mock', color: C.purple },
    { id: 'real', label: 'Real API', color: C.gray, text: '🌐 slow · flaky\n· costs money' },
  ],
  msgs: [
    { from: 'test', to: 'comp', label: 'render()', say: 'The test renders the component.' },
    { from: 'comp', to: 'mock', label: 'GET /api/user', color: C.cyan, say: 'It calls fetch as usual, but Mock Service Worker intercepts at the network layer.', zones: { real: { dim: true } } },
    { from: 'mock', to: 'comp', label: "{ name: 'Ana' }", color: C.purple, say: 'A canned response comes back instantly and deterministically. You can also simulate 500s and timeouts.' },
    { from: 'test', to: 'comp', label: "expect('Ana')", color: C.green, say: 'Assert on what the user sees.' },
    { say: 'Stubs return fixed values; spies (jest.fn) record calls; fakes are lightweight implementations. Over-mocking hides integration bugs.', tone: C.orange, zones: { mock: { hi: true } } },
  ],
});

// ── React Testing Library ──────────────────────────────────────────────
const rtl = {
  title: 'Test what the user sees and does',
  accent: C.red,
  h: 280,
  code: `render(<Cart />);
await user.click(screen.getByRole('button', { name: /add/i }));
expect(screen.getByText('1 item')).toBeInTheDocument();`,
  zones: {
    dom: { x: 200, y: 12, w: 428, h: 256, label: 'Rendered DOM (jsdom)', color: C.blue },
    btn: { x: 230, y: 60, w: 160, h: 50, color: C.gray, text: '[ Add to cart ]' },
    count: { x: 230, y: 140, w: 160, h: 50, color: C.gray, text: '0 items' },
    q: { x: 12, y: 12, w: 170, h: 256, label: 'Query', color: C.red, layout: 'col' },
  },
  actors: {
    find: { label: "getByRole('button')", color: C.red, w: 150 },
    click: { label: 'user.click()', color: C.yellow, w: 150 },
    assert: { label: "getByText('1 item')", color: C.green, w: 150 },
  },
  steps: [
    { say: 'render() mounts the component into a real DOM (jsdom).', line: 1, zones: { dom: { hi: true } } },
    { say: 'Find elements the way users do: by role and accessible name, not class names or state.', tone: C.red, line: 2, set: { find: { in: 'q', glow: true } }, zones: { btn: { hi: true, color: C.red } }, arrows: [['find', 'btn', { color: C.red }]] },
    { say: 'Interact with userEvent, which fires real event sequences (pointerdown, mouseup, click…).', tone: C.yellow, line: 2, set: { click: { in: 'q', glow: true } }, zones: { btn: { hi: true, color: C.yellow } }, arrows: [['click', 'btn', { color: C.yellow }]] },
    { say: 'Assert on visible output.', tone: C.green, line: 3, set: { assert: { in: 'q', glow: true } }, zones: { count: { text: '1 item', hi: true, color: C.green }, btn: { color: C.gray } }, arrows: [['assert', 'count', { color: C.green }]] },
    { say: 'No internals tested → refactors don’t break tests. Bonus: role queries nudge you toward accessible markup.', tone: C.purple },
  ],
};

// ── Micro-frontends ────────────────────────────────────────────────────
const microFrontends = sequence({
  title: 'A shell composes independently deployed apps at runtime',
  accent: C.purple,
  chipW: 130,
  lanes: [
    { id: 'browser', label: 'Browser', color: C.blue },
    { id: 'shell', label: 'Shell (host)', color: C.purple },
    { id: 'catalog', label: 'Catalog · Team A', color: C.green },
    { id: 'checkout', label: 'Checkout · Team B', color: C.orange },
  ],
  msgs: [
    { from: 'browser', to: 'shell', label: 'GET /', say: 'The browser loads a thin shell: routing, auth and layout.' },
    { from: 'shell', to: 'catalog', label: 'remoteEntry.js', color: C.green, say: 'On /products, the shell fetches Team A’s remote entry from their CDN (Module Federation).' },
    { from: 'catalog', to: 'browser', label: '<Catalog/> ✓', color: C.green, say: 'React is shared as a singleton, so it isn’t downloaded twice.' },
    { from: 'shell', to: 'checkout', label: 'remoteEntry.js', color: C.orange, say: 'On /checkout, Team B’s app is loaded the same way.' },
    { from: 'checkout', to: 'browser', label: '<Checkout/> ✓', color: C.orange, say: 'Each team deploys on its own schedule. Trade-offs: shared-dependency versioning, UX consistency, overhead.' },
  ],
});

// ── DevTools Network waterfall ─────────────────────────────────────────
const WX = 150;
const wb = (row, start, len, label, color) => ({ x: WX + start, y: 46 + row * 40, w: len, anchor: 'left', label, color, h: 22, shape: 'bar', visible: true, fs: 9 });
const networkWaterfall = {
  title: 'Reading the waterfall',
  accent: C.blue,
  h: 280,
  zones: {
    grid: { x: 12, y: 12, w: 616, h: 256, label: 'Network panel · waterfall', color: C.gray },
    n1: { x: 20, y: 34, w: 124, h: 24, ghost: true, color: '#0000', text: 'document' },
    n2: { x: 20, y: 74, w: 124, h: 24, ghost: true, color: '#0000', text: 'styles.css' },
    n3: { x: 20, y: 114, w: 124, h: 24, ghost: true, color: '#0000', text: 'app.js' },
    n4: { x: 20, y: 154, w: 124, h: 24, ghost: true, color: '#0000', text: 'GET /api/user' },
    n5: { x: 20, y: 194, w: 124, h: 24, ghost: true, color: '#0000', text: 'font.woff2' },
  },
  actors: { a: {}, a2: {}, b: {}, c: {}, d: {}, e: {}, ttfb: {} },
  steps: [
    { say: 'Each row is a request. Bar position = when it started, length = how long it took.', set: { a: wb(0, 0, 40, 'conn', C.gray), a2: wb(0, 40, 80, 'response', C.blue) }, zones: { grid: { hi: true } } },
    { say: 'The light part before the response is TTFB, the server’s think time. A long TTFB points at the backend, not the frontend.', tone: C.yellow, set: { ttfb: { x: WX + 80, y: 26, label: '⬇ TTFB', color: C.yellow, w: 70, h: 18, shape: 'text', fs: 10, visible: true } } },
    { say: 'CSS and JS are discovered only after HTML arrives, so they start later.', tone: C.purple, set: { ttfb: null, b: wb(1, 125, 90, 'styles.css', C.purple), c: wb(2, 125, 150, 'app.js', C.yellow) } },
    { say: 'The API call can only start after app.js runs → a request CHAIN. Chains are what make waterfalls slow.', tone: C.red, set: { d: wb(3, 280, 130, '/api/user', C.red) } },
    { say: 'The font is found inside CSS, so it is late too. Fix with <link rel="preload"> to start it at 0.', tone: C.orange, set: { e: wb(4, 220, 80, 'font', C.orange) } },
    { say: 'Preload critical assets and start data fetches earlier (in HTML or on the server) to flatten the waterfall.', tone: C.green, set: { e: { x: WX + 20, color: C.green, label: 'font ✓' }, d: { x: WX + 130, color: C.green, label: '/api/user (early) ✓' } } },
  ],
};

// ── DevTools Performance: long tasks ───────────────────────────────────
const PX = 20;
const pb = (start, len, y, label, color, extra = {}) => ({ x: PX + start, y, w: len, anchor: 'left', label, color, h: 22, shape: 'bar', visible: true, fs: 9, ...extra });
const perfPanel = {
  title: 'Finding a long task in the Performance panel',
  accent: C.red,
  h: 290,
  zones: {
    fps: { x: 12, y: 12, w: 616, h: 50, label: 'Frames', color: C.green },
    main: { x: 12, y: 74, w: 616, h: 204, label: 'Main thread · flame chart', color: C.blue },
  },
  actors: {
    t1: {}, t2: {}, t3: {}, t4: {},
    f1: {}, f2: {}, f3: {},
    jank: {},
  },
  steps: [
    { say: 'Record while you interact. The Main track shows every task the main thread ran.', set: { t1: pb(10, 50, 110, 'Task', C.gray), t2: pb(70, 40, 110, 'Task', C.gray), t3: pb(130, 330, 110, 'Task · 320ms', C.gray), t4: pb(470, 60, 110, 'Task', C.gray) }, zones: { main: { hi: true } } },
    { say: 'Tasks over 50ms are long tasks, flagged with red corners. They block input → poor INP.', tone: C.red, set: { t3: { color: C.red, glow: true } }, zones: { fps: { hi: true, color: C.red, label: 'Frames · dropped 🟥🟥🟥' } } },
    { say: 'Expand it: the flame chart shows the call stack underneath. Width = time spent.', tone: C.blue, set: { f1: pb(130, 330, 146, 'onClick (Filter)', C.yellow), f2: pb(130, 300, 182, 'sortProducts()', C.orange), f3: pb(140, 270, 218, 'JSON.parse · deepClone', C.purple) } },
    { say: 'The widest bar at the bottom is your hot spot: here deepClone inside a sort comparator.', tone: C.purple, set: { f3: { glow: true } } },
    { say: 'Fix (memoize, move to a worker, or chunk the work) and re-record. The long task is gone.', tone: C.green, set: { t3: { w: 60, color: C.green, label: '40ms', glow: false }, f1: { w: 60, label: 'onClick' }, f2: { w: 40, label: 'sort' }, f3: { w: 0, visible: false }, t4: { x: PX + 200 } }, zones: { fps: { color: C.green, label: 'Frames · smooth ✓' } } },
  ],
};

// ── DevTools Memory: heap snapshots ────────────────────────────────────
const memPanel = {
  title: 'Compare heap snapshots to find a leak',
  accent: C.purple,
  h: 280,
  zones: {
    s1: { x: 12, y: 12, w: 190, h: 110, label: 'Snapshot 1', color: C.blue, text: '12 MB', big: true },
    act: { x: 225, y: 12, w: 190, h: 110, label: 'Interact', color: C.gray, text: 'open + close modal ×5' },
    s2: { x: 438, y: 12, w: 190, h: 110, label: 'Snapshot 2', color: C.purple, text: '?', big: true },
    diff: { x: 12, y: 140, w: 616, h: 128, label: 'Comparison view', color: C.red, layout: 'col' },
  },
  actors: {
    d1: { label: 'Detached HTMLDivElement  +5', color: C.red, w: 300 },
    d2: { label: 'retainer: window → listeners → closure → div', color: C.orange, w: 420 },
  },
  steps: [
    { say: 'Take a heap snapshot as a baseline.', zones: { s1: { hi: true } } },
    { say: 'Do the suspected action several times (open/close a modal).', tone: C.yellow, zones: { act: { hi: true } }, arrows: [['s1', 'act']] },
    { say: 'Take a second snapshot. Memory should return to baseline. It didn’t.', tone: C.red, zones: { s2: { text: '19 MB', hi: true, color: C.red } }, arrows: [['act', 's2']] },
    { say: 'Comparison view: 5 new detached DOM nodes, removed from the page but still in memory.', tone: C.red, set: { d1: { in: 'diff', glow: true } }, zones: { diff: { hi: true } } },
    { say: 'The Retainers panel shows WHY: a window listener’s closure still references them. Remove the listener on close.', tone: C.orange, set: { d2: { in: 'diff', glow: true } } },
  ],
};

// ── Memory leak mechanism ──────────────────────────────────────────────
const memLeak = {
  title: 'A forgotten listener keeps unmounted components alive',
  accent: C.red,
  h: 290,
  code: `useEffect(() => {
  const onResize = () => setWidth(window.innerWidth);
  window.addEventListener('resize', onResize);
  // ❌ missing: return () => window.removeEventListener('resize', onResize);
}, []);`,
  zones: {
    win: { x: 12, y: 12, w: 190, h: 266, label: 'window listeners', color: C.orange, layout: 'col' },
    heap: { x: 220, y: 12, w: 408, h: 190, label: 'Heap (still referenced)', color: C.red, layout: 'grid' },
    meter: { x: 220, y: 216, w: 408, h: 62, label: 'Memory', color: C.gray },
  },
  actors: {
    l1: { label: 'onResize #1', color: C.orange, w: 150 }, l2: { label: 'onResize #2', color: C.orange, w: 150 }, l3: { label: 'onResize #3', color: C.orange, w: 150 },
    c1: { label: '<Chart> #1 (unmounted)', color: C.red, w: 190 }, c2: { label: '<Chart> #2 (unmounted)', color: C.red, w: 190 }, c3: { label: '<Chart> #3', color: C.blue, w: 190 },
    bar: { label: '', color: C.red, w: 40, h: 16, shape: 'bar' },
  },
  steps: [
    { say: 'Chart mounts and adds a resize listener. The listener’s closure references the component.', line: [2, 3], set: { l1: { in: 'win' }, c1: { in: 'heap', label: '<Chart> #1', color: C.blue }, bar: { x: 232, y: 252, w: 60, anchor: 'left', visible: true } }, arrows: [['l1', 'c1', { color: C.orange }]] },
    { say: 'Navigate away: Chart unmounts. But the listener was never removed…', tone: C.red, line: 4, set: { c1: { label: '<Chart> #1 (unmounted)', color: C.red, shake: true } }, arrows: [['l1', 'c1', { color: C.red, label: 'still holds it' }]] },
    { say: '…so the GC can’t free it. Come back and leave again: another copy leaks.', tone: C.red, set: { l2: { in: 'win' }, c2: { in: 'heap' }, bar: { w: 160 } } },
    { say: 'Every visit adds one. Memory grows forever, and setState on dead components fires too.', tone: C.red, set: { l3: { in: 'win' }, c3: { in: 'heap' }, bar: { w: 300 } }, zones: { meter: { hi: true, color: C.red } } },
    { say: 'Fix: return a cleanup that removes the listener (also clear timers, abort fetches, unsubscribe).', tone: C.green, line: 4, set: { l1: null, l2: null, c1: null, c2: null, bar: { w: 60, color: C.green } }, zones: { meter: { color: C.green }, heap: { color: C.green, label: 'Heap (freed ✓)' } } },
  ],
};

// ── DevTools Sources: stepping ─────────────────────────────────────────
const sources = {
  title: 'Breakpoints: pause, inspect, step',
  accent: C.yellow,
  h: 200,
  code: `function total(cart) {
  let sum = 0;
  for (const item of cart) {
    sum += price(item);
  }
  return sum;
}
const price = (i) => i.cost * i.qty;`,
  zones: {
    scope: { x: 12, y: 12, w: 300, h: 176, label: 'Scope', color: C.purple, layout: 'col' },
    stack: { x: 328, y: 12, w: 300, h: 176, label: 'Call stack', color: C.blue, layout: 'stack' },
  },
  actors: {
    v1: { label: 'sum = 0', color: C.purple, w: 220 },
    v2: { label: 'item = { cost: 50, qty: 2 }', color: C.purple, w: 260 },
    fTotal: { label: 'total', color: C.blue, w: 200 },
    fPrice: { label: 'price', color: C.cyan, w: 200 },
  },
  steps: [
    { say: 'Click a line number to set a breakpoint. Execution pauses BEFORE that line runs.', line: 2, set: { fTotal: { in: 'stack' } }, zones: { stack: { hi: true } } },
    { say: 'Step over (F10): run the line, stop at the next. Scope updates live.', line: 3, set: { v1: { in: 'scope', glow: true } }, zones: { scope: { hi: true } } },
    { say: 'Step over again: the loop variable appears.', line: 4, set: { v2: { in: 'scope', glow: true } } },
    { say: 'Step into (F11): jump inside price(). It is pushed on the call stack.', tone: C.cyan, line: 8, set: { fPrice: { in: 'stack', glow: true } }, zones: { stack: { hi: true } } },
    { say: 'Step out (Shift+F11): finish price() and return to total. sum is updated.', tone: C.blue, line: 4, set: { fPrice: null, v1: { label: 'sum = 100', glow: true } } },
    { say: 'Conditional breakpoints (item.qty > 10) and logpoints let you debug without editing code.', tone: C.yellow, line: 6 },
  ],
};

// ── Design system propagation ──────────────────────────────────────────
const designSystem = pipeline({
  title: 'Change a token once, update every product',
  accent: C.pink,
  token: { label: '--color-brand: #6366f1', color: C.purple, w: 170 },
  stages: [
    { id: 'tokens', label: '1 · Design tokens', color: C.purple, say: 'Colors, spacing and type live as tokens (JSON → CSS variables).' },
    { id: 'prims', label: '2 · Primitives', color: C.blue, out: 'Box · Text · Stack', say: 'Primitives consume tokens, never raw hex values.' },
    { id: 'comps', label: '3 · Components', color: C.cyan, out: 'Button · Modal · Table', say: 'Components are built from primitives, with a11y and variants baked in.' },
    { id: 'apps', label: '4 · Products', color: C.green, out: 'web · admin · iOS', say: 'Product teams install a versioned package (@acme/ui).' },
  ],
  outro: 'Rebrand = one token change → new release → every app updates consistently. Storybook documents it all.',
});

export default {
  'bundler-webpack': webpack,
  'bundler-vite': vite,
  'bundler-rollup': treeShaking,
  'bundler-babel': babel,
  'bundler-cicd': cicd,
  'bundler-perf': bundlePerf,
  'testing-pyramid': pyramid,
  mocking,
  'react-testing': rtl,
  'micro-frontends': microFrontends,
  'devtools-network': networkWaterfall,
  'devtools-performance': perfPanel,
  'devtools-memory': memPanel,
  'db-memory-leak': memLeak,
  'devtools-sources': sources,
  'design-system': designSystem,
};
