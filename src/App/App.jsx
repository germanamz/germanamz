import './App.scss';
import React from 'react';
import { hot } from 'react-hot-loader/root';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
  matchPath, Link,
} from 'react-router-dom';
import { Info } from './Info/Info';
import { Home } from './Home/Home';

export function App() {
  return (
    <Router>
      <div className="app">
        <div className="top-bar">
          <button type="button">Left button</button>
          <Link to="/info">Info</Link>
          <Link to="/">Home</Link>
        </div>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/info" component={Info} />
          <Route path="**">
            <Redirect push exact to="/" />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default hot(App);
