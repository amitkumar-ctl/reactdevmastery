import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Legal.module.css';
import logoIcon from '../../assets/icon-transparent-white.svg';

const LegalLayout = ({ eyebrow, title, updated, children }) => {
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