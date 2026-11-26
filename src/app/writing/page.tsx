import type { Metadata } from 'next';
import { MDXRemote } from 'next-mdx-remote/rsc';
import writingSource from '../../../content/pages/writing.mdx';
import { mdxComponents, mdxOptions } from '@/lib/page-content';
import { DownloadButton } from '@/components/DownloadButton';
import { pageMetadata } from '@/lib/site';

export const metadata: Metadata = pageMetadata({
  title: 'Writing',
  description:
    'Articles, thoughts, and writings by Germán Meza on software development, technology, and more.',
  path: '/writing',
});

export default function WritingPage() {
  return (
    <div className="relative">
      <div className="absolute top-0 right-0">
        <DownloadButton />
      </div>
      <h1 className="text-2xl font-bold mb-8">Writing</h1>
      <MDXRemote source={writingSource} components={mdxComponents} options={mdxOptions} />
    </div>
  );
}
