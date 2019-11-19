import React from 'react';
import './Home.scss';
import { SolarSystem } from '../../components/SolarSystem/SolarSystem';
import { Chat } from '../../components/Chat/Chat';

export function Home() {
  return (
    <div className="home">
      <SolarSystem />
      <Chat />
    </div>
  );
}
