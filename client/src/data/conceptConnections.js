
export const CONCEPT_CONNECTIONS = {

  // ── JS Core ──────────────────────────────────────────────────────
  'event-loop': {
    prereqs: [],
    unlocks: ['promise-internals', 'async-await', 'render-cycle'],
    related: ['memory', 'web-workers'],
  },
  'closure-def': {
    prereqs: ['scope-chain'],
    unlocks: ['module-pattern', 'custom-hooks', 'memo-patterns'],
    related: ['hoisting', 'this-keyword'],
  },
  'scope-chain': {
    prereqs: [],
    unlocks: ['closure-def', 'hoisting'],
    related: ['module-pattern'],
  },
  'hoisting': {
    prereqs: ['scope-chain'],
    unlocks: [],
    related: ['closure-def', 'this-keyword'],
  },
  'this-keyword': {
    prereqs: ['scope-chain', 'proto-class'],
    unlocks: ['hoc-pattern'],
    related: ['closure-def', 'proto-chain'],
  },
  'memory': {
    prereqs: ['event-loop'],
    unlocks: ['virtualization'],
    related: ['web-workers', 'memo-patterns'],
  },
  'coercion': {
    prereqs: [],
    unlocks: [],
    related: ['hoisting'],
  },

  // ── Async ─────────────────────────────────────────────────────────
  'promise-internals': {
    prereqs: ['event-loop'],
    unlocks: ['async-await', 'useeffect-deep', 'suspense-pattern'],
    related: ['rxjs-basics', 'web-workers'],
  },
  'async-await': {
    prereqs: ['promise-internals'],
    unlocks: ['useeffect-deep', 'custom-hooks'],
    related: ['rxjs-basics'],
  },

  // ── Prototypes ───────────────────────────────────────────────────
  'proto-chain': {
    prereqs: [],
    unlocks: ['proto-create', 'proto-class', 'proto-inherit'],
    related: ['proto-instanceof'],
  },
  'proto-class': {
    prereqs: ['proto-chain'],
    unlocks: ['this-keyword', 'hoc-pattern', 'error-boundaries'],
    related: ['proto-inherit'],
  },
  'proto-inherit': {
    prereqs: ['proto-chain', 'proto-class'],
    unlocks: ['hoc-pattern'],
    related: ['compound-components'],
  },

  // ── React Core ───────────────────────────────────────────────────
  'virtual-dom': {
    prereqs: [],
    unlocks: ['fiber', 'render-cycle'],
    related: ['hydration-issues'],
  },
  'fiber': {
    prereqs: ['virtual-dom', 'event-loop'],
    unlocks: ['render-cycle', 'concurrent-features', 'suspense-pattern'],
    related: ['state-batching', 'hydration-issues'],
  },
  'render-cycle': {
    prereqs: ['fiber', 'virtual-dom'],
    unlocks: ['rerender-causes', 'memo-patterns', 'context-perf'],
    related: ['state-batching', 'useeffect-deep'],
  },
  'context-perf': {
    prereqs: ['render-cycle'],
    unlocks: ['context-optimization'],
    related: ['state-management', 'memo-patterns'],
  },

  // ── Hooks ────────────────────────────────────────────────────────
  'useeffect-deep': {
    prereqs: ['render-cycle', 'closure-def', 'promise-internals'],
    unlocks: ['custom-hooks'],
    related: ['state-management', 'rerender-causes'],
  },
  'custom-hooks': {
    prereqs: ['useeffect-deep', 'closure-def'],
    unlocks: ['state-management'],
    related: ['compound-components', 'render-props'],
  },
  'state-management': {
    prereqs: ['render-cycle', 'useeffect-deep'],
    unlocks: ['context-optimization', 'rerender-causes'],
    related: ['context-perf', 'state-batching'],
  },

  // ── React Patterns ───────────────────────────────────────────────
  'hoc-pattern': {
    prereqs: ['closure-def', 'proto-class'],
    unlocks: ['render-props'],
    related: ['compound-components', 'custom-hooks'],
  },
  'render-props': {
    prereqs: ['hoc-pattern', 'closure-def'],
    unlocks: ['compound-components'],
    related: ['custom-hooks', 'hoc-pattern'],
  },
  'compound-components': {
    prereqs: ['render-props', 'context-perf'],
    unlocks: [],
    related: ['controlled-uncontrolled', 'forward-ref'],
  },
  'error-boundaries': {
    prereqs: ['proto-class', 'render-cycle'],
    unlocks: ['suspense-pattern'],
    related: ['fiber', 'hydration-issues'],
  },
  'suspense-pattern': {
    prereqs: ['fiber', 'promise-internals', 'error-boundaries'],
    unlocks: ['concurrent-features'],
    related: ['hydration-issues', 'virtualization'],
  },
  'forward-ref': {
    prereqs: ['render-cycle'],
    unlocks: [],
    related: ['compound-components', 'controlled-uncontrolled'],
  },
  'portals-pattern': {
    prereqs: ['render-cycle'],
    unlocks: [],
    related: ['error-boundaries'],
  },
  'controlled-uncontrolled': {
    prereqs: ['render-cycle'],
    unlocks: [],
    related: ['state-management', 'forward-ref'],
  },

  // ── React Performance ────────────────────────────────────────────
  'rerender-causes': {
    prereqs: ['render-cycle', 'state-management'],
    unlocks: ['memo-patterns', 'context-optimization'],
    related: ['state-batching', 'virtual-dom'],
  },
  'memo-patterns': {
    prereqs: ['rerender-causes', 'closure-def'],
    unlocks: ['context-optimization'],
    related: ['custom-hooks', 'virtualization'],
  },
  'context-optimization': {
    prereqs: ['memo-patterns', 'context-perf', 'rerender-causes'],
    unlocks: [],
    related: ['state-management', 'state-batching'],
  },
  'state-batching': {
    prereqs: ['render-cycle', 'event-loop'],
    unlocks: ['concurrent-features'],
    related: ['rerender-causes', 'fiber'],
  },
  'virtualization': {
    prereqs: ['rerender-causes', 'memory'],
    unlocks: [],
    related: ['memo-patterns', 'suspense-pattern'],
  },
  'concurrent-features': {
    prereqs: ['fiber', 'suspense-pattern', 'state-batching'],
    unlocks: [],
    related: ['hydration-issues', 'render-cycle'],
  },
  'hydration-issues': {
    prereqs: ['virtual-dom', 'fiber'],
    unlocks: [],
    related: ['concurrent-features', 'suspense-pattern'],
  },
};

/**
 * Get connections for a concept with full metadata
 */
export function getConnections(conceptId, CONCEPTS) {
  const conn = CONCEPT_CONNECTIONS[conceptId];
  if (!conn) {
    // Auto-generate same-topic related concepts
    const sameTopicRelated = [];
    Object.entries(CONCEPTS).forEach(([topicId, topic]) => {
      const found = topic.items.find(i => i.id === conceptId);
      if (found) {
        topic.items
          .filter(i => i.id !== conceptId)
          .slice(0, 3)
          .forEach(i => sameTopicRelated.push(i.id));
      }
    });
    return { prereqs: [], unlocks: [], related: sameTopicRelated };
  }
  return conn;
}

/**
 * Resolve a concept ID to its full metadata
 */
export function resolveConcept(conceptId, CONCEPTS) {
  for (const [topicId, topic] of Object.entries(CONCEPTS)) {
    const item = topic.items.find(i => i.id === conceptId);
    if (item) return { ...item, topicId, topicTitle: topic.title, color: topic.color };
  }
  return null;
}