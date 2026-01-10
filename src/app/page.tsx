import Link from 'next/link';

export default function Home() {
  return (
    <div className="prose">
      <h3>Germán Meza</h3>
      <p className="italic text-gray-500 -mt-4 mb-4">-- just like Herman Meza</p>
      <p>I&apos;m a software developer living out in Guadalajara, México.</p>
      <p>I currently work for <Link href="https://www.zillowgroup.com/" target="_blank">Zillow Group</Link> as a Senior Software Engineer.</p>
      <p>I enjoy building at scale, taking pictures and traveling. (Go check my instagram <Link href="https://www.instagram.com/germanamz/" target="_blank">@germanamz</Link>).</p>
      <p>I still do some side projects, you can check them out <Link href="https://github.com/germanamz" target="_blank">on my GitHub</Link>.</p>
    </div >
  );
}
