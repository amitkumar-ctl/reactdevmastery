import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useProgress } from '../context/ProgressContext';
import { QUIZZES, CONCEPTS } from '../data/courseData';
import styles from './TopicPage.module.css';

const QuizPage = () => {
  const navigate = useNavigate();
  const { recordQuiz } = useProgress();

  // Build flat list of all questions with topic context
  const allQuestions = useMemo(() => {
    const questions = [];
    Object.entries(QUIZZES).forEach(([conceptId, qs]) => {
      // Find which topic this concept belongs to
      let topicId = null;
      let topicTitle = null;
      Object.entries(CONCEPTS).forEach(([tid, topic]) => {
        if (topic.items.find(i => i.id === conceptId)) {
          topicId = tid;
          topicTitle = topic.title;
        }
      });
      qs.forEach(q => {
        questions.push({ ...q, conceptId, topicId, topicTitle });
      });
    });
    // Shuffle
    return questions.sort(() => Math.random() - 0.5);
  }, []);

  const [idx, setIdx]           = useState(0);
  const [answered, setAnswered] = useState(false);
  const [selected, setSelected] = useState(null);
  const [score, setScore]       = useState(0);
  const [finished, setFinished] = useState(false);

  const TOTAL = Math.min(20, allQuestions.length); // 20-question session
  const q = allQuestions[idx];

  const handleAnswer = (optIdx) => {
    if (answered) return;
    setAnswered(true);
    setSelected(optIdx);
    const correct = optIdx === q.correct;
    if (correct) setScore(s => s + 1);
    recordQuiz?.(q.conceptId, q.topicId, correct);
  };

  const next = () => {
    if (idx + 1 >= TOTAL) {
      setFinished(true);
    } else {
      setIdx(i => i + 1);
      setAnswered(false);
      setSelected(null);
    }
  };

  if (finished) {
    const pct = Math.round((score / TOTAL) * 100);
    return (
      <div className={styles.page}>
        <div className={styles.topbar}>
          <button className={styles.backBtn} onClick={() => navigate('/')}>← Dashboard</button>
        </div>
        <div className={styles.content}>
          <div className={styles.panel} style={{ textAlign: 'center', padding: 48 }}>
            <div style={{ fontSize: 64, marginBottom: 16 }}>
              {pct >= 80 ? '🏆' : pct >= 60 ? '💪' : '📚'}
            </div>
            <div style={{ fontSize: 28, fontWeight: 700, color: pct >= 80 ? '#00ff88' : pct >= 60 ? '#eab308' : '#ef4444', marginBottom: 8 }}>
              {score} / {TOTAL}
            </div>
            <div style={{ fontSize: 16, color: '#9ca3af', marginBottom: 32 }}>
              {pct >= 80 ? 'Excellent! You\'re interview-ready.' : pct >= 60 ? 'Good effort — review the ones you missed.' : 'Keep studying — you\'ll get there!'}
            </div>
            <div style={{ display: 'flex', gap: 12, justifyContent: 'center' }}>
              <button className={styles.btnPrimary} onClick={() => { setIdx(0); setAnswered(false); setSelected(null); setScore(0); setFinished(false); }}>
                🔄 Retry
              </button>
              <button className={styles.btn} onClick={() => navigate('/')}>
                ← Dashboard
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <div className={styles.topbar}>
        <button className={styles.backBtn} onClick={() => navigate('/')}>← Dashboard</button>
        <div>
          <div className={styles.topicTitle}>🎯 Quiz Me</div>
          <div className={styles.topicMeta}>
            <span className={styles.tag} style={{ color: '#4facfe' }}>
              Question {idx + 1} of {TOTAL}
            </span>
            <span className={styles.tag} style={{ color: '#00ff88' }}>
              Score: {score}
            </span>
          </div>
        </div>
      </div>

      {/* Progress bar */}
      <div style={{ height: 3, background: '#1a2332', margin: '0 0 24px' }}>
        <div style={{
          height: '100%',
          width: `${((idx + 1) / TOTAL) * 100}%`,
          background: 'linear-gradient(90deg, #4facfe, #00ff88)',
          transition: 'width 0.3s ease',
        }} />
      </div>

      <div className={styles.content}>
        <div className={styles.panel}>
          {/* Topic badge */}
          {q.topicTitle && (
            <div style={{ marginBottom: 12 }}>
              <span className={styles.tag} style={{ color: '#a855f7', borderColor: '#2d1b69', background: '#1a0d3d', fontSize: 11 }}>
                {q.topicTitle}
              </span>
            </div>
          )}

          <pre className={styles.quizQ}>{q.q}</pre>

          <div className={styles.quizOptions}>
            {q.opts.map((opt, i) => {
              let cls = styles.quizOpt;
              if (answered && i === q.correct) cls += ' ' + styles.quizCorrect;
              else if (answered && i === selected) cls += ' ' + styles.quizWrong;
              return (
                <button key={i} className={cls} onClick={() => handleAnswer(i)}>
                  {String.fromCharCode(65 + i)}. {opt}
                </button>
              );
            })}
          </div>

          {answered && (
            <div className={`${styles.quizFeedback} ${selected === q.correct ? styles.feedbackPass : styles.feedbackFail}`}>
              {selected === q.correct ? '✓ Correct!' : '✗ Not quite.'}<br /><br />
              {q.explain}
            </div>
          )}

          <div className={styles.quizNav} style={{ marginTop: 16 }}>
            {answered && (
              <button className={styles.btnPrimary} onClick={next} style={{ marginLeft: 'auto' }}>
                {idx + 1 >= TOTAL ? 'See Results 🏆' : 'Next Question →'}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuizPage;