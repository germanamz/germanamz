import { NextResponse } from 'next/server';
import { getAllPosts } from '@/lib/posts';
import { aboutFacts, siteSummary } from '@/lib/markdown-mirror';
import { FEED_PATH, SITE_NAME, absoluteUrl, toIsoDate } from '@/lib/site';

export const dynamic = 'force-static';

// llms.txt (https://llmstxt.org): a short, factual map of the site for AI
// assistants. The summary and the About list state who this is outright, so an
// assistant doesn't have to infer it from third-party profiles that may be
// stale. Everything is derived from src/lib/site.ts.
export function GET() {
  const posts = getAllPosts();

  const lines: string[] = [
    `# ${SITE_NAME}`,
    '',
    `> ${siteSummary()}`,
    '',
    `Every page is also available as raw Markdown at the same path prefixed with \`/md/\`, and the whole site is in a single file at ${absoluteUrl('/llms-full.txt')}.`,
    '',
    '## About',
    '',
    ...aboutFacts(),
    '',
    '## Pages',
    '',
    `- [Home](${absoluteUrl('/md')}): bio and latest writing`,
    `- [Résumé](${absoluteUrl('/md/resume')}): work history, skills, and education`,
    `- [Writing](${absoluteUrl('/md/writing')}): index of all published essays`,
    '',
    '## Writing',
    '',
    ...posts.map((post) => {
      const day = toIsoDate(post.date)?.slice(0, 10);
      return `- [${post.title}](${absoluteUrl(`/md/writing/${post.slug}`)})${day ? ` (${day})` : ''}: ${post.seoDescription ?? post.description}`;
    }),
    '',
    '## Optional',
    '',
    `- [Full site content](${absoluteUrl('/llms-full.txt')}): every page and essay in one Markdown file`,
    `- [RSS feed](${absoluteUrl(FEED_PATH)}): new essays as they are published`,
    '',
  ];

  return new NextResponse(lines.join('\n'), {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=0, s-maxage=3600',
    },
  });
}
