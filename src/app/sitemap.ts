import { MetadataRoute } from 'next';
import { getAllPosts } from '@/lib/posts';
import { absoluteUrl, toIsoDate } from '@/lib/site';

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getAllPosts();

  const postEntries: MetadataRoute.Sitemap = posts.map((post) => ({
    url: absoluteUrl(`/writing/${post.slug}`),
    lastModified: toIsoDate(post.updated ?? post.date),
    changeFrequency: 'monthly',
    priority: 0.6,
  }));

  // The home page and the writing index both list posts, so they change when
  // the newest post does. Using that date (instead of build time) keeps
  // `lastmod` truthful; a value that moves on every deploy gets ignored.
  const latestPostDate = posts
    .map((post) => toIsoDate(post.updated ?? post.date))
    .filter((date): date is string => Boolean(date))
    .sort()
    .at(-1);

  return [
    {
      url: absoluteUrl('/'),
      lastModified: latestPostDate,
      changeFrequency: 'monthly',
      priority: 1,
    },
    {
      // No reliable modification date for the resume, so none is claimed.
      url: absoluteUrl('/resume'),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: absoluteUrl('/writing'),
      lastModified: latestPostDate,
      changeFrequency: 'weekly',
      priority: 0.7,
    },
    ...postEntries,
  ];
}
