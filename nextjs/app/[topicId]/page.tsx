import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { CONCEPTS } from 'reactdevmastery-content/data';

type ConceptItem = { id: string; title: string; desc: string; diff: string };
type Topic = { title: string; color: string; items: ConceptItem[] };
const concepts = CONCEPTS as Record<string, Topic>;

interface Props {
  params: Promise<{ topicId: string }>;
}

// ── Static generation — pre-render all 34 topic pages at build time ────
export async function generateStaticParams() {
  return Object.keys(concepts).map((topicId) => ({ topicId }));
}

// ── Per-page metadata — unique title/description for every topic ───────
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { topicId } = await params;
  const topic = concepts[topicId];
  if (!topic) return {};

  const conceptCount = topic.items.length;
  return {
    title: `${topic.title} — ${conceptCount} Concepts`,
    description: `Master ${topic.title} for senior frontend interviews. ${conceptCount} in-depth concepts with interactive visualizers, code examples, and interview Q&As.`,
    openGraph: {
      title: `${topic.title} | ReactDevMastery`,
      description: `${conceptCount} concepts covering everything about ${topic.title} you need for a senior frontend interview.`,
    },
  };
}

const diffColor: Record<string, string> = {
  hard:   'text-red-400 border-red-400/30 bg-red-400/10',
  medium: 'text-orange-400 border-orange-400/30 bg-orange-400/10',
  easy:   'text-green-400 border-green-400/30 bg-green-400/10',
};

// ── Topic page component ────────────────────────────────────────────────
export default async function TopicPage({ params }: Props) {
  const { topicId } = await params;
  const topic = concepts[topicId];
  if (!topic) notFound();

  return (
    <div className="min-h-screen bg-[#0a0e1a] text-[#e2e8f0] font-mono">

      {/* Header */}
      <div className="border-b border-[#1e2d40] bg-[#060910] sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-4 flex items-center gap-3">
          <Link href="/" className="text-[#9ca3af] hover:text-[#e2e8f0] text-sm transition-colors">
            ← ReactDevMastery
          </Link>
          <span className="text-[#1e2d40]">/</span>
          <span className="text-[#e2e8f0] text-sm font-semibold">{topic.title}</span>
        </div>
      </div>

      {/* Hero */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10">
        <div
          className="inline-block text-xs font-bold tracking-widest uppercase px-3 py-1 rounded-full mb-4 border"
          style={{ color: topic.color, borderColor: topic.color + '40', background: topic.color + '15' }}
        >
          {topic.items.length} concepts
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold text-white mb-3">{topic.title}</h1>
        <p className="text-[#9ca3af] text-base leading-relaxed mb-8">
          Master every aspect of {topic.title} for senior frontend interviews — with
          interactive visualizers, in-depth explanations, and real interview Q&As.
        </p>

        {/* Login CTA for guests */}
        <div className="flex flex-wrap gap-3 mb-10">
          <Link
            href="/register"
            className="px-5 py-2.5 rounded-lg text-sm font-bold text-[#001a0a] bg-gradient-to-r from-[#00c853] to-[#00897b] hover:opacity-90 transition-opacity"
          >
            Sign up free to track progress →
          </Link>
          <Link
            href="/login"
            className="px-5 py-2.5 rounded-lg text-sm font-semibold text-[#9ca3af] border border-[#2a3f5f] hover:border-[#4facfe] hover:text-[#4facfe] transition-colors"
          >
            Log in
          </Link>
        </div>

        {/* Concept list */}
        <div className="space-y-3">
          {topic.items.map((item, i) => (
            <Link
              key={item.id}
              href={`/${topicId}/${item.id}`}
              className="flex items-start gap-4 p-4 rounded-xl border border-[#1e2d40] bg-[#0d1829] hover:border-[#2a3f5f] hover:bg-[#111827] transition-all group"
            >
              <span className="text-[#6b7280] text-xs mt-1 w-5 shrink-0 text-right">{i + 1}</span>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap mb-1">
                  <h2 className="text-[#e2e8f0] font-semibold text-sm group-hover:text-white transition-colors">
                    {item.title}
                  </h2>
                  <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-full border ${diffColor[item.diff] ?? diffColor.easy}`}>
                    {item.diff}
                  </span>
                </div>
                <p className="text-[#9ca3af] text-xs leading-relaxed">{item.desc}</p>
              </div>
              <span className="text-[#6b7280] group-hover:text-[#4facfe] text-sm shrink-0 transition-colors mt-0.5">→</span>
            </Link>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="border-t border-[#1e2d40] mt-16 py-8 text-center">
        <p className="text-[#6b7280] text-xs">
          <Link href="/" className="hover:text-[#00ff88] transition-colors">ReactDevMastery</Link>
          {' · '}
          <Link href="/privacy" className="hover:text-[#9ca3af] transition-colors">Privacy</Link>
          {' · '}
          <Link href="/terms" className="hover:text-[#9ca3af] transition-colors">Terms</Link>
        </p>
      </div>
    </div>
  );
}
