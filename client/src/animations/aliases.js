// Kept separate from the scene registry so the concept page can read the
// aliases without pulling every scene into the main bundle.

// Interview / rapid-fire concepts that teach the same mechanism as a core
// concept reuse that concept's animation.
export const ANIMATION_ALIASES = {
  // JS
  'ji-prototype': 'proto-chain',
  'ji-currying': 'currying',
  'mc-debounce': 'ji-debounce',
  'rf-debounce-throttle': 'ji-debounce',
  // React
  'ri-rerenders': 'rerender-causes',
  'db-react-renders': 'rerender-causes',
  'ri-context': 'context-perf',
  'context-optimization': 'context-perf',
  'ri-batching': 'state-batching',
  'ri-custom-hooks': 'custom-hooks',
  'ri-concurrent': 'concurrent-features',
  'ri-patterns': 'compound-components',
  'rf-hydration': 'hydration-issues',
  'db-hydration': 'hydration-issues',
  'rf-memoization': 'memoization',
  'rf-virtualization': 'virtualization',
  'mc-virtual-list': 'virtualization',
  'mc-modal': 'portals-pattern',
  // Network / security
  'rf-cors': 'si-cors',
  'rf-csrf': 'csrf',
  'si-csrf': 'csrf',
  'pi-caching': 'caching',
  'sd-realtime': 'websockets',
  // State
  'rf-optimistic-ui': 'optimistic-updates',
  'sd-state-arch': 'state-management',
  // Tooling / perf
  'rf-tree-shaking': 'bundler-rollup',
  'pi-bundle': 'bundler-perf',
  'pi-images': 'nextjs-image',
  'db-network': 'devtools-network',
  'db-performance': 'devtools-performance',
  'sd-frontend-arch': 'micro-frontends',
  'sd-design-system': 'design-system',
  // CSS
  'css-dark-mode': 'css-variables',
};

// Concepts that have no visualizer in the content package but cover the
// same idea as one that does — reuse the existing visualizer.
export const VISUALIZER_ALIASES = {
  'ji-event-loop': 'event-loop',
  'rf-event-loop-1min': 'event-loop',
  'ji-closures': 'closure-def',
  'rf-closure': 'closure-def',
  'rf-hoisting': 'hoisting',
  'ji-var-let-const': 'hoisting',
  'ji-this': 'this-keyword',
  'ji-coercion': 'coercion',
  'ji-promises': 'promise-internals',
  'ri-fiber': 'fiber',
  'ri-reconciliation': 'virtual-dom',
  'rf-reconciliation': 'virtual-dom',
  'ri-useeffect': 'useeffect-deep',
  'pi-cwv': 'cwv',
  'rf-code-splitting': 'code-splitting',
  'rf-lazy-loading': 'code-splitting',
  'si-xss': 'xss',
  'rf-xss': 'xss',
  'si-jwt': 'auth-patterns',
  'sd-auth-design': 'auth-patterns',
  'pi-rendering': 'rendering-patterns',
  'rf-ssr': 'rendering-patterns',
  'rf-csr': 'rendering-patterns',
};
