import Link from 'next/link';
import { getAllPosts } from '@/lib/posts';

export default function Home() {
  const recentPosts = getAllPosts().slice(0, 2);

  return (
    <div>
      <div className="prose">
        <h3>Germán Meza</h3>
        <p className="italic text-gray-500 -mt-4 mb-4">
          -- just like Herman Meza
        </p>
        <p>
          I&apos;ve been building software for over a decade, most of it
          figuring out how to make things work at scale without losing sleep over
          what breaks at 3 AM. I currently work at{' '}
          <Link href="https://www.zillowgroup.com/" target="_blank">
            Zillow Group
          </Link>{' '}
          as a Senior Software Engineer.
        </p>
        <p>
          What keeps me in this field is the craft of it — the satisfaction of
          turning a tangled problem into something clean and reliable. I care
          about code that&apos;s easy to change, systems that are honest about
          their failure modes, and teams that trust each other enough to move
          fast.
        </p>
        <p>
          Outside of work, I pick up a camera more often than I probably should.
          I live in Guadalajara, México, and when I&apos;m not coding or
          shooting photos, I&apos;m usually planning the next trip. You can see
          what I&apos;m up to on{' '}
          <Link href="https://www.instagram.com/germanamz/" target="_blank">
            Instagram
          </Link>{' '}
          or check out my side projects{' '}
          <Link href="https://github.com/germanamz" target="_blank">
            on GitHub
          </Link>
          .
        </p>
      </div>

      {recentPosts.length > 0 && (
        <div className="mt-10">
          <h4 className="text-sm font-semibold uppercase text-gray-500 mb-4">
            Latest writing
          </h4>
          <ul className="space-y-4">
            {recentPosts.map((post) => {
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
      )}
    </div>
  );
}
