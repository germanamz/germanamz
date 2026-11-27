import { notFound } from 'next/navigation';
import { MDXRemote } from 'next-mdx-remote/rsc';
import type { Metadata } from 'next';
import { getPostBySlug, getAllPostSlugs, toSpokenText } from '@/lib/posts';
import { mdxOptions } from '@/lib/page-content';
import Link from 'next/link';
import { SITE_NAME, pageMetadata, toIsoDate } from '@/lib/site';
import { postJsonLd } from '@/lib/structured-data';
import DictationButton from './_components/DictationButton';
import { DownloadButton } from '@/components/DownloadButton';
import { DraftBadge } from '@/components/DraftBadge';
import { JsonLd } from '@/components/JsonLd';

type Params = { slug: string };

export async function generateStaticParams(): Promise<Params[]> {
  return getAllPostSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    return {};
  }

  const path = `/writing/${post.slug}`;
  const publishedTime = toIsoDate(post.date);

  return pageMetadata({
    title: post.seoTitle ?? post.title,
    description: post.seoDescription ?? post.description,
    path,
    imagePath: `${path}/opengraph-image`,
    imageAlt: post.title,
    keywords: post.tags,
    article: {
      publishedTime,
      modifiedTime: toIsoDate(post.updated) ?? publishedTime,
      tags: post.tags,
    },
  });
}

export default async function PostPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const dateFormat: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: 'UTC',
  };
  const formattedDate = new Date(post.date).toLocaleDateString('en-US', dateFormat);
  const formattedUpdated =
    post.updated && post.updated !== post.date
      ? new Date(post.updated).toLocaleDateString('en-US', dateFormat)
      : null;

  return (
    <article>
      <JsonLd data={postJsonLd(post)} />
      <header className="mb-8">
        <div className="flex items-center gap-2">
          <h1 className="text-2xl font-bold">{post.title}</h1>
          {!post.published && <DraftBadge />}
        </div>
        <div className="flex items-center gap-2 text-base-content/65 mt-1">
          <span>
            <Link href="/" rel="author" className="hover:underline">
              {SITE_NAME}
            </Link>
            {' '}·{' '}
            <time dateTime={toIsoDate(post.date)?.slice(0, 10)}>{formattedDate}</time>
            {' '}· {post.readingMinutes} min read
          </span>
          <DictationButton text={toSpokenText(post.content)} />
          <DownloadButton />
        </div>
        {formattedUpdated && (
          <p className="text-sm text-base-content/65 mt-1">
            Updated{' '}
            <time dateTime={toIsoDate(post.updated)?.slice(0, 10)}>{formattedUpdated}</time>
          </p>
        )}
        {post.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-2">
            {post.tags.map((tag) => (
              <span key={tag} className="badge badge-xs badge-outline">
                {tag}
              </span>
            ))}
          </div>
        )}
      </header>
      <div className="prose">
        <MDXRemote source={post.content} options={mdxOptions} />
      </div>
    </article>
  );
}
