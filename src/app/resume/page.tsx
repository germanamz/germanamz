import type { Metadata } from 'next';
import { MDXRemote } from 'next-mdx-remote/rsc';
import resumeSource from '../../../content/pages/resume.mdx';
import { mdxComponents, mdxOptions } from '@/lib/page-content';
import { DownloadButton } from '@/components/DownloadButton';
import { JsonLd } from '@/components/JsonLd';
import { pageMetadata } from '@/lib/site';
import { resumeJsonLd } from '@/lib/structured-data';

export const metadata: Metadata = pageMetadata({
  title: 'Resume — Senior Software Engineer',
  description:
    'Résumé of Germán Meza, Senior Software Engineer at Zillow Group: 10+ years building scalable systems with TypeScript, React, Node.js, Python, Go, and AWS.',
  path: '/resume',
});

export default function ResumePage() {
  return (
    <div className="relative">
      <JsonLd data={resumeJsonLd()} />
      <div className="absolute top-0 right-0">
        <DownloadButton />
      </div>
      <div className="prose prose-h1-as-h2">
        <MDXRemote source={resumeSource} components={mdxComponents} options={mdxOptions} />
      </div>
    </div>
  );
}
