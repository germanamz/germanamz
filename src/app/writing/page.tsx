import type { Metadata } from 'next';
import { MDXRemote } from 'next-mdx-remote/rsc';
import writingSource from '../../../content/pages/writing.mdx';
import { mdxComponents, mdxOptions } from '@/lib/page-content';
import { DownloadButton } from '@/components/DownloadButton';
import { JsonLd } from '@/components/JsonLd';
import { getAllPosts } from '@/lib/posts';
import { WRITING_DESCRIPTION, WRITING_TOPICS, pageMetadata } from '@/lib/site';
import { writingJsonLd } from '@/lib/structured-data';

export const metadata: Metadata = pageMetadata({
  title: 'Writing on AI agents and software at scale',
  description: WRITING_DESCRIPTION,
  path: '/writing',
  keywords: WRITING_TOPICS,
});

export default function WritingPage() {
  return (
    <div className="relative">
      <JsonLd data={writingJsonLd(getAllPosts())} />
      <div className="absolute top-0 right-0">
        <DownloadButton />
      </div>
      <h1 className="text-2xl font-bold mb-8">Writing</h1>
      <MDXRemote source={writingSource} components={mdxComponents} options={mdxOptions} />
    </div>
  );
}
