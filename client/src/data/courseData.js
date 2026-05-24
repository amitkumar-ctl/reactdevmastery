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
  { id: 'behavioral-round', icon: '🎤', label: 'Behavioral Round', section: null },
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
};
