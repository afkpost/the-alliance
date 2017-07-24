import * as React from 'react';
import Dictionary from '../lib/Dictionary';
import { Player, GamePhase } from '../types';
import If from '../controls/If';
import * as cx from 'classnames';
import TeamAssignment from './TeamAssignment';
import TeamVote from './TeamVote';
import OnMission from './OnMission';

type Props = {
    pin: string,
    uid: string,
    spies: Dictionary<string>,
    players: Dictionary<Player>,
    leader: string,
    currentTeam: string[],
    missionSize: number,
    phase: GamePhase,
    votes: Dictionary<boolean>
};

type State= { 
    showTeam: boolean
};

export default class extends React.Component<Props, State> {
    constructor() {
        super();
        this.state = {
            showTeam: false
        };
    }

    render() {
        const { pin, spies, uid, players, leader, currentTeam, missionSize, phase, votes } = this.props;
        const { showTeam } = this.state;
        const isSpy = !!spies[uid];
        return (
            <section className="game-state">
                <If condition={currentTeam.indexOf(uid) !== -1} className="on-team"/>
                <TeamVote
                    pin={pin}
                    uid={uid}
                    phase={phase}
                    accepted={votes[uid]}
                />
                <TeamAssignment
                    pin={pin}
                    uid={uid}
                    players={players}
                    leader={leader}
                    currentTeam={currentTeam}
                    missionSize={missionSize}
                    phase={phase}
                />
                <OnMission
                    pin={pin}
                    uid={uid}
                    phase={phase}
                    onMission={currentTeam.indexOf(uid) !== -1 && votes[uid] === undefined}
                    spy={!!spies[uid]}
                />
                <If condition={phase === 'SPIES_WIN' && !!spies[uid] || phase === 'RESISTANCE_WINS' && !spies[uid]}>
                    <h1>You win</h1>
                </If>
                <If condition={phase === 'SPIES_WIN' && !spies[uid] || phase === 'RESISTANCE_WINS' && !!spies[uid]}>
                    <h1>You lose</h1>
                </If>
                <div className={cx('team', {hidden: !showTeam})} onClick={() => this.setState({ showTeam: !showTeam})}>
                    <div className="toogle"/>
                    <h2>You are a {isSpy ? ' SPY' : ' RESISTANCE MEMBER'}</h2>
                    <If className="team-members" condition={isSpy}>
                        <h3>Other spies</h3>
                        <ul>
                        {
                            Dictionary.keys(spies).filter(x => x !== uid)
                                .map(id => <li key={id}>{players[id].name}</li>)
                        }
                        </ul>
                    </If>
                </div>
            </section>
        );
    }
}