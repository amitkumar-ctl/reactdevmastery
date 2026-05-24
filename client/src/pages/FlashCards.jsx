import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useProgress } from '../context/ProgressContext';
import { FLASHCARDS } from '../data/courseData';
import styles from './FlashCards.module.css';

const FlashCards = () => {
  const [idx, setIdx] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const { flashCardsSeen, markFlashSeen } = useProgress();
  const navigate = useNavigate();

  const card = FLASHCARDS[idx];

  const goTo = (newIdx) => {
    setIdx(newIdx);
    setFlipped(false);
    markFlashSeen(newIdx);
  };

  const handleFlip = () => {
    setFlipped(!flipped);
    markFlashSeen(idx);
  };

  return (
    <div className={styles.page}>
      <div className={styles.topbar}>
        <button className={styles.backBtn} onClick={() => navigate('/')}>← Dashboard</button>
        <div className={styles.title}>⚡ Flash Card Drill</div>
        <div className={styles.meta}>
          <span className={styles.tag}>{idx + 1} / {FLASHCARDS.length}</span>
          <span className={styles.tag} style={{ color: '#00ff88' }}>{flashCardsSeen.length} seen</span>
          <span className={styles.tag}>{FLASHCARDS.length - flashCardsSeen.length} remaining</span>
        </div>
      </div>

      <div className={styles.content}>
        <div className={`${styles.card} ${flipped ? styles.flipped : ''}`} onClick={handleFlip}>
          <div className={styles.cardInner}>
            <div className={styles.cardFront}>
              <div className={styles.cardLabel}>QUESTION</div>
              <div className={styles.cardText}>{card.q}</div>
              <div className={styles.cardHint}>Click to reveal answer</div>
            </div>
            <div className={styles.cardBack}>
              <div className={styles.cardLabel} style={{ color: '#00ff88' }}>ANSWER</div>
              <div className={styles.cardAnswer}>{card.a}</div>
            </div>
          </div>
        </div>

        {/* Dot progress */}
        <div className={styles.dots}>
          {FLASHCARDS.map((_, i) => (
            <div key={i} className={styles.dot}
              style={{
                background: i === idx ? '#00ff88' : flashCardsSeen.includes(i) ? '#4facfe' : '#1e2d40',
                transform: i === idx ? 'scale(1.4)' : 'scale(1)',
              }}
              onClick={() => goTo(i)}
            />
          ))}
        </div>

        {/* Nav */}
        <div className={styles.nav}>
          <button className={styles.navBtn} onClick={() => goTo(Math.max(0, idx - 1))} disabled={idx === 0}>← Prev</button>
          <button className={styles.flipBtn} onClick={handleFlip}>{flipped ? '🙈 Hide' : '👁 Reveal'}</button>
          <button className={styles.navBtnPrimary} onClick={() => goTo(Math.min(FLASHCARDS.length - 1, idx + 1))} disabled={idx === FLASHCARDS.length - 1}>Next →</button>
        </div>

        {flashCardsSeen.length === FLASHCARDS.length && (
          <div className={styles.complete}>🎉 All cards seen! Great work.</div>
        )}

        {/* Keyboard hint */}
        <div className={styles.hint}>← → arrow keys to navigate · Space to flip</div>
      </div>
    </div>
  );
};

export default FlashCards;
