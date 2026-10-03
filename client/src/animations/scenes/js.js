import { C, sequence } from '../engine/helpers';

// ── Generators: pause & resume ─────────────────────────────────────────
const generators = sequence({
  title: 'A generator pauses at every yield',
  accent: C.purple,
  code: `function* counter() {
  const a = yield 1;
  yield a * 2;
  return 'done';
}
const it = counter();`,
  lanes: [
    { id: 'caller', label: 'Caller', color: C.blue },
    { id: 'gen', label: 'Generator · not started', color: C.purple },
  ],
  msgs: [
    { say: 'Calling counter() runs nothing. It just returns an iterator.', line: 6, zones: { gen: { label: 'Generator · suspended' } } },
    { from: 'caller', to: 'gen', label: 'it.next()', color: C.blue, line: 2, say: 'next() starts the body, which runs until the first yield.', zones: { gen: { label: 'Generator · running' } } },
    { from: 'gen', to: 'caller', label: '{ value: 1, done: false }', color: C.green, line: 2, w: 200, say: 'yield 1 hands 1 back and freezes the function right there.', zones: { gen: { label: 'Generator · paused' } } },
    { from: 'caller', to: 'gen', label: 'it.next(5)', color: C.blue, line: 2, say: 'The value passed to next() becomes the result of the paused yield, so a = 5.', zones: { gen: { label: 'Generator · running' } } },
    { from: 'gen', to: 'caller', label: '{ value: 10, done: false }', color: C.green, line: 3, w: 200, say: 'It runs on to the next yield and returns 5 * 2.', zones: { gen: { label: 'Generator · paused' } } },
    { from: 'caller', to: 'gen', label: 'it.next()', color: C.blue, line: 4, say: 'Resume again and it reaches return.' },
    { from: 'gen', to: 'caller', label: "{ value: 'done', done: true }", color: C.orange, line: 4, w: 210, say: 'done: true means the generator is finished. Later next() calls return undefined.', zones: { gen: { label: 'Generator · closed', dim: true } } },
  ],
});

// ── Execution context & call stack ─────────────────────────────────────
const executionContext = {
  title: 'Creation phase → execution phase',
  accent: C.blue,
  h: 290,
  code: `var x = 10;
function a() { b(); }
function b() { console.log(x); }
a();`,
  zones: {
    stack: { x: 12, y: 12, w: 220, h: 266, label: 'Call stack', color: C.blue, layout: 'stack' },
    mem: { x: 246, y: 12, w: 230, h: 266, label: 'Memory (global)', color: C.purple, layout: 'col' },
    out: { x: 490, y: 12, w: 138, h: 266, label: 'Console', color: C.green, layout: 'col' },
  },
  actors: {
    gec: { label: 'Global EC', color: C.blue, w: 180 },
    ecA: { label: 'a() EC', color: C.cyan, w: 180 },
    ecB: { label: 'b() EC', color: C.orange, w: 180 },
    vx: { label: 'x: undefined', color: C.yellow, w: 200 },
    va: { label: 'a: ƒ', color: C.purple, w: 200 },
    vb: { label: 'b: ƒ', color: C.purple, w: 200 },
    log: { label: '10', color: C.green, w: 90 },
  },
  steps: [
    { say: 'Before any line runs, the Global Execution Context is pushed.', set: { gec: { in: 'stack', glow: true } }, zones: { stack: { hi: true } } },
    { say: 'Creation phase: var becomes undefined, functions are stored whole. This is hoisting.', tone: C.purple, set: { vx: { in: 'mem' }, va: { in: 'mem' }, vb: { in: 'mem' } }, zones: { mem: { hi: true } } },
    { say: 'Execution phase: line by line. x is now 10.', tone: C.yellow, line: 1, set: { vx: { label: 'x: 10', glow: true } } },
    { say: 'Calling a() pushes a new execution context on top.', tone: C.cyan, line: 4, set: { ecA: { in: 'stack', glow: true } }, zones: { stack: { hi: true } } },
    { say: 'a() calls b(), so another context is pushed.', tone: C.orange, line: 2, set: { ecB: { in: 'stack', glow: true } }, zones: { stack: { hi: true } } },
    { say: 'b has no local x, so it looks it up the scope chain and finds global x.', tone: C.green, line: 3, set: { log: { in: 'out', glow: true }, vx: { glow: true } }, arrows: [['ecB', 'vx', { label: 'lookup x' }]] },
    { say: 'b() returns and its context is popped (LIFO).', tone: C.orange, set: { ecB: null } },
    { say: 'a() returns and is popped. Only the Global EC is left.', tone: C.cyan, set: { ecA: null }, zones: { stack: { hi: true } } },
  ],
};

// ── Deep vs shallow clone ──────────────────────────────────────────────
const deepClone = {
  title: 'Shallow copy shares nested objects',
  accent: C.cyan,
  h: 300,
  zones: {
    orig: { x: 20, y: 20, w: 170, h: 70, label: 'user', color: C.blue, text: "name: 'Ana'\naddress: ●" },
    nest1: { x: 240, y: 20, w: 170, h: 70, label: 'address object', color: C.purple, text: "city: 'Delhi'" },
    shallow: { x: 20, y: 120, w: 170, h: 70, label: 'shallow ({...user})', color: C.orange, text: "name: 'Ana'\naddress: ●", show: false },
    deep: { x: 20, y: 214, w: 170, h: 70, label: 'deep (structuredClone)', color: C.green, text: "name: 'Ana'\naddress: ●", show: false },
    nest2: { x: 240, y: 214, w: 170, h: 70, label: 'NEW address object', color: C.green, text: "city: 'Delhi'", show: false },
  },
  actors: {},
  steps: [
    { say: 'user holds a reference to a nested address object.', arrows: [['orig', 'nest1', { label: 'ref' }]], zones: { orig: { hi: true } } },
    { say: 'Spread copies only the top level. The address pointer is copied, not the object.', tone: C.orange, zones: { shallow: { show: true, hi: true } }, arrows: [['orig', 'nest1'], ['shallow', 'nest1', { color: C.orange, label: 'same ref!' }]] },
    { say: "shallow.address.city = 'Pune' changes the shared object, so user changes too.", tone: C.red, zones: { nest1: { text: "city: 'Pune'", hi: true, color: C.red }, orig: { hi: true } }, arrows: [['orig', 'nest1', { color: C.red }], ['shallow', 'nest1', { color: C.red }]] },
    { say: 'structuredClone copies recursively and makes a brand-new nested object.', tone: C.green, zones: { deep: { show: true, hi: true }, nest2: { show: true, hi: true, text: "city: 'Pune'" } }, arrows: [['deep', 'nest2', { color: C.green, label: 'own copy' }]] },
    { say: "deep.address.city = 'Goa' only touches the copy. The original is safe.", tone: C.green, zones: { nest2: { text: "city: 'Goa'", hi: true }, nest1: { color: C.purple } }, arrows: [['orig', 'nest1'], ['deep', 'nest2', { color: C.green }]] },
  ],
};

// ── Proxy & Reflect ────────────────────────────────────────────────────
const proxyReflect = sequence({
  title: 'A Proxy intercepts operations on an object',
  accent: C.pink,
  code: `const user = new Proxy(target, {
  get(t, key)      { return Reflect.get(t, key); },
  set(t, key, val) {
    if (key === 'age' && val < 0) throw Error('bad age');
    return Reflect.set(t, key, val);
  },
});`,
  lanes: [
    { id: 'code', label: 'Your code', color: C.blue },
    { id: 'proxy', label: 'Proxy · traps', color: C.pink },
    { id: 'target', label: 'Target object', color: C.green },
  ],
  msgs: [
    { from: 'code', to: 'proxy', label: 'user.name', say: 'Reading a property goes to the get trap first.', line: 2 },
    { from: 'proxy', to: 'target', label: "Reflect.get(…'name')", color: C.pink, say: 'The trap forwards to the real object with Reflect, which applies the default behaviour.', line: 2 },
    { from: 'target', to: 'code', label: "'Ana'", color: C.green, say: 'The value comes back to the caller. The proxy was invisible.' },
    { from: 'code', to: 'proxy', label: 'user.age = -5', color: C.orange, say: 'Writing goes to the set trap, which validates the value.', line: [3, 4] },
    { from: 'proxy', to: 'code', label: '✗ Error: bad age', color: C.red, say: 'Invalid write is rejected. It never reaches the target.', line: 4 },
    { from: 'code', to: 'proxy', label: 'user.age = 30', color: C.blue, say: 'A valid write passes the check…', line: 3 },
    { from: 'proxy', to: 'target', label: 'Reflect.set(…30)', color: C.pink, say: '…and Reflect.set stores it. This is how Vue/MobX reactivity, validation and logging work.', line: 5 },
  ],
});

// ── Async iterators / for await ────────────────────────────────────────
const generatorsAdv = sequence({
  title: 'for await…of pulls pages one at a time',
  accent: C.purple,
  code: `async function* pages() {
  let url = '/api/items?page=1';
  while (url) {
    const res = await fetch(url).then(r => r.json());
    yield res.items;
    url = res.next;
  }
}
for await (const items of pages()) render(items);`,
  lanes: [
    { id: 'loop', label: 'for await loop', color: C.blue },
    { id: 'gen', label: 'async generator', color: C.purple },
    { id: 'api', label: 'API', color: C.green },
  ],
  msgs: [
    { from: 'loop', to: 'gen', label: 'next()', say: 'The loop asks for the next value.', line: 9 },
    { from: 'gen', to: 'api', label: 'GET page=1', color: C.purple, say: 'The generator fetches page 1 and awaits it.', line: 4 },
    { from: 'api', to: 'gen', label: 'items + next', color: C.green, say: 'The response arrives.', line: 4 },
    { from: 'gen', to: 'loop', label: 'yield items[1]', color: C.yellow, say: 'It yields page 1, and the loop body renders it while the generator stays paused.', line: [5, 9] },
    { from: 'loop', to: 'gen', label: 'next()', say: 'Only when the loop is ready does it ask again. That is back-pressure for free.', line: 9 },
    { from: 'gen', to: 'api', label: 'GET page=2', color: C.purple, say: 'Page 2 is fetched lazily, on demand.', line: [6, 4] },
    { from: 'api', to: 'gen', label: 'items, next: null', color: C.green, say: 'Last page: next is null.' },
    { from: 'gen', to: 'loop', label: '{ done: true }', color: C.orange, say: 'The while loop ends, the generator returns, and for await exits.', line: 3 },
  ],
});

// ── WeakMap vs Map & GC ────────────────────────────────────────────────
const weakRefs = {
  title: 'Map keeps keys alive, WeakMap lets them go',
  accent: C.teal,
  h: 300,
  zones: {
    vars: { x: 12, y: 12, w: 180, h: 140, label: 'Variables', color: C.blue, layout: 'col' },
    heap: { x: 210, y: 12, w: 418, h: 140, label: 'Heap', color: C.gray, layout: 'row' },
    map: { x: 12, y: 168, w: 300, h: 120, label: 'Map (strong)', color: C.orange, layout: 'col' },
    weak: { x: 328, y: 168, w: 300, h: 120, label: 'WeakMap (weak)', color: C.teal, layout: 'col' },
  },
  actors: {
    a: { label: 'let a', color: C.blue, w: 120 },
    b: { label: 'let b', color: C.blue, w: 120 },
    objA: { label: '{ id: 1 }', color: C.orange, w: 110 },
    objB: { label: '{ id: 2 }', color: C.teal, w: 110 },
    mA: { label: '{id:1} → meta', color: C.orange, w: 170 },
    wB: { label: '{id:2} → meta', color: C.teal, w: 170 },
    gc: { label: '🧹 GC', color: C.yellow, w: 80 },
  },
  steps: [
    { say: 'Two objects in the heap, each referenced by a variable.', set: { a: { in: 'vars' }, b: { in: 'vars' }, objA: { in: 'heap' }, objB: { in: 'heap' } }, arrows: [['a', 'objA'], ['b', 'objB']] },
    { say: 'Object 1 is a key in a Map, object 2 a key in a WeakMap.', set: { mA: { in: 'map', glow: true }, wB: { in: 'weak', glow: true } }, arrows: [['mA', 'objA', { color: C.orange, label: 'strong' }], ['wB', 'objB', { color: C.teal, label: 'weak', bend: 0.2 }]] },
    { say: 'a = null and b = null. The variables let go.', tone: C.red, set: { a: { strike: true }, b: { strike: true } }, arrows: [['mA', 'objA', { color: C.orange }], ['wB', 'objB', { color: C.teal, bend: 0.2 }]] },
    { say: 'The garbage collector runs…', tone: C.yellow, set: { gc: { in: 'heap', glow: true } }, zones: { heap: { hi: true } } },
    { say: 'The Map still holds object 1 strongly: it stays (a memory leak). The weakly-held object 2 is freed.', tone: C.teal, set: { objB: null, wB: null, objA: { glow: true }, mA: { glow: true } }, arrows: [['mA', 'objA', { color: C.orange, label: 'still here' }]], zones: { map: { hi: true, color: C.red } } },
    { say: 'Use WeakMap for per-object caches and metadata, e.g. DOM nodes, so entries vanish with the object.', tone: C.teal, set: { gc: null }, zones: { weak: { hi: true } } },
  ],
};

// ── Currying ───────────────────────────────────────────────────────────
const currying = {
  title: 'curry(add) collects one argument per call',
  accent: C.yellow,
  h: 240,
  code: `const add = (a, b, c) => a + b + c;
const curried = curry(add);
curried(1)(2)(3); // 6`,
  zones: {
    calls: { x: 12, y: 12, w: 170, h: 216, label: 'Calls', color: C.blue, layout: 'col' },
    slots: { x: 200, y: 12, w: 270, h: 110, label: 'Collected args · need 3', color: C.yellow, layout: 'row' },
    fn: { x: 200, y: 136, w: 270, h: 92, label: 'add(a, b, c)', color: C.purple, show: true, dim: true },
    res: { x: 488, y: 12, w: 140, h: 216, label: 'Result', color: C.green, layout: 'center' },
  },
  actors: {
    c1: { label: 'curried(1)', color: C.blue, w: 130 },
    c2: { label: '(2)', color: C.blue, w: 130 },
    c3: { label: '(3)', color: C.blue, w: 130 },
    a1: { label: '1', color: C.yellow, w: 60, shape: 'dot', h: 44, fs: 16 },
    a2: { label: '2', color: C.yellow, w: 60, shape: 'dot', h: 44, fs: 16 },
    a3: { label: '3', color: C.yellow, w: 60, shape: 'dot', h: 44, fs: 16 },
    fnr: { label: '↩ returns a function', color: C.gray, w: 150 },
    out: { label: '6', color: C.green, w: 70, h: 54, shape: 'dot', fs: 22 },
  },
  steps: [
    { say: 'curried(1) stores 1. Only 1 of 3 args so far, so it returns another function.', line: 3, set: { c1: { in: 'calls', glow: true }, a1: { in: 'slots', from: 'c1' }, fnr: { in: 'res' } }, zones: { slots: { hi: true, label: 'Collected args · 1 / 3' } } },
    { say: '(2) is remembered in a closure. Still not enough.', line: 3, set: { c2: { in: 'calls', glow: true }, a2: { in: 'slots', from: 'c2' } }, zones: { slots: { hi: true, label: 'Collected args · 2 / 3' } } },
    { say: '(3) brings the count up to add.length, which is 3.', line: 3, set: { c3: { in: 'calls', glow: true }, a3: { in: 'slots', from: 'c3' }, fnr: null }, zones: { slots: { hi: true, label: 'Collected args · 3 / 3 ✓' } } },
    { say: 'Now the original add(1, 2, 3) is finally called.', tone: C.purple, set: { a1: { in: 'fn' }, a2: { in: 'fn' }, a3: { in: 'fn' } }, zones: { fn: { hi: true, dim: false, layout: 'row' } } },
    { say: 'Result: 6. Partial application lets you pre-fill args, e.g. const add1 = curried(1).', tone: C.green, set: { out: { in: 'res', glow: true, from: 'fn' } }, zones: { res: { hi: true } } },
  ],
};

// ── Race conditions ────────────────────────────────────────────────────
const raceConditions = sequence({
  title: 'Out-of-order responses show stale data',
  accent: C.red,
  lanes: [
    { id: 'ui', label: 'Search box / UI', color: C.blue },
    { id: 'net', label: 'Server', color: C.gray },
  ],
  msgs: [
    { from: 'ui', to: 'net', label: "A: q='re' (slow)", color: C.orange, say: "The user types 're'. Request A is sent and happens to be slow." },
    { from: 'ui', to: 'net', label: "B: q='react'", color: C.blue, say: "They keep typing 'react'. Request B is sent." },
    { from: 'net', to: 'ui', label: "B results ✓", color: C.green, say: 'B returns first, and the UI shows the correct results for "react".' },
    { from: 'net', to: 'ui', label: "A results (stale!)", color: C.red, say: 'A finally lands and OVERWRITES them. The UI shows "re" results for "react" 😱', zones: { ui: { color: C.red } } },
    { say: 'Fix: cancel the old request with AbortController, or ignore responses that are not the latest.', tone: C.green, zones: { ui: { color: C.green, label: 'abort A when B starts ✓' } } },
  ],
});

// ── Module pattern / IIFE ──────────────────────────────────────────────
const modulePattern = {
  title: 'An IIFE creates private state',
  accent: C.green,
  h: 280,
  code: `const counter = (function () {
  let count = 0;                 // private
  return { inc: () => ++count, get: () => count };
})();`,
  zones: {
    global: { x: 12, y: 12, w: 616, h: 256, label: 'Global scope', color: C.blue },
    iife: { x: 330, y: 44, w: 280, h: 140, label: 'IIFE scope (private)', color: C.green, dashed: true, show: false, layout: 'col' },
    api: { x: 30, y: 44, w: 250, h: 140, label: 'counter (public API)', color: C.purple, show: false, layout: 'col' },
  },
  actors: {
    count: { label: 'count = 0', color: C.green, w: 150 },
    inc: { label: 'inc()', color: C.purple, w: 120 },
    get: { label: 'get()', color: C.purple, w: 120 },
    call: { label: 'counter.inc()', color: C.yellow, w: 140 },
    hack: { label: 'counter.count', color: C.red, w: 140 },
  },
  steps: [
    { say: 'The function is called immediately and creates its own scope.', line: 1, zones: { iife: { show: true, hi: true } } },
    { say: 'count lives only inside that scope.', line: 2, set: { count: { in: 'iife', glow: true } }, zones: { iife: { hi: true } } },
    { say: 'It returns an object whose methods close over count.', line: 3, set: { inc: { in: 'api', from: 'iife' }, get: { in: 'api', from: 'iife' } }, zones: { api: { show: true, hi: true } }, arrows: [['api', 'iife', { label: 'closure', color: C.green }]] },
    { say: 'The IIFE is done, but count survives because the closures still reference it.', tone: C.green, zones: { iife: { hi: true } }, arrows: [['inc', 'count', { color: C.green }]] },
    { say: 'counter.inc() reaches in through the closure and count becomes 1.', tone: C.yellow, set: { call: { x: 160, y: 228, glow: true }, count: { label: 'count = 1', glow: true } }, arrows: [['call', 'inc'], ['inc', 'count', { color: C.green }]] },
    { say: 'counter.count is undefined. There is no way to touch it from outside.', tone: C.red, set: { hack: { x: 460, y: 228, shake: true } }, arrows: [['hack', 'iife', { color: C.red, label: '✗ blocked' }]] },
  ],
};

// ── Object.freeze is shallow ───────────────────────────────────────────
const immutability = {
  title: 'Object.freeze is shallow',
  accent: C.cyan,
  h: 250,
  code: `const cfg = Object.freeze({ env: 'prod', db: { host: 'a' } });
cfg.env = 'dev';      // ignored (TypeError in strict mode)
cfg.db.host = 'b';    // works! nested object isn't frozen`,
  zones: {
    top: { x: 30, y: 30, w: 250, h: 110, label: '🧊 cfg (frozen)', color: C.cyan, text: "env: 'prod'\ndb: ●" },
    nested: { x: 360, y: 30, w: 250, h: 110, label: 'db (NOT frozen)', color: C.orange, text: "host: 'a'" },
  },
  actors: {
    w1: { label: "env = 'dev'", color: C.red, w: 130 },
    w2: { label: "db.host = 'b'", color: C.yellow, w: 140 },
  },
  steps: [
    { say: 'freeze locks only the top-level properties of cfg.', line: 1, zones: { top: { hi: true } }, arrows: [['top', 'nested', { label: 'reference' }]] },
    { say: 'Reassigning cfg.env bounces off. The value stays the same.', tone: C.red, line: 2, set: { w1: { x: 155, y: 200, shake: true } }, arrows: [['w1', 'top', { color: C.red, label: '✗' }]] },
    { say: 'But cfg.db is just a reference to a normal object, so mutating it works.', tone: C.orange, line: 3, set: { w2: { x: 485, y: 200, glow: true } }, zones: { nested: { text: "host: 'b'", hi: true } }, arrows: [['w2', 'nested', { color: C.yellow, label: '✓ mutated' }]] },
    { say: 'For true immutability, deep-freeze recursively or use immutable updates (spread / Immer).', tone: C.green, set: { w1: null, w2: null }, zones: { nested: { label: '🧊 db (deep-frozen)', color: C.cyan, text: "host: 'a'" }, top: { hi: true } } },
  ],
};

// ── map vs forEach ─────────────────────────────────────────────────────
const mapForEach = {
  title: 'map builds a new array, forEach just loops',
  accent: C.blue,
  h: 280,
  zones: {
    src: { x: 12, y: 30, w: 160, h: 200, label: '[1, 2, 3]', color: C.blue, layout: 'col' },
    fn: { x: 240, y: 30, w: 160, h: 200, label: 'x => x * 2', color: C.purple, layout: 'center' },
    out: { x: 468, y: 30, w: 160, h: 200, label: 'Return value', color: C.green, layout: 'col' },
  },
  actors: {
    s1: { label: '1', color: C.blue, w: 60 }, s2: { label: '2', color: C.blue, w: 60 }, s3: { label: '3', color: C.blue, w: 60 },
    o1: { label: '2', color: C.green, w: 60 }, o2: { label: '4', color: C.green, w: 60 }, o3: { label: '6', color: C.green, w: 60 },
    und: { label: 'undefined', color: C.gray, w: 110 },
  },
  steps: [
    { say: 'Both call your callback once per element.', set: { s1: { in: 'src' }, s2: { in: 'src' }, s3: { in: 'src' } } },
    { say: 'map: each return value goes into a NEW array.', tone: C.green, set: { o1: { in: 'out', from: 'fn', glow: true } }, zones: { fn: { hi: true }, out: { label: 'map → [2]' } }, arrows: [['s1', 'fn'], ['fn', 'out']] },
    { say: '…in order, same length.', tone: C.green, set: { o2: { in: 'out', from: 'fn' }, o3: { in: 'out', from: 'fn' } }, zones: { fn: { hi: true }, out: { label: 'map → [2, 4, 6]', hi: true } }, arrows: [['s3', 'fn'], ['fn', 'out']] },
    { say: 'The original array is untouched. map is chainable: .map().filter()…', tone: C.blue, zones: { src: { hi: true } } },
    { say: 'forEach throws the return values away and returns undefined. Use it only for side effects.', tone: C.orange, set: { o1: null, o2: null, o3: null, und: { in: 'out', glow: true } }, zones: { out: { label: 'forEach → undefined', color: C.gray, hi: true }, fn: { label: 'x => console.log(x)' } } },
  ],
};

export default {
  generators,
  'execution-context': executionContext,
  'deep-clone': deepClone,
  'proxy-reflect': proxyReflect,
  'generators-adv': generatorsAdv,
  'weak-refs': weakRefs,
  currying,
  'race-conditions': raceConditions,
  'module-pattern': modulePattern,
  'ji-immutability': immutability,
  'rf-map-foreach': mapForEach,
};
