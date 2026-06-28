import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useProgress } from '../../context/ProgressContext';
import { TOPICS, LEARNABLE_IDS } from 'reactdevmastery-content/data';
import toast from 'react-hot-toast';
import styles from './Layout.module.css';
import logoIcon from '../../assets/icon-transparent-white.svg';
import OnboardingFlow from '../onboarding/OnboardingFlow';
import SignupPrompt from '../guest/SignupPrompt';
import Search from '../search/Search';

// Routes that require login — clicking these as a guest shows SignupPrompt
const PROTECTED_IDS = new Set(['home', 'flashcards', 'quiz', 'profile']);

const AppLayout = ({ children }) => {
  const { user, logout } = useAuth();
  const { completedTopics, streak } = useProgress();
  const navigate = useNavigate();
  const location = useLocation();
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [guestPrompt, setGuestPrompt] = useState(null);
  const [searchOpen, setSearchOpen] = useState(false); // feature label string or null

  const isGuest = !user;
  const currentPath = location.pathname.split('/').filter(Boolean)[0] || 'home';
  const pct = Math.round((completedTopics.length / LEARNABLE_IDS.length) * 100);
  const initials = user?.name?.split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2) || '?';

  useEffect(() => {
    setMobileNavOpen(false);
  }, [location.pathname]);

  const handleLogout = async () => {
    await logout();
    toast.success('Logged out');
    navigate('/login');
  };

  const handleNavClick = (topicId, href) => {
    if (isGuest && PROTECTED_IDS.has(topicId)) {
      const labels = {
        home: 'access your Dashboard',
        flashcards: 'use Flash Cards',
        quiz: 'take the Quiz',
        profile: 'view your Profile',
      };
      setGuestPrompt(labels[topicId] || 'use this feature');
      return;
    }
    navigate(href);
    setMobileNavOpen(false);
  };

  return (
    <div className={styles.app}>
      {/* ── Onboarding overlay (new users only) ────────────────────── */}
      {user && !user.onboardingCompleted && <OnboardingFlow />}

      {/* ── Mobile top bar (hidden on desktop via CSS) ─────────────── */}
      <header className={styles.mobileTopbar}>
        <button
          className={styles.hamburgerBtn}
          onClick={() => setMobileNavOpen(true)}
          aria-label="Open menu"
        >
          ☰
        </button>
        <div className={styles.mobileLogo}>
          <img src={logoIcon} alt="" className={styles.mobileLogoIcon} />
          <span>REACTDEVMASTERY</span>
        </div>
        <button
          className={styles.mobileSearchBtn}
          onClick={() => setSearchOpen(true)}
          aria-label="Search"
        >
          🔍
        </button>
      </header>

      {/* ── Mobile drawer backdrop ──────────────────────────────────── */}
      {mobileNavOpen && (
        <div className={styles.backdrop} onClick={() => setMobileNavOpen(false)} />
      )}

      {/* ── Sidebar ─────────────────────────────────────────────── */}
      <aside className={`${styles.sidebar} ${mobileNavOpen ? styles.sidebarOpen : ''}`}>
        <div className={styles.sidebarHeader}>
          <div className={styles.logo}>
            <div className={styles.logoIcon}><img src={logoIcon} alt="" style={{ width: '60%', height: '60%' }} /></div>
            <div>
              <div className={styles.logoText}>REACTDEVMASTERY</div>
              <div className={styles.logoSub}>SENIOR FRONTEND</div>
            </div>
            <button
              className={styles.closeBtn}
              onClick={() => setMobileNavOpen(false)}
              aria-label="Close menu"
            >
              ✕
            </button>
          </div>

          {/* Search button */}
          <button
            className={styles.sidebarSearchBtn}
            onClick={() => setSearchOpen(true)}
          >
            <span>🔍</span>
            <span>Search</span>
            <kbd className={styles.searchKbd}>⌘K</kbd>
          </button>

          {/* User pill — shows login/signup for guests */}
          {user ? (
            <>
              <div className={styles.userPill} onClick={() => setUserMenuOpen(!userMenuOpen)}>
                {user?.avatar
                  ? <img src={user.avatar} alt={user.name} className={styles.userAvatar} />
                  : <div className={styles.userAvatarFallback}>{initials}</div>
                }
                <div className={styles.userInfo}>
                  <div className={styles.userName}>{user?.name}</div>
                  <div className={styles.userEmail}>{user?.email}</div>
                </div>
                <span className={styles.chevron}>{userMenuOpen ? '▲' : '▼'}</span>
              </div>

              {userMenuOpen && (
                <div className={styles.userMenu}>
                  <div className={styles.userMenuItem} onClick={() => { navigate('/profile'); setUserMenuOpen(false); }}>⚙ Profile Settings</div>
                  <div className={styles.userMenuItem} onClick={() => { navigate('/leaderboard'); setUserMenuOpen(false); }}>🏆 Leaderboard</div>
                  <div className={`${styles.userMenuItem} ${styles.userMenuDanger}`} onClick={handleLogout}>↩ Sign Out</div>
                </div>
              )}

              {/* Progress */}
              <div className={styles.progressWrap}>
                <div className={styles.progressBar}>
                  <div className={styles.progressFill} style={{ width: `${pct}%` }} />
                </div>
                <div className={styles.progressMeta}>
                  <span>{pct}% · {completedTopics.length}/{LEARNABLE_IDS.length} topics</span>
                  <span className={styles.streakBadge}>🔥 {streak}d</span>
                </div>
              </div>
            </>
          ) : (
            <div className={styles.guestPill}>
              <div className={styles.guestLabel}>👀 Browsing as guest</div>
              <div className={styles.guestActions}>
                <button className={styles.guestSignup} onClick={() => navigate('/register')}>Sign up free</button>
                <button className={styles.guestLogin} onClick={() => navigate('/login')}>Log in</button>
              </div>
            </div>
          )}
        </div>

        {/* Nav */}
        <nav className={styles.nav}>
          {(() => {
            let section = null;
            return TOPICS.map((t) => {
              const sectionEl = t.section && t.section !== section
                ? (() => { section = t.section; return <div key={`s-${t.section}`} className={styles.navSection}>{t.section}</div>; })()
                : null;
              const active = currentPath === t.id || (t.id === 'home' && currentPath === '');
              const done = completedTopics.includes(t.id);
              const href = t.id === 'home' ? '/' : `/${t.id}`;
              const locked = isGuest && PROTECTED_IDS.has(t.id);
              return (
                <React.Fragment key={t.id}>
                  {sectionEl}
                  <div
                    className={`${styles.navItem} ${active ? styles.active : ''} ${locked ? styles.navLocked : ''}`}
                    onClick={() => handleNavClick(t.id, href)}
                    title={locked ? 'Sign up to access' : undefined}
                  >
                    <span className={styles.navIcon}>{t.icon}</span>
                    <span className={styles.navLabel}>{t.label}</span>
                    {locked
                      ? <span className={styles.navLockIcon}>🔒</span>
                      : done
                        ? <span className={styles.navDone}>✓</span>
                        : t.badge
                          ? <span className={`${styles.navBadge} ${styles[t.badge?.toLowerCase?.() === 'new' ? 'badgeNew' : 'badgeHot']}`}>{t.badge}</span>
                          : null
                    }
                  </div>
                </React.Fragment>
              );
            });
          })()}
        </nav>
      </aside>

      {/* ── Main ────────────────────────────────────────────────── */}
      <main className={styles.main}>
        {children}
      </main>

      {/* ── Guest signup prompt ───────────────────────────────────── */}
      {guestPrompt && (
        <SignupPrompt isGuest={true} feature={guestPrompt} _forceOpen onClose={() => setGuestPrompt(null)} />
      )}

      {/* ── Search modal ─────────────────────────────────────────── */}
      {searchOpen && <Search onClose={() => setSearchOpen(false)} />}
    </div>
  );
};

export default AppLayout;