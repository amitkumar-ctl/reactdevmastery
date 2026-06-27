import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './Guest.module.css';

const GuestBanner = () => {
  const [dismissed, setDismissed] = useState(false);
  if (dismissed) return null;

  return (
    <div className={styles.banner}>
      <span className={styles.bannerText}>
        👀 You're browsing as a guest — progress won't be saved
      </span>
      <div className={styles.bannerActions}>
        <Link to="/register" className={styles.bannerSignup}>Sign up free →</Link>
        <Link to="/login" className={styles.bannerLogin}>Log in</Link>
        <button className={styles.bannerDismiss} onClick={() => setDismissed(true)} aria-label="Dismiss">✕</button>
      </div>
    </div>
  );
};

export default GuestBanner;