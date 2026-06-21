import React, { useState, useRef, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useProgress } from '../context/ProgressContext';
import { CONCEPTS, QUIZZES, CONTENT, CHALLENGES, FAQS } from 'reactdevmastery-content/data';
import { LEARN_COMPONENTS, VISUALIZERS } from 'reactdevmastery-content/components';
import styles from './TopicPage.module.css';

// ── Topic list ─────────────────────────────────────────────────────────
export const TopicPage = () => {
  const { topicId } = useParams();
  const { completedConcepts, completedTopics } = useProgress();
  const navigate = useNavigate();
  const topic = CONCEPTS[topicId];

  if (!topic) return (
    <div className={styles.page}>
      <div className={styles.empty}>Module coming soon. Try JS Core, React, Security, or Performance.</div>
    </div>
  );

  return (
    <div className={styles.page}>
      <div className={styles.topbar}>
        <div>
          <div className={styles.topicTitle}>{topic.title}</div>
          <div className={styles.topicMeta}>
            <span className={styles.tag} style={{ color: '#4facfe', borderColor: '#0a2d5f', background: '#05152a' }}>{topic.items.length} concepts</span>
            <span className={styles.tag} style={{ color: '#00ff88', borderColor: '#0a4420', background: '#052210' }}>AI Explanations</span>
            {completedTopics.includes(topicId) && <span className={styles.tag} style={{ color: '#00ff88', borderColor: '#0a4420', background: '#052210' }}>✓ Complete</span>}
          </div>
        </div>
      </div>

      <div className={styles.content}>
        <div className={styles.cardsGrid}>
          {topic.items.map(item => {
            const done = completedConcepts.includes(item.id);
            return (
              <div key={item.id} className={styles.conceptCard}
                style={{ '--accent': topic.color }}
                onClick={() => navigate(`/${topicId}/${item.id}`)}>
                <div className={styles.cardTitle}>
                  {item.title}
                  {done && <span className={styles.doneBadge}>✓ done</span>}
                </div>
                <div className={styles.cardDesc}>{item.desc}</div>
                <div className={styles.cardFooter}>
                  <span className={styles[`diff${item.diff.charAt(0).toUpperCase() + item.diff.slice(1)}`]}>
                    ◉ {item.diff.toUpperCase()}
                  </span>
                  <span className={styles.cardArrow}>→</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

// ── Concept detail ─────────────────────────────────────────────────────
export const ConceptPage = () => {
  const { topicId, conceptId } = useParams();
  const navigate = useNavigate();
  const { completedConcepts, markConceptDone, recordQuiz } = useProgress();
  const [tab, setTab] = useState('learn');
  const topic = CONCEPTS[topicId];
  const item = topic?.items.find(i => i.id === conceptId);

  if (!topic || !item) return <div className={styles.page}><div className={styles.empty}>Concept not found.</div></div>;

  const done = completedConcepts.includes(item.id);
  const allIds = topic.items.map(i => i.id);

  const handleMarkDone = () => markConceptDone(item.id, topicId, allIds);

  return (
    <div className={styles.page}>
      <div className={styles.topbar}>
        <button className={styles.backBtn} onClick={() => navigate(`/${topicId}`)}>← {topic.title}</button>
        <div className={styles.conceptHeader}>
          <div className={styles.topicTitle}>{item.title}</div>
          <div className={styles.topicMeta}>
            <span className={styles.tag} style={{ color: item.diff === 'hard' ? '#ef4444' : item.diff === 'medium' ? '#f97316' : '#00ff88' }}>
              {item.diff.toUpperCase()}
            </span>
            {done
              ? <span className={styles.tag} style={{ color: '#00ff88' }}>✓ Completed</span>
              : <button className={styles.markDoneBtn} onClick={handleMarkDone}>Mark Complete ✓</button>
            }
          </div>
        </div>
      </div>

      <div className={styles.tabBar}>
        {['learn', 'quiz', 'faq'].map(t => (
          <button key={t} className={`${styles.tabBtn} ${tab === t ? styles.tabActive : ''}`} onClick={() => setTab(t)}>
            {t === 'learn' ? '📖 Learn' : t === 'quiz' ? '🎯 Quiz' : '💬 FAQ'}
          </button>
        ))}
      </div>

      <div className={styles.content}>
        {tab === 'learn' && <LearnTab item={item} topicId={topicId} />}
        {tab === 'quiz' && <QuizTab item={item} topicId={topicId} onAnswer={recordQuiz} onCorrect={() => markConceptDone(item.id, topicId, allIds)} />}
        {tab === 'faq' && <FAQTab item={item} />}
      </div>
    </div>
  );
};


const LearnTab = ({ item, topicId }) => {
  const VisComponent = VISUALIZERS[item.id];
  const LearnComponent = LEARN_COMPONENTS[item.id];
  const content = CONTENT[item.id];
  const faqs = FAQS[item.id];

  const docLinks = {
    'event-loop':        { label: 'MDN — Event Loop', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Event_loop' },
    'closure-def':       { label: 'MDN — Closures', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Closures' },
    'hoisting':          { label: 'MDN — Hoisting', url: 'https://developer.mozilla.org/en-US/docs/Glossary/Hoisting' },
    'this-keyword':      { label: 'MDN — this', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/this' },
    'promise-internals': { label: 'MDN — Promise', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise' },
    'async-await':       { label: 'MDN — async function', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function' },
    'scope-chain':       { label: 'MDN — Scope', url: 'https://developer.mozilla.org/en-US/docs/Glossary/Scope' },
    'fiber':             { label: 'React Docs — Reconciliation', url: 'https://react.dev/learn/preserving-and-resetting-state' },
    'useeffect-deep':    { label: 'React Docs — useEffect', url: 'https://react.dev/reference/react/useEffect' },
    'cwv':               { label: 'web.dev — Core Web Vitals', url: 'https://web.dev/vitals/' },
    'xss':               { label: 'MDN — XSS', url: 'https://developer.mozilla.org/en-US/docs/Glossary/Cross-site_scripting' },
    'memory':            { label: 'MDN — Memory Management', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Memory_management' },
  };

  const doc = docLinks[item.id];

  return (
    <div className={styles.lessonWrap}>

      {VisComponent && <VisComponent />}

      {LearnComponent
        ? <LearnComponent />
        : content
          ? (
            <>
              <div className={styles.panel}>
                <div className={styles.sectionTitle}>Explanation</div>
                <pre className={styles.explainBox}>{content.explanation}</pre>
              </div>
              {content.code && (
                <div className={styles.panel}>
                  <div className={styles.sectionTitle}>Code Example</div>
                  <div className={styles.codeBlock}>
                    <span className={styles.codeLang}>JS</span>
                    <pre style={{ color: '#e2e8f0', whiteSpace: 'pre-wrap', margin: 0 }}>{content.code}</pre>
                  </div>
                </div>
              )}
              <div className={styles.panel}>
                <div className={styles.sectionTitle}>Interview Tips 🎯</div>
                <pre className={styles.explainBox}>{content.tips}</pre>
              </div>
            </>
          )
          : null
      }

      {(faqs || doc) && (
        <div className={styles.panel} style={{ borderColor: '#1e3a5f', background: '#060d1a' }}>
          <div className={styles.sectionTitle} style={{ color: '#4facfe' }}>🤔 Still Confused?</div>
          <p style={{ fontSize: 12, color: '#6b7280', margin: '0 0 12px' }}>
            Check the FAQ tab for common questions, or read the official docs below.
          </p>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            {doc && (
              <a href={doc.url} target="_blank" rel="noopener noreferrer"
                style={{ fontSize: 12, color: '#4facfe', padding: '6px 12px', border: '1px solid #1e3a5f', borderRadius: 6, textDecoration: 'none' }}>
                📖 {doc.label} ↗
              </a>
            )}
            <a href="https://javascript.info" target="_blank" rel="noopener noreferrer"
              style={{ fontSize: 12, color: '#9ca3af', padding: '6px 12px', border: '1px solid #1e2d40', borderRadius: 6, textDecoration: 'none' }}>
              📚 javascript.info ↗
            </a>
          </div>
        </div>
      )}

    </div>
  );
};

// ── FAQ Tab ────────────────────────────────────────────────────────────
const FAQTab = ({ item }) => {
  const faqs = FAQS[item.id];
  const [openIdx, setOpenIdx] = useState(null);

  if (!faqs || faqs.length === 0) return (
    <div className={styles.lessonWrap}>
      <div className={styles.panel}>
        <div className={styles.sectionTitle}>💬 Common Questions</div>
        <p style={{ fontSize: 13, color: '#6b7280', margin: 0 }}>
          No FAQs yet for this concept — check back soon.
        </p>
        <div style={{ marginTop: 12, display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          <a href="https://developer.mozilla.org" target="_blank" rel="noopener noreferrer"
            style={{ fontSize: 12, color: '#4facfe', padding: '6px 12px', border: '1px solid #1e3a5f', borderRadius: 6, textDecoration: 'none' }}>
            📖 MDN Web Docs ↗
          </a>
          <a href="https://javascript.info" target="_blank" rel="noopener noreferrer"
            style={{ fontSize: 12, color: '#9ca3af', padding: '6px 12px', border: '1px solid #1e2d40', borderRadius: 6, textDecoration: 'none' }}>
            📚 javascript.info ↗
          </a>
        </div>
      </div>
    </div>
  );

  return (
    <div className={styles.lessonWrap}>
      <div className={styles.panel}>
        <div className={styles.sectionTitle}>💬 Common Questions — {item.title}</div>
        <p style={{ fontSize: 12, color: '#6b7280', margin: '0 0 14px' }}>
          {faqs.length} questions developers commonly ask about this concept.
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {faqs.map((faq, i) => (
            <div key={i} style={{ border: `1px solid ${openIdx === i ? '#4facfe40' : '#1e2d40'}`, borderRadius: 8, overflow: 'hidden', transition: 'border-color 0.2s' }}>
              <button
                onClick={() => setOpenIdx(openIdx === i ? null : i)}
                style={{ width: '100%', background: openIdx === i ? '#05152a' : '#0d1829', border: 'none', padding: '12px 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer', gap: 12 }}>
                <span style={{ fontSize: 13, color: openIdx === i ? '#4facfe' : '#e2e8f0', textAlign: 'left', fontFamily: 'inherit', fontWeight: openIdx === i ? 600 : 400 }}>
                  {faq.q}
                </span>
                <span style={{ color: openIdx === i ? '#4facfe' : '#6b7280', fontSize: 16, flexShrink: 0, transition: 'transform 0.2s', transform: openIdx === i ? 'rotate(45deg)' : 'rotate(0deg)' }}>
                  +
                </span>
              </button>
              {openIdx === i && (
                <div style={{ padding: '12px 16px', background: '#060d1a', borderTop: '1px solid #1e2d40' }}>
                  <p style={{ fontSize: 13, color: '#9ca3af', lineHeight: 1.7, margin: 0 }}>{faq.a}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className={styles.panel} style={{ borderColor: '#1e2d40' }}>
        <div className={styles.sectionTitle} style={{ fontSize: 12 }}>📚 Official Resources</div>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          {[
            { label: 'MDN Web Docs', url: 'https://developer.mozilla.org' },
            { label: 'javascript.info', url: 'https://javascript.info' },
            { label: 'React Docs', url: 'https://react.dev' },
            { label: 'TypeScript Docs', url: 'https://www.typescriptlang.org/docs' },
            { label: 'web.dev', url: 'https://web.dev' },
          ].map((link, i) => (
            <a key={i} href={link.url} target="_blank" rel="noopener noreferrer"
              style={{ fontSize: 11, color: '#9ca3af', padding: '5px 10px', border: '1px solid #1e2d40', borderRadius: 6, textDecoration: 'none' }}>
              {link.label} ↗
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

// ── Quiz Tab ───────────────────────────────────────────────────────────
const QuizTab = ({ item, topicId, onAnswer, onCorrect }) => {
  const [quizzes, setQuizzes] = useState(QUIZZES[item.id] || []);
  const [idx, setIdx] = useState(0);
  const [answered, setAnswered] = useState(false);
  const [selected, setSelected] = useState(null);
  const [generatingAI, setGeneratingAI] = useState(false);
  // track which indices answered and what was selected
  const [answeredIndices, setAnsweredIndices] = useState(new Set());
  const [selectedAnswers, setSelectedAnswers] = useState({}); // idx -> optIdx

  const q = quizzes[idx];

  const handleAnswer = (optIdx) => {
    if (answered) return;
    setAnswered(true);
    setSelected(optIdx);
    const correct = optIdx === q.correct;
    onAnswer?.(item.id, topicId, correct);

    // Record answer for this question
    const newAnswered = new Set(answeredIndices);
    newAnswered.add(idx);
    setAnsweredIndices(newAnswered);
    setSelectedAnswers(prev => ({ ...prev, [idx]: optIdx }));

    // Mark concept complete when ALL questions have been answered
    if (newAnswered.size === quizzes.length) {
      onCorrect?.();
    }
  };

  // Navigate to a question and restore its answered state if already done
  const goTo = (newIdx) => {
    setIdx(newIdx);
    const wasDone = answeredIndices.has(newIdx);
    setAnswered(wasDone);
    setSelected(wasDone ? (selectedAnswers[newIdx] ?? null) : null);
  };

  const genAIQuiz = async () => {
    setGeneratingAI(true);
    try {
      const { data } = await api.post('/ai/chat', {
        messages: [{ role: 'user', content: `Generate a challenging multiple-choice quiz question about "${item.title}" for a senior frontend engineer interview. Return ONLY valid JSON (no markdown, no backticks):\n{"q":"question text","opts":["A","B","C","D"],"correct":0,"explain":"why correct"}` }],
      });
      const text = data.content[0].text.replace(/```json\n?/g,'').replace(/```\n?/g,'').trim();
      const newQ = JSON.parse(text);
      setQuizzes(prev => [...prev, newQ]);
      setIdx(quizzes.length);
      setAnswered(false);
      setSelected(null);
    } catch (e) {
      alert('Error generating quiz: ' + e.message);
    } finally {
      setGeneratingAI(false);
    }
  };

  if (!q) return (
    <div className={styles.panel}>
      <p className={styles.muted}>No quiz yet for this topic.</p>
      <button className={styles.btnPrimary} style={{ marginTop: 12 }} onClick={genAIQuiz} disabled={generatingAI}>
        {generatingAI ? '⏳ Generating...' : '🤖 Generate AI Quiz'}
      </button>
    </div>
  );

  return (
    <div className={styles.lessonWrap}>
      <div className={styles.panel}>
        <div className={styles.sectionTitle}>Question {idx + 1} of {quizzes.length}</div>
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
        {/* Prompt to answer if not yet answered */}
        {!answered && (
          <div style={{ marginTop: 12, fontSize: 12, color: '#4b5563', textAlign: 'center' }}>
            ↑ Select an answer to continue
          </div>
        )}

        {answered && (
          <div className={`${styles.quizFeedback} ${selected === q.correct ? styles.feedbackPass : styles.feedbackFail}`}>
            {selected === q.correct ? '✓ Correct!' : '✗ Not quite.'}<br /><br />{q.explain}
          </div>
        )}

        <div className={styles.quizNav}>
          {/* Prev always allowed so user can review earlier questions */}
          <button
            className={styles.btn}
            onClick={() => goTo(Math.max(0, idx - 1))}
            disabled={idx === 0}
          >
            ← Prev
          </button>

          {/* Next only enabled after current question is answered */}
          {idx < quizzes.length - 1 && (
            <button
              className={styles.btn}
              onClick={() => goTo(idx + 1)}
              disabled={!answered}
              title={!answered ? 'Answer this question first' : ''}
              style={{ opacity: !answered ? 0.4 : 1, cursor: !answered ? 'not-allowed' : 'pointer' }}
            >
              Next →
            </button>
          )}

          {/* Add AI question only on last question after answering */}
          {idx === quizzes.length - 1 && answered && (
            <button className={styles.btn} onClick={genAIQuiz} disabled={generatingAI} style={{ marginLeft: 'auto' }}>
              {generatingAI ? '⏳' : '+ AI Question'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

// ── Challenge Tab ──────────────────────────────────────────────────────

const ChallengeTab = ({ item }) => {
  const challenge = CHALLENGES[item.id];
  const [code, setCode] = useState(challenge?.starterCode || '// Write your solution here...');
  const [showSolution, setShowSolution] = useState(false);
  const [selfRating, setSelfRating] = useState(null);

  useEffect(() => {
    setCode(challenge?.starterCode || '// Write your solution here...');
    setShowSolution(false);
    setSelfRating(null);
  }, [item.id]);

  if (!challenge) {
    return (
      <div className={styles.lessonWrap}>
        <div className={styles.panel}>
          <div className={styles.sectionTitle}>⚡ Challenge</div>
          <p className={styles.muted}>
            No challenge yet for this concept. Use the <strong style={{ color: '#4facfe' }}>Ask AI</strong> tab to generate one!
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.lessonWrap}>
      {/* Challenge prompt */}
      <div className={styles.panel}>
        <div className={styles.sectionTitle}>⚡ Challenge</div>
        <pre className={styles.explainBox} style={{ whiteSpace: 'pre-wrap' }}>
          {challenge.prompt}
        </pre>
      </div>

      {/* Code editor */}
      <div className={styles.panel}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
          <div className={styles.sectionTitle} style={{ marginBottom: 0 }}>Your Solution</div>
          <button
            className={styles.btn}
            style={{ fontSize: 10 }}
            onClick={() => setCode(challenge.starterCode)}
          >
            ↺ Reset
          </button>
        </div>
        <div className={styles.challengeArea}>
          <textarea
            className={styles.challengeEditor}
            value={code}
            onChange={e => setCode(e.target.value)}
            spellCheck={false}
          />
        </div>
      </div>

      {/* Self-assessment */}
      <div className={styles.panel} style={{ borderColor: '#2a3f5f' }}>
        <div className={styles.sectionTitle}>How did you do?</div>
        <div style={{ display: 'flex', gap: 8, marginBottom: 12, flexWrap: 'wrap' }}>
          {[
            { v: 'stuck',   label: '😰 Got stuck',       color: '#ef4444' },
            { v: 'partial', label: '🤔 Partial solution', color: '#eab308' },
            { v: 'solved',  label: '💪 Solved it!',       color: '#00ff88' },
          ].map(r => (
            <button
              key={r.v}
              onClick={() => setSelfRating(r.v)}
              style={{
                padding: '8px 14px', borderRadius: 8, fontSize: 12,
                fontFamily: 'inherit', cursor: 'pointer',
                border: `1px solid ${selfRating === r.v ? r.color : r.color + '40'}`,
                background: selfRating === r.v ? r.color + '20' : 'transparent',
                color: selfRating === r.v ? r.color : r.color + 'aa',
                fontWeight: 600, transition: 'all 0.2s',
              }}
            >
              {r.label}
            </button>
          ))}
        </div>

        {selfRating === 'stuck' && (
          <div style={{ fontSize: 12, color: '#ef4444', lineHeight: 1.6, marginBottom: 12 }}>
            No worries — reveal the solution, study it, then try writing it again from scratch without looking.
          </div>
        )}
        {selfRating === 'partial' && (
          <div style={{ fontSize: 12, color: '#eab308', lineHeight: 1.6, marginBottom: 12 }}>
            Good progress! Compare your approach to the solution — focus on what you missed and why.
          </div>
        )}
        {selfRating === 'solved' && (
          <div style={{ fontSize: 12, color: '#00ff88', lineHeight: 1.6, marginBottom: 12 }}>
            ✓ Excellent! Check the solution anyway — there may be edge cases or cleaner patterns worth noting.
          </div>
        )}

        <button
          className={styles.btn}
          style={{
            borderColor: showSolution ? '#00ff88' : '#2a3f5f',
            color: showSolution ? '#00ff88' : '#9ca3af',
          }}
          onClick={() => setShowSolution(!showSolution)}
        >
          {showSolution ? '▲ Hide Solution' : '👁 Reveal Solution'}
        </button>
      </div>

      {/* Solution */}
      {showSolution && (
        <div className={styles.panel} style={{ borderColor: '#00ff8830' }}>
          <div className={styles.sectionTitle} style={{ color: '#00ff88' }}>✓ Solution</div>
          <div className={styles.codeBlock}>
            <span className={styles.codeLang}>JS</span>
            <pre style={{ margin: 0, color: '#e2e8f0', whiteSpace: 'pre-wrap' }}>
              {challenge.solution}
            </pre>
          </div>
        </div>
      )}
    </div>
  );
};


const Skeleton = () => (
  <div className={styles.skeleton}>
    <div className={styles.skeletonLine} style={{ width: '90%' }} />
    <div className={styles.skeletonLine} style={{ width: '75%' }} />
    <div className={styles.skeletonLine} style={{ width: '85%' }} />
    <div className={styles.skeletonLine} style={{ width: '60%' }} />
  </div>
);