import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { CONCEPTS, FAQS, QUIZZES } from 'reactdevmastery-content/data';

type ConceptItem = { id: string; title: string; desc: string; diff: string };
type Topic = { title: string; color: string; items: ConceptItem[] };
const concepts = CONCEPTS as Record<string, Topic>;

interface Props {
  params: Promise<{ topicId: string; conceptId: string }>;
}

// ── Generate all 226 concept pages at build time ───────────────────────
export async function generateStaticParams() {
  const params: { topicId: string; conceptId: string }[] = [];
  Object.entries(concepts).forEach(([topicId, topic]) => {
    topic.items.forEach((item) => {
      params.push({ topicId, conceptId: item.id });
    });
  });
  return params;
}

// ── Unique metadata per concept ────────────────────────────────────────
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { topicId, conceptId } = await params;
  const topic = concepts[topicId];
  const item = topic?.items.find((i) => i.id === conceptId);
  if (!topic || !item) return {};

  const faqCount = FAQS[conceptId]?.length ?? 0;
  const quizCount = QUIZZES[conceptId]?.length ?? 0;

  return {
    title: `${item.title} — ${topic.title}`,
    description: `${item.desc} ${faqCount > 0 ? `Includes ${faqCount} interview Q&As` : ''} with interactive visualizer and code examples. Senior frontend interview prep.`,
    openGraph: {
      title: `${item.title} | ReactDevMastery`,
      description: item.desc,
    },
    // JSON-LD structured data for this concept
    other: {
      'application-name': 'ReactDevMastery',
    },
  };
}

const diffLabel: Record<string, { label: string; classes: string }> = {
  hard:   { label: 'Hard',   classes: 'text-red-400 border-red-400/30 bg-red-400/10' },
  medium: { label: 'Medium', classes: 'text-orange-400 border-orange-400/30 bg-orange-400/10' },
  easy:   { label: 'Easy',   classes: 'text-green-400 border-green-400/30 bg-green-400/10' },
};

// ── Concept page ───────────────────────────────────────────────────────
export default async function ConceptPage({ params }: Props) {
  const { topicId, conceptId } = await params;
  const topic = concepts[topicId];
  const item = topic?.items.find((i) => i.id === conceptId);
  if (!topic || !item) notFound();

  const faqs = (FAQS[conceptId] ?? []) as { q: string; a: string }[];
  const quizzes = (QUIZZES[conceptId] ?? []) as { q: string; opts: string[]; correct: number; explain: string }[];
  const diff = diffLabel[item.diff] ?? diffLabel.easy;

  // Find prev/next for navigation
  const currentIndex = topic.items.findIndex((i) => i.id === conceptId);
  const prevItem = topic.items[currentIndex - 1];
  const nextItem = topic.items[currentIndex + 1];

  return (
    <div className="min-h-screen bg-[#0a0e1a] text-[#e2e8f0] font-mono">

      {/* Header */}
      <div className="border-b border-[#1e2d40] bg-[#060910] sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-4 flex items-center gap-2 flex-wrap">
          <Link href="/" className="text-[#9ca3af] hover:text-[#e2e8f0] text-xs transition-colors">
            ReactDevMastery
          </Link>
          <span className="text-[#1e2d40] text-xs">/</span>
          <Link href={`/${topicId}`} className="text-[#9ca3af] hover:text-[#e2e8f0] text-xs transition-colors">
            {topic.title}
          </Link>
          <span className="text-[#1e2d40] text-xs">/</span>
          <span className="text-[#e2e8f0] text-xs font-semibold truncate max-w-[200px]">{item.title}</span>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">

        {/* Concept header */}
        <div className="mb-8">
          <div className="flex flex-wrap items-center gap-3 mb-3">
            <span
              className="text-xs font-bold tracking-wider uppercase px-2.5 py-1 rounded-full border"
              style={{ color: topic.color, borderColor: topic.color + '40', background: topic.color + '15' }}
            >
              {topic.title}
            </span>
            <span className={`text-[10px] font-bold uppercase px-2.5 py-1 rounded-full border ${diff.classes}`}>
              {diff.label}
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white mb-3">{item.title}</h1>
          <p className="text-[#9ca3af] text-sm leading-relaxed">{item.desc}</p>
        </div>

        {/* Sign up CTA — prominent, above the content */}
        <div className="rounded-xl border border-[#1e2d40] bg-[#0d1829] p-5 mb-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <p className="text-[#e2e8f0] text-sm font-semibold mb-1">
              Sign up free to unlock the full experience
            </p>
            <p className="text-[#9ca3af] text-xs">
              Interactive visualizer · Mark complete · Track progress · Quiz yourself
            </p>
          </div>
          <div className="flex gap-2 shrink-0">
            <Link
              href="/register"
              className="px-4 py-2 rounded-lg text-xs font-bold text-[#001a0a] bg-gradient-to-r from-[#00c853] to-[#00897b] hover:opacity-90 transition-opacity whitespace-nowrap"
            >
              Sign up free →
            </Link>
            <Link
              href="/login"
              className="px-4 py-2 rounded-lg text-xs font-semibold text-[#9ca3af] border border-[#2a3f5f] hover:border-[#4facfe] hover:text-[#4facfe] transition-colors"
            >
              Log in
            </Link>
          </div>
        </div>

        {/* FAQs — fully server-rendered, indexable by Google */}
        {faqs.length > 0 && (
          <section className="mb-8">
            <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
              <span style={{ color: topic.color }}>💬</span> Interview Q&amp;As
              <span className="text-xs font-normal text-[#6b7280] ml-1">({faqs.length})</span>
            </h2>
            <div className="space-y-4">
              {faqs.map((faq, i) => (
                <div key={i} className="rounded-xl border border-[#1e2d40] bg-[#0d1829] overflow-hidden">
                  <div className="px-5 py-4 border-b border-[#1e2d40]">
                    <p className="text-[#e2e8f0] text-sm font-semibold leading-relaxed">
                      Q: {faq.q}
                    </p>
                  </div>
                  <div className="px-5 py-4">
                    <p className="text-[#9ca3af] text-sm leading-relaxed">
                      {faq.a}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Sample quiz questions — server-rendered for SEO */}
        {quizzes.length > 0 && (
          <section className="mb-8">
            <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
              <span style={{ color: topic.color }}>🎯</span> Practice Questions
              <span className="text-xs font-normal text-[#6b7280] ml-1">({quizzes.length} available)</span>
            </h2>
            <div className="rounded-xl border border-[#1e2d40] bg-[#0d1829] p-5">
              <p className="text-[#e2e8f0] text-sm font-semibold mb-3">{quizzes[0].q}</p>
              <div className="space-y-2 mb-4">
                {(quizzes[0].opts ?? []).map((opt: string, i: number) => (
                  <div key={i} className="flex items-start gap-2.5 text-xs text-[#9ca3af]">
                    <span className="mt-0.5 shrink-0 w-4 h-4 rounded border border-[#2a3f5f] flex items-center justify-center text-[10px]">
                      {String.fromCharCode(65 + i)}
                    </span>
                    {opt}
                  </div>
                ))}
              </div>
              <Link
                href="/register"
                className="text-xs font-bold text-[#00ff88] hover:underline"
              >
                Sign up to attempt all {quizzes.length} questions and save your score →
              </Link>
            </div>
          </section>
        )}

        {/* Prev / Next navigation */}
        <div className="grid grid-cols-2 gap-3 mt-8 border-t border-[#1e2d40] pt-6">
          {prevItem ? (
            <Link
              href={`/${topicId}/${prevItem.id}`}
              className="flex flex-col gap-1 p-4 rounded-xl border border-[#1e2d40] hover:border-[#2a3f5f] transition-colors group"
            >
              <span className="text-xs text-[#6b7280]">← Previous</span>
              <span className="text-sm font-semibold text-[#e2e8f0] group-hover:text-white transition-colors">
                {prevItem.title}
              </span>
            </Link>
          ) : (
            <div />
          )}
          {nextItem ? (
            <Link
              href={`/${topicId}/${nextItem.id}`}
              className="flex flex-col gap-1 p-4 rounded-xl border border-[#1e2d40] hover:border-[#2a3f5f] transition-colors group text-right ml-auto w-full"
            >
              <span className="text-xs text-[#6b7280]">Next →</span>
              <span className="text-sm font-semibold text-[#e2e8f0] group-hover:text-white transition-colors">
                {nextItem.title}
              </span>
            </Link>
          ) : (
            <Link
              href={`/${topicId}`}
              className="flex flex-col gap-1 p-4 rounded-xl border border-[#1e2d40] hover:border-[#2a3f5f] transition-colors group text-right ml-auto w-full"
            >
              <span className="text-xs text-[#6b7280]">Back to topic</span>
              <span className="text-sm font-semibold text-[#e2e8f0] group-hover:text-white transition-colors">
                {topic.title}
              </span>
            </Link>
          )}
        </div>
      </div>

      {/* Footer */}
      <div className="border-t border-[#1e2d40] mt-8 py-8 text-center">
        <p className="text-[#6b7280] text-xs">
          <Link href="/" className="hover:text-[#00ff88] transition-colors">ReactDevMastery</Link>
          {' — Free senior frontend interview prep · '}
          <Link href={`/${topicId}`} className="hover:text-[#9ca3af] transition-colors">
            Back to {topic.title}
          </Link>
        </p>
      </div>
    </div>
  );
}
