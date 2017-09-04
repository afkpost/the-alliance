import * as React from 'react';
import { Player } from 'types';
import dispatcher from 'lib/dispatcher';
import { SetPlayerReadyState, LeaveGame } from './actions';

type Props = {
    pin: string,
    player: Player
};

export default ({ player, pin }: Props) => (
    <section>
        <header>
            Welcome
            <h2>{player.name}</h2>
        </header>
        <button onClick={() => dispatcher.execute(new SetPlayerReadyState(pin, !player.ready))}>
            {player.ready ? 'I am not ready' : 'I am ready'}
        </button>
        <button onClick={() => dispatcher.execute(new LeaveGame(pin, player.uid))} disabled={player.ready}>
            Leave
        </button>
        <footer>Waiting for other players to join</footer>
    </section>
);