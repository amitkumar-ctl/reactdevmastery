import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { CONCEPTS, QUIZZES, CONTENT } from 'reactdevmastery-content/data';
import { LEARN_COMPONENTS, VISUALIZERS } from 'reactdevmastery-content/components';
import { useAuth } from '../context/AuthContext';
import { useProgress } from '../context/ProgressContext';
import api from '../utils/api';
import styles from './DailyChallenge.module.css';

// ── Deterministic daily concept ───────────────────────────────────────
function getDailyInfo(offset = 0) {
  const allConcepts = [];
  Object.entries(CONCEPTS).forEach(([topicId, topic]) => {
    topic.items.forEach(item => {
      allConcepts.push({ ...item, topicId, topicTitle: topic.title, color: topic.color });
    });
  });
  const dayNumber = Math.floor(Date.now() / 86400000) + offset;
  return allConcepts[dayNumber % allConcepts.length];
}

// ── Countdown to midnight UTC ─────────────────────────────────────────
function useCountdown() {
  const [time, setTime] = React.useState('');
  React.useEffect(() => {
    const tick = () => {
      const now = new Date();
      const midnight = new Date();
      midnight.setUTCHours(24, 0, 0, 0);
      const diff = midnight - now;
      const h = Math.floor(diff / 3600000);
      const m = Math.floor((diff % 3600000) / 60000);
      const s = Math.floor((diff % 60000) / 1000);
      setTime(`${h}h ${m}m ${s}s`);
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);
  return time;
}

const diffColor = { hard: '#ef4444', medium: '#f97316', easy: '#00ff88' };

// ── Quiz step ─────────────────────────────────────────────────────────
function QuizStep({ concept, onComplete }) {
  const qs = (QUIZZES[concept.id] || []).slice(0, 3);
  const [idx, setIdx] = useState(0);
  const [selected, setSelected] = useState(null);
  const [answered, setAnswered] = useState(false);
  const [score, setScore] = useState(0);

  if (qs.length === 0) {
    onComplete(0, 0);
    return null;
  }

  const q = qs[idx];

  const handleAnswer = (optIdx) => {
    if (answered) return;
    setAnswered(true);
    setSelected(optIdx);
    if (optIdx === q.correct) setScore(s => s + 1);
  };

  const handleNext = () => {
    if (idx + 1 >= qs.length) {
      onComplete(score + (selected === q.correct ? 1 : 0), qs.length);
    } else {
      setIdx(i => i + 1);
      setSelected(null);
      setAnswered(false);
    }
  };

  return (
    <div className={styles.quizWrap}>
      <div className={styles.quizProgress}>
        Question {idx + 1} of {qs.length}
        <div className={styles.quizDots}>
          {qs.map((_, i) => (
            <span key={i} className={`${styles.dot} ${i < idx ? styles.dotDone : i === idx ? styles.dotActive : ''}`} />
          ))}
        </div>
      </div>

      <pre className={styles.question}>{q.q}</pre>

      <div className={styles.options}>
        {q.opts.map((opt, i) => {
          let cls = styles.option;
          if (answered) {
            if (i === q.correct) cls += ' ' + styles.correct;
            else if (i === selected) cls += ' ' + styles.wrong;
            else cls += ' ' + styles.dimmed;
          }
          return (
            <button key={i} className={cls} onClick={() => handleAnswer(i)}>
              <span className={styles.optLetter}>{String.fromCharCode(65 + i)}</span>
              {opt}
            </button>
          );
        })}
      </div>

      {answered && (
        <>
          <div className={`${styles.explain} ${selected === q.correct ? styles.explainCorrect : styles.explainWrong}`}>
            <strong>{selected === q.correct ? '✓ Correct!' : '✗ Not quite.'}</strong> {q.explain}
          </div>
          <button className={styles.nextBtn} onClick={handleNext}>
            {idx + 1 >= qs.length ? 'Finish Challenge →' : 'Next Question →'}
          </button>
        </>
      )}
    </div>
  );
}

// ── Main ──────────────────────────────────────────────────────────────
export default function DailyChallenge() {
  const { user } = useAuth();
  const { updateUser } = useProgress();
  const navigate = useNavigate();
  const countdown = useCountdown();

  const today = useMemo(() => new Date().toISOString().slice(0, 10), []);
  const concept = useMemo(() => getDailyInfo(0), []);
  const tomorrow = useMemo(() => getDailyInfo(1), []);

  const alreadyDone = user?.lastDailyCompleted === today;

  const [step, setStep] = useState('idle'); // idle | learn | quiz | done
  const [finalScore, setFinalScore] = useState(null);
  const [saving, setSaving] = useState(false);

  const LearnComponent = LEARN_COMPONENTS[concept.id];
  const VisComponent = VISUALIZERS[concept.id];
  const content = CONTENT[concept.id];

  const handleQuizComplete = async (score, total) => {
    setSaving(true);
    try {
      const { data } = await api.post('/progress/daily', {
        conceptId: concept.id,
        topicId: concept.topicId,
        score,
        total,
      });
      if (data.user) updateUser(data.user);
      setFinalScore({ score, total });
      setStep('done');
    } catch {
      setFinalScore({ score, total });
      setStep('done');
    } finally {
      setSaving(false);
    }
  };

  // ── Already done ───────────────────────────────────────────────────
  if (alreadyDone || step === 'done') {
    return (
      <div className={styles.page}>
        <div className={styles.doneCard}>
          <div className={styles.doneIcon}>✅</div>
          <h2 className={styles.doneTitle}>Challenge Complete!</h2>
          {finalScore && (
            <p className={styles.doneScore}>
              You answered <strong style={{ color: '#00ff88' }}>{finalScore.score}/{finalScore.total}</strong> correctly
            </p>
          )}
          <div className={styles.streakBadge}>🔥 {user?.streak || 0} day streak</div>

          <div className={styles.nextPreview}>
            <div className={styles.nextLabel}>Next challenge in</div>
            <div className={styles.countdown}>{countdown}</div>
            <div className={styles.nextConcept}>
              Tomorrow: <strong style={{ color: tomorrow.color }}>{tomorrow.title}</strong>
            </div>
          </div>

          <div className={styles.doneActions}>
            <button className={styles.btnPrimary} onClick={() => navigate(`/${concept.topicId}/${concept.id}`)}>
              Review Concept →
            </button>
            <button className={styles.btnSecondary} onClick={() => navigate('/')}>
              Go to Dashboard
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ── Idle ───────────────────────────────────────────────────────────
  if (step === 'idle') {
    return (
      <div className={styles.page}>
        <div className={styles.header}>
          <div className={styles.headerTop}>
            <span className={styles.headerLabel}>🎯 Daily Challenge</span>
            <span className={styles.countdown}>Resets in {countdown}</span>
          </div>
          <div className={styles.date}>{new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}</div>
        </div>

        <div className={styles.conceptCard} style={{ borderColor: concept.color + '60' }}>
          <div className={styles.conceptLabel} style={{ color: concept.color }}>Today's Concept</div>
          <div className={styles.conceptTitle}>{concept.title}</div>
          <div className={styles.conceptMeta}>
            <span className={styles.topicTag}>{concept.topicTitle}</span>
            <span className={styles.diffTag} style={{ color: diffColor[concept.diff] }}>● {concept.diff.toUpperCase()}</span>
          </div>
        </div>

        <div className={styles.steps}>
          <div className={styles.stepRow}>
            <div className={styles.stepNum}>1</div>
            <div className={styles.stepText}>
              <div className={styles.stepTitle}>Read the concept</div>
              <div className={styles.stepSub}>Study the explanation and code examples</div>
            </div>
          </div>
          <div className={styles.stepLine} />
          <div className={styles.stepRow}>
            <div className={styles.stepNum}>2</div>
            <div className={styles.stepText}>
              <div className={styles.stepTitle}>Answer quiz questions</div>
              <div className={styles.stepSub}>3 questions to test your understanding</div>
            </div>
          </div>
        </div>

        <button className={styles.startBtn} onClick={() => setStep('learn')}>
          Start Today's Challenge →
        </button>

        {!user && (
          <p className={styles.guestNote}>
            <span>👀</span> Sign up to save your progress and build a streak
          </p>
        )}
      </div>
    );
  }

  // ── Learn step ─────────────────────────────────────────────────────
  if (step === 'learn') {
    return (
      <div className={styles.page}>
        <div className={styles.stepHeader}>
          <button className={styles.backBtn} onClick={() => setStep('idle')}>← Back</button>
          <div className={styles.stepBadge}>Step 1 of 2 — Read</div>
          <button className={styles.skipBtn} onClick={() => setStep('quiz')}>
            Skip to Quiz →
          </button>
        </div>

        <h2 className={styles.learnTitle}>{concept.title}</h2>

        <div className={styles.learnContent}>
          {VisComponent && <VisComponent />}
          {LearnComponent
            ? <LearnComponent />
            : content
              ? (
                <>
                  <div className={styles.panel}>
                    <div className={styles.panelTitle}>Explanation</div>
                    <pre className={styles.explainBox}>{content.explanation}</pre>
                  </div>
                  {content.code && (
                    <div className={styles.panel}>
                      <div className={styles.panelTitle}>Code Example</div>
                      <pre className={styles.codeBox}>{content.code}</pre>
                    </div>
                  )}
                  {content.tips && (
                    <div className={styles.panel}>
                      <div className={styles.panelTitle}>Interview Tips 🎯</div>
                      <pre className={styles.explainBox}>{content.tips}</pre>
                    </div>
                  )}
                </>
              )
              : <p className={styles.noContent}>Open the full concept page to see the interactive lesson.</p>
          }
        </div>

        <div className={styles.learnFooter}>
          <button className={styles.startBtn} onClick={() => setStep('quiz')}>
            I've read it — Start Quiz →
          </button>
        </div>
      </div>
    );
  }

  // ── Quiz step ──────────────────────────────────────────────────────
  if (step === 'quiz') {
    return (
      <div className={styles.page}>
        <div className={styles.stepHeader}>
          <button className={styles.backBtn} onClick={() => setStep('learn')}>← Back</button>
          <div className={styles.stepBadge}>Step 2 of 2 — Quiz</div>
          <div />
        </div>
        <h2 className={styles.learnTitle}>{concept.title}</h2>
        {saving
          ? <div className={styles.saving}>Saving your progress...</div>
          : <QuizStep concept={concept} onComplete={handleQuizComplete} />
        }
      </div>
    );
  }

  return null;
}