import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './TimeLine.module.css';

const TIMELINE = [
  {
    year: '2013',
    title: 'React Released',
    subtitle: 'Facebook open-sources React',
    color: '#4facfe',
    category: 'FOUNDATION',
    what: 'Facebook released React to solve one problem: building large UIs where data changes over time. jQuery apps were becoming unmaintainable — every state change required manually finding and updating DOM nodes.',
    impact: 'Introduced the Virtual DOM and declarative UI — you describe what the UI should look like, React figures out how to update the DOM.',
    concepts: [
      { id: 'virtual-dom', topicId: 'react-core', label: 'Virtual DOM' },
      { id: 'render-cycle', topicId: 'react-core', label: 'Render Cycle' },
    ],
  },
  {
    year: '2015',
    title: 'ES6 / ES2015',
    subtitle: 'JavaScript gets classes, arrows, promises',
    color: '#eab308',
    category: 'JAVASCRIPT',
    what: 'ECMAScript 2015 was the biggest JavaScript update in years. It introduced classes, arrow functions, let/const, template literals, destructuring, and native Promises — fundamentally changing how JavaScript was written.',
    impact: 'React adopted ES6 classes for components. Understanding ES6 is a prerequisite for understanding React class components, and the prototype system underneath.',
    concepts: [
      { id: 'proto-class', topicId: 'prototypes', label: 'ES6 Classes' },
      { id: 'promise-internals', topicId: 'async', label: 'Promise Internals' },
      { id: 'closure-def', topicId: 'closures', label: 'Closures' },
      { id: 'event-loop', topicId: 'js-core', label: 'Event Loop' },
    ],
  },
  {
    year: '2016',
    title: 'React Fiber',
    subtitle: 'Complete rewrite of the reconciler',
    color: '#00ff88',
    category: 'REACT INTERNALS',
    what: 'React 16 rewrote its core algorithm from scratch. The old reconciler was synchronous — once it started rendering, it couldn\'t stop, blocking the browser for hundreds of milliseconds on complex UIs.',
    impact: 'Fiber made rendering interruptible. React could now pause, resume, and prioritize work — the foundation for everything that came after: Suspense, Concurrent Mode, and streaming.',
    concepts: [
      { id: 'fiber', topicId: 'react-core', label: 'React Fiber' },
      { id: 'error-boundaries', topicId: 'react-patterns', label: 'Error Boundaries' },
    ],
  },
  {
    year: '2017',
    title: 'async/await',
    subtitle: 'ES2017 makes async code readable',
    color: '#a855f7',
    category: 'JAVASCRIPT',
    what: 'async/await syntax was added to JavaScript, built on top of Promises. Writing asynchronous code now looked and behaved like synchronous code, eliminating the complex .then() chains that made Promise-based code hard to read.',
    impact: 'Transformed how developers write API calls, data fetching, and any async logic in React components.',
    concepts: [
      { id: 'async-await', topicId: 'async', label: 'async/await Patterns' },
      { id: 'promise-internals', topicId: 'async', label: 'Promise Internals' },
    ],
  },
  {
    year: '2018',
    title: 'Context API Rewrite',
    subtitle: 'Official solution for prop drilling',
    color: '#f97316',
    category: 'REACT',
    what: 'React 16.3 introduced the new Context API. The old Context API existed but was unstable and undocumented. The new version gave developers an official way to share state across component trees without prop drilling.',
    impact: 'Reduced the need for state management libraries like Redux for simpler use cases. But it came with a performance trap — every context change re-renders all consumers.',
    concepts: [
      { id: 'context-perf', topicId: 'react-core', label: 'Context & Performance' },
      { id: 'rerender-causes', topicId: 'react-performance', label: 'What Causes Re-renders' },
    ],
  },
  {
    year: '2019',
    title: 'React Hooks',
    subtitle: 'The biggest React API change ever',
    color: '#00ff88',
    category: 'REACT',
    what: 'React 16.8 introduced Hooks — functions that let you use state and lifecycle features without writing a class. useState, useEffect, useContext, useRef, and the ability to write custom hooks changed everything.',
    impact: 'Eliminated class components for most use cases. Solved the "wrapper hell" of HOCs and render props. Made stateful logic reusable and composable for the first time.',
    concepts: [
      { id: 'useeffect-deep', topicId: 'hooks', label: 'useEffect Deep Dive' },
      { id: 'custom-hooks', topicId: 'hooks', label: 'Custom Hooks' },
      { id: 'hoc-pattern', topicId: 'react-patterns', label: 'HOC Pattern' },
    ],
  },
  {
  year: '2020',
  title: 'React 17 + Recoil',
  subtitle: 'Infrastructure update & atomic state management',
  color: '#a855f7',
  category: 'REACT',
  what: 'Two significant releases in 2020. React 17 (October) had no new developer-facing features — it focused on making React upgrades easier by changing how events attach (from document to root), enabling gradual migration of large apps. Recoil (May, React Europe) was open-sourced by Facebook to solve cross-tree state sharing without Context\'s re-render problem or Redux\'s boilerplate.',
  impact: 'React 17 laid the infrastructure for Concurrent Mode and enabled multiple React versions on the same page. Recoil introduced the atomic state model — small independent units of state where only subscribed components re-render. It influenced Jotai, Zustand\'s atom-based APIs, and shifted how the community thought about granular state management.',
  concepts: [
    { id: 'recoil-atoms', topicId: 'state-mgmt', label: 'Recoil — Atomic State' },
    { id: 'render-cycle', topicId: 'react-core', label: 'Render Cycle' },
    { id: 'suspense-pattern', topicId: 'react-patterns', label: 'Suspense' },
    ],
  },
  {
    year: '2022',
    title: 'React 18 & Concurrent Mode',
    subtitle: 'Interruptible rendering goes mainstream',
    color: '#4facfe',
    category: 'REACT',
    what: 'React 18 shipped Concurrent Mode as the default, along with automatic batching, startTransition, useDeferredValue, and useId. Features that had been in development for years finally shipped.',
    impact: 'Urgent updates (typing) can now interrupt non-urgent ones (filtering large lists). The browser stays responsive during heavy renders.',
    concepts: [
      { id: 'concurrent-features', topicId: 'react-performance', label: 'Concurrent Features' },
      { id: 'state-batching', topicId: 'react-performance', label: 'State Batching' },
      { id: 'suspense-pattern', topicId: 'react-patterns', label: 'Suspense' },
    ],
  },
  {
    year: '2023',
    title: 'React Server Components',
    subtitle: 'Components that run only on the server',
    color: '#a855f7',
    category: 'REACT',
    what: 'React Server Components (RSC) let you write components that render on the server and never ship JavaScript to the client. They can directly access databases, file systems, and APIs without API routes.',
    impact: 'Blurred the line between frontend and backend. Next.js App Router is built on RSC. Fundamental shift in how React apps are architected.',
    concepts: [
      { id: 'fiber', topicId: 'react-core', label: 'React Fiber' },
      { id: 'suspense-pattern', topicId: 'react-patterns', label: 'Suspense' },
    ],
  },
  {
    year: '2024',
    title: 'React 19',
    subtitle: 'Actions, use(), and compiler',
    color: '#00ff88',
    category: 'REACT',
    what: 'React 19 introduced the React Compiler (automatic memoization), the use() hook for reading promises and context in render, Server Actions for form handling, and new form management hooks.',
    impact: 'The React Compiler potentially eliminates the need for manual useMemo and useCallback. This changes best practices that have been standard for years.',
    concepts: [
      { id: 'memo-patterns', topicId: 'react-performance', label: 'React.memo & Memoization' },
      { id: 'custom-hooks', topicId: 'hooks', label: 'Custom Hooks' },
    ],
  },
];

export default function Timeline() {
  const [active, setActive] = useState(null);
  const navigate = useNavigate();

  const handleClick = (idx) => {
    setActive(active === idx ? null : idx);
  };

  return (
    <div className={styles.page}>
      {/* Header */}
      <div className={styles.header}>
        <div className={styles.headerTop}>
          <h1 className={styles.title}>React & JavaScript Timeline</h1>
          <p className={styles.sub}>
            How React and modern JavaScript evolved — and why each change mattered
          </p>
        </div>
        <div className={styles.legend}>
          {['FOUNDATION', 'JAVASCRIPT', 'REACT INTERNALS', 'REACT'].map(cat => (
            <span key={cat} className={styles.legendItem}>
              <span className={styles.legendDot}
                style={{ background: cat === 'JAVASCRIPT' ? '#eab308' : cat === 'REACT INTERNALS' ? '#00ff88' : cat === 'FOUNDATION' ? '#4facfe' : '#a855f7' }} />
              {cat}
            </span>
          ))}
        </div>
      </div>

      {/* Timeline */}
      <div className={styles.timelineWrap}>
        {/* Line */}
        <div className={styles.line} />

        {TIMELINE.map((event, idx) => {
          const isActive = active === idx;
          const isLeft = idx % 2 === 0;

          return (
            <div key={idx} className={`${styles.eventRow} ${isLeft ? styles.left : styles.right}`}>

              {/* Card */}
              <div
                className={`${styles.card} ${isActive ? styles.cardActive : ''}`}
                style={{ borderColor: isActive ? event.color : '#1e2d40' }}
                onClick={() => handleClick(idx)}
              >
                {/* Card header */}
                <div className={styles.cardHeader}>
                  <span className={styles.category}
                    style={{ color: event.color, background: event.color + '15', borderColor: event.color + '30' }}>
                    {event.category}
                  </span>
                  <span className={styles.expand}>{isActive ? '▲' : '▼'}</span>
                </div>

                <div className={styles.cardYear} style={{ color: event.color }}>{event.year}</div>
                <div className={styles.cardTitle}>{event.title}</div>
                <div className={styles.cardSub}>{event.subtitle}</div>

                {/* Expanded content */}
                {isActive && (
                  <div className={styles.expanded}>
                    <div className={styles.expandSection}>
                      <div className={styles.expandLabel}>😤 The Problem</div>
                      <p className={styles.expandText}>{event.what}</p>
                    </div>
                    <div className={styles.expandSection}>
                      <div className={styles.expandLabel}>💡 Why It Mattered</div>
                      <p className={styles.expandText}>{event.impact}</p>
                    </div>
                    {event.concepts.length > 0 && (
                      <div className={styles.expandSection}>
                        <div className={styles.expandLabel}>📖 Related Concepts</div>
                        <div className={styles.chips}>
                          {event.concepts.map(c => (
                            <button
                              key={c.id}
                              className={styles.chip}
                              style={{ borderColor: event.color + '40', color: event.color }}
                              onClick={(e) => { e.stopPropagation(); navigate(`/${c.topicId}/${c.id}`); }}
                            >
                              {c.label} →
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Dot on line */}
              <div className={styles.dotWrap}>
                <div className={styles.dot}
                  style={{ background: event.color, boxShadow: isActive ? `0 0 12px ${event.color}` : 'none' }} />
              </div>

              {/* Year on opposite side — desktop only */}
              <div className={styles.yearLabel} style={{ color: event.color }}>
                {event.year}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}