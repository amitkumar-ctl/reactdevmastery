import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from './LandingPage.module.css';
import SignupPrompt from '../components/guest/SignupPrompt';
import Search from '../components/search/Search';
import logoIcon from '../assets/icon-transparent-white.svg';

const FEATURES = [
  {
    icon: '⚡',
    title: 'Interactive Visualizers',
    sub: 'Watch the Event Loop, Closure scope, and React Fiber work in real time — not just theory.',
  },
  {
    icon: '🎯',
    title: 'Interview Round Prep',
    sub: 'JS, React, Machine Coding, System Design, Debugging, Security, Behavioral, and Rapid Fire rounds.',
  },
  {
    icon: '📖',
    title: '30+ Deep-dive Topics',
    sub: 'JavaScript internals, TypeScript, React architecture, performance, accessibility, and more.',
  },
  {
    icon: '🧠',
    title: 'FAQs & Concept Cards',
    sub: '900+ Q&A pairs written for senior interview answers, not textbook definitions.',
  },
  {
    icon: '🔥',
    title: 'Streak & Progress Tracking',
    sub: 'Daily streaks, activity heatmap, per-topic progress bars, and quiz accuracy over time.',
  },
  {
    icon: '🏆',
    title: 'Leaderboard',
    sub: 'See where you stand against other engineers preparing for the same senior roles.',
  },
];

const TOPIC_PREVIEWS = [
  { id: 'js-core',       icon: '⚡', label: 'JavaScript Internals',       count: 6,  tag: 'Foundation' },
  { id: 'closures',      icon: '🔒', label: 'Closures & Scope',           count: 3,  tag: 'Core' },
  { id: 'async',         icon: '⏳', label: 'Async & Promises',           count: 4,  tag: 'Core' },
  { id: 'react-core',    icon: '⚛',  label: 'React Internals',            count: 4,  tag: 'React' },
  { id: 'hooks',         icon: '🪝', label: 'Hooks & State',              count: 3,  tag: 'React' },
  { id: 'ts',            icon: '📘', label: 'TypeScript Deep Dive',       count: 6,  tag: 'Language' },
  { id: 'perf',          icon: '📊', label: 'Performance & CWV',          count: 5,  tag: 'Advanced' },
  { id: 'security',      icon: '🔐', label: 'Security',                   count: 3,  tag: 'Advanced' },
  { id: 'system-design', icon: '🏗',  label: 'System Design',             count: 3,  tag: 'Architecture' },
  { id: 'patterns',      icon: '🧩', label: 'Design Patterns',            count: 10, tag: 'Architecture' },
  { id: 'a11y',          icon: '♿', label: 'Accessibility',              count: 7,  tag: 'Frontend' },
  { id: 'nextjs',        icon: '▲',  label: 'Next.js',                    count: 6,  tag: 'Framework' },
];

const LandingPage = () => {
  const navigate = useNavigate();
  const [promptOpen, setPromptOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <div className={styles.page}>

      {/* ── Header ─────────────────────────────────────────────────── */}
      <header className={styles.header}>
        <div className={styles.headerLogo}>
          <div className={styles.headerLogoIcon}>
            <img src={logoIcon} alt="" style={{ width: '60%', height: '60%' }} />
          </div>
          <span className={styles.headerLogoText}>REACTDEVMASTERY</span>
        </div>
        <div className={styles.headerActions}>
          <button className={styles.headerSearch} onClick={() => setSearchOpen(true)} aria-label="Search">
            🔍
          </button>
          <Link to="/login" className={styles.btnLogin}>Log in</Link>
          <Link to="/register" className={styles.btnSignup}>Sign up free →</Link>
        </div>
      </header>

      {/* ── Hero ───────────────────────────────────────────────────── */}
      <section className={styles.hero}>
        <div className={styles.heroBadge}>Senior Frontend Interview Prep</div>
        <h1 className={styles.heroTitle}>
          Go from mid-level to<br /><span>senior engineer</span>
        </h1>
        <p className={styles.heroSub}>
          Interactive visualizers, real interview rounds, and 900+ concept-level Q&As
          built specifically for engineers targeting senior frontend roles.
          Free, forever.
        </p>
        <div className={styles.heroActions}>
          <Link to="/register" className={styles.heroCta}>Start learning free →</Link>
          <Link to="/js-core" className={styles.heroExplore}>Explore content</Link>
        </div>
      </section>

      {/* ── Stats ──────────────────────────────────────────────────── */}
      <div className={styles.statsBar}>
        {[
          { num: '30+',  label: 'Topics covered' },
          { num: '900+', label: 'Concept Q&As' },
          { num: '8',    label: 'Interview rounds' },
          { num: '100%', label: 'Free forever' },
        ].map((s, i) => (
          <div key={i} className={styles.stat}>
            <div className={styles.statNum}>{s.num}</div>
            <div className={styles.statLabel}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* ── Features ───────────────────────────────────────────────── */}
      <section className={styles.features}>
        <div className={styles.sectionTitle}>What's inside</div>
        <h2 className={styles.sectionHeading}>Everything you need for a senior interview</h2>
        <div className={styles.featureGrid}>
          {FEATURES.map((f, i) => (
            <div key={i} className={styles.featureCard}>
              <div className={styles.featureIcon}>{f.icon}</div>
              <div className={styles.featureTitle}>{f.title}</div>
              <div className={styles.featureSub}>{f.sub}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Topics preview ─────────────────────────────────────────── */}
      <section className={styles.topics}>
        <div className={styles.sectionTitle}>Topics</div>
        <h2 className={styles.sectionHeading}>Browse the curriculum</h2>
        <p className={styles.sectionSub}>Click any topic to start reading — no account needed.</p>
        <div className={styles.topicGrid}>
          {TOPIC_PREVIEWS.map(t => (
            <Link key={t.id} to={`/${t.id}`} className={styles.topicCard}>
              <div className={styles.topicCardTop}>
                <span className={styles.topicCardIcon}>{t.icon}</span>
                <span className={styles.topicCardTag}>{t.tag}</span>
              </div>
              <div className={styles.topicCardLabel}>{t.label}</div>
              <div className={styles.topicCardFooter}>
                <span className={styles.topicCardCount}>{t.count} concepts</span>
                <span className={styles.topicCardArrow}>→</span>
              </div>
            </Link>
          ))}
        </div>
        <div className={styles.topicSeeAll}>
          <Link to="/js-core" className={styles.topicSeeAllLink}>
            View all 30+ topics →
          </Link>
        </div>
      </section>

      {/* ── CTA ────────────────────────────────────────────────────── */}
      <section className={styles.ctaSection}>
        <h2 className={styles.ctaTitle}>Ready to level up?</h2>
        <p className={styles.ctaSub}>
          Create a free account to track your progress, earn streaks,
          and get a personalised learning plan built around your timeline.
        </p>
        <div className={styles.heroActions}>
          <Link to="/register" className={styles.heroCta}>Create free account →</Link>
          <button className={styles.heroExplore} onClick={() => navigate('/js-core')}>
            Browse without signing up
          </button>
        </div>
      </section>

      {/* ── Footer ─────────────────────────────────────────────────── */}
      <footer className={styles.footer}>
        <span>© 2026 ReactDevMastery</span>
        <Link to="/privacy">Privacy Policy</Link>
        <Link to="/terms">Terms of Service</Link>
      </footer>

      {searchOpen && <Search onClose={() => setSearchOpen(false)} />}
    </div>
  );
};

export default LandingPage;