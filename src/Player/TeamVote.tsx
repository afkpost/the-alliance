import * as React from 'react';
import { GamePhase } from 'types';
import { Vote } from './actions';
import dispatcher from 'lib/dispatcher';
import Card from 'controls/Card';
import Hidable from 'controls/Hidable';

type Props = {
    pin: string,
    uid: string,
    phase: GamePhase,
    accepted?: boolean
};

export default ({pin, uid, phase, accepted}: Props) => (
    <Hidable hidden={phase !== 'TEAM_VOTE'} className="team-vote">
        <h1 hidden={accepted !== undefined}>Please vote</h1>
        <Card 
            icon="approve" 
            size="s" 
            orientation="vertical" 
            color="light"
            onClick={() => dispatcher.execute(new Vote(pin, uid, true))}
            disabled={accepted !== undefined}
            hidden={accepted === false}
        />
        <Card 
            icon="reject" 
            size="s" 
            orientation="vertical" 
            color="light"
            onClick={() => dispatcher.execute(new Vote(pin, uid, false))}
            disabled={accepted !== undefined}
            hidden={accepted === true}
        />
    </Hidable>
);