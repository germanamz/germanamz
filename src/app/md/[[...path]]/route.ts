import { NextResponse } from 'next/server';
import homeSource from '../../../../content/pages/home.mdx';
import resumeSource from '../../../../content/pages/resume.mdx';
import { postSources } from '@/lib/posts-content.generated';
import { getAllPostSlugs, getAllPosts, getPostBySlug } from '@/lib/posts';
import { absoluteUrl } from '@/lib/site';

const PAGE_SOURCES: Record<string, string> = {
  '': homeSource,
  resume: resumeSource,
};

// `key` is the path under /md, which is also the path of the HTML page this
// markdown mirrors. The `Link: rel="canonical"` header tells search engines
// the HTML page is the one to index, so the mirror stays fetchable by agents
// without competing with it as duplicate content.
function markdownResponse(body: string, key: string) {
  const canonical = absoluteUrl(key === '' ? '/' : `/${key}`);
  return new NextResponse(body, {
    headers: {
      'Content-Type': 'text/markdown; charset=utf-8',
      'Cache-Control': 'public, max-age=0, s-maxage=3600',
      Link: `<${canonical}>; rel="canonical"`,
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
    return markdownResponse(renderWritingIndex(), key);
  }

  if (key.startsWith('writing/')) {
    const slug = key.slice('writing/'.length);
    // getPostBySlug applies the published/showsDrafts() gate; postSources
    // holds every .mdx in the submodule, drafts included.
    if (!getPostBySlug(slug)) return new NextResponse('Not found', { status: 404 });
    return markdownResponse(postSources[slug], key);
  }

  const source = PAGE_SOURCES[key];
  if (source === undefined) {
    return new NextResponse('Not found', { status: 404 });
  }
  return markdownResponse(source, key);
}
