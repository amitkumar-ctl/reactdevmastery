/**
 * generate-seo.js — runs after `react-scripts build` (npm "postbuild").
 *
 * The app is client-rendered, so without this every URL would ship the same
 * empty <div id="root"></div>. For each public route this script writes
 * build/<route>/index.html containing:
 *
 *   1. Unique <title>, description, canonical, Open Graph / Twitter tags
 *   2. JSON-LD (Organization/WebSite, BreadcrumbList, FAQPage, ItemList, …)
 *   3. The page's REAL CONTENT as plain HTML inside #root — explanation,
 *      interview Q&As, code, and links to related pages. React's createRoot()
 *      replaces it on mount, so users never see it, but Google, Bing and AI
 *      crawlers get a full, linkable page on the first request.
 *
 * It also writes sitemap.xml, robots.txt, 404.html and shells for the
 * app-only routes (login, profile …) so the host can return a real 404 for
 * unknown URLs instead of serving the homepage with status 200.
 *
 * Usage: node scripts/generate-seo.js
 */

const fs = require('fs');
const path = require('path');
const { CONCEPTS, FAQS, CONTENT = {}, ARCHITECT_CASES = [] } = require('reactdevmastery-content/data');
const { conceptTitle, topicTitle, architectHubTitle, architectCaseTitle } = require('../src/seo/titles');

const BUILD_DIR = path.join(__dirname, '..', 'build');
const BASE_URL = 'https://reactdevmastery.com';
const SITE = 'ReactDevMastery';
const TODAY = new Date().toISOString().slice(0, 10);
// Keep in sync with GUEST_FREE_CASES in src/pages/architect/ArchitectPages.jsx:
// crawlers get the same content a logged-out visitor can read, never more.
const GUEST_FREE_CASES = 3;

const baseHtml = fs.readFileSync(path.join(BUILD_DIR, 'index.html'), 'utf-8');

// ── Small HTML helpers ─────────────────────────────────────────────────
const esc = (str) => String(str ?? '')
  .replace(/&/g, '&amp;').replace(/"/g, '&quot;')
  .replace(/</g, '&lt;').replace(/>/g, '&gt;');

const arr = (v) => (Array.isArray(v) ? v : []);
const truncate = (s, n) => (s.length <= n ? s : `${s.slice(0, n - 1).replace(/\s+\S*$/, '')}…`);
const plain = (s) => String(s ?? '').replace(/\s+/g, ' ').trim();
const link = (href, text) => `<a href="${esc(href)}">${esc(text)}</a>`;

// Turns the content package's lightly formatted text (blank-line paragraphs,
// "- " bullets, "1. " steps) into HTML.
function textToHtml(text) {
  return String(text ?? '').trim().split(/\n\s*\n/).map((block) => {
    const lines = block.split('\n').map((l) => l.trim()).filter(Boolean);
    const isUl = lines.length && lines.every((l) => /^[-•*]\s+/.test(l));
    const isOl = lines.length && lines.every((l) => /^\d+[.)]\s+/.test(l));
    if (isUl) return `<ul>${lines.map((l) => `<li>${esc(l.replace(/^[-•*]\s+/, ''))}</li>`).join('')}</ul>`;
    if (isOl) return `<ol>${lines.map((l) => `<li>${esc(l.replace(/^\d+[.)]\s+/, ''))}</li>`).join('')}</ol>`;
    // Mixed block: a lead-in line followed by bullets/steps
    const out = []; let list = null;
    for (const l of lines) {
      const ul = /^[-•*]\s+/.test(l); const ol = /^\d+[.)]\s+/.test(l);
      if (ul || ol) {
        const tag = ul ? 'ul' : 'ol';
        if (!list || list.tag !== tag) { list = { tag, items: [] }; out.push(list); }
        list.items.push(l.replace(/^([-•*]|\d+[.)])\s+/, ''));
      } else { list = null; out.push(l); }
    }
    return out.map((o) => (typeof o === 'string'
      ? `<p>${esc(o)}</p>`
      : `<${o.tag}>${o.items.map((i) => `<li>${esc(i)}</li>`).join('')}</${o.tag}>`)).join('');
  }).join('\n');
}

const jsonLd = (obj) => `<script type="application/ld+json">${JSON.stringify(obj).replace(/</g, '\\u003c')}</script>`;

const breadcrumb = (crumbs) => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: crumbs.map((c, i) => ({ '@type': 'ListItem', position: i + 1, name: c.name, item: `${BASE_URL}${c.path}` })),
});

const crumbNav = (crumbs) => `<nav class="ssr-crumbs" aria-label="Breadcrumb">${crumbs
  .map((c, i) => (i === crumbs.length - 1 ? `<span>${esc(c.name)}</span>` : link(c.path, c.name))).join(' › ')}</nav>`;

// Minimal styling for the pre-rendered markup (only visible for the moment
// before the app mounts, or to no-JS clients). Matches the app's dark theme.
const SSR_STYLE = `<style>
.ssr{max-width:860px;margin:0 auto;padding:32px 20px 64px;color:#cbd5e1;font:16px/1.65 system-ui,-apple-system,Segoe UI,Roboto,sans-serif}
.ssr h1{color:#f1f5f9;font-size:30px;line-height:1.25;margin:12px 0}.ssr h2{color:#e2e8f0;font-size:21px;margin:32px 0 10px}
.ssr h3{color:#e2e8f0;font-size:17px;margin:20px 0 6px}.ssr a{color:#4facfe}.ssr pre{background:#0f172a;border:1px solid #1e2d40;border-radius:8px;padding:14px;overflow:auto;font-size:13px}
.ssr-crumbs{font-size:13px;color:#64748b}.ssr .lede{font-size:18px;color:#94a3b8}.ssr li{margin:4px 0}.ssr dt{font-weight:600;color:#e2e8f0;margin-top:14px}.ssr dd{margin:4px 0 0}
.ssr table{border-collapse:collapse;width:100%;font-size:14px}.ssr td,.ssr th{border:1px solid #1e2d40;padding:6px 8px;text-align:left;vertical-align:top}
</style>`;

// ── Page writer ────────────────────────────────────────────────────────
function render({ title, description, url, body = '', schema = [], noindex = false, rawTitle = false }) {
  const fullTitle = esc(rawTitle ? title : `${title} | ${SITE}`);
  const desc = esc(truncate(plain(description), 160));
  const ogImage = `${BASE_URL}/logo512.png`;

  const head = `
    <title>${fullTitle}</title>
    <meta name="description" content="${desc}" />
    ${noindex ? '<meta name="robots" content="noindex, follow" />' : `<link rel="canonical" href="${url}" />`}
    <meta property="og:site_name" content="${SITE}" />
    <meta property="og:title" content="${fullTitle}" />
    <meta property="og:description" content="${desc}" />
    <meta property="og:url" content="${url}" />
    <meta property="og:image" content="${ogImage}" />
    <meta property="og:type" content="${schema.some((s) => s['@type'] === 'TechArticle') ? 'article' : 'website'}" />
    <meta name="twitter:card" content="summary" />
    <meta name="twitter:title" content="${fullTitle}" />
    <meta name="twitter:description" content="${desc}" />
    ${schema.map(jsonLd).join('\n    ')}
    ${body ? SSR_STYLE : ''}`;

  // Strip the homepage's own tags, then add the page-specific ones.
  return baseHtml
    .replace(/<title>.*?<\/title>/s, '')
    .replace(/<meta name="description"[^>]*>/, '')
    .replace(/<meta name="robots"[^>]*>/, '')
    .replace(/<link rel="canonical"[^>]*>/, '')
    .replace(/<meta property="og:[^"]*"[^>]*>/g, '')
    .replace(/<meta name="twitter:[^"]*"[^>]*>/g, '')
    .replace(/<script type="application\/ld\+json">.*?<\/script>/gs, '')
    .replace('</head>', `${head}\n  </head>`)
    .replace(/<noscript>.*?<\/noscript>/s, '')
    .replace(/<div id="root">(?:<main class="ssr">[\s\S]*?<\/main>)?<\/div>/, () => `<div id="root">${body ? `<main class="ssr">${body}</main>` : ''}</div>`);
}

const written = [];
function writeRoute(routePath, page, { sitemap = true, priority = '0.8' } = {}) {
  const dir = path.join(BUILD_DIR, routePath);
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, 'index.html'), render(page));
  if (sitemap && !page.noindex) written.push({ url: page.url, priority });
}

const topicEntries = Object.entries(CONCEPTS);
const conceptCount = topicEntries.reduce((n, [, t]) => n + t.items.length, 0);
const faqCount = Object.values(FAQS).reduce((n, f) => n + arr(f).length, 0);
const diffLabel = { easy: 'Easy', medium: 'Medium', hard: 'Hard' };

const siteSchema = [
  {
    '@context': 'https://schema.org', '@type': 'WebSite', name: SITE, url: `${BASE_URL}/`,
    description: 'Free senior frontend interview prep: JavaScript, React, TypeScript and frontend system design.',
  },
  {
    '@context': 'https://schema.org', '@type': 'Organization', name: SITE, url: `${BASE_URL}/`, logo: `${BASE_URL}/logo512.png`,
  },
];

// ── Homepage ───────────────────────────────────────────────────────────
{
  const body = `
<h1>Senior Frontend Interview Prep — JavaScript, React &amp; System Design</h1>
<p class="lede">${conceptCount}+ in-depth concepts, ${faqCount}+ real interview questions with answers, animated visualizers and ${ARCHITECT_CASES.length} frontend system design case studies. Free, no paywall.</p>
<h2>Topics</h2>
<ul>${topicEntries.map(([id, t]) => `<li>${link(`/${id}`, `${t.title} interview questions`)} — ${t.items.length} concepts: ${esc(t.items.slice(0, 4).map((i) => i.title).join(', '))}…</li>`).join('')}</ul>
${ARCHITECT_CASES.length ? `<h2>Frontend system design interview</h2>
<p>${link('/architect', 'All case studies')}: how to design real products with React, using the RADIO framework.</p>
<ul>${ARCHITECT_CASES.map((c) => `<li>${link(`/architect/${c.id}`, c.title)} — ${esc(c.subtitle)}</li>`).join('')}</ul>` : ''}
<h2>Most asked</h2>
<ul>${topicEntries.flatMap(([id, t]) => t.items.filter((i) => i.diff === 'hard').slice(0, 2).map((i) => `<li>${link(`/${id}/${i.id}`, i.title)}</li>`)).join('')}</ul>`;
  fs.writeFileSync(path.join(BUILD_DIR, 'index.html'), render({
    title: `${SITE} — Free Senior Frontend Interview Prep`, // = DEFAULT_TITLE in App.js
    rawTitle: true,
    description: `Free senior frontend interview prep: ${conceptCount}+ JavaScript, React, TypeScript and system design concepts, ${faqCount}+ interview Q&As, and animated visualizers. No paywall.`,
    url: `${BASE_URL}/`,
    body,
    schema: siteSchema,
  }));
  written.push({ url: `${BASE_URL}/`, priority: '1.0' });
}

// ── Topic + concept pages ──────────────────────────────────────────────
topicEntries.forEach(([topicId, topic]) => {
  const topicPath = `/${topicId}`;
  writeRoute(topicId, {
    title: topicTitle(topic),
    description: `${topic.title} interview questions for senior frontend developers: ${topic.items.length} concepts explained with code, animated visualizers and real interview Q&As — ${topic.items.slice(0, 3).map((i) => i.title).join(', ')} and more.`,
    url: `${BASE_URL}${topicPath}`,
    body: `${crumbNav([{ name: 'Home', path: '/' }, { name: topic.title, path: topicPath }])}
<h1>${esc(topic.title)} Interview Questions</h1>
<p class="lede">${topic.items.length} concepts every senior frontend engineer should be able to explain, each with interview questions, code examples and a visual walkthrough.</p>
<ol>${topic.items.map((i) => `<li><h2>${link(`${topicPath}/${i.id}`, i.title)}</h2><p>${esc(i.desc)} <em>(${diffLabel[i.diff] || i.diff}${arr(FAQS[i.id]).length ? `, ${arr(FAQS[i.id]).length} interview Q&amp;As` : ''})</em></p></li>`).join('')}</ol>
<h2>Other topics</h2>
<ul>${topicEntries.filter(([id]) => id !== topicId).map(([id, t]) => `<li>${link(`/${id}`, t.title)}</li>`).join('')}</ul>`,
    schema: [
      breadcrumb([{ name: 'Home', path: '/' }, { name: topic.title, path: topicPath }]),
      {
        '@context': 'https://schema.org', '@type': 'ItemList', name: `${topic.title} interview questions`,
        itemListElement: topic.items.map((i, idx) => ({ '@type': 'ListItem', position: idx + 1, name: i.title, url: `${BASE_URL}${topicPath}/${i.id}` })),
      },
    ],
  }, { priority: '0.8' });

  topic.items.forEach((item, idx) => {
    const conceptPath = `${topicPath}/${item.id}`;
    const faqs = arr(FAQS[item.id]);
    const content = CONTENT[item.id] || {};
    const prev = topic.items[idx - 1];
    const next = topic.items[idx + 1];
    const related = topic.items.filter((i) => i.id !== item.id && i.id !== prev?.id && i.id !== next?.id).slice(0, 6);
    const crumbs = [{ name: 'Home', path: '/' }, { name: topic.title, path: topicPath }, { name: item.title, path: conceptPath }];

    const body = `${crumbNav(crumbs)}
<article>
<h1>${esc(item.title)}</h1>
<p class="lede">${esc(item.desc)}</p>
<p>Difficulty: ${diffLabel[item.diff] || esc(item.diff)} · Topic: ${link(topicPath, topic.title)}</p>
${content.explanation ? `<h2>${esc(item.title)} explained</h2>\n${textToHtml(content.explanation)}` : ''}
${content.code ? `<h2>Code example</h2>\n<pre><code>${esc(content.code)}</code></pre>` : ''}
${content.tips ? `<h2>Interview tips &amp; common traps</h2>\n${textToHtml(content.tips)}` : ''}
${faqs.length ? `<h2>${esc(item.title)} interview questions</h2>\n<dl>${faqs.map((f) => `<dt>${esc(f.q)}</dt><dd>${textToHtml(f.a)}</dd>`).join('')}</dl>` : ''}
</article>
<nav aria-label="More ${esc(topic.title)} concepts">
${prev ? `<p>← Previous: ${link(`${topicPath}/${prev.id}`, prev.title)}</p>` : ''}${next ? `<p>Next: ${link(`${topicPath}/${next.id}`, next.title)} →</p>` : ''}
${related.length ? `<h2>Related ${esc(topic.title)} concepts</h2><ul>${related.map((r) => `<li>${link(`${topicPath}/${r.id}`, r.title)} — ${esc(r.desc)}</li>`).join('')}</ul>` : ''}
</nav>`;

    const schema = [
      breadcrumb(crumbs),
      {
        '@context': 'https://schema.org', '@type': 'TechArticle',
        headline: item.title, description: item.desc, url: `${BASE_URL}${conceptPath}`,
        about: topic.title, proficiencyLevel: item.diff === 'easy' ? 'Beginner' : 'Expert',
        isAccessibleForFree: true, dateModified: TODAY,
        author: { '@type': 'Organization', name: SITE, url: `${BASE_URL}/` },
        publisher: { '@type': 'Organization', name: SITE, logo: { '@type': 'ImageObject', url: `${BASE_URL}/logo512.png` } },
      },
    ];
    if (faqs.length) {
      schema.push({
        '@context': 'https://schema.org', '@type': 'FAQPage',
        mainEntity: faqs.map((f) => ({ '@type': 'Question', name: plain(f.q), acceptedAnswer: { '@type': 'Answer', text: plain(f.a) } })),
      });
    }

    writeRoute(`${topicId}/${item.id}`, {
      title: conceptTitle(item, topic),
      description: `${item.desc}${faqs.length ? ` ${faqs.length} interview questions with answers` : ' Explained'}, plus code examples and an animated visualizer.`,
      url: `${BASE_URL}${conceptPath}`,
      body,
      schema,
    }, { priority: '0.9' });
  });
});

// ── Architect (frontend system design) pages ───────────────────────────
function renderCaseBody(c) {
  const r = c.requirements || {}; const a = c.architecture || {}; const d = c.dataModel || {}; const api = c.api || {};
  return `
<h2>Clarifying questions to ask first</h2>
<dl>${arr(c.clarify).map((q) => `<dt>${esc(q.q)}</dt><dd>${esc(q.why)}${q.assume ? ` <em>Assume: ${esc(q.assume)}</em>` : ''}</dd>`).join('')}</dl>
<h2>Requirements</h2>
<h3>Functional</h3><ul>${arr(r.functional).map((x) => `<li>${esc(x)}</li>`).join('')}</ul>
<h3>Non-functional</h3><ul>${arr(r.nonFunctional).map((x) => `<li>${typeof x === 'string' ? esc(x) : `<strong>${esc(x.name)}:</strong> ${esc(x.target)}`}</li>`).join('')}</ul>
${arr(r.outOfScope).length ? `<h3>Out of scope</h3><ul>${arr(r.outOfScope).map((x) => `<li>${esc(x)}</li>`).join('')}</ul>` : ''}
<h2>Architecture</h2><p>${esc(a.intro)}</p>
<ul>${arr(a.layers).map((l) => `<li><strong>${esc(l.name)}:</strong> ${esc(l.detail)}</li>`).join('')}</ul>
${arr(a.decisions).length ? `<h3>Key decisions</h3><ul>${arr(a.decisions).map((x) => `<li><strong>${esc(x.title)}:</strong> ${esc(x.choice)}. ${esc(x.why)}${x.react ? ` <em>In React: ${esc(x.react)}</em>` : ''}</li>`).join('')}</ul>` : ''}
<h2>Data model</h2><p>${esc(d.intro)}</p>
${arr(d.entities).map((e) => `<h3>${esc(e.name)}</h3><pre><code>${esc(e.shape)}</code></pre>`).join('')}
${arr(d.stateMap).length ? `<h3>Where each piece of state lives</h3><table><tr><th>State</th><th>Lives in</th><th>Tool</th><th>Why</th></tr>${arr(d.stateMap).map((s) => `<tr><td>${esc(s.state)}</td><td>${esc(s.lives)}</td><td>${esc(s.tool)}</td><td>${esc(s.why)}</td></tr>`).join('')}</table>` : ''}
<h2>API design</h2><p>${esc(api.intro)}</p>
<ul>${arr(api.endpoints).map((e) => `<li><code>${esc(e.method)} ${esc(e.path)}</code> — ${esc(e.purpose)}</li>`).join('')}</ul>
${arr(api.notes).length ? `<ul>${arr(api.notes).map((n) => `<li>${esc(n)}</li>`).join('')}</ul>` : ''}
<h2>Optimizations</h2>
${arr(c.optimizations).map((o) => `<h3>${esc(o.area)}</h3><ul>${arr(o.points).map((p) => `<li><strong>${esc(p.title)}:</strong> ${esc(p.detail)}${p.react ? ` <em>React: ${esc(p.react)}</em>` : ''}</li>`).join('')}</ul>`).join('')}
<h2>Trade-offs</h2>
${arr(c.tradeoffs).map((t) => `<h3>${esc(t.topic)}</h3><ul>${arr(t.options).map((o) => `<li><strong>${esc(o.name)}:</strong> ${esc(o.when)}</li>`).join('')}</ul>${t.verdict ? `<p><strong>Verdict:</strong> ${esc(t.verdict)}</p>` : ''}`).join('')}
<h2>Follow-up questions interviewers ask</h2>
<dl>${arr(c.followUps).map((f) => `<dt>${esc(f.q)}</dt><dd>${esc(f.a)}</dd>`).join('')}</dl>
<h2>Common mistakes</h2><ul>${arr(c.mistakes).map((m) => `<li>${esc(m)}</li>`).join('')}</ul>`;
}

if (ARCHITECT_CASES.length) {
  const hubCrumbs = [{ name: 'Home', path: '/' }, { name: 'Frontend System Design', path: '/architect' }];
  writeRoute('architect', {
    title: architectHubTitle(ARCHITECT_CASES.length),
    description: `Frontend system design interview prep: ${ARCHITECT_CASES.length} React case studies (${ARCHITECT_CASES.slice(0, 4).map((c) => c.title.replace(/^Design an? /, '')).join(', ')}…) using the RADIO framework, with animated architecture diagrams and trade-offs.`,
    url: `${BASE_URL}/architect`,
    body: `${crumbNav(hubCrumbs)}
<h1>Frontend System Design Interview — React Case Studies</h1>
<p class="lede">"How would you build Facebook's feed with React?" Senior frontend interviews now include system design. Each case study walks through a complete answer using the RADIO framework: Requirements, Architecture, Data model, Interface (API) and Optimizations.</p>
<ol>${ARCHITECT_CASES.map((c) => `<li><h2>${link(`/architect/${c.id}`, c.title)}</h2><p>${esc(c.subtitle)} · ${esc(c.duration)} · ${esc(c.difficulty)}</p><p>${esc(c.summary)}</p></li>`).join('')}</ol>`,
    schema: [
      breadcrumb(hubCrumbs),
      {
        '@context': 'https://schema.org', '@type': 'ItemList', name: 'Frontend system design interview case studies',
        itemListElement: ARCHITECT_CASES.map((c, i) => ({ '@type': 'ListItem', position: i + 1, name: c.title, url: `${BASE_URL}/architect/${c.id}` })),
      },
    ],
  }, { priority: '0.9' });

  ARCHITECT_CASES.forEach((c, idx) => {
    const casePath = `/architect/${c.id}`;
    const free = idx < GUEST_FREE_CASES;
    const crumbs = [...hubCrumbs, { name: c.title, path: casePath }];
    const others = ARCHITECT_CASES.filter((o) => o.id !== c.id);
    writeRoute(`architect/${c.id}`, {
      title: architectCaseTitle(c),
      description: `${c.title} (${c.subtitle}) — frontend system design interview answer: ${c.summary}`,
      url: `${BASE_URL}${casePath}`,
      body: `${crumbNav(crumbs)}
<article>
<h1>${esc(c.title)}: Frontend System Design Interview</h1>
<p class="lede">${esc(c.subtitle)} · ${esc(c.duration)} · ${esc(c.difficulty)}</p>
<p>${esc(c.summary)}</p>
<blockquote>${esc(c.prompt)}</blockquote>
<p>Topics covered: ${arr(c.tags).map(esc).join(', ')}.</p>
${free ? renderCaseBody(c) : `<p>This case study walks through clarifying questions, requirements, architecture, data model, API design, optimizations, trade-offs and follow-up questions. ${link(`/login?next=${encodeURIComponent(casePath)}`, 'Log in free')} to read the full answer.</p>`}
</article>
<h2>More frontend system design case studies</h2>
<ul>${others.map((o) => `<li>${link(`/architect/${o.id}`, o.title)} — ${esc(o.subtitle)}</li>`).join('')}</ul>`,
      schema: [
        breadcrumb(crumbs),
        {
          '@context': 'https://schema.org', '@type': 'TechArticle',
          headline: `${c.title}: Frontend System Design Interview`, description: c.summary, url: `${BASE_URL}${casePath}`,
          keywords: arr(c.tags).join(', '), isAccessibleForFree: free, dateModified: TODAY,
          author: { '@type': 'Organization', name: SITE, url: `${BASE_URL}/` },
          publisher: { '@type': 'Organization', name: SITE, logo: { '@type': 'ImageObject', url: `${BASE_URL}/logo512.png` } },
        },
        ...(free && arr(c.followUps).length ? [{
          '@context': 'https://schema.org', '@type': 'FAQPage',
          mainEntity: arr(c.followUps).map((f) => ({ '@type': 'Question', name: plain(f.q), acceptedAnswer: { '@type': 'Answer', text: plain(f.a) } })),
        }] : []),
      ],
    }, { priority: '0.9' });
  });
}

// ── Static public pages (rendered by the app; give them proper meta) ──
const STATIC_PUBLIC = [
  ['timeline', 'React History', 'The history of React from 2013 to today: every major release, what changed and why it matters in interviews.'],
  ['leaderboard', 'Leaderboard', 'Top learners on ReactDevMastery, ranked by concepts completed and quiz scores.'],
  ['daily', 'Daily Challenge', 'A new JavaScript or React interview challenge every day.'],
  ['privacy', 'Privacy Policy', 'How ReactDevMastery collects, uses and protects your data.'],
  ['terms', 'Terms of Service', 'The terms for using ReactDevMastery.'],
];
STATIC_PUBLIC.forEach(([route, title, description]) => {
  writeRoute(route, { title, description, url: `${BASE_URL}/${route}` }, { priority: route === 'timeline' ? '0.6' : '0.3' });
});

// ── App-only routes: real files so no catch-all rewrite is needed ─────
// (lets unknown URLs return a true 404 instead of the homepage with 200)
['login', 'register', 'forgot-password', 'flashcards', 'profile', 'quiz'].forEach((route) => {
  writeRoute(route, { title: route.replace('-', ' ').replace(/^./, (s) => s.toUpperCase()), description: 'ReactDevMastery', url: `${BASE_URL}/${route}`, noindex: true }, { sitemap: false });
});

// ── 404 page ───────────────────────────────────────────────────────────
fs.writeFileSync(path.join(BUILD_DIR, '404.html'), render({
  title: 'Page not found',
  description: 'This page does not exist.',
  url: `${BASE_URL}/404`,
  noindex: true,
  body: `<h1>Page not found</h1><p>${link('/', 'Go to the homepage')} or pick a topic:</p><ul>${topicEntries.map(([id, t]) => `<li>${link(`/${id}`, t.title)}</li>`).join('')}</ul>`,
}));

// ── sitemap.xml + robots.txt ───────────────────────────────────────────
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${written.map(({ url, priority }) => `  <url><loc>${url}</loc><lastmod>${TODAY}</lastmod><priority>${priority}</priority></url>`).join('\n')}
</urlset>
`;
fs.writeFileSync(path.join(BUILD_DIR, 'sitemap.xml'), sitemap);

fs.writeFileSync(path.join(BUILD_DIR, 'robots.txt'), `User-agent: *
Allow: /
Disallow: /profile
Disallow: /reset-password/

Sitemap: ${BASE_URL}/sitemap.xml
`);

console.log('✅ SEO generation complete');
console.log(`   ${written.length} indexable pages pre-rendered with content (${topicEntries.length} topics, ${conceptCount} concepts, ${ARCHITECT_CASES.length} case studies)`);
console.log(`   sitemap.xml — ${written.length} URLs · robots.txt · 404.html`);
