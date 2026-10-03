import { C, rows, sequence } from '../engine/helpers';

// ── Observables: marble diagram ────────────────────────────────────────
const X0 = 150;
const DX = 88;
const marble = (label, color) => ({ label, color, w: 38, h: 38, shape: 'dot', fs: 14 });
const rowY = (i) => 34 + i * 76 + 44;
const rxjs = {
  title: 'An Observable is a stream of values over time',
  accent: C.pink,
  h: 290,
  code: `interval$.pipe(
  filter(x => x % 2 === 0),
  map(x => x * 10),
).subscribe(render);`,
  zones: rows([
    ['src', 'source$  (time →)', C.blue],
    ['flt', 'filter(x => x % 2 === 0)', C.purple],
    ['map', 'map(x => x * 10)', C.green],
  ], { top: 34, h: 64, gap: 12 }),
  actors: {
    v1: marble('1', C.blue), v2: marble('2', C.blue), v3: marble('3', C.blue), v4: marble('4', C.blue),
    f2: marble('2', C.purple), f4: marble('4', C.purple),
    m2: marble('20', C.green), m4: marble('40', C.green),
    lazy: { label: 'nothing runs until subscribe()', color: C.gray, w: 260, shape: 'ghost' },
    done: { label: 'unsubscribe() ✂', color: C.red, w: 140 },
  },
  steps: [
    { say: 'Observables are lazy. Defining the pipeline does nothing yet.', set: { lazy: { x: 360, y: rowY(0) } } },
    { say: 'subscribe() starts the stream. Value 1 is emitted…', line: 4, set: { lazy: null, v1: { x: X0, y: rowY(0), glow: true } }, zones: { src: { hi: true } } },
    { say: '…and filtered out, because it is odd.', tone: C.purple, line: 2, set: { v1: { strike: true } }, zones: { flt: { hi: true } } },
    { say: '2 passes the filter…', tone: C.purple, line: 2, set: { v2: { x: X0 + DX, y: rowY(0) }, f2: { x: X0 + DX, y: rowY(1), from: { x: X0 + DX, y: rowY(0) }, glow: true } }, zones: { flt: { hi: true } } },
    { say: '…and is mapped to 20. The subscriber receives it.', tone: C.green, line: 3, set: { m2: { x: X0 + DX, y: rowY(2), from: { x: X0 + DX, y: rowY(1) }, glow: true } }, zones: { map: { hi: true } } },
    { say: 'Values keep coming over time. A Promise could only ever give you ONE.', tone: C.blue, set: { v3: { x: X0 + 2 * DX, y: rowY(0), strike: true }, v4: { x: X0 + 3 * DX, y: rowY(0) }, f4: { x: X0 + 3 * DX, y: rowY(1), from: { x: X0 + 3 * DX, y: rowY(0) } }, m4: { x: X0 + 3 * DX, y: rowY(2), from: { x: X0 + 3 * DX, y: rowY(1) }, glow: true } } },
    { say: 'Unsubscribing cancels the stream, which a Promise cannot do.', tone: C.red, set: { done: { x: X0 + 4 * DX + 30, y: rowY(0), glow: true } }, zones: { src: { dim: true }, flt: { dim: true }, map: { dim: true } } },
  ],
};

// ── Web workers ────────────────────────────────────────────────────────
const webWorkers = {
  title: 'Move heavy work off the main thread',
  accent: C.orange,
  h: 280,
  zones: {
    main: { x: 12, y: 12, w: 300, h: 256, label: 'Main thread (UI)', color: C.blue, layout: 'col' },
    worker: { x: 328, y: 12, w: 300, h: 256, label: 'Web Worker thread', color: C.orange, layout: 'col', dim: true },
  },
  actors: {
    click: { label: '🖱 click', color: C.blue, w: 110 },
    heavy: { label: '⚙ crunch 2M rows (3s)', color: C.red, w: 220, h: 60 },
    frozen: { label: '🥶 UI frozen, clicks ignored', color: C.red, w: 240 },
    msg: { label: 'postMessage(rows)', color: C.yellow, w: 180 },
    heavy2: { label: '⚙ crunch 2M rows (3s)', color: C.orange, w: 220, h: 60 },
    smooth: { label: '😊 UI smooth, 60fps', color: C.green, w: 220 },
    res: { label: 'onmessage(result)', color: C.green, w: 180 },
  },
  steps: [
    { say: 'JavaScript has a single main thread. It handles clicks, rendering and your code.', set: { click: { in: 'main' } }, zones: { main: { hi: true } } },
    { say: 'Run a 3-second computation there and nothing else can happen.', tone: C.red, set: { heavy: { in: 'main', glow: true } }, zones: { main: { hi: true, color: C.red } } },
    { say: 'Scrolling, typing and animations all freeze until it finishes.', tone: C.red, set: { frozen: { in: 'main', shake: true } }, zones: { main: { color: C.red } } },
    { say: 'Instead, send the data to a Worker, a separate thread.', tone: C.yellow, set: { heavy: null, frozen: null, msg: { in: 'worker', from: 'main', glow: true } }, zones: { main: { color: C.blue }, worker: { dim: false, hi: true } }, arrows: [['main', 'worker', { label: 'structured clone', color: C.yellow }]] },
    { say: 'The worker crunches in parallel while the main thread stays free.', tone: C.orange, set: { heavy2: { in: 'worker', glow: true }, smooth: { in: 'main', glow: true } }, zones: { worker: { hi: true } } },
    { say: 'When done, the result is posted back. No DOM access in workers, so they talk only through messages.', tone: C.green, set: { res: { in: 'main', from: 'worker', glow: true } }, arrows: [['worker', 'main', { color: C.green }]] },
  ],
};

// ── Debounce vs throttle timeline ──────────────────────────────────────
const TX = 120;
const U = 37;
const tx = (t) => TX + t * U;
const ev = (t) => ({ label: '', color: C.blue, w: 16, h: 16, shape: 'dot', x: tx(t), y: 78, visible: true });
const fire = (t, row, color) => ({ x: tx(t), y: 78 + row * 78, visible: true, glow: true, color, label: '✓', w: 26, h: 26, shape: 'dot', fs: 12 });
const timer = (t) => ({ x: tx(t), y: 156 + 16, w: 3 * U, anchor: 'left', visible: true });
const debounce = {
  title: 'Debounce vs throttle on a burst of keystrokes',
  accent: C.yellow,
  h: 270,
  zones: rows([
    ['keys', 'events', C.blue],
    ['deb', 'debounce(300ms)', C.yellow],
    ['thr', 'throttle(300ms)', C.purple],
  ], { top: 40, h: 62, gap: 16 }),
  actors: {
    e0: { shape: 'dot' }, e1: { shape: 'dot' }, e2: { shape: 'dot' }, e3: { shape: 'dot' }, e4: { shape: 'dot' }, e9: { shape: 'dot' }, e10: { shape: 'dot' },
    dt: { label: 'wait 300ms', color: C.yellow, w: 3 * U, h: 14, shape: 'bar', fs: 9 },
    d1: {}, d2: {}, t0: {}, t3: {}, t9: {},
  },
  steps: [
    { say: 'The user starts typing. A keystroke event fires.', set: { e0: ev(0), dt: timer(0), t0: fire(0, 2, C.purple) }, zones: { thr: { hi: true } } },
    { say: 'Throttle ran right away. Debounce started a 300ms timer.', tone: C.purple, zones: { thr: { hi: true }, deb: { hi: true } } },
    { say: 'More keys arrive. Each one RESETS the debounce timer. Throttle ignores them (still in its window).', tone: C.yellow, set: { e1: ev(1), e2: ev(2), dt: { x: tx(2) } }, zones: { deb: { hi: true } } },
    { say: 'Throttle window is over, so the next key fires again. Debounce keeps waiting.', tone: C.purple, set: { e3: ev(3), e4: ev(4), dt: { x: tx(4) }, t3: fire(3, 2, C.purple) }, zones: { thr: { hi: true } } },
    { say: 'The user pauses. 300ms of silence, so debounce finally fires once, with the latest value.', tone: C.yellow, set: { d1: fire(7, 1, C.yellow) }, zones: { deb: { hi: true } } },
    { say: 'Another burst. Throttle fires at most once per window…', tone: C.purple, set: { e9: ev(9), e10: ev(10), dt: { x: tx(10) }, t9: fire(9, 2, C.purple) }, zones: { thr: { hi: true } } },
    { say: '…debounce fires after they stop. Debounce suits search inputs, throttle suits scroll and resize.', tone: C.green, set: { d2: fire(13, 1, C.yellow), dt: null }, zones: { deb: { hi: true }, thr: { hi: true } } },
  ],
};

// ── Stale closure ──────────────────────────────────────────────────────
const staleClosure = {
  title: 'The interval callback is stuck in render #1',
  accent: C.red,
  h: 290,
  code: `const [count, setCount] = useState(0);
useEffect(() => {
  const id = setInterval(() => setCount(count + 1), 1000);
  return () => clearInterval(id);
}, []); // runs once → captures count = 0`,
  zones: {
    r1: { x: 12, y: 12, w: 190, h: 120, label: 'Render #1 closure', color: C.blue, text: 'count = 0' },
    r2: { x: 225, y: 12, w: 190, h: 120, label: 'Render #2 closure', color: C.purple, text: 'count = 1', show: false },
    r3: { x: 438, y: 12, w: 190, h: 120, label: 'Render #3 closure', color: C.purple, text: 'count = 1', show: false },
    screen: { x: 12, y: 150, w: 616, h: 128, label: 'Screen', color: C.green, text: '0', big: true },
  },
  actors: {
    cb: { label: '⏱ interval callback', color: C.yellow, w: 170 },
  },
  steps: [
    { say: 'First render: count is 0. The effect runs once ([] deps) and creates the interval.', line: [1, 3], set: { cb: { x: 107, y: 112, glow: true } }, zones: { r1: { hi: true } } },
    { say: 'The callback closes over count from THIS render: 0.', line: 3, arrows: [['cb', 'r1', { label: 'captures' }]] },
    { say: 'Tick: setCount(0 + 1). The component re-renders with count = 1.', tone: C.green, zones: { r2: { show: true, hi: true }, screen: { text: '1', hi: true } } },
    { say: 'The effect does not re-run, so the callback still sees render #1’s count = 0.', tone: C.red, set: { cb: { glow: true, shake: true } }, arrows: [['cb', 'r1', { color: C.red, label: 'still 0!' }]] },
    { say: 'Tick: setCount(0 + 1) again, so it stays 1 forever.', tone: C.red, zones: { r3: { show: true, hi: true }, screen: { text: '1 (stuck)', color: C.red, hi: true } } },
    { say: 'Fix: setCount(c => c + 1) reads the latest state, or put count in the deps.', tone: C.green, zones: { screen: { text: '1 → 2 → 3 ✓', color: C.green, hi: true } } },
  ],
};

// ── Polling vs WebSocket vs SSE ────────────────────────────────────────
const polling = sequence({
  title: 'Polling: ask again and again',
  accent: C.gray,
  lanes: [{ id: 'c', label: 'Client', color: C.blue }, { id: 's', label: 'Server', color: C.gray }],
  msgs: [
    { from: 'c', to: 's', label: 'GET /messages', say: 'Polling: the client keeps asking "anything new?"' },
    { from: 's', to: 'c', label: '200 []  (nothing)', color: C.gray, say: 'Usually the answer is no. That is wasted requests and headers.' },
    { from: 'c', to: 's', label: 'GET /messages', say: 'A few seconds later, it asks again.' },
    { from: 's', to: 'c', label: '200 [msg]', color: C.green, say: 'New data shows up only on the next poll, so latency equals the poll interval.' },
  ],
});
const websocket = sequence({
  title: 'WebSocket: one connection, both directions',
  accent: C.green,
  lanes: [{ id: 'c', label: 'Client', color: C.blue }, { id: 's', label: 'Server', color: C.green }],
  msgs: [
    { from: 'c', to: 's', label: 'GET · Upgrade: websocket', w: 200, say: 'WebSocket starts as an HTTP request asking to upgrade.' },
    { from: 's', to: 'c', label: '101 Switching Protocols', color: C.green, w: 200, say: 'The server agrees. The TCP connection now stays open.' },
    { from: 's', to: 'c', label: '📨 new message', color: C.yellow, say: 'The server PUSHES data the instant it exists. No asking needed.' },
    { from: 'c', to: 's', label: '✍ typing…', color: C.blue, say: 'The client can send at any time on the same socket: full duplex.' },
    { from: 's', to: 'c', label: '📨 reply', color: C.yellow, say: 'Great for chat, games and collaboration. SSE is the simpler one-way (server→client) version over plain HTTP.' },
  ],
});

export default {
  'rxjs-basics': rxjs,
  'web-workers': webWorkers,
  'ji-debounce': debounce,
  'db-stale-closure': staleClosure,
  websockets: [polling, websocket],
};
