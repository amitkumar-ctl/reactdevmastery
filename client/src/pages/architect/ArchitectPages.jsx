import React, { useEffect, useRef, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import {
  ARCHITECT_CASES, ARCHITECT_BY_ID, ARCHITECT_FRAMEWORK, ARCHITECT_UPCOMING,
} from 'reactdevmastery-content/data';
import Scene from '../../animations/engine/Scene';
import s from './Architect.module.css';

const STEP_COLORS = {
  requirements: '#a855f7', architecture: '#4facfe', dataModel: '#eab308', api: '#00ff88', optimizations: '#14b8a6',
};
const EXTRA_STEPS = [
  { key: 'tradeoffs', letter: '⚖', title: 'Trade-offs', color: '#f97316' },
  { key: 'followUps', letter: '?', title: 'Follow-ups', color: '#ec4899' },
  { key: 'rubric', letter: '✓', title: 'Self-check', color: '#00ff88' },
];

const diffClass = (d) => (d === 'hard' ? s.chipHard : d === 'medium' ? s.chipMedium : s.chipEasy);

// ── /architect ─────────────────────────────────────────────────────────
export const ArchitectList = () => (
  <div className={s.page}>
    <div className={s.topbar}>
      <div className={s.eyebrow}>🏛 Architect</div>
      <div className={s.title}>Frontend System Design</div>
      <div className={s.subtitle}>“Design Facebook’s feed” — how a senior frontend engineer answers.</div>
    </div>
    <div className={s.content}>
      <div className={s.wrap}>
        <div className={s.hero}>
          <div className={s.eyebrow}>Why this matters</div>
          <div className={s.heroTitle}>Think like a frontend architect</div>
          <p className={s.heroText}>
            Senior interviews increasingly include an open-ended design round. There is no single right answer —
            interviewers judge how you structure the problem, which trade-offs you see, and which React and
            browser features you reach for. Every case here follows the same 5-step framework.
          </p>
        </div>

        <div className={s.sectionLabel}>The RADIO framework</div>
        <div className={s.radio}>
          {ARCHITECT_FRAMEWORK.map((f) => (
            <div key={f.key} className={s.radioStep} style={{ '--c': STEP_COLORS[f.key] }}>
              <div className={s.radioLetter}>{f.letter}</div>
              <div className={s.radioTitle}>{f.title}</div>
              <div className={s.radioTime}>{f.time}</div>
              <div className={s.radioDesc}>{f.desc}</div>
            </div>
          ))}
        </div>

        <div className={s.sectionLabel}>Case studies</div>
        <div className={s.cases}>
          {ARCHITECT_CASES.map((c) => (
            <Link key={c.id} to={`/architect/${c.id}`} className={s.caseCard}>
              <div className={s.caseSub}>{c.subtitle}</div>
              <div className={s.caseTitle}>{c.title}</div>
              <div className={s.caseDesc}>{c.summary}</div>
              <div className={s.caseFoot}>
                <span className={`${s.chip} ${diffClass(c.difficulty)}`}>{c.difficulty.toUpperCase()}</span>
                <span>⏱ {c.duration} →</span>
              </div>
            </Link>
          ))}
        </div>

        {ARCHITECT_UPCOMING.length > 0 && (
          <>
            <div className={s.sectionLabel}>Coming soon</div>
            <div className={s.upcoming}>
              {ARCHITECT_UPCOMING.map((u) => (
                <div key={u.id} className={s.upcomingCard}>
                  <div className={s.upcomingTitle}>{u.title}</div>
                  <div className={s.upcomingSub}>{u.subtitle}</div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  </div>
);

// ── small building blocks ──────────────────────────────────────────────
const SectionHead = ({ letter, title, time, color }) => (
  <div className={s.sectionHead} style={{ '--c': color }}>
    <div className={s.sectionBadge}>{letter}</div>
    <div className={s.sectionTitle}>{title}</div>
    {time && <div className={s.sectionTime}>{time}</div>}
  </div>
);

const Scenes = ({ list }) => (list || []).map((sc, i) => <Scene key={i} scene={sc} />);

const Reveal = ({ q, children, index, cls = s.clarify, qCls = s.clarifyQ, hint = 'reveal' }) => {
  const [open, setOpen] = useState(false);
  return (
    <div className={cls}>
      <button type="button" className={qCls} onClick={() => setOpen((o) => !o)} aria-expanded={open}>
        {index !== undefined && <span className={s.clarifyNum}>{String(index + 1).padStart(2, '0')}</span>}
        <span>{q}</span>
        <span className={s.clarifyToggle}>{open ? '▲' : hint}</span>
      </button>
      {open && children}
    </div>
  );
};

const Rubric = ({ items, caseId }) => {
  const [checked, setChecked] = useState({});
  useEffect(() => { setChecked({}); }, [caseId]);
  const score = Object.values(checked).filter(Boolean).length;
  return (
    <div className={s.panel}>
      <div className={s.panelTitle}>Rate your own answer</div>
      <div className={s.rubric}>
        {items.map((r, i) => (
          <label key={i} className={s.rubricRow}>
            <input type="checkbox" checked={!!checked[i]} onChange={(e) => setChecked((c) => ({ ...c, [i]: e.target.checked }))} />
            <span><span className={s.rubricSkill}>{r.skill}</span>{r.signal}</span>
          </label>
        ))}
      </div>
      <div className={s.score}>
        {score}/{items.length} — {score === items.length ? 'Interview-ready 🚀' : score >= items.length - 1 ? 'Strong answer' : score >= 2 ? 'Getting there' : 'Revisit the sections above'}
      </div>
    </div>
  );
};

// ── /architect/:caseId ─────────────────────────────────────────────────
export const ArchitectCase = () => {
  const { caseId } = useParams();
  const c = ARCHITECT_BY_ID[caseId];
  const contentRef = useRef(null);
  const [active, setActive] = useState('requirements');

  useEffect(() => { contentRef.current?.scrollTo({ top: 0 }); setActive('requirements'); }, [caseId]);

  // highlight the stepper item for the section in view
  useEffect(() => {
    const root = contentRef.current;
    if (!root || typeof IntersectionObserver === 'undefined') return undefined;
    const io = new IntersectionObserver((entries) => {
      const visible = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
      if (visible[0]) setActive(visible[0].target.dataset.step);
    }, { root, rootMargin: '0px 0px -65% 0px' });
    root.querySelectorAll('[data-step]').forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [caseId]);

  if (!c) {
    return (
      <div className={s.page}><div className={s.content}><div className={s.wrap}>
        <p className={s.intro}>Case study not found.</p>
        <Link to="/architect" className={s.navLink}>← All case studies</Link>
      </div></div></div>
    );
  }

  const fw = Object.fromEntries(ARCHITECT_FRAMEWORK.map((f) => [f.key, f]));
  const steps = [
    ...ARCHITECT_FRAMEWORK.map((f) => ({ key: f.key, letter: f.letter, title: f.title, color: STEP_COLORS[f.key] })),
    ...EXTRA_STEPS,
  ];
  const go = (key) => {
    const el = contentRef.current?.querySelector(`[data-step="${key}"]`);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };
  const idx = ARCHITECT_CASES.findIndex((x) => x.id === c.id);
  const next = ARCHITECT_CASES[(idx + 1) % ARCHITECT_CASES.length];
  const head = (key) => <SectionHead letter={fw[key].letter} title={fw[key].title} time={fw[key].time} color={STEP_COLORS[key]} />;

  return (
    <div className={s.page}>
      <div className={s.topbar}>
        <Link to="/architect" className={s.back}>← Architect</Link>
        <div className={s.eyebrow}>{c.subtitle}</div>
        <h1 className={s.title}>{c.title}</h1>
        <div className={s.meta}>
          <span className={`${s.chip} ${diffClass(c.difficulty)}`}>{c.difficulty.toUpperCase()}</span>
          <span className={s.chip}>⏱ {c.duration}</span>
          {c.tags.map((t) => <span key={t} className={s.chip}>{t}</span>)}
        </div>
      </div>

      <nav className={s.stepper} aria-label="Sections">
        {steps.map((st) => (
          <button key={st.key} type="button" style={{ '--c': st.color }}
            className={`${s.stepBtn} ${active === st.key ? s.stepActive : ''}`} onClick={() => go(st.key)}>
            <span className={s.stepLetter}>{st.letter}</span>{st.title}
          </button>
        ))}
      </nav>

      <div className={s.content} ref={contentRef}>
        <div className={s.wrap}>
          <div className={s.prompt}>
            <div className={s.promptLabel}>🎤 The interviewer says</div>
            <p className={s.promptText}>{c.prompt}</p>
            <div className={s.tip}>Before reading on, spend 5 minutes sketching your own answer. Then compare.</div>
          </div>

          {/* R */}
          <section className={s.section} data-step="requirements">
            {head('requirements')}
            <div className={s.panelTitle} style={{ marginBottom: 0 }}>First, ask clarifying questions</div>
            <div className={s.clarifyGrid}>
              {c.clarify.map((q, i) => (
                <Reveal key={q.q} q={q.q} index={i} hint="why ask?">
                  <div className={s.clarifyBody}>
                    <div className={s.why}>💡 {q.why}</div>
                    <div className={s.assume}>✓ Assume: {q.assume}</div>
                  </div>
                </Reveal>
              ))}
            </div>
            <div className={s.two}>
              <div className={s.panel}>
                <div className={s.panelTitle}>Functional</div>
                <ul className={s.list}>{c.requirements.functional.map((f) => <li key={f}>{f}</li>)}</ul>
              </div>
              <div className={s.panel}>
                <div className={s.panelTitle}>Non-functional</div>
                <div className={s.nfr}>
                  {c.requirements.nonFunctional.map((n) => (
                    <div key={n.name} className={s.nfrRow}><span className={s.nfrName}>{n.name}</span><span className={s.nfrTarget}>{n.target}</span></div>
                  ))}
                </div>
              </div>
            </div>
            <div className={s.outScope}>Out of scope: {c.requirements.outOfScope.map((o) => <span key={o}>{o}</span>)}</div>
          </section>

          {/* A */}
          <section className={s.section} data-step="architecture">
            {head('architecture')}
            <p className={s.intro}>{c.architecture.intro}</p>
            <Scenes list={c.architecture.scenes} />
            <div className={s.panel}>
              <div className={s.panelTitle}>Layers</div>
              <div className={s.layers}>
                {c.architecture.layers.map((l) => (
                  <div key={l.name} className={s.layer}><div className={s.layerName}>{l.name}</div><div className={s.layerDetail}>{l.detail}</div></div>
                ))}
              </div>
            </div>
            <div className={s.panelTitle} style={{ marginBottom: 0 }}>Key decisions & the React features behind them</div>
            <div className={s.decisions}>
              {c.architecture.decisions.map((d) => (
                <div key={d.title} className={s.decision}>
                  <div className={s.decisionTitle}>{d.title}</div>
                  <div className={s.decisionChoice}>{d.choice}</div>
                  <div className={s.decisionWhy}>{d.why}</div>
                  {d.react && <div className={s.react}><b>⚛ </b>{d.react}</div>}
                </div>
              ))}
            </div>
          </section>

          {/* D */}
          <section className={s.section} data-step="dataModel">
            {head('dataModel')}
            <p className={s.intro}>{c.dataModel.intro}</p>
            <div className={s.entities}>
              {c.dataModel.entities.map((e) => (
                <div key={e.name} className={s.entity}><div className={s.entityName}>{e.name}</div><pre className={s.code}>{e.shape}</pre></div>
              ))}
            </div>
            <div className={s.panel}>
              <div className={s.panelTitle}>Where each piece of state lives</div>
              <div className={s.tableWrap}>
                <table className={s.table}>
                  <thead><tr><th>State</th><th>Lives in</th><th>Tool</th><th>Why</th></tr></thead>
                  <tbody>
                    {c.dataModel.stateMap.map((r) => (
                      <tr key={r.state}><td>{r.state}</td><td>{r.lives}</td><td className={s.path}>{r.tool}</td><td>{r.why}</td></tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </section>

          {/* I */}
          <section className={s.section} data-step="api">
            {head('api')}
            <p className={s.intro}>{c.api.intro}</p>
            <div className={s.panel}>
              <div className={s.tableWrap}>
                <table className={s.table}>
                  <thead><tr><th>Method</th><th>Endpoint / event</th><th>Purpose</th></tr></thead>
                  <tbody>
                    {c.api.endpoints.map((e) => (
                      <tr key={e.path}><td className={s.method}>{e.method}</td><td className={s.path}>{e.path}</td><td>{e.purpose}</td></tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            <Scenes list={c.api.scenes} />
            {c.api.notes?.length > 0 && (
              <div className={s.panel}>
                <div className={s.panelTitle}>Worth saying out loud</div>
                <ul className={s.list}>{c.api.notes.map((n) => <li key={n}>{n}</li>)}</ul>
              </div>
            )}
          </section>

          {/* O */}
          <section className={s.section} data-step="optimizations">
            {head('optimizations')}
            <Scenes list={c.optimizationScenes} />
            {c.optimizations.map((area) => (
              <div key={area.area} className={s.optArea}>
                <div className={s.optAreaTitle}>{area.area}</div>
                <div className={s.optGrid}>
                  {area.points.map((p) => (
                    <div key={p.title} className={s.opt}>
                      <div className={s.optTitle}>{p.title}</div>
                      <div className={s.optDetail}>{p.detail}</div>
                      {p.react && <div className={s.react}><b>⚛ </b>{p.react}</div>}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </section>

          {/* Trade-offs */}
          <section className={s.section} data-step="tradeoffs">
            <SectionHead letter="⚖" title="Trade-offs to discuss" color="#f97316" />
            <div className={s.tradeoffs}>
              {c.tradeoffs.map((t) => (
                <div key={t.topic} className={s.tradeoff}>
                  <div className={s.tradeoffTopic}>{t.topic}</div>
                  <div className={s.options}>
                    {t.options.map((o) => (
                      <div key={o.name} className={s.option}><div className={s.optionName}>{o.name}</div><div className={s.optionWhen}>{o.when}</div></div>
                    ))}
                  </div>
                  <div className={s.verdict}>→ {t.verdict}</div>
                </div>
              ))}
            </div>
          </section>

          {/* Follow-ups */}
          <section className={s.section} data-step="followUps">
            <SectionHead letter="?" title="Follow-up questions" color="#ec4899" />
            <p className={s.intro}>Interviewers push on your design. Try answering each one before revealing.</p>
            {c.followUps.map((f) => (
              <Reveal key={f.q} q={f.q} cls={s.qa} qCls={s.qaQ} hint="show answer">
                <div className={s.qaA}>{f.a}</div>
              </Reveal>
            ))}
            <div className={s.panel}>
              <div className={s.panelTitle} style={{ color: '#ef4444' }}>Common mistakes</div>
              <ul className={s.mistakes}>{c.mistakes.map((m) => <li key={m}>{m}</li>)}</ul>
            </div>
          </section>

          {/* Rubric */}
          <section className={s.section} data-step="rubric">
            <SectionHead letter="✓" title="What the interviewer is checking" color="#00ff88" />
            <Rubric items={c.rubric} caseId={c.id} />
          </section>

          <div className={s.nextCase}>
            <Link to="/architect" className={s.navLink}>← All case studies</Link>
            {next && next.id !== c.id && <Link to={`/architect/${next.id}`} className={s.navLink}>Next: {next.title} →</Link>}
          </div>
        </div>
      </div>
    </div>
  );
};
