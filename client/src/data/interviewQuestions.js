export const INTERVIEW_CATEGORIES = [
  {
    id: 'js-fundamentals',
    title: 'JS Fundamentals',
    icon: '⚡',
    color: '#eab308',
    section: 'INTERVIEW PREP',
    questions: [
      { id: 'q1', q: 'What is the difference between var, let, and const?', difficulty: 'easy', tags: ['hoisting', 'scope'] },
      { id: 'q2', q: 'Explain hoisting in JavaScript.', difficulty: 'medium', tags: ['hoisting'] },
      { id: 'q3', q: 'What is the temporal dead zone?', difficulty: 'medium', tags: ['hoisting', 'let', 'const'] },
      { id: 'q4', q: 'What are closures and where are they used?', difficulty: 'medium', tags: ['closures'] },
      { id: 'q5', q: 'Explain lexical scope.', difficulty: 'easy', tags: ['scope'] },
      { id: 'q6', q: 'What is the difference between == and ===?', difficulty: 'easy', tags: ['coercion'] },
      { id: 'q7', q: 'What are primitive and non-primitive data types?', difficulty: 'easy', tags: ['types'] },
      { id: 'q8', q: 'Explain event bubbling and event capturing.', difficulty: 'medium', tags: ['events', 'dom'] },
      { id: 'q9', q: 'What is event delegation?', difficulty: 'medium', tags: ['events', 'dom'] },
      { id: 'q10', q: 'What is the difference between shallow copy and deep copy?', difficulty: 'medium', tags: ['objects'] },
      { id: 'q11', q: 'How does this work in JavaScript?', difficulty: 'hard', tags: ['this'] },
      { id: 'q12', q: 'Explain call, apply, and bind.', difficulty: 'medium', tags: ['this'] },
      { id: 'q13', q: 'What are arrow functions and their limitations?', difficulty: 'easy', tags: ['functions', 'this'] },
      { id: 'q14', q: 'Explain prototypal inheritance.', difficulty: 'hard', tags: ['prototypes'] },
      { id: 'q15', q: 'What is the prototype chain?', difficulty: 'hard', tags: ['prototypes'] },
      { id: 'q16', q: 'Difference between synchronous and asynchronous JavaScript?', difficulty: 'medium', tags: ['async'] },
      { id: 'q17', q: 'What is the event loop?', difficulty: 'hard', tags: ['event-loop'] },
      { id: 'q18', q: 'Explain microtasks and macrotasks.', difficulty: 'hard', tags: ['event-loop', 'promises'] },
      { id: 'q19', q: 'Difference between Promise, async/await, and callbacks?', difficulty: 'medium', tags: ['async', 'promises'] },
      { id: 'q20', q: 'What are generators in JavaScript?', difficulty: 'hard', tags: ['generators'] },
      { id: 'q21', q: 'Explain currying in JavaScript.', difficulty: 'hard', tags: ['functional'] },
      { id: 'q22', q: 'What is memoization?', difficulty: 'medium', tags: ['performance', 'functional'] },
      { id: 'q23', q: 'Explain debouncing and throttling.', difficulty: 'medium', tags: ['performance'] },
      { id: 'q24', q: 'What is optional chaining?', difficulty: 'easy', tags: ['es6+'] },
      { id: 'q25', q: 'Explain nullish coalescing operator.', difficulty: 'easy', tags: ['es6+'] },
      { id: 'q26', q: 'What are higher-order functions?', difficulty: 'medium', tags: ['functional'] },
      { id: 'q27', q: 'Explain pure functions.', difficulty: 'easy', tags: ['functional'] },
      { id: 'q28', q: 'What is functional programming?', difficulty: 'medium', tags: ['functional'] },
      { id: 'q29', q: 'Explain immutability.', difficulty: 'easy', tags: ['functional'] },
      { id: 'q30', q: 'What is destructuring?', difficulty: 'easy', tags: ['es6+'] },
      { id: 'q31', q: 'Difference between map, filter, reduce, and forEach?', difficulty: 'easy', tags: ['arrays'] },
      { id: 'q32', q: 'Explain Set and Map.', difficulty: 'easy', tags: ['data-structures'] },
      { id: 'q33', q: 'Difference between WeakMap and Map?', difficulty: 'hard', tags: ['data-structures', 'memory'] },
      { id: 'q34', q: 'What is Symbol in JavaScript?', difficulty: 'hard', tags: ['es6+'] },
      { id: 'q35', q: 'What are iterators and iterables?', difficulty: 'hard', tags: ['iterators'] },
      { id: 'q36', q: 'Explain dynamic imports.', difficulty: 'medium', tags: ['modules'] },
      { id: 'q37', q: 'What are modules in JavaScript?', difficulty: 'medium', tags: ['modules'] },
      { id: 'q38', q: 'Difference between CommonJS and ES Modules?', difficulty: 'medium', tags: ['modules'] },
      { id: 'q39', q: 'Explain tree shaking.', difficulty: 'medium', tags: ['bundlers', 'performance'] },
      { id: 'q40', q: 'What is garbage collection in JavaScript?', difficulty: 'hard', tags: ['memory'] },
    ],
  },
  {
    id: 'advanced-js',
    title: 'Advanced JavaScript',
    icon: '🔥',
    color: '#f97316',
    section: null,
    questions: [
      { id: 'q41', q: 'Explain execution context.', difficulty: 'hard', tags: ['internals'] },
      { id: 'q42', q: 'What is the call stack?', difficulty: 'medium', tags: ['internals'] },
      { id: 'q43', q: 'Explain memory leaks in JavaScript.', difficulty: 'hard', tags: ['memory'] },
      { id: 'q44', q: 'How do you debug memory leaks?', difficulty: 'hard', tags: ['memory', 'devtools'] },
      { id: 'q45', q: 'What causes performance bottlenecks in JavaScript?', difficulty: 'hard', tags: ['performance'] },
      { id: 'q46', q: 'Explain deep cloning techniques.', difficulty: 'medium', tags: ['objects'] },
      { id: 'q47', q: 'Difference between Object.freeze and Object.seal?', difficulty: 'medium', tags: ['objects'] },
      { id: 'q48', q: 'Explain Proxy objects.', difficulty: 'hard', tags: ['metaprogramming'] },
      { id: 'q49', q: 'What are Reflect APIs?', difficulty: 'hard', tags: ['metaprogramming'] },
      { id: 'q50', q: 'Explain async iterators.', difficulty: 'hard', tags: ['async', 'iterators'] },
      { id: 'q51', q: 'What is race condition in frontend applications?', difficulty: 'hard', tags: ['async', 'bugs'] },
      { id: 'q52', q: 'Explain Promise.all, allSettled, race, and any.', difficulty: 'medium', tags: ['promises'] },
      { id: 'q53', q: 'What are web workers?', difficulty: 'hard', tags: ['performance', 'async'] },
      { id: 'q54', q: 'Difference between localStorage, sessionStorage, and cookies?', difficulty: 'medium', tags: ['storage', 'browser'] },
      { id: 'q55', q: 'What are service workers?', difficulty: 'hard', tags: ['pwa', 'cache'] },
      { id: 'q56', q: 'Explain IndexedDB.', difficulty: 'hard', tags: ['storage'] },
      { id: 'q57', q: 'What is the difference between mutation and reassignment?', difficulty: 'medium', tags: ['objects'] },
      { id: 'q58', q: 'Explain observer pattern.', difficulty: 'medium', tags: ['patterns'] },
      { id: 'q59', q: 'Explain publish-subscribe pattern.', difficulty: 'medium', tags: ['patterns'] },
      { id: 'q60', q: 'What is module federation?', difficulty: 'hard', tags: ['architecture', 'micro-fe'] },
    ],
  },
  {
    id: 'browser-internals-q',
    title: 'Browser Internals',
    icon: '🌐',
    color: '#06b6d4',
    section: null,
    questions: [
      { id: 'q61', q: 'How does the browser render a webpage?', difficulty: 'hard', tags: ['rendering'] },
      { id: 'q62', q: 'Explain Critical Rendering Path.', difficulty: 'hard', tags: ['rendering', 'performance'] },
      { id: 'q63', q: 'What is reflow and repaint?', difficulty: 'medium', tags: ['rendering'] },
      { id: 'q64', q: 'Difference between layout thrashing and normal rendering?', difficulty: 'hard', tags: ['performance'] },
      { id: 'q65', q: 'How does the DOM work?', difficulty: 'medium', tags: ['dom'] },
      { id: 'q66', q: 'What is the virtual DOM?', difficulty: 'medium', tags: ['react', 'dom'] },
      { id: 'q67', q: 'Difference between DOM and Shadow DOM?', difficulty: 'hard', tags: ['dom', 'web-components'] },
      { id: 'q68', q: 'Explain hydration.', difficulty: 'hard', tags: ['ssr', 'react'] },
      { id: 'q69', q: 'What is server-side rendering?', difficulty: 'medium', tags: ['ssr'] },
      { id: 'q70', q: 'Difference between SSR, CSR, SSG, and ISR?', difficulty: 'hard', tags: ['rendering-patterns'] },
      { id: 'q71', q: 'How does browser caching work?', difficulty: 'medium', tags: ['caching', 'network'] },
      { id: 'q72', q: 'What are cache headers?', difficulty: 'medium', tags: ['caching', 'network'] },
      { id: 'q73', q: 'Explain cookies lifecycle.', difficulty: 'medium', tags: ['cookies', 'security'] },
      { id: 'q74', q: 'What happens when you type a URL in the browser?', difficulty: 'hard', tags: ['network', 'browser'] },
      { id: 'q75', q: 'Explain browser storage limits.', difficulty: 'medium', tags: ['storage'] },
      { id: 'q76', q: 'What is CORS?', difficulty: 'hard', tags: ['security', 'network'] },
      { id: 'q77', q: 'Explain same-origin policy.', difficulty: 'medium', tags: ['security'] },
      { id: 'q78', q: 'What is prefetching and preloading?', difficulty: 'medium', tags: ['performance'] },
      { id: 'q79', q: 'Explain lazy loading.', difficulty: 'easy', tags: ['performance'] },
      { id: 'q80', q: 'What is the difference between async and defer in script loading?', difficulty: 'medium', tags: ['html', 'performance'] },
    ],
  },
  {
    id: 'html-css-q',
    title: 'HTML & CSS',
    icon: '🎨',
    color: '#a855f7',
    section: null,
    questions: [
      { id: 'q81', q: 'What are semantic HTML tags?', difficulty: 'easy', tags: ['html', 'a11y'] },
      { id: 'q82', q: 'Why is accessibility important?', difficulty: 'easy', tags: ['a11y'] },
      { id: 'q83', q: 'Difference between inline, block, and inline-block?', difficulty: 'easy', tags: ['css', 'layout'] },
      { id: 'q84', q: 'What are ARIA attributes?', difficulty: 'medium', tags: ['a11y', 'html'] },
      { id: 'q85', q: 'Explain form validation in HTML.', difficulty: 'easy', tags: ['html', 'forms'] },
      { id: 'q86', q: 'Explain CSS specificity.', difficulty: 'medium', tags: ['css'] },
      { id: 'q87', q: 'Difference between relative, absolute, fixed, and sticky positioning?', difficulty: 'medium', tags: ['css', 'layout'] },
      { id: 'q88', q: 'Explain flexbox.', difficulty: 'medium', tags: ['css', 'layout'] },
      { id: 'q89', q: 'Explain CSS Grid.', difficulty: 'medium', tags: ['css', 'layout'] },
      { id: 'q90', q: 'Difference between em, rem, %, vh, and vw?', difficulty: 'easy', tags: ['css', 'units'] },
      { id: 'q91', q: 'What is BEM methodology?', difficulty: 'medium', tags: ['css', 'architecture'] },
      { id: 'q92', q: 'Difference between visibility:hidden and display:none?', difficulty: 'easy', tags: ['css'] },
      { id: 'q93', q: 'What is z-index and stacking context?', difficulty: 'medium', tags: ['css', 'layout'] },
      { id: 'q94', q: 'Explain pseudo-elements and pseudo-classes.', difficulty: 'medium', tags: ['css'] },
      { id: 'q95', q: 'What are CSS variables?', difficulty: 'easy', tags: ['css'] },
      { id: 'q96', q: 'Explain responsive design techniques.', difficulty: 'medium', tags: ['css', 'responsive'] },
      { id: 'q97', q: 'What are media queries?', difficulty: 'easy', tags: ['css', 'responsive'] },
      { id: 'q98', q: 'What is critical CSS?', difficulty: 'hard', tags: ['css', 'performance'] },
      { id: 'q99', q: 'Explain CSS animations vs transitions.', difficulty: 'medium', tags: ['css', 'animations'] },
      { id: 'q100', q: 'What causes layout shift?', difficulty: 'medium', tags: ['css', 'cwv'] },
      { id: 'q101', q: 'How do you optimize CSS performance?', difficulty: 'hard', tags: ['css', 'performance'] },
      { id: 'q102', q: 'Explain CSS containment.', difficulty: 'hard', tags: ['css', 'performance'] },
      { id: 'q103', q: 'What are container queries?', difficulty: 'medium', tags: ['css', 'responsive'] },
      { id: 'q104', q: 'Difference between Tailwind CSS and traditional CSS?', difficulty: 'easy', tags: ['css', 'architecture'] },
      { id: 'q105', q: 'What are design tokens?', difficulty: 'medium', tags: ['design-system'] },
      { id: 'q106', q: 'Explain dark mode implementation.', difficulty: 'medium', tags: ['css', 'ux'] },
      { id: 'q107', q: 'What is CSS-in-JS?', difficulty: 'medium', tags: ['css', 'react'] },
      { id: 'q108', q: 'What are web components?', difficulty: 'hard', tags: ['web-components'] },
      { id: 'q109', q: 'Explain picture and srcset.', difficulty: 'medium', tags: ['html', 'performance', 'images'] },
      { id: 'q110', q: 'Difference between SVG and Canvas?', difficulty: 'medium', tags: ['html', 'graphics'] },
    ],
  },
  {
    id: 'react-deep-q',
    title: 'React Deep Dive',
    icon: '⚛️',
    color: '#4facfe',
    section: 'FRAMEWORK',
    questions: [
      { id: 'q111', q: 'Explain React lifecycle.', difficulty: 'medium', tags: ['lifecycle'] },
      { id: 'q112', q: 'Difference between functional and class components?', difficulty: 'easy', tags: ['components'] },
      { id: 'q113', q: 'What are hooks in React?', difficulty: 'medium', tags: ['hooks'] },
      { id: 'q114', q: 'Explain useEffect in detail.', difficulty: 'hard', tags: ['hooks', 'useeffect'] },
      { id: 'q115', q: 'What are common mistakes with useEffect?', difficulty: 'hard', tags: ['hooks', 'bugs'] },
      { id: 'q116', q: 'Explain useMemo and useCallback.', difficulty: 'hard', tags: ['hooks', 'performance'] },
      { id: 'q117', q: 'Difference between controlled and uncontrolled components?', difficulty: 'medium', tags: ['forms'] },
      { id: 'q118', q: 'What is lifting state up?', difficulty: 'easy', tags: ['state'] },
      { id: 'q119', q: 'Explain prop drilling.', difficulty: 'easy', tags: ['state', 'patterns'] },
      { id: 'q120', q: 'What is Context API?', difficulty: 'medium', tags: ['state', 'context'] },
      { id: 'q121', q: 'Difference between Context API and Redux?', difficulty: 'hard', tags: ['state', 'redux'] },
      { id: 'q122', q: 'Explain React reconciliation.', difficulty: 'hard', tags: ['internals', 'fiber'] },
      { id: 'q123', q: 'What is React Fiber?', difficulty: 'hard', tags: ['internals', 'fiber'] },
      { id: 'q124', q: 'Explain React rendering process.', difficulty: 'hard', tags: ['rendering', 'internals'] },
      { id: 'q125', q: 'What causes unnecessary re-renders?', difficulty: 'hard', tags: ['performance', 'rendering'] },
      { id: 'q126', q: 'How do you optimize React applications?', difficulty: 'hard', tags: ['performance'] },
      { id: 'q127', q: 'What is React.memo?', difficulty: 'medium', tags: ['performance', 'memoization'] },
      { id: 'q128', q: 'Explain code splitting in React.', difficulty: 'medium', tags: ['performance'] },
      { id: 'q129', q: 'What are error boundaries?', difficulty: 'medium', tags: ['error-handling'] },
      { id: 'q130', q: 'Explain Suspense in React.', difficulty: 'hard', tags: ['suspense', 'concurrent'] },
      { id: 'q131', q: 'What is concurrent rendering?', difficulty: 'hard', tags: ['concurrent', 'fiber'] },
      { id: 'q132', q: 'Explain hydration mismatch.', difficulty: 'hard', tags: ['ssr', 'bugs'] },
      { id: 'q133', q: 'What are React portals?', difficulty: 'medium', tags: ['dom', 'patterns'] },
      { id: 'q134', q: 'What are higher-order components?', difficulty: 'medium', tags: ['patterns'] },
      { id: 'q135', q: 'Explain render props pattern.', difficulty: 'medium', tags: ['patterns'] },
      { id: 'q136', q: 'What are compound components?', difficulty: 'hard', tags: ['patterns'] },
      { id: 'q137', q: 'Explain custom hooks.', difficulty: 'medium', tags: ['hooks'] },
      { id: 'q138', q: 'What are refs in React?', difficulty: 'medium', tags: ['refs', 'dom'] },
      { id: 'q139', q: 'Difference between useRef and useState?', difficulty: 'medium', tags: ['hooks', 'refs'] },
      { id: 'q140', q: 'What is state batching?', difficulty: 'hard', tags: ['rendering', 'state'] },
      { id: 'q141', q: 'Why does React batch state updates?', difficulty: 'hard', tags: ['rendering', 'state'] },
      { id: 'q142', q: 'Explain stale closures in React.', difficulty: 'hard', tags: ['hooks', 'closures', 'bugs'] },
      { id: 'q143', q: 'Difference between useEffect and useLayoutEffect?', difficulty: 'hard', tags: ['hooks'] },
      { id: 'q144', q: 'Why are hooks called in the same order?', difficulty: 'hard', tags: ['hooks', 'internals'] },
      { id: 'q145', q: 'What is referential equality in React?', difficulty: 'medium', tags: ['performance', 'memoization'] },
      { id: 'q146', q: 'Explain transitions in React 18.', difficulty: 'hard', tags: ['concurrent', 'react18'] },
      { id: 'q147', q: 'Difference between client and server components?', difficulty: 'hard', tags: ['rsc', 'nextjs'] },
      { id: 'q148', q: 'What are React anti-patterns?', difficulty: 'hard', tags: ['patterns', 'best-practices'] },
      { id: 'q149', q: 'What is flushSync?', difficulty: 'hard', tags: ['react18', 'batching'] },
      { id: 'q150', q: 'Explain Strict Mode double rendering.', difficulty: 'medium', tags: ['debugging', 'react18'] },
    ],
  },
  {
    id: 'typescript-q',
    title: 'TypeScript',
    icon: '𝕋',
    color: '#4facfe',
    section: null,
    questions: [
      { id: 'q151', q: 'Why use TypeScript?', difficulty: 'easy', tags: ['typescript'] },
      { id: 'q152', q: 'Difference between interface and type?', difficulty: 'medium', tags: ['typescript'] },
      { id: 'q153', q: 'What are generics?', difficulty: 'hard', tags: ['typescript'] },
      { id: 'q154', q: 'Explain utility types.', difficulty: 'medium', tags: ['typescript'] },
      { id: 'q155', q: 'Difference between any, unknown, and never?', difficulty: 'hard', tags: ['typescript'] },
      { id: 'q156', q: 'What is type inference?', difficulty: 'medium', tags: ['typescript'] },
      { id: 'q157', q: 'Explain union and intersection types.', difficulty: 'medium', tags: ['typescript'] },
      { id: 'q158', q: 'What are mapped types?', difficulty: 'hard', tags: ['typescript'] },
      { id: 'q159', q: 'Explain enums in TypeScript.', difficulty: 'medium', tags: ['typescript'] },
      { id: 'q160', q: 'What are type guards?', difficulty: 'hard', tags: ['typescript'] },
      { id: 'q161', q: 'Explain declaration merging.', difficulty: 'hard', tags: ['typescript'] },
      { id: 'q162', q: 'What is strict mode in TypeScript?', difficulty: 'medium', tags: ['typescript'] },
      { id: 'q163', q: 'Explain function overloading.', difficulty: 'hard', tags: ['typescript'] },
      { id: 'q164', q: 'Difference between extends and implements?', difficulty: 'medium', tags: ['typescript', 'oop'] },
      { id: 'q165', q: 'Explain readonly and optional modifiers.', difficulty: 'easy', tags: ['typescript'] },
    ],
  },
  {
    id: 'state-management-q',
    title: 'State Management',
    icon: '🗄',
    color: '#a855f7',
    section: 'STATE & DATA',
    questions: [
      { id: 'q166', q: 'What is state management?', difficulty: 'easy', tags: ['state'] },
      { id: 'q167', q: 'Explain Redux architecture.', difficulty: 'hard', tags: ['redux'] },
      { id: 'q168', q: 'What is Redux middleware?', difficulty: 'hard', tags: ['redux'] },
      { id: 'q169', q: 'Explain Redux Toolkit.', difficulty: 'medium', tags: ['redux'] },
      { id: 'q170', q: 'Difference between Redux and Zustand?', difficulty: 'medium', tags: ['redux', 'zustand'] },
      { id: 'q171', q: 'What is MobX?', difficulty: 'medium', tags: ['mobx', 'state'] },
      { id: 'q172', q: 'Explain optimistic updates.', difficulty: 'hard', tags: ['ux', 'state'] },
      { id: 'q173', q: 'What is normalized state?', difficulty: 'hard', tags: ['redux', 'state'] },
      { id: 'q174', q: 'Explain client-side caching.', difficulty: 'medium', tags: ['caching', 'state'] },
      { id: 'q175', q: 'Difference between React Query and Redux?', difficulty: 'hard', tags: ['react-query', 'redux'] },
      { id: 'q176', q: 'What is stale-while-revalidate?', difficulty: 'medium', tags: ['caching', 'react-query'] },
      { id: 'q177', q: 'What is atomic state management?', difficulty: 'hard', tags: ['recoil', 'jotai'] },
      { id: 'q178', q: 'What are race conditions in state management?', difficulty: 'hard', tags: ['bugs', 'async'] },
      { id: 'q179', q: 'Explain state persistence.', difficulty: 'medium', tags: ['state', 'storage'] },
      { id: 'q180', q: 'What is optimistic UI?', difficulty: 'hard', tags: ['ux', 'state'] },
    ],
  },
  {
    id: 'performance-q',
    title: 'Performance',
    icon: '⚡',
    color: '#f97316',
    section: null,
    questions: [
      { id: 'q181', q: 'How do you improve frontend performance?', difficulty: 'hard', tags: ['performance'] },
      { id: 'q182', q: 'What are Core Web Vitals?', difficulty: 'medium', tags: ['cwv'] },
      { id: 'q183', q: 'Explain Largest Contentful Paint.', difficulty: 'medium', tags: ['cwv', 'lcp'] },
      { id: 'q184', q: 'Explain Interaction to Next Paint.', difficulty: 'hard', tags: ['cwv', 'inp'] },
      { id: 'q185', q: 'Explain Cumulative Layout Shift.', difficulty: 'medium', tags: ['cwv', 'cls'] },
      { id: 'q186', q: 'What tools do you use for performance profiling?', difficulty: 'medium', tags: ['devtools', 'profiling'] },
      { id: 'q187', q: 'How do you optimize bundle size?', difficulty: 'hard', tags: ['bundlers', 'performance'] },
      { id: 'q188', q: 'What is tree shaking?', difficulty: 'medium', tags: ['bundlers'] },
      { id: 'q189', q: 'Explain code splitting strategies.', difficulty: 'hard', tags: ['bundlers', 'performance'] },
      { id: 'q190', q: 'What is lazy hydration?', difficulty: 'hard', tags: ['ssr', 'performance'] },
      { id: 'q191', q: 'Explain virtualization in large lists.', difficulty: 'hard', tags: ['performance', 'ux'] },
      { id: 'q192', q: 'How do you optimize images?', difficulty: 'medium', tags: ['images', 'performance'] },
      { id: 'q193', q: 'Explain CDN benefits.', difficulty: 'easy', tags: ['network', 'performance'] },
      { id: 'q194', q: 'What is HTTP/2?', difficulty: 'medium', tags: ['network', 'http'] },
      { id: 'q195', q: 'Difference between HTTP/1.1 and HTTP/2?', difficulty: 'medium', tags: ['network'] },
      { id: 'q196', q: 'Explain Brotli and Gzip compression.', difficulty: 'medium', tags: ['network', 'performance'] },
      { id: 'q197', q: 'How do you reduce Time to Interactive?', difficulty: 'hard', tags: ['performance', 'cwv'] },
      { id: 'q198', q: 'What is preconnect and dns-prefetch?', difficulty: 'medium', tags: ['performance', 'network'] },
      { id: 'q199', q: 'Explain resource prioritization.', difficulty: 'hard', tags: ['performance', 'network'] },
      { id: 'q200', q: 'Explain Lighthouse.', difficulty: 'medium', tags: ['devtools', 'performance'] },
    ],
  },
  {
    id: 'security-q',
    title: 'Security',
    icon: '🔒',
    color: '#ef4444',
    section: null,
    questions: [
      { id: 'q201', q: 'What is XSS?', difficulty: 'medium', tags: ['xss'] },
      { id: 'q202', q: 'How do you prevent XSS attacks?', difficulty: 'hard', tags: ['xss'] },
      { id: 'q203', q: 'What is CSRF?', difficulty: 'medium', tags: ['csrf'] },
      { id: 'q204', q: 'How do you prevent CSRF attacks?', difficulty: 'hard', tags: ['csrf'] },
      { id: 'q205', q: 'What is Content Security Policy?', difficulty: 'hard', tags: ['csp', 'xss'] },
      { id: 'q206', q: 'Explain CORS security risks.', difficulty: 'hard', tags: ['cors'] },
      { id: 'q207', q: 'What is clickjacking?', difficulty: 'medium', tags: ['security'] },
      { id: 'q208', q: 'How does Helmet improve security?', difficulty: 'medium', tags: ['express', 'security'] },
      { id: 'q209', q: 'What are secure cookies?', difficulty: 'medium', tags: ['cookies', 'security'] },
      { id: 'q210', q: 'Difference between authentication and authorization?', difficulty: 'easy', tags: ['auth'] },
      { id: 'q211', q: 'What is JWT?', difficulty: 'medium', tags: ['jwt', 'auth'] },
      { id: 'q212', q: 'What are refresh tokens?', difficulty: 'hard', tags: ['jwt', 'auth'] },
      { id: 'q213', q: 'Explain OAuth flow.', difficulty: 'hard', tags: ['oauth', 'auth'] },
      { id: 'q214', q: 'What are common frontend security vulnerabilities?', difficulty: 'hard', tags: ['security'] },
      { id: 'q215', q: 'How do you securely store tokens?', difficulty: 'hard', tags: ['auth', 'security'] },
      { id: 'q216', q: 'What is SameSite cookie attribute?', difficulty: 'hard', tags: ['cookies', 'csrf'] },
      { id: 'q217', q: 'What is rate limiting?', difficulty: 'medium', tags: ['security', 'api'] },
      { id: 'q218', q: 'What are security headers?', difficulty: 'medium', tags: ['security', 'http'] },
    ],
  },
  {
    id: 'testing-q',
    title: 'Testing',
    icon: '✅',
    color: '#00ff88',
    section: null,
    questions: [
      { id: 'q219', q: 'Difference between unit, integration, and E2E testing?', difficulty: 'medium', tags: ['testing'] },
      { id: 'q220', q: 'What is Jest?', difficulty: 'easy', tags: ['jest', 'testing'] },
      { id: 'q221', q: 'Explain React Testing Library.', difficulty: 'medium', tags: ['rtl', 'react', 'testing'] },
      { id: 'q222', q: 'What is mocking?', difficulty: 'medium', tags: ['testing', 'mocking'] },
      { id: 'q223', q: 'Explain snapshot testing.', difficulty: 'medium', tags: ['jest', 'testing'] },
      { id: 'q224', q: 'What is Cypress?', difficulty: 'easy', tags: ['e2e', 'cypress'] },
      { id: 'q225', q: 'Difference between Cypress and Playwright?', difficulty: 'medium', tags: ['e2e', 'testing'] },
      { id: 'q226', q: 'What should not be tested?', difficulty: 'medium', tags: ['testing', 'best-practices'] },
      { id: 'q227', q: 'What is TDD?', difficulty: 'medium', tags: ['testing', 'methodology'] },
      { id: 'q228', q: 'How do you test async code?', difficulty: 'hard', tags: ['testing', 'async'] },
      { id: 'q229', q: 'Explain accessibility testing.', difficulty: 'medium', tags: ['a11y', 'testing'] },
      { id: 'q230', q: 'What are flaky tests?', difficulty: 'medium', tags: ['testing', 'e2e'] },
    ],
  },
  {
    id: 'networking-q',
    title: 'Networking & APIs',
    icon: '🌐',
    color: '#06b6d4',
    section: 'NETWORKING',
    questions: [
      { id: 'q231', q: 'Difference between REST and GraphQL?', difficulty: 'medium', tags: ['api', 'graphql'] },
      { id: 'q232', q: 'What is RESTful architecture?', difficulty: 'medium', tags: ['api', 'rest'] },
      { id: 'q233', q: 'Explain HTTP status codes.', difficulty: 'easy', tags: ['http', 'api'] },
      { id: 'q234', q: 'Difference between PUT and PATCH?', difficulty: 'easy', tags: ['http', 'rest'] },
      { id: 'q235', q: 'What are WebSockets?', difficulty: 'medium', tags: ['websockets', 'realtime'] },
      { id: 'q236', q: 'Explain SSE (Server-Sent Events).', difficulty: 'medium', tags: ['sse', 'realtime'] },
      { id: 'q237', q: 'Difference between fetch and axios?', difficulty: 'easy', tags: ['api', 'http'] },
      { id: 'q238', q: 'What are interceptors?', difficulty: 'medium', tags: ['axios', 'api'] },
      { id: 'q239', q: 'Explain retries and exponential backoff.', difficulty: 'hard', tags: ['api', 'reliability'] },
      { id: 'q240', q: 'What are idempotent APIs?', difficulty: 'medium', tags: ['api', 'rest'] },
      { id: 'q241', q: 'Explain request cancellation with AbortController.', difficulty: 'medium', tags: ['api', 'fetch'] },
      { id: 'q242', q: 'What are network waterfalls?', difficulty: 'hard', tags: ['devtools', 'performance'] },
      { id: 'q243', q: 'Explain long polling.', difficulty: 'medium', tags: ['realtime', 'http'] },
      { id: 'q244', q: 'Explain optimistic UI updates.', difficulty: 'hard', tags: ['ux', 'state'] },
      { id: 'q245', q: 'What is API versioning?', difficulty: 'medium', tags: ['api', 'rest'] },
    ],
  },
  {
    id: 'system-design-q',
    title: 'System Design',
    icon: '🏗',
    color: '#f97316',
    section: 'ARCHITECTURE',
    questions: [
      { id: 'q246', q: 'How would you design a scalable frontend architecture?', difficulty: 'hard', tags: ['architecture'] },
      { id: 'q247', q: 'How would you structure a large React project?', difficulty: 'hard', tags: ['architecture', 'react'] },
      { id: 'q248', q: 'Explain micro frontends.', difficulty: 'hard', tags: ['micro-fe'] },
      { id: 'q249', q: 'When should micro frontends be avoided?', difficulty: 'hard', tags: ['micro-fe', 'tradeoffs'] },
      { id: 'q250', q: 'How would you design a design system?', difficulty: 'hard', tags: ['design-system'] },
      { id: 'q251', q: 'Explain monorepo architecture.', difficulty: 'hard', tags: ['monorepo'] },
      { id: 'q252', q: 'How would you improve performance of a large application?', difficulty: 'hard', tags: ['performance'] },
      { id: 'q253', q: 'How would you handle feature flags?', difficulty: 'medium', tags: ['architecture'] },
      { id: 'q254', q: 'How do you monitor frontend errors?', difficulty: 'medium', tags: ['observability', 'sentry'] },
      { id: 'q255', q: 'What is canary deployment?', difficulty: 'medium', tags: ['deployment', 'cicd'] },
      { id: 'q256', q: 'How would you build a real-time collaboration system?', difficulty: 'hard', tags: ['realtime', 'system-design'] },
      { id: 'q257', q: 'How would you implement offline-first architecture?', difficulty: 'hard', tags: ['pwa', 'service-workers'] },
      { id: 'q258', q: 'Design YouTube frontend architecture.', difficulty: 'hard', tags: ['faang', 'system-design'] },
      { id: 'q259', q: 'Design a scalable notification system.', difficulty: 'hard', tags: ['faang', 'realtime'] },
      { id: 'q260', q: 'How would you build an infinite feed like Instagram?', difficulty: 'hard', tags: ['faang', 'virtualization'] },
    ],
  },
  {
    id: 'machine-coding-q',
    title: 'Machine Coding',
    icon: '💻',
    color: '#00ff88',
    section: null,
    questions: [
      { id: 'q261', q: 'Build an autocomplete search component.', difficulty: 'hard', tags: ['components', 'async'] },
      { id: 'q262', q: 'Build a debounce utility function.', difficulty: 'medium', tags: ['utils', 'performance'] },
      { id: 'q263', q: 'Implement infinite scrolling.', difficulty: 'hard', tags: ['scroll', 'performance'] },
      { id: 'q264', q: 'Create a drag-and-drop feature.', difficulty: 'hard', tags: ['ux', 'dom'] },
      { id: 'q265', q: 'Build a modal component.', difficulty: 'medium', tags: ['components', 'portals'] },
      { id: 'q266', q: 'Create a custom React hook (useFetch).', difficulty: 'medium', tags: ['hooks'] },
      { id: 'q267', q: 'Build a toast notification system.', difficulty: 'hard', tags: ['components', 'state'] },
      { id: 'q268', q: 'Build a nested comment system.', difficulty: 'hard', tags: ['recursion', 'components'] },
      { id: 'q269', q: 'Implement virtual scrolling.', difficulty: 'hard', tags: ['performance', 'virtualization'] },
      { id: 'q270', q: 'Build a multi-step form.', difficulty: 'hard', tags: ['forms', 'state'] },
      { id: 'q271', q: 'Implement a Kanban board.', difficulty: 'hard', tags: ['drag-drop', 'state'] },
      { id: 'q272', q: 'Create a custom state management library.', difficulty: 'hard', tags: ['state', 'advanced'] },
      { id: 'q273', q: 'Build role-based routing.', difficulty: 'hard', tags: ['auth', 'routing'] },
      { id: 'q274', q: 'Implement optimistic updates.', difficulty: 'hard', tags: ['ux', 'state'] },
      { id: 'q275', q: 'Build a pagination component.', difficulty: 'medium', tags: ['components', 'api'] },
    ],
  },
  {
    id: 'devtools-debug-q',
    title: 'DevTools & Debugging',
    icon: '🔧',
    color: '#eab308',
    section: 'DEBUGGING',
    questions: [
      { id: 'q276', q: 'How do you debug React rendering issues?', difficulty: 'hard', tags: ['debugging', 'react'] },
      { id: 'q277', q: 'How do you analyze network requests?', difficulty: 'medium', tags: ['devtools', 'network'] },
      { id: 'q278', q: 'Explain Chrome DevTools usage.', difficulty: 'medium', tags: ['devtools'] },
      { id: 'q279', q: 'How do you debug memory leaks?', difficulty: 'hard', tags: ['memory', 'devtools'] },
      { id: 'q280', q: 'How do you trace performance bottlenecks?', difficulty: 'hard', tags: ['performance', 'devtools'] },
      { id: 'q281', q: 'Explain source maps.', difficulty: 'medium', tags: ['debugging', 'bundlers'] },
      { id: 'q282', q: 'How do you debug hydration errors?', difficulty: 'hard', tags: ['ssr', 'debugging'] },
      { id: 'q283', q: 'Explain React Profiler.', difficulty: 'hard', tags: ['react', 'performance', 'devtools'] },
      { id: 'q284', q: 'How do you debug production-only bugs?', difficulty: 'hard', tags: ['debugging', 'production'] },
      { id: 'q285', q: 'How do you use the Performance panel?', difficulty: 'hard', tags: ['devtools', 'performance'] },
    ],
  },
  {
    id: 'behavioral-q',
    title: 'Behavioral & Leadership',
    icon: '🎤',
    color: '#a855f7',
    section: 'BEHAVIORAL',
    questions: [
      { id: 'q286', q: 'Tell me about yourself.', difficulty: 'easy', tags: ['intro'] },
      { id: 'q287', q: 'Describe a challenging frontend bug you solved.', difficulty: 'medium', tags: ['problem-solving'] },
      { id: 'q288', q: 'Explain a performance issue you fixed.', difficulty: 'medium', tags: ['performance', 'experience'] },
      { id: 'q289', q: 'How do you review code?', difficulty: 'medium', tags: ['code-review'] },
      { id: 'q290', q: 'How do you mentor junior developers?', difficulty: 'medium', tags: ['leadership'] },
      { id: 'q291', q: 'Describe a failed project and what you learned.', difficulty: 'medium', tags: ['growth'] },
      { id: 'q292', q: 'How do you prioritize technical debt?', difficulty: 'hard', tags: ['leadership', 'planning'] },
      { id: 'q293', q: 'How do you handle tight deadlines?', difficulty: 'medium', tags: ['planning'] },
      { id: 'q294', q: 'Describe your debugging process.', difficulty: 'medium', tags: ['debugging'] },
      { id: 'q295', q: 'What qualities make a senior frontend engineer?', difficulty: 'easy', tags: ['leadership'] },
      { id: 'q296', q: 'How do you communicate with backend teams?', difficulty: 'medium', tags: ['communication'] },
      { id: 'q297', q: 'Describe a production outage you handled.', difficulty: 'hard', tags: ['incident', 'leadership'] },
      { id: 'q298', q: 'How do you stay updated with frontend trends?', difficulty: 'easy', tags: ['growth'] },
      { id: 'q299', q: 'How do you handle stakeholder disagreements?', difficulty: 'hard', tags: ['leadership', 'communication'] },
      { id: 'q300', q: 'Why should we hire you?', difficulty: 'easy', tags: ['intro'] },
    ],
  },
];

export const ALL_QUESTIONS = INTERVIEW_CATEGORIES.flatMap(cat =>
  cat.questions.map(q => ({ ...q, categoryId: cat.id, categoryTitle: cat.title, categoryColor: cat.color }))
);

export const ANSWERS = {
  'q1': {
    short: 'var is function-scoped and hoisted with undefined. let/const are block-scoped with TDZ. const prevents reassignment.',
    full: `var:
- Function-scoped (not block-scoped)
- Hoisted and initialized to undefined
- Can be redeclared
- Avoid in modern code

let:
- Block-scoped
- Hoisted but in TDZ (ReferenceError if accessed early)
- Cannot be redeclared in same scope
- Use when you need to reassign

const:
- Block-scoped
- Must be initialized at declaration
- Cannot be reassigned (but objects/arrays are still mutable!)
- Use by default — signals intent`,
    code: `var x = 1; var x = 2;     // ok (redeclare)
let y = 1; let y = 2;     // SyntaxError
const z = {}; z.a = 1;   // ok (mutation)
const z = {};             // TypeError (reassign)

// Hoisting:
console.log(a); // undefined (var hoisted)
console.log(b); // ReferenceError (TDZ)
var a = 1;
let b = 2;`,
    tip: 'Default to const. Use let when you need to reassign. Never use var — it has too many footguns.',
  },
  'q4': {
    short: 'A closure is a function that remembers variables from its outer scope even after that scope has finished executing.',
    full: `A closure is created when:
1. There is a function inside another function
2. The inner function references variables from the outer function
3. The inner function is returned or passed elsewhere

Key insight: closures capture a REFERENCE to the variable, not a copy. This is why the classic var-in-loop bug happens.

Common uses:
- Data privacy (private variables)
- Function factories
- Memoization
- Event handlers
- React hooks (useState closes over state index)`,
    code: `function createCounter() {
  let count = 0; // private
  return {
    inc: () => ++count,
    get: () => count,
  };
}
const counter = createCounter();
counter.inc(); // 1
counter.inc(); // 2
console.log(counter.count); // undefined ← truly private

// Classic bug:
for (var i = 0; i < 3; i++) {
  setTimeout(() => console.log(i)); // 3,3,3
}
// Fix with let:
for (let i = 0; i < 3; i++) {
  setTimeout(() => console.log(i)); // 0,1,2
}`,
    tip: 'Lead with the private counter example. Then explain the var loop bug. Then mention React hooks use closures.',
  },
  'q17': {
    short: 'The Event Loop allows JS to be non-blocking despite being single-threaded by coordinating the call stack, Web APIs, microtask queue, and macrotask queue.',
    full: `Order of execution:
1. Run all synchronous code (Call Stack)
2. Drain ALL microtasks (Promise.then, queueMicrotask)
3. Take ONE macrotask (setTimeout, setInterval)
4. Render if needed
5. Repeat

Microtasks (high priority): Promise.then, MutationObserver
Macrotasks (lower priority): setTimeout, setInterval, I/O`,
    code: `console.log('1');          // sync → stack
setTimeout(() => console.log('2'), 0); // macrotask
Promise.resolve().then(() => console.log('3')); // microtask
console.log('4');          // sync → stack

// Output: 1, 4, 3, 2
// NOT 1, 2, 3, 4`,
    tip: 'Draw the boxes: Call Stack, Web APIs, Microtask Queue, Macrotask Queue. Walk through the code step by step.',
  },
  'q63': {
    short: 'Reflow recalculates layout geometry (expensive). Repaint redraws pixels without layout change. Composite-only changes (opacity, transform) are cheapest — GPU-handled.',
    full: `Pipeline: JS → Style → Layout → Paint → Composite

Reflow triggers (most expensive):
- Changing width, height, margin, padding, font-size
- Adding/removing DOM elements
- Reading offsetWidth, getBoundingClientRect (forced sync)

Repaint triggers (cheaper):
- Changing color, background, visibility, outline

Composite only (cheapest — GPU):
- opacity, transform, filter

Layout thrashing: read then write in a loop forces multiple reflows.`,
    code: `// ❌ Layout thrashing
for (let el of elements) {
  el.style.width = container.offsetWidth + 'px'; // read→write each iteration
}

// ✅ Batch reads then writes
const w = container.offsetWidth; // read once
for (let el of elements) {
  el.style.width = w + 'px'; // write only
}

// ✅ Use transform for animation (no reflow)
// ❌ el.style.left = x + 'px';
// ✅ el.style.transform = \`translateX(\${x}px)\`;`,
    tip: 'Memorize: width/height = reflow. color = repaint. opacity/transform = composite only (GPU). Layout thrashing is read-then-write in a loop.',
  },
  'q116': {
    short: 'useMemo memoizes a computed value. useCallback memoizes a function reference. Both prevent unnecessary recalculations and re-renders — but only use them when there\'s a measurable benefit.',
    full: `useMemo: caches a computed value
- Use when: expensive calculations, creating stable object/array refs
- Returns the memoized VALUE

useCallback: caches a function reference
- Use when: passing callbacks to memoized children
- Returns the memoized FUNCTION

When NOT to use:
- Simple calculations — memoization has overhead too
- When the dependency changes every render anyway
- Premature optimization without measurement

The rules: measure first, optimize second.`,
    code: `// useMemo: memoize computed value
const sorted = useMemo(
  () => expensiveSort(items),
  [items] // only re-sort when items changes
);

// useCallback: memoize function reference
const handleClick = useCallback(
  () => dispatch({ type: 'click', id }),
  [id, dispatch] // new fn only when id or dispatch changes
);

// ❌ Unnecessary — simple ops don't need memoization
const doubled = useMemo(() => count * 2, [count]);
// ✅ Just write: const doubled = count * 2;`,
    tip: 'Key insight: useMemo returns VALUE, useCallback returns FUNCTION. Both need the child to be wrapped in React.memo to actually prevent re-renders.',
  },
  'q125': {
    short: 'Re-renders are caused by: state changes, prop changes (new references), parent re-renders, context changes, and hooks returning new values.',
    full: `5 causes of unnecessary re-renders:

1. New object/array reference in props each render
   const config = { color: 'red' }; // new ref every render!

2. Inline functions not memoized
   <Child onClick={() => doSomething()} /> // new ref every render

3. Context value not memoized
   <Context.Provider value={{ user, login }}> // new obj!

4. Parent re-renders propagate to all children (unless React.memo)

5. useSelector not granular enough — entire object comparison fails

Solutions: React.memo, useMemo, useCallback, split context, granular selectors`,
    code: `// ❌ New object ref every render → Child always re-renders
function Parent() {
  const config = { color: 'red' }; // recreated each render
  return <Child config={config} />;
}

// ✅ Stable ref with useMemo
function Parent() {
  const config = useMemo(() => ({ color: 'red' }), []);
  return <MemoChild config={config} />;
}
const MemoChild = React.memo(Child);

// ❌ Context causes all consumers to re-render
const ctx = { user, login }; // new object each render!
// ✅ Memoize context value
const ctx = useMemo(() => ({ user, login }), [user, login]);`,
    tip: 'In interviews, mention the React DevTools Profiler — you can see which components re-rendered and why (highlighted in flame chart).',
  },
  'q74': {
    short: 'DNS lookup → TCP connection → TLS handshake → HTTP request → Server processing → HTTP response → Browser parsing → Rendering',
    full: `Full flow when you type "google.com":

1. URL parsing — protocol, domain, path
2. HSTS check — is this domain HTTPS-only?
3. DNS lookup — browser cache → OS cache → DNS resolver → root/TLD/authoritative nameserver
4. TCP connection — 3-way handshake (SYN → SYN-ACK → ACK)
5. TLS handshake — if HTTPS (certificate exchange, key agreement)
6. HTTP request — GET / HTTP/1.1 with headers
7. Server response — HTML, status code, response headers
8. Browser parsing — HTML → DOM, CSS → CSSOM, combined into Render Tree
9. Layout → Paint → Composite → pixels on screen`,
    code: `// What cache headers affect step 3+:
Cache-Control: max-age=300   // browser caches DNS for 5min
// TCP reuse via HTTP/2 multiplexing (no new handshake per request)
// TLS session resumption (skips full handshake on repeat visits)
// Connection: keep-alive (HTTP/1.1 reuses TCP connection)`,
    tip: 'This is a classic FAANG question. Mention HSTS, DNS caching, and TCP handshake. Most candidates stop at "DNS then HTTP" — going deeper signals seniority.',
  },
  'q262': {
    short: 'A debounce function delays execution until a pause in calls. Used for search inputs, resize handlers.',
    full: `Debounce: wait until N ms after the LAST call, then execute once.
Throttle: execute at most once per N ms regardless of call frequency.

When to use which:
- Debounce: search input, form validation, window resize
- Throttle: scroll handler, mousemove, rate-limiting API calls`,
    code: `function debounce(fn, delay) {
  let timer;
  return function (...args) {
    clearTimeout(timer);
    timer = setTimeout(() => {
      fn.apply(this, args);
    }, delay);
  };
}

// Usage
const search = debounce((query) => {
  fetchResults(query);
}, 300);

input.addEventListener('input', e => search(e.target.value));
// Waits 300ms after user stops typing before calling fetchResults

// Throttle:
function throttle(fn, limit) {
  let inThrottle;
  return function (...args) {
    if (!inThrottle) {
      fn.apply(this, args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}`,
    tip: 'Implement both debounce and throttle from scratch. Common follow-up: add a leading/trailing option to debounce.',
  },
};