import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import gameStore from '../GameStore';
import { Game } from '../types';
import * as Rx from 'rxjs';
import Missions from './Missions';
import VoteTrack from './VoteTrack';
import Players from './Players';
import RoomCode from './RoomCode';
import './index.css';
import './screen.css';
import Dictionary from '../lib/Dictionary';
import MissionReport from './MissionReport';
import Hidable from '../controls/Hidable';
// import Sound from 'react-sound';

type Props = RouteComponentProps<{pin: string}>;
type State = {
    game: Game
};

export default class Screen extends React.Component<Props, State> {
    private pinStream = new Rx.Subject<string>();

    constructor() {
        super();
        this.pinStream
            .map(x => x.toUpperCase())
            .distinctUntilChanged()
            .map(pin => gameStore.streamGame(pin))
            .switch()
            .subscribe(game => this.setState({game}));
    }

    componentWillMount() {
        this.componentWillReceiveProps(this.props);
    }

    componentWillReceiveProps(newProps: Props) {
        this.pinStream.next(newProps.match.params.pin);
    }

    render() {
        if (!this.state) {
            return <p>loading</p>;
        }

        const game = this.state.game;

        if (!game) {
            return <p>Game not found</p>;
        }

        return (
            <div className="screen">
                {/* <Sound url="/resources/sounds/background.mp3" playStatus={Sound.status.PLAYING}/> */}
                <section>
                    <h1>The Alliance</h1>
                    <Hidable hidden={!game.state}>
                        <div>
                            <Missions 
                                missions={game.state && game.state.missions || []} 
                                currentMission={game.state && game.state.currentMission || 0}
                            />
                            <VoteTrack voteTrack={game.state && game.state.voteTrack || 0}/>
                        </div>
                    </Hidable>
                </section>
                <aside>
                    <Players 
                        players={Dictionary.values(game.players, x => x.name.toLocaleLowerCase())} 
                        state={game.state}
                    />
                    {
                        game.state && 
                            <div className="team-setup">
                                <span className="number-of-players">
                                    {game.state.order.length}
                                </span>
                                <span className="number-of-spies">
                                    {Dictionary.length(game.state.spies)}
                                </span>
                            </div>
                    }
                </aside>
                <Hidable hidden={!game.state || game.state.phase !== 'MISSION_REPORT'}>
                    <MissionReport effort={game.state && Dictionary.values(game.state.votes) || []}/>
                </Hidable>
                <RoomCode pin={this.props.match.params.pin}/>
                <Hidable 
                    className="winner"
                    hidden=
                        {
                            !game.state ||
                            (game.state.phase !== 'SPIES_WIN' && game.state.phase !== 'ALLIANCE_WINS')
                        }
                >
                    <h1>
                        {game.state && game.state.phase === 'SPIES_WIN' ? 'THE SPIES ' : 'THE ALLIANCE '}
                        HAVE WON
                    </h1>
                </Hidable>
            </div>
        );
    }
}