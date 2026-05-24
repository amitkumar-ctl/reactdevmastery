import React, { useState, useMemo } from 'react';
import { useProgress } from '../context/ProgressContext';
import { INTERVIEW_CATEGORIES, ALL_QUESTIONS, ANSWERS } from '../data/interviewQuestions';
import api from '../utils/api';
import styles from './InterviewPrepPage.module.css';

const InterviewPrepPage = () => {
  const [view, setView] = useState('browse'); // browse | category | question | quiz-mode | practice
  const [selectedCat, setSelectedCat] = useState(null);
  const [selectedQ, setSelectedQ] = useState(null);
  const [search, setSearch] = useState('');
  const [diffFilter, setDiffFilter] = useState('all');
  const [answeredIds, setAnsweredIds] = useState({});
  const [quizMode, setQuizMode] = useState(false);
  const [quizIdx, setQuizIdx] = useState(0);
  const [quizPool, setQuizPool] = useState([]);

  const { recordQuiz } = useProgress();

  // stats
  const totalAnswered = Object.keys(answeredIds).length;
  const totalQuestions = ALL_QUESTIONS.length;

  const filteredQuestions = useMemo(() => {
    let qs = selectedCat
      ? INTERVIEW_CATEGORIES.find(c => c.id === selectedCat)?.questions || []
      : ALL_QUESTIONS;
    if (diffFilter !== 'all') qs = qs.filter(q => q.difficulty === diffFilter);
    if (search.trim()) qs = qs.filter(q => q.q.toLowerCase().includes(search.toLowerCase()));
    return qs;
  }, [selectedCat, diffFilter, search]);

  const startQuiz = (pool) => {
    const shuffled = [...pool].sort(() => Math.random() - 0.5).slice(0, 10);
    setQuizPool(shuffled);
    setQuizIdx(0);
    setView('quiz-mode');
  };

  if (view === 'quiz-mode') {
    return <QuizMode pool={quizPool} idx={quizIdx} setIdx={setQuizIdx} onBack={() => setView('browse')} recordQuiz={recordQuiz} answeredIds={answeredIds} setAnsweredIds={setAnsweredIds} />;
  }

  if (view === 'question' && selectedQ) {
    return <QuestionDetail q={selectedQ} onBack={() => { setView(selectedCat ? 'category' : 'browse'); }} answeredIds={answeredIds} setAnsweredIds={setAnsweredIds} />;
  }

  return (
    <div className={styles.page}>
      {/* Top bar */}
      <div className={styles.topbar}>
        <div>
          <div className={styles.title}>🎯 Interview Prep — 300+ Questions</div>
          <div className={styles.subtitle}>Browse, study, and get AI explanations for every topic</div>
        </div>
        <div className={styles.topStats}>
          <div className={styles.statPill}>{totalAnswered}/{totalQuestions} reviewed</div>
          <div className={styles.progressMini}>
            <div style={{ width: `${(totalAnswered / totalQuestions) * 100}%`, height: '100%', background: 'linear-gradient(90deg, #00ff88, #4facfe)', borderRadius: 4, transition: 'width 0.5s' }} />
          </div>
          <button className={styles.btnPrimary} onClick={() => startQuiz(ALL_QUESTIONS)}>⚡ Random Quiz (10)</button>
        </div>
      </div>

      <div className={styles.content}>
        {/* Search + filter bar */}
        <div className={styles.filterBar}>
          <input className={styles.search} placeholder="Search questions..." value={search} onChange={e => { setSearch(e.target.value); setSelectedCat(null); }} />
          <div className={styles.filters}>
            {['all', 'easy', 'medium', 'hard'].map(d => (
              <button key={d} className={`${styles.filterBtn} ${diffFilter === d ? styles.filterActive : ''}`}
                style={diffFilter === d ? { borderColor: d === 'easy' ? '#00ff88' : d === 'medium' ? '#eab308' : d === 'hard' ? '#ef4444' : '#4facfe', color: d === 'easy' ? '#00ff88' : d === 'medium' ? '#eab308' : d === 'hard' ? '#ef4444' : '#4facfe' } : {}}
                onClick={() => setDiffFilter(d)}>{d === 'all' ? 'All' : d.charAt(0).toUpperCase() + d.slice(1)}</button>
            ))}
          </div>
          {selectedCat && <button className={styles.clearBtn} onClick={() => setSelectedCat(null)}>✕ Clear category</button>}
        </div>

        {/* Category cards (shown when no search, no category selected) */}
        {!search && !selectedCat && (
          <div className={styles.catGrid}>
            {INTERVIEW_CATEGORIES.map(cat => {
              const answered = cat.questions.filter(q => answeredIds[q.id]).length;
              return (
                <div key={cat.id} className={styles.catCard} style={{ '--cat-color': cat.color }} onClick={() => setSelectedCat(cat.id)}>
                  <div className={styles.catIcon}>{cat.icon}</div>
                  <div className={styles.catName}>{cat.title}</div>
                  <div className={styles.catCount}>{cat.questions.length} questions</div>
                  <div className={styles.catProgress}>
                    <div style={{ width: `${(answered / cat.questions.length) * 100}%`, height: '100%', background: cat.color, borderRadius: 2, transition: 'width 0.5s' }} />
                  </div>
                  <div className={styles.catAnswered}>{answered}/{cat.questions.length} reviewed</div>
                </div>
              );
            })}
          </div>
        )}

        {/* Question list */}
        {(search || selectedCat) && (
          <div className={styles.qList}>
            {selectedCat && (
              <div className={styles.catHeader}>
                <div className={styles.catHeaderTitle} style={{ color: INTERVIEW_CATEGORIES.find(c => c.id === selectedCat)?.color }}>
                  {INTERVIEW_CATEGORIES.find(c => c.id === selectedCat)?.icon} {INTERVIEW_CATEGORIES.find(c => c.id === selectedCat)?.title}
                </div>
                <button className={styles.btnOutline} onClick={() => startQuiz(INTERVIEW_CATEGORIES.find(c => c.id === selectedCat)?.questions || [])}>
                  ⚡ Quiz this category
                </button>
              </div>
            )}
            {filteredQuestions.length === 0 && <div className={styles.empty}>No questions found.</div>}
            {filteredQuestions.map((q, i) => {
              const answered = answeredIds[q.id];
              const cat = INTERVIEW_CATEGORIES.find(c => c.id === q.categoryId || c.questions.find(x => x.id === q.id));
              return (
                <div key={q.id} className={styles.qRow} onClick={() => { setSelectedQ({ ...q, categoryId: q.categoryId || selectedCat, color: cat?.color || '#4facfe' }); setView('question'); }}>
                  <div className={styles.qNum}>{i + 1}</div>
                  <div className={styles.qText}>{q.q}</div>
                  <div className={styles.qMeta}>
                    <span className={styles.qDiff} style={{ color: q.difficulty === 'easy' ? '#00ff88' : q.difficulty === 'medium' ? '#eab308' : '#ef4444' }}>
                      {q.difficulty}
                    </span>
                    {answered && <span className={styles.qDone}>✓</span>}
                    {ANSWERS[q.id] && <span className={styles.qHasAnswer}>💡</span>}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Hot topics (shown on home view) */}
        {!search && !selectedCat && (
          <div className={styles.hotSection}>
            <div className={styles.sectionTitle}>🔥 Most Asked — Top 20</div>
            <div className={styles.hotGrid}>
              {[
                { q: 'What is the event loop?', diff: 'hard', color: '#ef4444', id: 'q17' },
                { q: 'Explain closures', diff: 'medium', color: '#eab308', id: 'q4' },
                { q: 'What is React Fiber?', diff: 'hard', color: '#ef4444', id: 'q123' },
                { q: 'var vs let vs const', diff: 'easy', color: '#00ff88', id: 'q1' },
                { q: 'Explain useEffect deeply', diff: 'hard', color: '#ef4444', id: 'q114' },
                { q: 'What is XSS?', diff: 'medium', color: '#eab308', id: 'q201' },
                { q: 'Explain Core Web Vitals', diff: 'medium', color: '#eab308', id: 'q182' },
                { q: 'useMemo vs useCallback', diff: 'hard', color: '#ef4444', id: 'q116' },
                { q: 'JWT vs Sessions', diff: 'hard', color: '#ef4444', id: 'q211' },
                { q: 'What causes re-renders?', diff: 'hard', color: '#ef4444', id: 'q125' },
                { q: 'Explain prototypal inheritance', diff: 'hard', color: '#ef4444', id: 'q14' },
                { q: 'What is CSRF?', diff: 'medium', color: '#eab308', id: 'q203' },
                { q: 'Explain code splitting', diff: 'medium', color: '#eab308', id: 'q128' },
                { q: 'Explain this keyword', diff: 'hard', color: '#ef4444', id: 'q11' },
                { q: 'REST vs GraphQL', diff: 'medium', color: '#eab308', id: 'q231' },
                { q: 'Debounce vs throttle', diff: 'medium', color: '#eab308', id: 'q23' },
                { q: 'What are micro frontends?', diff: 'hard', color: '#ef4444', id: 'q248' },
                { q: 'Explain reflow/repaint', diff: 'medium', color: '#eab308', id: 'q63' },
                { q: 'What is SSR vs CSR?', diff: 'medium', color: '#eab308', id: 'q70' },
                { q: 'Build a debounce function', diff: 'medium', color: '#eab308', id: 'q262' },
              ].map((item, i) => {
                const found = ALL_QUESTIONS.find(q => q.id === item.id);
                if (!found) return null;
                const cat = INTERVIEW_CATEGORIES.find(c => c.questions.find(x => x.id === item.id));
                return (
                  <div key={i} className={styles.hotItem} onClick={() => { setSelectedQ({ ...found, categoryId: cat?.id, color: cat?.color || '#4facfe' }); setView('question'); }}>
                    <span className={styles.hotNum}>#{i + 1}</span>
                    <span className={styles.hotQ}>{item.q}</span>
                    <span className={styles.hotDiff} style={{ color: item.color }}>{item.diff}</span>
                    {answeredIds[item.id] && <span className={styles.qDone}>✓</span>}
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// ── Question Detail ─────────────────────────────────────────────────
const QuestionDetail = ({ q, onBack, answeredIds, setAnsweredIds }) => {
  const answer = ANSWERS[q.id];
  const [showAnswer, setShowAnswer] = useState(false);
  const [aiAnswer, setAiAnswer] = useState('');
  const [loadingAI, setLoadingAI] = useState(false);
  const [selfRating, setSelfRating] = useState(null);
  const [tab, setTab] = useState('answer'); // answer | code | ai | tips

  const markReviewed = () => setAnsweredIds(prev => ({ ...prev, [q.id]: true }));

  const fetchAI = async () => {
    setLoadingAI(true);
    setTab('ai');
    try {
      const { data } = await api.post('/ai/chat', {
        messages: [{ role: 'user', content: `You are a senior frontend engineer interviewer. Answer this interview question concisely and accurately, as a top candidate would: "${q.q}". Include: 1-2 sentence summary, key points, and a code example if relevant. Max 200 words.` }],
        max_tokens: 600,
      });
      setAiAnswer(data.content[0].text);
    } catch (e) {
      setAiAnswer('Error: ' + e.message);
    } finally {
      setLoadingAI(false);
    }
  };

  const diffColor = q.difficulty === 'easy' ? '#00ff88' : q.difficulty === 'medium' ? '#eab308' : '#ef4444';

  return (
    <div className={styles.page}>
      <div className={styles.topbar}>
        <button className={styles.backBtn} onClick={onBack}>← Back</button>
        <div style={{ flex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
            <span className={styles.qDetailDiff} style={{ background: diffColor + '20', color: diffColor, border: `1px solid ${diffColor}40` }}>{q.difficulty}</span>
            {q.tags?.map(t => <span key={t} className={styles.qTag}>#{t}</span>)}
            {answeredIds[q.id] && <span style={{ color: '#00ff88', fontSize: 12 }}>✓ Reviewed</span>}
          </div>
        </div>
      </div>

      <div className={styles.content} style={{ maxWidth: 860 }}>
        {/* Question */}
        <div className={styles.qDetailCard}>
          <div className={styles.qDetailLabel}>❓ QUESTION</div>
          <div className={styles.qDetailText}>{q.q}</div>
          {!showAnswer && (
            <div className={styles.thinkFirst}>
              <div className={styles.thinkTitle}>💭 Think about it first...</div>
              <div className={styles.thinkHints}>
                {['What is the core concept?', 'Can you give an example?', 'What are the edge cases?'].map((h, i) => (
                  <div key={i} className={styles.thinkHint}>→ {h}</div>
                ))}
              </div>
              <button className={styles.btnPrimary} style={{ marginTop: 16 }} onClick={() => { setShowAnswer(true); markReviewed(); }}>
                Reveal Answer →
              </button>
            </div>
          )}
        </div>

        {showAnswer && (
          <>
            {/* Tabs */}
            <div className={styles.tabBar}>
              {[
                { key: 'answer', label: '📖 Answer' },
                answer?.code ? { key: 'code', label: '💻 Code' } : null,
                { key: 'ai', label: '🤖 AI Explain' },
                { key: 'tips', label: '🎯 Tips' },
              ].filter(Boolean).map(t => (
                <button key={t.key} className={`${styles.tab} ${tab === t.key ? styles.tabActive : ''}`} onClick={() => { setTab(t.key); if (t.key === 'ai' && !aiAnswer) fetchAI(); }}>{t.label}</button>
              ))}
            </div>

            {tab === 'answer' && (
              <div className={styles.answerCard}>
                <div className={styles.answerShort}>{answer?.short || 'Answer coming soon.'}</div>
                {answer?.full && (
                  <div className={styles.answerFull}>
                    <div className={styles.answerFullLabel}>DETAILED EXPLANATION</div>
                    <pre className={styles.answerPre}>{answer.full}</pre>
                  </div>
                )}
              </div>
            )}

            {tab === 'code' && answer?.code && (
              <div className={styles.answerCard}>
                <div className={styles.codeLabel}>CODE JS</div>
                <div className={styles.codeBlock}>
                  <pre style={{ margin: 0, color: '#e2e8f0', whiteSpace: 'pre-wrap' }}>{answer.code}</pre>
                </div>
              </div>
            )}

            {tab === 'ai' && (
              <div className={styles.answerCard}>
                {loadingAI ? (
                  <div className={styles.aiLoading}>
                    <div className={styles.aiDots}><span /><span /><span /></div>
                    <div>Getting AI explanation...</div>
                  </div>
                ) : aiAnswer ? (
                  <pre className={styles.answerPre}>{aiAnswer}</pre>
                ) : (
                  <button className={styles.btnPrimary} onClick={fetchAI}>🤖 Generate AI Explanation</button>
                )}
              </div>
            )}

            {tab === 'tips' && (
              <div className={styles.answerCard}>
                <div className={styles.tipCard}>
                  <div className={styles.tipLabel}>🎯 HOW TO ANSWER IN INTERVIEW</div>
                  <div className={styles.tipText}>{answer?.tip || 'Structure your answer: define the concept, explain why it matters, give a concrete code example, mention edge cases or trade-offs.'}</div>
                </div>
                <div className={styles.selfRate}>
                  <div className={styles.selfRateLabel}>How well could you answer this?</div>
                  <div className={styles.selfRateBtns}>
                    {[
                      { v: 'no', label: "😰 Couldn't answer", color: '#ef4444' },
                      { v: 'partial', label: '🤔 Partially', color: '#eab308' },
                      { v: 'yes', label: '💪 Nailed it', color: '#00ff88' },
                    ].map(r => (
                      <button key={r.v} className={styles.rateBtn}
                        style={{ borderColor: selfRating === r.v ? r.color : '#2a3f5f', color: selfRating === r.v ? r.color : '#9ca3af', background: selfRating === r.v ? r.color + '15' : 'transparent' }}
                        onClick={() => setSelfRating(r.v)}>{r.label}</button>
                    ))}
                  </div>
                  {selfRating === 'no' && <div className={styles.rateAdvice} style={{ color: '#ef4444' }}>Add this to your study list. Review the concept module.</div>}
                  {selfRating === 'partial' && <div className={styles.rateAdvice} style={{ color: '#eab308' }}>Good start — practice explaining it out loud. Clarity matters.</div>}
                  {selfRating === 'yes' && <div className={styles.rateAdvice} style={{ color: '#00ff88' }}>✓ Great! Move to the next question.</div>}
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

// ── Quiz Mode ───────────────────────────────────────────────────────
const QuizMode = ({ pool, idx, setIdx, onBack, recordQuiz, answeredIds, setAnsweredIds }) => {
  const [shown, setShown] = useState(false);
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);
  const [ratings, setRatings] = useState({});

  const q = pool[idx];
  const answer = ANSWERS[q?.id];

  const rate = (v) => {
    setRatings(r => ({ ...r, [q.id]: v }));
    setAnsweredIds(prev => ({ ...prev, [q.id]: true }));
    const correct = v === 'yes';
    if (correct) setScore(s => s + 1);
    recordQuiz?.(q.id, 'interview', correct);
    setTimeout(() => {
      if (idx < pool.length - 1) { setIdx(idx + 1); setShown(false); }
      else setDone(true);
    }, 600);
  };

  if (done) {
    return (
      <div className={styles.page}>
        <div className={styles.content} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '80vh' }}>
          <div className={styles.doneCard}>
            <div className={styles.doneEmoji}>{score >= 8 ? '🏆' : score >= 5 ? '💪' : '📚'}</div>
            <div className={styles.doneTitle}>{score >= 8 ? 'Outstanding!' : score >= 5 ? 'Good work!' : 'Keep studying!'}</div>
            <div className={styles.doneScore}>{score}/{pool.length}</div>
            <div className={styles.doneSub}>Questions answered correctly</div>
            <div style={{ display: 'flex', gap: 10, marginTop: 20 }}>
              <button className={styles.btnOutline} onClick={onBack}>← Back to Questions</button>
              <button className={styles.btnPrimary} onClick={() => { setIdx(0); setShown(false); setScore(0); setDone(false); setRatings({}); }}>🔄 Retry</button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <div className={styles.topbar}>
        <button className={styles.backBtn} onClick={onBack}>← Exit Quiz</button>
        <div className={styles.quizProgress}>
          <div className={styles.quizProgressBar}>
            <div style={{ width: `${((idx) / pool.length) * 100}%`, height: '100%', background: 'linear-gradient(90deg,#00ff88,#4facfe)', borderRadius: 4, transition: 'width 0.4s' }} />
          </div>
          <span style={{ fontSize: 12, color: '#9ca3af' }}>{idx + 1}/{pool.length}</span>
        </div>
      </div>

      <div className={styles.content} style={{ maxWidth: 700, margin: '0 auto' }}>
        <div className={styles.quizCard}>
          <div className={styles.quizQ}>{q?.q}</div>
          {!shown ? (
            <div className={styles.quizThink}>
              <div style={{ color: '#9ca3af', fontSize: 13, marginBottom: 16, lineHeight: 1.6 }}>Think through your answer. Consider: definition, example, why it matters.</div>
              <button className={styles.btnPrimary} onClick={() => setShown(true)}>Show Answer →</button>
            </div>
          ) : (
            <>
              <div className={styles.quizAnswer}>
                <div className={styles.answerShort}>{answer?.short || 'See concept module for detailed explanation.'}</div>
                {answer?.code && (
                  <div className={styles.codeBlock} style={{ marginTop: 12 }}>
                    <pre style={{ margin: 0, color: '#e2e8f0', whiteSpace: 'pre-wrap', fontSize: 11 }}>{answer.code}</pre>
                  </div>
                )}
              </div>
              {!ratings[q.id] && (
                <div className={styles.rateZone}>
                  <div className={styles.selfRateLabel}>How well did you know this?</div>
                  <div className={styles.selfRateBtns}>
                    {[
                      { v: 'no', label: "😰 Didn't know", color: '#ef4444' },
                      { v: 'partial', label: '🤔 Partially', color: '#eab308' },
                      { v: 'yes', label: '💪 Got it!', color: '#00ff88' },
                    ].map(r => (
                      <button key={r.v} className={styles.rateBtn}
                        style={{ borderColor: r.color + '60', color: r.color, flex: 1 }}
                        onClick={() => rate(r.v)}>{r.label}</button>
                    ))}
                  </div>
                </div>
              )}
              {ratings[q.id] && (
                <div style={{ color: '#00ff88', fontSize: 13, marginTop: 12, textAlign: 'center' }}>✓ Moving to next question...</div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default InterviewPrepPage;