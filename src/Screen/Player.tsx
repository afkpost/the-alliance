import * as React from 'react';
import * as cx from 'classnames';
import { GamePhase } from 'types';
import './player.css';

type Props = {
    name: string,
    leader: boolean,
    onTeam: boolean,
    ready: boolean,
    vote?: boolean,
    phase?: GamePhase
};

export default ({name, leader, onTeam, ready, vote, phase}: Props) => (
    <tr className="screen-player">
        <td className={cx({ready: ready && !phase, leader})}/>
        <th>{name}</th>
        <td className={cx({'on-team': onTeam})}/>
        <td 
            className={cx({
                'player-vote': vote !== undefined && (phase === 'TEAM_VOTE' || phase === 'VOTE_COUNTING'),
                accept: vote === true && phase === 'VOTE_COUNTING',
                decline: vote === false && phase === 'VOTE_COUNTING'
            })}
        />
    </tr>
);