import type { Metadata } from 'next';
import { MDXRemote } from 'next-mdx-remote/rsc';
import resumeSource from '../../../content/pages/resume.mdx';
import { mdxComponents, mdxOptions } from '@/lib/page-content';
import { DownloadButton } from '@/components/DownloadButton';
import { pageMetadata } from '@/lib/site';

export const metadata: Metadata = pageMetadata({
  title: 'Resume',
  description:
    'Germán Meza — Software developer with a passion for scalable and efficient software. View my professional experience, education, and technical skills.',
  path: '/resume',
});

export default function ResumePage() {
  return (
    <div className="relative">
      <div className="absolute top-0 right-0">
        <DownloadButton />
      </div>
      <div className="prose prose-h1-as-h2">
        <MDXRemote source={resumeSource} components={mdxComponents} options={mdxOptions} />
      </div>
    </div>
  );
}
