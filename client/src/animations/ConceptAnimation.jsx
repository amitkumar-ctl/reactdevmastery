import React, { useEffect, useState } from 'react';
import Scene from './engine/Scene';

// The scene registry is ~60 KB gzipped, so it is code-split and only
// fetched when a concept page is opened.
let registryPromise = null;
const loadRegistry = () => {
  if (!registryPromise) registryPromise = import(/* webpackChunkName: "concept-animations" */ './index');
  return registryPromise;
};

// Renders every animated scene registered for a concept (or nothing).
export default function ConceptAnimation({ conceptId }) {
  const [scenes, setScenes] = useState(null);

  useEffect(() => {
    let alive = true;
    setScenes(null);
    loadRegistry()
      .then((mod) => { if (alive) setScenes(mod.getAnimation(conceptId)); })
      .catch(() => { registryPromise = null; });
    return () => { alive = false; };
  }, [conceptId]);

  if (!scenes) return null;
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16, marginBottom: 16 }}>
      {scenes.map((sc, i) => <Scene key={`${conceptId}-${i}`} scene={sc} />)}
    </div>
  );
}
