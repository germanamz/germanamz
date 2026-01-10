import Link from 'next/link';

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