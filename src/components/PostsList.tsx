import Link from 'next/link';
import { getAllPosts } from '@/lib/posts';
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
              <Link
                href={`/writing/${post.slug}`}
                className="hover:underline"
              >
                <h3 className="text-lg font-semibold">{post.title}</h3>
              </Link>
              {!post.published && <DraftBadge />}
            </div>
            <p className="text-sm text-gray-500">
              {formattedDate} · {post.readingMinutes} min read
            </p>
            <p className="text-gray-700 mt-1">{post.description}</p>
          </li>
        );
      })}
    </ul>
  );
};
