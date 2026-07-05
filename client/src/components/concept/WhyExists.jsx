import React from 'react';
import { WHY_EXISTS } from 'reactdevmastery-content/data';
import styles from './WhyExists.module.css';

export default function WhyExists({ conceptId }) {
  const why = WHY_EXISTS[conceptId];

  if (!why) return (
    <div className={styles.empty}>
      <div className={styles.emptyIcon}>🔍</div>
      <div className={styles.emptyTitle}>Coming soon</div>
      <div className={styles.emptySub}>
        The "Why this exists" context for this concept is being written.
      </div>
    </div>
  );

  return (
    <div className={styles.wrap}>

      {/* The Problem */}
      <div className={styles.section} style={{ borderColor: '#2a1a5e' }}>
        <div className={styles.sectionHeader}>
          <span className={styles.icon}>😤</span>
          <div>
            <div className={styles.sectionTitle}>The Problem</div>
            <div className={styles.sectionSub}>What pain existed before this</div>
          </div>
        </div>
        <p className={styles.text}>{why.problem}</p>
      </div>

      {/* Before code */}
      {why.before && (
        <div className={styles.codeBlock} style={{ borderColor: '#5f1a1a' }}>
          <div className={styles.codeHeader}>
            <span className={styles.codeBadge} style={{ color: '#ef4444', background: '#1a0505', borderColor: '#ef444440' }}>✗ Before</span>
          </div>
          <pre className={styles.code}>{why.before}</pre>
        </div>
      )}

      {/* The Solution */}
      <div className={styles.section} style={{ borderColor: '#0a4420' }}>
        <div className={styles.sectionHeader}>
          <span className={styles.icon}>💡</span>
          <div>
            <div className={styles.sectionTitle}>Why This Was Created</div>
            <div className={styles.sectionSub}>The problem it solves</div>
          </div>
        </div>
        <p className={styles.text}>{why.solution}</p>
      </div>

      {/* After code */}
      {why.after && (
        <div className={styles.codeBlock} style={{ borderColor: '#0a4420' }}>
          <div className={styles.codeHeader}>
            <span className={styles.codeBadge} style={{ color: '#00ff88', background: '#052210', borderColor: '#00ff8840' }}>✓ After</span>
          </div>
          <pre className={styles.code}>{why.after}</pre>
        </div>
      )}

    </div>
  );
}