import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Guest.module.css';

/**
 * Two usage modes:
 *
 * 1. Wrapping a button (inline stateful action intercept):
 *    <SignupPrompt isGuest={!user} feature="save your progress">
 *      <button onClick={handleMarkDone}>Mark Complete ✓</button>
 *    </SignupPrompt>
 *
 * 2. Externally controlled (e.g. from sidebar nav click):
 *    <SignupPrompt isGuest={true} feature="access your Dashboard" _forceOpen onClose={() => setOpen(false)} />
 */
const SignupPrompt = ({ isGuest, feature = 'use this feature', children, _forceOpen = false, onClose }) => {
  const [open, setOpen] = React.useState(false);

  const isOpen = _forceOpen || open;
  const handleClose = () => {
    setOpen(false);
    onClose?.();
  };

  // External mode — no child button needed
  if (_forceOpen) {
    return isOpen ? (
      <div className={styles.promptOverlay} onClick={handleClose}>
        <div className={styles.promptCard} onClick={e => e.stopPropagation()}>
          <button className={styles.promptClose} onClick={handleClose}>✕</button>
          <div className={styles.promptIcon}>🔒</div>
          <h2 className={styles.promptTitle}>Create a free account</h2>
          <p className={styles.promptSub}>Sign up to {feature} and track your journey to senior engineer.</p>
          <div className={styles.promptPerks}>
            <div className={styles.perk}><span className={styles.perkIcon}>📈</span> Track progress across 30+ topics</div>
            <div className={styles.perk}><span className={styles.perkIcon}>🔥</span> Build daily streaks</div>
            <div className={styles.perk}><span className={styles.perkIcon}>🏆</span> Compete on the leaderboard</div>
            <div className={styles.perk}><span className={styles.perkIcon}>⚡</span> Personalised learning plan</div>
          </div>
          <Link to="/register" className={styles.promptSignup}>Sign up free — takes 30 seconds →</Link>
          <Link to="/login" className={styles.promptLogin}>Already have an account? Log in</Link>
        </div>
      </div>
    ) : null;
  }

  // Inline mode — wraps a child button
  if (!isGuest) return children;

  return (
    <>
      <button className={styles.teaserBtn} onClick={() => setOpen(true)}>
        {children?.props?.children || 'Sign up to continue'}
      </button>

      {isOpen && (
        <div className={styles.promptOverlay} onClick={handleClose}>
          <div className={styles.promptCard} onClick={e => e.stopPropagation()}>
            <button className={styles.promptClose} onClick={handleClose}>✕</button>
            <div className={styles.promptIcon}>🔒</div>
            <h2 className={styles.promptTitle}>Create a free account</h2>
            <p className={styles.promptSub}>Sign up to {feature} and track your journey to senior engineer.</p>
            <div className={styles.promptPerks}>
              <div className={styles.perk}><span className={styles.perkIcon}>📈</span> Track progress across 30+ topics</div>
              <div className={styles.perk}><span className={styles.perkIcon}>🔥</span> Build daily streaks</div>
              <div className={styles.perk}><span className={styles.perkIcon}>🏆</span> Compete on the leaderboard</div>
              <div className={styles.perk}><span className={styles.perkIcon}>⚡</span> Personalised learning plan</div>
            </div>
            <Link to="/register" className={styles.promptSignup}>Sign up free — takes 30 seconds →</Link>
            <Link to="/login" className={styles.promptLogin}>Already have an account? Log in</Link>
          </div>
        </div>
      )}
    </>
  );
};

export default SignupPrompt;