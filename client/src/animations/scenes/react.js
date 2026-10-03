import { C, pipeline, sequence, tree, rows } from '../engine/helpers';

// ── Render cycle ───────────────────────────────────────────────────────
const renderCycle = pipeline({
  title: 'One state update, start to finish',
  accent: C.blue,
  token: { label: 'setCount(1)', color: C.yellow },
  stages: [
    { id: 'trigger', label: '1 · Trigger', color: C.yellow, say: 'setState schedules an update. Nothing re-renders synchronously.' },
    { id: 'render', label: '2 · Render', color: C.blue, out: 'new JSX tree', say: 'React calls your component again to get the new JSX. This is pure: no DOM yet.' },
    { id: 'diff', label: '3 · Reconcile', color: C.purple, out: 'diff: 1 text node', say: 'The new tree is diffed against the previous one to find what changed.' },
    { id: 'commit', label: '4 · Commit', color: C.orange, out: 'DOM patched', say: 'Only the changed DOM nodes are updated, in one synchronous pass.' },
    { id: 'paint', label: '5 · Paint', color: C.green, out: 'pixels', say: 'The browser paints the new frame.' },
    { id: 'effects', label: '6 · Effects', color: C.cyan, out: 'useEffect runs', say: 'Then useEffect callbacks run (useLayoutEffect ran before paint).' },
  ],
  outro: 'Render can run many times or be thrown away; commit is the only phase that touches the DOM.',
});

// ── Context re-render pitfall ──────────────────────────────────────────
const ctxTree = tree({
  prov: [320, 40, 'AppContext.Provider\nvalue={{ user, theme }}', C.blue, 250],
  header: [120, 150, 'Header\nuses theme', C.gray, 150],
  cart: [320, 150, 'Cart\nuses user', C.gray, 150],
  footer: [520, 150, 'Footer (memo)\nno context', C.gray, 150],
  uctx: [200, 40, 'UserContext', C.green, 160],
  tctx: [440, 40, 'ThemeContext', C.purple, 160],
}, { h: 52 });
ctxTree.uctx.show = false;
ctxTree.tctx.show = false;
const contextPerf = {
  title: 'Every consumer re-renders when the value changes',
  accent: C.orange,
  h: 250,
  zones: { ...ctxTree, note: { x: 12, y: 196, w: 616, h: 44, color: C.gray, text: 'renders → Header 1 · Cart 1 · Footer 1', round: 8 } },
  edges: [['prov', 'header'], ['prov', 'cart'], ['prov', 'footer'], ['tctx', 'header'], ['uctx', 'cart'], ['uctx', 'footer']],
  actors: {},
  steps: [
    { say: 'One context holds both user and theme. Header reads theme, Cart reads user.', zones: { prov: { hi: true } } },
    { say: 'The user logs in. setUser creates a NEW value object.', tone: C.yellow, zones: { prov: { hi: true, color: C.yellow } } },
    { say: 'React re-renders EVERY consumer of that context, including Header, which only needed theme.', tone: C.red, zones: { prov: { color: C.blue }, header: { hi: true, color: C.red }, cart: { hi: true, color: C.green }, note: { text: 'renders → Header 2 (wasted) · Cart 2 · Footer 1' } } },
    { say: 'Trap: value={{…}} inline makes a new object on every parent render, so consumers re-render even with no change. Wrap it in useMemo.', tone: C.orange, zones: { prov: { hi: true, color: C.orange } } },
    { say: 'Fix: split into separate contexts by how often they change.', tone: C.green, zones: { prov: { show: false }, uctx: { show: true, hi: true }, tctx: { show: true, hi: true }, header: { color: C.gray }, cart: { color: C.gray } }, arrows: [['uctx', 'cart', { color: C.green }], ['tctx', 'header', { color: C.purple }]] },
    { say: 'Now a user change re-renders only Cart.', tone: C.green, zones: { uctx: { hi: true }, cart: { hi: true, color: C.green }, note: { text: 'renders → Header 2 · Cart 3 · Footer 1 ✓' } }, arrows: [['uctx', 'cart', { color: C.green }]] },
  ],
};

// ── Custom hooks: share logic, not state ───────────────────────────────
const customHooks = {
  title: 'Custom hooks share logic, not state',
  accent: C.purple,
  h: 270,
  code: `function useCounter() {
  const [count, setCount] = useState(0);
  return { count, inc: () => setCount(c => c + 1) };
}`,
  zones: {
    hook: { x: 200, y: 12, w: 240, h: 60, color: C.purple, text: 'useCounter()  ← recipe' },
    a: { x: 30, y: 110, w: 260, h: 150, label: '<LikeButton />', color: C.blue, layout: 'col' },
    b: { x: 350, y: 110, w: 260, h: 150, label: '<CartBadge />', color: C.orange, layout: 'col' },
  },
  actors: {
    sa: { label: 'count = 0', color: C.blue, w: 160 },
    sb: { label: 'count = 0', color: C.orange, w: 160 },
    click: { label: '🖱 inc()', color: C.yellow, w: 110 },
  },
  steps: [
    { say: 'A custom hook is just a function that calls other hooks.', zones: { hook: { hi: true } }, line: 1 },
    { say: 'LikeButton calls useCounter() and gets its OWN state slot.', tone: C.blue, line: 2, set: { sa: { in: 'a', from: 'hook', glow: true } }, zones: { a: { hi: true } }, arrows: [['hook', 'a']] },
    { say: 'CartBadge calls it too and gets a separate, independent slot.', tone: C.orange, line: 2, set: { sb: { in: 'b', from: 'hook', glow: true } }, zones: { b: { hi: true } }, arrows: [['hook', 'b']] },
    { say: 'Clicking in LikeButton updates only LikeButton’s count.', tone: C.blue, line: 3, set: { click: { in: 'a' }, sa: { label: 'count = 1', glow: true } }, zones: { a: { hi: true } } },
    { say: 'CartBadge stays at 0. To SHARE state, lift it up or use context/a store.', tone: C.green, set: { sb: { glow: true } }, zones: { b: { hi: true } } },
  ],
};

// ── Prop drilling vs store ─────────────────────────────────────────────
const smTree = tree({
  app: [210, 36, 'App · user state', C.blue, 170],
  layout: [210, 108, 'Layout', C.gray],
  sidebar: [210, 180, 'Sidebar', C.gray],
  avatar: [210, 252, 'Avatar · needs user', C.gray, 170],
  store: [500, 144, '🗄 Store\n(user)', C.green, 150],
}, { h: 46 });
smTree.store.show = false;
const stateManagement = {
  title: 'Prop drilling vs a shared store',
  accent: C.green,
  h: 290,
  zones: smTree,
  edges: [['app', 'layout'], ['layout', 'sidebar'], ['sidebar', 'avatar']],
  actors: { u: { label: 'user', color: C.yellow, w: 64, shape: 'pill', h: 24 } },
  steps: [
    { say: 'App owns user, but only Avatar, four levels down, needs it.', set: { u: { x: 330, y: 36 } }, zones: { app: { hi: true } } },
    { say: 'Prop drilling: Layout receives user just to pass it on…', tone: C.orange, set: { u: { x: 330, y: 108 } }, zones: { layout: { hi: true, color: C.orange } } },
    { say: '…so does Sidebar. Every middle layer is coupled to data it doesn’t use, and re-renders when it changes.', tone: C.orange, set: { u: { x: 330, y: 180 } }, zones: { sidebar: { hi: true, color: C.orange }, layout: { color: C.orange } } },
    { say: 'Finally Avatar gets it.', tone: C.blue, set: { u: { x: 330, y: 252 } }, zones: { avatar: { hi: true } } },
    { say: 'With a store (Context, Zustand, Redux), state lives outside the tree.', tone: C.green, set: { u: { x: 500, y: 182 } }, zones: { store: { show: true, hi: true }, layout: { color: C.gray }, sidebar: { color: C.gray } } },
    { say: 'Avatar subscribes directly. Layout and Sidebar are untouched.', tone: C.green, set: { u: { x: 330, y: 252, glow: true } }, zones: { avatar: { hi: true, color: C.green } }, arrows: [['store', 'avatar', { color: C.green, label: 'subscribe' }]] },
  ],
};

// ── HOC ────────────────────────────────────────────────────────────────
const hoc = {
  title: 'A Higher-Order Component wraps another component',
  accent: C.cyan,
  h: 270,
  code: `const withAuth = (Comp) => (props) => {
  const user = useUser();
  return user ? <Comp {...props} user={user} /> : <Navigate to="/login" />;
};`,
  zones: {
    outer: { x: 150, y: 20, w: 330, h: 230, label: 'withAuth(Dashboard)', color: C.cyan, dashed: true },
    inner: { x: 190, y: 120, w: 250, h: 110, label: 'Dashboard', color: C.blue, layout: 'row' },
    login: { x: 500, y: 120, w: 128, h: 110, label: '/login', color: C.red, layout: 'center', dim: true },
    inbox: { x: 12, y: 20, w: 120, h: 230, label: 'Props in', color: C.gray, layout: 'col' },
  },
  actors: {
    p: { label: 'props', color: C.yellow, w: 80 },
    user: { label: '+ user', color: C.green, w: 80 },
    anon: { label: 'props', color: C.yellow, w: 80 },
  },
  steps: [
    { say: 'withAuth takes a component and returns a new, enhanced component.', line: 1, zones: { outer: { hi: true } } },
    { say: 'Props arrive at the wrapper first, not at Dashboard.', set: { p: { in: 'inbox' } } },
    { say: 'The HOC runs its shared logic: is there a user?', tone: C.cyan, line: 2, set: { p: { x: 315, y: 70, glow: true } }, zones: { outer: { hi: true } } },
    { say: 'Yes, so it renders Dashboard with the original props plus an injected user prop.', tone: C.green, line: 3, set: { p: { in: 'inner' }, user: { in: 'inner', from: 'outer', glow: true } }, zones: { inner: { hi: true } } },
    { say: 'Logged out? The wrapper redirects. Dashboard never even renders.', tone: C.red, line: 3, set: { p: null, user: null, anon: { in: 'login', from: 'outer', glow: true } }, zones: { login: { hi: true, dim: false }, inner: { dim: true } } },
    { say: 'Today, custom hooks (useUser) usually replace HOCs, with no wrapper nesting.', tone: C.purple, set: { anon: null, p: { in: 'inner' }, user: { in: 'inner' } }, zones: { inner: { dim: false }, login: { dim: true } } },
  ],
};

// ── Render props ───────────────────────────────────────────────────────
const area = { x: 12, y: 12, w: 400, h: 250 };
const rp = (x, y) => ({ cur: { x: area.x + x, y: area.y + y }, cat: { x: area.x + x + 28, y: area.y + y + 28 } });
const renderProps = {
  title: 'Render props: the component owns the data, you own the UI',
  accent: C.pink,
  h: 274,
  code: `<Mouse render={({ x, y }) => <Cat x={x} y={y} />} />`,
  zones: {
    area: { ...area, label: '<Mouse> tracks the pointer', color: C.blue },
    state: { x: 430, y: 12, w: 198, h: 110, label: 'Mouse state', color: C.purple, text: '{ x: 60, y: 60 }' },
    call: { x: 430, y: 140, w: 198, h: 122, label: 'calls', color: C.pink, text: 'render({ x, y })\n→ <Cat />' },
  },
  actors: {
    cur: { label: '➤', color: C.yellow, w: 22, h: 22, shape: 'dot', fs: 11 },
    cat: { label: '🐱', color: C.pink, w: 40, h: 40, shape: 'dot', fs: 20 },
  },
  steps: [
    { say: 'Mouse handles the logic: it listens to mousemove and keeps { x, y } in state.', set: { cur: rp(60, 60).cur, cat: { ...rp(60, 60).cat, visible: false } }, zones: { area: { hi: true } } },
    { say: 'It doesn’t render anything itself. It calls the function you passed with its data.', tone: C.pink, set: { cat: rp(60, 60).cat }, zones: { call: { hi: true } }, arrows: [['state', 'call']] },
    { say: 'Pointer moves → state updates → render(pos) runs → the Cat follows.', tone: C.purple, set: { cur: rp(240, 110).cur, cat: rp(240, 110).cat }, zones: { state: { text: '{ x: 240, y: 110 }', hi: true } } },
    { say: 'Same logic, any UI. Swap the function to draw a tooltip, a spotlight, anything.', set: { cur: rp(320, 190).cur, cat: { ...rp(320, 190).cat, label: '🔦' } }, zones: { state: { text: '{ x: 320, y: 190 }', hi: true }, call: { text: 'render({ x, y })\n→ <Spotlight />' } } },
    { say: 'Modern equivalent: a useMouse() hook returning { x, y }.', tone: C.green, set: { cur: rp(130, 170).cur, cat: { ...rp(130, 170).cat, label: '🐱' } }, zones: { state: { text: 'const { x, y } = useMouse()', hi: true }, call: { text: '<Cat x={x} y={y} />' } } },
  ],
};

// ── Compound components ────────────────────────────────────────────────
const compound = {
  title: 'Compound components share state through context',
  accent: C.purple,
  h: 280,
  code: `<Tabs>
  <Tabs.List> <Tabs.Tab>Profile</Tabs.Tab> <Tabs.Tab>Billing</Tabs.Tab> </Tabs.List>
  <Tabs.Panel>…</Tabs.Panel>  <Tabs.Panel>…</Tabs.Panel>
</Tabs>`,
  zones: {
    tabs: { x: 12, y: 12, w: 616, h: 256, label: '<Tabs>  · context { active: 0 }', color: C.purple },
    list: { x: 32, y: 50, w: 300, h: 80, label: 'Tabs.List', color: C.blue, layout: 'row' },
    ctx: { x: 360, y: 50, w: 248, h: 80, label: 'TabsContext', color: C.purple, text: 'active = 0', big: true },
    panel: { x: 32, y: 150, w: 576, h: 100, label: 'Tabs.Panel', color: C.green, text: '👤 Profile settings' },
  },
  actors: {
    t1: { label: 'Profile', color: C.green, w: 100 },
    t2: { label: 'Billing', color: C.gray, w: 100 },
  },
  steps: [
    { say: 'The parent <Tabs> holds the state and provides it via context.', set: { t1: { in: 'list', glow: true }, t2: { in: 'list' } }, zones: { ctx: { hi: true } } },
    { say: 'Each Tab and Panel reads the context. No props threaded by hand.', arrows: [['ctx', 't1', { color: C.purple }], ['ctx', 'panel', { color: C.purple }]] },
    { say: 'Click Billing → the Tab calls setActive(1) from context.', tone: C.yellow, set: { t2: { glow: true, color: C.yellow } }, arrows: [['t2', 'ctx', { color: C.yellow, label: 'setActive(1)' }]] },
    { say: 'Context changes, so the tabs and the panel re-render together.', tone: C.green, set: { t1: { color: C.gray }, t2: { color: C.green, glow: true } }, zones: { ctx: { text: 'active = 1', hi: true }, tabs: { label: '<Tabs>  · context { active: 1 }' }, panel: { text: '💳 Billing details', hi: true } }, arrows: [['ctx', 'panel', { color: C.green }]] },
    { say: 'Users compose the pieces freely, like <select> and <option>. Flexible API, hidden wiring.', tone: C.purple, zones: { tabs: { hi: true } } },
  ],
};

// ── Controlled vs uncontrolled ─────────────────────────────────────────
const controlled = {
  title: 'Who owns the input’s value?',
  accent: C.blue,
  h: 300,
  zones: {
    cHead: { x: 12, y: 12, w: 300, h: 276, label: 'Controlled', color: C.blue },
    cState: { x: 28, y: 46, w: 268, h: 70, label: 'React state', color: C.purple, text: "value = ''" },
    cInput: { x: 28, y: 196, w: 268, h: 76, label: '<input value={value} />', color: C.blue, text: '▏' },
    uHead: { x: 328, y: 12, w: 300, h: 276, label: 'Uncontrolled', color: C.orange },
    uInput: { x: 344, y: 46, w: 268, h: 76, label: '<input ref={ref} />', color: C.orange, text: '▏' },
    uSubmit: { x: 344, y: 196, w: 268, h: 76, label: 'onSubmit', color: C.green, text: 'ref.current.value' },
  },
  actors: {
    key: { label: "⌨ 'h'", color: C.yellow, w: 70 },
    ch: { label: "onChange → setValue('h')", color: C.purple, w: 210 },
    key2: { label: "⌨ 'hi'", color: C.yellow, w: 70 },
  },
  steps: [
    { say: 'Controlled: React state is the single source of truth.', zones: { cState: { hi: true } } },
    { say: 'A key is pressed in the input…', tone: C.yellow, set: { key: { x: 162, y: 290 - 66, glow: true } }, zones: { cInput: { hi: true } } },
    { say: '…onChange fires and you set state. You could validate or transform it here.', tone: C.purple, set: { ch: { x: 162, y: 156, glow: true } }, arrows: [['cInput', 'cState', { color: C.purple }]] },
    { say: 'React re-renders and pushes the value back into the input. It shows what state says.', tone: C.blue, set: { key: null }, zones: { cState: { text: "value = 'h'", hi: true }, cInput: { text: 'h▏', hi: true } }, arrows: [['cState', 'cInput', { color: C.blue, label: 'value' }]] },
    { say: 'Uncontrolled: the DOM keeps the value itself. React doesn’t re-render while typing.', tone: C.orange, set: { ch: null, key2: { x: 478, y: 146 } }, zones: { uInput: { text: 'hi▏', hi: true } } },
    { say: 'You read it only when needed (on submit) via a ref. Less code, less control.', tone: C.green, zones: { uSubmit: { text: "ref.current.value → 'hi'", hi: true } }, arrows: [['uInput', 'uSubmit', { color: C.green, label: 'read once' }]] },
  ],
};

// ── Error boundaries ───────────────────────────────────────────────────
const ebTree = tree({
  app: [320, 34, 'App', C.blue],
  eb: [200, 108, 'ErrorBoundary', C.purple, 140],
  nav: [460, 108, 'Nav', C.gray],
  profile: [200, 182, 'Profile', C.gray],
  avatar: [200, 256, 'Avatar', C.gray],
}, { h: 44 });
const errorBoundaries = {
  title: 'An error bubbles up to the nearest boundary',
  accent: C.red,
  h: 290,
  zones: ebTree,
  edges: [['app', 'eb'], ['app', 'nav'], ['eb', 'profile'], ['profile', 'avatar']],
  actors: { err: { label: '💥 Error', color: C.red, w: 86, shape: 'pill' } },
  steps: [
    { say: 'A component tree with an ErrorBoundary around the Profile section.', zones: { eb: { hi: true } } },
    { say: 'Avatar throws while rendering (say user.photo is undefined).', tone: C.red, set: { err: { x: 340, y: 256, glow: true, shake: true } }, zones: { avatar: { hi: true, color: C.red } } },
    { say: 'React unwinds up the tree looking for a boundary. Profile has none…', tone: C.red, set: { err: { x: 340, y: 182 } }, zones: { profile: { hi: true, color: C.red } } },
    { say: '…ErrorBoundary catches it with getDerivedStateFromError and logs it in componentDidCatch.', tone: C.purple, set: { err: { x: 340, y: 108, glow: true } }, zones: { eb: { hi: true } } },
    { say: 'It renders a fallback UI instead of its children. Nav and the rest of the app keep working.', tone: C.green, set: { err: null }, zones: { eb: { text: '⚠ Fallback UI', color: C.orange, hi: true }, profile: { dim: true }, avatar: { dim: true }, nav: { hi: true, color: C.green } } },
    { say: 'Without any boundary the WHOLE app unmounts. Note: errors in event handlers and async code are not caught.', tone: C.orange, zones: { app: { hi: true } } },
  ],
};

// ── Portals ────────────────────────────────────────────────────────────
const portalZones = {
  rHead: { x: 12, y: 12, w: 300, h: 266, label: 'React tree', color: C.blue },
  dHead: { x: 328, y: 12, w: 300, h: 266, label: 'DOM tree', color: C.orange },
  ...tree({
    rApp: [162, 66, 'App', C.blue],
    rCard: [162, 146, 'Card (onClick)', C.blue, 140],
    rModal: [162, 226, 'Modal', C.pink],
    dRoot: [410, 66, '#root', C.orange, 110],
    dCard: [410, 146, 'div.card\noverflow:hidden', C.orange, 130],
    dMRoot: [560, 146, '#modal-root', C.green, 110],
  }, { h: 46 }),
};
const portals = {
  title: 'A portal renders elsewhere in the DOM, but stays in the React tree',
  accent: C.pink,
  h: 290,
  zones: portalZones,
  edges: [['rApp', 'rCard'], ['rCard', 'rModal'], ['dRoot', 'dCard']],
  actors: { m: { label: 'div.modal', color: C.pink, w: 104, h: 36 } },
  steps: [
    { say: 'Modal is a child of Card in React, so normally its DOM goes inside div.card.', zones: { rModal: { hi: true } }, set: { m: { x: 410, y: 226 } }, arrows: [['dCard', 'm', { dashed: false, color: C.gray }]] },
    { say: 'But .card has overflow:hidden / z-index. The modal gets clipped. ✂', tone: C.red, set: { m: { shake: true, color: C.red } }, zones: { dCard: { hi: true, color: C.red } } },
    { say: 'createPortal(children, modalRoot) mounts the DOM node under #modal-root instead.', tone: C.green, set: { m: { x: 560, y: 226, color: C.pink, glow: true } }, zones: { dMRoot: { hi: true }, dCard: { color: C.orange } }, arrows: [['dMRoot', 'm', { color: C.green }]] },
    { say: 'Click inside the modal: the event bubbles through the REACT tree, so Card’s onClick still fires.', tone: C.blue, set: { m: { glow: true } }, zones: { rModal: { hi: true }, rCard: { hi: true } }, arrows: [['rModal', 'rCard', { color: C.blue, label: 'bubbles' }]] },
    { say: 'Context works the same way. Portals are ideal for modals, tooltips and toasts.', tone: C.pink, zones: { rApp: { hi: true }, rCard: { hi: true }, rModal: { hi: true } } },
  ],
};

// ── Suspense ───────────────────────────────────────────────────────────
const suspense = sequence({
  title: 'Suspense shows a fallback while children wait',
  accent: C.cyan,
  code: `<Suspense fallback={<Spinner />}>
  <Profile />     {/* reads data or is React.lazy */}
</Suspense>`,
  lanes: [
    { id: 'boundary', label: '<Suspense>', color: C.cyan },
    { id: 'profile', label: '<Profile />', color: C.blue },
    { id: 'net', label: 'Network', color: C.gray },
  ],
  msgs: [
    { from: 'boundary', to: 'profile', label: 'render', say: 'React starts rendering Profile.', line: 2 },
    { from: 'profile', to: 'net', label: 'needs data / chunk', color: C.gray, say: 'Profile’s data (or its lazy code) is not ready yet.' },
    { from: 'profile', to: 'boundary', label: '⏸ suspends', color: C.orange, say: 'It suspends, signalling “not ready” to the nearest Suspense above.', line: 2 },
    { say: 'The boundary shows the fallback ⏳ in Profile’s place. The rest of the page stays interactive.', tone: C.cyan, line: 1, zones: { boundary: { label: '<Suspense> · ⏳ Spinner', hi: true } } },
    { from: 'net', to: 'profile', label: 'data ✓', color: C.green, say: 'The data arrives…' },
    { from: 'profile', to: 'boundary', label: '✅ rendered', color: C.green, say: '…React retries the render and swaps the spinner for the real UI. No isLoading flags needed.', zones: { boundary: { label: '<Suspense> · content', hi: true } } },
  ],
});

// ── forwardRef ─────────────────────────────────────────────────────────
const forwardRef = {
  title: 'forwardRef passes a ref through to a DOM node',
  accent: C.teal,
  h: 280,
  code: `const ref = useRef(null);
<FancyInput ref={ref} />          // Parent
const FancyInput = forwardRef((props, ref) => <input ref={ref} />);
ref.current.focus();`,
  zones: {
    parent: { x: 12, y: 12, w: 616, h: 256, label: 'Parent', color: C.blue },
    fancy: { x: 200, y: 50, w: 410, h: 200, label: 'FancyInput = forwardRef((props, ref) => …)', color: C.teal },
    input: { x: 330, y: 120, w: 260, h: 110, label: '<input> DOM node', color: C.orange },
  },
  actors: {
    ref: { label: 'ref { current: null }', color: C.yellow, w: 170 },
    focus: { label: 'ref.current.focus()', color: C.green, w: 170 },
  },
  steps: [
    { say: 'Parent creates a ref. It starts as { current: null }.', line: 1, set: { ref: { x: 106, y: 70, glow: true } }, zones: { parent: { hi: true } } },
    { say: 'Passing ref to a plain function component would not work: ref is not a normal prop.', tone: C.red, line: 2, set: { ref: { x: 106, y: 150, shake: true } } },
    { say: 'forwardRef receives it as a second argument…', tone: C.teal, line: 3, set: { ref: { x: 300, y: 92, glow: true } }, zones: { fancy: { hi: true } } },
    { say: '…and attaches it to the real <input>. After commit, ref.current is that DOM node.', tone: C.orange, line: 3, set: { ref: { x: 460, y: 180, label: 'ref.current = <input>', glow: true } }, zones: { input: { hi: true } } },
    { say: 'Now Parent can call imperative DOM methods directly.', tone: C.green, line: 4, set: { focus: { x: 106, y: 220, glow: true } }, zones: { input: { hi: true, label: '<input> · focused ✨' } }, arrows: [['focus', 'input', { color: C.green }]] },
    { say: 'useImperativeHandle lets you expose only { focus } instead of the whole DOM node. In React 19, ref is a normal prop.', tone: C.teal, zones: { fancy: { hi: true } } },
  ],
};

// ── React.memo ─────────────────────────────────────────────────────────
const memoPatterns = {
  title: 'React.memo skips a render only if props are shallow-equal',
  accent: C.yellow,
  h: 290,
  zones: {
    parent: { x: 170, y: 12, w: 300, h: 60, color: C.blue, text: 'Parent · count = 0' },
    check: { x: 170, y: 104, w: 300, h: 70, label: 'memo: prevProps === nextProps ?', color: C.yellow, layout: 'row' },
    child: { x: 170, y: 206, w: 300, h: 70, color: C.gray, text: '<Chart /> (expensive)\nrenders: 1' },
  },
  edges: [['parent', 'check'], ['check', 'child']],
  actors: {
    p1: { label: "title='Sales'", color: C.green, w: 120 },
    p2: { label: 'style={{…}} #1', color: C.orange, w: 130 },
  },
  steps: [
    { say: 'Parent re-renders (count changes). Without memo, Chart would re-render too.', zones: { parent: { hi: true, text: 'Parent · count = 1' } } },
    { say: 'Wrapped in React.memo, React first compares each prop with ===.', tone: C.yellow, set: { p1: { in: 'check', glow: true } }, zones: { check: { hi: true } } },
    { say: "'Sales' === 'Sales' → all equal → skip! Chart doesn’t re-render.", tone: C.green, set: { p1: { color: C.green, label: "title ✓ same" } }, zones: { child: { text: '<Chart /> (expensive)\nrenders: 1 ✓ skipped', color: C.green } } },
    { say: 'But pass an inline object, style={{ color: "red" }}…', tone: C.orange, set: { p2: { in: 'check', glow: true } }, zones: { parent: { hi: true, text: 'Parent · count = 2' } } },
    { say: '…it is a NEW object every render. #1 !== #2, so memo fails and Chart re-renders anyway.', tone: C.red, set: { p2: { label: 'style #1 ≠ #2', color: C.red, shake: true } }, zones: { child: { text: '<Chart /> (expensive)\nrenders: 2 ✗', color: C.red, hi: true } } },
    { say: 'Fix: useMemo for objects/arrays, useCallback for functions, so references stay stable.', tone: C.green, set: { p2: { label: 'useMemo → #1 ✓', color: C.green } }, zones: { child: { text: '<Chart /> (expensive)\nrenders: 2 ✓ skipped', color: C.green } } },
  ],
};

// ── What causes re-renders ─────────────────────────────────────────────
const rrTree = tree({
  app: [320, 36, 'App', C.gray],
  list: [200, 116, 'List · state', C.gray, 130],
  sib: [460, 116, 'Sidebar', C.gray],
  itemA: [120, 200, 'Item A', C.gray],
  itemB: [290, 200, 'Item B · useTheme()', C.gray, 160],
  theme: [520, 236, 'ThemeContext', C.purple, 140],
}, { h: 44 });
const rerenderCauses = {
  title: 'Why did this component re-render?',
  accent: C.orange,
  h: 280,
  zones: rrTree,
  edges: [['app', 'list'], ['app', 'sib'], ['list', 'itemA'], ['list', 'itemB']],
  actors: {},
  steps: [
    { say: 'A component re-renders for one of three reasons. Watch which nodes flash.' },
    { say: '① Its own state changes: List calls setState.', tone: C.orange, zones: { list: { hi: true, color: C.orange } } },
    { say: '② Its parent re-rendered: Item A and Item B re-render too, even with identical props.', tone: C.yellow, zones: { list: { color: C.orange }, itemA: { hi: true, color: C.yellow }, itemB: { hi: true, color: C.yellow } } },
    { say: 'Re-renders flow DOWN only. App and Sidebar are untouched.', tone: C.blue, zones: { app: { hi: true, color: C.green }, sib: { hi: true, color: C.green }, list: { color: C.gray }, itemA: { color: C.gray }, itemB: { color: C.gray } } },
    { say: '③ A context it reads changes: Item B re-renders even if List is memoized.', tone: C.purple, zones: { theme: { hi: true }, itemB: { hi: true, color: C.purple }, app: { color: C.gray }, sib: { color: C.gray } }, arrows: [['theme', 'itemB', { color: C.purple }]] },
    { say: '“Props changed” isn’t separate: new props only arrive because the parent re-rendered. Fixes: move state down, memo, pass children.', tone: C.green, zones: { list: { hi: true } } },
  ],
};

// ── State batching ─────────────────────────────────────────────────────
const batching = {
  title: 'React 18 batches state updates into one render',
  accent: C.green,
  h: 280,
  code: `function handleClick() {          // or inside setTimeout / fetch().then
  setCount(c => c + 1);
  setFlag(f => !f);
  setName('Ana');
}`,
  zones: {
    queue: { x: 12, y: 12, w: 300, h: 180, label: 'Update queue', color: C.yellow, layout: 'col' },
    render: { x: 328, y: 12, w: 300, h: 180, label: 'Renders', color: C.green, layout: 'col' },
    count: { x: 12, y: 206, w: 616, h: 62, color: C.blue, text: 'React 18 · render count: 0', big: false },
  },
  actors: {
    u1: { label: 'setCount', color: C.yellow, w: 150 },
    u2: { label: 'setFlag', color: C.yellow, w: 150 },
    u3: { label: 'setName', color: C.yellow, w: 150 },
    r: { label: '⚛ 1 render', color: C.green, w: 170, h: 40 },
  },
  steps: [
    { say: 'Each setState doesn’t render immediately. It is queued.', line: 2, set: { u1: { in: 'queue', glow: true } }, zones: { queue: { hi: true } } },
    { say: 'More updates join the same queue…', line: [3, 4], set: { u2: { in: 'queue' }, u3: { in: 'queue' } }, zones: { queue: { hi: true } } },
    { say: 'When the handler finishes, React processes them all together in one render.', tone: C.green, set: { u1: { in: 'render' }, u2: { in: 'render' }, u3: { in: 'render' } }, zones: { render: { hi: true } } },
    { say: 'One render, one commit. No half-updated UI.', tone: C.green, set: { u1: null, u2: null, u3: null, r: { in: 'render', glow: true } }, zones: { count: { text: 'React 18 · render count: 1 ✓', hi: true } } },
    { say: 'React 17 batched only inside React event handlers. In setTimeout or promises it rendered 3 times. 18 batches everywhere.', tone: C.orange, zones: { count: { text: 'React 17 in setTimeout: 3 renders  →  React 18: 1', color: C.orange } } },
    { say: 'Need the DOM updated right now? flushSync(() => setX(…)) opts out.', tone: C.purple },
  ],
};

// ── Virtualization ─────────────────────────────────────────────────────
const VP = { x: 200, y: 64, w: 260, h: 180 };
const RH = 36;
const vRows = {};
for (let i = 0; i < 16; i++) vRows[`r${i}`] = { label: `Row ${(i + 1).toLocaleString()}`, color: C.blue, w: 236, h: 30 };
const windowAt = (offset) => {
  const set = {};
  for (let i = 0; i < 16; i++) {
    const rel = i - offset;
    const inView = rel >= 0 && rel < 5;
    const overscan = rel === -1 || rel === 5;
    if (inView || overscan) {
      set[`r${i}`] = { x: VP.x + VP.w / 2, y: VP.y + RH / 2 + rel * RH, visible: true, dim: overscan, color: inView ? C.blue : C.gray };
    } else {
      set[`r${i}`] = { visible: false, x: VP.x + VP.w / 2, y: VP.y + RH / 2 + rel * RH };
    }
  }
  return set;
};
const virtualization = {
  title: 'Render only the rows you can see',
  accent: C.cyan,
  h: 300,
  zones: {
    vp: { ...VP, color: C.cyan, ghost: true },
    total: { x: 12, y: 64, w: 170, h: 180, label: 'List data', color: C.gray, text: '10,000 items', big: true },
    dom: { x: 478, y: 64, w: 150, h: 180, label: 'DOM nodes', color: C.green, text: '7', big: true },
    lab: { x: 200, y: 8, w: 260, h: 26, color: C.cyan, text: 'viewport', ghost: true, round: 6 },
  },
  actors: vRows,
  steps: [
    { say: 'Rendering 10,000 rows means 10,000 DOM nodes: slow mount, janky scroll, lots of memory.', zones: { dom: { text: '10,000', color: C.red, hi: true } } },
    { say: 'A virtual list renders only the visible rows plus a little overscan (dimmed).', tone: C.cyan, set: windowAt(0), zones: { dom: { text: '6', color: C.green, hi: true }, vp: { hi: true } } },
    { say: 'Scroll down: offset = scrollTop / rowHeight. Rows that leave are unmounted, new ones mount.', tone: C.blue, set: windowAt(2), zones: { dom: { text: '7' } } },
    { say: 'The DOM count stays constant however far you scroll.', tone: C.green, set: windowAt(5), zones: { dom: { text: '7', hi: true } } },
    { say: 'A tall spacer element keeps the scrollbar the correct size. Libraries: react-window, TanStack Virtual.', tone: C.purple, set: windowAt(9), zones: { total: { hi: true } } },
  ],
};

// ── Concurrent rendering / transitions ─────────────────────────────────
const TL = 130;
const cbar = (x, w, y, label, color, extra = {}) => ({ x: TL + x, y, w, anchor: 'left', label, color, visible: true, h: 22, shape: 'bar', fs: 10, ...extra });
const concurrent = {
  title: 'startTransition keeps typing responsive',
  accent: C.purple,
  h: 260,
  zones: rows([
    ['sync', 'Without transition', C.red],
    ['conc', 'With startTransition', C.green],
  ], { top: 40, h: 90, gap: 20 }),
  actors: {
    k1: { shape: 'dot' }, k2: { shape: 'dot' }, k3: { shape: 'dot' }, k4: { shape: 'dot' },
    s1: {}, s2: {}, s3: {},
    c1: {}, c2: {}, c3: {}, c4: {},
    lag: { label: '⌛ input lag', color: C.red, w: 100, shape: 'text' },
  },
  steps: [
    { say: 'The user types “a”. The input must update AND a 10k-item list must be filtered.', set: { k1: { x: TL + 6, y: 70, label: 'a', color: C.yellow, w: 22, h: 22, visible: true }, s1: cbar(0, 260, 104, 'render list for “a” (blocking)', C.red) }, zones: { sync: { hi: true } } },
    { say: 'Without a transition, rendering is one blocking chunk. “b” is pressed mid-render…', tone: C.red, set: { k2: { x: TL + 100, y: 70, label: 'b', color: C.yellow, w: 22, h: 22, visible: true } }, zones: { sync: { hi: true } } },
    { say: '…but it can’t even show in the input until the whole render finishes. Typing feels laggy.', tone: C.red, set: { s2: cbar(262, 220, 104, 'render list for “ab”', C.red), lag: { x: TL + 150, y: 70, visible: true } }, zones: { sync: { hi: true } } },
    { say: 'With startTransition, the input update is urgent and the list update is low-priority.', tone: C.green, set: { k3: { x: TL + 6, y: 180, label: 'a', color: C.yellow, w: 22, h: 22, visible: true }, c1: cbar(0, 30, 214, 'in', C.green), c2: cbar(32, 200, 214, 'list “a” (interruptible)', C.purple) }, zones: { conc: { hi: true } } },
    { say: '“b” arrives: React abandons the stale list render and handles the keystroke first.', tone: C.yellow, set: { k4: { x: TL + 100, y: 180, label: 'b', color: C.yellow, w: 22, h: 22, visible: true }, c2: { w: 66, strike: true, label: '✗' }, c3: cbar(100, 30, 214, 'in', C.green) }, zones: { conc: { hi: true } } },
    { say: 'Then it renders the list for “ab” in the background. The input never lagged. useDeferredValue works similarly.', tone: C.green, set: { c4: cbar(132, 200, 214, 'list “ab” ✓', C.purple) }, zones: { conc: { hi: true } } },
  ],
};

// ── Hydration ──────────────────────────────────────────────────────────
const hydration = sequence({
  title: 'Hydration: making server HTML interactive',
  accent: C.blue,
  lanes: [
    { id: 'server', label: 'Server', color: C.gray },
    { id: 'browser', label: 'Browser', color: C.blue },
    { id: 'react', label: 'React (client JS)', color: C.cyan },
  ],
  msgs: [
    { from: 'server', to: 'browser', label: 'HTML (rendered)', color: C.gray, say: 'The server renders components to HTML. The page is visible fast…' },
    { say: '…but it’s dead: buttons do nothing yet. There are no event listeners.', tone: C.orange, zones: { browser: { label: 'Browser · visible, not interactive' } } },
    { from: 'server', to: 'react', label: 'JS bundle', color: C.yellow, say: 'The JS bundle downloads and runs.' },
    { from: 'react', to: 'browser', label: 'hydrateRoot()', color: C.cyan, say: 'React renders in memory, walks the existing DOM, and attaches listeners instead of rebuilding.', zones: { browser: { label: 'Browser · interactive ✓' } } },
    { from: 'react', to: 'browser', label: "⚠ '10:01' ≠ '10:00'", color: C.red, say: 'Mismatch! The client rendered different output (Date, Math.random, window checks). React warns and patches.', zones: { browser: { color: C.red } } },
    { say: 'Fix: render client-only values in useEffect after hydration, keep render output deterministic.', tone: C.green, zones: { browser: { color: C.green } } },
  ],
});

// ── Rules of hooks ─────────────────────────────────────────────────────
const slotX = [210, 330, 450];
const hooksRules = {
  title: 'Hooks are matched by call order',
  accent: C.red,
  h: 290,
  code: `const [name] = useState('Ana');           // slot 0
if (loggedIn) { const [age] = useState(30); } // slot 1 ❌ conditional
useEffect(() => { … });                     // slot 2`,
  zones: {
    slots: { x: 150, y: 12, w: 360, h: 80, label: 'React’s hook list for this component', color: C.purple },
    r1: { x: 12, y: 120, w: 616, h: 70, label: 'Render 1 · loggedIn = true', color: C.blue },
    r2: { x: 12, y: 208, w: 616, h: 70, label: 'Render 2 · loggedIn = false', color: C.orange },
  },
  actors: {
    s0: { label: "[0] 'Ana'", color: C.purple, w: 108 },
    s1: { label: '[1] 30', color: C.purple, w: 108 },
    s2: { label: '[2] effect', color: C.purple, w: 108 },
    a0: { label: 'useState', color: C.blue, w: 108 },
    a1: { label: 'useState', color: C.blue, w: 108 },
    a2: { label: 'useEffect', color: C.blue, w: 108 },
    b0: { label: 'useState', color: C.orange, w: 108 },
    b2: { label: 'useEffect', color: C.orange, w: 108 },
  },
  steps: [
    { say: 'React stores hook state in a list. No names, just positions.', zones: { slots: { hi: true } } },
    { say: 'Render 1: three hook calls fill slots 0, 1, 2 in order.', tone: C.blue, line: [1, 2, 3], set: { a0: { x: slotX[0], y: 160 }, a1: { x: slotX[1], y: 160 }, a2: { x: slotX[2], y: 160 }, s0: { x: slotX[0], y: 62 }, s1: { x: slotX[1], y: 62 }, s2: { x: slotX[2], y: 62 } }, zones: { r1: { hi: true } } },
    { say: 'Render 2: loggedIn is false, so the useState inside the if is SKIPPED.', tone: C.orange, line: 2, set: { b0: { x: slotX[0], y: 248 } }, zones: { r2: { hi: true } } },
    { say: 'useEffect is now the 2nd call, so React hands it slot 1, which holds state 30. Everything after is shifted. 💥', tone: C.red, line: 3, set: { b2: { x: slotX[1], y: 248, color: C.red, shake: true }, s1: { glow: true, color: C.red } }, arrows: [['b2', 's1', { color: C.red, label: 'wrong slot' }]] },
    { say: 'Rule: call hooks at the top level, unconditionally, in the same order every render. Put the condition INSIDE the hook.', tone: C.green, set: { b2: { color: C.green, x: slotX[2] }, s1: { color: C.purple } }, zones: { r2: { label: 'Render 2 · fixed: same order ✓', color: C.green } } },
  ],
};

// ── Memoization (generic) ──────────────────────────────────────────────
const memoization = sequence({
  title: 'Memoize: compute once, then read from cache',
  accent: C.yellow,
  lanes: [
    { id: 'caller', label: 'Caller', color: C.blue },
    { id: 'cache', label: 'Cache (Map)', color: C.yellow },
    { id: 'fn', label: 'slowFib(n)', color: C.red },
  ],
  msgs: [
    { from: 'caller', to: 'cache', label: 'fib(40)?', say: 'First call: check the cache for key 40.' },
    { from: 'cache', to: 'fn', label: 'miss → compute', color: C.red, say: 'Miss. Run the expensive function (~1s).' },
    { from: 'fn', to: 'cache', label: 'store 40 → 102334155', color: C.yellow, w: 180, say: 'Store the result under its arguments.', zones: { cache: { label: 'Cache · {40}' } } },
    { from: 'cache', to: 'caller', label: '102334155 (1s)', color: C.orange, say: 'Return it, slowly this time.' },
    { from: 'caller', to: 'cache', label: 'fib(40)?', say: 'Same arguments again…' },
    { from: 'cache', to: 'caller', label: '⚡ hit (0ms)', color: C.green, say: '…cache hit, instant. Works only for pure functions. Same idea as useMemo and React.memo.' },
  ],
});

export default {
  'render-cycle': renderCycle,
  'context-perf': contextPerf,
  'custom-hooks': customHooks,
  'state-management': stateManagement,
  'hoc-pattern': hoc,
  'render-props': renderProps,
  'compound-components': compound,
  'controlled-uncontrolled': controlled,
  'error-boundaries': errorBoundaries,
  'portals-pattern': portals,
  'suspense-pattern': suspense,
  'forward-ref': forwardRef,
  'memo-patterns': memoPatterns,
  'rerender-causes': rerenderCauses,
  'state-batching': batching,
  virtualization,
  'concurrent-features': concurrent,
  'hydration-issues': hydration,
  'ri-hooks-rules': hooksRules,
  memoization,
};
