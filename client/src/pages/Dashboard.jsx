import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useProgress } from '../context/ProgressContext';
import { CONCEPTS, LEARNABLE_IDS } from 'reactdevmastery-content/data';
import styles from './Dashboard.module.css';

const Dashboard = () => {
  const { user } = useAuth();
  const { completedTopics, completedConcepts, quizCorrect, quizTotal, quizAccuracy, streak, activityLog } = useProgress();
  const navigate = useNavigate();

  // Daily goal progress — concepts completed today
  const today = new Date().toISOString().slice(0, 10);
  const todayActivity = activityLog?.[today] || 0;
  const dailyGoal = user?.dailyGoal || 3;
  const dailyPct = Math.min(Math.round((todayActivity / dailyGoal) * 100), 100);
  const dailyDone = dailyPct >= 100;

  // Personalise welcome message
  const isNewUser = user?.completedTopics?.length === 0 && user?.quizTotal === 0;
  const firstName = user?.name?.split(' ')[0];

  const totalConcepts = Object.values(CONCEPTS).flatMap(t => t.items).length;

  // Activity grid — last 36 days
  const cells = Array.from({ length: 36 }, (_, i) => {
    const d = new Date(Date.now() - (35 - i) * 86400000).toISOString().slice(0, 10);
    const v = activityLog[d] || 0;
    const level = v === 0 ? 0 : v < 3 ? 1 : v < 6 ? 2 : v < 10 ? 3 : 4;
    return { date: d, v, level };
  });

  const levelBg = ['#1a2332', '#052210', '#0a4420', '#00cc66', '#00ff88'];

  // Topic progress
  const topicProgress = Object.entries(CONCEPTS).map(([key, topic]) => {
    const done = topic.items.filter(i => completedConcepts.includes(i.id)).length;
    return { key, title: topic.title, color: topic.color, done, total: topic.items.length };
  });

  // Roadmap
  const roadmap = [
    // ── JavaScript ──────────────────────────────────────────
    { id: 'js-core',      label: 'JS Internals',        sub: 'Event Loop, Hoisting, Coercion, Memory',         section: 'JAVASCRIPT' },
    { id: 'closures',     label: 'Closures & Scope',    sub: 'Closures, Scope Chain, Module Pattern',           section: null },
    { id: 'prototypes',   label: 'Prototypes & OOP',    sub: 'Prototype Chain, Classes, Composition',           section: null },
    { id: 'async',        label: 'Async & Promises',    sub: 'Promises, async/await, Observables, Workers',     section: null },
    { id: 'js-advanced',  label: 'Advanced JS',         sub: 'Proxy, WeakRef, Generators, Race Conditions',     section: null },
    { id: 'ts',           label: 'TypeScript',          sub: 'Generics, Utility Types, Guards, Mapped Types',   section: null },
    // ── React ───────────────────────────────────────────────
    { id: 'react-core',       label: 'React Internals',     sub: 'Fiber, Virtual DOM, Render Cycle, Context',       section: 'REACT' },
    { id: 'hooks',            label: 'Hooks & State',       sub: 'useEffect, Custom Hooks, State Architecture',      section: null },
    { id: 'react-patterns',   label: 'React Patterns',      sub: 'HOC, Compound Components, Portals, Suspense',     section: null },
    { id: 'react-performance', label: 'React Performance',  sub: 'memo, Batching, Virtualization, Concurrent',      section: null },
    { id: 'nextjs',           label: 'Next.js',             sub: 'App Router, RSC, Caching, Server Actions',         section: null },
    // ── Advanced ────────────────────────────────────────────
    { id: 'perf',     label: 'Performance & CWV',  sub: 'LCP, INP, CLS, Code Splitting, Memoization',   section: 'ADVANCED' },
    { id: 'network',  label: 'Network & HTTP',     sub: 'HTTP/2, Caching, WebSockets, SSE',              section: null },
    { id: 'security', label: 'Security',           sub: 'XSS, CSRF, Auth Patterns, JWT, CSP',            section: null },
    { id: 'browser',  label: 'Browser Internals',  sub: 'Rendering Pipeline, Reflow, Storage APIs',      section: null },
    { id: 'devtools', label: 'DevTools & Debugging', sub: 'Flame Charts, Memory Leaks, Breakpoints',     section: null },
    // ── CSS & UI ────────────────────────────────────────────
    { id: 'css-adv',    label: 'CSS Architecture',   sub: 'Specificity, Grid, BEM, Container Queries',    section: 'CSS & UI' },
    { id: 'animations', label: 'Animations & GPU',   sub: 'GPU Layers, will-change, Framer Motion, CLS',  section: null },
    { id: 'a11y',       label: 'Accessibility',      sub: 'ARIA, Keyboard Nav, Screen Readers, WCAG',     section: null },
    { id: 'html-q',     label: 'HTML Deep Dive',     sub: 'Semantic HTML, async/defer, Shadow DOM',       section: null },
    // ── Architecture ────────────────────────────────────────
    { id: 'system-design', label: 'System Design',    sub: 'Scalable Components, Micro-frontends, Design Systems', section: 'ARCHITECTURE' },
    { id: 'patterns',      label: 'Design Patterns',  sub: 'Singleton, Observer, Strategy, Command, MVC',          section: null },
    { id: 'state-mgmt',    label: 'State Management', sub: 'Redux, Zustand, React Query, Optimistic UI',           section: null },
    { id: 'testing',       label: 'Testing Strategy', sub: 'Testing Pyramid, RTL, Mocking, MSW',                   section: null },
    { id: 'bundlers',      label: 'Build Tools',      sub: 'Webpack, Vite, Rollup, Babel, CI/CD',                  section: null },
    // ── Interview Rounds ────────────────────────────────────
    { id: 'js-interview',            label: 'JS Interview Round',          sub: 'var/let/const, Closures, Event Loop, Prototypes', section: 'INTERVIEW' },
    { id: 'react-interview',         label: 'React Interview Round',       sub: 'Fiber, useEffect, Re-renders, Concurrent',        section: null },
    { id: 'system-design-interview', label: 'System Design Round',         sub: 'Architecture, APIs, Auth, Real-time, Monitoring', section: null },
    { id: 'machine-coding',          label: 'Machine Coding Round',        sub: 'Debounce, Autocomplete, Virtual List, Kanban',    section: null },
    { id: 'debugging-round',         label: 'Debugging Round',             sub: 'Re-renders, Memory Leaks, Hydration, Closures',   section: null },
    { id: 'perf-interview',          label: 'Performance Round',           sub: 'CWV, Bundle Size, Caching, Rendering Strategy',   section: null },
    { id: 'security-interview',      label: 'Security Round',              sub: 'XSS, CSRF, JWT, CORS, CSP, OAuth',                section: null },
    { id: 'rapid-fire',              label: 'Rapid Fire (50 Qs)',          sub: 'Quick-fire answers for every core concept',        section: null },
  ];

  return (
    <div className={styles.page}>
      <div className={styles.topbar}>
        <div>
          <div className={styles.welcome}>
            {isNewUser ? `Welcome, ${firstName} 👋` : `Welcome back, ${firstName} 👋`}
          </div>
          <div className={styles.welcomeSub}>
            {isNewUser
              ? 'Your journey to senior engineer starts here'
              : 'Continue your path to senior engineer'}
          </div>
        </div>

        {/* Daily goal ring */}
        <div className={styles.dailyGoal} title={`${todayActivity} of ${dailyGoal} concepts today`}>
          <svg width="44" height="44" viewBox="0 0 44 44">
            <circle cx="22" cy="22" r="18" fill="none" stroke="#1e2d40" strokeWidth="4" />
            <circle
              cx="22" cy="22" r="18"
              fill="none"
              stroke={dailyDone ? '#00ff88' : '#4facfe'}
              strokeWidth="4"
              strokeDasharray={`${2 * Math.PI * 18}`}
              strokeDashoffset={`${2 * Math.PI * 18 * (1 - dailyPct / 100)}`}
              strokeLinecap="round"
              transform="rotate(-90 22 22)"
              style={{ transition: 'stroke-dashoffset 0.6s ease' }}
            />
            <text x="22" y="26" textAnchor="middle" fontSize="10" fontWeight="700"
              fill={dailyDone ? '#00ff88' : '#e2e8f0'}
              fontFamily="Fira Code, monospace">
              {dailyDone ? '✓' : `${todayActivity}/${dailyGoal}`}
            </text>
          </svg>
          <div className={styles.dailyGoalLabel}>
            {dailyDone ? 'Goal done!' : 'Today'}
          </div>
        </div>

        <div className={styles.topActions}>
          <button className={styles.btn} onClick={() => navigate('/flashcards')}>⚡ Flash Cards</button>
          <button className={styles.btnPrimary} onClick={() => navigate('/quiz')}>🎯 Quiz Me</button>
        </div>
      </div>

      <div className={styles.content}>
        {/* Stats */}
        <div className={styles.statsGrid}>
          {[
            { num: completedTopics.length, label: 'TOPICS DONE', color: '#00ff88' },
            { num: completedConcepts.length, label: 'CONCEPTS READ', color: '#4facfe' },
            { num: quizTotal, label: 'QUIZ ATTEMPTS', color: '#a855f7' },
            { num: `${quizAccuracy}%`, label: 'ACCURACY', color: quizAccuracy >= 70 ? '#00ff88' : quizAccuracy >= 50 ? '#eab308' : '#ef4444' },
          ].map((s, i) => (
            <div key={i} className={styles.statCard}>
              <div className={styles.statNum} style={{ color: s.color }}>{s.num}</div>
              <div className={styles.statLabel}>{s.label}</div>
            </div>
          ))}
        </div>

        <div className={styles.twoCol}>
          {/* Left */}
          <div className={styles.leftCol}>
            {/* Activity */}
            <div className={styles.panel}>
              <div className={styles.sectionTitle}>Activity — Last 36 Days</div>
              <div className={styles.activityGrid}>
                {cells.map((c, i) => (
                  <div key={i} className={styles.activityCell}
                    style={{ background: levelBg[c.level] }}
                    title={`${c.date}: ${c.v} activities`}
                  />
                ))}
              </div>
              <div className={styles.activityLegend}>Less &nbsp; {levelBg.map((b, i) => <span key={i} style={{ display: 'inline-block', width: 10, height: 10, background: b, borderRadius: 2, marginRight: 3 }} />)} &nbsp; More</div>
            </div>

            {/* Roadmap */}
            <div className={styles.panel} style={{ marginTop: 16 }}>
              <div className={styles.sectionTitle}>Learning Roadmap</div>
              {roadmap.map((r, i, arr) => {
              const done    = completedTopics.includes(r.id);
              const prev    = arr.slice(0, i).every(x => completedTopics.includes(x.id));
              const current = !done && prev;
              return (
                <React.Fragment key={r.id}>
                  {r.section && (
                    <div style={{
                      fontSize: 9, fontWeight: 700, letterSpacing: 2,
                      color: '#374151', marginTop: i === 0 ? 0 : 12,
                      marginBottom: 4, paddingLeft: 28, textTransform: 'uppercase',
                    }}>
                      {r.section}
                    </div>
                  )}
                  <div className={styles.roadmapItem} onClick={() => navigate(`/${r.id}`)}>
                    <div className={styles.roadmapLine}>
                      <div className={styles.roadmapDot} style={{
                        background: done ? '#00ff88' : current ? '#4facfe' : '#374151',
                        boxShadow: current ? '0 0 8px #4facfe' : 'none',
                      }} />
                      {i < arr.length - 1 && <div className={styles.roadmapConnector} />}
                    </div>
                    <div className={styles.roadmapContent}>
                      <div className={styles.roadmapLabel} style={{
                        color: done ? '#00ff88' : current ? '#4facfe' : '#9ca3af'
                      }}>
                        {done ? '✓ ' : current ? '▶ ' : '○ '}{r.label}
                      </div>
                      <div className={styles.roadmapSub}>{r.sub}</div>
                    </div>
                  </div>
                </React.Fragment>
              );
            })}
            </div>
          </div>

          {/* Right */}
          <div className={styles.rightCol}>
            {/* Topic progress */}
            <div className={styles.panel}>
              <div className={styles.sectionTitle}>Progress by Topic</div>
              {topicProgress.map(tp => (
                <div key={tp.key} className={styles.topicProgressItem} onClick={() => navigate(`/${tp.key}`)}>
                  <div className={styles.topicProgressMeta}>
                    <span className={styles.topicProgressName}>{tp.title}</span>
                    <span className={styles.topicProgressCount}>{tp.done}/{tp.total}</span>
                  </div>
                  <div className={styles.topicProgressTrack}>
                    <div className={styles.topicProgressFill}
                      style={{ width: `${Math.round(tp.done / tp.total * 100)}%`, background: tp.color }} />
                  </div>
                </div>
              ))}
            </div>

            {/* Quick actions */}
            <div className={styles.panel} style={{ marginTop: 16 }}>
              <div className={styles.sectionTitle}>Quick Start</div>
              <div className={styles.quickGrid}>
                {[
                  { label: '⚡ JS Internals', path: '/js-core', color: '#eab308' },
                  { label: '⚛ React Deep Dive', path: '/react-core', color: '#4facfe' },
                  { label: '🔒 Security', path: '/security', color: '#ef4444' },
                  { label: '📊 Performance', path: '/perf', color: '#f97316' },
                  { label: '⚡ Flash Cards', path: '/flashcards', color: '#00ff88' },
                  { label: '🏆 Leaderboard', path: '/leaderboard', color: '#a855f7' },
                ].map((q, i) => (
                  <button key={i} className={styles.quickBtn}
                    style={{ borderColor: q.color + '40', color: q.color }}
                    onClick={() => navigate(q.path)}>
                    {q.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;