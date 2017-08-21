import * as React from 'react';
import Dictionary from 'lib/Dictionary';
import { Player, GamePhase } from 'types';
import * as cx from 'classnames';
import TeamAssignment from './TeamAssignment';
import TeamVote from './TeamVote';
import OnMission from './OnMission';
import Card from 'controls/Card';
import Continue from 'controls/Continue';
import dispatcher from 'lib/dispatcher';
import { Continue as ContinueAction } from './actions';
import Hidable from 'controls/Hidable';
import Icon from 'controls/Icon';

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
        const gameOver = phase === 'SPIES_WIN' || phase === 'ALLIANCE_WINS';
        const won = phase === 'SPIES_WIN' && isSpy || phase === 'ALLIANCE_WINS' && !isSpy;
        return (
            <section className="game-state">
                <Card 
                    hidden={currentTeam.indexOf(uid) === -1}
                    icon="gun"
                    orientation="horizontal"
                />
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
                <Hidable hidden={leader !== uid || (phase !== 'VOTE_COUNTING' && phase !== 'MISSION_REPORT')}>
                    <Continue onClick={() => dispatcher.execute(new ContinueAction(pin, phase))} lockedFor={5}>
                        Continue
                    </Continue>
                </Hidable>
                <Hidable hidden={!(gameOver && won)}>
                    <h1>You win</h1>
                </Hidable>
                <Hidable hidden={!(gameOver && !won)}>
                    <h1>You lose</h1>
                </Hidable>
                <div className={cx('team', {hidden: !showTeam})} onClick={() => this.setState({ showTeam: !showTeam})}>
                    <Icon className="toogle" icon="up"/>
                    <h2>You are a {isSpy ? ' SPY' : ' ALLIANCE MEMBER'}</h2>
                    <Hidable className="team-members" hidden={!isSpy}>
                        <h3>Other spies</h3>
                        <ul>
                        {
                            Dictionary.keys(spies).filter(x => x !== uid)
                                .map(id => <li key={id}>{players[id].name}</li>)
                        }
                        </ul>
                    </Hidable>
                </div>
            </section>
        );
    }
}