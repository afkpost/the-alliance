import * as React from 'react';
import * as Rx from 'rxjs';
import gameStore from 'GameStore';
import { Player, Game } from 'types';
import { RouteComponentProps } from 'react-router';
import './index.css';
import WaitingForPlayersToJoin from './WaitingForPlayersToJoin';
import GameStateView from './GameState';

type Props = RouteComponentProps<{pin: string}>;
type State = {
    player: Player,
    game: Game
};

export default class Device extends React.Component<Props, State> {
    private ids = new Rx.Subject<string>();
    private idStream = this.ids
        .map(x => x.toUpperCase())
        .distinctUntilChanged();

    private playerStream = this.idStream
        .map(pin => gameStore.streamLoggedInPlayer(pin))
        .switch();

    private stateStream = this.ids
        .map(pin => gameStore.streamGame(pin))
        .switch();

    componentWillMount() {
        this.playerStream.subscribe(player => this.setState({ player }));
        this.stateStream
            .subscribe(game => this.setState({ game }));
        this.componentWillReceiveProps(this.props);
    }

    componentWillReceiveProps(newProps: Props) {
        this.ids.next(newProps.match.params.pin);
    }

    componentWillUnmount() {
        // TODO:
    }

    render() {
        if (!this.state) {
            return <div>Loading...</div>;
        }

        const {player, game} = this.state;
        const pin = this.props.match.params.pin;

        if (!player) {
            return <div>You have not joined this game.</div>;
        }

        return (
            <div className="player">
                {game && game.state && game.players
                    ? <GameStateView 
                        pin={pin}
                        spies={game.state.spies} 
                        missionSize={game.state.missions[game.state.currentMission].teamSize}
                        uid={player.uid} 
                        players={game.players} 
                        leader={game.state.order[game.state.round % game.state.order.length]}
                        currentTeam={game.state.currentTeam || []}
                        phase={game.state.phase}
                        votes={game.state.votes || {}}
                    />
                    : <WaitingForPlayersToJoin player={player} pin={pin}/>
                }
            </div>
        );
    }
}