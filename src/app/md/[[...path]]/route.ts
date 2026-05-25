import { NextResponse } from 'next/server';
import homeSource from '../../../../content/pages/home.mdx';
import resumeSource from '../../../../content/pages/resume.mdx';
import { postSources } from '@/lib/posts-content.generated';
import { getAllPostSlugs, getAllPosts } from '@/lib/posts';

const PAGE_SOURCES: Record<string, string> = {
  '': homeSource,
  resume: resumeSource,
};

function markdownResponse(body: string) {
  return new NextResponse(body, {
    headers: {
      'Content-Type': 'text/markdown; charset=utf-8',
      'Cache-Control': 'public, max-age=0, s-maxage=3600',
    },
  });
}

function renderWritingIndex(): string {
  const posts = getAllPosts();
  const lines = ['# Writing', ''];
  for (const post of posts) {
    lines.push(`- [${post.title}](/md/writing/${post.slug}) — ${post.description}`);
  }
  return lines.join('\n') + '\n';
}

export const dynamic = 'force-static';

export function generateStaticParams() {
  return [
    { path: [] },
    { path: ['resume'] },
    { path: ['writing'] },
    ...getAllPostSlugs().map((slug) => ({ path: ['writing', slug] })),
  ];
}

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ path?: string[] }> },
) {
  const { path: segments = [] } = await params;
  const key = segments.join('/');

  if (key === 'writing') {
    return markdownResponse(renderWritingIndex());
  }

  if (key.startsWith('writing/')) {
    const slug = key.slice('writing/'.length);
    const source = postSources[slug];
    if (!source) return new NextResponse('Not found', { status: 404 });
    return markdownResponse(source);
  }

  const source = PAGE_SOURCES[key];
  if (source === undefined) {
    return new NextResponse('Not found', { status: 404 });
  }
  return markdownResponse(source);
}
