import './App.scss';
import React from 'react';
import { hot } from 'react-hot-loader/root';
import {
  Switch,
  Route,
  Redirect, HashRouter,
} from 'react-router-dom';
import { Info } from './Info/Info';
import { Home } from './Home/Home';
import { SolarSystem } from '../components/SolarSystem/SolarSystem';

export function App() {
  return (
    <HashRouter>
      <div className="app">
        <div className="top-bar">
          <span className="chat-with">&#62;_ Chat with gBot...</span>
          <span className="fill" />
        </div>
        <SolarSystem />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/info" component={Info} />
          <Route path="**">
            <Redirect push exact to="/" />
          </Route>
        </Switch>
      </div>
    </HashRouter>
  );
}

export default hot(App);
