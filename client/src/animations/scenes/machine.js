import { C, sequence } from '../engine/helpers';

// ── Autocomplete ───────────────────────────────────────────────────────
const autocomplete = sequence({
  title: 'Autocomplete: debounce, cancel stale, render',
  accent: C.blue,
  chipW: 130,
  lanes: [
    { id: 'input', label: 'Input', color: C.blue },
    { id: 'deb', label: 'debounce 300ms', color: C.yellow },
    { id: 'api', label: 'API', color: C.gray },
    { id: 'list', label: 'Dropdown', color: C.green },
  ],
  msgs: [
    { from: 'input', to: 'deb', label: "'r' 're' 'rea'", color: C.blue, say: 'Fast keystrokes reset the debounce timer, so no request yet.' },
    { from: 'deb', to: 'api', label: "GET ?q=rea", color: C.yellow, say: 'Typing paused for 300ms → one request for "rea".' },
    { from: 'input', to: 'deb', label: "'reac'", color: C.blue, say: 'The user types again before it returns…' },
    { from: 'deb', to: 'api', label: 'abort · GET reac', color: C.red, say: '…so the in-flight request is aborted (AbortController) and a new one is sent. No stale results can land.' },
    { from: 'api', to: 'list', label: '5 results', color: C.green, say: 'Results render. Cache by query so backspacing is instant.' },
    { say: '↑/↓ move aria-activedescendant, Enter selects, Esc closes. Highlight the matched substring.', tone: C.purple, zones: { list: { hi: true, label: 'Dropdown · ▶ react' } } },
  ],
});

// ── Infinite scroll ────────────────────────────────────────────────────
const infItems = {};
for (let i = 0; i < 9; i++) infItems[`i${i}`] = { label: `Item ${i + 1}`, color: i < 4 ? C.blue : C.purple, w: 240, h: 26 };
const IY = (i, off = 0) => 66 + i * 32 - off;
const O = 64;
const infiniteScroll = {
  title: 'Infinite scroll with an IntersectionObserver sentinel',
  accent: C.purple,
  h: 290,
  zones: {
    vp: { x: 190, y: 34, w: 260, h: 150, label: 'viewport', color: C.cyan },
    status: { x: 470, y: 34, w: 158, h: 150, label: 'Status', color: C.gray, text: 'page 1 loaded' },
  },
  actors: {
    ...infItems,
    sent: { label: '👁 sentinel', color: C.yellow, w: 240, h: 22, shape: 'ghost' },
    load: { label: '⏳ loading page 2…', color: C.gray, w: 180, shape: 'text' },
  },
  steps: [
    { say: 'Render page 1 and put an empty sentinel div after the last item, just below the fold.', set: { i0: { x: 320, y: IY(0) }, i1: { x: 320, y: IY(1) }, i2: { x: 320, y: IY(2) }, i3: { x: 320, y: IY(3) }, sent: { x: 320, y: IY(4) } } },
    { say: 'An IntersectionObserver watches the sentinel. No scroll listeners, no layout thrashing.', tone: C.yellow, set: { sent: { glow: true } } },
    { say: 'The user scrolls. The sentinel enters the viewport → the callback fires → fetch page 2.', tone: C.purple, set: { i0: { y: IY(0, O), visible: false }, i1: { y: IY(1, O), visible: false }, i2: { y: IY(2, O) }, i3: { y: IY(3, O) }, sent: { y: IY(4, O), glow: true }, load: { x: 320, y: IY(5, O) + 4, visible: true } }, zones: { status: { text: 'sentinel visible →\nfetch page 2', hi: true }, vp: { hi: true } } },
    { say: 'New items are appended and the sentinel moves to the end again.', tone: C.green, set: { load: null, i4: { x: 320, y: IY(4, O) }, i5: { x: 320, y: IY(5, O) }, i6: { x: 320, y: IY(6, O) }, i7: { x: 320, y: IY(7, O) }, sent: { y: IY(8, O), glow: false } }, zones: { status: { text: 'page 2 loaded' } } },
    { say: 'Guard against double-fetching while loading, stop when hasMore is false, and virtualize very long lists.', tone: C.orange, zones: { status: { text: 'if (loading ||\n !hasMore) return', hi: true } } },
  ],
};

// ── useFetch state machine ─────────────────────────────────────────────
const useFetch = {
  title: 'useFetch as a state machine',
  accent: C.cyan,
  h: 280,
  code: `useEffect(() => {
  const ctrl = new AbortController();
  setState({ status: 'loading' });
  fetch(url, { signal: ctrl.signal }).then(r => r.json())
    .then(data => setState({ status: 'success', data }))
    .catch(err => err.name !== 'AbortError' && setState({ status: 'error', err }));
  return () => ctrl.abort();
}, [url]);`,
  zones: {
    idle: { x: 12, y: 100, w: 120, h: 70, color: C.gray, text: 'idle' },
    loading: { x: 200, y: 100, w: 140, h: 70, color: C.yellow, text: 'loading' },
    success: { x: 420, y: 20, w: 140, h: 70, color: C.green, text: 'success\n{ data }' },
    error: { x: 420, y: 180, w: 140, h: 70, color: C.red, text: 'error\n{ err }' },
    aborted: { x: 200, y: 210, w: 140, h: 56, color: C.gray, text: 'aborted', dashed: true },
  },
  edges: [['idle', 'loading'], ['loading', 'success'], ['loading', 'error'], ['loading', 'aborted']],
  actors: {},
  steps: [
    { say: 'Model it as explicit states, not three loose booleans that can contradict each other.', zones: { idle: { hi: true } } },
    { say: 'url set → loading. An AbortController is created with the request.', tone: C.yellow, line: [2, 3, 4], zones: { loading: { hi: true } }, arrows: [['idle', 'loading', { color: C.yellow }]] },
    { say: 'Response OK → success with data.', tone: C.green, line: 5, zones: { success: { hi: true } }, arrows: [['loading', 'success', { color: C.green }]] },
    { say: 'Network or HTTP error → error state, ready for a retry button.', tone: C.red, line: 6, zones: { error: { hi: true } }, arrows: [['loading', 'error', { color: C.red }]] },
    { say: 'url changes or the component unmounts mid-request → cleanup aborts it. No setState on stale or unmounted components.', tone: C.gray, line: 7, zones: { aborted: { hi: true } }, arrows: [['loading', 'aborted', { color: C.gray }]] },
  ],
};

// ── Toast system ───────────────────────────────────────────────────────
const toast = {
  title: 'Toasts: a queue, a portal, and timers',
  accent: C.green,
  h: 280,
  zones: {
    app: { x: 12, y: 12, w: 340, h: 256, label: 'App · toast.success(…)', color: C.blue, layout: 'col' },
    stack: { x: 370, y: 12, w: 258, h: 256, label: 'Portal · top-right (max 3)', color: C.green, layout: 'col' },
  },
  actors: {
    t1: { label: '✓ Saved', color: C.green, w: 220 },
    t2: { label: '⚠ Low storage', color: C.yellow, w: 220 },
    t3: { label: '✗ Upload failed', color: C.red, w: 220 },
    t4: { label: '✓ Copied link', color: C.green, w: 220 },
    timer: { label: '⏱ 3s', color: C.gray, w: 60, shape: 'text' },
  },
  steps: [
    { say: 'Any component calls toast(). It pushes { id, msg, type } into a global store (context or Zustand).', set: { t1: { in: 'stack', from: 'app', glow: true } }, zones: { stack: { hi: true } } },
    { say: 'A Toaster rendered in a portal maps the queue to UI.', tone: C.yellow, set: { t2: { in: 'stack', from: 'app' } } },
    { say: 'Each toast starts its own auto-dismiss timer (paused on hover).', tone: C.red, set: { t3: { in: 'stack', from: 'app' }, timer: { x: 600, y: 52, visible: true } } },
    { say: 'Timer ends → the oldest is removed and the others slide up.', tone: C.gray, set: { t1: null, timer: null } },
    { say: 'Over the limit? New ones wait in the queue. Use role="status" / aria-live so screen readers announce them.', tone: C.green, set: { t4: { in: 'stack', from: 'app', glow: true } } },
  ],
};

// ── Kanban ─────────────────────────────────────────────────────────────
const kanban = {
  title: 'Kanban: drag = move an id between column arrays',
  accent: C.orange,
  h: 280,
  zones: {
    todo: { x: 12, y: 12, w: 196, h: 256, label: 'To do', color: C.gray, layout: 'col' },
    doing: { x: 222, y: 12, w: 196, h: 256, label: 'In progress', color: C.yellow, layout: 'col' },
    done: { x: 432, y: 12, w: 196, h: 256, label: 'Done', color: C.green, layout: 'col' },
  },
  actors: {
    a: { label: 'Design login', color: C.blue, w: 170 },
    b: { label: 'API client', color: C.blue, w: 170 },
    c: { label: 'Write tests', color: C.blue, w: 170 },
  },
  steps: [
    { say: 'State: { columns: { todo: [a, b, c], doing: [], done: [] } }. Cards are just ids.', set: { a: { in: 'todo' }, b: { in: 'todo' }, c: { in: 'todo' } } },
    { say: 'onDragStart stores the card id. The drop target highlights on dragover.', tone: C.yellow, set: { a: { glow: true } }, zones: { doing: { hi: true, dashed: true } } },
    { say: 'onDrop: remove the id from the source array, insert it in the target. One immutable state update.', tone: C.orange, set: { a: { in: 'doing' } }, zones: { doing: { dashed: false } } },
    { say: 'Same logic for the next move.', tone: C.green, set: { a: { in: 'done', glow: true }, b: { in: 'doing' } }, zones: { done: { hi: true } } },
    { say: 'Persist optimistically, support keyboard moves for a11y, and use a library like dnd-kit for touch.', tone: C.purple },
  ],
};

// ── Multi-step form ────────────────────────────────────────────────────
const multistep = {
  title: 'Multi-step form: validate per step, keep one state',
  accent: C.purple,
  h: 270,
  zones: {
    s1: { x: 12, y: 12, w: 190, h: 50, color: C.purple, text: '1 · Account' },
    s2: { x: 225, y: 12, w: 190, h: 50, color: C.gray, text: '2 · Address' },
    s3: { x: 438, y: 12, w: 190, h: 50, color: C.gray, text: '3 · Review' },
    form: { x: 12, y: 80, w: 300, h: 178, label: 'Current step', color: C.blue, text: 'email · password' },
    data: { x: 328, y: 80, w: 300, h: 178, label: 'formData (single object)', color: C.green, layout: 'col' },
  },
  edges: [['s1', 's2'], ['s2', 's3']],
  actors: {
    d1: { label: 'email ✓  password ✓', color: C.purple, w: 240 },
    d2: { label: 'city ✓  pin ✓', color: C.cyan, w: 240 },
    err: { label: '✗ PIN must be 6 digits', color: C.red, w: 200 },
  },
  steps: [
    { say: 'Step 1 fields are validated before Next is allowed.', zones: { s1: { hi: true }, form: { hi: true } } },
    { say: 'Valid → merge into one formData object and advance.', tone: C.green, set: { d1: { in: 'data', from: 'form', glow: true } }, zones: { s1: { color: C.green }, s2: { color: C.purple, hi: true }, form: { text: 'city · pin' } } },
    { say: 'Invalid input blocks progress with an inline error.', tone: C.red, set: { err: { x: 162, y: 225, shake: true } }, zones: { form: { color: C.red } } },
    { say: 'Fixed → merged, and Back keeps everything already entered.', tone: C.green, set: { err: null, d2: { in: 'data', from: 'form', glow: true } }, zones: { form: { color: C.blue, text: 'review & submit' }, s2: { color: C.green }, s3: { color: C.purple, hi: true } } },
    { say: 'Submit once at the end. Store the step in the URL (?step=3) and draft in sessionStorage for refresh safety.', tone: C.purple, zones: { data: { hi: true } } },
  ],
};

// ── RBAC ───────────────────────────────────────────────────────────────
const rbac = {
  title: 'RBAC: roles → permissions → what the UI renders',
  accent: C.red,
  h: 280,
  zones: {
    role: { x: 12, y: 12, w: 170, h: 256, label: 'User role', color: C.blue, layout: 'center' },
    perms: { x: 200, y: 12, w: 200, h: 256, label: 'permissions', color: C.purple, text: '' },
    ui: { x: 418, y: 12, w: 210, h: 256, label: '<Can perform=…>', color: C.green, layout: 'col' },
  },
  actors: {
    who: { label: '👤 viewer', color: C.gray, w: 130 },
    view: { label: 'View reports', color: C.green, w: 170 },
    edit: { label: 'Edit report', color: C.gray, w: 170 },
    del: { label: 'Delete user', color: C.gray, w: 170 },
  },
  steps: [
    { say: 'A map defines what each role may do: viewer → [read].', set: { who: { in: 'role' }, view: { in: 'ui' }, edit: { in: 'ui', dim: true }, del: { in: 'ui', dim: true } }, zones: { perms: { text: 'viewer: read', hi: true } } },
    { say: 'A <Can> guard (or usePermission hook) hides or disables what the role can’t do.', tone: C.green, zones: { ui: { hi: true } }, arrows: [['perms', 'ui']] },
    { say: 'Switch to editor → [read, write]. Edit unlocks.', tone: C.yellow, set: { who: { label: '✏ editor', color: C.yellow, glow: true }, edit: { dim: false, color: C.green } }, zones: { perms: { text: 'editor: read, write', hi: true } } },
    { say: 'Admin → everything.', tone: C.red, set: { who: { label: '👑 admin', color: C.red }, del: { dim: false, color: C.green } }, zones: { perms: { text: 'admin: read, write, delete', hi: true } } },
    { say: 'The UI check is UX only. The server must enforce the same permissions on every request.', tone: C.orange, zones: { perms: { color: C.orange } } },
  ],
};

export default {
  'mc-autocomplete': autocomplete,
  'mc-infinite-scroll': infiniteScroll,
  'mc-usefetch': useFetch,
  'mc-toast': toast,
  'mc-kanban': kanban,
  'mc-multistep-form': multistep,
  'mc-rbac': rbac,
};
