import { notFound } from 'next/navigation';
import { MDXRemote } from 'next-mdx-remote/rsc';
import type { Metadata } from 'next';
import { getPostBySlug, getAllPostSlugs, toSpokenText } from '@/lib/posts';
import DictationButton from './_components/DictationButton';

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

  return {
    title: post.title,
    description: post.description,
    openGraph: {
      title: `${post.title} | Germán Meza`,
      description: post.description,
      url: `https://germanamz.com/writing/${post.slug}`,
    },
  };
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
      <header className="mb-8">
        <h1 className="text-2xl font-bold">{post.title}</h1>
        <div className="flex items-center gap-2 text-gray-500 mt-1">
          <span>
            {formattedDate} · {post.readingMinutes} min read
          </span>
          <DictationButton text={toSpokenText(post.content)} />
        </div>
        {formattedUpdated && (
          <p className="text-sm text-gray-400 mt-1">Updated {formattedUpdated}</p>
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
        <MDXRemote source={post.content} />
      </div>
    </article>
  );
}
