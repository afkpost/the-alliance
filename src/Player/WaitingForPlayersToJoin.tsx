import * as React from 'react';
import { Player } from 'types';
import dispatcher from 'lib/dispatcher';
import { SetPlayerReadyState, LeaveGame } from './actions';
import Icon from 'controls/Icon';

type Props = {
    pin: string,
    player: Player
};

export default ({ player, pin }: Props) => (
    <section>
        <header>
            <div className="leave-game" onClick={() => dispatcher.execute(new LeaveGame(pin, player.uid))}>
                <Icon icon="exit"/>
            </div>
            Welcome
            <h2>{player.name}</h2>
        </header>
        <button onClick={() => dispatcher.execute(new SetPlayerReadyState(pin, !player.ready))}>
            {player.ready ? 'I am not ready' : 'I am ready'}
        </button>
        <footer>Waiting for other players to join</footer>
    </section>
);