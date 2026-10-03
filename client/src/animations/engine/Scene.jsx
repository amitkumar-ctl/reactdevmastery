import React, { useEffect, useMemo, useRef, useState, useCallback } from 'react';
import s from './Scene.module.css';

/*
 * ─────────────────────────────────────────────────────────────────────
 *  Scene — a tiny declarative animation engine for concept explainers
 * ─────────────────────────────────────────────────────────────────────
 *  A scene is plain data:
 *
 *  {
 *    title: 'Event Loop',
 *    h: 300,                         // canvas height (virtual px, width is always 640)
 *    code: 'line 1\nline 2',         // optional code panel, steps can highlight lines
 *    zones:  { id: { x, y, w, h, label, color, layout, dashed, text, big } },
 *    actors: { id: { label, color, w, h, shape } },
 *    steps: [
 *      {
 *        say:    'One short sentence',          // caption
 *        tone:   '#00ff88',                     // caption colour (optional)
 *        line:   2 | [2,3],                     // highlighted code line(s), 1-based
 *        set:    { actorId: { in: 'zoneId' } | { x, y } | null },   // null = hide
 *        zones:  { zoneId: { hi: true, label, text, color, show } },
 *        arrows: [['fromId', 'toId', { label, color, dashed }]],
 *      },
 *    ],
 *  }
 *
 *  Actor and zone state carries forward from step to step, so each step
 *  only needs to describe what changed. Movement is pure CSS transitions,
 *  so the browser does the tweening on the compositor.
 * ─────────────────────────────────────────────────────────────────────
 */

export const W = 640;
const GAP = 6;
const DEFAULT_ACTOR = { w: 116, h: 28, shape: 'chip', color: '#4facfe' };

// ── state precomputation ───────────────────────────────────────────────
function buildFrames(scene) {
  const zoneDefs = scene.zones || {};
  const actorDefs = scene.actors || {};
  const frames = [];

  let zones = {};
  Object.entries(zoneDefs).forEach(([id, z]) => {
    zones[id] = { show: true, hi: false, ...z };
  });
  let actors = {};
  Object.entries(actorDefs).forEach(([id, a]) => {
    actors[id] = { ...DEFAULT_ACTOR, ...a, visible: false, order: 0 };
  });
  let tick = 0;

  scene.steps.forEach((step) => {
    // zones: carry forward, but `hi` resets every step unless re-specified
    const nz = {};
    Object.entries(zones).forEach(([id, z]) => { nz[id] = { ...z, hi: false }; });
    Object.entries(step.zones || {}).forEach(([id, patch]) => {
      nz[id] = { ...nz[id], ...patch };
    });
    zones = nz;

    // actors: carry forward; transient flags reset each step
    const na = {};
    Object.entries(actors).forEach(([id, a]) => {
      na[id] = { ...a, glow: false, from: undefined, shake: false };
    });
    Object.entries(step.set || {}).forEach(([id, patch]) => {
      const prev = na[id] || { ...DEFAULT_ACTOR, visible: false, order: 0 };
      if (patch === null) { na[id] = { ...prev, visible: false }; return; }
      const next = { ...prev, ...patch, visible: patch.visible !== undefined ? patch.visible : true };
      if (patch.in !== undefined && patch.in !== prev.in) { next.order = ++tick; delete next.x; delete next.y; }
      if (patch.in !== undefined && patch.x !== undefined) next.x = patch.x;
      if (patch.in !== undefined && patch.y !== undefined) next.y = patch.y;
      if ((patch.x !== undefined || patch.y !== undefined) && patch.in === undefined) next.in = undefined;
      if (!prev.visible && next.visible && patch.in === undefined && prev.in && patch.x === undefined) {
        next.order = ++tick;
      }
      na[id] = next;
    });
    actors = na;

    frames.push({ zones, actors: layout(zones, actors), step });
  });

  // second pass: give hidden actors a sensible resting position so that
  // they fade in/out in place (or fly in from `from`) instead of from 0,0.
  const ids = Object.keys(frames[frames.length - 1]?.actors || {});
  ids.forEach((id) => {
    let last = null;
    for (let i = 0; i < frames.length; i++) {
      const a = frames[i].actors[id];
      if (!a) continue;
      if (a.visible) { last = a; continue; }
      if (last) { frames[i].actors[id] = { ...a, px: last.px, py: last.py, pw: last.pw, ph: last.ph }; continue; }
      // never visible yet → look ahead
      for (let j = i + 1; j < frames.length; j++) {
        const f = frames[j].actors[id];
        if (f && f.visible) {
          let px = f.px; let py = f.py;
          if (f.from) {
            const p = resolvePoint(f.from, frames[j].zones, frames[j].actors);
            if (p) { px = p.x - f.pw / 2; py = p.y - f.ph / 2; }
          }
          frames[i].actors[id] = { ...a, px, py, pw: f.pw, ph: f.ph };
          break;
        }
      }
    }
    // `from` on re-appearance mid-scene
    for (let i = 1; i < frames.length; i++) {
      const a = frames[i].actors[id];
      const p = frames[i - 1].actors[id];
      if (a && a.visible && a.from && p && !p.visible) {
        const pt = resolvePoint(a.from, frames[i].zones, frames[i].actors);
        if (pt) frames[i - 1].actors[id] = { ...p, px: pt.x - a.pw / 2, py: pt.y - a.ph / 2 };
      }
    }
  });

  return frames;
}

function layout(zones, actors) {
  const out = {};
  const byZone = {};
  Object.entries(actors).forEach(([id, a]) => {
    if (a.visible && a.in && zones[a.in] && a.x === undefined) {
      (byZone[a.in] = byZone[a.in] || []).push([id, a]);
    }
  });
  Object.entries(byZone).forEach(([zid, list]) => {
    list.sort((p, q) => p[1].order - q[1].order);
    const z = zones[zid];
    const mode = z.layout || 'col';
    const top = z.y + (z.label ? 28 : 10);
    let cx = z.x + 10;
    let cy = top;
    list.forEach(([id, a], i) => {
      let px; let py;
      if (mode === 'stack') {
        px = z.x + z.w / 2 - a.w / 2;
        py = z.y + z.h - 10 - (i + 1) * a.h - i * GAP;
      } else if (mode === 'row') {
        const total = list.reduce((acc, [, b]) => acc + b.w, 0) + GAP * (list.length - 1);
        const start = z.x + Math.max(10, (z.w - total) / 2);
        const before = list.slice(0, i).reduce((acc, [, b]) => acc + b.w + GAP, 0);
        px = start + before;
        py = top + (z.y + z.h - top) / 2 - a.h / 2 - 4;
      } else if (mode === 'grid') {
        if (cx + a.w > z.x + z.w - 6) { cx = z.x + 10; cy += a.h + GAP; }
        px = cx; py = cy; cx += a.w + GAP;
      } else if (mode === 'center') {
        px = z.x + z.w / 2 - a.w / 2;
        py = z.y + (z.label ? 14 : 0) + z.h / 2 - a.h / 2;
      } else { // col
        px = z.x + z.w / 2 - a.w / 2;
        py = top + i * (a.h + GAP);
      }
      out[id] = { ...a, px, py, pw: a.w, ph: a.h };
    });
  });
  Object.entries(actors).forEach(([id, a]) => {
    if (out[id]) return;
    if (a.x !== undefined || a.y !== undefined) {
      let bx = a.x ?? 0; let by = a.y ?? 0;
      if (a.in && zones[a.in]) { bx += zones[a.in].x; by += zones[a.in].y; }
      const px = a.anchor === 'left' ? bx : bx - a.w / 2;
      out[id] = { ...a, px, py: by - a.h / 2, pw: a.w, ph: a.h };
    } else {
      out[id] = { ...a, px: undefined, py: undefined, pw: a.w, ph: a.h };
    }
  });
  return out;
}

function resolvePoint(ref, zones, actors) {
  if (!ref) return null;
  if (typeof ref === 'object') return ref;
  if (zones[ref]) { const z = zones[ref]; return { x: z.x + z.w / 2, y: z.y + z.h / 2 }; }
  const a = actors[ref];
  if (a && a.px !== undefined) return { x: a.px + a.pw / 2, y: a.py + a.ph / 2 };
  return null;
}

function rectOf(ref, zones, actors) {
  if (typeof ref === 'object') return { x: ref.x, y: ref.y, w: 0, h: 0 };
  if (zones[ref]) { const z = zones[ref]; return { x: z.x, y: z.y, w: z.w, h: z.h }; }
  const a = actors[ref];
  if (a && a.px !== undefined) return { x: a.px, y: a.py, w: a.pw, h: a.ph };
  return null;
}

// clip a ray from the centre of rect toward point (tx,ty) at the rect's border
function edgePoint(r, tx, ty) {
  const cx = r.x + r.w / 2; const cy = r.y + r.h / 2;
  const dx = tx - cx; const dy = ty - cy;
  if (r.w === 0 && r.h === 0) return { x: cx, y: cy };
  const sx = dx === 0 ? Infinity : (r.w / 2 + 4) / Math.abs(dx);
  const sy = dy === 0 ? Infinity : (r.h / 2 + 4) / Math.abs(dy);
  const k = Math.min(sx, sy, 1);
  return { x: cx + dx * k, y: cy + dy * k };
}

// ── component ──────────────────────────────────────────────────────────
const SPEEDS = [0.5, 1, 2];

export default function Scene({ scene }) {
  const frames = useMemo(() => buildFrames(scene), [scene]);
  const [step, setStep] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [speedIdx, setSpeedIdx] = useState(1);
  const [scale, setScale] = useState(1);
  const [started, setStarted] = useState(false);
  const outerRef = useRef(null);
  const uid = useMemo(() => `sc${Math.random().toString(36).slice(2, 8)}`, []);
  const H = scene.h || 300;
  const last = frames.length - 1;
  const frame = frames[step];
  const dwell = (scene.dwell || 2200) / SPEEDS[speedIdx];

  // responsive scaling of the fixed 640px canvas
  useEffect(() => {
    const el = outerRef.current;
    if (!el) return undefined;
    const measure = () => {
      const cw = el.clientWidth;
      setScale(Math.max(0.48, Math.min(1.15, cw / W)));
    };
    measure();
    if (typeof ResizeObserver === 'undefined') return undefined;
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  // autoplay the first time the scene scrolls into view
  useEffect(() => {
    const el = outerRef.current;
    if (!el || started) return undefined;
    const reduce = typeof window !== 'undefined' && window.matchMedia
      && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce || typeof IntersectionObserver === 'undefined') return undefined;
    const io = new IntersectionObserver((entries) => {
      if (entries.some((e) => e.isIntersecting)) {
        setStarted(true);
        setPlaying(true);
        io.disconnect();
      }
    }, { threshold: 0.45 });
    io.observe(el);
    return () => io.disconnect();
  }, [started]);

  // playback timer
  useEffect(() => {
    if (!playing) return undefined;
    if (step >= last) { setPlaying(false); return undefined; }
    const t = setTimeout(() => setStep((x) => Math.min(last, x + 1)), dwell);
    return () => clearTimeout(t);
  }, [playing, step, last, dwell]);

  const go = useCallback((n) => { setPlaying(false); setStep(Math.max(0, Math.min(last, n))); }, [last]);
  const toggle = () => {
    if (step >= last) { setStep(0); setPlaying(true); return; }
    setPlaying((p) => !p);
  };

  const onKey = (e) => {
    if (e.key === 'ArrowRight') { e.preventDefault(); go(step + 1); }
    else if (e.key === 'ArrowLeft') { e.preventDefault(); go(step - 1); }
    else if (e.key === ' ') { e.preventDefault(); toggle(); }
  };

  const { zones, actors } = frame;
  const st = frame.step;
  const tone = st.tone || scene.accent || '#4facfe';
  const lines = st.line === undefined ? [] : [].concat(st.line);
  const codeLines = scene.code ? scene.code.split('\n') : null;

  return (
    <div className={s.wrap} style={{ '--accent': scene.accent || '#4facfe' }}>
      <div className={s.head}>
        <span className={s.badge}>▶ ANIMATED</span>
        <span className={s.title}>{scene.title}</span>
      </div>

      {codeLines && (
        <pre className={s.code}>
          {codeLines.map((ln, i) => (
            <div key={i} className={`${s.codeLine} ${lines.includes(i + 1) ? s.codeHi : ''}`}>
              <span className={s.lineNo}>{i + 1}</span>{ln || ' '}
            </div>
          ))}
        </pre>
      )}

      <div
        ref={outerRef}
        className={s.viewport}
        tabIndex={0}
        role="img"
        aria-label={`${scene.title}. Step ${step + 1} of ${frames.length}: ${st.say || ''}`}
        onKeyDown={onKey}
      >
        <div style={{ width: W * scale, height: H * scale, position: 'relative', margin: '0 auto' }}>
          <div className={s.canvas} style={{ width: W, height: H, transform: `scale(${scale})` }}>
            {/* zones */}
            {Object.entries(zones).map(([id, z]) => (
              <div
                key={id}
                className={`${s.zone} ${z.hi ? s.zoneHi : ''} ${z.dashed ? s.zoneDashed : ''} ${z.ghost ? s.zoneGhost : ''}`}
                style={{
                  left: z.x, top: z.y, width: z.w, height: z.h,
                  '--zc': z.color || '#2a3f5f',
                  opacity: z.show === false ? 0 : z.dim ? 0.35 : 1,
                  borderRadius: z.round ?? 10,
                }}
              >
                {z.label && <div className={s.zoneLabel}>{z.label}</div>}
                {z.text !== undefined && (
                  <div key={String(z.text)} className={`${s.zoneText} ${z.big ? s.zoneBig : ''} ${z.label ? '' : s.zoneTextFull}`}>{z.text}</div>
                )}
              </div>
            ))}

            {/* arrows */}
            <svg className={s.svg} width={W} height={H} viewBox={`0 0 ${W} ${H}`}>
              {(scene.edges || []).map(([from, to], i) => {
                if (zones[from]?.show === false || zones[to]?.show === false) return null;
                const a = rectOf(from, zones, actors);
                const b = rectOf(to, zones, actors);
                if (!a || !b) return null;
                const p1 = edgePoint(a, b.x + b.w / 2, b.y + b.h / 2);
                const p2 = edgePoint(b, a.x + a.w / 2, a.y + a.h / 2);
                return <line key={`e${i}`} x1={p1.x} y1={p1.y} x2={p2.x} y2={p2.y} stroke="#2a3f5f" strokeWidth="1.5" />;
              })}
              {(st.arrows || []).map(([from, to, opt = {}], i) => {
                const a = rectOf(from, zones, actors);
                const b = rectOf(to, zones, actors);
                if (!a || !b) return null;
                const p1 = edgePoint(a, b.x + b.w / 2, b.y + b.h / 2);
                const p2 = edgePoint(b, a.x + a.w / 2, a.y + a.h / 2);
                const color = opt.color || tone;
                const bend = opt.bend || 0;
                const mx = (p1.x + p2.x) / 2 - (p2.y - p1.y) * bend;
                const my = (p1.y + p2.y) / 2 + (p2.x - p1.x) * bend;
                const d = bend ? `M${p1.x},${p1.y} Q${mx},${my} ${p2.x},${p2.y}` : `M${p1.x},${p1.y} L${p2.x},${p2.y}`;
                const mid = `${uid}-a${i}`;
                return (
                  <g key={`${step}-${i}`} className={s.arrowG}>
                    <defs>
                      <marker id={mid} viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
                        <path d="M0,0 L10,5 L0,10 z" fill={color} />
                      </marker>
                    </defs>
                    <path d={d} stroke={color} strokeWidth="2" fill="none"
                      className={opt.dashed === false ? '' : s.flow}
                      markerEnd={`url(#${mid})`} />
                    {opt.label && (
                      <text x={bend ? (p1.x + 2 * mx + p2.x) / 4 : mx} y={(bend ? (p1.y + 2 * my + p2.y) / 4 : my) - 6}
                        fill={color} fontSize="11" textAnchor="middle" className={s.arrowLabel}>{opt.label}</text>
                    )}
                  </g>
                );
              })}
            </svg>

            {/* actors */}
            {Object.entries(actors).map(([id, a]) => {
              if (a.px === undefined) return null;
              const color = a.color || '#4facfe';
              const cls = [s.actor, s[`shape_${a.shape}`] || '', a.glow ? s.glow : '', a.strike && a.visible ? s.strike : '', a.shake && a.visible ? s.shake : ''].join(' ');
              return (
                <div
                  key={id}
                  className={cls}
                  style={{
                    width: a.pw, height: a.ph,
                    transform: `translate(${a.px}px, ${a.py}px) scale(${a.visible ? (a.scale || 1) : 0.6})`,
                    opacity: a.visible ? (a.dim ? 0.35 : 1) : 0,
                    '--c': color,
                    fontSize: a.fs || (a.shape === 'dot' ? 10 : 11),
                    zIndex: a.z || 2,
                  }}
                >
                  {a.label}
                  {a.badge && <span className={s.actorBadge}>{a.badge}</span>}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className={s.caption} style={{ '--tone': tone }} key={step} aria-live="polite">
        <span className={s.stepNo}>{step + 1}/{frames.length}</span>
        <span>{st.say}</span>
      </div>

      <div className={s.controls}>
        <button type="button" className={s.btn} onClick={() => go(step - 1)} disabled={step === 0} aria-label="Previous step">◀</button>
        <button type="button" className={`${s.btn} ${s.play}`} onClick={toggle} aria-label={playing ? 'Pause' : 'Play'}>
          {playing ? '❚❚ Pause' : step >= last ? '↺ Replay' : '▶ Play'}
        </button>
        <button type="button" className={s.btn} onClick={() => go(step + 1)} disabled={step === last} aria-label="Next step">▶</button>
        <div className={s.dots}>
          {frames.map((_, i) => (
            <button
              type="button"
              key={i}
              aria-label={`Go to step ${i + 1}`}
              className={`${s.dot} ${i === step ? s.dotOn : ''} ${i < step ? s.dotDone : ''}`}
              onClick={() => go(i)}
            />
          ))}
        </div>
        <button type="button" className={s.btn} onClick={() => setSpeedIdx((i) => (i + 1) % SPEEDS.length)} aria-label="Change speed">
          {SPEEDS[speedIdx]}×
        </button>
      </div>
    </div>
  );
}
export { buildFrames as __buildFrames };
