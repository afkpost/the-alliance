import * as React from 'react';
import If from '../controls/If';
import dispatcher from '../lib/dispatcher';
import { MissionVote } from './actions';
import * as cx from 'classnames';
import { GamePhase } from '../types';

type SharedProps = {
    pin: string,
    uid: string
};

type Props = SharedProps & {
    onMission: boolean,
    spy: boolean,
    phase: GamePhase
};

const Success = ({pin, uid}: SharedProps) => 
    <div className="mission success" onClick={() => dispatcher.execute(new MissionVote(pin, uid, true))}/>;
const Fail = ({ pin, uid, disabled}: {disabled: boolean} & SharedProps) => (
    <div
        className={cx('mission fail', { disabled })}
        onClick={() => {
            if (disabled) {
                return;
            }
            dispatcher.execute(new MissionVote(pin, uid, false));
        }}
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
    <If condition={phase === 'ON_MISSION'}>
        <If condition={!onMission}>
            <h1>Waiting for mission to complete</h1>
        </If>
        <If condition={onMission}>
            <h2>Please choose</h2>
            <Votes spy={spy} pin={pin} uid={uid}/>
        </If>
    </If>
);