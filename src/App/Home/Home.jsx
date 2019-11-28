import './Home.scss';
import React from 'react';
import { Chat } from '../../components/Chat/Chat';

export function Home() {
  return (
    <div className="home">
      <Chat />
    </div>
  );
}
