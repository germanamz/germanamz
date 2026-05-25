import { NextResponse } from 'next/server';
import { getAllPosts } from '@/lib/posts';

export const dynamic = 'force-static';

export function GET() {
  const posts = getAllPosts();

  const lines: string[] = [
    '# Germán Meza',
    '',
    '> Personal site of Germán Meza, a software developer based in Guadalajara, México. All pages on this site are available as raw markdown at the same URL prefixed with `/md/`.',
    '',
    '## Pages',
    '',
    '- [Home](https://germanamz.com/md): bio and recent writing',
    '- [Resume](https://germanamz.com/md/resume): experience, skills, and education',
    '- [Writing index](https://germanamz.com/md/writing): all published posts',
    '',
    '## Posts',
    '',
    ...posts.map(
      (post) =>
        `- [${post.title}](https://germanamz.com/md/writing/${post.slug}): ${post.description}`,
    ),
    '',
  ];

  return new NextResponse(lines.join('\n'), {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=0, s-maxage=3600',
    },
  });
}
