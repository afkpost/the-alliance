import dispatcher from './lib/dispatcher';
import Store from './lib/store';
import FirebaseStore from './lib/firebase-store';
import * as LobbyActions from './Lobby/actions';
import * as PlayerActions from './Player/actions';
import createBrowserHistory from 'history/createBrowserHistory';
import Dictionary from './lib/Dictionary';
import { Game, Player, GameState, GamePhase } from './types';
import setupMatrix from './setupMatrix';

function randomSort() {
    return Math.random() - 0.5;
}

const digits = '1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZ';
function generatePin(): string {
    let res = '';
    for (let i = 0; i < 4; i++) {
        res += digits[Math.floor(Math.random() * digits.length)];
    }
    return res;
}

class GameStore {
    readonly history = createBrowserHistory();
    private store: Store;
    private uid: string;

    constructor() {
        const store = this.store = new FirebaseStore({
            apiKey: 'AIzaSyCNWnnDdjLVS1LvhD0pptL7CEknrzp8xio',
            authDomain: 'resistance-280d6.firebaseapp.com',
            databaseURL: 'https://resistance-280d6.firebaseio.com',
            projectId: 'resistance-280d6',
            storageBucket: 'resistance-280d6.appspot.com',
            messagingSenderId: '953411397836'
        });

        dispatcher.on(LobbyActions.NewGame, action => {
            const pin = generatePin();
            store.save<Game>(pin, { 
                pin
            }).then(() => {
                this.history.push(`/${pin}/screen`);
            });
        });

        dispatcher.on(LobbyActions.JoinGame, ({ pin, name }) => {
            const uid = this.uid;
            this.store
                .save<Player>(`${pin}/players/${uid}`, { uid, name, ready: false })
                .then(() => {
                    this.history.push(`/${pin}/player`);
                });
        });

        dispatcher.on(PlayerActions.SetPlayerReadyState, ({ pin, ready }) =>
            this.store.update<Player>(`${pin}/players/${this.uid}`, player => { 
                player.ready = ready; 
            }).then(() => {
                if (!ready) {
                    return;
                }

                this.store.get<Dictionary<Player>>(`${pin}/players`).then((playersDictionary => {
                    const players = Dictionary.values(playersDictionary);
                    const numberOfPlayers = players.length;
                    console.log(players, numberOfPlayers);
                    if (numberOfPlayers >= 5 &&
                        numberOfPlayers <= 10 && 
                        players.every(player => player.ready)) {
                        
                        const setup = setupMatrix[numberOfPlayers];
                        const playerIds = players.map(x => x.uid);
                        const spies = Dictionary.toDictionary(playerIds.sort(randomSort).slice(0, setup.spies), x => x);
                        const order = playerIds.sort(randomSort);

                        this.store.save<GameState>(`${pin}/state`, {
                            phase: 'TEAM_ASSIGNMENT',
                            spies,
                            order,
                            round: 0,
                            missions: setup.missions,
                            currentMission: 0,
                            voteTrack: 0
                        });
                    }
                }));
            }));

        dispatcher.on(PlayerActions.SetPlayerOnTeam, ({ pin, playerId, onTeam}) =>
            this.store.update<string[]>(`${pin}/state/currentTeam`, team => {
                team = team || [];
                if (onTeam) {
                    team.push(playerId);
                } else {
                    team = team.filter(x => x !== playerId);
                }
                return team;
            }));

        dispatcher.on(PlayerActions.ConfirmTeam, ({ pin }) => {
            this.store.update<GamePhase>(`${pin}/state/phase`, () => 'TEAM_VOTE');
        });

        dispatcher.on(PlayerActions.Vote, ({ pin, playerId, accept }) => {
            let doCount = false;
            this.store.update<GameState>(`${pin}/state`, state => {
                doCount = false;
                state.votes = state.votes || {};
                state.votes[playerId] = accept;

                if (Dictionary.length(state.votes) === state.order.length) {
                    state.phase = 'VOTE_COUNTING';
                    doCount = true;
                }
            }).then(() => {
                if (doCount) {
                    setTimeout(
                        () => 
                            this.store.update<GameState>(`${pin}/state`, state => {
                                if (Dictionary.values(state.votes).filter(x => x).length > state.order.length / 2) {
                                    state.votes = {};
                                    state.phase = 'ON_MISSION';
                                    state.voteTrack = 0;
                                } else {
                                    if (++state.voteTrack > 4) {
                                        state.phase = 'SPIES_WIN';
                                    } else {
                                        state.round++;
                                        state.votes = {};
                                        state.phase = 'TEAM_ASSIGNMENT';
                                        state.currentTeam = [];
                                    }
                                }
                            }),
                        15000);
                }
            });
        });

        dispatcher.on(PlayerActions.MissionVote, ({ pin, playerId, success}) => {
            let doCount = false;
            this.store.update<GameState>(`${pin}/state`, state => {
                doCount = false;
                state.votes = state.votes || {};
                state.votes[playerId] = success;

                if (Dictionary.length(state.votes) === (state.currentTeam || []).length) {
                    state.phase = 'MISSION_REPORT';
                    doCount = true;
                }
            }).then(() => {
                if (doCount) {
                    setTimeout(
                        () => {
                            this.store.update<GameState>(`${pin}/state`, state => {
                                const missions = state.missions;
                                const currentMission = missions[state.currentMission];
                                currentMission.failed = 
                                    Dictionary.values(state.votes).filter(x => !x).length >=
                                    currentMission.failuresNeededToFail;

                                state.votes = {};

                                if (missions.filter(x => x.failed === currentMission.failed).length >
                                    missions.length / 2) {
                                    state.phase = currentMission.failed ? 'SPIES_WIN' : 'RESISTANCE_WINS';
                                } else {
                                    state.currentTeam = [];
                                    state.phase = 'TEAM_ASSIGNMENT';
                                    state.round++;
                                    state.currentMission++;
                                }
                            });
                        },
                        15000);
                }
            });
        });

        store.currentUser()
            .subscribe(user => {
                if (!user) {
                    store.signin();
                } else {
                    this.uid = user.uid;
                }
            });
    }

    streamGame(pin: string) {
      return this.store.stream<Game>(pin);  
    }

    streamLoggedInPlayer(pin: string) {
        return this.store.currentUser()
            .map(x => x ? this.store.stream<Player>(`${pin}/players/${x.uid}`) : Rx.Observable.empty<Player>())
            .switch();
    }

    streamGameState(pin: string) {
        return this.store.stream<GameState>(`${pin}/state`);
    }
}

export default new GameStore();