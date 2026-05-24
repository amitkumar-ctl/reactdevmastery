// ─────────────────────────────────────────────────────────────────────
// IDE CHALLENGES — Each has: title, difficulty, description,
// requirements, examples, constraints, hint, starterCode, testCode
// ─────────────────────────────────────────────────────────────────────

export const IDE_CHALLENGES = {

  // ── EVENT LOOP ──────────────────────────────────────────────────────
  'event-loop': {
    title: 'Async Queue — Promise + setTimeout Ordering',
    difficulty: 'hard',
    description: `Implement a function \`runQueue(tasks)\` that runs async tasks in this specific order:
1. All synchronous tasks first
2. Then all Promise-based tasks (microtasks)  
3. Then all setTimeout tasks (macrotasks)

Each task is an object: { type: 'sync' | 'promise' | 'timeout', fn: Function }

The function should return a Promise that resolves to an array of results in execution order.`,
    requirements: [
      'Execute sync tasks immediately and collect results',
      'Execute promise tasks as microtasks after sync',
      'Execute timeout tasks last',
      'Return array of all results in execution order',
    ],
    examples: [
      {
        input: `runQueue([{type:'sync',fn:()=>1}, {type:'timeout',fn:()=>3}, {type:'promise',fn:()=>2}])`,
        output: `[1, 2, 3]`,
        explanation: 'sync runs first, then promise (microtask), then timeout (macrotask)',
      },
    ],
    constraints: [
      'Tasks array may be empty — return []',
      'fn() may return any value',
      'Preserve order within each category',
    ],
    hint: 'Separate tasks by type first. Run sync, then await Promise.all for promise tasks, then await all timeouts.',
    starterCode: `/**
 * Runs tasks in order: sync → promise → timeout
 * @param {Array<{type: string, fn: Function}>} tasks
 * @returns {Promise<Array>} results in execution order
 */
async function runQueue(tasks) {
  // Your implementation here
}

// Don't modify below — for your manual testing
// runQueue([
//   { type: 'sync', fn: () => 'sync-result' },
//   { type: 'timeout', fn: () => 'timeout-result' },
//   { type: 'promise', fn: () => 'promise-result' },
// ]).then(console.log); // ['sync-result', 'promise-result', 'timeout-result']
`,
    testCode: `
// Test 1: basic ordering
test('runs sync before promise before timeout', async () => {
  const order = [];
  await runQueue([
    { type: 'sync',    fn: () => { order.push('A'); return 'A'; } },
    { type: 'timeout', fn: () => { order.push('C'); return 'C'; } },
    { type: 'promise', fn: () => { order.push('B'); return 'B'; } },
  ]);
  expect(order).toEqual(['A', 'B', 'C']);
});

// Test 2: returns results in execution order
test('returns results in sync→promise→timeout order', async () => {
  const result = await runQueue([
    { type: 'sync',    fn: () => 1 },
    { type: 'timeout', fn: () => 3 },
    { type: 'promise', fn: () => 2 },
  ]);
  expect(result).toEqual([1, 2, 3]);
});

// Test 3: empty array
test('handles empty array', async () => {
  const result = await runQueue([]);
  expect(result).toEqual([]);
});

// Test 4: only sync tasks
test('handles only sync tasks', async () => {
  const result = await runQueue([
    { type: 'sync', fn: () => 'x' },
    { type: 'sync', fn: () => 'y' },
  ]);
  expect(result).toEqual(['x', 'y']);
});

// Test 5: preserves order within each type
test('preserves relative order within same type', async () => {
  const result = await runQueue([
    { type: 'sync', fn: () => 1 },
    { type: 'sync', fn: () => 2 },
    { type: 'promise', fn: () => 3 },
    { type: 'promise', fn: () => 4 },
  ]);
  expect(result).toEqual([1, 2, 3, 4]);
});
`,
  },

  // ── CLOSURES ────────────────────────────────────────────────────────
  'closure-def': {
    title: 'Implement createCounter with Private State',
    difficulty: 'medium',
    description: `Implement a \`createCounter(initialValue)\` factory function using closures to maintain private state.

The returned object must have:
- \`increment(by = 1)\` — increases count, returns new value
- \`decrement(by = 1)\` — decreases count, returns new value  
- \`reset()\` — resets to initial value, returns initial value
- \`getCount()\` — returns current count
- \`getHistory()\` — returns array of all values (including initial)

The \`count\` variable must be completely private (not accessible via dot notation).`,
    requirements: [
      'count must be private — counter.count === undefined',
      'increment and decrement accept optional step (default 1)',
      'reset() returns to the original initialValue',
      'getHistory() returns every value count has had, in order',
    ],
    examples: [
      { input: 'createCounter(10)', output: 'Object with 5 methods', explanation: 'starts at 10' },
      { input: 'counter.increment()', output: '11', explanation: 'returns new count' },
      { input: 'counter.decrement(3)', output: '8', explanation: 'step of 3' },
      { input: 'counter.reset()', output: '10', explanation: 'back to initial' },
      { input: 'counter.count', output: 'undefined', explanation: 'private!' },
    ],
    constraints: [
      'initialValue defaults to 0',
      'decrement can go negative',
      'getHistory includes the starting value',
    ],
    hint: 'All state lives inside createCounter — the returned methods close over it. Use an array to track history.',
    starterCode: `/**
 * Creates a counter with private state using closures.
 * @param {number} initialValue - starting count (default 0)
 * @returns {{ increment, decrement, reset, getCount, getHistory }}
 */
function createCounter(initialValue = 0) {
  // Private state here — not on the returned object



  return {
    increment(by = 1) {
      // your code
    },
    decrement(by = 1) {
      // your code
    },
    reset() {
      // your code
    },
    getCount() {
      // your code
    },
    getHistory() {
      // your code
    },
  };
}
`,
    testCode: `
test('getCount returns initial value', () => {
  const c = createCounter(5);
  expect(c.getCount()).toBe(5);
});

test('increment increases by 1 by default', () => {
  const c = createCounter(0);
  expect(c.increment()).toBe(1);
  expect(c.increment()).toBe(2);
});

test('increment accepts custom step', () => {
  const c = createCounter(0);
  expect(c.increment(5)).toBe(5);
  expect(c.increment(3)).toBe(8);
});

test('decrement decreases by 1 by default', () => {
  const c = createCounter(10);
  expect(c.decrement()).toBe(9);
});

test('decrement accepts custom step', () => {
  const c = createCounter(20);
  expect(c.decrement(7)).toBe(13);
});

test('reset returns to initial value', () => {
  const c = createCounter(42);
  c.increment(100);
  expect(c.reset()).toBe(42);
  expect(c.getCount()).toBe(42);
});

test('count is private — not accessible via dot notation', () => {
  const c = createCounter(5);
  expect(c.count).toBeUndefined();
});

test('getHistory tracks all values in order', () => {
  const c = createCounter(0);
  c.increment();
  c.increment(2);
  c.decrement();
  expect(c.getHistory()).toEqual([0, 1, 3, 2]);
});

test('separate counters are independent', () => {
  const a = createCounter(0);
  const b = createCounter(100);
  a.increment(50);
  expect(a.getCount()).toBe(50);
  expect(b.getCount()).toBe(100);
});
`,
  },

  // ── HOISTING ────────────────────────────────────────────────────────
  'hoisting': {
    title: 'Predict & Fix Hoisting Bugs',
    difficulty: 'medium',
    description: `Implement three utility functions that demonstrate your understanding of hoisting:

1. \`getSafeValue(obj, key)\` — safely access a property, returning undefined (not throwing) if obj is null/undefined
2. \`createIdGenerator(prefix)\` — returns a function that generates unique IDs like "user-1", "user-2" using closure + hoisting-safe patterns
3. \`hoistingQuiz()\` — returns an array showing the output order of a classic hoisting scenario (var, let, function declaration)`,
    requirements: [
      'getSafeValue must not throw for null/undefined objects',
      'createIdGenerator counter must be private via closure',
      'hoistingQuiz returns ["fn called", undefined, "assigned"] in that order',
      'Use only var in hoistingQuiz to demonstrate hoisting (not let/const)',
    ],
    examples: [
      { input: 'getSafeValue(null, "name")', output: 'undefined', explanation: 'no throw' },
      { input: 'getSafeValue({a:1}, "a")', output: '1', explanation: 'normal access' },
      { input: 'const gen = createIdGenerator("item"); gen()', output: '"item-1"', explanation: 'first ID' },
      { input: 'gen(); gen()', output: '"item-2", "item-3"', explanation: 'auto-increments' },
    ],
    constraints: [
      'getSafeValue: first arg may be null, undefined, or any object',
      'createIdGenerator: IDs start at 1',
      'Each generator instance has its own counter',
    ],
    hint: 'For getSafeValue use optional chaining or a try/catch. For the quiz: function declarations hoist fully, var hoists as undefined.',
    starterCode: `/**
 * Safely access object property — returns undefined instead of throwing
 */
function getSafeValue(obj, key) {
  // your code
}

/**
 * Creates an ID generator with private counter
 * @param {string} prefix — e.g. "user"  
 * @returns {function} — each call returns "prefix-N"
 */
function createIdGenerator(prefix) {
  // your code
}

/**
 * Returns array demonstrating classic hoisting behavior.
 * Must return exactly: ["fn called", undefined, "assigned"]
 */
function hoistingQuiz() {
  const results = [];
  // Use var and function declaration to show hoisting
  // results.push( greet() );      // can call before declaration?
  // results.push( message );      // var before assignment?
  // var message = "assigned";
  // results.push( message );      // after assignment?
  // function greet() { return "fn called"; }

  // Your implementation here:

  return results;
}
`,
    testCode: `
test('getSafeValue returns property value', () => {
  expect(getSafeValue({ name: 'Alice' }, 'name')).toBe('Alice');
});

test('getSafeValue returns undefined for missing key', () => {
  expect(getSafeValue({ a: 1 }, 'b')).toBeUndefined();
});

test('getSafeValue returns undefined for null obj', () => {
  expect(getSafeValue(null, 'name')).toBeUndefined();
});

test('getSafeValue returns undefined for undefined obj', () => {
  expect(getSafeValue(undefined, 'name')).toBeUndefined();
});

test('getSafeValue does not throw', () => {
  expect(() => getSafeValue(null, 'x')).not.toThrow();
});

test('createIdGenerator starts at 1', () => {
  const gen = createIdGenerator('item');
  expect(gen()).toBe('item-1');
});

test('createIdGenerator increments on each call', () => {
  const gen = createIdGenerator('user');
  expect(gen()).toBe('user-1');
  expect(gen()).toBe('user-2');
  expect(gen()).toBe('user-3');
});

test('separate generators have independent counters', () => {
  const genA = createIdGenerator('a');
  const genB = createIdGenerator('b');
  genA(); genA();
  expect(genA()).toBe('a-3');
  expect(genB()).toBe('b-1');
});

test('hoistingQuiz returns correct hoisting order', () => {
  expect(hoistingQuiz()).toEqual(['fn called', undefined, 'assigned']);
});
`,
  },

  // ── THIS KEYWORD ────────────────────────────────────────────────────
  'this-keyword': {
    title: 'Fix "this" Binding in Event System',
    difficulty: 'hard',
    description: `Implement an \`EventEmitter\` class where all methods correctly preserve \`this\` even when callbacks are detached.

Requirements:
- \`on(event, handler)\` — subscribe, returns unsubscribe function
- \`off(event, handler)\` — unsubscribe
- \`emit(event, ...args)\` — call all handlers with given args
- \`once(event, handler)\` — subscribe for one call only, then auto-remove

All methods must work when called as callbacks (detached from the instance).`,
    requirements: [
      'on() returns an unsubscribe function (calling it removes the handler)',
      'emit() passes all additional args to each handler',
      'once() handler is automatically removed after first emit',
      'off() with a handler that was never added should not throw',
    ],
    examples: [
      { input: 'emitter.on("click", handler)', output: 'unsubscribe function', explanation: 'returns cleanup fn' },
      { input: 'emitter.emit("click", {x:1})', output: 'calls all "click" handlers with {x:1}', explanation: '' },
      { input: 'emitter.once("load", fn)', output: 'fn called once then removed', explanation: '' },
    ],
    constraints: [
      'Same handler added twice — called twice on emit',
      'emit on event with no handlers — no error',
      'Handlers added during emit — not called in that same emit',
    ],
    hint: 'Store handlers in a Map<eventName, Set<handler>>. For once(), wrap the handler in a one-shot function that calls off() after first invocation.',
    starterCode: `class EventEmitter {
  constructor() {
    // Initialize your storage here
  }

  /**
   * Subscribe to an event
   * @returns {Function} unsubscribe function
   */
  on(event, handler) {
    // your code
  }

  /**
   * Unsubscribe from an event
   */
  off(event, handler) {
    // your code
  }

  /**
   * Emit an event, passing args to all handlers
   */
  emit(event, ...args) {
    // your code
  }

  /**
   * Subscribe for ONE emission only
   * @returns {Function} unsubscribe function
   */
  once(event, handler) {
    // your code
  }
}
`,
    testCode: `
test('on() registers handler that fires on emit', () => {
  const emitter = new EventEmitter();
  const results = [];
  emitter.on('test', (v) => results.push(v));
  emitter.emit('test', 42);
  expect(results).toEqual([42]);
});

test('on() returns unsubscribe function', () => {
  const emitter = new EventEmitter();
  const results = [];
  const unsub = emitter.on('test', (v) => results.push(v));
  emitter.emit('test', 1);
  unsub();
  emitter.emit('test', 2);
  expect(results).toEqual([1]);
});

test('off() removes handler', () => {
  const emitter = new EventEmitter();
  const results = [];
  const handler = (v) => results.push(v);
  emitter.on('e', handler);
  emitter.emit('e', 1);
  emitter.off('e', handler);
  emitter.emit('e', 2);
  expect(results).toEqual([1]);
});

test('off() with unknown handler does not throw', () => {
  const emitter = new EventEmitter();
  expect(() => emitter.off('none', () => {})).not.toThrow();
});

test('emit passes multiple args to handler', () => {
  const emitter = new EventEmitter();
  let received;
  emitter.on('e', (...args) => { received = args; });
  emitter.emit('e', 1, 'two', true);
  expect(received).toEqual([1, 'two', true]);
});

test('emit on event with no handlers does not throw', () => {
  const emitter = new EventEmitter();
  expect(() => emitter.emit('nothing')).not.toThrow();
});

test('once() fires handler exactly once', () => {
  const emitter = new EventEmitter();
  let count = 0;
  emitter.once('e', () => count++);
  emitter.emit('e');
  emitter.emit('e');
  emitter.emit('e');
  expect(count).toBe(1);
});

test('multiple handlers on same event all fire', () => {
  const emitter = new EventEmitter();
  const results = [];
  emitter.on('e', () => results.push('a'));
  emitter.on('e', () => results.push('b'));
  emitter.emit('e');
  expect(results).toEqual(['a', 'b']);
});
`,
  },

  // ── PROMISE INTERNALS ────────────────────────────────────────────────
  'promise-internals': {
    title: 'Implement promiseAll, promiseRace, promiseAny',
    difficulty: 'hard',
    description: `Implement three Promise combinator functions from scratch — without using the native Promise.all, Promise.race, or Promise.any internally.

1. \`promiseAll(promises)\` — resolves when all resolve (ordered), rejects on first rejection
2. \`promiseRace(promises)\` — settles with the first promise to settle (resolve or reject)
3. \`promiseAny(promises)\` — resolves with first success, rejects only if ALL reject`,
    requirements: [
      'promiseAll: resolve order matches input order, not resolution order',
      'promiseAll: empty array resolves with []',
      'promiseRace: resolves OR rejects with whichever promise settles first',
      'promiseAny: rejects with AggregateError if all promises reject',
    ],
    examples: [
      { input: 'promiseAll([resolve(1), resolve(2), resolve(3)])', output: '[1, 2, 3]', explanation: 'all resolve' },
      { input: 'promiseAll([resolve(1), reject("err")])', output: 'rejects with "err"', explanation: 'fail fast' },
      { input: 'promiseRace([slow(2), fast(1)])', output: '1', explanation: 'fastest wins' },
      { input: 'promiseAny([reject("a"), resolve("b")])', output: '"b"', explanation: 'first success' },
    ],
    constraints: [
      'All functions must return a Promise',
      'Handle non-promise values in the array (wrap with Promise.resolve)',
      'promiseAny with empty array should reject',
    ],
    hint: 'Use a counter to track resolved promises for promiseAll. For promiseAny, track rejections — when count equals total, reject with all errors.',
    starterCode: `/**
 * Resolves when ALL promises resolve (preserving order).
 * Rejects immediately if ANY promise rejects.
 */
function promiseAll(promises) {
  return new Promise((resolve, reject) => {
    // your code
  });
}

/**
 * Settles with the FIRST promise to settle (resolve or reject).
 */
function promiseRace(promises) {
  return new Promise((resolve, reject) => {
    // your code
  });
}

/**
 * Resolves with FIRST success.
 * Rejects with AggregateError only if ALL promises reject.
 */
function promiseAny(promises) {
  return new Promise((resolve, reject) => {
    // your code
  });
}
`,
    testCode: `
// ── promiseAll ──────────────────────────────────────────────────────
test('promiseAll resolves with all values in order', async () => {
  const result = await promiseAll([
    Promise.resolve(1),
    Promise.resolve(2),
    Promise.resolve(3),
  ]);
  expect(result).toEqual([1, 2, 3]);
});

test('promiseAll rejects on first failure', async () => {
  let caught = null;
  try {
    await promiseAll([Promise.resolve(1), Promise.reject('boom'), Promise.resolve(3)]);
  } catch(e) { caught = e; }
  expect(caught).toBe('boom');
});

test('promiseAll handles empty array', async () => {
  const result = await promiseAll([]);
  expect(result).toEqual([]);
});

test('promiseAll handles non-promise values', async () => {
  const result = await promiseAll([1, Promise.resolve(2), 3]);
  expect(result).toEqual([1, 2, 3]);
});

// ── promiseRace ──────────────────────────────────────────────────────
test('promiseRace resolves with fastest resolve', async () => {
  const slow = new Promise(res => setTimeout(() => res('slow'), 100));
  const fast = Promise.resolve('fast');
  const result = await promiseRace([slow, fast]);
  expect(result).toBe('fast');
});

test('promiseRace rejects if fastest rejects', async () => {
  let caught = null;
  try {
    const quick = Promise.reject('quick-fail');
    const slow = new Promise(res => setTimeout(() => res('slow'), 100));
    await promiseRace([slow, quick]);
  } catch(e) { caught = e; }
  expect(caught).toBe('quick-fail');
});

// ── promiseAny ───────────────────────────────────────────────────────
test('promiseAny resolves with first success', async () => {
  const result = await promiseAny([
    Promise.reject('fail1'),
    Promise.resolve('success'),
    Promise.reject('fail2'),
  ]);
  expect(result).toBe('success');
});

test('promiseAny rejects if all reject', async () => {
  let caught = null;
  try {
    await promiseAny([Promise.reject('a'), Promise.reject('b')]);
  } catch(e) { caught = e; }
  expect(caught).toBeTruthy();
});
`,
  },

  // ── ASYNC AWAIT ──────────────────────────────────────────────────────
  'async-await': {
    title: 'Build a Retry + Timeout Fetch Utility',
    difficulty: 'hard',
    description: `Implement a \`fetchWithRetry(url, options)\` function that wraps fetch with:
- Automatic retry on failure (up to \`options.retries\` times)
- Exponential backoff between retries: 100ms, 200ms, 400ms...
- Per-request timeout via \`options.timeout\` (ms)
- Throws meaningful errors distinguishing timeout vs network failure`,
    requirements: [
      'Retry up to options.retries times (default 3)',
      'Exponential backoff: delay = 100 * 2^attempt ms',
      'Timeout cancels the request using AbortController',
      'After all retries exhausted, throw the last error',
    ],
    examples: [
      { input: 'fetchWithRetry("/api", { retries: 2, timeout: 1000 })', output: 'Response or throws', explanation: '' },
      { input: 'Timeout hit on attempt 1', output: 'retries after 100ms', explanation: 'exponential backoff' },
      { input: 'All 3 retries fail', output: 'throws "Max retries exceeded"', explanation: '' },
    ],
    constraints: [
      'options.retries defaults to 3',
      'options.timeout defaults to 5000ms',
      'Must use AbortController for timeout',
      'Backoff delay: 100ms, 200ms, 400ms for retries 0,1,2',
    ],
    hint: 'Use a loop for retries. Create a new AbortController per attempt. Use Promise.race(fetch, timeoutPromise) to implement timeout.',
    starterCode: `/**
 * Fetches with automatic retry and timeout.
 * @param {string} url
 * @param {object} options
 * @param {number} options.retries - max retry attempts (default 3)
 * @param {number} options.timeout - ms before timeout (default 5000)
 * @returns {Promise<Response>}
 */
async function fetchWithRetry(url, options = {}) {
  const { retries = 3, timeout = 5000, ...fetchOptions } = options;

  // your code here
}

/**
 * Sleep utility
 */
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
`,
    testCode: `
// Mock fetch for testing
const originalFetch = globalThis.fetch;

test('returns response on success', async () => {
  let calls = 0;
  globalThis.fetch = async () => {
    calls++;
    return { ok: true, status: 200, json: async () => ({ data: 'ok' }) };
  };
  const res = await fetchWithRetry('/api');
  expect(res.ok).toBe(true);
  expect(calls).toBe(1);
  globalThis.fetch = originalFetch;
});

test('retries on failure', async () => {
  let calls = 0;
  globalThis.fetch = async () => {
    calls++;
    if (calls < 3) throw new Error('Network error');
    return { ok: true, status: 200 };
  };
  const res = await fetchWithRetry('/api', { retries: 3 });
  expect(res.ok).toBe(true);
  expect(calls).toBe(3);
  globalThis.fetch = originalFetch;
});

test('throws after all retries exhausted', async () => {
  globalThis.fetch = async () => { throw new Error('Always fails'); };
  let caught = null;
  try {
    await fetchWithRetry('/api', { retries: 2 });
  } catch(e) { caught = e; }
  expect(caught).toBeTruthy();
  expect(caught.message).toContain('Always fails');
  globalThis.fetch = originalFetch;
});

test('default retries is 3', async () => {
  let calls = 0;
  globalThis.fetch = async () => { calls++; throw new Error('fail'); };
  try { await fetchWithRetry('/api'); } catch {}
  expect(calls).toBe(3);
  globalThis.fetch = originalFetch;
});

test('sleep function exists and is correct', async () => {
  const start = Date.now();
  await sleep(50);
  const elapsed = Date.now() - start;
  expect(elapsed).toBeGreaterThan(40);
});
`,
  },

  // ── CLOSURES — SCOPE CHAIN ───────────────────────────────────────────
  'scope-chain': {
    title: 'Implement Memoize with Cache Statistics',
    difficulty: 'medium',
    description: `Implement a \`memoize(fn, options)\` function that caches function results using closures.

The returned function must:
- Cache results keyed by stringified arguments
- Support a \`maxSize\` option (LRU eviction when full)
- Expose \`.cacheStats()\` returning \`{ hits, misses, size }\`
- Expose \`.clearCache()\` to reset everything`,
    requirements: [
      'Returns cached result on repeated calls with same args',
      'Calls original fn only on cache miss',
      'Evicts least recently used entry when maxSize exceeded',
      'cacheStats() returns accurate hit/miss/size counts',
    ],
    examples: [
      { input: 'const memoFib = memoize(fib); memoFib(10); memoFib(10);', output: 'fib called once', explanation: 'cached' },
      { input: 'memoFib.cacheStats()', output: '{ hits: 1, misses: 1, size: 1 }', explanation: '' },
      { input: 'memoize(fn, { maxSize: 2 }) — 3 unique calls', output: 'oldest entry evicted', explanation: 'LRU' },
    ],
    constraints: [
      'Cache key: JSON.stringify(args)',
      'maxSize defaults to Infinity (no eviction)',
      'clearCache resets hits and misses too',
    ],
    hint: 'Use a Map for the cache (preserves insertion order). For LRU, delete the first entry (oldest) when size exceeds maxSize. Stats live in the closure.',
    starterCode: `/**
 * Memoizes a function with optional LRU cache size limit.
 * @param {Function} fn - function to memoize
 * @param {object} options
 * @param {number} options.maxSize - max cache entries (default Infinity)
 */
function memoize(fn, options = {}) {
  const { maxSize = Infinity } = options;
  // Private state in closure:

  function memoized(...args) {
    // your code
  }

  memoized.cacheStats = function() {
    // return { hits, misses, size }
  };

  memoized.clearCache = function() {
    // your code
  };

  return memoized;
}
`,
    testCode: `
test('returns correct result', () => {
  const add = memoize((a, b) => a + b);
  expect(add(2, 3)).toBe(5);
});

test('caches results — fn called once for same args', () => {
  let calls = 0;
  const fn = memoize((n) => { calls++; return n * 2; });
  fn(5); fn(5); fn(5);
  expect(calls).toBe(1);
});

test('different args call fn again', () => {
  let calls = 0;
  const fn = memoize((n) => { calls++; return n; });
  fn(1); fn(2); fn(1);
  expect(calls).toBe(2);
});

test('cacheStats tracks hits and misses', () => {
  const fn = memoize((n) => n);
  fn(1); fn(1); fn(2);
  const stats = fn.cacheStats();
  expect(stats.misses).toBe(2);
  expect(stats.hits).toBe(1);
  expect(stats.size).toBe(2);
});

test('clearCache resets everything', () => {
  const fn = memoize((n) => n);
  fn(1); fn(1);
  fn.clearCache();
  const stats = fn.cacheStats();
  expect(stats.hits).toBe(0);
  expect(stats.misses).toBe(0);
  expect(stats.size).toBe(0);
});

test('maxSize evicts oldest entry (LRU)', () => {
  let calls = 0;
  const fn = memoize((n) => { calls++; return n; }, { maxSize: 2 });
  fn(1); fn(2); fn(3); // evicts 1
  calls = 0;
  fn(1); // cache miss — 1 was evicted
  expect(calls).toBe(1);
});

test('works with multiple args', () => {
  const fn = memoize((a, b, c) => a + b + c);
  expect(fn(1, 2, 3)).toBe(6);
  expect(fn(1, 2, 3)).toBe(6);
  expect(fn.cacheStats().hits).toBe(1);
});
`,
  },

  // ── COERCION ────────────────────────────────────────────────────────
  'coercion': {
    title: 'Build a Type-Safe Comparison Utility',
    difficulty: 'medium',
    description: `Implement a \`safeCompare(a, b, options)\` utility that compares values predictably, avoiding JS coercion pitfalls.

Also implement \`typeOf(val)\` — a fixed version of \`typeof\` that correctly returns "null" for null, "array" for arrays, and "nan" for NaN.`,
    requirements: [
      'safeCompare uses strict equality by default (no coercion)',
      'safeCompare with { coerce: true } converts types before comparing',
      'typeOf(null) returns "null" not "object"',
      'typeOf([]) returns "array" not "object"',
      'typeOf(NaN) returns "nan" not "number"',
    ],
    examples: [
      { input: 'safeCompare("5", 5)', output: 'false', explanation: 'strict by default' },
      { input: 'safeCompare("5", 5, { coerce: true })', output: 'true', explanation: 'coerced' },
      { input: 'typeOf(null)', output: '"null"', explanation: 'fixed typeof' },
      { input: 'typeOf([])', output: '"array"', explanation: 'fixed typeof' },
      { input: 'typeOf(NaN)', output: '"nan"', explanation: 'fixed typeof' },
    ],
    constraints: [
      'safeCompare: coerce converts both sides to same type intelligently',
      'typeOf: covers null, array, nan, then falls back to typeof',
      'NaN compared to NaN with safeCompare should return true',
    ],
    hint: 'For typeOf: check null first (=== null), then Array.isArray, then Number.isNaN, then fall back to typeof. For safeCompare coercion: use Number() if either side looks numeric.',
    starterCode: `/**
 * Fixed typeof that handles null, arrays, and NaN correctly.
 * @param {*} val
 * @returns {string} type name
 */
function typeOf(val) {
  // your code
}

/**
 * Type-safe comparison that avoids coercion pitfalls.
 * @param {*} a
 * @param {*} b  
 * @param {object} options
 * @param {boolean} options.coerce - allow type coercion (default false)
 * @returns {boolean}
 */
function safeCompare(a, b, options = {}) {
  const { coerce = false } = options;
  // your code
}
`,
    testCode: `
// typeOf tests
test('typeOf(null) returns "null"', () => {
  expect(typeOf(null)).toBe('null');
});

test('typeOf([]) returns "array"', () => {
  expect(typeOf([])).toBe('array');
  expect(typeOf([1,2,3])).toBe('array');
});

test('typeOf(NaN) returns "nan"', () => {
  expect(typeOf(NaN)).toBe('nan');
});

test('typeOf falls back to typeof for other types', () => {
  expect(typeOf(42)).toBe('number');
  expect(typeOf('hello')).toBe('string');
  expect(typeOf(true)).toBe('boolean');
  expect(typeOf({})).toBe('object');
  expect(typeOf(undefined)).toBe('undefined');
});

// safeCompare tests
test('safeCompare uses strict equality by default', () => {
  expect(safeCompare('5', 5)).toBe(false);
  expect(safeCompare(0, false)).toBe(false);
  expect(safeCompare(null, undefined)).toBe(false);
});

test('safeCompare strict: equal values return true', () => {
  expect(safeCompare(5, 5)).toBe(true);
  expect(safeCompare('hello', 'hello')).toBe(true);
  expect(safeCompare(true, true)).toBe(true);
});

test('safeCompare: NaN equals NaN', () => {
  expect(safeCompare(NaN, NaN)).toBe(true);
});

test('safeCompare coerce: "5" == 5', () => {
  expect(safeCompare('5', 5, { coerce: true })).toBe(true);
});

test('safeCompare coerce: "true" == true', () => {
  expect(safeCompare('true', true, { coerce: true })).toBe(true);
});
`,
  },

  // ── MEMORY MANAGEMENT ────────────────────────────────────────────────
  'memory': {
    title: 'Build a WeakCache — Memory-Safe Cache',
    difficulty: 'hard',
    description: `Implement a \`WeakCache\` class that uses \`WeakMap\` to cache computed values for objects without preventing garbage collection.

Also implement \`detectLeak(fn)\` — a utility that runs a function and reports if it holds references preventing GC (for testing purposes, simulate with a reference counter).`,
    requirements: [
      'WeakCache.get(obj, computeFn) — returns cached value or computes and caches it',
      'WeakCache.has(obj) — returns true if obj is cached',
      'WeakCache.delete(obj) — removes cache entry',
      'Keys must be objects (WeakMap requirement)',
    ],
    examples: [
      { input: 'cache.get(user, () => expensiveCompute(user))', output: 'computed value (first time)', explanation: '' },
      { input: 'cache.get(user, () => expensiveCompute(user))', output: 'cached value (fast)', explanation: 'no recompute' },
      { input: 'cache.has(user)', output: 'true', explanation: 'after first get' },
    ],
    constraints: [
      'Must use WeakMap internally (not Map)',
      'computeFn is called with obj as argument',
      'has() and delete() work correctly',
    ],
    hint: 'WeakMap keys must be objects — this is perfect for caching computations on DOM elements, request objects, or user records. The cache won\'t prevent GC of the key objects.',
    starterCode: `/**
 * Memory-safe cache using WeakMap.
 * When the key object is garbage collected, the cache entry is too.
 */
class WeakCache {
  constructor() {
    // Must use WeakMap (not Map!)
  }

  /**
   * Get cached value or compute and cache it.
   * @param {object} obj - must be an object (WeakMap key requirement)
   * @param {function} computeFn - called with obj, returns value to cache
   * @returns {*} cached or computed value
   */
  get(obj, computeFn) {
    // your code
  }

  /**
   * Check if obj is in the cache.
   */
  has(obj) {
    // your code
  }

  /**
   * Remove obj from the cache.
   */
  delete(obj) {
    // your code
  }

  /**
   * Invalidate the cache for obj, then recompute.
   */
  refresh(obj, computeFn) {
    // your code
  }
}
`,
    testCode: `
test('get computes value on first call', () => {
  const cache = new WeakCache();
  const obj = {};
  let calls = 0;
  const result = cache.get(obj, () => { calls++; return 42; });
  expect(result).toBe(42);
  expect(calls).toBe(1);
});

test('get returns cached value on second call', () => {
  const cache = new WeakCache();
  const obj = {};
  let calls = 0;
  cache.get(obj, () => { calls++; return 'value'; });
  cache.get(obj, () => { calls++; return 'value'; });
  expect(calls).toBe(1);
});

test('different objects cached independently', () => {
  const cache = new WeakCache();
  const obj1 = {}, obj2 = {};
  let calls = 0;
  cache.get(obj1, () => { calls++; return 'a'; });
  cache.get(obj2, () => { calls++; return 'b'; });
  expect(calls).toBe(2);
});

test('has returns false for uncached object', () => {
  const cache = new WeakCache();
  expect(cache.has({})).toBe(false);
});

test('has returns true after get', () => {
  const cache = new WeakCache();
  const obj = {};
  cache.get(obj, () => 1);
  expect(cache.has(obj)).toBe(true);
});

test('delete removes entry', () => {
  const cache = new WeakCache();
  const obj = {};
  cache.get(obj, () => 1);
  cache.delete(obj);
  expect(cache.has(obj)).toBe(false);
});

test('refresh recomputes value', () => {
  const cache = new WeakCache();
  const obj = {};
  let value = 1;
  cache.get(obj, () => value);
  value = 99;
  const fresh = cache.refresh(obj, () => value);
  expect(fresh).toBe(99);
});
`,
  },

  // ── MACHINE CODING ──────────────────────────────────────────────────
  'mc-debounce': {
    title: 'Implement Debounce & Throttle from Scratch',
    difficulty: 'medium',
    description: `Implement both \`debounce(fn, delay, options)\` and \`throttle(fn, limit)\` from scratch.

**Debounce**: delays fn until N ms of silence. Supports \`leading\` edge option (fire immediately on first call too).
**Throttle**: fires at most once per \`limit\` ms regardless of call frequency.

Both returned functions must have a \`.cancel()\` method to cancel pending execution.`,
    requirements: [
      'debounce: fn fires after delay ms of silence',
      'debounce: { leading: true } also fires on the first call immediately',
      'debounce: .cancel() clears any pending timer',
      'throttle: fn fires at most once per limit ms',
      'throttle: .cancel() resets the throttle state',
    ],
    examples: [
      { input: '5 calls in 100ms with debounce(fn, 300)', output: 'fn called ONCE after 300ms silence', explanation: '' },
      { input: '10 calls in 1s with throttle(fn, 200)', output: 'fn called at most 5 times', explanation: '' },
      { input: 'debounce(fn, 300, { leading: true }) — first call', output: 'fires immediately AND after silence', explanation: '' },
    ],
    constraints: [
      'Use setTimeout/clearTimeout (no setInterval)',
      '.cancel() must be a function on the returned function',
      'throttle: trailing call fires at end of limit window',
    ],
    hint: 'Debounce: clear timer on each call, set new one. Leading edge: track if "first call" state with a flag. Throttle: track lastRun timestamp, compare with Date.now().',
    starterCode: `/**
 * Debounce: delays fn until delay ms after last call.
 * @param {Function} fn
 * @param {number} delay - ms
 * @param {object} options
 * @param {boolean} options.leading - also fire on first call
 */
function debounce(fn, delay, options = {}) {
  const { leading = false } = options;
  let timer;
  let leadingCalled = false;

  function debounced(...args) {
    // your code
  }

  debounced.cancel = function() {
    // your code
  };

  return debounced;
}

/**
 * Throttle: fn fires at most once per limit ms.
 * @param {Function} fn
 * @param {number} limit - ms
 */
function throttle(fn, limit) {
  let lastRun = 0;
  let timer;

  function throttled(...args) {
    // your code
  }

  throttled.cancel = function() {
    // your code
  };

  return throttled;
}
`,
    testCode: `
// ── Debounce tests ──────────────────────────────────────────────────
test('debounce: fn not called immediately', () => {
  let calls = 0;
  const fn = debounce(() => calls++, 100);
  fn();
  expect(calls).toBe(0);
});

test('debounce: multiple quick calls = one execution', async () => {
  let calls = 0;
  const fn = debounce(() => calls++, 50);
  fn(); fn(); fn(); fn(); fn();
  await new Promise(r => setTimeout(r, 100));
  expect(calls).toBe(1);
});

test('debounce: leading option fires immediately', () => {
  let calls = 0;
  const fn = debounce(() => calls++, 200, { leading: true });
  fn();
  expect(calls).toBe(1);
});

test('debounce: cancel prevents execution', async () => {
  let calls = 0;
  const fn = debounce(() => calls++, 50);
  fn();
  fn.cancel();
  await new Promise(r => setTimeout(r, 100));
  expect(calls).toBe(0);
});

// ── Throttle tests ───────────────────────────────────────────────────
test('throttle: fn called on first invocation', () => {
  let calls = 0;
  const fn = throttle(() => calls++, 200);
  fn();
  expect(calls).toBe(1);
});

test('throttle: subsequent calls within limit are ignored', () => {
  let calls = 0;
  const fn = throttle(() => calls++, 200);
  fn(); fn(); fn();
  expect(calls).toBe(1);
});

test('throttle: fires again after limit ms', async () => {
  let calls = 0;
  const fn = throttle(() => calls++, 50);
  fn();
  await new Promise(r => setTimeout(r, 100));
  fn();
  expect(calls).toBe(2);
});

test('throttle: cancel resets', () => {
  let calls = 0;
  const fn = throttle(() => calls++, 1000);
  fn();
  fn.cancel();
  fn();
  expect(calls).toBe(2);
});
`,
  },

  // ── XSS ─────────────────────────────────────────────────────────────
  'xss': {
    title: 'Build a Safe HTML Sanitizer',
    difficulty: 'hard',
    description: `Implement \`sanitizeHtml(input, allowedTags)\` — a function that removes dangerous HTML while preserving safe formatting tags.

Also implement \`escapeHtml(str)\` — converts special characters to HTML entities to prevent XSS when rendering as text.`,
    requirements: [
      'sanitizeHtml removes script, style, iframe, and all event handlers (onerror, onclick, etc.)',
      'sanitizeHtml preserves allowed tags (default: b, i, em, strong, p, br)',
      'escapeHtml converts &, <, >, ", \' to HTML entities',
      'sanitizeHtml strips javascript: URLs from href and src attributes',
    ],
    examples: [
      { input: 'escapeHtml("<script>alert(1)</script>")', output: '"&lt;script&gt;alert(1)&lt;/script&gt;"', explanation: 'safe to render' },
      { input: 'sanitizeHtml("<b>Hello</b><script>evil()</script>")', output: '"<b>Hello</b>"', explanation: 'strips script' },
      { input: 'sanitizeHtml("<a href=\\"javascript:alert()\\">")', output: '"<a>"', explanation: 'strips js: urls' },
    ],
    constraints: [
      'escapeHtml must handle all 5: & < > " \'',
      'sanitizeHtml: strip any attribute starting with "on" (event handlers)',
      'Nested allowed tags should be preserved',
    ],
    hint: 'Use regex for escapeHtml. For sanitizeHtml, use regex to find/remove script/style blocks first, then strip dangerous attributes from remaining tags.',
    starterCode: `/**
 * Escape HTML special characters to prevent XSS injection.
 * Converts: & < > " ' to their HTML entity equivalents.
 * @param {string} str
 * @returns {string} escaped string safe to inject as text
 */
function escapeHtml(str) {
  // your code
}

/**
 * Remove dangerous HTML while preserving safe tags.
 * @param {string} input - raw HTML string
 * @param {string[]} allowedTags - default: ['b','i','em','strong','p','br','span']
 * @returns {string} sanitized HTML
 */
function sanitizeHtml(input, allowedTags = ['b', 'i', 'em', 'strong', 'p', 'br', 'span']) {
  // your code
}
`,
    testCode: `
// ── escapeHtml ────────────────────────────────────────────────────
test('escapeHtml converts & to &amp;', () => {
  expect(escapeHtml('Tom & Jerry')).toBe('Tom &amp; Jerry');
});

test('escapeHtml converts < and >', () => {
  expect(escapeHtml('<div>')).toBe('&lt;div&gt;');
});

test('escapeHtml converts double quotes', () => {
  expect(escapeHtml('say "hello"')).toBe('say &quot;hello&quot;');
});

test('escapeHtml converts single quotes', () => {
  expect(escapeHtml("it's")).toBe('it&#x27;s');
});

test('escapeHtml handles all at once', () => {
  const result = escapeHtml('<script>alert("XSS & more")</script>');
  expect(result).toContain('&lt;script&gt;');
  expect(result).toContain('&amp;');
});

test('escapeHtml returns empty string for empty input', () => {
  expect(escapeHtml('')).toBe('');
});

// ── sanitizeHtml ──────────────────────────────────────────────────
test('sanitizeHtml removes script tags', () => {
  const result = sanitizeHtml('<b>Hello</b><script>evil()</script>');
  expect(result).not.toContain('<script>');
  expect(result).toContain('<b>Hello</b>');
});

test('sanitizeHtml removes event handlers', () => {
  const result = sanitizeHtml('<img src="x" onerror="evil()">');
  expect(result).not.toContain('onerror');
});

test('sanitizeHtml preserves allowed tags', () => {
  const result = sanitizeHtml('<b>bold</b> and <i>italic</i>');
  expect(result).toContain('<b>bold</b>');
  expect(result).toContain('<i>italic</i>');
});

test('sanitizeHtml strips javascript: URLs', () => {
  const result = sanitizeHtml('<a href="javascript:alert(1)">click</a>');
  expect(result).not.toContain('javascript:');
});

test('sanitizeHtml returns empty string for empty input', () => {
  expect(sanitizeHtml('')).toBe('');
});
`,
  },

  // ── RAPID FIRE — null vs undefined ──────────────────────────────────
  'rf-null-undefined': {
    title: 'null vs undefined — Utility Functions',
    difficulty: 'easy',
    description: `Implement utility functions that demonstrate deep understanding of null vs undefined:

1. \`isNullish(val)\` — returns true for null AND undefined, false for everything else (0, '', false)
2. \`withDefault(val, defaultVal)\` — returns defaultVal only if val is null or undefined (not for 0 or '')  
3. \`deepGetNullish(obj, ...keys)\` — safely traverse nested object, return null if any key is nullish`,
    requirements: [
      'isNullish(0) === false (0 is not nullish)',
      'isNullish(\'\') === false (empty string is not nullish)',
      'withDefault(0, 99) === 0 (0 is a real value, not nullish)',
      'withDefault(null, 99) === 99',
      'deepGetNullish({a:{b:1}}, "a", "b") === 1',
    ],
    examples: [
      { input: 'isNullish(null)', output: 'true', explanation: '' },
      { input: 'isNullish(0)', output: 'false', explanation: '0 is not nullish' },
      { input: 'withDefault(null, "default")', output: '"default"', explanation: '' },
      { input: 'withDefault(0, "default")', output: '0', explanation: '0 is a real value' },
      { input: 'deepGetNullish({a:{b:42}}, "a", "b")', output: '42', explanation: '' },
    ],
    constraints: [
      'isNullish: only null and undefined return true',
      'withDefault: only replaces null/undefined (like ?? operator)',
      'deepGetNullish: returns null (not undefined) when path breaks',
    ],
    hint: 'isNullish: val == null catches both null and undefined (loose equality special case). deepGetNullish: reduce over keys, check isNullish at each step.',
    starterCode: `/**
 * Returns true only for null and undefined.
 * Returns false for 0, '', false, NaN, etc.
 */
function isNullish(val) {
  // your code
}

/**
 * Returns defaultVal if val is null or undefined.
 * Returns val for ALL other values including 0, '', false.
 * (Same as the ?? nullish coalescing operator)
 */
function withDefault(val, defaultVal) {
  // your code
}

/**
 * Safely traverse nested object path.
 * Returns null if any intermediate value is null/undefined.
 * @param {object} obj
 * @param {...string} keys - path keys
 */
function deepGetNullish(obj, ...keys) {
  // your code
}
`,
    testCode: `
// isNullish
test('isNullish(null) is true', () => expect(isNullish(null)).toBe(true));
test('isNullish(undefined) is true', () => expect(isNullish(undefined)).toBe(true));
test('isNullish(0) is false', () => expect(isNullish(0)).toBe(false));
test('isNullish("") is false', () => expect(isNullish('')).toBe(false));
test('isNullish(false) is false', () => expect(isNullish(false)).toBe(false));
test('isNullish(NaN) is false', () => expect(isNullish(NaN)).toBe(false));
test('isNullish({}) is false', () => expect(isNullish({})).toBe(false));

// withDefault
test('withDefault returns default for null', () => {
  expect(withDefault(null, 'fallback')).toBe('fallback');
});
test('withDefault returns default for undefined', () => {
  expect(withDefault(undefined, 42)).toBe(42);
});
test('withDefault returns 0 (not default)', () => {
  expect(withDefault(0, 99)).toBe(0);
});
test('withDefault returns empty string (not default)', () => {
  expect(withDefault('', 'default')).toBe('');
});
test('withDefault returns false (not default)', () => {
  expect(withDefault(false, true)).toBe(false);
});

// deepGetNullish
test('deepGetNullish traverses valid path', () => {
  expect(deepGetNullish({ a: { b: { c: 42 } } }, 'a', 'b', 'c')).toBe(42);
});
test('deepGetNullish returns null for missing key', () => {
  expect(deepGetNullish({ a: 1 }, 'b', 'c')).toBeNull();
});
test('deepGetNullish returns null when intermediate is null', () => {
  expect(deepGetNullish({ a: null }, 'a', 'b')).toBeNull();
});
test('deepGetNullish returns value at first key', () => {
  expect(deepGetNullish({ x: 5 }, 'x')).toBe(5);
});
`,
  },

  // ── DEBOUNCE THROTTLE RAPID FIRE ─────────────────────────────────────
  'rf-debounce-throttle': {
    title: 'Debounce vs Throttle — Implement Both',
    difficulty: 'easy',
    description: `Implement minimal versions of debounce and throttle.

**Debounce**: waits for N ms of silence, then fires once.
**Throttle**: fires immediately, then ignores calls for N ms.

Focus on clarity over completeness — no leading/trailing edge options needed here.`,
    requirements: [
      'debounce fires after delay ms with no new calls',
      'throttle fires on first call, ignores subsequent calls within limit',
      'Both work with any function and arguments',
    ],
    examples: [
      { input: 'debounce(fn, 300) — called 5 times quickly', output: 'fn fires once after 300ms', explanation: '' },
      { input: 'throttle(fn, 500) — called every 100ms for 1s', output: 'fn fires ~2 times', explanation: '' },
    ],
    constraints: ['No external libraries', 'Use setTimeout/clearTimeout'],
    hint: 'Debounce: clear existing timer, set new one. Throttle: track lastFired timestamp with Date.now().',
    starterCode: `function debounce(fn, delay) {
  // your code
}

function throttle(fn, limit) {
  // your code
}
`,
    testCode: `
test('debounce: fn fires after delay', async () => {
  let calls = 0;
  const fn = debounce(() => calls++, 50);
  fn();
  expect(calls).toBe(0);
  await new Promise(r => setTimeout(r, 100));
  expect(calls).toBe(1);
});

test('debounce: rapid calls only fire once', async () => {
  let calls = 0;
  const fn = debounce(() => calls++, 50);
  fn(); fn(); fn(); fn(); fn();
  await new Promise(r => setTimeout(r, 120));
  expect(calls).toBe(1);
});

test('debounce: passes args to fn', async () => {
  let received;
  const fn = debounce((x) => { received = x; }, 50);
  fn(42);
  await new Promise(r => setTimeout(r, 100));
  expect(received).toBe(42);
});

test('throttle: first call fires immediately', () => {
  let calls = 0;
  const fn = throttle(() => calls++, 500);
  fn();
  expect(calls).toBe(1);
});

test('throttle: ignores calls within limit', () => {
  let calls = 0;
  const fn = throttle(() => calls++, 500);
  fn(); fn(); fn();
  expect(calls).toBe(1);
});

test('throttle: fires again after limit ms', async () => {
  let calls = 0;
  const fn = throttle(() => calls++, 50);
  fn();
  await new Promise(r => setTimeout(r, 100));
  fn();
  expect(calls).toBe(2);
});
`,
  },

  // ── AUTH PATTERNS ────────────────────────────────────────────────────
  'auth-patterns': {
    title: 'Build a Token Manager with Auto-Refresh',
    difficulty: 'hard',
    description: `Implement a \`TokenManager\` class that handles JWT storage and auto-refresh logic (simulated without actual HTTP calls).

It must manage access tokens (short-lived, in-memory) and simulate the refresh flow.`,
    requirements: [
      'Access token stored in-memory only (never in localStorage)',
      'isExpired(token) checks expiry from JWT payload',
      'getValidToken() auto-refreshes if token is expired',
      'Concurrent calls to getValidToken() during refresh only trigger ONE refresh',
    ],
    examples: [
      { input: 'manager.setToken("eyJ...")', output: 'token stored in memory', explanation: '' },
      { input: 'manager.isExpired(expiredToken)', output: 'true', explanation: 'past exp claim' },
      { input: 'await manager.getValidToken()', output: 'valid token string', explanation: 'refreshes if needed' },
    ],
    constraints: [
      'Never use localStorage or sessionStorage',
      'Tokens are base64 JWT format: header.payload.signature',
      'payload.exp is Unix timestamp in seconds',
      'Only one refresh in-flight at a time (no duplicate refresh calls)',
    ],
    hint: 'Decode JWT payload with atob(token.split(".")[1]). Store a refreshPromise to deduplicate concurrent refresh calls.',
    starterCode: `/**
 * Manages JWT tokens securely in memory with auto-refresh.
 */
class TokenManager {
  #accessToken = null;
  #refreshPromise = null;
  #onRefresh; // callback: () => Promise<string> (returns new token)

  constructor(onRefresh) {
    this.#onRefresh = onRefresh;
  }

  /**
   * Store new access token in memory.
   */
  setToken(token) {
    // your code
  }

  /**
   * Get current token (may be expired).
   */
  getToken() {
    // your code
  }

  /**
   * Decode JWT and check if expired.
   * @param {string} token - JWT string
   * @returns {boolean}
   */
  isExpired(token) {
    // JWT format: base64(header).base64(payload).signature
    // payload has { exp: unixTimestamp }
    // your code
  }

  /**
   * Returns a valid (non-expired) token.
   * Auto-refreshes if current token is expired.
   * Multiple concurrent calls only trigger ONE refresh.
   */
  async getValidToken() {
    // your code
  }

  clearToken() {
    this.#accessToken = null;
  }
}

// Helper: create a fake JWT (for testing)
function createFakeJWT(expiresInSeconds) {
  const payload = { sub: '123', exp: Math.floor(Date.now() / 1000) + expiresInSeconds };
  const b64 = btoa(JSON.stringify(payload));
  return \`header.\${b64}.signature\`;
}
`,
    testCode: `
test('setToken and getToken work', () => {
  const tm = new TokenManager(async () => createFakeJWT(3600));
  const token = createFakeJWT(3600);
  tm.setToken(token);
  expect(tm.getToken()).toBe(token);
});

test('isExpired: fresh token is not expired', () => {
  const tm = new TokenManager(async () => createFakeJWT(3600));
  expect(tm.isExpired(createFakeJWT(3600))).toBe(false);
});

test('isExpired: old token is expired', () => {
  const tm = new TokenManager(async () => createFakeJWT(3600));
  expect(tm.isExpired(createFakeJWT(-1))).toBe(true);
});

test('getValidToken returns current token if valid', async () => {
  const token = createFakeJWT(3600);
  const tm = new TokenManager(async () => createFakeJWT(3600));
  tm.setToken(token);
  const result = await tm.getValidToken();
  expect(result).toBe(token);
});

test('getValidToken auto-refreshes expired token', async () => {
  let refreshCalled = 0;
  const tm = new TokenManager(async () => {
    refreshCalled++;
    return createFakeJWT(3600);
  });
  tm.setToken(createFakeJWT(-1)); // expired!
  const result = await tm.getValidToken();
  expect(refreshCalled).toBe(1);
  expect(result).toBeTruthy();
  expect(tm.isExpired(result)).toBe(false);
});

test('concurrent getValidToken only triggers one refresh', async () => {
  let refreshCalled = 0;
  const tm = new TokenManager(async () => {
    refreshCalled++;
    await new Promise(r => setTimeout(r, 50));
    return createFakeJWT(3600);
  });
  tm.setToken(createFakeJWT(-1));
  await Promise.all([tm.getValidToken(), tm.getValidToken(), tm.getValidToken()]);
  expect(refreshCalled).toBe(1);
});

test('clearToken removes the token', () => {
  const tm = new TokenManager(async () => createFakeJWT(3600));
  tm.setToken(createFakeJWT(3600));
  tm.clearToken();
  expect(tm.getToken()).toBeNull();
});
`,
  },

};
