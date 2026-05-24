import React, { useState, useEffect, useRef } from 'react';

// ─────────────────────────────────────────────────────────────────────
// SHARED STYLES
// ─────────────────────────────────────────────────────────────────────
const viz = {
  wrap: { background: '#0a0e1a', border: '1px solid #1e2d40', borderRadius: 10, padding: 18, marginBottom: 16, fontFamily: 'Fira Code, monospace' },
  title: { fontSize: 13, fontWeight: 700, color: '#e2e8f0', marginBottom: 14, letterSpacing: 0.5 },
  code: { background: '#060910', border: '1px solid #1e2d40', borderRadius: 8, padding: 14, fontSize: 12, color: '#e2e8f0', whiteSpace: 'pre', overflowX: 'auto', lineHeight: 1.7, marginBottom: 12 },
  col: { background: '#111827', border: '1px solid #1e2d40', borderRadius: 8, padding: 12, transition: 'all 0.3s' },
  colLabel: { fontSize: 10, fontWeight: 700, letterSpacing: 1.5, textTransform: 'uppercase', marginBottom: 10 },
  item: { padding: '4px 10px', borderRadius: 6, fontSize: 11, border: '1px solid', textAlign: 'center' },
  output: { background: '#060910', border: '1px solid #1e2d40', borderRadius: 8, padding: '8px 12px', fontSize: 13, marginBottom: 10, display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: 4 },
  desc: { background: '#0d1829', border: '1px solid #1e2d40', borderRadius: 8, padding: '10px 14px', fontSize: 13, color: '#e2e8f0', lineHeight: 1.6 },
  btn: { padding: '6px 14px', borderRadius: 6, fontSize: 11, fontFamily: 'Fira Code, monospace', cursor: 'pointer', border: '1px solid #2a3f5f', background: 'transparent', color: '#9ca3af', fontWeight: 600, transition: 'all 0.15s' },
  btnPrimary: { background: 'linear-gradient(135deg, #00c853, #00897b)', color: '#001a0a', border: 'none' },
  btnDanger: { background: 'linear-gradient(135deg, #c62828, #b71c1c)', color: '#fff', border: 'none' },
  scopeBox: { background: '#060910', border: '1px dashed #2a3f5f', borderRadius: 8, padding: 12 },
  tag: (color) => ({ fontSize: 10, padding: '3px 10px', borderRadius: 12, fontWeight: 600, border: `1px solid ${color}40`, color, background: color + '15' }),
  inputStyle: { width: '100%', background: '#0d1829', border: '1px solid #2a3f5f', borderRadius: 8, padding: '10px 14px', color: '#e2e8f0', fontSize: 13, outline: 'none', fontFamily: 'Fira Code, monospace' },
  panel: { background: '#111827', border: '1px solid #1e2d40', borderRadius: 8, padding: 14, marginBottom: 10 },
};

const Row = ({ children, gap = 8, wrap = true, style = {} }) => (
  <div style={{ display: 'flex', gap, flexWrap: wrap ? 'wrap' : 'nowrap', alignItems: 'center', ...style }}>{children}</div>
);

const Tag = ({ color, children }) => <span style={viz.tag(color)}>{children}</span>;

const NavBtns = ({ step, total, onPrev, onNext, onReset, onPlay, playing }) => (
  <Row style={{ marginTop: 12 }}>
    <button style={viz.btn} onClick={onReset}>↺ Reset</button>
    <button style={viz.btn} onClick={onPrev} disabled={step === 0}>← Prev</button>
    <button style={viz.btn} onClick={onNext} disabled={step === total - 1}>Next →</button>
    {onPlay && (
      <button style={{ ...viz.btn, ...viz.btnPrimary, marginLeft: 'auto' }} onClick={onPlay} disabled={playing}>
        {playing ? '⏳ Playing...' : '▶ Auto Play'}
      </button>
    )}
    <span style={{ color: '#9ca3af', fontSize: 11, marginLeft: 'auto' }}>{step + 1}/{total}</span>
  </Row>
);

// ─────────────────────────────────────────────────────────────────────
// 1. EVENT LOOP
// ─────────────────────────────────────────────────────────────────────
export const EventLoopVisualizer = () => {
  const [step, setStep] = useState(0);
  const [playing, setPlaying] = useState(false);
  const ref = useRef(null);

  const steps = [
    { callStack: ['console.log("1")'], micro: [], macro: [], web: [], output: ['1'], hi: 'call', desc: 'Sync code: console.log("1") executes immediately on the Call Stack' },
    { callStack: ['setTimeout(cb, 0)'], micro: [], macro: [], web: ['setTimeout (0ms)'], output: ['1'], hi: 'web', desc: 'setTimeout hands its callback to the Web API — it\'s async, leaves stack' },
    { callStack: ['Promise.resolve().then(cb)'], micro: ['Promise cb'], macro: [], web: [], output: ['1'], hi: 'micro', desc: 'Promise.then callback goes to Microtask Queue — higher priority than setTimeout' },
    { callStack: ['console.log("4")'], micro: ['Promise cb'], macro: ['setTimeout cb'], web: [], output: ['1', '4'], hi: 'call', desc: 'console.log("4") runs synchronously. Timer fires → setTimeout cb moves to Macrotask' },
    { callStack: ['→ Promise cb'], micro: [], macro: ['setTimeout cb'], web: [], output: ['1', '4', '3'], hi: 'micro', desc: '⚡ Call stack empty! Drain ALL microtasks first → Promise cb runs → prints "3"' },
    { callStack: ['→ setTimeout cb'], micro: [], macro: [], web: [], output: ['1', '4', '3', '2'], hi: 'macro', desc: '✅ Microtasks done. Now macrotask runs → setTimeout cb → prints "2"' },
  ];

  const colors = { call: '#4facfe', micro: '#00ff88', macro: '#f97316', web: '#a855f7' };
  const cur = steps[step];

  useEffect(() => {
    if (playing) {
      ref.current = setInterval(() => {
        setStep(s => { if (s >= steps.length - 1) { setPlaying(false); return s; } return s + 1; });
      }, 1200);
    }
    return () => clearInterval(ref.current);
  }, [playing]);

  return (
    <div style={viz.wrap}>
      <div style={viz.title}>⚡ Event Loop — Interactive Walkthrough</div>
      <div style={viz.code}>{`console.log('1');
setTimeout(() => console.log('2'), 0);
Promise.resolve().then(() => console.log('3'));
console.log('4');`}</div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: 10, marginBottom: 12 }}>
        {[
          { label: 'Call Stack', key: 'call', items: cur.callStack },
          { label: 'Web APIs', key: 'web', items: cur.web },
          { label: '⚡ Microtask', key: 'micro', items: cur.micro },
          { label: '⏱ Macrotask', key: 'macro', items: cur.macro },
        ].map(col => (
          <div key={col.key} style={{ ...viz.col, borderColor: cur.hi === col.key ? colors[col.key] : '#1e2d40', boxShadow: cur.hi === col.key ? `0 0 14px ${colors[col.key]}40` : 'none' }}>
            <div style={{ ...viz.colLabel, color: colors[col.key] }}>{col.label}</div>
            <div style={{ minHeight: 50 }}>
              {col.items.map((item, i) => (
                <div key={i} style={{ ...viz.item, background: colors[col.key] + '20', borderColor: colors[col.key], marginBottom: 4 }}>{item}</div>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div style={viz.output}>
        <span style={{ color: '#9ca3af', marginRight: 6 }}>Output:</span>
        {cur.output.map((o, i) => <span key={i} style={{ color: '#00ff88', fontWeight: 700, marginRight: 4 }}>"{o}"</span>)}
      </div>
      <div style={{ ...viz.desc, borderColor: colors[cur.hi] + '40', color: colors[cur.hi] }}>{cur.desc}</div>
      <NavBtns step={step} total={steps.length} onPrev={() => setStep(s => Math.max(0, s - 1))} onNext={() => setStep(s => Math.min(steps.length - 1, s + 1))} onReset={() => { setStep(0); setPlaying(false); }} onPlay={() => { setStep(0); setPlaying(true); }} playing={playing} />
    </div>
  );
};

// ─────────────────────────────────────────────────────────────────────
// 2. HOISTING
// ─────────────────────────────────────────────────────────────────────
export const HoistingVisualizer = () => {
  const [phase, setPhase] = useState('written');

  const phases = {
    written: {
      label: '📝 Code As Written',
      lines: [
        { code: "console.log(x);", note: '', color: '#e2e8f0' },
        { code: "var x = 5;", note: '', color: '#e2e8f0' },
        { code: "greet();", note: '', color: '#e2e8f0' },
        { code: "function greet() {", note: '', color: '#e2e8f0' },
        { code: "  console.log('hello');", note: '', color: '#e2e8f0' },
        { code: "}", note: '', color: '#e2e8f0' },
        { code: "let y = 10;", note: '', color: '#e2e8f0' },
        { code: "console.log(y);", note: '', color: '#e2e8f0' },
      ],
    },
    hoisted: {
      label: '🔼 After Hoisting (what JS actually sees)',
      lines: [
        { code: "var x;               ", note: '← var hoisted, = undefined', color: '#eab308' },
        { code: "function greet() {   ", note: '← function fully hoisted', color: '#00ff88' },
        { code: "  console.log('hello');", note: '', color: '#00ff88' },
        { code: "}                    ", note: '', color: '#00ff88' },
        { code: "// TDZ starts ───────", note: '← let y exists but uninitialized', color: '#ef4444' },
        { code: "console.log(x);      ", note: '→ undefined (not error!)', color: '#eab308' },
        { code: "x = 5;               ", note: '', color: '#e2e8f0' },
        { code: "greet();             ", note: '→ "hello" ✓', color: '#00ff88' },
        { code: "y = 10;              ", note: '← TDZ ends here', color: '#ef4444' },
        { code: "console.log(y);      ", note: '→ 10 ✓', color: '#e2e8f0' },
      ],
    },
  };

  const cur = phases[phase];

  return (
    <div style={viz.wrap}>
      <div style={viz.title}>🔼 Hoisting & Temporal Dead Zone — Visualized</div>
      <Row style={{ marginBottom: 14 }}>
        {Object.entries(phases).map(([key, p]) => (
          <button key={key} style={{ ...viz.btn, borderColor: phase === key ? '#4facfe' : '#2a3f5f', color: phase === key ? '#4facfe' : '#9ca3af', background: phase === key ? '#4facfe15' : 'transparent' }} onClick={() => setPhase(key)}>{p.label}</button>
        ))}
      </Row>
      <div style={{ background: '#060910', border: '1px solid #1e2d40', borderRadius: 8, padding: 16 }}>
        {cur.lines.map((line, i) => (
          <div key={i} style={{ display: 'flex', gap: 12, padding: '3px 0', alignItems: 'center' }}>
            <span style={{ color: line.color, fontFamily: 'Fira Code, monospace', fontSize: 12, minWidth: 260 }}>{line.code}</span>
            {line.note && <span style={{ fontSize: 11, color: line.color === '#ef4444' ? '#ef4444' : line.color === '#eab308' ? '#eab308' : '#6b7280', fontStyle: 'italic' }}>{line.note}</span>}
          </div>
        ))}
      </div>
      <div style={{ marginTop: 14, display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 8 }}>
        {[
          { label: 'var', color: '#eab308', note: 'Hoisted + undefined', detail: 'Function scoped\nCan access before init\n(gets undefined)' },
          { label: 'let / const', color: '#ef4444', note: 'Hoisted + TDZ', detail: 'Block scoped\nCannot access before init\n(ReferenceError)' },
          { label: 'function', color: '#00ff88', note: 'Fully hoisted', detail: 'Entire body hoisted\nCan call before definition\n✓ Works perfectly' },
        ].map(item => (
          <div key={item.label} style={{ background: item.color + '10', border: `1px solid ${item.color}40`, borderRadius: 8, padding: 12 }}>
            <div style={{ color: item.color, fontWeight: 700, fontSize: 13, marginBottom: 4 }}>{item.label}</div>
            <div style={{ color: item.color, fontSize: 10, marginBottom: 6, opacity: 0.8 }}>{item.note}</div>
            <div style={{ color: '#9ca3af', fontSize: 11, whiteSpace: 'pre', lineHeight: 1.6 }}>{item.detail}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

// ─────────────────────────────────────────────────────────────────────
// 3. CLOSURES
// ─────────────────────────────────────────────────────────────────────
export const ClosureVisualizer = () => {
  const [count, setCount] = useState(0);
  const [history, setHistory] = useState([]);
  const counterRef = useRef(null);
  const [showPrivate, setShowPrivate] = useState(false);

  useEffect(() => {
    counterRef.current = (() => {
      let _count = 0;
      return { inc: () => ++_count, dec: () => --_count, get: () => _count };
    })();
  }, []);

  const act = (type) => {
    const val = type === 'inc' ? counterRef.current.inc() : counterRef.current.dec();
    setCount(val);
    setHistory(h => [...h.slice(-5), { type, val }]);
  };

  return (
    <div style={viz.wrap}>
      <div style={viz.title}>🔒 Closure — Live Scope Explorer</div>
      <div style={viz.code}>{`function createCounter() {
  let count = 0;          // ← private, lives in closure scope
  return {
    inc: () => ++count,   // ← these functions "close over" count
    dec: () => --count,
    get: () => count
  };
}
const counter = createCounter();`}</div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
        <div style={viz.col}>
          <div style={{ ...viz.colLabel, color: '#a855f7' }}>Closure Scope</div>
          <div style={viz.scopeBox}>
            <div style={{ fontSize: 10, color: '#9ca3af', marginBottom: 8 }}>createCounter() execution context</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <span style={{ color: '#4facfe', fontSize: 13 }}>let</span>
              <span style={{ color: '#e2e8f0', fontSize: 13 }}>count</span>
              <span style={{ color: '#9ca3af' }}>=</span>
              <span style={{ color: '#00ff88', fontSize: 24, fontWeight: 700, transition: 'all 0.3s', display: 'inline-block', transform: history.length ? 'scale(1.3)' : 'scale(1)' }}>{count}</span>
            </div>
            <div style={{ marginTop: 10, padding: '6px 10px', background: '#2a0a0a', borderRadius: 6, fontSize: 11 }}>
              <span style={{ color: '#ef4444' }}>counter.count</span>
              <span style={{ color: '#9ca3af' }}> → </span>
              <span style={{ color: '#ef4444' }}>{showPrivate ? count : 'undefined'} </span>
              <button style={{ ...viz.btn, padding: '2px 8px', fontSize: 10 }} onClick={() => setShowPrivate(!showPrivate)}>
                {showPrivate ? 'hide' : 'try access'}
              </button>
            </div>
          </div>
        </div>
        <div style={viz.col}>
          <div style={{ ...viz.colLabel, color: '#00ff88' }}>Returned API (public)</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <button style={{ padding: '10px', borderRadius: 8, border: '1px solid #00ff88', background: '#052210', color: '#00ff88', cursor: 'pointer', fontFamily: 'Fira Code, monospace', fontSize: 12, textAlign: 'left' }} onClick={() => act('inc')}>counter.inc() → ++count</button>
            <button style={{ padding: '10px', borderRadius: 8, border: '1px solid #ef4444', background: '#2a0a0a', color: '#ef4444', cursor: 'pointer', fontFamily: 'Fira Code, monospace', fontSize: 12, textAlign: 'left' }} onClick={() => act('dec')}>counter.dec() → --count</button>
          </div>
          <div style={{ marginTop: 12 }}>
            <div style={{ fontSize: 10, color: '#9ca3af', marginBottom: 6 }}>Call history:</div>
            <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap' }}>
              {history.length === 0 ? <span style={{ color: '#6b7280', fontSize: 11 }}>Click buttons above</span>
                : history.map((h, i) => <span key={i} style={{ ...viz.tag(h.type === 'inc' ? '#00ff88' : '#ef4444') }}>{h.type === 'inc' ? '+1' : '-1'}={h.val}</span>)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// ─────────────────────────────────────────────────────────────────────
// 4. THIS BINDING
// ─────────────────────────────────────────────────────────────────────
export const ThisVisualizer = () => {
  const [selected, setSelected] = useState('implicit');

  const bindings = {
    implicit: {
      label: '1. Implicit',
      color: '#4facfe',
      code: `const obj = {
  name: 'DevMastery',
  greet() {
    console.log(this.name); // 'DevMastery'
  }
};
obj.greet(); // obj is before the dot → this = obj`,
      result: 'this = obj → "DevMastery" ✓',
      rule: 'Object before the dot becomes this',
    },
    lost: {
      label: '⚠ Lost Binding',
      color: '#ef4444',
      code: `const obj = { name: 'Dev', greet() { console.log(this.name); } };

const fn = obj.greet; // detached from obj!
fn();                 // no dot → this = undefined

// Also lost in callbacks:
setTimeout(obj.greet, 0); // undefined ❌`,
      result: 'this = undefined → TypeError! ❌',
      rule: 'Storing a method loses its context',
    },
    explicit: {
      label: '2. Explicit',
      color: '#00ff88',
      code: `function greet(greeting) {
  console.log(\`\${greeting}, \${this.name}\`);
}
const user = { name: 'Alice' };

greet.call(user, 'Hello');    // invokes immediately
greet.apply(user, ['Hello']); // same but args as array
const bound = greet.bind(user);
bound('Hello');               // permanent binding`,
      result: 'this = user → "Hello, Alice" ✓',
      rule: 'call/apply/bind explicitly set this',
    },
    new: {
      label: '3. new',
      color: '#a855f7',
      code: `function Person(name) {
  // 'new' does this automatically:
  // 1. Creates {} empty object
  // 2. Sets this = that object  
  // 3. Runs the function body
  // 4. Returns this
  this.name = name;
}
const alice = new Person('Alice');
console.log(alice.name); // 'Alice'`,
      result: 'this = newly created object ✓',
      rule: 'new creates a fresh object and sets this to it',
    },
    arrow: {
      label: '4. Arrow (lexical)',
      color: '#eab308',
      code: `class Timer {
  constructor() { this.count = 0; }

  start() {
    // ❌ Regular function — loses this
    setInterval(function() {
      this.count++; // undefined!
    }, 1000);

    // ✅ Arrow — inherits this from start()
    setInterval(() => {
      this.count++; // Timer instance ✓
    }, 1000);
  }
}`,
      result: 'this = lexical outer scope (Timer instance) ✓',
      rule: 'Arrow functions have NO own this — they inherit it',
    },
  };

  const cur = bindings[selected];

  return (
    <div style={viz.wrap}>
      <div style={viz.title}>🎯 this Binding — All 4 Rules</div>
      <Row style={{ marginBottom: 14 }}>
        {Object.entries(bindings).map(([key, b]) => (
          <button key={key} style={{ ...viz.btn, borderColor: selected === key ? b.color : '#2a3f5f', color: selected === key ? b.color : '#9ca3af', background: selected === key ? b.color + '15' : 'transparent' }} onClick={() => setSelected(key)}>{b.label}</button>
        ))}
      </Row>
      <div style={viz.code}>{cur.code}</div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
        <div style={{ ...viz.desc, borderColor: cur.color + '40', color: cur.color }}><strong>Result:</strong> {cur.result}</div>
        <div style={{ ...viz.desc, borderColor: '#2a3f5f', color: '#9ca3af' }}>💡 Rule: {cur.rule}</div>
      </div>
    </div>
  );
};

// ─────────────────────────────────────────────────────────────────────
// 5. COERCION
// ─────────────────────────────────────────────────────────────────────
export const CoercionVisualizer = () => {
  const [left, setLeft] = useState('');
  const [right, setRight] = useState('');
  const [op, setOp] = useState('==');

  const examples = [
    { l: '0', r: 'false', op: '==' }, { l: '""', r: 'false', op: '==' }, { l: 'null', r: 'undefined', op: '==' },
    { l: '"5"', r: '5', op: '==' }, { l: '[]', r: '0', op: '==' }, { l: 'NaN', r: 'NaN', op: '===' },
  ];

  const evaluate = (l, r, operator) => {
    try {
      const result = eval(`${l} ${operator} ${r}`);
      return { result: String(result), color: result ? '#00ff88' : '#ef4444' };
    } catch { return { result: 'Error', color: '#ef4444' }; }
  };

  const custom = left && right ? evaluate(left, right, op) : null;

  return (
    <div style={viz.wrap}>
      <div style={viz.title}>🔀 Type Coercion — == vs === Explorer</div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8, marginBottom: 14 }}>
        {examples.map((ex, i) => {
          const eqEq = evaluate(ex.l, ex.r, '==');
          const eqEqEq = evaluate(ex.l, ex.r, '===');
          return (
            <div key={i} style={{ ...viz.col, cursor: 'pointer' }} onClick={() => { setLeft(ex.l); setRight(ex.r); setOp(ex.op); }}>
              <div style={{ fontFamily: 'Fira Code, monospace', fontSize: 12, color: '#e2e8f0', marginBottom: 8 }}>{ex.l} vs {ex.r}</div>
              <div style={{ display: 'flex', gap: 6 }}>
                <span style={{ ...viz.tag(eqEq.result === 'true' ? '#00ff88' : '#ef4444') }}>== {eqEq.result}</span>
                <span style={{ ...viz.tag(eqEqEq.result === 'true' ? '#00ff88' : '#ef4444') }}>=== {eqEqEq.result}</span>
              </div>
            </div>
          );
        })}
      </div>
      <div style={viz.panel}>
        <div style={{ fontSize: 11, color: '#9ca3af', marginBottom: 10 }}>🧪 Try your own comparison:</div>
        <Row gap={8}>
          <input style={{ ...viz.inputStyle, width: 100 }} placeholder="left" value={left} onChange={e => setLeft(e.target.value)} />
          <select style={{ ...viz.inputStyle, width: 80 }} value={op} onChange={e => setOp(e.target.value)}>
            <option>==</option><option>===</option><option>!=</option><option>!==</option>
          </select>
          <input style={{ ...viz.inputStyle, width: 100 }} placeholder="right" value={right} onChange={e => setRight(e.target.value)} />
          {custom && <span style={{ fontSize: 18, fontWeight: 700, color: custom.color }}>→ {custom.result}</span>}
        </Row>
      </div>
      <div style={viz.code}>{`// Abstract Equality (==) coercion rules:
null == undefined  // true  (special case)
0    == false      // true  (false → 0)
""   == false      // true  (both → 0)
"5"  == 5          // true  (string → number)
[]   == 0          // true  ([] → "" → 0)
NaN  == NaN        // false (NaN ≠ anything, even itself!)

// Always use === to avoid these surprises`}</div>
    </div>
  );
};

// ─────────────────────────────────────────────────────────────────────
// 6. PROMISES
// ─────────────────────────────────────────────────────────────────────
export const PromiseVisualizer = () => {
  const [step, setStep] = useState(0);
  const [mode, setMode] = useState('resolve');
  const [combinator, setCombinator] = useState(null);
  const [simulating, setSimulating] = useState(false);
  const [combResult, setCombResult] = useState(null);

  const flows = {
    resolve: [
      { state: 'PENDING', color: '#eab308', desc: 'new Promise(executor) — async work starts' },
      { state: 'PENDING', color: '#eab308', desc: 'Async operation in progress (fetch, timer...)' },
      { state: 'FULFILLED ✓', color: '#00ff88', desc: 'resolve() called → .then() callbacks queued as microtasks' },
      { state: 'FULFILLED ✓', color: '#00ff88', desc: '.then(value => ...) runs — can chain more .then()' },
    ],
    reject: [
      { state: 'PENDING', color: '#eab308', desc: 'new Promise(executor) — async work starts' },
      { state: 'PENDING', color: '#eab308', desc: 'Async operation in progress...' },
      { state: 'REJECTED ✗', color: '#ef4444', desc: 'reject() called → ALL .then() are SKIPPED' },
      { state: 'REJECTED ✗', color: '#ef4444', desc: '.catch(err => ...) runs — error handled here' },
    ],
  };

  const simulateCombinator = (type) => {
    setCombinator(type);
    setSimulating(true);
    setCombResult(null);
    const delays = { p1: 800, p2: 1400, p3: type === 'all' ? 600 : 2000 };
    const rejects = type === 'allSettled' ? false : type === 'any' ? true : false;

    setTimeout(() => {
      if (type === 'all') setCombResult({ status: 'fulfilled', value: '[result1, result2, result3]', color: '#00ff88' });
      else if (type === 'allSettled') setCombResult({ status: 'settled', value: '[{fulfilled}, {rejected}, {fulfilled}]', color: '#4facfe' });
      else if (type === 'race') setCombResult({ status: 'fulfilled', value: 'result1 (fastest)', color: '#00ff88' });
      else if (type === 'any') setCombResult({ status: 'fulfilled', value: 'result2 (first success)', color: '#00ff88' });
      setSimulating(false);
    }, 1600);
  };

  const cur = flows[mode][step];

  return (
    <div style={viz.wrap}>
      <div style={viz.title}>🔄 Promises — State Machine + Combinators</div>
      <Row style={{ marginBottom: 12 }}>
        {['resolve', 'reject'].map(m => (
          <button key={m} style={{ ...viz.btn, borderColor: m === mode ? (m === 'resolve' ? '#00ff88' : '#ef4444') : '#2a3f5f', color: m === mode ? (m === 'resolve' ? '#00ff88' : '#ef4444') : '#9ca3af' }} onClick={() => { setMode(m); setStep(0); }}>
            {m === 'resolve' ? '✅ Resolve path' : '❌ Reject path'}
          </button>
        ))}
      </Row>
      <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 14, flexWrap: 'wrap' }}>
        {flows[mode].map((s, i) => (
          <React.Fragment key={i}>
            <div onClick={() => setStep(i)} style={{ padding: '7px 12px', borderRadius: 8, fontSize: 11, fontWeight: 700, cursor: 'pointer', background: i <= step ? s.color + '20' : '#1a2332', border: `1px solid ${i <= step ? s.color : '#1e2d40'}`, color: i <= step ? s.color : '#6b7280', transition: 'all 0.3s' }}>{s.state}</div>
            {i < flows[mode].length - 1 && <span style={{ color: i < step ? '#9ca3af' : '#2a3f5f' }}>→</span>}
          </React.Fragment>
        ))}
      </div>
      <div style={{ ...viz.desc, borderColor: cur.color + '40', color: cur.color, marginBottom: 14 }}>{cur.desc}</div>
      <NavBtns step={step} total={flows[mode].length} onPrev={() => setStep(s => Math.max(0, s - 1))} onNext={() => setStep(s => Math.min(flows[mode].length - 1, s + 1))} onReset={() => setStep(0)} />

      <div style={{ marginTop: 16, borderTop: '1px solid #1e2d40', paddingTop: 16 }}>
        <div style={{ fontSize: 11, color: '#9ca3af', letterSpacing: 1, marginBottom: 10 }}>COMBINATORS — simulate all 4:</div>
        <Row style={{ marginBottom: 10 }}>
          {['all', 'allSettled', 'race', 'any'].map(type => (
            <button key={type} style={{ ...viz.btn, borderColor: combinator === type ? '#4facfe' : '#2a3f5f', color: combinator === type ? '#4facfe' : '#9ca3af' }} onClick={() => simulateCombinator(type)} disabled={simulating}>
              Promise.{type}()
            </button>
          ))}
        </Row>
        {simulating && <div style={{ color: '#eab308', fontSize: 12 }}>⏳ Promises running...</div>}
        {combResult && !simulating && (
          <div style={{ ...viz.desc, borderColor: combResult.color + '40', color: combResult.color }}>
            Result: <strong>{combResult.value}</strong>
          </div>
        )}
        <div style={viz.code}>{`Promise.all([p1,p2,p3])         // ✅ all resolve → [r1,r2,r3] | ❌ any rejects → immediate reject
Promise.allSettled([p1,p2,p3])  // always waits for all → [{status,value}, ...]
Promise.race([p1,p2,p3])        // first to settle wins (resolve OR reject)
Promise.any([p1,p2,p3])         // first to RESOLVE wins (ignores rejections)`}</div>
      </div>
    </div>
  );
};

// ─────────────────────────────────────────────────────────────────────
// 7. ASYNC/AWAIT
// ─────────────────────────────────────────────────────────────────────
export const AsyncAwaitVisualizer = () => {
  const [pattern, setPattern] = useState('sequential');

  const patterns = {
    sequential: {
      label: '❌ Sequential (slow)',
      color: '#ef4444',
      time: '~900ms total',
      code: `async function loadData() {
  const user = await fetchUser();    // waits 300ms
  const posts = await fetchPosts();  // waits 300ms (blocked!)
  const photos = await fetchPhotos();// waits 300ms (blocked!)
  // Total: 900ms — each awaits the previous
}`,
      bars: [
        { label: 'fetchUser', width: 33, delay: 0, color: '#ef4444' },
        { label: 'fetchPosts', width: 33, delay: 33, color: '#ef4444' },
        { label: 'fetchPhotos', width: 33, delay: 66, color: '#ef4444' },
      ],
    },
    parallel: {
      label: '✅ Parallel (fast)',
      color: '#00ff88',
      time: '~300ms total',
      code: `async function loadData() {
  // Start ALL fetches simultaneously
  const [user, posts, photos] = await Promise.all([
    fetchUser(),    // all 3 start at
    fetchPosts(),   // exactly the same
    fetchPhotos(),  // time → 300ms total
  ]);
}`,
      bars: [
        { label: 'fetchUser', width: 33, delay: 0, color: '#00ff88' },
        { label: 'fetchPosts', width: 33, delay: 0, color: '#00ff88' },
        { label: 'fetchPhotos', width: 33, delay: 0, color: '#00ff88' },
      ],
    },
    error: {
      label: '✅ Error Handling',
      color: '#4facfe',
      time: 'Best practice',
      code: `async function loadUser(id) {
  try {
    const res = await fetch(\`/api/users/\${id}\`);
    if (!res.ok) throw new Error(\`HTTP \${res.status}\`);
    return await res.json();
  } catch (err) {
    if (err.name === 'AbortError') return; // cancelled
    console.error('Load failed:', err);
    throw err; // re-throw so caller knows
  }
}

// ❌ Don't do this — swallows errors silently
async function bad() {
  const data = await fetch('/api').catch(() => null);
}`,
      bars: [],
    },
  };

  const cur = patterns[pattern];
  const [animated, setAnimated] = useState(false);

  useEffect(() => { setAnimated(false); setTimeout(() => setAnimated(true), 100); }, [pattern]);

  return (
    <div style={viz.wrap}>
      <div style={viz.title}>⏳ async/await — Patterns & Pitfalls</div>
      <Row style={{ marginBottom: 14 }}>
        {Object.entries(patterns).map(([key, p]) => (
          <button key={key} style={{ ...viz.btn, borderColor: pattern === key ? p.color : '#2a3f5f', color: pattern === key ? p.color : '#9ca3af', background: pattern === key ? p.color + '15' : 'transparent' }} onClick={() => setPattern(key)}>{p.label}</button>
        ))}
      </Row>
      <div style={viz.code}>{cur.code}</div>
      {cur.bars.length > 0 && (
        <div style={{ ...viz.panel, marginBottom: 12 }}>
          <div style={{ fontSize: 10, color: '#9ca3af', marginBottom: 10 }}>TIMELINE VISUALIZATION:</div>
          {cur.bars.map((bar, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
              <div style={{ fontSize: 11, color: '#9ca3af', minWidth: 90 }}>{bar.label}</div>
              <div style={{ flex: 1, height: 20, background: '#1a2332', borderRadius: 4, overflow: 'hidden', position: 'relative' }}>
                <div style={{ position: 'absolute', left: bar.delay + '%', height: '100%', width: animated ? bar.width + '%' : '0%', background: bar.color, borderRadius: 4, transition: 'width 0.8s ease', transitionDelay: bar.delay * 10 + 'ms', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10, color: '#000', fontWeight: 700 }}>
                  {animated ? '300ms' : ''}
                </div>
              </div>
            </div>
          ))}
          <div style={{ fontSize: 12, color: cur.color, marginTop: 6, fontWeight: 700 }}>⏱ {cur.time}</div>
        </div>
      )}
    </div>
  );
};

// ─────────────────────────────────────────────────────────────────────
// 8. REACT FIBER
// ─────────────────────────────────────────────────────────────────────
export const FiberVisualizer = () => {
  const [mode, setMode] = useState('old');
  const [running, setRunning] = useState(false);
  const [progress, setProgress] = useState(0);
  const [inputVal, setInputVal] = useState('');
  const [blocked, setBlocked] = useState(false);

  const simulate = () => {
    setRunning(true);
    setProgress(0);
    if (mode === 'old') {
      setBlocked(true);
      let p = 0;
      const id = setInterval(() => {
        p += 5;
        setProgress(p);
        if (p >= 100) { clearInterval(id); setRunning(false); setBlocked(false); }
      }, 50);
    } else {
      setBlocked(false);
      let p = 0;
      const id = setInterval(() => {
        p += 5;
        setProgress(p);
        if (p >= 100) { clearInterval(id); setRunning(false); }
      }, 20);
    }
  };

  return (
    <div style={viz.wrap}>
      <div style={viz.title}>⚛️ React Fiber — Old vs New Reconciler</div>
      <Row style={{ marginBottom: 14 }}>
        <button style={{ ...viz.btn, borderColor: mode === 'old' ? '#ef4444' : '#2a3f5f', color: mode === 'old' ? '#ef4444' : '#9ca3af' }} onClick={() => { setMode('old'); setProgress(0); }}>❌ Old Stack Reconciler</button>
        <button style={{ ...viz.btn, borderColor: mode === 'new' ? '#00ff88' : '#2a3f5f', color: mode === 'new' ? '#00ff88' : '#9ca3af' }} onClick={() => { setMode('new'); setProgress(0); }}>✅ Fiber (React 16+)</button>
      </Row>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 14 }}>
        <div style={{ ...viz.col, borderColor: mode === 'old' ? '#ef444440' : '#1e2d40' }}>
          <div style={{ ...viz.colLabel, color: '#ef4444' }}>Old Reconciler</div>
          <div style={{ fontSize: 12, color: '#9ca3af', lineHeight: 1.7 }}>• Synchronous — runs to completion{'\n'}• Cannot be interrupted{'\n'}• Blocks main thread{'\n'}• Long trees = frozen UI{'\n'}• No priority system</div>
        </div>
        <div style={{ ...viz.col, borderColor: mode === 'new' ? '#00ff8840' : '#1e2d40' }}>
          <div style={{ ...viz.colLabel, color: '#00ff88' }}>Fiber Reconciler</div>
          <div style={{ fontSize: 12, color: '#9ca3af', lineHeight: 1.7 }}>• Incremental — works in chunks{'\n'}• Interruptible & resumable{'\n'}• Priority-based scheduling{'\n'}• Enables Concurrent Mode{'\n'}• Suspense + useTransition</div>
        </div>
      </div>
      <div style={{ marginBottom: 14 }}>
        <div style={{ fontSize: 11, color: '#9ca3af', marginBottom: 6 }}>Try typing while reconciling:</div>
        <input style={{ ...viz.inputStyle, marginBottom: 8, opacity: blocked ? 0.4 : 1, borderColor: blocked ? '#ef4444' : '#2a3f5f' }} value={inputVal} onChange={e => setInputVal(e.target.value)} placeholder={blocked ? '⛔ BLOCKED — old reconciler is running...' : '✓ Type freely — Fiber yields to input'} disabled={blocked} />
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{ flex: 1, height: 12, background: '#1a2332', borderRadius: 6, overflow: 'hidden' }}>
            <div style={{ height: '100%', width: progress + '%', background: mode === 'old' ? '#ef4444' : '#00ff88', borderRadius: 6, transition: mode === 'new' ? 'width 0.1s' : 'none' }} />
          </div>
          <span style={{ fontSize: 11, color: '#9ca3af', minWidth: 35 }}>{progress}%</span>
        </div>
        <div style={{ fontSize: 11, color: mode === 'old' ? '#ef4444' : '#00ff88', marginTop: 6 }}>
          {mode === 'old' ? 'Reconciling entire tree synchronously — UI frozen' : 'Fiber yields every 5ms — UI stays responsive'}
        </div>
      </div>
      <button style={{ ...viz.btn, ...viz.btnPrimary }} onClick={simulate} disabled={running}>
        {running ? '⏳ Reconciling...' : '▶ Simulate Reconciliation'}
      </button>
      <div style={{ ...viz.code, marginTop: 14 }}>{`// useTransition — Fiber's priority system
const [isPending, startTransition] = useTransition();

function handleSearch(e) {
  setQuery(e.target.value);          // HIGH priority → immediate
  startTransition(() => {
    setResults(filter(e.target.value)); // LOW priority → interruptible
  });
}`}</div>
    </div>
  );
};

// ─────────────────────────────────────────────────────────────────────
// 9. VIRTUAL DOM
// ─────────────────────────────────────────────────────────────────────
export const VirtualDOMVisualizer = () => {
  const [items, setItems] = useState(['Apple', 'Banana', 'Cherry']);
  const [useKeys, setUseKeys] = useState(true);
  const [log, setLog] = useState([]);

  const addItem = () => {
    const newItem = ['Durian', 'Elderberry', 'Fig', 'Grape'][Math.floor(Math.random() * 4)];
    setItems(prev => [newItem, ...prev]);
    setLog(l => [...l.slice(-3), { msg: `Added "${newItem}" at index 0`, type: useKeys ? 'good' : 'warn' }]);
  };

  const removeItem = (idx) => {
    const removed = items[idx];
    setItems(prev => prev.filter((_, i) => i !== idx));
    setLog(l => [...l.slice(-3), { msg: `Removed "${removed}" — ${useKeys ? 'React tracks by id ✓' : 'index shifts → all below re-render ⚠'}`, type: useKeys ? 'good' : 'warn' }]);
  };

  return (
    <div style={viz.wrap}>
      <div style={viz.title}>🌳 Virtual DOM — Diffing & Keys Demo</div>
      <Row style={{ marginBottom: 14 }}>
        <button style={{ ...viz.btn, borderColor: useKeys ? '#00ff88' : '#2a3f5f', color: useKeys ? '#00ff88' : '#9ca3af' }} onClick={() => setUseKeys(true)}>✅ With stable keys</button>
        <button style={{ ...viz.btn, borderColor: !useKeys ? '#ef4444' : '#2a3f5f', color: !useKeys ? '#ef4444' : '#9ca3af' }} onClick={() => setUseKeys(false)}>❌ With index keys</button>
        <button style={{ ...viz.btn, ...viz.btnPrimary, marginLeft: 'auto' }} onClick={addItem}>+ Add item</button>
      </Row>
      <div style={viz.code}>{useKeys
        ? `{items.map(item => (
  <ListItem key={item.id} data={item} />  // ✅ stable ID
))}`
        : `{items.map((item, index) => (
  <ListItem key={index} data={item} />    // ❌ index shifts on insert/delete
))}`}
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 6, marginBottom: 12 }}>
        {items.map((item, i) => (
          <div key={useKeys ? item : i} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '8px 12px', background: '#111827', border: '1px solid #1e2d40', borderRadius: 8, transition: 'all 0.3s' }}>
            <span style={{ color: useKeys ? '#00ff88' : '#ef4444', fontSize: 10, minWidth: 100 }}>
              key="{useKeys ? item.toLowerCase() : i}"
            </span>
            <span style={{ color: '#e2e8f0', flex: 1 }}>{item}</span>
            <button style={{ ...viz.btn, padding: '3px 10px', fontSize: 10 }} onClick={() => removeItem(i)}>✕</button>
          </div>
        ))}
      </div>
      {log.length > 0 && (
        <div style={viz.panel}>
          {log.map((l, i) => (
            <div key={i} style={{ fontSize: 11, color: l.type === 'good' ? '#00ff88' : '#eab308', marginBottom: 3 }}>→ {l.msg}</div>
          ))}
        </div>
      )}
    </div>
  );
};

// ─────────────────────────────────────────────────────────────────────
// 10. USE EFFECT
// ─────────────────────────────────────────────────────────────────────
export const UseEffectVisualizer = () => {
  const [count, setCount] = useState(0);
  const [name, setName] = useState('Alice');
  const [log, setLog] = useState([]);
  const [dep, setDep] = useState('count');

  const addLog = (msg, color = '#9ca3af') => setLog(l => [...l.slice(-6), { msg, color, time: Date.now() }]);

  useEffect(() => {
    if (dep === 'none') {
      addLog('useEffect([]) — ran once on mount', '#00ff88');
      return () => addLog('cleanup — component unmounted', '#ef4444');
    }
  }, []);

  return (
    <div style={viz.wrap}>
      <div style={viz.title}>🪝 useEffect — Dependency Array Explorer</div>
      <Row style={{ marginBottom: 14 }}>
        {[
          { key: 'count', label: 'deps: [count]', color: '#4facfe' },
          { key: 'name', label: 'deps: [name]', color: '#a855f7' },
          { key: 'both', label: 'deps: [count, name]', color: '#eab308' },
          { key: 'none', label: 'deps: []', color: '#00ff88' },
          { key: 'missing', label: 'deps: [] (stale!)', color: '#ef4444' },
        ].map(d => (
          <button key={d.key} style={{ ...viz.btn, borderColor: dep === d.key ? d.color : '#2a3f5f', color: dep === d.key ? d.color : '#9ca3af', background: dep === d.key ? d.color + '15' : 'transparent' }} onClick={() => setDep(d.key)}>{d.label}</button>
        ))}
      </Row>
      <div style={viz.code}>{dep === 'count' ? `useEffect(() => {
  console.log('count changed:', count);
  document.title = \`Count: \${count}\`;
  return () => console.log('cleanup prev count');
}, [count]); // runs when 'count' changes`
        : dep === 'none' ? `useEffect(() => {
  // Runs ONCE after first render
  const sub = subscribe(handleUpdate);
  return () => sub.unsubscribe(); // cleanup on unmount
}, []); // empty array = mount only`
        : dep === 'missing' ? `// ❌ STALE CLOSURE BUG
useEffect(() => {
  const id = setInterval(() => {
    setCount(count + 1); // 'count' is stale! always 0
  }, 1000);
  return () => clearInterval(id);
}, []); // missing 'count' in deps!

// ✅ Fix: use functional update
setCount(c => c + 1); // no dependency needed`
        : dep === 'both' ? `useEffect(() => {
  analytics.track({ count, name });
}, [count, name]); // runs when EITHER changes`
        : `useEffect(() => {
  fetchUser(name).then(setUser);
}, [name]); // runs when name changes`}
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 12 }}>
        <div style={viz.col}>
          <div style={{ ...viz.colLabel, color: '#4facfe' }}>State Controls</div>
          <Row style={{ marginBottom: 8 }}>
            <button style={{ ...viz.btn, color: '#4facfe', borderColor: '#4facfe40' }} onClick={() => { setCount(c => c + 1); addLog(`count changed: ${count} → ${count + 1}`, '#4facfe'); }}>count++ ({count})</button>
            <button style={{ ...viz.btn, color: '#4facfe', borderColor: '#4facfe40' }} onClick={() => { setCount(c => c - 1); addLog(`count changed: ${count} → ${count - 1}`, '#4facfe'); }}>count--</button>
          </Row>
          <Row>
            <button style={{ ...viz.btn, color: '#a855f7', borderColor: '#a855f740' }} onClick={() => { const n = name === 'Alice' ? 'Bob' : 'Alice'; setName(n); addLog(`name changed: "${name}" → "${n}"`, '#a855f7'); }}>Toggle name ({name})</button>
          </Row>
        </div>
        <div style={viz.col}>
          <div style={{ ...viz.colLabel, color: '#00ff88' }}>Effect Log</div>
          <div style={{ minHeight: 80 }}>
            {log.length === 0 ? <div style={{ color: '#6b7280', fontSize: 11 }}>Click state controls to trigger effects</div>
              : log.map((l, i) => <div key={i} style={{ fontSize: 11, color: l.color, marginBottom: 3 }}>→ {l.msg}</div>)}
          </div>
        </div>
      </div>
      {dep === 'missing' && (
        <div style={{ ...viz.desc, borderColor: '#ef444440', color: '#ef4444' }}>
          ⚠ Stale closure: the effect captured count=0 on mount and never updates. The interval always does 0+1=1 forever.
        </div>
      )}
    </div>
  );
};

// ─────────────────────────────────────────────────────────────────────
// 11. PERFORMANCE / CWV
// ─────────────────────────────────────────────────────────────────────
export const CWVVisualizer = () => {
  const [active, setActive] = useState('lcp');

  const metrics = {
    lcp: { label: 'LCP', full: 'Largest Contentful Paint', color: '#4facfe', good: 2.5, poor: 4.0, unit: 's', value: 2.4, desc: 'When the largest visible element (hero image, heading) fully renders. Most impacted by slow servers, render-blocking resources, and unoptimized images.', fixes: ['preload hero image with fetchpriority="high"', 'Use CDN for static assets', 'Remove render-blocking scripts (defer/async)', 'Use WebP/AVIF image formats'] },
    inp: { label: 'INP', full: 'Interaction to Next Paint', color: '#00ff88', good: 200, poor: 500, unit: 'ms', value: 180, desc: 'Time from user interaction (click, tap, key) to next visual update. Long JS tasks on the main thread cause poor INP. Replaced FID in March 2024.', fixes: ['Break long tasks with scheduler.yield()', 'Debounce expensive event handlers', 'Move heavy work to Web Workers', 'Use useTransition for non-urgent state'] },
    cls: { label: 'CLS', full: 'Cumulative Layout Shift', color: '#a855f7', good: 0.1, poor: 0.25, unit: '', value: 0.08, desc: 'How much page content unexpectedly shifts. Causes frustration when buttons/links move as user tries to click them. Common with images and late-loading ads.', fixes: ['Always set width/height on images', 'Reserve space for ads with min-height', 'Use font-display: swap + size-adjust', 'Avoid inserting content above existing elements'] },
    ttfb: { label: 'TTFB', full: 'Time to First Byte', color: '#eab308', good: 0.8, poor: 1.8, unit: 's', value: 0.6, desc: 'Time from request to first byte received from server. High TTFB indicates slow server, no CDN, or expensive database queries.', fixes: ['Use a CDN for static assets', 'Enable HTTP/2 or HTTP/3', 'Cache database queries', 'Use edge computing (Cloudflare Workers)'] },
  };

  const m = metrics[active];
  const pct = Math.min(95, (m.value / m.poor) * 85);
  const grade = m.value <= m.good ? 'Good ✓' : m.value <= m.poor ? 'Needs Improvement' : 'Poor ✗';
  const gradeColor = m.value <= m.good ? '#00ff88' : m.value <= m.poor ? '#eab308' : '#ef4444';

  return (
    <div style={viz.wrap}>
      <div style={viz.title}>📊 Core Web Vitals — Interactive Guide</div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 8, marginBottom: 16 }}>
        {Object.entries(metrics).map(([key, met]) => (
          <button key={key} style={{ ...viz.btn, borderColor: active === key ? met.color : '#2a3f5f', color: active === key ? met.color : '#9ca3af', background: active === key ? met.color + '15' : 'transparent', padding: '10px 8px', flexDirection: 'column', display: 'flex', alignItems: 'center', gap: 4 }} onClick={() => setActive(key)}>
            <span style={{ fontWeight: 700, fontSize: 14 }}>{met.label}</span>
            <span style={{ fontSize: 9, opacity: 0.7, textAlign: 'center' }}>{met.full}</span>
          </button>
        ))}
      </div>
      <div style={{ marginBottom: 16 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 10, color: '#9ca3af', marginBottom: 6 }}>
          <span>0</span><span style={{ color: '#00ff88' }}>Good &lt;{m.good}{m.unit}</span><span style={{ color: '#eab308' }}>Needs work &lt;{m.poor}{m.unit}</span><span style={{ color: '#ef4444' }}>Poor</span>
        </div>
        <div style={{ height: 20, background: 'linear-gradient(90deg, #052210 0%, #0a4420 33%, #2a2000 60%, #2a0a0a 100%)', borderRadius: 10, position: 'relative' }}>
          <div style={{ position: 'absolute', left: pct + '%', top: '50%', transform: 'translate(-50%, -50%)', background: gradeColor, borderRadius: '50%', width: 24, height: 24, border: '3px solid #060910', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10, fontWeight: 700, color: '#000', transition: 'left 0.8s ease' }}>▲</div>
        </div>
        <div style={{ textAlign: 'center', marginTop: 10 }}>
          <span style={{ color: gradeColor, fontWeight: 700, fontSize: 22 }}>{m.value}{m.unit}</span>
          <span style={{ color: gradeColor, fontSize: 13, marginLeft: 10 }}>{grade}</span>
        </div>
      </div>
      <div style={{ ...viz.desc, marginBottom: 14 }}>{m.desc}</div>
      <div>
        <div style={{ fontSize: 10, color: m.color, letterSpacing: 2, marginBottom: 8 }}>HOW TO FIX:</div>
        {m.fixes.map((fix, i) => (
          <div key={i} style={{ display: 'flex', gap: 8, alignItems: 'flex-start', marginBottom: 7, fontSize: 12, color: '#e2e8f0' }}>
            <span style={{ color: m.color, flexShrink: 0 }}>→</span><span>{fix}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

// ─────────────────────────────────────────────────────────────────────
// 12. CODE SPLITTING
// ─────────────────────────────────────────────────────────────────────
export const CodeSplittingVisualizer = () => {
  const [mode, setMode] = useState('before');
  const [loaded, setLoaded] = useState(false);
  const [loading, setLoading] = useState(false);

  const simulate = () => {
    setLoading(true);
    setLoaded(false);
    setTimeout(() => { setLoaded(true); setLoading(false); }, mode === 'before' ? 2000 : 400);
  };

  const bundles = {
    before: [
      { name: 'main.bundle.js', size: 850, color: '#ef4444', desc: 'Everything — even pages user never visits' },
    ],
    after: [
      { name: 'main.bundle.js', size: 120, color: '#00ff88', desc: 'Core app only' },
      { name: 'dashboard.chunk.js', size: 180, color: '#4facfe', desc: 'Loaded on /dashboard route' },
      { name: 'settings.chunk.js', size: 95, color: '#a855f7', desc: 'Loaded on /settings route' },
      { name: 'chart.chunk.js', size: 280, color: '#eab308', desc: 'Loaded only when chart renders' },
      { name: 'vendor.chunk.js', size: 175, color: '#06b6d4', desc: 'Third-party libs (cached separately)' },
    ],
  };

  return (
    <div style={viz.wrap}>
      <div style={viz.title}>✂️ Code Splitting — Bundle Visualizer</div>
      <Row style={{ marginBottom: 14 }}>
        <button style={{ ...viz.btn, borderColor: mode === 'before' ? '#ef4444' : '#2a3f5f', color: mode === 'before' ? '#ef4444' : '#9ca3af' }} onClick={() => { setMode('before'); setLoaded(false); }}>❌ Before (monolith)</button>
        <button style={{ ...viz.btn, borderColor: mode === 'after' ? '#00ff88' : '#2a3f5f', color: mode === 'after' ? '#00ff88' : '#9ca3af' }} onClick={() => { setMode('after'); setLoaded(false); }}>✅ After (split)</button>
        <button style={{ ...viz.btn, ...viz.btnPrimary, marginLeft: 'auto' }} onClick={simulate} disabled={loading}>
          {loading ? '⏳ Loading...' : '▶ Simulate Page Load'}
        </button>
      </Row>
      <div style={{ marginBottom: 14 }}>
        {bundles[mode].map((b, i) => (
          <div key={i} style={{ marginBottom: 8 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, marginBottom: 4 }}>
              <span style={{ color: b.color }}>{b.name}</span>
              <span style={{ color: '#9ca3af' }}>{b.size}KB — {b.desc}</span>
            </div>
            <div style={{ height: 14, background: '#1a2332', borderRadius: 4, overflow: 'hidden' }}>
              <div style={{ height: '100%', width: (b.size / 850 * 100) + '%', background: b.color, borderRadius: 4, opacity: 0.8 }} />
            </div>
          </div>
        ))}
        <div style={{ marginTop: 10, fontSize: 13, fontWeight: 700, color: mode === 'before' ? '#ef4444' : '#00ff88' }}>
          Total: {bundles[mode].reduce((s, b) => s + b.size, 0)}KB
          {mode === 'after' && ' (initial: 120KB — 86% smaller!)'}
        </div>
      </div>
      {loading && <div style={{ ...viz.desc, color: '#eab308', borderColor: '#eab30840' }}>⏳ Downloading {mode === 'before' ? '850KB bundle' : '120KB initial bundle'}...</div>}
      {loaded && <div style={{ ...viz.desc, color: '#00ff88', borderColor: '#00ff8840' }}>✅ Page ready in {mode === 'before' ? '~2.0s' : '~0.4s'} {mode === 'after' && '— other chunks load lazily when needed'}</div>}
      <div style={viz.code}>{`// React.lazy + Suspense
const Dashboard = lazy(() => import('./Dashboard'));
const Settings = lazy(() => import('./Settings'));

// Prefetch on hover
const prefetch = () => import(/* webpackPrefetch: true */ './HeavyPage');
<Link onMouseEnter={prefetch} to="/heavy">Go</Link>`}</div>
    </div>
  );
};

// ─────────────────────────────────────────────────────────────────────
// 13. REFLOW / REPAINT
// ─────────────────────────────────────────────────────────────────────
export const ReflowVisualizer = () => {
  const [trigger, setTrigger] = useState(null);
  const [animating, setAnimating] = useState(false);

  const triggers = [
    { label: 'width change', prop: 'width', cost: 'REFLOW + REPAINT + COMPOSITE', color: '#ef4444', steps: [0, 1, 2, 3, 4], desc: 'Changing geometry forces full pipeline — most expensive' },
    { label: 'color change', prop: 'color', cost: 'REPAINT + COMPOSITE', color: '#eab308', steps: [0, 1, 3, 4], desc: 'Skips layout — only pixels redrawn' },
    { label: 'opacity change', prop: 'opacity', cost: 'COMPOSITE ONLY ✓', color: '#00ff88', steps: [0, 4], desc: 'GPU only — cheapest animation property' },
    { label: 'transform', prop: 'transform', cost: 'COMPOSITE ONLY ✓', color: '#00ff88', steps: [0, 4], desc: 'GPU compositing — use for all animations!' },
    { label: 'read offsetHeight', prop: 'read', cost: 'FORCED SYNC REFLOW ⚠', color: '#ef4444', steps: [0, 1, 2], desc: 'Forces browser to flush layout immediately — avoid in loops!' },
  ];

  const pipeline = ['JS', 'Style', 'Layout', 'Paint', 'Composite'];

  const activate = (t) => {
    setTrigger(t);
    setAnimating(true);
    setTimeout(() => setAnimating(false), 800);
  };

  return (
    <div style={viz.wrap}>
      <div style={viz.title}>🎨 Browser Rendering Pipeline</div>
      <Row style={{ marginBottom: 14, flexWrap: 'wrap' }}>
        {triggers.map(t => (
          <button key={t.prop} style={{ ...viz.btn, borderColor: (trigger?.prop === t.prop) ? t.color : '#2a3f5f', color: (trigger?.prop === t.prop) ? t.color : '#9ca3af' }} onClick={() => activate(t)}>{t.label}</button>
        ))}
      </Row>
      <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 16, justifyContent: 'center' }}>
        {pipeline.map((step, i) => {
          const active = trigger?.steps?.includes(i);
          return (
            <React.Fragment key={step}>
              <div style={{ padding: '10px 16px', borderRadius: 8, fontSize: 12, fontWeight: 700, background: active ? trigger.color + '20' : '#1a2332', border: `2px solid ${active ? trigger.color : '#1e2d40'}`, color: active ? trigger.color : '#6b7280', transition: 'all 0.3s', transform: active && animating ? 'scale(1.1)' : 'scale(1)', minWidth: 80, textAlign: 'center' }}>{step}</div>
              {i < pipeline.length - 1 && <div style={{ color: trigger?.steps?.includes(i) && trigger?.steps?.includes(i + 1) ? trigger?.color : '#2a3f5f', fontSize: 20, transition: 'color 0.3s' }}>→</div>}
            </React.Fragment>
          );
        })}
      </div>
      {trigger && (
        <div style={{ ...viz.desc, borderColor: trigger.color + '40', color: trigger.color, marginBottom: 14 }}>
          <strong>{trigger.cost}</strong> — {trigger.desc}
        </div>
      )}
      <div style={viz.code}>{`// ❌ Layout thrashing — triggers reflow every iteration
items.forEach(el => {
  el.style.width = box.offsetWidth + 'px'; // read → write → read → write
});

// ✅ Batch reads, then writes
const width = box.offsetWidth;   // read once
items.forEach(el => { el.style.width = width + 'px'; }); // write only

// ✅ Use compositor-only properties for animation
// ❌ el.style.left = x + 'px';          // triggers layout
// ✅ el.style.transform = \`translateX(\${x}px)\`; // GPU only`}</div>
    </div>
  );
};

// ─────────────────────────────────────────────────────────────────────
// 14. XSS
// ─────────────────────────────────────────────────────────────────────
export const XSSVisualizer = () => {
  const [input, setInput] = useState('<img src=x onerror="alert(\'XSS!\')">');
  const [mode, setMode] = useState('unsafe');

  return (
    <div style={viz.wrap}>
      <div style={viz.title}>🔒 XSS — Safe vs Unsafe Rendering</div>
      <Row style={{ marginBottom: 14 }}>
        <button style={{ ...viz.btn, borderColor: mode === 'unsafe' ? '#ef4444' : '#2a3f5f', color: mode === 'unsafe' ? '#ef4444' : '#9ca3af' }} onClick={() => setMode('unsafe')}>❌ innerHTML (unsafe)</button>
        <button style={{ ...viz.btn, borderColor: mode === 'safe' ? '#00ff88' : '#2a3f5f', color: mode === 'safe' ? '#00ff88' : '#9ca3af' }} onClick={() => setMode('safe')}>✅ textContent (safe)</button>
        <button style={{ ...viz.btn, borderColor: mode === 'sanitize' ? '#4facfe' : '#2a3f5f', color: mode === 'sanitize' ? '#4facfe' : '#9ca3af' }} onClick={() => setMode('sanitize')}>🛡 DOMPurify (safe HTML)</button>
      </Row>
      <div style={{ marginBottom: 12 }}>
        <div style={{ fontSize: 10, color: '#9ca3af', marginBottom: 6, letterSpacing: 1 }}>USER INPUT (edit to test):</div>
        <input style={viz.inputStyle} value={input} onChange={e => setInput(e.target.value)} />
      </div>
      <div style={viz.code}>{mode === 'unsafe'
        ? `element.innerHTML = userInput;          // ❌ NEVER
// React: <div dangerouslySetInnerHTML={{__html: input}} />`
        : mode === 'safe'
          ? `element.textContent = userInput;       // ✅ always safe
// React: <div>{userInput}</div>         // JSX escapes by default`
          : `import DOMPurify from 'dompurify';
const clean = DOMPurify.sanitize(userInput); // strips scripts
element.innerHTML = clean;              // ✅ safe to render HTML`}
      </div>
      <div style={{ marginBottom: 12 }}>
        <div style={{ fontSize: 10, color: '#9ca3af', marginBottom: 6, letterSpacing: 1 }}>RENDERED OUTPUT:</div>
        <div style={{ background: '#060910', border: `2px solid ${mode === 'unsafe' ? '#ef4444' : '#00ff88'}`, borderRadius: 8, padding: 14, minHeight: 50, fontSize: 13, transition: 'border-color 0.3s' }}>
          {mode === 'unsafe'
            ? <span style={{ color: '#ef4444' }}>⚠ Script would EXECUTE in real browser!<br /><span style={{ fontSize: 11, color: '#9ca3af' }}>Blocked here for safety. Input was: {input}</span></span>
            : mode === 'safe'
              ? <span style={{ color: '#00ff88' }}>{input}</span>
              : <span style={{ color: '#4facfe' }}>Rendered safely — script tags stripped, safe HTML preserved</span>}
        </div>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8 }}>
        {[
          { type: 'Stored XSS', color: '#ef4444', desc: 'Script saved in DB, served to all users' },
          { type: 'Reflected XSS', color: '#eab308', desc: 'Script in URL param, reflected in response' },
          { type: 'DOM-based XSS', color: '#f97316', desc: 'Script via client-side DOM manipulation' },
        ].map(x => (
          <div key={x.type} style={{ ...viz.col, borderColor: x.color + '40' }}>
            <div style={{ color: x.color, fontWeight: 700, fontSize: 12, marginBottom: 4 }}>{x.type}</div>
            <div style={{ color: '#9ca3af', fontSize: 11 }}>{x.desc}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

// ─────────────────────────────────────────────────────────────────────
// 15. AUTH PATTERNS
// ─────────────────────────────────────────────────────────────────────
export const AuthFlowVisualizer = () => {
  const [step, setStep] = useState(0);
  const [flow, setFlow] = useState('login');

  const flows = {
    login: { label: 'Login Flow', steps: [
      { from: 'Browser', to: 'Server', msg: 'POST /login {email, password}', color: '#4facfe' },
      { from: 'Server', to: 'DB', msg: 'findUser(email) → bcrypt.compare(pwd, hash)', color: '#a855f7' },
      { from: 'Server', to: 'Browser', msg: 'accessToken (15min) in response body', color: '#00ff88' },
      { from: 'Server', to: 'Browser', msg: 'refreshToken (7d) in httpOnly cookie 🍪', color: '#00ff88' },
      { from: 'Browser', to: 'Memory', msg: 'Store accessToken in JS variable (NOT localStorage!)', color: '#eab308' },
    ]},
    refresh: { label: 'Token Refresh', steps: [
      { from: 'Browser', to: 'Server', msg: 'API call → 401 TOKEN_EXPIRED response', color: '#ef4444' },
      { from: 'Browser', to: 'Server', msg: 'POST /auth/refresh (cookie sent automatically)', color: '#4facfe' },
      { from: 'Server', to: 'Server', msg: 'Verify refresh token → rotate (invalidate old)', color: '#a855f7' },
      { from: 'Server', to: 'Browser', msg: 'New accessToken + new refreshToken cookie', color: '#00ff88' },
      { from: 'Browser', to: 'Server', msg: 'Retry original failed request with new token ✓', color: '#00ff88' },
    ]},
    google: { label: 'Google OAuth', steps: [
      { from: 'Browser', to: 'Google', msg: 'User clicks "Sign in with Google"', color: '#4facfe' },
      { from: 'Google', to: 'Browser', msg: 'Google ID token (JWT credential)', color: '#eab308' },
      { from: 'Browser', to: 'Server', msg: 'POST /auth/google {credential: id_token}', color: '#4facfe' },
      { from: 'Server', to: 'Google', msg: 'verifyIdToken(credential) — validate signature', color: '#a855f7' },
      { from: 'Server', to: 'Browser', msg: 'Our own accessToken + refreshToken cookie', color: '#00ff88' },
    ]},
  };

  const cur = flows[flow];

  return (
    <div style={viz.wrap}>
      <div style={viz.title}>🔐 Auth Flow — Step by Step</div>
      <Row style={{ marginBottom: 14 }}>
        {Object.entries(flows).map(([key, f]) => (
          <button key={key} style={{ ...viz.btn, borderColor: flow === key ? '#4facfe' : '#2a3f5f', color: flow === key ? '#4facfe' : '#9ca3af', background: flow === key ? '#4facfe15' : 'transparent' }} onClick={() => { setFlow(key); setStep(0); }}>{f.label}</button>
        ))}
      </Row>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 6, marginBottom: 14 }}>
        {cur.steps.map((s, i) => (
          <div key={i} onClick={() => setStep(i)} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 14px', background: i === step ? s.color + '15' : '#0d1829', border: `1px solid ${i === step ? s.color : '#1e2d40'}`, borderRadius: 8, cursor: 'pointer', transition: 'all 0.2s', opacity: i > step ? 0.5 : 1 }}>
            <div style={{ width: 24, height: 24, borderRadius: '50%', flexShrink: 0, background: i <= step ? s.color : '#1e2d40', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10, fontWeight: 700, color: '#000', transition: 'all 0.3s' }}>{i + 1}</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, flex: 1, flexWrap: 'wrap' }}>
              <span style={{ fontSize: 10, color: '#9ca3af', background: '#1e2d40', padding: '2px 8px', borderRadius: 4 }}>{s.from}</span>
              <span style={{ color: i <= step ? s.color : '#2a3f5f', transition: 'color 0.3s' }}>→</span>
              <span style={{ fontSize: 10, color: '#9ca3af', background: '#1e2d40', padding: '2px 8px', borderRadius: 4 }}>{s.to}</span>
              <span style={{ fontSize: 12, color: i <= step ? s.color : '#6b7280', transition: 'color 0.3s' }}>{s.msg}</span>
            </div>
          </div>
        ))}
      </div>
      <NavBtns step={step} total={cur.steps.length} onPrev={() => setStep(s => Math.max(0, s - 1))} onNext={() => setStep(s => Math.min(cur.steps.length - 1, s + 1))} onReset={() => setStep(0)} />
    </div>
  );
};

// ─────────────────────────────────────────────────────────────────────
// 16. RENDERING PATTERNS
// ─────────────────────────────────────────────────────────────────────
export const RenderingPatternsVisualizer = () => {
  const [active, setActive] = useState('csr');

  const patterns = {
    csr: { label: 'CSR', full: 'Client-Side Rendering', color: '#ef4444', steps: ['Request HTML', 'Download JS bundle', 'Execute JS', 'Fetch data', '✓ Page visible'], times: [100, 900, 400, 600, 100], good: 'Fast navigation after load', bad: 'Slow initial load, bad SEO', use: 'Dashboards, apps behind login' },
    ssr: { label: 'SSR', full: 'Server-Side Rendering', color: '#4facfe', steps: ['Request page', 'Server fetches data', 'Server renders HTML', '✓ Page visible', 'JS hydrates'], times: [100, 400, 300, 100, 400], good: 'Fast FCP, good SEO', bad: 'Server load, slower nav', use: 'E-commerce, news, social' },
    ssg: { label: 'SSG', full: 'Static Site Generation', color: '#00ff88', steps: ['Build time render', 'CDN caches HTML', 'Request page', '✓ Instant response'], times: [0, 0, 50, 50], good: 'Fastest possible, free CDN', bad: 'Stale data, long builds', use: 'Blogs, docs, marketing' },
    isr: { label: 'ISR', full: 'Incremental Static Regen', color: '#a855f7', steps: ['SSG at build time', 'CDN serves cached', 'After N seconds stale', 'Background regenerate', '✓ Fresh + fast'], times: [0, 50, 0, 300, 50], good: 'Static speed + fresh data', bad: 'Complex, Next.js only', use: 'Product pages, news feeds' },
  };

  const cur = patterns[active];
  const totalTime = cur.times.reduce((a, b) => a + b, 0);

  return (
    <div style={viz.wrap}>
      <div style={viz.title}>🖥 Rendering Patterns — When to Use Each</div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 8, marginBottom: 16 }}>
        {Object.entries(patterns).map(([key, p]) => (
          <button key={key} style={{ ...viz.btn, borderColor: active === key ? p.color : '#2a3f5f', color: active === key ? p.color : '#9ca3af', background: active === key ? p.color + '15' : 'transparent', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3, padding: '10px 6px' }} onClick={() => setActive(key)}>
            <span style={{ fontWeight: 700 }}>{p.label}</span>
            <span style={{ fontSize: 9, opacity: 0.7, textAlign: 'center' }}>{p.full}</span>
          </button>
        ))}
      </div>
      <div style={{ marginBottom: 14 }}>
        <div style={{ fontSize: 10, color: '#9ca3af', marginBottom: 8 }}>REQUEST TIMELINE:</div>
        {cur.steps.map((step, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6 }}>
            <div style={{ fontSize: 11, color: i === cur.steps.length - 1 ? cur.color : '#9ca3af', minWidth: 180 }}>{step}</div>
            {cur.times[i] > 0 && (
              <div style={{ flex: 1, height: 16, background: '#1a2332', borderRadius: 4, overflow: 'hidden' }}>
                <div style={{ height: '100%', width: (cur.times[i] / 900 * 100) + '%', background: i === cur.steps.length - 1 ? cur.color : cur.color + '60', borderRadius: 4, display: 'flex', alignItems: 'center', paddingLeft: 6, fontSize: 10, color: '#000', fontWeight: 700 }}>
                  {cur.times[i]}ms
                </div>
              </div>
            )}
          </div>
        ))}
        <div style={{ marginTop: 8, fontSize: 12, color: cur.color, fontWeight: 700 }}>Total: ~{totalTime}ms to interactive</div>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 8 }}>
        {[
          { label: '✓ Best for', value: cur.good, color: '#00ff88' },
          { label: '✗ Trade-off', value: cur.bad, color: '#ef4444' },
          { label: '📦 Use when', value: cur.use, color: cur.color },
        ].map(item => (
          <div key={item.label} style={{ ...viz.col, borderColor: item.color + '30' }}>
            <div style={{ fontSize: 10, color: item.color, marginBottom: 6, fontWeight: 700 }}>{item.label}</div>
            <div style={{ fontSize: 11, color: '#9ca3af', lineHeight: 1.5 }}>{item.value}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

// ─────────────────────────────────────────────────────────────────────
// 17. SCOPE CHAIN
// ─────────────────────────────────────────────────────────────────────
export const ScopeChainVisualizer = () => {
  const [searching, setSearching] = useState(null);
  const [found, setFound] = useState(null);

  const scopes = [
    { name: 'Global Scope', color: '#4facfe', vars: ['globalVar = "global"', 'outer = function'] },
    { name: 'outer() Scope', color: '#a855f7', vars: ['outerVar = "outer"', 'inner = function'] },
    { name: 'inner() Scope', color: '#00ff88', vars: ['innerVar = "inner"'] },
  ];

  const lookups = [
    { variable: 'innerVar', foundAt: 2, code: 'console.log(innerVar)' },
    { variable: 'outerVar', foundAt: 1, code: 'console.log(outerVar)' },
    { variable: 'globalVar', foundAt: 0, code: 'console.log(globalVar)' },
    { variable: 'missing', foundAt: -1, code: 'console.log(missing)' },
  ];

  const lookup = (lk) => {
    setSearching(lk);
    setFound(null);
    setTimeout(() => setFound(lk.foundAt), 800);
  };

  return (
    <div style={viz.wrap}>
      <div style={viz.title}>🔍 Scope Chain — Variable Lookup</div>
      <div style={viz.code}>{`const globalVar = 'global';          // global scope
function outer() {
  const outerVar = 'outer';          // outer scope
  function inner() {
    const innerVar = 'inner';        // inner scope
    // JS looks up: inner → outer → global → ReferenceError
  }
}`}</div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 6, marginBottom: 14, position: 'relative' }}>
        {scopes.map((scope, i) => (
          <div key={i} style={{ ...viz.col, borderColor: (found !== null && found >= i) || (searching && found === null) ? scope.color : '#1e2d40', transition: 'all 0.3s', marginLeft: i * 20, boxShadow: found === i ? `0 0 16px ${scope.color}60` : 'none' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ ...viz.colLabel, color: scope.color, marginBottom: 6 }}>{scope.name}</div>
              {found === i && <span style={{ color: scope.color, fontSize: 12, fontWeight: 700 }}>✓ FOUND!</span>}
              {found === -1 && i === scopes.length - 1 && <span style={{ color: '#ef4444', fontSize: 12 }}>✗ Not found → ReferenceError</span>}
            </div>
            {scope.vars.map((v, j) => (
              <div key={j} style={{ fontSize: 11, color: found === i ? scope.color : '#9ca3af', background: '#060910', padding: '3px 8px', borderRadius: 4, marginBottom: 3, display: 'inline-block', marginRight: 6 }}>{v}</div>
            ))}
          </div>
        ))}
        {searching && <div style={{ position: 'absolute', right: 10, top: '50%', transform: 'translateY(-50%)', fontSize: 11, color: '#9ca3af' }}>Looking for: <span style={{ color: '#eab308' }}>"{searching.variable}"</span></div>}
      </div>
      <div style={{ fontSize: 11, color: '#9ca3af', marginBottom: 10 }}>Click to simulate variable lookup:</div>
      <Row>
        {lookups.map((lk, i) => (
          <button key={i} style={{ ...viz.btn, borderColor: '#2a3f5f', color: '#9ca3af' }} onClick={() => lookup(lk)}>
            {lk.code}
          </button>
        ))}
      </Row>
    </div>
  );
};

// ─────────────────────────────────────────────────────────────────────
// 18. NETWORK / HTTP
// ─────────────────────────────────────────────────────────────────────
export const NetworkVisualizer = () => {
  const [tab, setTab] = useState('http');

  const requests = [
    { name: 'index.html', status: 200, type: 'document', size: '12KB', dns: 8, tcp: 24, ttfb: 120, dl: 20, color: '#4facfe' },
    { name: 'main.bundle.js', status: 200, type: 'script', size: '284KB', dns: 0, tcp: 0, ttfb: 80, dl: 380, color: '#eab308' },
    { name: 'styles.css', status: 200, type: 'stylesheet', size: '45KB', dns: 0, tcp: 0, ttfb: 60, dl: 80, color: '#a855f7' },
    { name: 'api/user', status: 200, type: 'fetch', size: '2KB', dns: 0, tcp: 0, ttfb: 180, dl: 10, color: '#00ff88' },
    { name: 'logo.svg', status: 304, type: 'image', size: '(cached)', dns: 0, tcp: 0, ttfb: 15, dl: 0, color: '#06b6d4' },
    { name: 'api/missing', status: 404, type: 'fetch', size: '0B', dns: 0, tcp: 0, ttfb: 90, dl: 0, color: '#ef4444' },
  ];

  const maxTotal = Math.max(...requests.map(r => r.dns + r.tcp + r.ttfb + r.dl));

  return (
    <div style={viz.wrap}>
      <div style={viz.title}>🌐 Network Tab — Request Waterfall</div>
      <Row style={{ marginBottom: 14 }}>
        {['http', 'caching', 'websocket'].map(t => (
          <button key={t} style={{ ...viz.btn, borderColor: tab === t ? '#4facfe' : '#2a3f5f', color: tab === t ? '#4facfe' : '#9ca3af', background: tab === t ? '#4facfe15' : 'transparent' }} onClick={() => setTab(t)}>
            {t === 'http' ? '🌐 Waterfall' : t === 'caching' ? '💾 Caching' : '🔌 WebSockets'}
          </button>
        ))}
      </Row>
      {tab === 'http' && (
        <>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 11 }}>
              <thead>
                <tr>{['Name', 'Status', 'Type', 'Size', 'Waterfall'].map(h => <th key={h} style={{ textAlign: 'left', padding: '6px 10px', color: '#9ca3af', borderBottom: '1px solid #1e2d40', fontWeight: 600 }}>{h}</th>)}</tr>
              </thead>
              <tbody>
                {requests.map((r, i) => (
                  <tr key={i} style={{ borderBottom: '1px solid #0d1829' }}>
                    <td style={{ padding: '6px 10px', color: r.color }}>{r.name}</td>
                    <td style={{ padding: '6px 10px', color: r.status === 200 ? '#00ff88' : r.status === 304 ? '#eab308' : '#ef4444', fontWeight: 700 }}>{r.status}</td>
                    <td style={{ padding: '6px 10px', color: '#9ca3af' }}>{r.type}</td>
                    <td style={{ padding: '6px 10px', color: '#e2e8f0' }}>{r.size}</td>
                    <td style={{ padding: '6px 10px', minWidth: 160 }}>
                      <div style={{ display: 'flex', height: 12, background: '#1a2332', borderRadius: 3, overflow: 'hidden' }}>
                        {[{ w: r.dns, c: '#a855f7' }, { w: r.tcp, c: '#4facfe' }, { w: r.ttfb, c: '#eab308' }, { w: r.dl, c: r.color }].map((seg, j) => seg.w > 0 && (
                          <div key={j} style={{ width: (seg.w / maxTotal * 100) + '%', background: seg.c, transition: 'width 0.5s' }} />
                        ))}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div style={{ display: 'flex', gap: 12, marginTop: 10, flexWrap: 'wrap' }}>
            {[{ color: '#a855f7', label: 'DNS' }, { color: '#4facfe', label: 'TCP' }, { color: '#eab308', label: 'TTFB' }, { color: '#00ff88', label: 'Download' }].map(l => (
              <div key={l.label} style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 11, color: '#9ca3af' }}>
                <div style={{ width: 10, height: 10, background: l.color, borderRadius: 2 }} />{l.label}
              </div>
            ))}
          </div>
        </>
      )}
      {tab === 'caching' && (
        <div style={viz.code}>{`// Cache-Control header strategies:
Cache-Control: no-store              // never cache (sensitive data)
Cache-Control: no-cache              // revalidate every time (ETag)
Cache-Control: max-age=3600          // cache for 1 hour
Cache-Control: max-age=31536000, immutable  // forever (hashed filenames)
Cache-Control: stale-while-revalidate=60    // serve stale, refresh in bg

// ETag workflow:
// 1. Server sends: ETag: "abc123"
// 2. Browser stores it
// 3. Next request: If-None-Match: "abc123"
// 4. Server: 304 Not Modified (no body) or 200 with new content

// ✅ Best practice for static assets:
// Use content hash in filename: main.a3f9c2.js
// Then set: Cache-Control: max-age=31536000, immutable`}</div>
      )}
      {tab === 'websocket' && (
        <div style={viz.code}>{`// WebSocket vs SSE vs Polling:

// WebSocket — full duplex, real-time both ways
const ws = new WebSocket('wss://api/chat');
ws.onmessage = e => console.log(e.data);
ws.send('hello'); // client can send too!
// Use: chat, live collaboration, gaming

// SSE — server push only (simpler, HTTP/2 friendly)
const es = new EventSource('/api/notifications');
es.onmessage = e => console.log(e.data);
// Use: live feeds, notifications, stock tickers

// Long polling — compatible everywhere (fallback)
async function poll() {
  const res = await fetch('/api/updates');
  const data = await res.json();
  handleUpdate(data);
  poll(); // immediately request next
}
// Use: when WebSocket unavailable`}</div>
      )}
    </div>
  );
};

// ─────────────────────────────────────────────────────────────────────
// 19. MEMORY MANAGEMENT
// ─────────────────────────────────────────────────────────────────────
export const MemoryVisualizer = () => {
  const [items, setItems] = useState([]);
  const [leaking, setLeaking] = useState(false);
  const [gcRan, setGcRan] = useState(false);

  const addItem = () => {
    setItems(prev => [...prev, { id: Date.now(), size: Math.floor(Math.random() * 40) + 10, reachable: true }]);
    setGcRan(false);
  };
  const detach = (id) => setItems(prev => prev.map(i => i.id === id ? { ...i, reachable: false } : i));
  const runGC = () => { setItems(prev => prev.filter(i => i.reachable)); setGcRan(true); };

  const total = items.reduce((s, i) => s + i.size, 0);
  const reachable = items.filter(i => i.reachable).reduce((s, i) => s + i.size, 0);

  return (
    <div style={viz.wrap}>
      <div style={viz.title}>🗑 Memory Management & Garbage Collection</div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 8, marginBottom: 14 }}>
        {[
          { label: 'Heap used', value: total + 'KB', color: '#4facfe' },
          { label: 'Reachable', value: reachable + 'KB', color: '#00ff88' },
          { label: 'Collectable', value: (total - reachable) + 'KB', color: '#ef4444' },
        ].map(s => (
          <div key={s.label} style={{ ...viz.col, textAlign: 'center' }}>
            <div style={{ color: s.color, fontSize: 20, fontWeight: 700 }}>{s.value}</div>
            <div style={{ color: '#9ca3af', fontSize: 10 }}>{s.label}</div>
          </div>
        ))}
      </div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, minHeight: 60, background: '#060910', border: '1px solid #1e2d40', borderRadius: 8, padding: 12, marginBottom: 12, alignItems: 'flex-start', alignContent: 'flex-start' }}>
        {items.length === 0 ? <span style={{ color: '#6b7280', fontSize: 11 }}>Heap is empty — allocate some objects</span>
          : items.map(item => (
            <div key={item.id} onClick={() => detach(item.id)} title="Click to detach reference" style={{ width: item.size * 2, height: 30, background: item.reachable ? '#052210' : '#2a0a0a', border: `1px solid ${item.reachable ? '#00ff88' : '#ef4444'}`, borderRadius: 4, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 9, color: item.reachable ? '#00ff88' : '#ef4444', transition: 'all 0.3s', opacity: item.reachable ? 1 : 0.5 }}>
              {item.size}KB{item.reachable ? '' : ' ✗'}
            </div>
          ))}
      </div>
      <Row style={{ marginBottom: 14 }}>
        <button style={{ ...viz.btn, ...viz.btnPrimary }} onClick={addItem}>+ Allocate Object</button>
        <button style={{ ...viz.btn }} onClick={runGC}>🗑 Run GC</button>
        <span style={{ fontSize: 11, color: '#9ca3af' }}>Click object to detach reference</span>
        {gcRan && <span style={{ color: '#00ff88', fontSize: 11 }}>✓ GC collected {items.filter(i => !i.reachable).length} objects</span>}
      </Row>
      <div style={viz.code}>{`// Common memory leaks in JS:

// 1. Forgotten event listeners
// ❌ 
window.addEventListener('resize', heavyHandler);
// ✅ 
useEffect(() => {
  window.addEventListener('resize', handler);
  return () => window.removeEventListener('resize', handler); // cleanup!
}, []);

// 2. Closures holding large data
function leak() {
  const bigData = new Array(1000000).fill('x'); // 1MB
  return () => console.log(bigData.length); // closure holds reference!
}

// 3. Detached DOM nodes
let detached = document.getElementById('old');
document.body.removeChild(detached);
// detached variable still holds reference → memory leak!
detached = null; // ✅ release it`}</div>
    </div>
  );
};

// ─────────────────────────────────────────────────────────────────────
// 20. DESIGN PATTERNS
// ─────────────────────────────────────────────────────────────────────
export const DesignPatternsVisualizer = () => {
  const [pattern, setPattern] = useState('observer');

  const patterns = {
    observer: {
      label: 'Observer', color: '#4facfe',
      desc: 'Objects subscribe to events. Publisher notifies all subscribers when state changes.',
      code: `class EventEmitter {
  #listeners = new Map();
  on(event, cb) {
    if (!this.#listeners.has(event))
      this.#listeners.set(event, []);
    this.#listeners.get(event).push(cb);
    return () => this.off(event, cb); // returns unsubscribe fn
  }
  emit(event, data) {
    this.#listeners.get(event)?.forEach(cb => cb(data));
  }
}
const store = new EventEmitter();
const unsub = store.on('update', data => render(data));
// cleanup: unsub()`,
      examples: ['React Context', 'Redux store', 'DOM events', 'Node.js EventEmitter'],
    },
    singleton: {
      label: 'Singleton', color: '#a855f7',
      desc: 'Ensures a class has only ONE instance. Used for global state, config, or connection pools.',
      code: `class Database {
  static #instance = null;
  #connection = null;

  static getInstance() {
    if (!Database.#instance) {
      Database.#instance = new Database();
    }
    return Database.#instance; // always same instance
  }
  connect(url) { this.#connection = url; }
}

const db1 = Database.getInstance();
const db2 = Database.getInstance();
console.log(db1 === db2); // true — same object`,
      examples: ['DB connection pool', 'App config', 'Logger', 'Redux store'],
    },
    factory: {
      label: 'Factory', color: '#00ff88',
      desc: 'Creates objects without specifying exact class. Centralizes object creation logic.',
      code: `// React component factory pattern
function createButton(type) {
  const components = {
    primary: ({ children }) => (
      <button className="btn-primary">{children}</button>
    ),
    ghost: ({ children }) => (
      <button className="btn-ghost">{children}</button>
    ),
    danger: ({ children }) => (
      <button className="btn-danger">{children}</button>
    ),
  };
  return components[type] || components.primary;
}

const PrimaryBtn = createButton('primary');
const DangerBtn = createButton('danger');`,
      examples: ['React.createElement', 'createStore (Redux)', 'axios.create()', 'Component libraries'],
    },
    proxy: {
      label: 'Proxy', color: '#eab308',
      desc: 'Intercepts object operations. Used for validation, caching, logging, and reactivity.',
      code: `// Reactive state with Proxy (like Vue 3)
function reactive(obj) {
  return new Proxy(obj, {
    get(target, key) {
      track(key); // track dependency
      return target[key];
    },
    set(target, key, value) {
      target[key] = value;
      trigger(key); // notify subscribers
      return true;
    }
  });
}

const state = reactive({ count: 0 });
state.count++; // triggers re-render automatically`,
      examples: ['Vue 3 reactivity', 'MobX', 'Form validation', 'API mocking'],
    },
  };

  const cur = patterns[pattern];

  return (
    <div style={viz.wrap}>
      <div style={viz.title}>🏗 Design Patterns — Frontend Essentials</div>
      <Row style={{ marginBottom: 14 }}>
        {Object.entries(patterns).map(([key, p]) => (
          <button key={key} style={{ ...viz.btn, borderColor: pattern === key ? p.color : '#2a3f5f', color: pattern === key ? p.color : '#9ca3af', background: pattern === key ? p.color + '15' : 'transparent' }} onClick={() => setPattern(key)}>{p.label}</button>
        ))}
      </Row>
      <div style={{ ...viz.desc, borderColor: cur.color + '40', color: '#e2e8f0', marginBottom: 14 }}>{cur.desc}</div>
      <div style={viz.code}>{cur.code}</div>
      <div>
        <div style={{ fontSize: 10, color: cur.color, letterSpacing: 2, marginBottom: 8 }}>REAL USAGE:</div>
        <Row>
          {cur.examples.map((ex, i) => <span key={i} style={viz.tag(cur.color)}>{ex}</span>)}
        </Row>
      </div>
    </div>
  );
};