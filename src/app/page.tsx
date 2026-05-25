import { MDXRemote } from 'next-mdx-remote/rsc';
import homeSource from '../../content/pages/home.mdx';
import { mdxComponents, mdxOptions } from '@/lib/page-content';
import { DownloadButton } from '@/components/DownloadButton';

export default function Home() {
  return (
    <div className="relative">
      <div className="absolute top-0 right-0">
        <DownloadButton />
      </div>
      <div className="prose">
        <MDXRemote source={homeSource} components={mdxComponents} options={mdxOptions} />
      </div>
    </div>
  );
}
