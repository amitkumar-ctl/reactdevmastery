import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useProgress } from '../context/ProgressContext';
import { CONCEPTS, LEARNABLE_IDS } from '../data/courseData';
import styles from './Dashboard.module.css';

const Dashboard = () => {
  const { user } = useAuth();
  const { completedTopics, completedConcepts, quizCorrect, quizTotal, quizAccuracy, streak, activityLog } = useProgress();
  const navigate = useNavigate();

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
    { id: 'js-core', label: 'JS Fundamentals', sub: 'Closures, Scope, this, Coercion' },
    { id: 'async', label: 'Async & Event Loop', sub: 'Promises, async/await, Web Workers' },
    { id: 'react-core', label: 'React Internals', sub: 'Fiber, Reconciliation, Concurrent Mode' },
    { id: 'perf', label: 'Performance', sub: 'Core Web Vitals, Code Splitting, LCP' },
    { id: 'security', label: 'Security', sub: 'XSS, CSRF, Auth Patterns, CSP' },
    { id: 'system-design', label: 'System Design', sub: 'Architecture, Micro-frontends, Patterns' },
  ];

  return (
    <div className={styles.page}>
      <div className={styles.topbar}>
        <div>
          <div className={styles.welcome}>Welcome back, {user?.name?.split(' ')[0]} 👋</div>
          <div className={styles.welcomeSub}>Continue your path to senior engineer</div>
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
                const done = completedTopics.includes(r.id);
                const prev = arr.slice(0, i).every(x => completedTopics.includes(x.id));
                const current = !done && prev;
                return (
                  <div key={r.id} className={styles.roadmapItem} onClick={() => navigate(`/${r.id}`)}>
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
