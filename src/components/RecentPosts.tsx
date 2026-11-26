import Link from 'next/link';
import { getAllPosts } from '@/lib/posts';
import { toIsoDate } from '@/lib/site';
import { DraftBadge } from '@/components/DraftBadge';

interface RecentPostsProps {
  limit?: number;
}

export const RecentPosts = ({ limit = 2 }: RecentPostsProps) => {
  const posts = getAllPosts().slice(0, limit);
  if (posts.length === 0) return null;

  return (
    <div className="mt-10 not-prose">
      <h2 className="text-sm font-semibold uppercase text-base-content/65 mb-4">
        Latest writing
      </h2>
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
              <div className="flex items-center gap-2">
                <Link
                  href={`/writing/${post.slug}`}
                  className="hover:underline font-medium"
                >
                  {post.title}
                </Link>
                {!post.published && <DraftBadge />}
              </div>
              <p className="text-sm text-base-content/65">
                <time dateTime={toIsoDate(post.date)?.slice(0, 10)}>{formattedDate}</time>
              </p>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
