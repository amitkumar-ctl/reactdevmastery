import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { CONCEPTS, FAQS } from 'reactdevmastery-content/data';
import styles from './Search.module.css';

// ── Build search index once at module load (not on every render) ────────
const buildIndex = () => {
  const index = [];
  Object.entries(CONCEPTS).forEach(([topicId, topic]) => {
    index.push({
      type: 'topic',
      title: topic.title,
      desc: `${topic.items.length} concepts`,
      route: `/${topicId}`,
      color: topic.color,
    });
    topic.items.forEach(item => {
      index.push({
        type: 'concept',
        title: item.title,
        desc: item.desc,
        route: `/${topicId}/${item.id}`,
        topicTitle: topic.title,
        color: topic.color,
        diff: item.diff,
      });
      const faqs = FAQS[item.id] || [];
      faqs.forEach(faq => {
        index.push({
          type: 'faq',
          title: faq.q,
          desc: faq.a.slice(0, 120) + '...',
          route: `/${topicId}/${item.id}`,
          topicTitle: topic.title,
          conceptTitle: item.title,
        });
      });
    });
  });
  return index;
};

const SEARCH_INDEX = buildIndex();

// ── Search function ───────────────────────────────────────────────────
const MAX_PER_TYPE = 4;

const search = (query) => {
  if (!query || query.length < 2) return { topics: [], concepts: [], faqs: [] };
  const q = query.toLowerCase().trim();

  const topics   = [];
  const concepts = [];
  const faqs     = [];

  for (const item of SEARCH_INDEX) {
    if (item.type === 'topic' && topics.length < MAX_PER_TYPE) {
      if (item.title.toLowerCase().includes(q)) topics.push(item);
    } else if (item.type === 'concept' && concepts.length < MAX_PER_TYPE) {
      if (
        item.title.toLowerCase().includes(q) ||
        item.desc?.toLowerCase().includes(q)
      ) concepts.push(item);
    } else if (item.type === 'faq' && faqs.length < MAX_PER_TYPE) {
      if (
        item.title.toLowerCase().includes(q) ||
        item.desc?.toLowerCase().includes(q)
      ) faqs.push(item);
    }
    if (topics.length >= MAX_PER_TYPE && concepts.length >= MAX_PER_TYPE && faqs.length >= MAX_PER_TYPE) break;
  }

  return { topics, concepts, faqs };
};

// ── Highlight matching text ───────────────────────────────────────────
const Highlight = ({ text, query }) => {
  if (!query || !text) return <span>{text}</span>;
  const idx = text.toLowerCase().indexOf(query.toLowerCase());
  if (idx === -1) return <span>{text}</span>;
  return (
    <span>
      {text.slice(0, idx)}
      <mark className={styles.highlight}>{text.slice(idx, idx + query.length)}</mark>
      {text.slice(idx + query.length)}
    </span>
  );
};

// ── Main Search component ─────────────────────────────────────────────
const Search = ({ onClose }) => {
  const [query, setQuery] = useState('');
  const [activeIdx, setActiveIdx] = useState(0);
  const inputRef = useRef(null);
  const navigate = useNavigate();

  const results = useMemo(() => search(query), [query]);
  const flatResults = [...results.topics, ...results.concepts, ...results.faqs];
  const hasResults = flatResults.length > 0;
  const showEmpty = query.length >= 2 && !hasResults;

  // Focus input on open
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  // Reset active when results change
  useEffect(() => {
    setActiveIdx(0);
  }, [query]);

  const handleSelect = useCallback((item) => {
    navigate(item.route);
    onClose();
  }, [navigate, onClose]);

  const handleKeyDown = (e) => {
    if (e.key === 'Escape') { onClose(); return; }
    if (!hasResults) return;

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActiveIdx(i => Math.min(i + 1, flatResults.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActiveIdx(i => Math.max(i - 1, 0));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (flatResults[activeIdx]) handleSelect(flatResults[activeIdx]);
    }
  };

  const diffColor = (diff) =>
    diff === 'hard' ? '#ef4444' : diff === 'medium' ? '#f97316' : '#00ff88';

  const ResultItem = ({ item, idx }) => {
    const isActive = idx === activeIdx;
    return (
      <button
        className={`${styles.result} ${isActive ? styles.resultActive : ''}`}
        onClick={() => handleSelect(item)}
        onMouseEnter={() => setActiveIdx(idx)}
      >
        {item.type === 'topic' && (
          <>
            <span className={styles.resultIcon} style={{ color: item.color }}>◆</span>
            <div className={styles.resultBody}>
              <div className={styles.resultTitle}>
                <Highlight text={item.title} query={query} />
              </div>
              <div className={styles.resultMeta}>{item.desc}</div>
            </div>
            <span className={styles.resultType}>Topic</span>
          </>
        )}
        {item.type === 'concept' && (
          <>
            <span className={styles.resultIcon} style={{ color: item.color }}>○</span>
            <div className={styles.resultBody}>
              <div className={styles.resultTitle}>
                <Highlight text={item.title} query={query} />
              </div>
              <div className={styles.resultMeta}>
                <Highlight text={item.desc} query={query} />
              </div>
            </div>
            <div className={styles.resultRight}>
              <span className={styles.resultDiff} style={{ color: diffColor(item.diff) }}>
                {item.diff}
              </span>
              <span className={styles.resultType}>{item.topicTitle}</span>
            </div>
          </>
        )}
        {item.type === 'faq' && (
          <>
            <span className={styles.resultIcon} style={{ color: '#9ca3af' }}>?</span>
            <div className={styles.resultBody}>
              <div className={styles.resultTitle}>
                <Highlight text={item.title} query={query} />
              </div>
              <div className={styles.resultMeta}>{item.conceptTitle}</div>
            </div>
            <span className={styles.resultType}>FAQ</span>
          </>
        )}
      </button>
    );
  };

  let flatIdx = 0;

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={e => e.stopPropagation()}>

        {/* Input */}
        <div className={styles.inputWrap}>
          <span className={styles.inputIcon}>🔍</span>
          <input
            ref={inputRef}
            className={styles.input}
            placeholder="Search topics, concepts, interview questions..."
            value={query}
            onChange={e => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            autoComplete="off"
            spellCheck={false}
          />
          {query && (
            <button className={styles.clearBtn} onClick={() => { setQuery(''); inputRef.current?.focus(); }}>✕</button>
          )}
          <button className={styles.escBtn} onClick={onClose}>ESC</button>
        </div>

        {/* Results */}
        <div className={styles.results}>
          {!query && (
            <div className={styles.empty}>
              <div className={styles.emptyIcon}>⌘</div>
              <div className={styles.emptyText}>
                Search across 226 concepts, 902 interview Q&As, and 34 topics
              </div>
              <div className={styles.suggestions}>
                {['Event Loop', 'useEffect', 'closure', 'CSRF', 'memoization', 'Fiber'].map(s => (
                  <button key={s} className={styles.suggestion} onClick={() => setQuery(s)}>
                    {s}
                  </button>
                ))}
              </div>
            </div>
          )}

          {showEmpty && (
            <div className={styles.empty}>
              <div className={styles.emptyIcon}>∅</div>
              <div className={styles.emptyText}>No results for "{query}"</div>
            </div>
          )}

          {hasResults && (
            <>
              {results.topics.length > 0 && (
                <div className={styles.group}>
                  <div className={styles.groupLabel}>Topics</div>
                  {results.topics.map(item => <ResultItem key={item.route} item={item} idx={flatIdx++} />)}
                </div>
              )}
              {results.concepts.length > 0 && (
                <div className={styles.group}>
                  <div className={styles.groupLabel}>Concepts</div>
                  {results.concepts.map(item => <ResultItem key={item.route} item={item} idx={flatIdx++} />)}
                </div>
              )}
              {results.faqs.length > 0 && (
                <div className={styles.group}>
                  <div className={styles.groupLabel}>Interview Q&As</div>
                  {results.faqs.map(item => <ResultItem key={`${item.route}-${item.title}`} item={item} idx={flatIdx++} />)}
                </div>
              )}
            </>
          )}
        </div>

        {/* Footer */}
        <div className={styles.footer}>
          <span className={styles.footerHint}><kbd>↑↓</kbd> navigate</span>
          <span className={styles.footerHint}><kbd>↵</kbd> open</span>
          <span className={styles.footerHint}><kbd>ESC</kbd> close</span>
        </div>
      </div>
    </div>
  );
};

export default Search;