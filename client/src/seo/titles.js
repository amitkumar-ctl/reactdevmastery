/* Page titles shared by the app (document.title in App.js) and the build-time
 * SEO generator (scripts/generate-seo.js), so the title Google sees in the raw
 * HTML and after JavaScript runs is always the same.
 *
 * Plain CommonJS on purpose: Node requires it directly at build time and
 * webpack imports it in the app. Titles lead with what people actually search
 * ("… interview questions", "frontend system design interview"), not the brand.
 */

const conceptTitle = (item) => `${item.title} Explained + Interview Questions`;

const topicTitle = (topic) => `${topic.title} Interview Questions (${topic.items.length} Concepts)`;

const architectHubTitle = (count) => `Frontend System Design Interview: ${count} React Case Studies`;

const architectCaseTitle = (cs) => `${cs.title} — Frontend System Design Interview`;

module.exports = { conceptTitle, topicTitle, architectHubTitle, architectCaseTitle };
