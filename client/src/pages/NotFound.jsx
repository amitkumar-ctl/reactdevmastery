import React, { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { CONCEPTS, ARCHITECT_CASES } from 'reactdevmastery-content/data';
import s from './NotFound.module.css';

// Shown for any URL that doesn't match a real page: unknown routes, unknown
// topics (/abc), unknown concepts (/react-core/abc) and unknown case studies.
// Also tells crawlers not to index it (the static 404.html already returns a
// real 404 status for direct hits; this covers in-app navigation).
const POPULAR = ['js-core', 'react-core', 'async', 'hooks', 'react-performance', 'system-design'];

export default function NotFound({ kind = 'page' }) {
  const { pathname } = useLocation();

  useEffect(() => {
    document.title = 'Page not found | ReactDevMastery';
    const meta = document.createElement('meta');
    meta.name = 'robots';
    meta.content = 'noindex';
    document.head.appendChild(meta);
    // On leaving, drop every robots tag, including the static one 404.html
    // shipped with, so real pages reached by in-app navigation stay indexable.
    return () => document.querySelectorAll('meta[name="robots"]').forEach((m) => m.remove());
  }, [pathname]);

  const topics = POPULAR.filter((id) => CONCEPTS[id]);
  const fallbackTopics = topics.length >= 4 ? topics : Object.keys(CONCEPTS).slice(0, 6);

  return (
    <div className={s.page}>
      <div className={s.code}>404</div>
      <h1 className={s.title}>
        {kind === 'concept' ? 'Concept not found' : kind === 'case' ? 'Case study not found' : 'Page not found'}
      </h1>
      <p className={s.text}>
        <code className={s.path}>{pathname}</code> doesn&apos;t exist. It may have been moved or the link has a typo.
      </p>

      <div className={s.actions}>
        <Link to="/" className={s.primary}>Go to homepage</Link>
        {ARCHITECT_CASES.length > 0 && <Link to="/architect" className={s.secondary}>🏛 System design cases</Link>}
      </div>

      <div className={s.section}>Popular topics</div>
      <div className={s.grid}>
        {fallbackTopics.map((id) => (
          <Link key={id} to={`/${id}`} className={s.card}>
            <span className={s.cardTitle}>{CONCEPTS[id].title}</span>
            <span className={s.cardMeta}>{CONCEPTS[id].items.length} concepts</span>
          </Link>
        ))}
      </div>
      <p className={s.hint}>Tip: press <kbd>⌘K</kbd> / <kbd>Ctrl K</kbd> to search every concept.</p>
    </div>
  );
}
