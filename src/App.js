import React from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import Login from './pages/login';
import Game from './pages/Game';

export default function App() {
  return (
    <Switch>
      <Route
        exact
        path="/"
        render={ (history) => <Login { ...history } /> }
      />
      <Route
        exact
        path="/game"
        component={ Game }
      />
    </Switch>
  );
}
