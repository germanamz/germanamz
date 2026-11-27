import { NextResponse } from 'next/server';
import { getAllPosts, getPostBySlug } from '@/lib/posts';
import { aboutFacts, pageMarkdown, postDocument, siteSummary } from '@/lib/markdown-mirror';
import { SITE_NAME, absoluteUrl } from '@/lib/site';

export const dynamic = 'force-static';

function section(sourcePath: string, body: string): string {
  return [`Source: ${absoluteUrl(sourcePath)}`, '', body.trim()].join('\n');
}

// llms-full.txt: the whole site in one Markdown file, for assistants that
// would rather read everything at once than follow the links in llms.txt.
export function GET() {
  const posts = getAllPosts()
    .map((meta) => getPostBySlug(meta.slug))
    .filter((post) => post !== null);

  const documents = [
    section('/', pageMarkdown('') ?? ''),
    section('/resume', pageMarkdown('resume') ?? ''),
    ...posts.map((post) => section(`/writing/${post.slug}`, postDocument(post))),
  ];

  const body = [
    `# ${SITE_NAME} — full site content`,
    '',
    `> ${siteSummary()}`,
    '',
    ...aboutFacts(),
    '',
    '---',
    '',
    documents.join('\n\n---\n\n'),
    '',
  ].join('\n');

  return new NextResponse(body, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=0, s-maxage=3600',
    },
  });
}
