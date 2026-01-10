import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Writing',
  description: 'Articles, thoughts, and writings by Germán Meza on software development, technology, and more.',
  openGraph: {
    title: 'Writing | Germán Meza',
    description: 'Articles, thoughts, and writings by Germán Meza on software development, technology, and more.',
    url: 'https://germanamz.com/writing',
  },
};

const WritingPage = () => {
  return (
    <div className="prose">
      <p>
        I&apos;m still working on this but you&apos;ll see some stuff here soon.
      </p>
      <p>
        In the meantime, you can check out my <Link href="https://github.com/germanamz" target="_blank">GitHub</Link>.
      </p>
    </div>
  );
};

export default WritingPage;