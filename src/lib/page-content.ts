import type { MDXRemoteProps } from 'next-mdx-remote/rsc';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import { RecentPosts } from '@/components/RecentPosts';
import { PostsList } from '@/components/PostsList';

export const mdxOptions: MDXRemoteProps['options'] = {
  mdxOptions: {
    rehypePlugins: [
      rehypeSlug,
      [
        rehypeAutolinkHeadings,
        {
          behavior: 'wrap',
          properties: { className: 'heading-anchor' },
        },
      ],
    ],
  },
};

export const mdxComponents = {
  RecentPosts,
  PostsList,
};
