import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import styles from './Legal.module.css';
import logoIcon from '../../assets/icon-transparent-white.svg';

const LegalLayout = ({ eyebrow, title, updated, children }) => {
  useEffect(() => {
    // The global index.css sets overflow: hidden on html/body/#root
    // to support the app-shell scroll pattern. Legal pages need normal
    // document scroll, so we temporarily override this while mounted.
    const root = document.getElementById('root');
    const prev = root ? root.style.overflow : '';
    document.documentElement.style.overflow = 'auto';
    document.body.style.overflow = 'auto';
    if (root) root.style.overflow = 'auto';

    return () => {
      // Restore on unmount so the app-shell scroll behavior is unaffected
      document.documentElement.style.overflow = '';
      document.body.style.overflow = '';
      if (root) root.style.overflow = prev;
    };
  }, []);

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <Link to="/" className={styles.logo}>
          <div className={styles.logoIcon}>
            <img src={logoIcon} alt="" style={{ width: '60%', height: '60%' }} />
          </div>
          <span className={styles.logoText}>REACTDEVMASTERY</span>
        </Link>
        <Link to="/" className={styles.backLink}>← Back to app</Link>
      </header>

      <div className={styles.body}>
        <div className={styles.content}>
          <div className={styles.eyebrow}>{eyebrow}</div>
          <h1 className={styles.title}>{title}</h1>
          <div className={styles.updated}>Last updated: {updated}</div>
          {children}
        </div>
      </div>

      <footer className={styles.footer}>
        <Link to="/privacy">Privacy Policy</Link>
        <Link to="/terms">Terms of Service</Link>
        <Link to="/login">Sign in</Link>
      </footer>
    </div>
  );
};

export default LegalLayout;