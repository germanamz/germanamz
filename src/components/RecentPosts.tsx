import Link from 'next/link';
import { getAllPosts } from '@/lib/posts';

interface RecentPostsProps {
  limit?: number;
}

export const RecentPosts = ({ limit = 2 }: RecentPostsProps) => {
  const posts = getAllPosts().slice(0, limit);
  if (posts.length === 0) return null;

  return (
    <div className="mt-10 not-prose">
      <h4 className="text-sm font-semibold uppercase text-gray-500 mb-4">
        Latest writing
      </h4>
      <ul className="space-y-4">
        {posts.map((post) => {
          const formattedDate = new Date(post.date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            timeZone: 'UTC',
          });
          return (
            <li key={post.slug}>
              <Link
                href={`/writing/${post.slug}`}
                className="hover:underline font-medium"
              >
                {post.title}
              </Link>
              <p className="text-sm text-gray-500">{formattedDate}</p>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
