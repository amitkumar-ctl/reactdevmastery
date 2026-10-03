import { C } from '../engine/helpers';

// Prototype chain laid out left → right
const chainZones = {
  obj: { x: 12, y: 40, w: 128, h: 120, label: 'rex', color: C.blue, text: "name: 'Rex'" },
  dogP: { x: 158, y: 40, w: 128, h: 120, label: 'Dog.prototype', color: C.cyan, text: 'bark()' },
  animP: { x: 304, y: 40, w: 128, h: 120, label: 'Animal.prototype', color: C.purple, text: 'speak()\neat()' },
  objP: { x: 450, y: 40, w: 128, h: 120, label: 'Object.prototype', color: C.gray, text: 'toString()\nhasOwnProperty()' },
  nul: { x: 590, y: 78, w: 42, h: 44, color: C.red, text: 'null', round: 22 },
};
const chainEdges = [['obj', 'dogP'], ['dogP', 'animP'], ['animP', 'objP'], ['objP', 'nul']];
const lk = (label, color = C.yellow) => ({ label, color, w: 120, shape: 'pill' });
const at = (zone, dy = 0) => ({ x: chainZones[zone].x + chainZones[zone].w / 2, y: 200 + dy });

const protoChain = {
  title: 'Property lookup walks the prototype chain',
  accent: C.purple,
  h: 250,
  zones: chainZones,
  edges: chainEdges,
  actors: { q: lk('rex.speak') },
  steps: [
    { say: 'Every object has a hidden [[Prototype]] link. Together they form a chain ending in null.', zones: { obj: { hi: true } } },
    { say: 'rex.speak(): first, look at rex’s OWN properties. Not there.', set: { q: { ...at('obj'), glow: true } }, zones: { obj: { hi: true, color: C.red } } },
    { say: 'Follow __proto__ to Dog.prototype. Not there either.', set: { q: at('dogP') }, zones: { obj: { color: C.blue }, dogP: { hi: true, color: C.red } } },
    { say: 'Next link: Animal.prototype has speak(). Found! It is called with this = rex.', tone: C.green, set: { q: { ...at('animP'), glow: true, color: C.green } }, zones: { dogP: { color: C.cyan }, animP: { hi: true, color: C.green } } },
    { say: 'rex.toString() is found all the way up on Object.prototype.', tone: C.gray, set: { q: { ...at('objP'), label: 'rex.toString', color: C.gray } }, zones: { animP: { color: C.purple }, objP: { hi: true } } },
    { say: 'rex.fly reaches null, so the result is undefined (not an error).', tone: C.red, set: { q: { x: 595, y: 200, label: 'rex.fly', color: C.red, w: 70, shake: true } }, zones: { nul: { hi: true } } },
    { say: 'Writes never walk the chain: rex.speak = … creates an OWN property that shadows the prototype’s.', tone: C.blue, set: { q: { ...at('obj'), label: 'rex.speak = ƒ', color: C.blue, w: 120 } }, zones: { obj: { hi: true, text: "name: 'Rex'\nspeak: ƒ (own)" } } },
  ],
};

// ── instanceof ─────────────────────────────────────────────────────────
const instanceOf = {
  title: 'instanceof walks the chain looking for X.prototype',
  accent: C.cyan,
  h: 250,
  zones: chainZones,
  edges: chainEdges,
  actors: { q: lk('rex instanceof Animal', C.yellow) },
  steps: [
    { say: 'rex instanceof Animal asks: is Animal.prototype anywhere in rex’s chain?', set: { q: { ...at('obj'), x: 100, w: 170, glow: true } }, zones: { obj: { hi: true } } },
    { say: 'rex.__proto__ is Dog.prototype. Not equal, keep walking.', set: { q: at('dogP') }, zones: { dogP: { hi: true } } },
    { say: 'Next is Animal.prototype. Match → true.', tone: C.green, set: { q: { ...at('animP'), color: C.green, label: 'true ✓', glow: true } }, zones: { animP: { hi: true, color: C.green } } },
    { say: 'rex instanceof Cat: walk Dog → Animal → Object → null without finding Cat.prototype.', tone: C.red, set: { q: { x: 595, y: 200, label: 'false', color: C.red, w: 70, shake: true } }, zones: { animP: { color: C.purple }, nul: { hi: true } } },
    { say: 'Gotcha: it checks prototypes, not types. It breaks across iframes. Use Array.isArray for arrays.', tone: C.yellow, zones: { objP: { hi: true } } },
  ],
};

// ── new vs Object.create ───────────────────────────────────────────────
const protoCreate = {
  title: "What `new Person('Ana')` actually does",
  accent: C.orange,
  h: 270,
  code: `function Person(name) { this.name = name; }
Person.prototype.greet = function () { return 'Hi ' + this.name; };
const ana = new Person('Ana');`,
  zones: {
    proto: { x: 400, y: 20, w: 220, h: 90, label: 'Person.prototype', color: C.purple, text: 'greet()' },
    fn: { x: 400, y: 150, w: 220, h: 90, label: 'Person (constructor)', color: C.blue, text: 'this.name = name', dim: true },
    obj: { x: 40, y: 80, w: 220, h: 110, label: 'new object', color: C.orange, text: '{ }', show: false },
    v: { x: 40, y: 214, w: 220, h: 44, color: C.green, text: 'const ana = ●', show: false },
  },
  actors: {},
  steps: [
    { say: '1. A brand-new empty object is created.', line: 3, zones: { obj: { show: true, hi: true } } },
    { say: '2. Its [[Prototype]] is linked to Person.prototype. Object.create(proto) does only steps 1 and 2.', tone: C.purple, line: 3, zones: { obj: { hi: true } }, arrows: [['obj', 'proto', { label: '__proto__', color: C.purple }]] },
    { say: '3. Person runs with this bound to the new object.', tone: C.blue, line: 1, zones: { fn: { hi: true, dim: false }, obj: { text: "{ name: 'Ana' }", hi: true } }, arrows: [['fn', 'obj', { label: 'this', color: C.blue }], ['obj', 'proto', { color: C.purple }]] },
    { say: '4. The object is returned automatically (unless the constructor returns another object).', tone: C.green, line: 3, zones: { v: { show: true, hi: true }, fn: { dim: true } }, arrows: [['v', 'obj', { color: C.green }], ['obj', 'proto', { color: C.purple }]] },
    { say: "ana.greet() isn’t on ana itself. It is found on the prototype, so it’s shared by every Person.", tone: C.purple, zones: { proto: { hi: true } }, arrows: [['obj', 'proto', { color: C.purple, label: 'greet() found' }]] },
  ],
};

// ── Inheritance vs composition ─────────────────────────────────────────
const protoInherit = {
  title: 'Inheritance locks you in, composition picks parts',
  accent: C.green,
  h: 300,
  zones: {
    bird: { x: 120, y: 14, w: 150, h: 48, color: C.purple, text: 'Bird · fly()' },
    duck: { x: 20, y: 100, w: 150, h: 48, color: C.blue, text: 'Duck extends Bird' },
    peng: { x: 220, y: 100, w: 150, h: 48, color: C.blue, text: 'Penguin extends Bird' },
    pool: { x: 400, y: 14, w: 228, h: 134, label: 'Behaviours', color: C.green, layout: 'grid' },
    duck2: { x: 20, y: 178, w: 290, h: 110, label: 'duck = {…canFly, …canSwim, …canQuack}', color: C.green, layout: 'grid', show: false },
    peng2: { x: 330, y: 178, w: 298, h: 110, label: 'penguin = {…canSwim}', color: C.green, layout: 'grid', show: false },
  },
  edges: [['bird', 'duck'], ['bird', 'peng']],
  actors: {
    fly: { label: 'canFly', color: C.cyan, w: 96 },
    swim: { label: 'canSwim', color: C.blue, w: 96 },
    quack: { label: 'canQuack', color: C.yellow, w: 96 },
    swim2: { label: 'canSwim', color: C.blue, w: 96 },
  },
  steps: [
    { say: 'Classic inheritance: Duck and Penguin both extend Bird and inherit fly().', zones: { bird: { hi: true }, duck: { hi: true }, peng: { hi: true } } },
    { say: 'But penguins can’t fly. Now you must override or throw. The hierarchy fought you.', tone: C.red, zones: { peng: { hi: true, color: C.red, text: 'Penguin · fly() ✗ ?!' } } },
    { say: 'Composition: build small behaviours instead of a tree.', tone: C.green, set: { fly: { in: 'pool' }, swim: { in: 'pool' }, quack: { in: 'pool' }, swim2: { in: 'pool' } }, zones: { pool: { hi: true } } },
    { say: 'A duck is made from exactly the behaviours it needs…', tone: C.green, set: { fly: { in: 'duck2' }, swim: { in: 'duck2' }, quack: { in: 'duck2' } }, zones: { duck2: { show: true, hi: true } } },
    { say: '…and a penguin only swims. No awkward overrides. Prefer “has-a” over “is-a”.', tone: C.green, set: { swim2: { in: 'peng2' } }, zones: { peng2: { show: true, hi: true }, pool: { dim: true } } },
  ],
};

export default {
  'proto-chain': protoChain,
  'proto-instanceof': instanceOf,
  'proto-create': protoCreate,
  'proto-inherit': protoInherit,
};
