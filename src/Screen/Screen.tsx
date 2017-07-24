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
import Dictionary from '../lib/Dictionary';
import If from '../controls/If';
import MissionReport from './MissionReport';

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
                <section>
                    <h1>The Resistance</h1>
                    <If condition={!!game.state}>
                        <div>
                            <Missions 
                                missions={game.state && game.state.missions || []} 
                                currentMission={game.state && game.state.currentMission || 0}
                            />
                            <VoteTrack voteTrack={game.state && game.state.voteTrack || 0}/>
                        </div>
                    </If>
                </section>
                <aside>
                    <Players 
                        players={Dictionary.values(game.players, x => x.name.toLocaleLowerCase())} 
                        state={game.state}
                    />
                </aside>
                <If condition={!!game.state && game.state.phase === 'MISSION_REPORT'}>
                    <MissionReport effort={game.state && Dictionary.values(game.state.votes) || []}/>
                </If>
                <RoomCode pin={this.props.match.params.pin}/>
                <If 
                    className="winner"
                    condition=
                        {
                            !!game.state && 
                            (game.state.phase === 'SPIES_WIN' || game.state.phase === 'RESISTANCE_WINS')
                        }
                >
                    <h1>
                        {game.state && game.state.phase === 'SPIES_WIN' ? 'THE SPIES ' : 'THE RESISTANCE '}
                        HAVE WON
                    </h1>
                </If>
            </div>
        );
    }
}