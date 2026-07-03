import { MetadataRoute } from 'next';
import { CONCEPTS } from 'reactdevmastery-content/data';
type Topic = { title: string; color: string; items: { id: string; title: string; desc: string; diff: string }[] };
const concepts = CONCEPTS as Record<string, Topic>;

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://reactdevmastery.com';

  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    { url: baseUrl, lastModified: new Date(), changeFrequency: 'weekly', priority: 1 },
    { url: `${baseUrl}/login`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.3 },
    { url: `${baseUrl}/register`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.3 },
    { url: `${baseUrl}/leaderboard`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.5 },
    { url: `${baseUrl}/privacy`, lastModified: new Date(), changeFrequency: 'yearly', priority: 0.2 },
    { url: `${baseUrl}/terms`, lastModified: new Date(), changeFrequency: 'yearly', priority: 0.2 },
  ];

  // Topic pages — one per topic
  const topicPages: MetadataRoute.Sitemap = Object.keys(concepts).map((topicId) => ({
    url: `${baseUrl}/${topicId}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  // Concept pages — one per concept item
  const conceptPages: MetadataRoute.Sitemap = [];
  Object.entries(concepts).forEach(([topicId, topic]) => {
    topic.items.forEach((item) => {
      conceptPages.push({
        url: `${baseUrl}/${topicId}/${item.id}`,
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: 0.9,
      });
    });
  });

  return [...staticPages, ...topicPages, ...conceptPages];
}
