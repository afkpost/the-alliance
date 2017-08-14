import * as React from 'react';
import { Player as Model, GameState } from 'types';
import Player from './Player';

type Props = {
    players: Model[]
    state?: GameState
};

export default ({ players, state }: Props) => (
    <div>
        <h2>Players</h2>
        <table className="players">
            <tbody>
                {players
                    .sort((a, b) => {
                        if (!state) {
                            return 0;
                        }
                        return state.order.indexOf(a.uid) - state.order.indexOf(b.uid);
                    })
                    .map((player, i) => (
                        <Player 
                            name={player.name} 
                            key={player.uid}
                            ready={player.ready}
                            leader={
                                !!state && 
                                i === (state.round % state.order.length)
                            }
                            onTeam={
                                !!state && 
                                !!state.currentTeam && 
                                state.currentTeam.indexOf(player.uid) !== -1
                            }
                            vote={state && state.votes && state.votes[player.uid]}
                            phase={state && state.phase}
                        />
                    ))}
            </tbody>
        </table>
    </div>
);