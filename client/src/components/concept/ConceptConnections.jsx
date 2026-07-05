import React from 'react';
import { useNavigate } from 'react-router-dom';
import { CONCEPTS } from 'reactdevmastery-content/data';
import { getConnections, resolveConcept } from '../../data/conceptConnections';
import styles from './ConceptConnections.module.css';

const diffColor = { hard: '#ef4444', medium: '#f97316', easy: '#00ff88' };

function ConceptChip({ conceptId, completedConcepts = [] }) {
  const navigate = useNavigate();
  const concept = resolveConcept(conceptId, CONCEPTS);
  if (!concept) return null;

  const done = completedConcepts.includes(conceptId);

  return (
    <button
      className={styles.chip}
      style={{ borderColor: done ? concept.color + '60' : '#1e2d40' }}
      onClick={() => navigate(`/${concept.topicId}/${conceptId}`)}
    >
      <span className={styles.chipDot} style={{ background: diffColor[concept.diff] ?? '#00ff88' }} />
      <span className={styles.chipTitle}>{concept.title}</span>
      {done && <span className={styles.chipDone}>✓</span>}
      <span className={styles.chipTopic} style={{ color: concept.color }}>{concept.topicTitle}</span>
    </button>
  );
}

export default function ConceptConnections({ conceptId, completedConcepts = [] }) {
  const conn = getConnections(conceptId, CONCEPTS);
  const hasAny = conn.prereqs.length > 0 || conn.unlocks.length > 0 || conn.related.length > 0;

  if (!hasAny) return null;

  return (
    <div className={styles.wrap}>
      <div className={styles.title}>🔗 Concept Map</div>

      {conn.prereqs.length > 0 && (
        <div className={styles.section}>
          <div className={styles.sectionHeader}>
            <span className={styles.arrow}>↑</span>
            <span className={styles.sectionTitle}>Prerequisites</span>
            <span className={styles.sectionSub}>Understand these first</span>
          </div>
          <div className={styles.chips}>
            {conn.prereqs.map(id => (
              <ConceptChip key={id} conceptId={id} completedConcepts={completedConcepts} />
            ))}
          </div>
        </div>
      )}

      {conn.unlocks.length > 0 && (
        <div className={styles.section}>
          <div className={styles.sectionHeader}>
            <span className={styles.arrow} style={{ color: '#00ff88' }}>↓</span>
            <span className={styles.sectionTitle}>This unlocks</span>
            <span className={styles.sectionSub}>What to learn next</span>
          </div>
          <div className={styles.chips}>
            {conn.unlocks.map(id => (
              <ConceptChip key={id} conceptId={id} completedConcepts={completedConcepts} />
            ))}
          </div>
        </div>
      )}

      {conn.related.length > 0 && (
        <div className={styles.section}>
          <div className={styles.sectionHeader}>
            <span className={styles.arrow} style={{ color: '#a855f7' }}>↔</span>
            <span className={styles.sectionTitle}>Related concepts</span>
            <span className={styles.sectionSub}>Often asked together</span>
          </div>
          <div className={styles.chips}>
            {conn.related.map(id => (
              <ConceptChip key={id} conceptId={id} completedConcepts={completedConcepts} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}