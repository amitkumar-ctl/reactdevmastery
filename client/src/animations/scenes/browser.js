import { C, pipeline, rows } from '../engine/helpers';

// ── Browser rendering pipeline ─────────────────────────────────────────
const renderingPipeline = pipeline({
  title: 'From HTML bytes to pixels',
  accent: C.blue,
  token: { label: '<html> bytes', color: C.yellow },
  stages: [
    { id: 'dom', label: '1 · DOM', color: C.blue, out: 'DOM tree', say: 'HTML is parsed into the DOM tree.' },
    { id: 'cssom', label: '2 · CSSOM', color: C.purple, out: '+ CSSOM', say: 'CSS is parsed into the CSSOM. Rendering waits for it.' },
    { id: 'render', label: '3 · Render tree', color: C.cyan, out: 'render tree', say: 'DOM + CSSOM merge. display:none nodes are dropped.' },
    { id: 'layout', label: '4 · Layout', color: C.orange, out: 'boxes (x,y,w,h)', say: 'Layout computes the size and position of every box.' },
    { id: 'paint', label: '5 · Paint', color: C.pink, out: 'draw calls', say: 'Paint fills in text, colours, borders and shadows.' },
    { id: 'composite', label: '6 · Composite', color: C.green, out: 'pixels ✓', say: 'The GPU composites the layers into the final frame.' },
  ],
  outro: 'Changing layout re-runs 4→6. transform/opacity only re-run step 6.',
});

// ── Critical rendering path (same mechanics, perf framing) ─────────────
const criticalRendering = {
  title: 'What blocks the first paint?',
  accent: C.orange,
  h: 300,
  zones: {
    net: { x: 12, y: 12, w: 616, h: 96, label: 'Network', color: C.gray, layout: 'row' },
    main: { x: 12, y: 122, w: 616, h: 80, label: 'Main thread', color: C.blue, layout: 'row' },
    screen: { x: 12, y: 216, w: 616, h: 72, label: 'Screen', color: C.green, text: 'blank', big: true },
  },
  actors: {
    html: { label: 'index.html', color: C.blue, w: 110 },
    css: { label: 'styles.css', color: C.purple, w: 110 },
    js: { label: 'app.js (sync)', color: C.yellow, w: 120 },
    img: { label: 'hero.jpg', color: C.gray, w: 100 },
    dom: { label: 'DOM', color: C.blue, w: 80 },
    cssom: { label: 'CSSOM', color: C.purple, w: 80 },
    exec: { label: 'run JS', color: C.yellow, w: 90 },
    paint: { label: 'first paint', color: C.green, w: 110 },
  },
  steps: [
    { say: 'The browser downloads index.html and starts parsing.', set: { html: { in: 'net', glow: true }, dom: { in: 'main' } }, zones: { net: { hi: true } } },
    { say: 'It discovers styles.css — CSS is render-blocking.', tone: C.purple, set: { css: { in: 'net', glow: true } }, zones: { screen: { text: 'blank (waiting for CSS)' } } },
    { say: 'A sync <script> is parser-blocking: parsing stops until it downloads and runs.', tone: C.red, set: { js: { in: 'net', glow: true, shake: true }, dom: { strike: true } }, zones: { main: { hi: true, color: C.red } } },
    { say: 'Images are NOT render-blocking — they download in parallel.', tone: C.gray, set: { img: { in: 'net' } } },
    { say: 'CSS arrives → CSSOM is built. JS runs, then parsing resumes.', tone: C.yellow, set: { cssom: { in: 'main' }, exec: { in: 'main', glow: true }, dom: { strike: false } }, zones: { main: { color: C.blue, hi: true } } },
    { say: 'DOM + CSSOM ready → first paint.', tone: C.green, set: { paint: { in: 'main', glow: true } }, zones: { screen: { text: '🎨 first paint', hi: true } } },
    { say: 'Fewer, smaller blocking resources = faster first paint. Use defer, inline critical CSS.', tone: C.green, set: { js: { label: 'app.js (defer)', color: C.green } } },
  ],
};

// ── Reflow vs repaint is covered by an existing visualizer ─────────────

// ── Storage APIs: lifetime & scope ─────────────────────────────────────
const storage = {
  title: 'Where does the data live, and for how long?',
  accent: C.cyan,
  h: 300,
  zones: {
    tab1: { x: 12, y: 12, w: 300, h: 150, label: 'Tab A · example.com', color: C.blue, layout: 'col' },
    tab2: { x: 328, y: 12, w: 300, h: 150, label: 'Tab B · example.com', color: C.blue, layout: 'col' },
    server: { x: 12, y: 182, w: 616, h: 104, label: 'Server', color: C.gray, layout: 'row' },
  },
  actors: {
    ls: { label: 'localStorage', color: C.green, w: 140 },
    ls2: { label: 'localStorage', color: C.green, w: 140 },
    ss: { label: 'sessionStorage', color: C.yellow, w: 140 },
    ck: { label: 'cookie 🍪', color: C.orange, w: 110 },
    idb: { label: 'IndexedDB', color: C.purple, w: 140 },
    idb2: { label: 'IndexedDB', color: C.purple, w: 140 },
    ck2: { label: 'Cookie: sid=…', color: C.orange, w: 130 },
    ck3: { label: 'cookie 🍪', color: C.orange, w: 110 },
  },
  steps: [
    { say: 'Tab A saves data in localStorage, sessionStorage, a cookie and IndexedDB.', set: { ls: { in: 'tab1' }, ss: { in: 'tab1' }, ck: { in: 'tab1' }, idb: { in: 'tab1' } }, zones: { tab1: { hi: true } } },
    { say: 'Open Tab B on the same origin: localStorage, IndexedDB and cookies are shared.', tone: C.green, set: { ls2: { in: 'tab2', from: 'ls', glow: true }, idb2: { in: 'tab2', from: 'idb', glow: true }, ck3: { in: 'tab2', from: 'ck', glow: true } }, zones: { tab2: { hi: true } } },
    { say: 'sessionStorage is per-tab — Tab B never sees it.', tone: C.yellow, set: { ss: { glow: true, shake: true } } },
    { say: 'Cookies are the only one sent to the server automatically, on every request.', tone: C.orange, set: { ck2: { in: 'server', from: 'ck', glow: true } }, arrows: [['tab1', 'server', { label: 'Cookie: …', color: C.orange }]] },
    { say: 'Close Tab A → its sessionStorage is gone. localStorage persists until cleared.', tone: C.red, set: { ss: null, ls: null, ck: null, idb: null, ck2: null }, zones: { tab1: { dim: true }, tab2: { hi: true } } },
  ],
};

// ── async vs defer timeline ────────────────────────────────────────────
const T0 = 120; // x where the timeline starts
const asyncDefer = {
  title: 'Script loading: normal vs async vs defer',
  accent: C.yellow,
  h: 290,
  zones: {
    ...rows([
      ['normal', '<script>', C.red],
      ['async', '<script async>', C.orange],
      ['defer', '<script defer>', C.green],
    ], { top: 34, h: 70, gap: 14 }),
    legend: { x: 12, y: 6, w: 616, h: 22, ghost: true, color: '#0000' },
  },
  actors: {
    // normal
    nP1: { label: 'parse HTML', color: C.blue, w: 0, h: 18, shape: 'bar', fs: 10 },
    nDl: { label: 'download', color: C.gray, w: 0, h: 18, shape: 'bar', fs: 10 },
    nEx: { label: 'run', color: C.red, w: 0, h: 18, shape: 'bar', fs: 10 },
    nP2: { label: 'parse', color: C.blue, w: 0, h: 18, shape: 'bar', fs: 10 },
    // async
    aP1: { label: 'parse HTML', color: C.blue, w: 0, h: 18, shape: 'bar', fs: 10 },
    aDl: { label: 'download', color: C.gray, w: 0, h: 14, shape: 'bar', fs: 9 },
    aEx: { label: 'run', color: C.orange, w: 0, h: 18, shape: 'bar', fs: 10 },
    aP2: { label: 'parse', color: C.blue, w: 0, h: 18, shape: 'bar', fs: 10 },
    // defer
    dP1: { label: 'parse HTML (never blocked)', color: C.blue, w: 0, h: 18, shape: 'bar', fs: 10 },
    dDl: { label: 'download', color: C.gray, w: 0, h: 14, shape: 'bar', fs: 9 },
    dEx: { label: 'run', color: C.green, w: 0, h: 18, shape: 'bar', fs: 10 },
  },
  steps: [],
};
{
  const Y = (row, off = 0) => 34 + row * 84 + 44 + off;
  const bar = (row, x, w, off = 0) => ({ x, y: Y(row, off), w, anchor: 'left', visible: true });
  asyncDefer.steps = [
    { say: 'All three start the same way: the browser parses HTML.', set: {
      nP1: bar(0, T0, 140), aP1: bar(1, T0, 140), dP1: bar(2, T0, 140),
    } },
    { say: 'Plain <script>: parsing STOPS while the file downloads…', tone: C.red, set: { nDl: bar(0, T0 + 142, 150) }, zones: { normal: { hi: true } } },
    { say: '…and keeps waiting while it executes. The page is frozen the whole time.', tone: C.red, set: { nEx: bar(0, T0 + 294, 70) }, zones: { normal: { hi: true } } },
    { say: 'async: downloads in parallel with parsing…', tone: C.orange, set: { aDl: bar(1, T0 + 100, 150, -16), aP1: { w: 250 } }, zones: { async: { hi: true } } },
    { say: '…but runs the moment it arrives, pausing the parser. Order between async scripts is not guaranteed.', tone: C.orange, set: { aEx: bar(1, T0 + 252, 70), aP2: bar(1, T0 + 324, 140) }, zones: { async: { hi: true } } },
    { say: 'defer: downloads in parallel and the parser never stops.', tone: C.green, set: { dDl: bar(2, T0 + 100, 150, -16), dP1: { w: 330 } }, zones: { defer: { hi: true } } },
    { say: 'Deferred scripts run in order after parsing finishes, just before DOMContentLoaded.', tone: C.green, set: { dEx: bar(2, T0 + 332, 70), nP2: bar(0, T0 + 366, 130) }, zones: { defer: { hi: true } } },
    { say: 'Rule of thumb: defer for app code, async for independent scripts like analytics.', tone: C.green, zones: { defer: { hi: true }, async: { hi: true } } },
  ];
}

export default {
  'rendering-pipeline': renderingPipeline,
  'critical-rendering': criticalRendering,
  storage,
  'async-defer': asyncDefer,
};
