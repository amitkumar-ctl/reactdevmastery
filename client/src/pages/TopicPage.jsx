import React, { useState, useRef, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useProgress } from '../context/ProgressContext';
import { CONCEPTS, QUIZZES, CONTENT, CHALLENGES } from 'reactdevmastery-content/data';
import { LEARN_COMPONENTS, VISUALIZERS } from 'reactdevmastery-content/components';
import api from '../utils/api';
import styles from './TopicPage.module.css';
// import {
//   EventLoopVisualizer, HoistingVisualizer, ClosureVisualizer,
//   ThisVisualizer, CoercionVisualizer, PromiseVisualizer,
//   AsyncAwaitVisualizer, FiberVisualizer, VirtualDOMVisualizer,
//   UseEffectVisualizer, CWVVisualizer, CodeSplittingVisualizer,
//   ReflowVisualizer, XSSVisualizer, AuthFlowVisualizer,
//   RenderingPatternsVisualizer, ScopeChainVisualizer,
//   NetworkVisualizer, MemoryVisualizer, DesignPatternsVisualizer,
// } from '../components/ui/ConceptVisualizer';

// const VISUALIZERS = {
//   'event-loop':          EventLoopVisualizer,
//   'hoisting':            HoistingVisualizer,
//   'closure-def':         ClosureVisualizer,
//   'this-keyword':        ThisVisualizer,
//   'coercion':            CoercionVisualizer,
//   'promise-internals':   PromiseVisualizer,
//   'async-await':         AsyncAwaitVisualizer,
//   'fiber':               FiberVisualizer,
//   'virtual-dom':         VirtualDOMVisualizer,
//   'useeffect-deep':      UseEffectVisualizer,
//   'cwv':                 CWVVisualizer,
//   'code-splitting':      CodeSplittingVisualizer,
//   'reflow-repaint':      ReflowVisualizer,
//   'xss':                 XSSVisualizer,
//   'auth-patterns':       AuthFlowVisualizer,
//   'rendering-patterns':  RenderingPatternsVisualizer,
//   'scope-chain':         ScopeChainVisualizer,
//   'http2-3':             NetworkVisualizer,
//   'memory':              MemoryVisualizer,
//   'patterns':            DesignPatternsVisualizer,
// };

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
        {['learn', 'quiz', 'chat'].map(t => (
          <button key={t} className={`${styles.tabBtn} ${tab === t ? styles.tabActive : ''}`} onClick={() => setTab(t)}>
            {t === 'learn' ? '📖 Learn' : t === 'quiz' ? '🎯 Quiz' : '💬 Ask AI'}
          </button>
        ))}
      </div>

      <div className={styles.content}>
        {tab === 'learn' && <LearnTab item={item} topicId={topicId} />}
        {tab === 'quiz' && <QuizTab item={item} topicId={topicId} onAnswer={recordQuiz} onCorrect={() => markConceptDone(item.id, topicId, allIds)} />}
        {/* {tab === 'challenge' && <ChallengeTab item={item} />} */}
        {tab === 'chat' && <ChatTab item={item} />}
      </div>
    </div>
  );
};


const LearnTab = ({ item, topicId }) => {
  const VisComponent = VISUALIZERS[item.id];
  const LearnComponent = LEARN_COMPONENTS[item.id];
  const content = CONTENT[item.id];
  const [showAI, setShowAI] = useState(false);
  const [aiContent, setAiContent] = useState(null);
  const [loadingAI, setLoadingAI] = useState(false);

  const fetchAI = async () => {
    setLoadingAI(true);
    setShowAI(true);
    try {
      const [r1, r2] = await Promise.all([
        api.post('/ai/chat', { messages: [{ role: 'user', content: `Explain "${item.title}" for a senior frontend engineer. Core concept, production relevance, misconceptions. Under 200 words, plain text.` }] }),
        api.post('/ai/chat', { messages: [{ role: 'user', content: `3 interview tips for "${item.title}":\nTIP 1:\nTRAP:\nBONUS:` }] }),
      ]);
      setAiContent({ explanation: r1.data.content[0].text, tips: r2.data.content[0].text });
    } catch (e) {
      alert('AI error: ' + e.message);
    } finally {
      setLoadingAI(false);
    }
  };

  return (
    <div className={styles.lessonWrap}>

      {/* Interactive animated visualizer */}
      {VisComponent && <VisComponent />}

      {/* Rich interactive learn component */}
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

      {/* Optional live AI section */}
      <div className={styles.panel} style={{ borderColor: '#2a3f5f' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div className={styles.sectionTitle} style={{ marginBottom: 0 }}>🤖 Ask AI for a Fresh Explanation</div>
          <button className={styles.btn} onClick={fetchAI} disabled={loadingAI}>
            {loadingAI ? '⏳ Loading...' : showAI ? '🔄 Regenerate' : 'Generate'}
          </button>
        </div>
        {showAI && aiContent && (
          <div style={{ marginTop: 14 }}>
            <pre className={styles.explainBox} style={{ marginBottom: 12 }}>{aiContent.explanation}</pre>
            <pre className={styles.explainBox}>{aiContent.tips}</pre>
          </div>
        )}
        {showAI && loadingAI && <div style={{ color: '#9ca3af', fontSize: 12, marginTop: 10 }}>Generating personalized explanation...</div>}
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
        <div style={{ display: 'flex', gap: 8, marginBottom: 12 }}>
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

// ── Chat Tab ───────────────────────────────────────────────────────────
const ChatTab = ({ item }) => {
  const [messages, setMessages] = useState([
    { role: 'ai', text: `Ask me anything about **${item.title}**. I can explain concepts, show examples, compare approaches, or quiz you.` }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const endRef = useRef(null);

  useEffect(() => { endRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [messages]);

  const send = async (msg) => {
    const text = msg || input.trim();
    if (!text || loading) return;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text }]);
    setLoading(true);
    try {
      const { data } = await api.post('/ai/chat', {
        messages: [{ role: 'user', content: `You are a senior frontend engineer tutor. Topic context: ${item.title}. Be concise (under 150 words unless code needed). Question: ${text}` }],
        max_tokens: 600,
      });
      setMessages(prev => [...prev, { role: 'ai', text: data.content[0].text }]);
    } catch (e) {
      setMessages(prev => [...prev, { role: 'ai', text: 'Error: ' + e.message }]);
    } finally {
      setLoading(false);
    }
  };

  const quickPrompts = [
    `Give me a real-world ${item.title} example`,
    `Most common interview mistake about ${item.title}?`,
    `Quiz me on ${item.title}`,
    `Compare to a related concept`,
  ];

  return (
    <div className={styles.lessonWrap}>
      <div className={styles.panel} style={{ display: 'flex', flexDirection: 'column', minHeight: 400 }}>
        <div className={styles.sectionTitle}>AI Tutor — {item.title}</div>
        <div className={styles.chatMsgs}>
          {messages.map((m, i) => (
            <div key={i} className={`${styles.chatMsg} ${m.role === 'user' ? styles.chatUser : styles.chatAI}`}>
              {m.text}
            </div>
          ))}
          {loading && <div className={styles.chatMsg + ' ' + styles.chatAI}>
            <span className={styles.typing}>●●●</span>
          </div>}
          <div ref={endRef} />
        </div>
        <div className={styles.quickPrompts}>
          {quickPrompts.map((p, i) => (
            <button key={i} className={styles.quickPromptBtn} onClick={() => send(p)}>{p}</button>
          ))}
        </div>
        <div className={styles.chatInputRow}>
          <input className={styles.chatInput} value={input} onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && !e.shiftKey && send()}
            placeholder="Ask anything..." disabled={loading} />
          <button className={styles.btnPrimary} onClick={() => send()} disabled={loading || !input.trim()}>Send</button>
        </div>
      </div>
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