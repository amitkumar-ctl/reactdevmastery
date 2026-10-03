import { C, sequence } from '../engine/helpers';

// ── Specificity ────────────────────────────────────────────────────────
const specificity = {
  title: 'Which rule wins? Specificity decides',
  accent: C.yellow,
  h: 290,
  zones: {
    rules: { x: 12, y: 12, w: 360, h: 266, label: 'Rules matching <p id="hero" class="intro">', color: C.gray, layout: 'col' },
    preview: { x: 390, y: 12, w: 238, h: 266, label: 'Result', color: C.gray, text: 'Hello', big: true },
  },
  actors: {
    r1: { label: 'p { color: gray }      (0,0,1)', color: C.gray, w: 320 },
    r2: { label: '.intro { color: blue }   (0,1,0)', color: C.blue, w: 320 },
    r3: { label: '#hero { color: purple }  (1,0,0)', color: C.purple, w: 320 },
    r4: { label: 'style="color: orange"   inline', color: C.orange, w: 320 },
    r5: { label: '.intro { color: green !important }', color: C.green, w: 320 },
  },
  steps: [
    { say: 'Specificity is scored as (IDs, classes, elements). An element selector scores (0,0,1).', set: { r1: { in: 'rules', glow: true } }, zones: { preview: { color: C.gray, hi: true } } },
    { say: 'A class beats any number of element selectors: (0,1,0) > (0,0,1).', tone: C.blue, set: { r2: { in: 'rules', glow: true }, r1: { strike: true } }, zones: { preview: { color: C.blue, hi: true } } },
    { say: 'An ID beats any number of classes.', tone: C.purple, set: { r3: { in: 'rules', glow: true }, r2: { strike: true } }, zones: { preview: { color: C.purple, hi: true } } },
    { say: 'Inline styles beat all selectors.', tone: C.orange, set: { r4: { in: 'rules', glow: true }, r3: { strike: true } }, zones: { preview: { color: C.orange, hi: true } } },
    { say: '!important jumps over everything (avoid it, it starts an arms race).', tone: C.green, set: { r5: { in: 'rules', glow: true }, r4: { strike: true } }, zones: { preview: { color: C.green, hi: true } } },
    { say: 'Equal specificity? The rule that comes LAST wins. Keep specificity low and flat (BEM, :where(), @layer).', tone: C.yellow },
  ],
};

// ── Flexbox & Grid ─────────────────────────────────────────────────────
const items = ['A', 'B', 'C', 'D', 'E'];
const it = (x, y, w = 70, h = 44) => ({ x, y, w, h, visible: true });
const flexRow = (y, justify, cont) => {
  const w = 70; const gap = 10; const n = 5;
  const total = n * w + (n - 1) * gap;
  const set = {};
  items.forEach((id, i) => {
    let x;
    if (justify === 'start') x = cont.x + 12 + i * (w + gap) + w / 2;
    else if (justify === 'between') x = cont.x + 12 + w / 2 + i * ((cont.w - 24 - w) / (n - 1));
    else x = cont.x + (cont.w - total) / 2 + i * (w + gap) + w / 2;
    set[id] = it(x, y);
  });
  return set;
};
const box = { x: 40, y: 50, w: 560, h: 200 };
const cssLayout = {
  title: 'Flexbox is 1-D, Grid is 2-D',
  accent: C.cyan,
  h: 280,
  zones: {
    cont: { ...box, label: 'display: flex', color: C.cyan },
    prop: { x: 40, y: 12, w: 560, h: 30, color: C.gray, text: 'justify-content: flex-start', round: 6 },
  },
  actors: Object.fromEntries(items.map((id, i) => [id, { label: id, color: [C.blue, C.purple, C.pink, C.orange, C.yellow][i], w: 70, h: 44, fs: 14 }])),
  steps: [
    { say: 'Flex items line up along one axis (the main axis).', set: flexRow(150, 'start', box), zones: { cont: { hi: true } } },
    { say: 'justify-content distributes space along the main axis.', tone: C.cyan, set: flexRow(150, 'between', box), zones: { prop: { text: 'justify-content: space-between' } } },
    { say: 'align-items positions them on the cross axis.', tone: C.cyan, set: Object.fromEntries(Object.entries(flexRow(90, 'center', box))), zones: { prop: { text: 'justify-content: center · align-items: flex-start' } } },
    { say: 'Narrow container + flex-wrap: items wrap onto new lines. Each line is laid out on its own.', tone: C.blue, set: { A: it(195, 110), B: it(275, 110), C: it(355, 110), D: it(195, 170), E: it(275, 170) }, zones: { cont: { x: 150, w: 340, label: 'display: flex · flex-wrap: wrap' }, prop: { text: 'items flow; rows are independent' } } },
    { say: 'Grid defines rows AND columns up front. Items snap into cells and can span tracks.', tone: C.purple, set: { A: it(218, 105, 173, 44), B: it(368, 105, 86, 44), C: it(465, 105, 86, 44), D: it(175, 165, 86, 44), E: it(368, 165, 279, 44) }, zones: { cont: { x: 120, w: 400, label: 'display: grid · grid-template-columns: repeat(4, 1fr)', color: C.purple }, prop: { text: 'A spans 2 cols · E spans 3 cols' } } },
    { say: 'Rule of thumb: Flexbox for components (navbars, toolbars), Grid for page layouts and 2-D arrangements.', tone: C.green, zones: { cont: { hi: true } } },
  ],
};

// ── CSS custom properties ──────────────────────────────────────────────
const cssVars = {
  title: 'One variable, every component updates',
  accent: C.purple,
  h: 290,
  zones: {
    root: { x: 12, y: 12, w: 616, h: 60, label: ':root', color: C.blue, text: '--brand: #4facfe;  --bg: #0b1120' },
    page: { x: 12, y: 86, w: 616, h: 192, label: 'Page', color: C.gray, layout: 'row' },
    card: { x: 440, y: 120, w: 176, h: 140, label: '.card { --brand: pink }', color: C.pink, layout: 'col', show: false },
  },
  actors: {
    btn: { label: 'Button', color: C.blue, w: 110, h: 40 },
    link: { label: 'Link', color: C.blue, w: 90, h: 40 },
    head: { label: 'Header', color: C.blue, w: 110, h: 40 },
    cbtn: { label: 'Button', color: C.pink, w: 110, h: 40 },
  },
  steps: [
    { say: 'Components use var(--brand) instead of a hard-coded colour.', set: { btn: { x: 90, y: 185 }, link: { x: 200, y: 185 }, head: { x: 315, y: 185 } }, zones: { root: { hi: true } }, arrows: [['root', 'page', { label: 'inherited' }]] },
    { say: 'Change --brand once on :root, at runtime with no rebuild, and everything re-themes.', tone: C.green, set: { btn: { color: C.green, glow: true }, link: { color: C.green, glow: true }, head: { color: C.green, glow: true } }, zones: { root: { text: '--brand: #00ff88;  --bg: #0b1120', hi: true, color: C.green } } },
    { say: 'Variables cascade, so you can override them for a subtree.', tone: C.pink, set: { btn: { glow: false }, link: { glow: false }, head: { glow: false }, cbtn: { in: 'card', glow: true } }, zones: { card: { show: true, hi: true } } },
    { say: 'Dark mode = swap the variable values under [data-theme="dark"] or prefers-color-scheme.', tone: C.yellow, set: { btn: { color: C.yellow }, link: { color: C.yellow }, head: { color: C.yellow } }, zones: { root: { text: '[data-theme=dark] { --brand: #eab308; --bg: #000 }', color: C.yellow, hi: true }, page: { color: C.yellow } } },
    { say: 'Unlike Sass variables (compile-time), CSS variables live in the browser: inspectable, animatable, JS-settable.', tone: C.purple },
  ],
};

// ── Container queries ──────────────────────────────────────────────────
const containerQ = {
  title: 'Container queries: components respond to their container',
  accent: C.teal,
  h: 280,
  zones: {
    cont: { x: 12, y: 12, w: 616, h: 256, label: 'container-type: inline-size · 600px', color: C.teal },
  },
  actors: {
    img: { label: '🖼', color: C.blue, w: 160, h: 120, fs: 32 },
    title: { label: 'Product title', color: C.purple, w: 260, h: 34 },
    desc: { label: 'Description text…', color: C.gray, w: 260, h: 60 },
  },
  steps: [
    { say: 'A ProductCard sits in a wide container (600px): image beside text.', set: { img: { x: 120, y: 120 }, title: { x: 360, y: 80 }, desc: { x: 360, y: 140 } }, zones: { cont: { hi: true } } },
    { say: 'Move the same card into a 280px sidebar…', tone: C.yellow, zones: { cont: { w: 280, label: '280px', hi: true } } },
    { say: '…@container (width < 400px) kicks in and it stacks vertically. The viewport didn’t change, the container did.', tone: C.teal, set: { img: { x: 152, y: 100, w: 240, h: 100 }, title: { x: 152, y: 175, w: 240 }, desc: { x: 152, y: 225, w: 240, h: 44 } }, zones: { cont: { hi: true, label: '280px · @container (width < 400px)' } } },
    { say: 'Media queries ask “how wide is the screen?”. Container queries ask “how much room do I have?”, which makes components truly reusable.', tone: C.green, set: { img: { x: 120, y: 120, w: 160, h: 120 }, title: { x: 360, y: 80, w: 260 }, desc: { x: 360, y: 140, w: 260, h: 60 } }, zones: { cont: { w: 616, label: 'container-type: inline-size · 600px' } } },
  ],
};

// ── Transitions vs keyframes ───────────────────────────────────────────
const transitions = {
  title: 'Transitions go A → B. Keyframes follow a script.',
  accent: C.pink,
  h: 260,
  zones: {
    t: { x: 12, y: 12, w: 616, h: 110, label: 'transition: transform .3s ease', color: C.blue },
    k: { x: 12, y: 138, w: 616, h: 110, label: '@keyframes bounce { 0% · 50% · 100% }', color: C.pink },
  },
  actors: {
    tb: { label: 'A', color: C.blue, w: 50, h: 50, fs: 16 },
    kb: { label: '0%', color: C.pink, w: 50, h: 50, fs: 12, shape: 'dot' },
  },
  steps: [
    { say: 'A transition needs a trigger (hover, class change). It interpolates from the current state to the new one.', set: { tb: { x: 70, y: 72 }, kb: { x: 70, y: 198 } }, zones: { t: { hi: true } } },
    { say: ':hover → the browser animates A → B automatically.', tone: C.blue, set: { tb: { x: 560, y: 72, label: 'B', glow: true } }, zones: { t: { hi: true } } },
    { say: 'Remove the trigger and it transitions back. Only two states, start and end.', tone: C.blue, set: { tb: { x: 70, label: 'A', glow: false } } },
    { say: 'Keyframes define intermediate steps and run on their own, no trigger needed.', tone: C.pink, set: { kb: { x: 315, y: 166, label: '50%', glow: true } }, zones: { k: { hi: true } } },
    { say: '…then 100%. With iteration-count: infinite and alternate, it loops.', tone: C.pink, set: { kb: { x: 560, y: 198, label: '100%' } }, zones: { k: { hi: true } } },
    { say: 'Use transitions for state changes (hover, open/close) and keyframes for loaders, attention cues and multi-step motion.', tone: C.green, set: { kb: { x: 70, label: '0%', glow: false } } },
  ],
};

// ── GPU compositing ────────────────────────────────────────────────────
const gpu = {
  title: 'Animate on the compositor, not the main thread',
  accent: C.green,
  h: 280,
  zones: {
    main: { x: 12, y: 12, w: 360, h: 256, label: 'Main thread', color: C.blue },
    gpu: { x: 388, y: 12, w: 240, h: 256, label: 'Compositor · GPU', color: C.green },
    layout: { x: 30, y: 50, w: 100, h: 60, color: C.orange, text: 'Layout' },
    paint: { x: 150, y: 50, w: 100, h: 60, color: C.pink, text: 'Paint' },
    js: { x: 270, y: 50, w: 86, h: 60, color: C.yellow, text: 'JS' },
    comp: { x: 410, y: 50, w: 196, h: 60, color: C.green, text: 'Composite layers' },
    layerA: { x: 420, y: 140, w: 120, h: 80, color: C.gray, text: 'page layer', dashed: true },
    layerB: { x: 470, y: 160, w: 120, h: 80, color: C.cyan, text: '.box layer', dashed: true, show: false },
  },
  actors: {
    f1: { label: 'frame', color: C.red, w: 56, h: 22, fs: 9 },
  },
  steps: [
    { say: 'Animating left/top/width changes geometry, so EVERY frame re-runs layout and paint on the main thread.', tone: C.red, set: { f1: { x: 80, y: 140 } }, zones: { layout: { hi: true }, paint: { hi: true }, main: { color: C.red } } },
    { say: 'If JS is busy at the same time, frames are dropped → jank.', tone: C.red, set: { f1: { x: 313, y: 140, shake: true } }, zones: { js: { hi: true } } },
    { say: 'transform and opacity are different. The element is promoted to its own compositor layer…', tone: C.cyan, set: { f1: null }, zones: { main: { color: C.blue }, layerB: { show: true, hi: true } } },
    { say: '…and each frame the GPU just moves or fades that layer. No layout, no paint, even while the main thread is busy.', tone: C.green, zones: { comp: { hi: true }, layerB: { x: 490, y: 175, hi: true } } },
    { say: 'will-change: transform hints promotion ahead of time. Don’t overuse it: every layer costs GPU memory.', tone: C.yellow, zones: { layerB: { x: 470, y: 160 }, gpu: { hi: true } } },
  ],
};

// ── Which properties are expensive ─────────────────────────────────────
const stageZ = (x, label, color) => ({ x, y: 30, w: 140, h: 70, color, text: label });
const animPerf = {
  title: 'What each property costs per frame',
  accent: C.orange,
  h: 250,
  zones: {
    s1: stageZ(12, 'Style', C.gray),
    s2: stageZ(170, 'Layout', C.orange),
    s3: stageZ(328, 'Paint', C.pink),
    s4: stageZ(486, 'Composite', C.green),
    prop: { x: 12, y: 130, w: 616, h: 100, label: 'Animating', color: C.gray, layout: 'center' },
  },
  edges: [['s1', 's2'], ['s2', 's3'], ['s3', 's4']],
  actors: { p: { label: 'width / height / top', color: C.red, w: 240, h: 40, fs: 13 } },
  steps: [
    { say: 'width, height, top, margin change geometry → Layout → Paint → Composite. Most expensive.', tone: C.red, set: { p: { in: 'prop', glow: true } }, zones: { s1: { hi: true }, s2: { hi: true }, s3: { hi: true }, s4: { hi: true } } },
    { say: 'color, background, box-shadow skip layout but still repaint pixels.', tone: C.pink, set: { p: { label: 'color / background / shadow', color: C.pink } }, zones: { s1: { hi: true }, s3: { hi: true }, s4: { hi: true }, s2: { dim: true } } },
    { say: 'transform and opacity skip layout AND paint. Composite only → smooth 60fps.', tone: C.green, set: { p: { label: 'transform / opacity', color: C.green, glow: true } }, zones: { s4: { hi: true }, s2: { dim: true }, s3: { dim: true } } },
    { say: 'So: slide with translateX, not left. Expand with scale or the FLIP technique. Fade with opacity.', tone: C.green, zones: { s2: { dim: false }, s3: { dim: false }, s4: { hi: true } } },
  ],
};

// ── Layout shift ───────────────────────────────────────────────────────
const cls = {
  title: 'Layout shift: content jumps when late stuff loads',
  accent: C.red,
  h: 300,
  zones: {
    bad: { x: 12, y: 12, w: 300, h: 276, label: 'No size reserved', color: C.red },
    good: { x: 328, y: 12, w: 300, h: 276, label: 'aspect-ratio / width+height', color: C.green },
    ph: { x: 344, y: 46, w: 268, h: 110, color: C.gray, text: 'reserved 16:9', dashed: true },
  },
  actors: {
    t1: { label: 'Headline', color: C.blue, w: 260, h: 30 },
    b1: { label: 'Buy now', color: C.yellow, w: 120, h: 34 },
    img1: { label: '🖼 image', color: C.purple, w: 268, h: 110 },
    cur: { label: '👆', color: C.yellow, w: 30, h: 30, shape: 'text', fs: 20 },
    t2: { label: 'Headline', color: C.blue, w: 260, h: 30 },
    b2: { label: 'Buy now', color: C.yellow, w: 120, h: 34 },
    img2: { label: '🖼 image', color: C.purple, w: 268, h: 110 },
  },
  steps: [
    { say: 'The page renders text first. The image hasn’t loaded and has no dimensions.', set: { t1: { x: 162, y: 64 }, b1: { x: 162, y: 110 }, t2: { x: 478, y: 180 }, b2: { x: 478, y: 226 } }, zones: { bad: { hi: true } } },
    { say: 'The user goes to tap “Buy now”…', tone: C.yellow, set: { cur: { x: 200, y: 122 } } },
    { say: 'The image arrives and pushes everything down. They tap the wrong thing. 😤', tone: C.red, set: { img1: { x: 162, y: 104, glow: true }, b1: { y: 220, shake: true }, t1: { y: 176 } }, zones: { bad: { hi: true, label: 'CLS 0.32 · poor' } } },
    { say: 'With width/height or aspect-ratio, the browser reserves the box before the image loads.', tone: C.green, set: { cur: null }, zones: { good: { hi: true }, ph: { hi: true } } },
    { say: 'The image fills the reserved space. Nothing moves. CLS ≈ 0.', tone: C.green, set: { img2: { x: 478, y: 101, glow: true } }, zones: { ph: { show: false }, good: { label: 'CLS 0.00 · good', hi: true } } },
    { say: 'Other culprits: web fonts (use size-adjust), injected banners/ads (reserve slots), animations of top/height.', tone: C.orange },
  ],
};

// ── FLIP ───────────────────────────────────────────────────────────────
const flip = {
  title: 'FLIP: how layout animations stay smooth',
  accent: C.purple,
  h: 270,
  zones: {
    list: { x: 12, y: 12, w: 616, h: 246, label: 'Grid → item moves to a new position', color: C.gray },
    first: { x: 60, y: 60, w: 120, h: 80, color: C.gray, text: 'First', dashed: true, show: false },
    last: { x: 430, y: 150, w: 160, h: 90, color: C.gray, text: 'Last', dashed: true, show: false },
  },
  actors: { box: { label: '📦', color: C.purple, w: 120, h: 80, fs: 26 } },
  steps: [
    { say: 'F · First: measure the element’s current box (getBoundingClientRect).', set: { box: { x: 120, y: 100 } }, zones: { first: { show: true, hi: true } } },
    { say: 'L · Last: apply the layout change instantly and measure the new box.', tone: C.blue, set: { box: { x: 510, y: 195, w: 160, h: 90, scale: 1 } }, zones: { last: { show: true, hi: true } } },
    { say: 'I · Invert: apply a transform that puts it visually back at First. Nothing visible changed yet.', tone: C.orange, set: { box: { x: 120, y: 100, w: 120, h: 80 } } },
    { say: 'P · Play: animate the transform to none. The GPU does it. No layout per frame.', tone: C.green, set: { box: { x: 510, y: 195, w: 160, h: 90, glow: true } } },
    { say: 'Framer Motion’s layout prop, the View Transitions API and auto-animate all do FLIP for you.', tone: C.purple, zones: { first: { show: false }, last: { show: false } } },
  ],
};

// ── Web Animations API ─────────────────────────────────────────────────
const waapi = {
  title: 'element.animate() gives you a controllable animation',
  accent: C.cyan,
  h: 230,
  code: `const anim = ball.animate(
  [{ transform: 'translateX(0)' }, { transform: 'translateX(480px)' }],
  { duration: 2000, easing: 'ease-in-out' });
anim.pause();  anim.reverse();  anim.playbackRate = 2;
await anim.finished;`,
  zones: {
    track: { x: 12, y: 30, w: 616, h: 90, label: 'track', color: C.gray },
    state: { x: 12, y: 136, w: 616, h: 80, label: 'anim.playState', color: C.cyan, text: 'idle', big: true },
  },
  actors: { ball: { label: '●', color: C.cyan, w: 44, h: 44, shape: 'dot', fs: 18 } },
  steps: [
    { say: 'animate() takes keyframes plus timing, like CSS @keyframes, but from JS.', line: [1, 2, 3], set: { ball: { x: 50, y: 82 } } },
    { say: 'It returns an Animation object, already running on the compositor.', tone: C.cyan, line: 1, set: { ball: { x: 300, y: 82, glow: true } }, zones: { state: { text: 'running' } } },
    { say: 'anim.pause() freezes it mid-flight. Try that with a CSS animation!', tone: C.yellow, line: 4, set: { ball: { glow: false } }, zones: { state: { text: 'paused', color: C.yellow } } },
    { say: 'anim.reverse() plays it backwards from where it is.', tone: C.purple, line: 4, set: { ball: { x: 120, glow: true } }, zones: { state: { text: 'running ← reversed', color: C.purple } } },
    { say: 'playbackRate = 2 doubles the speed. currentTime lets you scrub.', tone: C.orange, line: 4, set: { ball: { x: 590 } }, zones: { state: { text: 'running · 2×', color: C.orange } } },
    { say: 'anim.finished is a Promise, so you can sequence animations with await.', tone: C.green, line: 5, zones: { state: { text: 'finished ✓', color: C.green } } },
  ],
};

// ── Keyboard navigation ────────────────────────────────────────────────
const focusAt = (x, y, w) => ({ x, y, w: w + 12, h: 44, visible: true });
const keyboard = {
  title: 'Tab order and focus',
  accent: C.yellow,
  h: 300,
  zones: {
    nav: { x: 12, y: 12, w: 616, h: 60, label: 'header', color: C.gray },
    main: { x: 12, y: 84, w: 616, h: 120, label: 'main', color: C.gray },
    l1: { x: 40, y: 34, w: 80, h: 30, color: C.blue, text: 'Home' },
    l2: { x: 140, y: 34, w: 80, h: 30, color: C.blue, text: 'Docs' },
    btn: { x: 40, y: 120, w: 120, h: 34, color: C.green, text: '<button>' },
    div: { x: 190, y: 120, w: 180, h: 34, color: C.red, text: '<div onClick>' },
    fix: { x: 400, y: 120, w: 200, h: 34, color: C.green, text: '<div tabindex="0" role="button">' },
    modal: { x: 160, y: 120, w: 320, h: 160, label: 'role="dialog" · focus trapped', color: C.purple, show: false },
    m1: { x: 190, y: 160, w: 260, h: 34, color: C.blue, text: 'Email input', show: false },
    m2: { x: 190, y: 210, w: 120, h: 34, color: C.green, text: 'Save', show: false },
    m3: { x: 330, y: 210, w: 120, h: 34, color: C.gray, text: 'Cancel', show: false },
  },
  actors: { ring: { label: '', color: C.yellow, w: 90, h: 44, shape: 'ring', z: 5 } },
  steps: [
    { say: 'Tab moves focus through interactive elements in DOM order. The focus ring shows where you are.', set: { ring: focusAt(80, 49, 80) }, zones: { l1: { hi: true } } },
    { say: 'Tab → next link.', set: { ring: focusAt(180, 49, 80) }, zones: { l2: { hi: true } } },
    { say: 'Tab → native <button>: focusable, and Enter/Space activate it for free.', tone: C.green, set: { ring: focusAt(100, 137, 120) }, zones: { btn: { hi: true } } },
    { say: 'A <div onClick> is SKIPPED. Keyboard users can’t reach it at all.', tone: C.red, set: { ring: focusAt(500, 137, 200) }, zones: { div: { hi: true }, fix: { hi: true } } },
    { say: 'Opening a modal moves focus into it, and Tab cycles only inside (focus trap). Esc closes it.', tone: C.purple, set: { ring: focusAt(320, 177, 260) }, zones: { modal: { show: true, hi: true }, m1: { show: true }, m2: { show: true }, m3: { show: true }, nav: { dim: true }, main: { dim: true }, l1: { dim: true }, l2: { dim: true }, btn: { dim: true }, div: { dim: true }, fix: { dim: true } } },
    { say: 'Tab → Save → Cancel → back to Email. On close, focus returns to the button that opened it. Never use tabindex > 0.', tone: C.purple, set: { ring: focusAt(390, 227, 120) }, zones: { m3: { hi: true } } },
  ],
};

// ── Screen readers & the accessibility tree ────────────────────────────
const screenReader = sequence({
  title: 'Screen readers read the accessibility tree, not pixels',
  accent: C.teal,
  chipW: 180,
  lanes: [
    { id: 'dom', label: 'DOM', color: C.blue },
    { id: 'ax', label: 'Accessibility tree', color: C.purple },
    { id: 'sr', label: '🔊 Screen reader says', color: C.teal },
  ],
  msgs: [
    { from: 'dom', to: 'ax', label: '<button>Save</button>', say: 'The browser builds an accessibility tree from the DOM: role, name, state.' },
    { from: 'ax', to: 'sr', label: '“Save, button”', color: C.green, say: 'Native elements map to correct roles automatically.' },
    { from: 'dom', to: 'ax', label: '<div onclick>✓</div>', color: C.red, say: 'A clickable div has no role and no name…' },
    { from: 'ax', to: 'sr', label: '“check mark” 🤷', color: C.red, say: '…so the user hears something meaningless and can’t tell it is actionable.' },
    { from: 'dom', to: 'ax', label: '<img alt="Ana smiling">', color: C.blue, say: 'Images need alt text (or alt="" if decorative).' },
    { from: 'ax', to: 'sr', label: '“Ana smiling, image”', color: C.green, say: 'Use semantic HTML first, ARIA only to fill gaps. aria-live announces dynamic updates.' },
  ],
});

// ── Shadow DOM ─────────────────────────────────────────────────────────
const shadowDom = {
  title: 'Shadow DOM: styles don’t get in, styles don’t leak out',
  accent: C.purple,
  h: 280,
  zones: {
    doc: { x: 12, y: 12, w: 616, h: 256, label: 'document', color: C.blue },
    gcss: { x: 30, y: 44, w: 220, h: 50, color: C.red, text: 'button { color: red }' },
    lb: { x: 30, y: 150, w: 160, h: 50, color: C.gray, text: 'light <button>' },
    host: { x: 300, y: 44, w: 310, h: 206, label: '<my-widget> #shadow-root', color: C.purple, dashed: true },
    scss: { x: 320, y: 80, w: 270, h: 46, color: C.green, text: 'button { color: green }' },
    sb: { x: 330, y: 160, w: 170, h: 50, color: C.gray, text: 'shadow <button>' },
  },
  actors: { r1: { label: 'red', color: C.red, w: 60, shape: 'pill', h: 24 }, r2: { label: 'red', color: C.red, w: 60, shape: 'pill', h: 24 }, g1: { label: 'green', color: C.green, w: 70, shape: 'pill', h: 24 } },
  steps: [
    { say: 'A global stylesheet targets all buttons.', zones: { gcss: { hi: true } } },
    { say: 'The regular (light DOM) button turns red, as expected.', tone: C.red, set: { r1: { x: 238, y: 175, from: 'gcss', glow: true } }, zones: { lb: { color: C.red, hi: true } } },
    { say: 'The same rule hits the shadow root boundary and stops. The shadow button is unaffected.', tone: C.purple, set: { r2: { x: 290, y: 160, from: 'gcss', shake: true } }, zones: { host: { hi: true } } },
    { say: 'Styles inside the shadow root apply only inside it…', tone: C.green, set: { r2: null, g1: { x: 552, y: 185, from: 'scss', glow: true } }, zones: { sb: { color: C.green, hi: true } } },
    { say: '…and never leak out to the page. Theme from outside via CSS custom properties or ::part().', tone: C.purple, zones: { host: { hi: true }, lb: { color: C.red } } },
  ],
};

// ── Custom element lifecycle ───────────────────────────────────────────
const webComponents = {
  title: 'Custom element lifecycle callbacks',
  accent: C.orange,
  h: 280,
  code: `class UserCard extends HTMLElement {
  constructor() { super(); this.attachShadow({ mode: 'open' }); }
  connectedCallback() { this.render(); }
  static observedAttributes = ['name'];
  attributeChangedCallback(n, old, val) { this.render(); }
  disconnectedCallback() { /* cleanup */ }
}
customElements.define('user-card', UserCard);`,
  zones: {
    mem: { x: 12, y: 12, w: 220, h: 256, label: 'Created (not in page)', color: C.gray, layout: 'center' },
    dom: { x: 260, y: 12, w: 368, h: 256, label: 'document', color: C.orange, layout: 'center' },
  },
  actors: { el: { label: '<user-card>', color: C.orange, w: 170, h: 46 } },
  steps: [
    { say: 'customElements.define registers the tag. The browser upgrades every <user-card>.', line: 8 },
    { say: 'constructor runs on creation: set up the shadow root and state. Don’t touch attributes or children yet.', tone: C.gray, line: 2, set: { el: { in: 'mem', glow: true } }, zones: { mem: { hi: true } } },
    { say: 'connectedCallback: inserted into the document. Render and add listeners here.', tone: C.orange, line: 3, set: { el: { in: 'dom', glow: true } }, zones: { dom: { hi: true } } },
    { say: 'attributeChangedCallback: an observed attribute changed.', tone: C.yellow, line: [4, 5], set: { el: { label: '<user-card name="Ana">', w: 230, glow: true } } },
    { say: 'disconnectedCallback: removed from the page. Clean up listeners and timers.', tone: C.red, line: 6, set: { el: { in: 'mem', dim: true } }, zones: { mem: { hi: true } } },
    { say: 'Framework-agnostic: works in React, Vue, or plain HTML.', tone: C.green, set: { el: { in: 'dom', dim: false } } },
  ],
};

// ── Resource hints ─────────────────────────────────────────────────────
const RX = 150;
const rb = (row, start, len, label, color) => ({ x: RX + start, y: 64 + row * 54, w: len, anchor: 'left', label, color, h: 22, shape: 'bar', visible: true, fs: 9 });
const hints = {
  title: 'preconnect, preload and prefetch on the timeline',
  accent: C.blue,
  h: 290,
  zones: {
    grid: { x: 12, y: 12, w: 616, h: 266, label: 'time →', color: C.gray },
    n1: { x: 20, y: 52, w: 124, h: 24, ghost: true, color: '#0000', text: 'HTML' },
    n2: { x: 20, y: 106, w: 124, h: 24, ghost: true, color: '#0000', text: 'styles.css' },
    n3: { x: 20, y: 160, w: 124, h: 24, ghost: true, color: '#0000', text: 'font (cdn)' },
    n4: { x: 20, y: 214, w: 124, h: 24, ghost: true, color: '#0000', text: 'next page' },
  },
  actors: { h: {}, css: {}, conn: {}, font: {}, pf: {} },
  steps: [
    { say: 'Without hints: the font is discovered only after CSS downloads and parses.', set: { h: rb(0, 0, 90, 'HTML', C.blue), css: rb(1, 90, 100, 'CSS', C.purple), conn: rb(2, 190, 80, 'DNS+TLS', C.gray), font: rb(2, 270, 110, 'font', C.orange) }, zones: { grid: { hi: true } } },
    { say: 'Even then, it must first open a NEW connection to the CDN (DNS + TCP + TLS).', tone: C.gray, set: { conn: { glow: true } } },
    { say: '<link rel="preconnect" href="https://cdn…"> opens that connection early, in parallel.', tone: C.cyan, set: { conn: { x: RX + 20, glow: true, color: C.cyan, label: 'preconnect' }, font: { x: RX + 190 } } },
    { say: '<link rel="preload" as="font"> fetches the critical font right away, without waiting for CSS.', tone: C.green, set: { font: { x: RX + 100, color: C.green, label: 'font (preload)', glow: true } } },
    { say: '<link rel="prefetch"> fetches the likely NEXT page at idle, low priority, ready from cache on click.', tone: C.purple, set: { pf: rb(3, 300, 120, 'prefetch /pricing', C.purple) } },
    { say: 'Preload only what is critical. Too many preloads compete with each other for bandwidth.', tone: C.orange },
  ],
};

export default {
  'css-specificity': specificity,
  'css-layout': cssLayout,
  'css-variables': cssVars,
  'css-container': containerQ,
  'css-transitions': transitions,
  'css-keyframes': transitions,
  'gpu-acceleration': gpu,
  'animation-perf': animPerf,
  'layout-shift': cls,
  'framer-motion': flip,
  'web-animations': waapi,
  'a11y-keyboard': keyboard,
  'a11y-screen-reader': screenReader,
  'shadow-dom': shadowDom,
  'web-components-html': webComponents,
  'meta-performance': hints,
};
