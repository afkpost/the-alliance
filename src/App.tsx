import * as React from 'react';
import './App.css';
import { Router } from 'react-router-dom';
import { Switch, Route } from 'react-router';
import Lobby from './Lobby';
import JoinGame from './Lobby/JoinGame';
import Screen from './Screen';
import Player from './Player';
import gameStore from './GameStore';

type State = {

};

class App extends React.Component<{}, State> {
  render() {
    return (
      <Router history={gameStore.history}>
        <Switch>
          <Route path="/" exact component={Lobby}/>
          <Route path="/join" component={JoinGame}/>
          <Route path="/:pin/screen" component={Screen}/>
          <Route path="/:pin/player" exact component={Player}/>
        </Switch>
      </Router>
    );
  }
}

export default App;
