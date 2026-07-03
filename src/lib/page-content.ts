import type { MDXRemoteProps } from 'next-mdx-remote/rsc';
import remarkMath from 'remark-math';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypeKatex from 'rehype-katex';
import { RecentPosts } from '@/components/RecentPosts';
import { PostsList } from '@/components/PostsList';

type VFileLike = {
  messages?: Array<{
    source?: string | null;
    reason?: string;
    cause?: unknown;
  }>;
};

// rehype-katex never throws: a malformed expression is rendered as inline red
// text and only a non-fatal warning (a message with `source: 'rehype-katex'`)
// is pushed onto the shared VFile, so broken math would silently deploy. This
// plugin runs after rehype-katex and, in production builds only, throws when
// any such message is present — failing `next build` (and the Vercel deploy,
// including previews) so bad math never ships. Local `next dev` is left
// untouched, keeping the inline red rendering so drafting math stays friendly.
function rehypeFailOnKatexError() {
  return (_tree: unknown, file: VFileLike) => {
    if (process.env.NODE_ENV !== 'production') return;

    const failures = (file.messages ?? []).filter(
      (message) => message.source === 'rehype-katex',
    );
    if (failures.length > 0) {
      const cause = failures[0].cause;
      const detail =
        (cause instanceof Error ? cause.message : undefined) ??
        failures[0].reason ??
        'invalid LaTeX';
      throw new Error(`KaTeX failed to render a math expression: ${detail}`);
    }
  };
}

// Single source of truth for the MDX pipeline, shared by every rendered
// surface (home, resume, writing index, and individual posts). Add plugins
// here so math and other features stay consistent across the site.
export const mdxOptions: MDXRemoteProps['options'] = {
  mdxOptions: {
    remarkPlugins: [
      // `singleDollarTextMath: false` keeps a bare `$` literal in prose;
      // math is written with `$$…$$` (inline mid-sentence, display on its
      // own lines).
      [remarkMath, { singleDollarTextMath: false }],
    ],
    rehypePlugins: [
      rehypeSlug,
      [
        rehypeAutolinkHeadings,
        {
          behavior: 'wrap',
          properties: { className: 'heading-anchor' },
        },
      ],
      // Renders `$$…$$` to HTML+MathML at build time (no client JS).
      // `strict: 'warn'` logs questionable-but-valid LaTeX without failing;
      // genuine parse errors are caught by rehypeFailOnKatexError below.
      [rehypeKatex, { strict: 'warn' }],
      rehypeFailOnKatexError,
    ],
  },
};

export const mdxComponents = {
  RecentPosts,
  PostsList,
};
