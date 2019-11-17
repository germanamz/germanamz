import { hot } from 'react-hot-loader/root';
import React from 'react';
import AppStyles from './App.scss';
import { SolarSystem } from '../components/SolarSystem/SolarSystem';
import { Chat } from '../components/Chat/Chat';

export function App() {
  return (
    <div className={AppStyles.app}>
      <SolarSystem />
      <Chat />
    </div>
  );
}

export default hot(App);
