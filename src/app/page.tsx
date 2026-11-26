import type { Metadata } from 'next';
import { MDXRemote } from 'next-mdx-remote/rsc';
import homeSource from '../../content/pages/home.mdx';
import { mdxComponents, mdxOptions } from '@/lib/page-content';
import { DownloadButton } from '@/components/DownloadButton';
import { JsonLd } from '@/components/JsonLd';
import { SITE_DESCRIPTION, pageMetadata } from '@/lib/site';
import { homeJsonLd } from '@/lib/structured-data';

export const metadata: Metadata = pageMetadata({
  description: SITE_DESCRIPTION,
  path: '/',
});

export default function Home() {
  return (
    <div className="relative">
      <JsonLd data={homeJsonLd()} />
      <div className="absolute top-0 right-0">
        <DownloadButton />
      </div>
      <div className="prose prose-h1-as-h3">
        <MDXRemote source={homeSource} components={mdxComponents} options={mdxOptions} />
      </div>
    </div>
  );
}
