import * as React from 'react';
import Dictionary from 'lib/Dictionary';
import { SetPlayerOnTeam, ConfirmTeam } from './actions';
import dispatcher from 'lib/dispatcher';
import { Player, GamePhase } from 'types';
import * as cx from 'classnames';
import Hidable from 'controls/Hidable';

type Props = {
    pin: string,
    uid: string,
    players: Dictionary<Player>,
    leader: string,
    currentTeam: string[],
    missionSize: number,
    phase: GamePhase
};

export default ({ pin, uid, players, leader, currentTeam, missionSize, phase }: Props) => (
    <Hidable hidden={leader !== uid || phase !== 'TEAM_ASSIGNMENT'} className="leader">
        <h2>Choose your team of {missionSize} players</h2>
        <ul>{
            Dictionary.values(players, x => x.name.toLowerCase()).map(player => 
                <li 
                    key={player.uid} 
                    className={cx({
                        me: uid === player.uid,
                        selected: currentTeam.indexOf(player.uid) !== -1
                    })}
                    onClick={() => 
                        dispatcher.execute(
                            new SetPlayerOnTeam(pin, player.uid, currentTeam.indexOf(player.uid) === -1))}
                >
                    {player.name}
                </li>)
        }</ul>
        <button 
            disabled={missionSize !== currentTeam.length} 
            onClick={() => dispatcher.execute(new ConfirmTeam(pin))}
        >
            Confirm team
        </button>
    </Hidable>
);