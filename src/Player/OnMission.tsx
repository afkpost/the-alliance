import * as React from 'react';
import dispatcher from '../lib/dispatcher';
import { MissionVote } from './actions';
import { GamePhase } from '../types';
import Card from '../controls/Card';
import Hidable from '../controls/Hidable';

type SharedProps = {
    pin: string,
    uid: string
};

type Props = SharedProps & {
    onMission: boolean,
    spy: boolean,
    phase: GamePhase
};

const Success = ({pin, uid}: SharedProps) => (
    <Card 
        icon="success"
        orientation="horizontal"
        size="s"
        onClick={() => dispatcher.execute(new MissionVote(pin, uid, true))}
    />
);

const Fail = ({ pin, uid, disabled}: {disabled: boolean} & SharedProps) => (
    <Card 
        icon="fail"
        orientation="horizontal"
        size="s"
        disabled={disabled}
        onClick={() => dispatcher.execute(new MissionVote(pin, uid, false))}
    />
);

class Votes extends React.Component<{spy: boolean} & SharedProps, {reverse: boolean}> {
    constructor() {
        super();
        this.state = {
            reverse: Math.random() < 0.5
        };
    }

    render() {
        const {pin, uid, spy} = this.props;
        if (this.state.reverse) {
            return (
                <div>
                    <Success pin={pin} uid={uid}/>
                    <Fail disabled={!spy} pin={pin} uid={uid}/>
                </div>
            );
        } else {
            return (
                <div>
                    <Fail disabled={!spy} pin={pin} uid={uid}/>
                    <Success pin={pin} uid={uid}/>
                </div>
            );
        }
    }
}

export default ({pin, uid, phase, onMission, spy}: Props) => (
    <Hidable hidden={phase !== 'ON_MISSION'}>
        <Hidable hidden={onMission}>
            <h1>Waiting for mission to complete</h1>
        </Hidable>
        <Hidable hidden={!onMission}>
            <h2>Please choose</h2>
            <Votes spy={spy} pin={pin} uid={uid}/>
        </Hidable>
    </Hidable>
);