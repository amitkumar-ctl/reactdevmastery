/**
 * generate-seo.js
 * Run after `npm run build` to inject unique SEO meta tags
 * into pre-rendered HTML files for all 260 public routes.
 *
 * Usage: node scripts/generate-seo.js
 *
 * What it does:
 * 1. Reads the built index.html
 * 2. For each topic and concept, creates a folder + index.html
 *    with the correct <title>, <meta description>, and OG tags
 * 3. Cloudflare Pages / Netlify / any static host will serve
 *    these files directly — Google gets real HTML immediately
 */

const fs = require('fs');
const path = require('path');
const { CONCEPTS, FAQS, ARCHITECT_CASES = [] } = require('reactdevmastery-content/data');
const BUILD_DIR = path.join(__dirname, '..', 'build');
const BASE_URL = 'https://reactdevmastery.com';

// ── Read base index.html ───────────────────────────────────────────────
const baseHtml = fs.readFileSync(path.join(BUILD_DIR, 'index.html'), 'utf-8');

const escapeAttr = (str) => String(str)
  .replace(/&/g, '&amp;').replace(/"/g, '&quot;')
  .replace(/</g, '&lt;').replace(/>/g, '&gt;');

function injectMeta(html, { title, description, url }) {
  const fullTitle = escapeAttr(`${title} | ReactDevMastery`);
  description = escapeAttr(description);
  const ogImage = `${BASE_URL}/logo512.png`;

  const metaTags = `
    <title>${fullTitle}</title>
    <meta name="description" content="${description}" />
    <link rel="canonical" href="${url}" />
    <meta property="og:title" content="${fullTitle}" />
    <meta property="og:description" content="${description}" />
    <meta property="og:url" content="${url}" />
    <meta property="og:image" content="${ogImage}" />
    <meta property="og:type" content="website" />
    <meta name="twitter:card" content="summary" />
    <meta name="twitter:title" content="${fullTitle}" />
    <meta name="twitter:description" content="${description}" />`;

  // Strip the homepage's title/description/canonical/social tags, then add page-specific ones
  return html
    .replace(/<title>.*?<\/title>/, '')
    .replace(/<meta name="description"[^>]*>/, '')
    .replace(/<link rel="canonical"[^>]*>/, '')
    .replace(/<meta property="og:(title|description|url|image|type)"[^>]*>/g, '')
    .replace(/<meta name="twitter:[^"]*"[^>]*>/g, '')
    .replace('</head>', `${metaTags}\n  </head>`);
}

function writeRoute(routePath, meta) {
  const dir = path.join(BUILD_DIR, routePath);
  fs.mkdirSync(dir, { recursive: true });
  const html = injectMeta(baseHtml, meta);
  fs.writeFileSync(path.join(dir, 'index.html'), html);
}

let count = 0;

// ── Generate topic pages ──────────────────────────────────────────────
Object.entries(CONCEPTS).forEach(([topicId, topic]) => {
  writeRoute(topicId, {
    title: `${topic.title} — ${topic.items.length} Concepts`,
    description: `Master ${topic.title} for senior frontend interviews. ${topic.items.length} in-depth concepts with interactive visualizers, code examples, and real interview Q&As.`,
    url: `${BASE_URL}/${topicId}`,
  });
  count++;

  // ── Generate concept pages ──────────────────────────────────────────
  topic.items.forEach(item => {
    const faqCount = (FAQS[item.id] || []).length;
    writeRoute(`${topicId}/${item.id}`, {
      title: `${item.title} — ${topic.title}`,
      description: `${item.desc}${faqCount > 0 ? ` Includes ${faqCount} interview Q&As.` : ''} Senior frontend interview prep with interactive visualizer and code examples.`,
      url: `${BASE_URL}/${topicId}/${item.id}`,
    });
    count++;
  });
});

// ── Generate Architect (frontend system design) pages ─────────────────
if (ARCHITECT_CASES.length) {
  writeRoute('architect', {
    title: 'Frontend System Design Interview — Case Studies',
    description: `Frontend system design interview prep: ${ARCHITECT_CASES.length} case studies (news feed, autocomplete, chat…) using the RADIO framework, with animated architecture diagrams and React trade-offs.`,
    url: `${BASE_URL}/architect`,
  });
  count++;
  ARCHITECT_CASES.forEach(c => {
    writeRoute(`architect/${c.id}`, {
      title: `${c.title} — Frontend System Design`,
      description: `${c.title} (${c.subtitle}): a complete frontend system design interview answer covering requirements, architecture, data model, API and optimizations.`,
      url: `${BASE_URL}/architect/${c.id}`,
    });
    count++;
  });
}

// ── Generate sitemap.xml ──────────────────────────────────────────────
const staticPages = ['/', '/timeline', '/leaderboard', '/privacy', '/terms'];
const allUrls = [
  ...staticPages.map(p => ({ url: `${BASE_URL}${p}`, priority: p === '/' ? '1.0' : '0.5', freq: 'monthly' })),
  ...Object.keys(CONCEPTS).map(id => ({ url: `${BASE_URL}/${id}`, priority: '0.8', freq: 'weekly' })),
    ...(ARCHITECT_CASES.length ? [{ url: `${BASE_URL}/architect`, priority: '0.9', freq: 'weekly' }] : []),
  ...ARCHITECT_CASES.map(c => ({ url: `${BASE_URL}/architect/${c.id}`, priority: '0.9', freq: 'weekly' })),
  ...Object.entries(CONCEPTS).flatMap(([topicId, topic]) =>
    topic.items.map(item => ({ url: `${BASE_URL}/${topicId}/${item.id}`, priority: '0.9', freq: 'weekly' }))
  ),
];

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allUrls.map(({ url, priority, freq }) => `  <url>
    <loc>${url}</loc>
    <changefreq>${freq}</changefreq>
    <priority>${priority}</priority>
    <lastmod>${new Date().toISOString().slice(0, 10)}</lastmod>
  </url>`).join('\n')}
</urlset>`;

fs.writeFileSync(path.join(BUILD_DIR, 'sitemap.xml'), sitemap);

// ── Generate robots.txt ───────────────────────────────────────────────
const robots = `User-agent: *
Allow: /

Sitemap: ${BASE_URL}/sitemap.xml`;

fs.writeFileSync(path.join(BUILD_DIR, 'robots.txt'), robots);

console.log(`✅ SEO generation complete`);
console.log(`   ${count} HTML files generated (${Object.keys(CONCEPTS).length} topics + ${count - Object.keys(CONCEPTS).length} concepts)`);
console.log(`   sitemap.xml — ${allUrls.length} URLs`);
console.log(`   robots.txt`);