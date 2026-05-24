export const CHALLENGES = {

  // ─── JS CORE ──────────────────────────────────────────────────────
  'event-loop': {
    prompt: `CHALLENGE: Predict the exact output of this code, then explain WHY each line prints in that order.

REQ 1: Write the output as a comma-separated list (e.g. "A, B, C, D")
REQ 2: Explain which queue (call stack / microtask / macrotask) each console.log belongs to

\`\`\`js
console.log('A');
setTimeout(() => console.log('B'), 0);
Promise.resolve()
  .then(() => {
    console.log('C');
    Promise.resolve().then(() => console.log('D'));
  })
  .then(() => console.log('E'));
console.log('F');
\`\`\`

HINT: Microtasks drain completely before any macrotask runs — including newly queued microtasks.`,
    solution: `Output: A, F, C, D, E, B

A → sync (call stack)
F → sync (call stack)
C → microtask (.then)
D → microtask (nested .then, queued while C ran — drains before E)
E → microtask (outer .then chain continues after C's .then resolved)
B → macrotask (setTimeout fires last)

Key insight: When C runs, it queues D as a new microtask. The engine drains ALL microtasks before moving on — so D runs before E even though E was queued first.`,
    starterCode: `// Write the output order:
// Output: ?

// Explain each:
// 'A' runs because: ...
// 'F' runs because: ...
// 'C' runs because: ...
// 'D' runs because: ...
// 'E' runs because: ...
// 'B' runs because: ...`,
  },

  'hoisting': {
    prompt: `CHALLENGE: Fix the 3 hoisting bugs in this code and explain what each bug is.

REQ 1: Identify what type of hoisting issue each bug is (var, let/TDZ, function expression)
REQ 2: Fix all 3 bugs without changing the program's logic

\`\`\`js
// Bug 1
console.log(userName); // should print 'Alice'
let userName = 'Alice';

// Bug 2
const result = multiply(4, 5); // should return 20
const multiply = function(a, b) { return a * b; };

// Bug 3
var counter = 0;
function increment() {
  console.log(counter); // expected: 0, actual: ?
  var counter = 1;
  return counter;
}
increment();
\`\`\`

HINT: Each bug requires a different fix — not just moving code around.`,
    solution: `// Bug 1: let is in TDZ — move declaration above usage
let userName = 'Alice';
console.log(userName); // ✓

// Bug 2: function expression not hoisted — use function declaration
function multiply(a, b) { return a * b; } // ✓
const result = multiply(4, 5);

// Bug 3: var inside function hoists to function scope
// inner 'var counter' shadows outer, starts as undefined
// Fix: remove inner var, use outer counter or rename
function increment() {
  console.log(counter); // now sees outer counter = 0 ✓
  counter = 1;
  return counter;
}`,
    starterCode: `// Fix Bug 1 — TDZ error
console.log(userName);
let userName = 'Alice';

// Fix Bug 2 — function expression not hoisted
const result = multiply(4, 5);
const multiply = function(a, b) { return a * b; };

// Fix Bug 3 — var shadowing
var counter = 0;
function increment() {
  console.log(counter);
  var counter = 1;
  return counter;
}`,
  },

  'closure-def': {
    prompt: `CHALLENGE: Implement a createBank() function using closures for private state.

REQ 1: balance must be completely private (not accessible via dot notation)
REQ 2: Implement deposit(amount), withdraw(amount), getBalance()
REQ 3: withdraw should throw an Error if amount exceeds balance
REQ 4: Add a transaction history — getHistory() returns array of all transactions

HINT: Everything lives in the closure — no class, no this, no prototype needed.`,
    solution: `function createBank(initialBalance = 0) {
  let balance = initialBalance;
  const history = [];

  const record = (type, amount) => {
    history.push({ type, amount, balance, time: Date.now() });
  };

  return {
    deposit(amount) {
      if (amount <= 0) throw new Error('Amount must be positive');
      balance += amount;
      record('deposit', amount);
      return balance;
    },
    withdraw(amount) {
      if (amount > balance) throw new Error('Insufficient funds');
      balance -= amount;
      record('withdraw', amount);
      return balance;
    },
    getBalance: () => balance,
    getHistory: () => [...history], // return copy, not reference
  };
}

const account = createBank(100);
account.deposit(50);   // 150
account.withdraw(30);  // 120
account.getBalance();  // 120
account.balance;       // undefined ← truly private!`,
    starterCode: `function createBank(initialBalance = 0) {
  // Your private state here

  return {
    deposit(amount) {
      // implement
    },
    withdraw(amount) {
      // implement — throw if insufficient funds
    },
    getBalance() {
      // implement
    },
    getHistory() {
      // implement
    },
  };
}

// Test your implementation:
const account = createBank(100);
console.log(account.deposit(50));   // 150
console.log(account.withdraw(30));  // 120
console.log(account.getBalance());  // 120
console.log(account.balance);       // undefined (private!)
console.log(account.getHistory());  // [{type:'deposit',...}, ...]`,
  },

  'this-keyword': {
    prompt: `CHALLENGE: Fix the 4 broken 'this' bindings in this code.

REQ 1: Fix each bug with a DIFFERENT technique (arrow function, bind, call/apply, method shorthand)
REQ 2: Add a comment on each fix explaining which binding rule you used

\`\`\`js
const timer = {
  seconds: 0,
  start() {
    setInterval(function() {
      this.seconds++; // Bug 1: this is undefined
      console.log(this.seconds);
    }, 1000);
  }
};

class EventHandler {
  constructor() { this.clicks = 0; }
  handleClick() { this.clicks++; } // Bug 2: loses this when passed as callback
}
const handler = new EventHandler();
document.addEventListener('click', handler.handleClick);

function greet(greeting, punct) {
  return greeting + ' ' + this.name + punct;
}
const user = { name: 'Alice' };
greet('Hello', '!'); // Bug 3: this.name is undefined
\`\`\``,
    solution: `// Bug 1: Arrow function inherits 'this' from start() method
start() {
  setInterval(() => { // arrow — lexical this ✓
    this.seconds++;
    console.log(this.seconds);
  }, 1000);
}

// Bug 2: bind creates permanently bound function
const handler = new EventHandler();
document.addEventListener('click', handler.handleClick.bind(handler));

// Bug 3: call explicitly sets this
greet.call(user, 'Hello', '!'); // 'Hello Alice!'
// or apply:
greet.apply(user, ['Hello', '!']);`,
    starterCode: `const timer = {
  seconds: 0,
  start() {
    // Fix Bug 1: setInterval callback loses 'this'
    setInterval(function() {
      this.seconds++;
      console.log(this.seconds);
    }, 1000);
  }
};

class EventHandler {
  constructor() { this.clicks = 0; }
  handleClick() { this.clicks++; console.log(this.clicks); }
}
const handler = new EventHandler();
// Fix Bug 2: handleClick loses 'this' when detached
document.addEventListener('click', handler.handleClick);

function greet(greeting, punct) {
  return greeting + ' ' + this.name + punct;
}
const user = { name: 'Alice' };
// Fix Bug 3: greet doesn't know who 'this' is
console.log(greet('Hello', '!'));`,
  },

  'coercion': {
    prompt: `CHALLENGE: Predict the output of each expression, then explain the coercion rules.

REQ 1: Answer all 8 expressions before running the code
REQ 2: For each surprising result, write a one-line explanation of WHY

\`\`\`js
1.  [] + []
2.  [] + {}
3.  {} + []
4.  +"3"
5.  !!"false"
6.  null + 1
7.  undefined + 1
8.  [1,2,3] == "1,2,3"
\`\`\`

HINT: Arrays convert to strings via .toString(). Objects convert to "[object Object]". The + operator prefers string concatenation over addition when either operand is a string.`,
    solution: `1.  "" + "" = ""          ([] → "" each)
2.  "" + "[object Object]" = "[object Object]"
3.  0  (in statement position, {} is a block, not object!)
4.  3  (unary + converts string to number)
5.  true (non-empty string is truthy, !! double negates)
6.  1  (null → 0 in numeric context)
7.  NaN (undefined → NaN in numeric context)
8.  true ([1,2,3].toString() === "1,2,3")`,
    starterCode: `// Predict each result before running:

console.log([] + []);        // ?
console.log([] + {});        // ?
console.log({} + []);        // ? (careful — context matters!)
console.log(+"3");           // ?
console.log(!!"false");      // ? (watch out!)
console.log(null + 1);       // ?
console.log(undefined + 1);  // ?
console.log([1,2,3] == "1,2,3"); // ?

// For each surprising one, explain why:
// [] + [] is "" because ...
// !!"false" is true because ...`,
  },

  'memory': {
    prompt: `CHALLENGE: Find and fix the 3 memory leaks in this React component.

REQ 1: Identify each leak type (event listener, timer, subscription, closure)
REQ 2: Fix each with proper cleanup
REQ 3: Explain what would happen in production without the fix

\`\`\`js
function Dashboard({ userId }) {
  const [data, setData] = useState(null);

  // Leak 1
  useEffect(() => {
    window.addEventListener('resize', () => {
      console.log('resized');
    });
  }, []);

  // Leak 2
  useEffect(() => {
    const id = setInterval(() => {
      fetch('/api/live-data').then(r => r.json()).then(setData);
    }, 3000);
  }, []);

  // Leak 3
  useEffect(() => {
    fetch('/api/user/' + userId)
      .then(r => r.json())
      .then(data => setData(data)); // no cancel on unmount!
  }, [userId]);

  return <div>{data?.name}</div>;
}
\`\`\``,
    solution: `function Dashboard({ userId }) {
  const [data, setData] = useState(null);

  // Fix 1: Remove listener on cleanup
  useEffect(() => {
    const handler = () => console.log('resized');
    window.addEventListener('resize', handler);
    return () => window.removeEventListener('resize', handler);
  }, []);

  // Fix 2: Clear interval on cleanup
  useEffect(() => {
    const id = setInterval(() => {
      fetch('/api/live-data').then(r => r.json()).then(setData);
    }, 3000);
    return () => clearInterval(id); // stop polling on unmount
  }, []);

  // Fix 3: Abort fetch on cleanup / userId change
  useEffect(() => {
    const controller = new AbortController();
    fetch('/api/user/' + userId, { signal: controller.signal })
      .then(r => r.json())
      .then(setData)
      .catch(e => { if (e.name !== 'AbortError') console.error(e); });
    return () => controller.abort();
  }, [userId]);

  return <div>{data?.name}</div>;
}`,
    starterCode: `function Dashboard({ userId }) {
  const [data, setData] = useState(null);

  // Fix Leak 1: event listener never removed
  useEffect(() => {
    window.addEventListener('resize', () => {
      console.log('resized');
    });
  }, []);

  // Fix Leak 2: interval never cleared
  useEffect(() => {
    const id = setInterval(() => {
      fetch('/api/live-data').then(r => r.json()).then(setData);
    }, 3000);
  }, []);

  // Fix Leak 3: fetch result updates unmounted component
  useEffect(() => {
    fetch('/api/user/' + userId)
      .then(r => r.json())
      .then(data => setData(data));
  }, [userId]);

  return <div>{data?.name}</div>;
}`,
  },

  // ─── ASYNC ───────────────────────────────────────────────────────
  'promise-internals': {
    prompt: `CHALLENGE: Implement a promiseAll() function that mirrors Promise.all() behavior.

REQ 1: Takes an array of promises, returns a promise
REQ 2: Resolves with array of results when ALL resolve (maintaining order)
REQ 3: Rejects immediately if ANY promise rejects
REQ 4: Handle edge case: empty array should resolve with []

HINT: You'll need a counter to track when all promises are done. Don't use Promise.all() internally!`,
    solution: `function promiseAll(promises) {
  return new Promise((resolve, reject) => {
    if (promises.length === 0) return resolve([]);

    const results = new Array(promises.length);
    let resolved = 0;

    promises.forEach((promise, index) => {
      Promise.resolve(promise) // handle non-promise values
        .then(value => {
          results[index] = value; // maintain order!
          resolved++;
          if (resolved === promises.length) {
            resolve(results);
          }
        })
        .catch(reject); // fail fast on first rejection
    });
  });
}

// Test:
promiseAll([
  Promise.resolve(1),
  Promise.resolve(2),
  Promise.resolve(3),
]).then(console.log); // [1, 2, 3]

promiseAll([
  Promise.resolve(1),
  Promise.reject('error'),
  Promise.resolve(3),
]).catch(console.error); // 'error'`,
    starterCode: `function promiseAll(promises) {
  return new Promise((resolve, reject) => {
    // Handle empty array edge case

    // Track results and count resolved

    // Iterate promises — resolve when all done, reject on first failure
  });
}

// Test cases:
promiseAll([Promise.resolve(1), Promise.resolve(2)])
  .then(res => console.log(res)); // [1, 2]

promiseAll([])
  .then(res => console.log(res)); // []

promiseAll([Promise.resolve(1), Promise.reject('fail')])
  .catch(err => console.log(err)); // 'fail'`,
  },

  'async-await': {
    prompt: `CHALLENGE: Fix this code to run all 3 fetches in parallel instead of sequentially.

REQ 1: All 3 fetch calls must start at the same time
REQ 2: Total time should be ~max(individual times) not ~sum(individual times)
REQ 3: Handle errors — if any fetch fails, log the error but still process the successful ones

\`\`\`js
async function loadDashboard(userId) {
  // Currently sequential — takes 900ms total
  const user = await fetch('/api/user/' + userId).then(r => r.json());
  const posts = await fetch('/api/posts/' + userId).then(r => r.json());
  const stats = await fetch('/api/stats/' + userId).then(r => r.json());

  return { user, posts, stats };
}
\`\`\`

HINT: Start all promises before awaiting any of them. Use Promise.allSettled for partial failure handling.`,
    solution: `async function loadDashboard(userId) {
  // Start ALL fetches simultaneously
  const [userResult, postsResult, statsResult] = await Promise.allSettled([
    fetch('/api/user/' + userId).then(r => r.json()),
    fetch('/api/posts/' + userId).then(r => r.json()),
    fetch('/api/stats/' + userId).then(r => r.json()),
  ]);

  // Process results — handle partial failures
  const user = userResult.status === 'fulfilled'
    ? userResult.value
    : (console.error('User fetch failed:', userResult.reason), null);

  const posts = postsResult.status === 'fulfilled'
    ? postsResult.value
    : (console.error('Posts fetch failed:', postsResult.reason), []);

  const stats = statsResult.status === 'fulfilled'
    ? statsResult.value
    : (console.error('Stats fetch failed:', statsResult.reason), {});

  return { user, posts, stats };
  // Total time: ~300ms (parallel) vs ~900ms (sequential)
}`,
    starterCode: `async function loadDashboard(userId) {
  // Fix: make these run in parallel, not sequentially
  const user = await fetch('/api/user/' + userId).then(r => r.json());
  const posts = await fetch('/api/posts/' + userId).then(r => r.json());
  const stats = await fetch('/api/stats/' + userId).then(r => r.json());

  return { user, posts, stats };
}

// Measure time difference:
console.time('sequential');
await loadDashboard(1);
console.timeEnd('sequential'); // ~900ms

// After fix:
console.time('parallel');
await loadDashboard(1);
console.timeEnd('parallel'); // ~300ms`,
  },

  'web-workers': {
    prompt: `CHALLENGE: Move a heavy computation off the main thread using a Web Worker.

REQ 1: The fibonacci(40) call must not freeze the UI
REQ 2: Show a loading indicator while worker computes
REQ 3: Update the UI when the result arrives
REQ 4: Terminate the worker after it returns the result

\`\`\`js
// Currently freezes the browser for ~1 second:
function App() {
  const [result, setResult] = useState(null);

  const calculate = () => {
    const answer = fibonacci(40); // BLOCKS main thread!
    setResult(answer);
  };

  return <button onClick={calculate}>Calculate fib(40)</button>;
}
\`\`\`

HINT: Create the worker inline using a Blob URL so you don't need a separate file.`,
    solution: `function fibonacci(n) {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
}

// Worker code as a string (inline worker — no separate file needed)
const workerCode = \`
  function fibonacci(n) {
    if (n <= 1) return n;
    return fibonacci(n - 1) + fibonacci(n - 2);
  }
  self.onmessage = (e) => {
    const result = fibonacci(e.data);
    self.postMessage(result);
  };
\`;

function App() {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const calculate = () => {
    setLoading(true);

    // Create inline worker from blob
    const blob = new Blob([workerCode], { type: 'application/javascript' });
    const url = URL.createObjectURL(blob);
    const worker = new Worker(url);

    worker.onmessage = (e) => {
      setResult(e.data);
      setLoading(false);
      worker.terminate(); // clean up
      URL.revokeObjectURL(url);
    };

    worker.postMessage(40); // send input
  };

  return (
    <div>
      <button onClick={calculate} disabled={loading}>
        {loading ? 'Calculating...' : 'Calculate fib(40)'}
      </button>
      {result && <p>Result: {result}</p>}
      <p>UI stays responsive! ✓</p>
    </div>
  );
}`,
    starterCode: `// The fibonacci function (intentionally slow for demo):
function fibonacci(n) {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
}

function App() {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const calculate = () => {
    // TODO: Move fibonacci(40) to a Web Worker
    // The UI should not freeze during calculation
    // Show loading state while computing
    // Clean up worker after result received

    const answer = fibonacci(40); // replace this
    setResult(answer);
  };

  return (
    <div>
      <button onClick={calculate}>{loading ? 'Computing...' : 'Calculate fib(40)'}</button>
      {result && <p>Result: {result}</p>}
    </div>
  );
}`,
  },

  // ─── REACT ────────────────────────────────────────────────────────
  'fiber': {
    prompt: `CHALLENGE: Use useTransition to make this search feel instant.

REQ 1: Typing in the input must always feel immediate (no lag)
REQ 2: The expensive filterItems() call must not block the input
REQ 3: Show a loading indicator while the list is updating
REQ 4: Explain in comments why useTransition works here

\`\`\`js
// Currently: every keystroke freezes the input for 200ms
function SearchPage({ items }) {
  const [query, setQuery] = useState('');
  const results = filterItems(items, query); // 200ms expensive operation

  return (
    <>
      <input value={query} onChange={e => setQuery(e.target.value)} />
      <ResultsList results={results} />
    </>
  );
}
\`\`\``,
    solution: `function SearchPage({ items }) {
  const [query, setQuery] = useState('');
  const [deferredQuery, setDeferredQuery] = useState('');
  const [isPending, startTransition] = useTransition();

  const handleChange = (e) => {
    // HIGH priority: update input immediately (never deferred)
    setQuery(e.target.value);

    // LOW priority: expensive filter can be interrupted
    // React Fiber can pause this work if user types again
    startTransition(() => {
      setDeferredQuery(e.target.value);
    });
  };

  // Only recompute when deferredQuery changes (low priority)
  const results = filterItems(items, deferredQuery);

  return (
    <>
      <input value={query} onChange={handleChange} />
      {/* Show stale results with opacity while updating */}
      <div style={{ opacity: isPending ? 0.5 : 1 }}>
        <ResultsList results={results} />
      </div>
      {isPending && <span>Updating results...</span>}
    </>
  );
  // Why it works: Fiber can interrupt the transition work
  // when a higher-priority update (typing) comes in.
}`,
    starterCode: `import { useState, useTransition } from 'react';

function filterItems(items, query) {
  // Simulates expensive filtering (200ms)
  const start = performance.now();
  while (performance.now() - start < 200) {}
  return items.filter(i => i.name.toLowerCase().includes(query.toLowerCase()));
}

function SearchPage({ items }) {
  const [query, setQuery] = useState('');

  // TODO: Add useTransition so typing is never blocked
  // 1. Mark the filterItems state update as a transition
  // 2. Show isPending state in the UI
  // 3. Input value should update immediately always

  const results = filterItems(items, query);

  return (
    <>
      <input value={query} onChange={e => setQuery(e.target.value)} />
      <ResultsList results={results} />
    </>
  );
}`,
  },

  'virtual-dom': {
    prompt: `CHALLENGE: Fix the key-related bugs in this list component and explain each fix.

REQ 1: Identify why items lose their input state when a new item is prepended
REQ 2: Fix the key prop to prevent input state loss
REQ 3: Add a working prepend and delete function
REQ 4: Demonstrate the bug first, then show your fix works

\`\`\`js
function TodoList() {
  const [todos, setTodos] = useState([
    { text: 'Buy groceries' },
    { text: 'Walk dog' },
    { text: 'Write code' },
  ]);

  const prepend = (text) => setTodos(prev => [{ text }, ...prev]);
  const remove = (index) => setTodos(prev => prev.filter((_, i) => i !== index));

  return (
    <ul>
      {todos.map((todo, index) => (
        <li key={index}> {/* BUG: index key */}
          {todo.text}
          <input placeholder="add note..." />
        </li>
      ))}
    </ul>
  );
}
\`\`\``,
    solution: `function TodoList() {
  const [todos, setTodos] = useState([
    { id: 1, text: 'Buy groceries' },
    { id: 2, text: 'Walk dog' },
    { id: 3, text: 'Write code' },
  ]);
  const nextId = useRef(4);

  const prepend = (text) => {
    setTodos(prev => [{ id: nextId.current++, text }, ...prev]);
  };

  const remove = (id) => {
    setTodos(prev => prev.filter(t => t.id !== id));
  };

  return (
    <ul>
      {todos.map(todo => (
        // FIX: stable unique ID instead of index
        <li key={todo.id}>
          {todo.text}
          <input placeholder="add note..." />
          <button onClick={() => remove(todo.id)}>✕</button>
        </li>
      ))}
    </ul>
  );
  // Why index fails: prepending shifts all indices.
  // key=0 now points to the NEW item, so React REUSES
  // the existing DOM node (with its input value) for it.
  // With stable IDs, React correctly moves the DOM nodes.
}`,
    starterCode: `function TodoList() {
  const [todos, setTodos] = useState([
    { text: 'Buy groceries' },
    { text: 'Walk dog' },
    { text: 'Write code' },
  ]);

  // Step 1: Type something in any input field
  // Step 2: Click prepend — notice input values shift to wrong items!
  // Step 3: Fix the key prop and data structure to prevent this

  const prepend = (text) => {
    setTodos(prev => [{ text }, ...prev]);
  };

  return (
    <>
      <button onClick={() => prepend('New task')}>Prepend item</button>
      <ul>
        {todos.map((todo, index) => (
          <li key={index}>
            {todo.text}
            <input placeholder="add a note..." />
          </li>
        ))}
      </ul>
    </>
  );
}`,
  },

  'useeffect-deep': {
    prompt: `CHALLENGE: Fix the stale closure bug and add proper cleanup to this polling component.

REQ 1: The displayed count must always show the real current value (fix stale closure)
REQ 2: Polling must stop when the component unmounts
REQ 3: Polling must restart with the new URL when the url prop changes
REQ 4: Avoid unnecessary effect re-runs

\`\`\`js
function DataPoller({ url }) {
  const [data, setData] = useState(null);
  const [count, setCount] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      fetch(url).then(r => r.json()).then(setData);
      console.log('Poll count:', count); // always logs 0!
    }, 3000);
  }, []); // missing deps — stale closure AND no cleanup

  return <div>Count: {count} | Data: {data?.name}</div>;
}
\`\`\``,
    solution: `function DataPoller({ url }) {
  const [data, setData] = useState(null);
  const [count, setCount] = useState(0);
  const countRef = useRef(count);

  // Keep ref in sync with state for use inside interval
  useEffect(() => { countRef.current = count; }, [count]);

  useEffect(() => {
    const id = setInterval(() => {
      fetch(url)
        .then(r => r.json())
        .then(data => {
          setData(data);
          setCount(c => c + 1); // functional update — no stale closure
          console.log('Poll count:', countRef.current); // ✓ always current
        });
    }, 3000);

    return () => clearInterval(id); // cleanup on unmount or url change

  }, [url]); // re-run when url changes

  return <div>Count: {count} | Data: {data?.name}</div>;
}`,
    starterCode: `function DataPoller({ url }) {
  const [data, setData] = useState(null);
  const [count, setCount] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      fetch(url).then(r => r.json()).then(setData);
      setCount(count + 1);
      // BUG: count is stale — always 0
      console.log('Poll count:', count);
    }, 3000);
    // BUG: no cleanup — interval runs forever after unmount
    // BUG: empty deps — won't restart when url changes
  }, []);

  return <div>Count: {count} | Data: {data?.name}</div>;
}`,
  },

  'render-cycle': {
    prompt: `CHALLENGE: Optimize this component so it only re-renders when strictly necessary.

REQ 1: The Header must NOT re-render when count changes
REQ 2: The ExpensiveList must NOT re-render when title changes
REQ 3: The handleAdd callback must be stable across renders
REQ 4: Use the React DevTools Profiler approach — add comments explaining what you'd check

\`\`\`js
// Currently: ALL children re-render on every parent state change
function Dashboard() {
  const [count, setCount] = useState(0);
  const [title, setTitle] = useState('My Dashboard');
  const [items, setItems] = useState([]);

  const handleAdd = (item) => setItems(prev => [...prev, item]);

  return (
    <div>
      <Header title={title} />
      <Counter count={count} onIncrement={() => setCount(c => c + 1)} />
      <ExpensiveList items={items} onAdd={handleAdd} />
    </div>
  );
}
\`\`\``,
    solution: `// Memoize child components + stabilize callbacks
const Header = React.memo(({ title }) => {
  // Only re-renders when title changes
  return <h1>{title}</h1>;
});

const ExpensiveList = React.memo(({ items, onAdd }) => {
  // Only re-renders when items or onAdd reference changes
  return <ul>{items.map(i => <li key={i.id}>{i.name}</li>)}</ul>;
});

function Dashboard() {
  const [count, setCount] = useState(0);
  const [title, setTitle] = useState('My Dashboard');
  const [items, setItems] = useState([]);

  // Stable reference — only changes if deps change (none here)
  const handleAdd = useCallback((item) => {
    setItems(prev => [...prev, item]);
  }, []); // no deps needed — uses functional update

  const handleIncrement = useCallback(() => {
    setCount(c => c + 1);
  }, []);

  return (
    <div>
      <Header title={title} />
      {/* DevTools: open Profiler, record, click increment */}
      {/* Header should be gray (not re-rendered) */}
      {/* ExpensiveList should be gray (not re-rendered) */}
      <Counter count={count} onIncrement={handleIncrement} />
      <ExpensiveList items={items} onAdd={handleAdd} />
    </div>
  );
}`,
    starterCode: `// Make these memoized:
function Header({ title }) {
  console.log('Header rendered'); // should not log on count change
  return <h1>{title}</h1>;
}

function ExpensiveList({ items, onAdd }) {
  console.log('ExpensiveList rendered'); // should not log on title change
  return <ul>{items.map(i => <li key={i.id}>{i.name}</li>)}</ul>;
}

function Dashboard() {
  const [count, setCount] = useState(0);
  const [title, setTitle] = useState('My Dashboard');
  const [items, setItems] = useState([]);

  // Make this callback stable:
  const handleAdd = (item) => setItems(prev => [...prev, item]);

  return (
    <div>
      <Header title={title} />
      <button onClick={() => setCount(c => c + 1)}>Count: {count}</button>
      <button onClick={() => setTitle('New Title')}>Change Title</button>
      <ExpensiveList items={items} onAdd={handleAdd} />
    </div>
  );
}`,
  },

  // ─── PERFORMANCE ─────────────────────────────────────────────────
  'cwv': {
    prompt: `CHALLENGE: Audit this HTML and fix all Core Web Vitals issues.

REQ 1: Fix the LCP issue (hero image loads but LCP score is 4.2s)
REQ 2: Fix the CLS issues (at least 2 layout shift causes present)
REQ 3: Fix the INP issue (button handler blocks main thread)
REQ 4: Add a comment next to each fix explaining which metric it helps

\`\`\`html
<!-- Current broken version -->
<head>
  <link rel="stylesheet" href="all-styles.css"> <!-- render blocking -->
  <script src="analytics.js"></script> <!-- render blocking -->
</head>
<body>
  <!-- No dimensions on LCP image -->
  <img src="hero.jpg" loading="lazy" class="hero">

  <!-- Font loads late causing text shift -->
  <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Poppins">

  <!-- Ad slot with no reserved space -->
  <div class="ad-slot"></div>

  <!-- Heavy click handler blocks INP -->
  <button onclick="processAll()">Generate Report</button>
</body>
\`\`\``,
    solution: `<head>
  <!-- FIX LCP: Preload critical CSS, defer non-critical -->
  <style>/* inline critical CSS here */</style>
  <link rel="preload" href="hero.jpg" as="image" fetchpriority="high"> <!-- LCP ✓ -->

  <!-- FIX INP: defer analytics — not render-critical -->
  <script src="analytics.js" defer></script>

  <!-- FIX CLS: preconnect to font origin -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Poppins&display=swap">
  <!-- font-display:swap prevents invisible text + size-adjust reduces shift -->
</head>
<body>
  <!-- FIX LCP: add dimensions, remove lazy, add fetchpriority -->
  <img src="hero.jpg" width="1200" height="600"
       fetchpriority="high" alt="Hero"
       class="hero"> <!-- NOT loading="lazy" — this is LCP element! -->

  <!-- FIX CLS: reserve space for ad -->
  <div class="ad-slot" style="min-height: 250px; width: 100%"></div>

  <!-- FIX INP: yield to browser, break up work -->
  <button onclick="handleReport()">Generate Report</button>
  <script>
    async function handleReport() {
      updateUI('Generating...'); // respond immediately
      await scheduler.yield();  // yield — browser can paint
      await processAll();       // heavy work after yield
    }
  </script>
</body>`,
    starterCode: `<!-- Audit and fix this HTML for Core Web Vitals -->
<!-- Label each fix: [LCP], [CLS], or [INP] -->

<head>
  <link rel="stylesheet" href="all-styles.css">
  <script src="analytics.js"></script>
  <!-- Add font fix here -->
</head>
<body>
  <!-- Fix 1: LCP image -->
  <img src="hero.jpg" loading="lazy" class="hero">

  <!-- Fix 2: Ad slot CLS -->
  <div class="ad-slot"></div>

  <!-- Fix 3: INP button -->
  <button onclick="processAll()">Generate Report</button>

  <script>
    function processAll() {
      // This blocks for 300ms — fix it
      const start = Date.now();
      while (Date.now() - start < 300) {}
      updateUI('Done');
    }
  </script>
</body>`,
  },

  'code-splitting': {
    prompt: `CHALLENGE: Add route-based and component-based code splitting to this React app.

REQ 1: Each route (Home, Dashboard, Settings) must be a separate chunk
REQ 2: The HeavyChart component must only load when the user clicks "Show Chart"
REQ 3: Add a loading skeleton for each lazy-loaded route
REQ 4: Add prefetch-on-hover for the Dashboard link

\`\`\`js
// Currently: everything in one bundle
import Home from './Home';
import Dashboard from './Dashboard';
import Settings from './Settings';
import HeavyChart from './HeavyChart';

function App() {
  const [showChart, setShowChart] = useState(false);
  return (
    <Router>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/dashboard">Dashboard</Link>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>
      {showChart && <HeavyChart />}
    </Router>
  );
}
\`\`\``,
    solution: `import { lazy, Suspense, useState } from 'react';
import { Routes, Route, Link } from 'react-router-dom';

// REQ 1: Route-based splitting — each becomes a separate chunk
const Home = lazy(() => import('./Home'));
const Dashboard = lazy(() => import('./Dashboard'));
const Settings = lazy(() => import('./Settings'));

// REQ 2: Component-based — only loads when shown
const HeavyChart = lazy(() => import('./HeavyChart'));

// REQ 3: Reusable skeleton fallback
const PageSkeleton = () => (
  <div style={{ padding: 24 }}>
    <div className="skeleton" style={{ height: 32, width: '60%', marginBottom: 16 }} />
    <div className="skeleton" style={{ height: 16, width: '80%', marginBottom: 8 }} />
    <div className="skeleton" style={{ height: 16, width: '70%' }} />
  </div>
);

function App() {
  const [showChart, setShowChart] = useState(false);

  // REQ 4: Prefetch dashboard chunk on hover
  const prefetchDashboard = () => import('./Dashboard');

  return (
    <Router>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/dashboard" onMouseEnter={prefetchDashboard}>
          Dashboard
        </Link>
      </nav>
      <Suspense fallback={<PageSkeleton />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </Suspense>
      <button onClick={() => setShowChart(true)}>Show Chart</button>
      {showChart && (
        <Suspense fallback={<div>Loading chart...</div>}>
          <HeavyChart />
        </Suspense>
      )}
    </Router>
  );
}`,
    starterCode: `// Convert from static imports to lazy/Suspense
import Home from './Home';
import Dashboard from './Dashboard';
import Settings from './Settings';
import HeavyChart from './HeavyChart';

function App() {
  const [showChart, setShowChart] = useState(false);

  return (
    <Router>
      <nav>
        <Link to="/">Home</Link>
        {/* Add prefetch on hover for Dashboard */}
        <Link to="/dashboard">Dashboard</Link>
      </nav>
      {/* Wrap Routes in Suspense with skeleton fallback */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>
      <button onClick={() => setShowChart(true)}>Show Chart</button>
      {/* Wrap HeavyChart in Suspense — only load when shown */}
      {showChart && <HeavyChart />}
    </Router>
  );
}`,
  },

  // ─── SECURITY ────────────────────────────────────────────────────
  'xss': {
    prompt: `CHALLENGE: Find and fix all 4 XSS vulnerabilities in this comment system.

REQ 1: Fix each vulnerability with the most appropriate solution
REQ 2: Add a Content Security Policy header that would block any remaining inline scripts
REQ 3: Explain why each fix works

\`\`\`js
// Server-side (Express)
app.get('/comments', (req, res) => {
  const comments = getComments();
  // Vuln 1: directly injecting into HTML template
  res.send(\`<html><body>\${comments.map(c => \`<div>\${c.text}</div>\`).join('')}</body></html>\`);
});

// Client-side (React)
function Comment({ text, authorUrl }) {
  return (
    <div>
      {/* Vuln 2 */}
      <div dangerouslySetInnerHTML={{ __html: text }} />
      {/* Vuln 3 */}
      <a href={authorUrl}>Visit profile</a>
      {/* Vuln 4 */}
      <div ref={el => el && (el.innerHTML = text)} />
    </div>
  );
}
\`\`\``,
    solution: `// Fix 1: Escape HTML in server template
import { escapeHtml } from 'escape-html'; // or implement manually
app.get('/comments', (req, res) => {
  const comments = getComments();
  res.send(\`<html>
    <body>
      \${comments.map(c => \`<div>\${escapeHtml(c.text)}</div>\`).join('')}
    </body>
  </html>\`);
});

// Fix 2: Never use dangerouslySetInnerHTML with user content
// Use {text} — React escapes it automatically
function Comment({ text, authorUrl }) {
  // Fix 3: Validate URL protocol to prevent javascript: URLs
  const safeUrl = (() => {
    try {
      const url = new URL(authorUrl);
      return ['http:', 'https:'].includes(url.protocol) ? authorUrl : '#';
    } catch { return '#'; }
  })();

  return (
    <div>
      {/* Fix 2: textContent equivalent — safe */}
      <div>{text}</div>
      {/* Fix 3: validated URL */}
      <a href={safeUrl} rel="noopener noreferrer">Visit profile</a>
      {/* Fix 4: use textContent not innerHTML */}
      <div ref={el => el && (el.textContent = text)} />
    </div>
  );
}

// Fix: CSP header in Express (blocks inline scripts entirely)
app.use((req, res, next) => {
  res.setHeader('Content-Security-Policy',
    "default-src 'self'; script-src 'self'; object-src 'none';"
  );
  next();
});`,
    starterCode: `// Find and fix all 4 XSS vulnerabilities
// Label each fix: [Server Template] [dangerouslySetInnerHTML] [href injection] [innerHTML ref]

// Server (Express)
app.get('/comments', (req, res) => {
  const comments = getComments();
  // Vuln 1: unescaped user content in template
  res.send(\`<html><body>\${comments.map(c =>
    \`<div>\${c.text}</div>\`).join('')}</body></html>\`);
});

// Client (React)
function Comment({ text, authorUrl }) {
  return (
    <div>
      {/* Vuln 2: dangerouslySetInnerHTML */}
      <div dangerouslySetInnerHTML={{ __html: text }} />

      {/* Vuln 3: unvalidated href — could be javascript:alert(1) */}
      <a href={authorUrl}>Visit profile</a>

      {/* Vuln 4: innerHTML via ref */}
      <div ref={el => el && (el.innerHTML = text)} />
    </div>
  );
}

// Add CSP header below:`,
  },

  'csrf': {
    prompt: `CHALLENGE: Implement CSRF protection for this Express API.

REQ 1: Generate a CSRF token and send it in a cookie on GET requests
REQ 2: Validate the token on all state-changing requests (POST/PUT/DELETE)
REQ 3: Use the Double Submit Cookie pattern
REQ 4: Explain why SameSite=Strict alone isn't always enough

\`\`\`js
const express = require('express');
const app = express();

// Currently unprotected:
app.post('/api/transfer', authenticate, (req, res) => {
  const { to, amount } = req.body;
  transferMoney(req.user.id, to, amount);
  res.json({ success: true });
});
\`\`\``,
    solution: `const crypto = require('crypto');
const cookieParser = require('cookie-parser');
app.use(cookieParser());

// Generate CSRF token middleware
function generateCsrfToken(req, res, next) {
  if (!req.cookies.csrfToken) {
    const token = crypto.randomBytes(32).toString('hex');
    // Set in cookie (readable by JS — intentional for double submit)
    res.cookie('csrfToken', token, {
      httpOnly: false, // JS needs to read this
      secure: true,
      sameSite: 'strict',
    });
  }
  next();
}

// Validate CSRF token middleware
function validateCsrf(req, res, next) {
  const cookieToken = req.cookies.csrfToken;
  // Client must send cookie value in a header too
  const headerToken = req.headers['x-csrf-token'];

  if (!cookieToken || !headerToken || cookieToken !== headerToken) {
    return res.status(403).json({ error: 'CSRF validation failed' });
  }
  next();
}

// Apply to all state-changing routes
app.post('/api/transfer', authenticate, validateCsrf, (req, res) => {
  transferMoney(req.user.id, req.body.to, req.body.amount);
  res.json({ success: true });
});

// Client-side: read cookie and send in header
async function transfer(to, amount) {
  const csrfToken = document.cookie.match(/csrfToken=([^;]+)/)?.[1];
  await fetch('/api/transfer', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-CSRF-Token': csrfToken, // attacker can't read our cookie!
    },
    body: JSON.stringify({ to, amount }),
  });
}

// Why SameSite=Strict alone isn't always enough:
// 1. Old browsers don't support it
// 2. Some OAuth flows require cross-site requests
// 3. Defense in depth: use BOTH SameSite AND CSRF tokens`,
    starterCode: `const express = require('express');
const app = express();

// TODO: Implement Double Submit Cookie CSRF protection
// 1. Middleware to generate CSRF token and set in cookie
// 2. Middleware to validate token on state-changing requests
// 3. Apply validation to the transfer route

app.post('/api/transfer', authenticate, (req, res) => {
  // This should be protected
  const { to, amount } = req.body;
  transferMoney(req.user.id, to, amount);
  res.json({ success: true });
});

// Also write the client-side fetch that sends the token:
async function transfer(to, amount) {
  // Read CSRF token from cookie and include in request header
}`,
  },

  'auth-patterns': {
    prompt: `CHALLENGE: Implement secure token storage and auto-refresh in this auth service.

REQ 1: Store access token in memory (not localStorage)
REQ 2: Store refresh token in httpOnly cookie (backend sets it)
REQ 3: Auto-refresh when a 401 is received — retry original request
REQ 4: Handle refresh failure — redirect to login
REQ 5: Queue concurrent requests during refresh to prevent multiple refresh calls

\`\`\`js
// Currently insecure:
async function login(email, password) {
  const { accessToken, refreshToken } = await api.post('/auth/login', { email, password });
  localStorage.setItem('accessToken', accessToken); // ❌
  localStorage.setItem('refreshToken', refreshToken); // ❌
}
\`\`\``,
    solution: `// Secure token service
const tokenService = (() => {
  let accessToken = null; // in-memory only

  return {
    getToken: () => accessToken,
    setToken: (token) => { accessToken = token; },
    clearToken: () => { accessToken = null; },
  };
})();

// Login — server sets httpOnly cookie for refresh token automatically
async function login(email, password) {
  const { data } = await axios.post('/auth/login', { email, password }, {
    withCredentials: true, // receive httpOnly cookie
  });
  tokenService.setToken(data.accessToken); // memory only
  return data.user;
}

// Axios interceptor with queuing for concurrent requests
let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
  failedQueue.forEach(p => error ? p.reject(error) : p.resolve(token));
  failedQueue = [];
};

axios.interceptors.response.use(
  response => response,
  async error => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        // Queue this request until refresh completes
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        }).then(token => {
          originalRequest.headers['Authorization'] = 'Bearer ' + token;
          return axios(originalRequest);
        });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const { data } = await axios.post('/auth/refresh', {}, {
          withCredentials: true, // sends httpOnly refresh cookie
        });
        tokenService.setToken(data.accessToken);
        processQueue(null, data.accessToken);
        originalRequest.headers['Authorization'] = 'Bearer ' + data.accessToken;
        return axios(originalRequest);
      } catch (refreshError) {
        processQueue(refreshError, null);
        tokenService.clearToken();
        window.location.href = '/login'; // session expired
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }
    return Promise.reject(error);
  }
);`,
    starterCode: `// Refactor this insecure auth service:

// 1. Replace localStorage with in-memory storage for access token
async function login(email, password) {
  const { accessToken, refreshToken } = await api.post('/auth/login', { email, password });
  localStorage.setItem('accessToken', accessToken);   // ❌ fix this
  localStorage.setItem('refreshToken', refreshToken); // ❌ fix this
}

// 2. Add axios interceptor that:
//    - Attaches access token to every request
//    - Auto-refreshes on 401
//    - Queues concurrent requests during refresh
//    - Redirects to /login if refresh fails

api.interceptors.request.use(config => {
  // Attach token here
  return config;
});

api.interceptors.response.use(
  response => response,
  async error => {
    // Handle 401 and refresh here
  }
);`,
  },

  // ─── MACHINE CODING ───────────────────────────────────────────────
  'mc-autocomplete': {
    prompt: `CHALLENGE: Build a production-grade Autocomplete component.

REQ 1: Debounce API calls by 300ms
REQ 2: Handle race conditions — only show results for the LATEST query
REQ 3: Keyboard navigation: ↑↓ to move, Enter to select, Escape to close
REQ 4: Accessibility: proper ARIA roles (combobox, listbox, option)
REQ 5: Loading state while fetching

HINT: Use AbortController to cancel in-flight requests when a new query arrives.`,
    solution: `function Autocomplete({ fetchSuggestions, onSelect, placeholder = 'Search...' }) {
  const [query, setQuery] = useState('');
  const [options, setOptions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [highlighted, setHighlighted] = useState(-1);
  const abortRef = useRef(null);
  const inputRef = useRef(null);

  // Debounced fetch with race condition prevention
  const search = useMemo(() => debounce(async (q) => {
    if (!q.trim()) { setOptions([]); setOpen(false); return; }
    abortRef.current?.abort();
    abortRef.current = new AbortController();
    setLoading(true);
    try {
      const results = await fetchSuggestions(q, abortRef.current.signal);
      setOptions(results);
      setOpen(true);
      setHighlighted(-1);
    } catch (e) {
      if (e.name !== 'AbortError') setOptions([]);
    } finally {
      setLoading(false);
    }
  }, 300), [fetchSuggestions]);

  const handleKeyDown = (e) => {
    if (!open) return;
    if (e.key === 'ArrowDown') { e.preventDefault(); setHighlighted(h => Math.min(h + 1, options.length - 1)); }
    if (e.key === 'ArrowUp') { e.preventDefault(); setHighlighted(h => Math.max(h - 1, -1)); }
    if (e.key === 'Enter' && highlighted >= 0) { handleSelect(options[highlighted]); }
    if (e.key === 'Escape') { setOpen(false); inputRef.current?.focus(); }
  };

  const handleSelect = (option) => {
    setQuery(option.label);
    setOpen(false);
    onSelect(option);
  };

  return (
    <div role="combobox" aria-expanded={open} aria-haspopup="listbox">
      <input ref={inputRef} value={query} placeholder={placeholder}
        aria-autocomplete="list"
        aria-activedescendant={highlighted >= 0 ? \`option-\${highlighted}\` : undefined}
        onChange={e => { setQuery(e.target.value); search(e.target.value); }}
        onKeyDown={handleKeyDown} />
      {loading && <span aria-live="polite">Searching...</span>}
      {open && options.length > 0 && (
        <ul role="listbox" style={{ listStyle: 'none', margin: 0, padding: 0 }}>
          {options.map((opt, i) => (
            <li key={opt.id} id={\`option-\${i}\`} role="option"
              aria-selected={i === highlighted}
              style={{ background: i === highlighted ? '#1e2d40' : 'transparent', padding: '8px 12px', cursor: 'pointer' }}
              onMouseEnter={() => setHighlighted(i)}
              onClick={() => handleSelect(opt)}>
              {opt.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}`,
    starterCode: `function Autocomplete({ fetchSuggestions, onSelect, placeholder = 'Search...' }) {
  const [query, setQuery] = useState('');
  const [options, setOptions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [highlighted, setHighlighted] = useState(-1);

  // TODO:
  // 1. Debounce the search — 300ms delay
  // 2. Cancel in-flight requests when query changes (AbortController)
  // 3. Handle keyboard navigation (↑ ↓ Enter Esc)
  // 4. Add ARIA attributes (combobox, listbox, option, aria-activedescendant)
  // 5. Show loading state

  return (
    <div>
      <input value={query} placeholder={placeholder}
        onChange={e => setQuery(e.target.value)} />
      {open && (
        <ul>
          {options.map((opt, i) => (
            <li key={opt.id} onClick={() => onSelect(opt)}>
              {opt.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}`,
  },

  'mc-virtual-list': {
    prompt: `CHALLENGE: Implement a virtual scroll list that renders 100,000 items without lag.

REQ 1: Only render visible items + a small buffer (overscan)
REQ 2: Container height must remain correct (as if all items rendered)
REQ 3: Scroll position must work correctly for navigation
REQ 4: Support fixed item height of 48px

HINT: Use a scrollable container with a tall inner div. Position visible items absolutely.`,
    solution: `function VirtualList({ items, itemHeight = 48, containerHeight = 600 }) {
  const [scrollTop, setScrollTop] = useState(0);
  const containerRef = useRef(null);
  const OVERSCAN = 3; // render extra items above/below for smooth scroll

  const totalHeight = items.length * itemHeight;

  const startIndex = Math.max(0, Math.floor(scrollTop / itemHeight) - OVERSCAN);
  const visibleCount = Math.ceil(containerHeight / itemHeight) + OVERSCAN * 2;
  const endIndex = Math.min(items.length - 1, startIndex + visibleCount);

  const visibleItems = items.slice(startIndex, endIndex + 1);

  const onScroll = (e) => setScrollTop(e.target.scrollTop);

  return (
    <div ref={containerRef}
      style={{ height: containerHeight, overflow: 'auto', position: 'relative' }}
      onScroll={onScroll}>
      {/* Full height spacer — makes scrollbar correct */}
      <div style={{ height: totalHeight, position: 'relative' }}>
        {visibleItems.map((item, i) => (
          <div key={item.id}
            style={{
              position: 'absolute',
              top: (startIndex + i) * itemHeight,
              left: 0, right: 0,
              height: itemHeight,
              display: 'flex', alignItems: 'center',
              padding: '0 16px',
              borderBottom: '1px solid #1e2d40',
            }}>
            {item.name}
          </div>
        ))}
      </div>
    </div>
  );
}

// Demo with 100k items:
const items = Array.from({ length: 100000 }, (_, i) => ({
  id: i,
  name: \`Item \${i + 1}\`,
}));
<VirtualList items={items} itemHeight={48} containerHeight={600} />`,
    starterCode: `function VirtualList({ items, itemHeight = 48, containerHeight = 600 }) {
  const [scrollTop, setScrollTop] = useState(0);

  // TODO:
  // 1. Calculate which items are visible based on scrollTop
  // 2. Add overscan (render 3 extra items above/below viewport)
  // 3. Make container the right total height even though only some items render
  // 4. Position each visible item absolutely at its correct top position

  const totalHeight = items.length * itemHeight;

  // Calculate startIndex and endIndex here...

  return (
    <div style={{ height: containerHeight, overflow: 'auto' }}
      onScroll={e => setScrollTop(e.currentTarget.scrollTop)}>
      {/* Make this the right height but only render visible items */}
      <div style={{ height: totalHeight }}>
        {/* Render only visible items with absolute positioning */}
        {items.map((item, i) => (
          <div key={item.id} style={{ height: itemHeight }}>
            {item.name}
          </div>
        ))}
      </div>
    </div>
  );
}`,
  },

  // ─── DEBUGGING ────────────────────────────────────────────────────
  'db-memory-leak': {
    prompt: `CHALLENGE: Identify the memory leak in this chat application and fix it.

REQ 1: The leak must be described (what type, what's not being freed)
REQ 2: Fix using proper cleanup in useEffect
REQ 3: Explain how you would confirm the fix using Chrome DevTools heap snapshots

\`\`\`js
function ChatRoom({ roomId }) {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const socket = new WebSocket(\`wss://chat.app/rooms/\${roomId}\`);

    socket.addEventListener('message', (event) => {
      const msg = JSON.parse(event.data);
      setMessages(prev => [...prev, msg]);
    });

    // User navigates away — component unmounts
    // What happens to the socket?
  }, [roomId]);

  return <MessageList messages={messages} />;
}
\`\`\``,
    solution: `function ChatRoom({ roomId }) {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const socket = new WebSocket(\`wss://chat.app/rooms/\${roomId}\`);

    const handleMessage = (event) => {
      const msg = JSON.parse(event.data);
      setMessages(prev => [...prev, msg]);
    };

    socket.addEventListener('message', handleMessage);

    // FIX: Close socket and remove listener on cleanup
    return () => {
      socket.removeEventListener('message', handleMessage);
      socket.close();
    };
  }, [roomId]); // Also re-runs when roomId changes — closes old socket

  return <MessageList messages={messages} />;
}

// How to confirm fix with DevTools:
// 1. Open Chrome DevTools → Memory tab
// 2. Take Heap Snapshot (before navigating to ChatRoom)
// 3. Navigate to ChatRoom, send some messages
// 4. Navigate away (unmount)
// 5. Take another Heap Snapshot
// 6. Compare: look for WebSocket objects — should be 0
// 7. Also check: "Detached DOM nodes" in the snapshot comparator
// Before fix: WebSocket count grows with each mount/unmount cycle
// After fix: WebSocket is garbage collected after unmount`,
    starterCode: `function ChatRoom({ roomId }) {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const socket = new WebSocket(\`wss://chat.app/rooms/\${roomId}\`);

    socket.addEventListener('message', (event) => {
      const msg = JSON.parse(event.data);
      setMessages(prev => [...prev, msg]);
    });

    // BUG: No cleanup!
    // 1. What happens to the socket when component unmounts?
    // 2. What happens when roomId changes?
    // 3. Fix it with proper cleanup
    // 4. Explain how to verify fix in Chrome DevTools
  }, [roomId]);

  return <MessageList messages={messages} />;
}`,
  },

  // ─── BEHAVIORAL ───────────────────────────────────────────────────
  'br-tech-debt': {
    prompt: `CHALLENGE: Write a tech debt proposal for this legacy codebase situation.

SCENARIO: Your team's React app has:
- Build time: 8 minutes (industry standard: <2 min)
- 0% test coverage on the payment module
- 3 security vulnerabilities in outdated dependencies
- Global CSS with 400+ !important declarations

REQ 1: Categorize each issue by priority (P0/P1/P2) with justification
REQ 2: Estimate effort and ROI for each fix
REQ 3: Write a stakeholder pitch for the highest priority item (2-3 sentences)
REQ 4: Propose a timeline that doesn't block feature delivery

HINT: Translate technical problems to business impact for stakeholders.`,
    solution: `// TECH DEBT TRIAGE:

const debtItems = [
  {
    issue: 'Security vulnerabilities in dependencies',
    priority: 'P0 — fix immediately',
    businessImpact: 'Potential data breach, compliance violations, liability',
    effort: '4 hours (npm audit fix)',
    roi: 'Eliminates breach risk — no brainer',
  },
  {
    issue: '0% test coverage on payment module',
    priority: 'P0 — fix before next release',
    businessImpact: 'Any bug here = lost revenue + chargebacks',
    effort: '1 sprint (2 weeks)',
    roi: 'One prevented payment bug pays for the entire effort',
  },
  {
    issue: '8-minute build time',
    priority: 'P1 — fix next quarter',
    businessImpact: '8 engineers × 10 builds/day × 6min saved = 8hrs/day productivity gain',
    effort: '1 week (Vite migration or module federation)',
    roi: '8 engineer-hours/day recovered',
  },
  {
    issue: 'Global CSS with !important',
    priority: 'P2 — address incrementally',
    businessImpact: 'Slows feature development, causes visual regressions',
    effort: '2 sprints (modular CSS migration)',
    roi: 'Prevents regression bugs, speeds styling work',
  },
];

// STAKEHOLDER PITCH for P0 security fix:
// "Our payment dependencies have 3 known vulnerabilities that could expose
//  customer financial data. This takes 4 hours to fix. Every day we delay
//  is a compliance and liability risk — I'd like to prioritize this today."

// TIMELINE (doesn't block features):
// Week 1: Security patches (parallel with feature work — 4 hours)
// Sprint 1-2: Payment test coverage (dedicated engineer)
// Q2: Build time optimization (own sprint)
// Ongoing: CSS cleanup as part of component touch-ups`,
    starterCode: `// Write your tech debt proposal for this scenario:

// SCENARIO:
// • Build time: 8 minutes
// • 0% test coverage on payment module
// • 3 security vulnerabilities in dependencies
// • 400+ !important in CSS

// YOUR TASKS:
// 1. Prioritize each item (P0/P1/P2) with business justification
const debtItems = [
  { issue: 'Security vulnerabilities', priority: '?', businessImpact: '?', effort: '?' },
  { issue: '0% payment test coverage', priority: '?', businessImpact: '?', effort: '?' },
  { issue: '8 min build time', priority: '?', businessImpact: '?', effort: '?' },
  { issue: 'CSS !important chaos', priority: '?', businessImpact: '?', effort: '?' },
];

// 2. Write a 2-3 sentence stakeholder pitch for highest priority:
const pitch = \`\`;

// 3. Propose a timeline:
const timeline = \`\`;`,
  },

  // ─── RAPID FIRE ───────────────────────────────────────────────────
  'rf-null-undefined': {
    prompt: `CHALLENGE: Answer these 5 rapid-fire questions about null and undefined in under 2 minutes total.

REQ 1: Answer each without looking them up
REQ 2: Include a one-line code example for each

Questions:
1. What does typeof null return and why?
2. What's the difference between null == undefined and null === undefined?
3. When does JavaScript automatically assign undefined (3 cases)?
4. What does document.getElementById('nonexistent') return?
5. Write a function isNullish(val) that returns true for both null AND undefined but false for 0, '', false

HINT: Question 5 is testing if you know about nullish coalescing internals.`,
    solution: `// 1. typeof null === 'object'
// Historical bug from 1995 kept for backward compatibility.
// The binary representation of null happened to match the object tag.
typeof null // 'object' ← not 'null'

// 2. Equality
null == undefined  // true  (loose: special case in spec)
null === undefined // false (strict: different types)

// 3. JS auto-assigns undefined when:
let x;              // declared but not initialized
function fn() {}; fn() // no return statement
const obj = {}; obj.missing // property doesn't exist

// 4. Returns null (not undefined!)
document.getElementById('nonexistent') // null

// 5. isNullish — use nullish coalescing or explicit check
const isNullish = (val) => val == null;
// val == null is true ONLY for null and undefined (loose equality)
// 0 == null → false ✓
// '' == null → false ✓
// false == null → false ✓
// null == null → true ✓
// undefined == null → true ✓`,
    starterCode: `// Answer all 5 — aim for under 2 minutes total

// Q1: What does typeof null return and why?
typeof null // ?

// Q2: Difference between == and === for null/undefined?
null == undefined  // ?
null === undefined // ?

// Q3: Three cases where JS auto-assigns undefined:
// 1.
// 2.
// 3.

// Q4: What does this return?
document.getElementById('nonexistent') // ?

// Q5: Implement isNullish — true for null/undefined, false for 0/''/false
const isNullish = (val) => {
  // your implementation
};
// Test:
isNullish(null)      // true
isNullish(undefined) // true
isNullish(0)         // false
isNullish('')        // false
isNullish(false)     // false`,
  },

  'rf-debounce-throttle': {
    prompt: `CHALLENGE: Implement both debounce AND throttle from scratch, then answer which to use for each scenario.

REQ 1: Implement debounce(fn, delay) — fires after delay ms of silence
REQ 2: Implement throttle(fn, limit) — fires at most once per limit ms
REQ 3: For each scenario below, pick debounce OR throttle and explain why

Scenarios:
A. Search input — fire API on each keystroke
B. Window scroll handler — update sticky header position
C. Window resize — recalculate layout after resize ends
D. Button submit — prevent double-submit on slow network
E. Mouse move — update tooltip position as cursor moves`,
    solution: `function debounce(fn, delay) {
  let timer;
  return function(...args) {
    clearTimeout(timer);
    timer = setTimeout(() => fn.apply(this, args), delay);
  };
}

function throttle(fn, limit) {
  let inThrottle;
  return function(...args) {
    if (!inThrottle) {
      fn.apply(this, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
}

// Scenarios:
// A. Search input → DEBOUNCE(300ms)
//    Wait for user to pause typing. No point hitting API mid-word.

// B. Scroll handler → THROTTLE(16ms = 60fps)
//    Fire continuously but at most every frame. Scroll never "pauses".

// C. Window resize → DEBOUNCE(200ms)
//    Wait for resize to END before recalculating. Expensive layout ops.

// D. Button submit → DEBOUNCE(0ms) with leading edge OR just disable button
//    Fire immediately on first click, ignore subsequent clicks for N ms.

// E. Mouse move → THROTTLE(16ms)
//    Continuous movement — throttle to 60fps. Debounce would lag badly.`,
    starterCode: `// Implement both:

function debounce(fn, delay) {
  // Returns a function that only calls fn after
  // delay ms of silence since the last call
}

function throttle(fn, limit) {
  // Returns a function that calls fn at most
  // once per limit ms regardless of call frequency
}

// Pick debounce or throttle for each scenario (and why):
// A. Search API calls on keystroke:
// B. Scroll handler updating sticky header:
// C. Resize handler recalculating layout:
// D. Submit button preventing double-submit:
// E. Mousemove updating tooltip position:

// Quick test:
const debouncedLog = debounce(console.log, 300);
debouncedLog('a'); debouncedLog('b'); debouncedLog('c');
// Should only log 'c' after 300ms

const throttledLog = throttle(console.log, 1000);
throttledLog('x'); throttledLog('y'); throttledLog('z');
// Should log 'x' immediately, ignore 'y' and 'z'`,
  },

  'rf-event-loop-1min': {
    prompt: `CHALLENGE: Explain the event loop in exactly 60 seconds (practice out loud), then answer these output questions without running the code.

Output questions — write your answers first:

\`\`\`js
// Q1:
setTimeout(() => console.log('A'), 0);
Promise.resolve().then(() => console.log('B'));
console.log('C');

// Q2:
async function run() {
  console.log('1');
  await Promise.resolve();
  console.log('2');
}
run();
console.log('3');

// Q3 (hardest):
Promise.resolve().then(() => {
  console.log('a');
  setTimeout(() => console.log('b'), 0);
}).then(() => console.log('c'));
setTimeout(() => console.log('d'), 0);
\`\`\``,
    solution: `// 60-second explanation structure:
// "JS is single-threaded but handles async via the event loop.
//  Code runs on the call stack. Async ops go to Web APIs.
//  When done, callbacks queue up. Promises → microtask queue (high priority).
//  setTimeout → macrotask queue (low priority).
//  Loop: drain ALL microtasks → take ONE macrotask → repeat."

// Q1: C, B, A
// C → sync. B → microtask (Promise). A → macrotask (setTimeout).

// Q2: 1, 3, 2
// run() starts, logs 1. await pauses → rest of run() is microtask.
// 3 logs sync. Microtask runs: 2 logs.

// Q3: a, c, d, b
// First .then queues (microtask): logs 'a', then queues setTimeout('b') as macrotask
// Second .then queues (microtask): logs 'c'
// d's setTimeout is macrotask
// Macrotasks: d runs first (queued before b), then b
// Wait — actually: a, c, d, b
// a → first microtask. Inside it, 'b' setTimeout queued.
// c → second microtask (chained .then).
// Both microtasks drain. Now macrotasks: d was queued first → d, then b.`,
    starterCode: `// STEP 1: Explain the event loop out loud in 60 seconds
// Structure:
// - What problem it solves (single-threaded + async)
// - Call stack / Web APIs / Microtask Queue / Macrotask Queue
// - Order: sync → microtasks → ONE macrotask → repeat

// STEP 2: Predict output (no running allowed!)

// Q1 — easy:
setTimeout(() => console.log('A'), 0);
Promise.resolve().then(() => console.log('B'));
console.log('C');
// Output: ?

// Q2 — medium:
async function run() {
  console.log('1');
  await Promise.resolve();
  console.log('2');
}
run();
console.log('3');
// Output: ?

// Q3 — hard (think carefully about nested queuing):
Promise.resolve().then(() => {
  console.log('a');
  setTimeout(() => console.log('b'), 0);
}).then(() => console.log('c'));
setTimeout(() => console.log('d'), 0);
// Output: ?`,
  },
};