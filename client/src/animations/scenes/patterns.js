import { C, sequence } from '../engine/helpers';

// ── Singleton ──────────────────────────────────────────────────────────
const singleton = {
  title: 'Singleton: everyone gets the same instance',
  accent: C.blue,
  h: 260,
  code: `class Store {
  static #instance;
  static get() { return Store.#instance ??= new Store(); }
}`,
  zones: {
    a: { x: 12, y: 30, w: 170, h: 70, color: C.cyan, text: 'Module A\nStore.get()' },
    b: { x: 12, y: 160, w: 170, h: 70, color: C.purple, text: 'Module B\nStore.get()' },
    cls: { x: 240, y: 95, w: 160, h: 70, color: C.yellow, text: 'Store.get()' },
    inst: { x: 460, y: 80, w: 168, h: 100, label: 'instance', color: C.green, text: '#1', big: true, show: false },
  },
  actors: {},
  steps: [
    { say: 'Module A asks for the store first.', line: 3, zones: { a: { hi: true } }, arrows: [['a', 'cls']] },
    { say: 'No instance exists yet, so it is created and remembered.', tone: C.green, line: 3, zones: { inst: { show: true, hi: true } }, arrows: [['cls', 'inst', { color: C.green, label: 'new' }]] },
    { say: 'Module B asks too. It gets the SAME object, not a new one.', tone: C.purple, zones: { b: { hi: true } }, arrows: [['b', 'cls', { color: C.purple }], ['cls', 'inst', { color: C.purple, label: 'reuse' }]] },
    { say: 'In JS, an ES module export is already a singleton (modules are cached). Downside: hidden global state that is hard to test.', tone: C.yellow, zones: { inst: { hi: true } }, arrows: [['a', 'inst', { color: C.cyan }], ['b', 'inst', { color: C.purple }]] },
  ],
};

// ── Observer ───────────────────────────────────────────────────────────
const observer = sequence({
  title: 'Observer: the subject notifies its subscribers',
  accent: C.green,
  lanes: [
    { id: 'subject', label: 'Subject (subscribers: 0)', color: C.green },
    { id: 'chart', label: 'Chart', color: C.blue },
    { id: 'table', label: 'Table', color: C.purple },
  ],
  msgs: [
    { from: 'chart', to: 'subject', label: 'subscribe(fn)', color: C.blue, say: 'Observers register a callback directly with the subject.', zones: { subject: { label: 'Subject (subscribers: 1)' } } },
    { from: 'table', to: 'subject', label: 'subscribe(fn)', color: C.purple, say: 'The subject keeps a list of them.', zones: { subject: { label: 'Subject (subscribers: 2)' } } },
    { from: 'subject', to: 'chart', label: 'notify(price)', color: C.green, say: 'State changes → the subject loops over the list and calls each one…' },
    { from: 'subject', to: 'table', label: 'notify(price)', color: C.green, say: '…synchronously, in order.' },
    { from: 'table', to: 'subject', label: 'unsubscribe()', color: C.gray, say: 'Unsubscribe when done, or you get a memory leak.', zones: { subject: { label: 'Subject (subscribers: 1)' } } },
    { from: 'subject', to: 'chart', label: 'notify(price)', color: C.green, say: 'Only Chart is notified now. addEventListener, RxJS and stores all use this pattern.' },
  ],
});

// ── Factory ────────────────────────────────────────────────────────────
const factory = {
  title: 'Factory: one function decides which object to build',
  accent: C.orange,
  h: 260,
  code: `function createNotifier(type) {
  if (type === 'email') return new EmailNotifier();
  if (type === 'sms')   return new SmsNotifier();
  return new PushNotifier();
}`,
  zones: {
    in: { x: 12, y: 20, w: 150, h: 220, label: 'Request', color: C.gray, layout: 'col' },
    fac: { x: 220, y: 70, w: 180, h: 120, label: 'createNotifier()', color: C.orange, layout: 'center' },
    out: { x: 458, y: 20, w: 170, h: 220, label: 'Products', color: C.green, layout: 'col' },
  },
  actors: {
    q1: { label: "'email'", color: C.yellow, w: 100 },
    q2: { label: "'sms'", color: C.yellow, w: 100 },
    p1: { label: '✉ EmailNotifier', color: C.blue, w: 150 },
    p2: { label: '📱 SmsNotifier', color: C.purple, w: 150 },
  },
  steps: [
    { say: 'Callers just say WHAT they want.', set: { q1: { in: 'in' }, q2: { in: 'in' } } },
    { say: "'email' goes in. The factory picks the class.", line: 2, set: { q1: { in: 'fac', glow: true } }, zones: { fac: { hi: true } } },
    { say: 'Out comes an EmailNotifier, with the same .send() interface.', tone: C.blue, line: 2, set: { q1: null, p1: { in: 'out', from: 'fac', glow: true } } },
    { say: "'sms' → SmsNotifier. Callers never write new SmsNotifier() themselves.", tone: C.purple, line: 3, set: { q2: null, p2: { in: 'out', from: 'fac', glow: true } }, zones: { fac: { hi: true } } },
    { say: 'Adding a new type changes one place. React.createElement is a factory too.', tone: C.green, zones: { out: { hi: true } } },
  ],
};

// ── Strategy ───────────────────────────────────────────────────────────
const strategy = {
  title: 'Strategy: swap the algorithm at runtime',
  accent: C.cyan,
  h: 270,
  code: `const strategies = { card: payByCard, upi: payByUpi, cod: cashOnDelivery };
function checkout(cart, method) { return strategies[method](cart.total); }`,
  zones: {
    ctx: { x: 12, y: 60, w: 220, h: 140, label: 'checkout()', color: C.blue, layout: 'center' },
    slot: { x: 280, y: 60, w: 160, h: 140, label: 'current strategy', color: C.cyan, layout: 'center', dashed: true },
    pool: { x: 470, y: 12, w: 158, h: 246, label: 'Strategies', color: C.gray, layout: 'col' },
  },
  actors: {
    card: { label: '💳 card', color: C.blue, w: 120 },
    upi: { label: '📲 UPI', color: C.green, w: 120 },
    cod: { label: '💵 COD', color: C.yellow, w: 120 },
    pay: { label: 'pay(₹499)', color: C.purple, w: 120 },
  },
  steps: [
    { say: 'Interchangeable algorithms with the same signature, kept in a map.', line: 1, set: { card: { in: 'pool' }, upi: { in: 'pool' }, cod: { in: 'pool' } } },
    { say: 'User picks card → that strategy is plugged in.', tone: C.blue, line: 2, set: { card: { in: 'slot', glow: true }, pay: { in: 'ctx' } }, zones: { slot: { hi: true } } },
    { say: 'checkout() delegates to it, without knowing how card payment works.', tone: C.purple, set: { pay: { glow: true } }, arrows: [['ctx', 'slot', { label: 'pay()' }]] },
    { say: 'Switch to UPI: swap the strategy. checkout() code didn’t change at all.', tone: C.green, set: { card: { in: 'pool' }, upi: { in: 'slot', glow: true } }, arrows: [['ctx', 'slot', { label: 'pay()', color: C.green }]] },
    { say: 'Replaces if/else chains. Open for extension, closed for modification. Same idea as passing a comparator to sort().', tone: C.cyan },
  ],
};

// ── Decorator ──────────────────────────────────────────────────────────
const decorator = {
  title: 'Decorator: wrap to add behaviour without changing the original',
  accent: C.pink,
  h: 280,
  code: `const fetchUser = (id) => api.get(id);
const enhanced = withRetry(withCache(withLogging(fetchUser)));`,
  zones: {
    l3: { x: 120, y: 12, w: 400, h: 256, label: 'withRetry', color: C.orange, show: false },
    l2: { x: 150, y: 46, w: 340, h: 196, label: 'withCache', color: C.green, show: false },
    l1: { x: 180, y: 80, w: 280, h: 136, label: 'withLogging', color: C.purple, show: false },
    core: { x: 230, y: 116, w: 180, h: 70, color: C.blue, text: 'fetchUser(id)' },
  },
  actors: { call: { label: 'enhanced(7)', color: C.yellow, w: 110 } },
  steps: [
    { say: 'Start with a plain function.', line: 1, zones: { core: { hi: true } } },
    { say: 'withLogging wraps it: same signature, logs before and after.', tone: C.purple, line: 2, zones: { l1: { show: true, hi: true } } },
    { say: 'withCache wraps THAT: returns cached results when it can.', tone: C.green, line: 2, zones: { l2: { show: true, hi: true } } },
    { say: 'withRetry wraps everything: retries on failure.', tone: C.orange, line: 2, zones: { l3: { show: true, hi: true } } },
    { say: 'A call passes through each layer inward, then the result flows back out.', tone: C.yellow, set: { call: { x: 320, y: 151, glow: true, from: { x: 40, y: 140 } } }, zones: { core: { hi: true } } },
    { say: 'Layers are reusable and composable. HOCs, middleware and TypeScript @decorators are all this pattern.', tone: C.pink, set: { call: null } },
  ],
};

// ── Proxy pattern ──────────────────────────────────────────────────────
const proxyPattern = sequence({
  title: 'Proxy: a stand-in controls access to the real object',
  accent: C.purple,
  lanes: [
    { id: 'client', label: 'Client', color: C.blue },
    { id: 'proxy', label: 'ImageProxy (cache)', color: C.purple },
    { id: 'real', label: 'Real image loader', color: C.gray },
  ],
  msgs: [
    { from: 'client', to: 'proxy', label: 'display()', say: 'The client talks to the proxy, which has the same interface as the real object.' },
    { from: 'proxy', to: 'real', label: 'load (first time)', color: C.purple, say: 'Lazy: the expensive object is only created when actually needed.' },
    { from: 'real', to: 'proxy', label: '🖼 bitmap', color: C.gray, say: 'The proxy keeps the result.', zones: { proxy: { label: 'ImageProxy · cached' } } },
    { from: 'proxy', to: 'client', label: '🖼', color: C.green, say: 'Shown.' },
    { from: 'client', to: 'proxy', label: 'display()', say: 'Next call…' },
    { from: 'proxy', to: 'client', label: '⚡ from cache', color: C.green, say: '…answered without touching the real object. Proxies also do access control, logging, and validation (see JS Proxy).' },
  ],
});

// ── Command ────────────────────────────────────────────────────────────
const command = {
  title: 'Command: actions as objects → undo/redo',
  accent: C.yellow,
  h: 290,
  code: `const cmd = { execute: () => editor.bold(sel), undo: () => editor.unbold(sel) };
history.push(cmd); cmd.execute();
history.pop().undo();`,
  zones: {
    ui: { x: 12, y: 12, w: 170, h: 266, label: 'Toolbar', color: C.blue, layout: 'col' },
    hist: { x: 200, y: 12, w: 200, h: 266, label: 'History stack', color: C.yellow, layout: 'stack' },
    doc: { x: 418, y: 12, w: 210, h: 266, label: 'Document', color: C.green, text: 'Hello world' },
  },
  actors: {
    b: { label: 'B', color: C.blue, w: 60 },
    i: { label: 'I', color: C.blue, w: 60 },
    c1: { label: 'BoldCommand', color: C.orange, w: 160 },
    c2: { label: 'ItalicCommand', color: C.purple, w: 160 },
    undo: { label: '↶ Undo', color: C.gray, w: 100 },
  },
  steps: [
    { say: 'Clicking Bold doesn’t edit directly. It creates a command object with execute() and undo().', line: 1, set: { b: { in: 'ui', glow: true }, i: { in: 'ui' }, undo: { in: 'ui' } } },
    { say: 'The command is executed and pushed onto the history stack.', tone: C.orange, line: 2, set: { c1: { in: 'hist', from: 'ui', glow: true } }, zones: { doc: { text: '<b>Hello</b> world', hi: true } } },
    { say: 'Italic → another command on the stack.', tone: C.purple, line: 2, set: { c2: { in: 'hist', from: 'ui', glow: true } }, zones: { doc: { text: '<b><i>Hello</i></b> world', hi: true } } },
    { say: 'Undo pops the last command and calls its undo().', tone: C.yellow, line: 3, set: { undo: { glow: true }, c2: null }, zones: { doc: { text: '<b>Hello</b> world', hi: true } } },
    { say: 'Commands can also be queued, logged, replayed or sent over a network. Redux actions are a cousin of this.', tone: C.green },
  ],
};

// ── Facade ─────────────────────────────────────────────────────────────
const facade = {
  title: 'Facade: one simple call hides a messy subsystem',
  accent: C.teal,
  h: 270,
  zones: {
    client: { x: 12, y: 100, w: 140, h: 70, color: C.blue, text: 'Component' },
    fac: { x: 200, y: 90, w: 180, h: 90, label: 'orderService', color: C.teal, text: 'placeOrder(cart)' },
    inv: { x: 450, y: 12, w: 178, h: 70, color: C.gray, text: 'inventory.reserve()' },
    pay: { x: 450, y: 100, w: 178, h: 70, color: C.gray, text: 'payments.charge()' },
    ship: { x: 450, y: 188, w: 178, h: 70, color: C.gray, text: 'shipping.schedule()' },
  },
  actors: {},
  steps: [
    { say: 'Without a facade, the component would call three services in the right order and handle each failure itself.', arrows: [['client', 'inv', { color: C.red, bend: 0.15 }], ['client', 'pay', { color: C.red }], ['client', 'ship', { color: C.red, bend: -0.15 }]] },
    { say: 'With a facade, it makes one call: placeOrder(cart).', tone: C.teal, zones: { fac: { hi: true } }, arrows: [['client', 'fac']] },
    { say: 'The facade orchestrates the subsystem: reserve stock…', tone: C.teal, zones: { inv: { hi: true, color: C.green } }, arrows: [['fac', 'inv']] },
    { say: '…charge the card…', tone: C.teal, zones: { pay: { hi: true, color: C.green }, inv: { color: C.green } }, arrows: [['fac', 'pay']] },
    { say: '…schedule shipping (and roll back if any step fails).', tone: C.teal, zones: { ship: { hi: true, color: C.green }, pay: { color: C.green } }, arrows: [['fac', 'ship']] },
    { say: 'Callers stay simple and decoupled. Your api.js wrapper around fetch is a facade.', tone: C.green, zones: { fac: { hi: true } } },
  ],
};

// ── Pub/Sub vs Observer ────────────────────────────────────────────────
const pubsub = sequence({
  title: 'Pub/Sub: a broker decouples senders from receivers',
  accent: C.orange,
  chipW: 130,
  lanes: [
    { id: 'pub', label: 'Publisher (Cart)', color: C.blue },
    { id: 'broker', label: 'Event bus', color: C.orange },
    { id: 'sub1', label: 'Analytics', color: C.purple },
    { id: 'sub2', label: 'Header badge', color: C.green },
  ],
  msgs: [
    { from: 'sub1', to: 'broker', label: "on('cart:add')", color: C.purple, say: 'Subscribers register interest in a TOPIC with the broker, not with the publisher.' },
    { from: 'sub2', to: 'broker', label: "on('cart:add')", color: C.green, say: 'Another one subscribes to the same topic.' },
    { from: 'pub', to: 'broker', label: "emit('cart:add')", color: C.blue, say: 'The publisher emits to the topic. It has no idea who, if anyone, is listening.' },
    { from: 'broker', to: 'sub1', label: 'cart:add', color: C.orange, say: 'The broker fans the event out…' },
    { from: 'broker', to: 'sub2', label: 'cart:add', color: C.orange, say: '…to every subscriber. Observer = direct references; Pub/Sub = indirection via the broker, so parts can be added or removed freely.' },
  ],
});

// ── MVC / MVVM ─────────────────────────────────────────────────────────
const mvc = {
  title: 'MVC vs MVVM: who updates whom',
  accent: C.purple,
  h: 280,
  zones: {
    view: { x: 230, y: 12, w: 180, h: 70, color: C.blue, text: 'View' },
    ctrl: { x: 30, y: 180, w: 180, h: 70, color: C.orange, text: 'Controller' },
    model: { x: 430, y: 180, w: 180, h: 70, color: C.green, text: 'Model' },
  },
  actors: { ev: { label: '🖱 click', color: C.yellow, w: 80 } },
  steps: [
    { say: 'MVC: the user interacts with the View.', set: { ev: { x: 320, y: 100 } }, zones: { view: { hi: true } } },
    { say: 'The View forwards input to the Controller.', tone: C.orange, set: { ev: { x: 120, y: 160 } }, zones: { ctrl: { hi: true } }, arrows: [['view', 'ctrl', { label: 'input' }]] },
    { say: 'The Controller updates the Model (business data and rules).', tone: C.green, set: { ev: { x: 520, y: 160, label: 'update' } }, zones: { model: { hi: true } }, arrows: [['ctrl', 'model', { color: C.green }]] },
    { say: 'The Model notifies the View, which re-renders.', tone: C.blue, set: { ev: null }, zones: { view: { hi: true } }, arrows: [['model', 'view', { color: C.blue, label: 'notify' }]] },
    { say: 'MVVM: a ViewModel exposes state, and the View binds to it two-way. Change one, the other updates automatically.', tone: C.purple, zones: { ctrl: { text: 'ViewModel', color: C.purple, hi: true } }, arrows: [['view', 'ctrl', { color: C.purple, label: 'binding' }], ['ctrl', 'view', { color: C.purple, bend: 0.2 }], ['ctrl', 'model', { color: C.green }]] },
    { say: 'React components blur the lines: state + hooks act like a ViewModel, JSX is the View.', tone: C.cyan, zones: { ctrl: { text: 'state + hooks', color: C.cyan, hi: true }, view: { text: 'JSX', hi: true } }, arrows: [['ctrl', 'view', { color: C.cyan, label: 'render' }], ['view', 'ctrl', { color: C.yellow, label: 'events', bend: 0.2 }]] },
  ],
};

export default {
  'pattern-singleton': singleton,
  'pattern-observer': observer,
  'pattern-factory': factory,
  'pattern-strategy': strategy,
  'pattern-decorator': decorator,
  'pattern-proxy': proxyPattern,
  'pattern-command': command,
  'pattern-facade': facade,
  'pattern-pubsub': pubsub,
  'pattern-mvc': mvc,
};
