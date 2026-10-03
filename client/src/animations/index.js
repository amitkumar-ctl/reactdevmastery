// Concept-id → animated scene(s).
// Each scenes/* module default-exports { [conceptId]: scene | scene[] }.
import browser from './scenes/browser';
import js from './scenes/js';
import asyncScenes from './scenes/async';
import proto from './scenes/proto';
import react from './scenes/react';
import nextjs from './scenes/nextjs';
import network from './scenes/network';
import state from './scenes/state';
import tooling from './scenes/tooling';
import css from './scenes/css';
import patterns from './scenes/patterns';
import machine from './scenes/machine';
import ts from './scenes/ts';

export const ANIMATIONS = {
  ...browser,
  ...js,
  ...asyncScenes,
  ...proto,
  ...react,
  ...nextjs,
  ...network,
  ...state,
  ...tooling,
  ...css,
  ...patterns,
  ...machine,
  ...ts,
};

import { ANIMATION_ALIASES } from './aliases';

export { ANIMATION_ALIASES, VISUALIZER_ALIASES } from './aliases';

export function getAnimation(conceptId) {
  const sc = ANIMATIONS[conceptId] || ANIMATIONS[ANIMATION_ALIASES[conceptId]];
  if (!sc) return null;
  return Array.isArray(sc) ? sc : [sc];
}
