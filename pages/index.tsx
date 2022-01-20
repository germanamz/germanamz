import type { NextPage } from 'next';

import OpenCard from '../components/open/OpenCard';

const Home: NextPage = () => (
  <div className="absolute w-full h-full flex flex-col">
    <div className="flex flex-row h-full justify-center items-center">
      <div className="w-1/12" />
      <OpenCard
        title="Check my Paper"
        subtitle="(Resumé)"
        href="/paper"
        description="Just a Paper where I describe my past jobs and some projects, in the future I&apos;ll include some of the open source projects I&apos;been working on."
      />
      <div className="w-1/12" />
      <OpenCard
        title="Check my photo gallery"
        href="/gallery"
        description="As I try to be an amateur photographer of the wild, cities ans life moments. This is just the set of my photos I like the most."
      />
      <div className="w-1/12" />
    </div>
    <footer className="p-1 flex flex-row justify-end items-center footer bg-neutral">
      <span className="text-sm">German Meza Copyright © {new Date().getFullYear()} - All right reserved</span>
    </footer>
  </div>
);

export default Home;
