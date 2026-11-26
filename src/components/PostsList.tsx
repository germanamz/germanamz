import Link from 'next/link';
import { getAllPosts } from '@/lib/posts';
import { toIsoDate } from '@/lib/site';
import { DraftBadge } from '@/components/DraftBadge';

export const PostsList = () => {
  const posts = getAllPosts();
  if (posts.length === 0) {
    return <p>Nothing here yet. Check back soon.</p>;
  }

  return (
    <ul className="space-y-6 not-prose">
      {posts.map((post) => {
        const formattedDate = new Date(post.date).toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
          timeZone: 'UTC',
        });
        return (
          <li key={post.slug}>
            <div className="flex items-center gap-2">
              <h2 className="text-lg font-semibold">
                <Link
                  href={`/writing/${post.slug}`}
                  className="hover:underline"
                >
                  {post.title}
                </Link>
              </h2>
              {!post.published && <DraftBadge />}
            </div>
            <p className="text-sm text-base-content/65">
              <time dateTime={toIsoDate(post.date)?.slice(0, 10)}>{formattedDate}</time>
              {' '}· {post.readingMinutes} min read
            </p>
            <p className="text-base-content/80 mt-1">{post.description}</p>
          </li>
        );
      })}
    </ul>
  );
};
