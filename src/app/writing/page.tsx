import type { Metadata } from 'next';
import { MDXRemote } from 'next-mdx-remote/rsc';
import writingSource from '../../../content/pages/writing.mdx';
import { mdxComponents, mdxOptions } from '@/lib/page-content';
import { DownloadButton } from '@/components/DownloadButton';

export const metadata: Metadata = {
  title: 'Writing',
  description:
    'Articles, thoughts, and writings by Germán Meza on software development, technology, and more.',
  openGraph: {
    title: 'Writing | Germán Meza',
    description:
      'Articles, thoughts, and writings by Germán Meza on software development, technology, and more.',
    url: 'https://germanamz.com/writing',
  },
  alternates: {
    types: {
      'text/markdown': '/md/writing',
    },
  },
};

export default function WritingPage() {
  return (
    <div className="relative">
      <div className="absolute top-0 right-0">
        <DownloadButton />
      </div>
      <MDXRemote source={writingSource} components={mdxComponents} options={mdxOptions} />
    </div>
  );
}
