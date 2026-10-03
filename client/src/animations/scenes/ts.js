import { C } from '../engine/helpers';

// ── Narrowing ──────────────────────────────────────────────────────────
const guards = {
  title: 'Type guards narrow a union, branch by branch',
  accent: C.blue,
  h: 270,
  code: `function format(x: string | number | Date) {
  if (typeof x === 'string') return x.toUpperCase();
  if (typeof x === 'number') return x.toFixed(2);
  return x.toISOString();          // only Date is left
}`,
  zones: {
    union: { x: 12, y: 12, w: 616, h: 74, label: 'type of x', color: C.gray, layout: 'row' },
    b1: { x: 12, y: 104, w: 196, h: 150, label: "typeof x === 'string'", color: C.green, layout: 'center' },
    b2: { x: 222, y: 104, w: 196, h: 150, label: "typeof x === 'number'", color: C.yellow, layout: 'center' },
    b3: { x: 432, y: 104, w: 196, h: 150, label: 'remaining', color: C.purple, layout: 'center' },
  },
  actors: {
    s: { label: 'string', color: C.green, w: 110 },
    n: { label: 'number', color: C.yellow, w: 110 },
    d: { label: 'Date', color: C.purple, w: 110 },
  },
  steps: [
    { say: 'x could be any of three types. You can only use members they all share.', line: 1, set: { s: { in: 'union' }, n: { in: 'union' }, d: { in: 'union' } }, zones: { union: { hi: true } } },
    { say: 'Inside the typeof check, TypeScript knows x is string, so .toUpperCase() is allowed.', tone: C.green, line: 2, set: { s: { in: 'b1', glow: true } }, zones: { b1: { hi: true } } },
    { say: 'After that return, string is eliminated. Next check narrows to number.', tone: C.yellow, line: 3, set: { n: { in: 'b2', glow: true } }, zones: { b2: { hi: true } } },
    { say: 'Only Date is left. Control-flow analysis narrows without any check.', tone: C.purple, line: 4, set: { d: { in: 'b3', glow: true } }, zones: { b3: { hi: true } } },
    { say: 'Other guards: instanceof, "key" in obj, discriminant fields (kind === "circle"), and custom `x is Foo` predicates.', tone: C.blue, zones: { union: { label: 'type of x · fully narrowed' } } },
  ],
};

// ── Generics ───────────────────────────────────────────────────────────
const generics = {
  title: 'Generics: the type flows in and back out',
  accent: C.purple,
  h: 250,
  code: `function first<T>(items: T[]): T | undefined { return items[0]; }
const a = first([1, 2, 3]);       // T = number
const b = first(['x', 'y']);      // T = string`,
  zones: {
    call: { x: 12, y: 60, w: 170, h: 130, label: 'Call site', color: C.blue, layout: 'col' },
    fn: { x: 230, y: 40, w: 180, h: 170, label: 'first<T>', color: C.purple, text: 'T = ?', big: true },
    out: { x: 458, y: 60, w: 170, h: 130, label: 'Return type', color: C.green, layout: 'col' },
  },
  actors: {
    in1: { label: 'number[]', color: C.yellow, w: 110 },
    o1: { label: 'number | undefined', color: C.yellow, w: 150 },
    in2: { label: 'string[]', color: C.cyan, w: 110 },
    o2: { label: 'string | undefined', color: C.cyan, w: 150 },
  },
  steps: [
    { say: 'T is a type parameter: a placeholder filled in at each call.', line: 1, zones: { fn: { hi: true } } },
    { say: 'Pass number[] → TypeScript infers T = number.', tone: C.yellow, line: 2, set: { in1: { in: 'call', glow: true } }, zones: { fn: { text: 'T = number', hi: true, color: C.yellow } }, arrows: [['call', 'fn', { color: C.yellow }]] },
    { say: 'The return type follows: number | undefined. Not any. Full type safety.', tone: C.yellow, line: 2, set: { o1: { in: 'out', from: 'fn', glow: true } }, arrows: [['fn', 'out', { color: C.yellow }]] },
    { say: 'Same function, string[] → T = string.', tone: C.cyan, line: 3, set: { in2: { in: 'call', glow: true }, o2: { in: 'out', from: 'fn' } }, zones: { fn: { text: 'T = string', color: C.cyan, hi: true } }, arrows: [['call', 'fn', { color: C.cyan }], ['fn', 'out', { color: C.cyan }]] },
    { say: 'Constrain with extends: <T extends { id: string }> lets you use item.id safely. useState<T> works the same way.', tone: C.purple, zones: { fn: { text: 'T extends …', color: C.purple } } },
  ],
};

export default {
  'ts-guards': guards,
  'ts-generics': generics,
};
