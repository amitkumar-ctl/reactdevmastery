// Scene builders for recurring motifs. Each returns a plain scene object
// consumed by <Scene />. Canvas width is always 640.

export const C = {
  blue: '#4facfe',
  green: '#00ff88',
  orange: '#f97316',
  purple: '#a855f7',
  yellow: '#eab308',
  red: '#ef4444',
  cyan: '#06b6d4',
  pink: '#ec4899',
  gray: '#64748b',
  teal: '#14b8a6',
};

/**
 * pipeline — a token travels through ordered stages.
 * stages: [{ id, label, color, say, out }]  (`out` relabels the token on arrival)
 */
export function pipeline({ title, accent, stages, token = {}, intro, outro, h, perRow, code, lines }) {
  const n = stages.length;
  const cols = perRow || (n <= 5 ? n : Math.ceil(n / 2));
  const rows = Math.ceil(n / cols);
  const gap = 18;
  const zw = Math.floor((640 - 30 - gap * (cols - 1)) / cols);
  const zh = 92;
  const height = h || 40 + rows * (zh + 40) + 10;
  const zones = {};
  stages.forEach((st, i) => {
    const r = Math.floor(i / cols);
    let c = i % cols;
    if (r % 2 === 1) c = cols - 1 - c; // snake layout
    zones[st.id] = {
      x: 15 + c * (zw + gap), y: 40 + r * (zh + 40), w: zw, h: zh,
      label: st.label, color: st.color || accent || C.blue, layout: 'center', text: st.text,
    };
  });
  const tok = { label: token.label || 'input', color: token.color || C.yellow, w: Math.min(zw - 16, token.w || 150), h: token.h || 30, shape: token.shape || 'pill' };
  const steps = [];
  if (intro) steps.push({ say: intro, set: { tok: { x: 15 + zw / 2, y: 20, ...tok, visible: true } }, line: lines?.[0] });
  stages.forEach((st, i) => {
    const step = {
      say: st.say,
      tone: st.color || accent,
      set: { tok: { in: st.id, label: st.out || tok.label, color: st.tokColor || tok.color, glow: true } },
      zones: { [st.id]: { hi: true, ...(st.zone || {}) } },
      arrows: i > 0 ? [[stages[i - 1].id, st.id]] : [],
      line: st.line,
    };
    if (i === 0 && !intro) step.set.tok = { ...tok, in: st.id, label: st.out || tok.label, glow: true };
    steps.push(step);
  });
  if (outro) steps.push({ say: outro, tone: C.green, set: { tok: { glow: true } }, zones: Object.fromEntries(stages.map((st) => [st.id, { hi: true }])) });
  return { title, accent, h: height, zones, actors: { tok }, steps, code };
}

/**
 * sequence — messages fly between vertical lanes (a sequence diagram).
 * lanes: [{ id, label, color }]
 * msgs:  [{ from, to, label, color, say, zones, set, w }]
 *        a msg with no `from` is a pure narration/state step.
 */
export function sequence({ title, accent, lanes, msgs, intro, h, code, chipW }) {
  const n = lanes.length;
  const gap = 14;
  const lw = Math.floor((640 - 24 - gap * (n - 1)) / n);
  const counts = {};
  msgs.forEach((m) => { if (m.to) counts[m.to] = (counts[m.to] || 0) + 1; });
  const maxPer = Math.max(3, ...Object.values(counts));
  const height = h || Math.min(460, 70 + maxPer * 34 + 16);
  const zones = {};
  lanes.forEach((l, i) => {
    zones[l.id] = { x: 12 + i * (lw + gap), y: 12, w: lw, h: height - 24, label: l.label, color: l.color || C.blue, layout: 'col', text: l.text };
  });
  const actors = {};
  const steps = [];
  if (intro) steps.push({ say: intro });
  msgs.forEach((m, i) => {
    const id = `m${i}`;
    const step = { say: m.say, tone: m.color || accent, zones: { ...(m.zones || {}) }, set: { ...(m.set || {}) }, line: m.line };
    // dim older messages
    Object.keys(actors).forEach((aid) => { if (!step.set[aid]) step.set[aid] = { dim: true }; });
    if (m.from && m.to) {
      actors[id] = { label: m.label, color: m.color || C.blue, w: m.w || chipW || Math.min(lw - 14, 150), h: m.h || 28, shape: m.shape || 'chip' };
      step.set[id] = { in: m.to, from: m.from, glow: true, dim: false };
      step.arrows = [[m.from, m.to, { color: m.color || C.blue }]];
      step.zones[m.to] = { hi: true, ...(step.zones[m.to] || {}) };
    }
    steps.push(step);
  });
  return { title, accent, h: height, zones, actors, steps, code };
}

/** lane helper: evenly spaced horizontal rows (for timelines) */
export function rows(labels, { top = 40, h = 46, gap = 12, x = 12, w = 616, color } = {}) {
  const zones = {};
  labels.forEach((l, i) => {
    const [id, label, c] = Array.isArray(l) ? l : [l, l];
    zones[id] = { x, y: top + i * (h + gap), w, h, label, color: c || color || C.blue };
  });
  return zones;
}

/** column helper: evenly spaced vertical boxes */
export function cols(defs, { top = 40, h = 200, gap = 14, x = 12, w = 616, layout = 'col' } = {}) {
  const n = defs.length;
  const cw = Math.floor((w - gap * (n - 1)) / n);
  const zones = {};
  defs.forEach((d, i) => {
    const [id, label, color, extra] = d;
    zones[id] = { x: x + i * (cw + gap), y: top, w: cw, h, label, color: color || C.blue, layout, ...(extra || {}) };
  });
  return zones;
}

/** tree — nodes become small centred zones; edges are drawn statically.
 *  nodes: { id: [cx, cy, label, color, w] } */
export function tree(nodes, { w = 112, h = 44 } = {}) {
  const zones = {};
  Object.entries(nodes).forEach(([id, [cx, cy, label, color, nw]]) => {
    const ww = nw || w;
    zones[id] = { x: cx - ww / 2, y: cy - h / 2, w: ww, h, color: color || '#4facfe', text: label, round: 9 };
  });
  return zones;
}
