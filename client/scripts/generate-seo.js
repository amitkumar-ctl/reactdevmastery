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
const { CONCEPTS, FAQS } = require('reactdevmastery-content/data');

const BUILD_DIR = path.join(__dirname, '..', 'build');
const BASE_URL = 'https://reactdevmastery.com';

// ── Read base index.html ───────────────────────────────────────────────
const baseHtml = fs.readFileSync(path.join(BUILD_DIR, 'index.html'), 'utf-8');

function injectMeta(html, { title, description, url }) {
  const fullTitle = `${title} | ReactDevMastery`;
  const ogImage = `${BASE_URL}/logo192.png`;

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

  // Replace default title and description with page-specific ones
  return html
    .replace(/<title>.*?<\/title>/, '')
    .replace(/<meta name="description"[^>]*>/, '')
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

// ── Generate sitemap.xml ──────────────────────────────────────────────
const staticPages = ['/', '/login', '/register', '/leaderboard', '/privacy', '/terms'];
const allUrls = [
  ...staticPages.map(p => ({ url: `${BASE_URL}${p}`, priority: p === '/' ? '1.0' : '0.5', freq: 'monthly' })),
  ...Object.keys(CONCEPTS).map(id => ({ url: `${BASE_URL}/${id}`, priority: '0.8', freq: 'weekly' })),
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