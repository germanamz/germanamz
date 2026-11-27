import { NextResponse } from 'next/server';
import { getAllPostSlugs, getPostBySlug } from '@/lib/posts';
import { pageMarkdown, postMarkdown, writingIndexMarkdown } from '@/lib/markdown-mirror';
import { absoluteUrl } from '@/lib/site';

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
    return markdownResponse(writingIndexMarkdown(), key);
  }

  if (key.startsWith('writing/')) {
    const slug = key.slice('writing/'.length);
    // getPostBySlug applies the published/showsDrafts() gate, so drafts in
    // the submodule stay unreachable in production.
    const post = getPostBySlug(slug);
    if (!post) return new NextResponse('Not found', { status: 404 });
    return markdownResponse(postMarkdown(post), key);
  }

  const source = pageMarkdown(key);
  if (source === undefined) {
    return new NextResponse('Not found', { status: 404 });
  }
  return markdownResponse(source, key);
}
