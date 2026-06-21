import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useProgress } from '../../context/ProgressContext';
import { TOPICS, LEARNABLE_IDS } from 'reactdevmastery-content/data';
import toast from 'react-hot-toast';
import styles from './Layout.module.css';
import logoIcon from '../../assets/icon-transparent-white.svg';

const AppLayout = ({ children }) => {
  const { user, logout } = useAuth();
  const { completedTopics, streak } = useProgress();
  const navigate = useNavigate();
  const location = useLocation();
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  const currentPath = location.pathname.split('/').filter(Boolean)[0] || 'home';  
  const pct = Math.round((completedTopics.length / LEARNABLE_IDS.length) * 100);
  const initials = user?.name?.split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2) || '?';

  const handleLogout = async () => {
    await logout();
    toast.success('Logged out');
    navigate('/login');
  };

  return (
    <div className={styles.app}>
      {/* ── Sidebar ─────────────────────────────────────────────── */}
      <aside className={styles.sidebar}>
        <div className={styles.sidebarHeader}>
          <div className={styles.logo}>
            <div className={styles.logoIcon}><img src={logoIcon} alt="" style={{ width: '60%', height: '60%' }} /></div>
            <div>
              <div className={styles.logoText}>REACTDEVMASTERY</div>
              <div className={styles.logoSub}>SENIOR FRONTEND</div>
            </div>
          </div>

          {/* User pill */}
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
              return (
                <React.Fragment key={t.id}>
                  {sectionEl}
                  <div className={`${styles.navItem} ${active ? styles.active : ''}`} onClick={() => navigate(href)}>
                    <span className={styles.navIcon}>{t.icon}</span>
                    <span className={styles.navLabel}>{t.label}</span>
                    {done ? <span className={styles.navDone}>✓</span>
                      : t.badge ? <span className={`${styles.navBadge} ${styles[t.badge?.toLowerCase?.() === 'new' ? 'badgeNew' : 'badgeHot']}`}>{t.badge}</span>
                      : null}
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
    </div>
  );
};

export default AppLayout;