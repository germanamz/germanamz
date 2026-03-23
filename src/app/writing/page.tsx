import type { Metadata } from 'next';
import Link from 'next/link';
import { getAllPosts } from '@/lib/posts';

export const metadata: Metadata = {
  title: 'Writing',
  description:
    'Articles, thoughts, and writings by Germán Meza on software development, technology, and more.',
  openGraph: {
    title: 'Writing | Germán Meza',
    description:
      'Articles, thoughts, and writings by Germán Meza on software development, technology, and more.',
    url: 'https://germanamz.com/writing',
  },
};

export default function WritingPage() {
  const posts = getAllPosts();

  if (posts.length === 0) {
    return (
      <div className="prose">
        <p>Nothing here yet. Check back soon.</p>
      </div>
    );
  }

  return (
    <div>
      <ul className="space-y-6">
        {posts.map((post) => {
          const formattedDate = new Date(post.date).toLocaleDateString(
            'en-US',
            {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            },
          );

          return (
            <li key={post.slug}>
              <Link
                href={`/writing/${post.slug}`}
                className="block hover:underline"
              >
                <h3 className="text-lg font-semibold">{post.title}</h3>
              </Link>
              <p className="text-sm text-gray-500">{formattedDate}</p>
              <p className="text-gray-700 mt-1">{post.description}</p>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
