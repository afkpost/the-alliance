import * as React from 'react';
import If from '../controls/If';
import { GamePhase } from '../types';
import { Vote } from './actions';
import dispatcher from '../lib/dispatcher';
import Card from '../controls/Card';

type Props = {
    pin: string,
    uid: string,
    phase: GamePhase,
    accepted?: boolean
};

export default ({pin, uid, phase, accepted}: Props) => (
    <If condition={phase === 'TEAM_VOTE'} className="team-vote">
        <If condition={accepted === undefined}>
            <h1>Please vote</h1>
        </If>
        <Card 
            icon="approve" 
            size="l" 
            orientation="vertical" 
            color="light" 
            onClick={() => dispatcher.execute(new Vote(pin, uid, true))}
        />
        <If 
            condition={accepted !== true} 
            onClick={() => dispatcher.execute(new Vote(pin, uid, false))}
        >
            <Card icon="reject" size="l" orientation="vertical" color="dark"/>
        </If>
    </If>
);