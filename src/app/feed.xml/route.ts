import { getAllPosts } from '@/lib/posts';
import {
  FEED_PATH,
  FEED_TITLE,
  SITE_NAME,
  absoluteUrl,
  toIsoDate,
} from '@/lib/site';

export const dynamic = 'force-static';

function escapeXml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

// RSS wants RFC 822 dates; toUTCString() produces that format.
function toRssDate(value: string | Date | undefined): string | undefined {
  const iso = toIsoDate(value);
  return iso ? new Date(iso).toUTCString() : undefined;
}

export function GET() {
  const posts = getAllPosts();
  // Newest publish/update date, so the feed only changes when a post does
  // (not on every build).
  const lastBuild = posts
    .map((post) => toIsoDate(post.updated ?? post.date))
    .filter((date): date is string => Boolean(date))
    .sort()
    .at(-1);

  const items = posts.map((post) => {
    const url = absoluteUrl(`/writing/${post.slug}`);
    const pubDate = toRssDate(post.date);
    return [
      '    <item>',
      `      <title>${escapeXml(post.title)}</title>`,
      `      <link>${url}</link>`,
      `      <guid isPermaLink="true">${url}</guid>`,
      pubDate ? `      <pubDate>${pubDate}</pubDate>` : null,
      `      <description>${escapeXml(post.description)}</description>`,
      ...post.tags.map((tag) => `      <category>${escapeXml(tag)}</category>`),
      '    </item>',
    ]
      .filter((line) => line !== null)
      .join('\n');
  });

  const xml = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">',
    '  <channel>',
    `    <title>${escapeXml(FEED_TITLE)}</title>`,
    `    <link>${absoluteUrl('/writing')}</link>`,
    `    <description>${escapeXml(`Writing by ${SITE_NAME}.`)}</description>`,
    '    <language>en</language>',
    `    <atom:link href="${absoluteUrl(FEED_PATH)}" rel="self" type="application/rss+xml" />`,
    lastBuild
      ? `    <lastBuildDate>${new Date(lastBuild).toUTCString()}</lastBuildDate>`
      : null,
    ...items,
    '  </channel>',
    '</rss>',
    '',
  ]
    .filter((line) => line !== null)
    .join('\n');

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/rss+xml; charset=utf-8',
      'Cache-Control': 'public, max-age=0, s-maxage=3600',
    },
  });
}
