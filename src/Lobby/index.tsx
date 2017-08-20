import * as React from 'react';
import Lobby from './Lobby';
import { Link } from 'react-router-dom';
import { NewGame } from './actions';
import dispatcher from 'lib/dispatcher';

export default () => (
    <Lobby>
        <Link to="/join">Join game</Link>
        <button onClick={() => dispatcher.execute(new NewGame())}>New game</button>
    </Lobby>
);