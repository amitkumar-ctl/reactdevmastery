import type { Metadata } from 'next';
import Link from 'next/link';
import { CONCEPTS } from 'reactdevmastery-content/data';
type Topic2 = { title: string; color: string; items: { id: string }[] };
const concepts2 = CONCEPTS as Record<string, Topic2>;

export const metadata: Metadata = {
  title: 'ReactDevMastery — Senior Frontend Engineer Learning Platform',
  description:
    'Interactive visualizers, real interview rounds, and 900+ concept-level Q&As. Go from mid-level to senior engineer. Free forever.',
};

const FEATURED = [
  { id: 'js-core',       label: 'JavaScript Internals',   icon: '⚡' },
  { id: 'react-core',    label: 'React Internals',         icon: '⚛' },
  { id: 'hooks',         label: 'Hooks & State',           icon: '🪝' },
  { id: 'async',         label: 'Async & Promises',        icon: '⏳' },
  { id: 'perf',          label: 'Performance & CWV',       icon: '📊' },
  { id: 'security',      label: 'Security',                icon: '🔐' },
  { id: 'system-design', label: 'System Design',           icon: '🏗' },
  { id: 'patterns',      label: 'Design Patterns',         icon: '🧩' },
];

export default function Home() {
  const totalConcepts = Object.values(concepts2).reduce((a, t) => a + t.items.length, 0);
  const totalTopics = Object.keys(concepts2).length;

  return (
    <div className="min-h-screen bg-[#0a0e1a] text-[#e2e8f0] font-mono">

      {/* Header */}
      <header className="border-b border-[#1e2d40] bg-[#060910] px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#00ff88] to-[#4facfe] flex items-center justify-center p-1.5">
            <img src="/assets/icon-transparent-white.svg" alt="" className="w-full h-full" />
          </div>
          <span className="text-[13px] font-bold text-[#00ff88] tracking-wide">REACTDEVMASTERY</span>
        </div>
        <div className="flex gap-2">
          <Link href="/login" className="text-xs px-3 py-1.5 border border-[#2a3f5f] rounded-lg text-[#9ca3af] hover:text-[#e2e8f0] hover:border-[#4facfe] transition-colors">
            Log in
          </Link>
          <Link href="/register" className="text-xs px-3 py-1.5 rounded-lg font-bold text-[#001a0a] bg-gradient-to-r from-[#00c853] to-[#00897b] hover:opacity-90 transition-opacity">
            Sign up free
          </Link>
        </div>
      </header>

      {/* Hero */}
      <section className="max-w-3xl mx-auto px-6 py-16 text-center">
        <div className="inline-block text-[10px] font-bold tracking-[2px] uppercase px-3 py-1.5 rounded-full border border-[#1e2d40] text-[#4facfe] bg-[#0d1829] mb-6">
          Senior Frontend Interview Prep
        </div>
        <h1 className="text-4xl sm:text-5xl font-bold text-white leading-tight mb-5">
          Go from mid-level to{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00ff88] to-[#4facfe]">
            senior engineer
          </span>
        </h1>
        <p className="text-[#9ca3af] text-base leading-relaxed mb-8 max-w-2xl mx-auto">
          Interactive visualizers, real interview rounds, and {totalConcepts}+ concept-level Q&As
          built specifically for engineers targeting senior frontend roles. Free, forever.
        </p>
        <div className="flex flex-wrap gap-3 justify-center">
          <Link href="/register" className="px-6 py-3 rounded-xl font-bold text-[#001a0a] bg-gradient-to-r from-[#00c853] to-[#00897b] hover:opacity-90 transition-opacity text-sm">
            Start learning free →
          </Link>
          <Link href="/js-core" className="px-6 py-3 rounded-xl text-sm font-semibold text-[#9ca3af] border border-[#2a3f5f] hover:border-[#4facfe] hover:text-[#4facfe] transition-colors">
            Explore content
          </Link>
        </div>
      </section>

      {/* Stats */}
      <div className="border-y border-[#1e2d40] bg-[#0d1829]">
        <div className="max-w-3xl mx-auto px-6 py-6 grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
          {[
            { num: `${totalTopics}+`, label: 'Topics' },
            { num: `${totalConcepts}+`, label: 'Concepts' },
            { num: '900+', label: 'Interview Q&As' },
            { num: '100%', label: 'Free forever' },
          ].map((s) => (
            <div key={s.label}>
              <div className="text-2xl font-bold text-[#00ff88] mb-1">{s.num}</div>
              <div className="text-[10px] text-[#9ca3af] tracking-wide uppercase">{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Topics grid */}
      <section className="max-w-3xl mx-auto px-6 py-14">
        <p className="text-[10px] font-bold tracking-[2px] text-[#4facfe] uppercase text-center mb-2">Browse the curriculum</p>
        <h2 className="text-2xl font-bold text-white text-center mb-8">
          Click any topic to start reading
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
          {FEATURED.map((t) => {
            const topic = concepts2[t.id];
            return (
              <Link
                key={t.id}
                href={`/${t.id}`}
                className="flex flex-col gap-2 p-4 rounded-xl border border-[#1e2d40] bg-[#0d1829] hover:border-[#4facfe] hover:-translate-y-0.5 transition-all group"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xl">{t.icon}</span>
                  <span className="text-[10px] text-[#6b7280] border border-[#1e2d40] rounded-full px-1.5 py-0.5">
                    {topic?.items.length ?? 0}
                  </span>
                </div>
                <div className="text-xs font-semibold text-[#e2e8f0] leading-snug group-hover:text-white transition-colors">
                  {t.label}
                </div>
                <div className="text-[#9ca3af] text-[11px] group-hover:text-[#4facfe] transition-colors">→</div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-[#1e2d40] py-8 text-center">
        <p className="text-[#6b7280] text-xs">
          © 2026 ReactDevMastery ·{' '}
          <Link href="/privacy" className="hover:text-[#9ca3af] transition-colors">Privacy</Link>
          {' · '}
          <Link href="/terms" className="hover:text-[#9ca3af] transition-colors">Terms</Link>
        </p>
      </footer>
    </div>
  );
}
