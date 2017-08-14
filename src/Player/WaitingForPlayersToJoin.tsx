import * as React from 'react';
import { Player } from 'types';
import dispatcher from 'lib/dispatcher';
import { SetPlayerReadyState } from './actions';

type Props = {
    pin: string,
    player: Player
};

export default ({ player, pin }: Props) => (
    <section>
        <header>Welcome {player.name}</header>
        <button onClick={() => dispatcher.execute(new SetPlayerReadyState(pin, !player.ready))}>
            {player.ready ? 'I am not ready' : 'I am ready'}
        </button>
        <footer>Waiting for other players to join</footer>
    </section>
);