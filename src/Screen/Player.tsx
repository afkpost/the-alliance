import * as React from 'react';
import * as cx from 'classnames';
import { GamePhase } from 'types';
import './player.css';
import Hidable from 'controls/Hidable';
import Icon from 'controls/Icon';
import Card from 'controls/Card';

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
        <td className={cx({ready: ready && !phase, leader})}>
            <Hidable hidden={!(ready && !phase)}>
                <Icon icon="ready"/>
            </Hidable>
            <Hidable hidden={!leader}>
                <Icon icon="alliance"/>
            </Hidable>
        </td>
        <th>{name}</th>
        <td>
            <Hidable hidden={!onTeam}>
                <Card
                    icon="gun"
                    color="dark"
                    size="mini"
                    orientation="horizontal"
                />
            </Hidable>
        </td>
        <td>
            <Hidable hidden={vote === undefined || (phase !== 'TEAM_VOTE' && phase !== 'VOTE_COUNTING')}>
                <Card 
                    icon={vote ? 'approve' : 'reject'}
                    color="dark" 
                    flipped={phase === 'TEAM_VOTE'}
                    size="mini"
                />
            </Hidable>
        </td>
    </tr>
);