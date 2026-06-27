import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import api from '../../utils/api';
import styles from './OnboardingFlow.module.css';

// ── Recommendation engine ─────────────────────────────────────────────
const getRecommendation = (level, goal, dailyGoal) => {
  const startingTopics = {
    'junior':     { id: 'js-core',     label: 'JavaScript Internals', icon: '⚡' },
    'mid-early':  { id: 'js-core',     label: 'JavaScript Internals', icon: '⚡' },
    'mid-senior': { id: 'closures',    label: 'Closures & Scope',     icon: '🔒' },
    'senior':     { id: 'react-core',  label: 'React Internals',      icon: '⚛' },
  };

  const urgencyBoost = goal === 'active-interview' ? 0.8 : 1;
  const totalConcepts = 280;
  const weeksToReady = Math.ceil((totalConcepts / (dailyGoal * 7)) * urgencyBoost);

  const goalLabels = {
    'active-interview':  'interview-ready as fast as possible',
    'future-interview':  'systematically prepared for interviews',
    'upskilling':        'a stronger senior frontend engineer',
    'gaps':              'confident in your weak areas',
  };

  return {
    topic: startingTopics[level],
    weeksToReady: Math.max(weeksToReady, 2),
    goalLabel: goalLabels[goal],
  };
};

// ── Step data ─────────────────────────────────────────────────────────
const LEVELS = [
  { value: 'junior',     label: 'Junior',     sub: '0–2 years · building fundamentals' },
  { value: 'mid-early',  label: 'Mid-level',  sub: '2–4 years · comfortable with React' },
  { value: 'mid-senior', label: 'Mid-Senior', sub: '4–6 years · targeting senior roles' },
  { value: 'senior',     label: 'Senior',     sub: '6+ years · refreshing and filling gaps' },
];

const GOALS = [
  { value: 'active-interview',  label: 'Actively interviewing',     sub: 'I need to be ready in weeks', icon: '🎯' },
  { value: 'future-interview',  label: 'Preparing for interviews',  sub: 'Planning ahead, months away',  icon: '📅' },
  { value: 'upskilling',        label: 'Levelling up my skills',    sub: 'No specific timeline',         icon: '📈' },
  { value: 'gaps',              label: 'Filling knowledge gaps',    sub: 'I know what I need to fix',    icon: '🔍' },
];

const DAILY_GOALS = [
  { value: 1,  label: '15 min / day',  sub: '1–2 concepts',         tag: 'Light' },
  { value: 3,  label: '30 min / day',  sub: '3–4 concepts',         tag: 'Steady' },
  { value: 5,  label: '1 hour / day',  sub: '5–6 concepts',         tag: 'Serious' },
  { value: 10, label: '2+ hours / day', sub: '10+ concepts',        tag: 'Intensive' },
];

// ── Main component ────────────────────────────────────────────────────
const OnboardingFlow = () => {
  const { user, updateUser } = useAuth();
  const navigate = useNavigate();

  const [step, setStep] = useState(0); // 0=level, 1=goal, 2=daily, 3=result
  const [answers, setAnswers] = useState({ level: null, goal: null, dailyGoal: 3 });
  const [saving, setSaving] = useState(false);

  const recommendation = step === 3
    ? getRecommendation(answers.level, answers.goal, answers.dailyGoal)
    : null;

  const handleSelect = (key, value) => {
    const updated = { ...answers, [key]: value };
    setAnswers(updated);

    // Auto-advance after short delay so user sees their selection highlighted
    setTimeout(() => {
      if (step < 2) setStep(s => s + 1);
      else if (step === 2) setStep(3); // show result
    }, 280);
  };

  const handleComplete = async (startNow) => {
    setSaving(true);
    try {
      const { data } = await api.post('/users/onboarding', {
        currentLevel: answers.level,
        goal: answers.goal,
        dailyGoal: answers.dailyGoal,
      });
      updateUser(data.user);

      if (startNow && recommendation?.topic) {
        navigate(`/${recommendation.topic.id}`);
      }
      // If they chose "explore on my own", the overlay disappears
      // because onboardingCompleted is now true on the user object
    } catch (err) {
      console.error('Onboarding save failed:', err);
      // Still dismiss — don't block the user
      updateUser({ onboardingCompleted: true });
    } finally {
      setSaving(false);
    }
  };

  const handleSkip = async () => {
    setSaving(true);
    try {
      const { data } = await api.post('/users/onboarding', {
        currentLevel: 'mid-senior',
        goal: 'future-interview',
        dailyGoal: 3,
      });
      updateUser(data.user);
    } catch {
      updateUser({ onboardingCompleted: true });
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>

        {/* Progress bar */}
        <div className={styles.progressBar}>
          <div
            className={styles.progressFill}
            style={{ width: `${((step + 1) / 4) * 100}%` }}
          />
        </div>

        {/* Skip */}
        {step < 3 && (
          <button className={styles.skipBtn} onClick={handleSkip} disabled={saving}>
            Skip setup
          </button>
        )}

        {/* ── Step 0: Level ─────────────────────────────────── */}
        {step === 0 && (
          <div className={styles.stepWrap}>
            <div className={styles.stepTag}>STEP 1 OF 3</div>
            <h1 className={styles.stepTitle}>What's your current level?</h1>
            <p className={styles.stepSub}>
              We'll personalise your starting point and learning pace.
            </p>
            <div className={styles.optionList}>
              {LEVELS.map(l => (
                <button
                  key={l.value}
                  className={`${styles.option} ${answers.level === l.value ? styles.optionSelected : ''}`}
                  onClick={() => handleSelect('level', l.value)}
                >
                  <div className={styles.optionLabel}>{l.label}</div>
                  <div className={styles.optionSub}>{l.sub}</div>
                  {answers.level === l.value && <span className={styles.checkmark}>✓</span>}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* ── Step 1: Goal ──────────────────────────────────── */}
        {step === 1 && (
          <div className={styles.stepWrap}>
            <div className={styles.stepTag}>STEP 2 OF 3</div>
            <h1 className={styles.stepTitle}>What brings you here?</h1>
            <p className={styles.stepSub}>
              This helps us prioritise the right content for your timeline.
            </p>
            <div className={styles.optionList}>
              {GOALS.map(g => (
                <button
                  key={g.value}
                  className={`${styles.option} ${answers.goal === g.value ? styles.optionSelected : ''}`}
                  onClick={() => handleSelect('goal', g.value)}
                >
                  <span className={styles.optionIcon}>{g.icon}</span>
                  <div className={styles.optionContent}>
                    <div className={styles.optionLabel}>{g.label}</div>
                    <div className={styles.optionSub}>{g.sub}</div>
                  </div>
                  {answers.goal === g.value && <span className={styles.checkmark}>✓</span>}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* ── Step 2: Daily goal ────────────────────────────── */}
        {step === 2 && (
          <div className={styles.stepWrap}>
            <div className={styles.stepTag}>STEP 3 OF 3</div>
            <h1 className={styles.stepTitle}>How much time can you commit daily?</h1>
            <p className={styles.stepSub}>
              Be realistic — consistency beats intensity every time.
            </p>
            <div className={styles.optionList}>
              {DAILY_GOALS.map(d => (
                <button
                  key={d.value}
                  className={`${styles.option} ${answers.dailyGoal === d.value ? styles.optionSelected : ''}`}
                  onClick={() => handleSelect('dailyGoal', d.value)}
                >
                  <div className={styles.optionContent}>
                    <div className={styles.optionLabel}>{d.label}</div>
                    <div className={styles.optionSub}>{d.sub}</div>
                  </div>
                  <span className={`${styles.tag} ${answers.dailyGoal === d.value ? styles.tagSelected : ''}`}>
                    {d.tag}
                  </span>
                  {answers.dailyGoal === d.value && <span className={styles.checkmark}>✓</span>}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* ── Step 3: Result ────────────────────────────────── */}
        {step === 3 && recommendation && (
          <div className={styles.stepWrap}>
            <div className={styles.resultIcon}>✓</div>
            <h1 className={styles.stepTitle}>Your learning plan is ready</h1>
            <p className={styles.stepSub}>
              Based on your answers, here's where to start.
            </p>

            <div className={styles.planCard}>
              <div className={styles.planRow}>
                <span className={styles.planLabel}>Start with</span>
                <span className={styles.planValue}>
                  {recommendation.topic.icon} {recommendation.topic.label}
                </span>
              </div>
              <div className={styles.planRow}>
                <span className={styles.planLabel}>Daily goal</span>
                <span className={styles.planValue}>
                  {answers.dailyGoal} concept{answers.dailyGoal > 1 ? 's' : ''} / day
                </span>
              </div>
              <div className={styles.planRow}>
                <span className={styles.planLabel}>Goal</span>
                <span className={styles.planValue} style={{ textTransform: 'capitalize' }}>
                  {recommendation.goalLabel}
                </span>
              </div>
              <div className={`${styles.planRow} ${styles.planRowHighlight}`}>
                <span className={styles.planLabel}>Est. interview-ready</span>
                <span className={styles.planValueGreen}>
                  ~{recommendation.weeksToReady} weeks
                </span>
              </div>
            </div>

            <div className={styles.resultActions}>
              <button
                className={styles.btnPrimary}
                onClick={() => handleComplete(true)}
                disabled={saving}
              >
                {saving ? 'Setting up...' : `Start with ${recommendation.topic.label} →`}
              </button>
              <button
                className={styles.btnSecondary}
                onClick={() => handleComplete(false)}
                disabled={saving}
              >
                Explore on my own
              </button>
            </div>

            <button className={styles.backBtn} onClick={() => setStep(2)}>
              ← Change answers
            </button>
          </div>
        )}

      </div>
    </div>
  );
};

export default OnboardingFlow;