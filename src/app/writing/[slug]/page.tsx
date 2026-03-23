import { notFound } from 'next/navigation';
import { MDXRemote } from 'next-mdx-remote/rsc';
import type { Metadata } from 'next';
import { getPostBySlug, getAllPostSlugs } from '@/lib/posts';

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

  const formattedDate = new Date(post.date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <article>
      <header className="mb-8">
        <h1 className="text-2xl font-bold">{post.title}</h1>
        <p className="text-gray-500 mt-1">{formattedDate}</p>
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
