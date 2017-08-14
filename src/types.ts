import Dictionary from './lib/Dictionary';

export type Player = {
    uid: string,
    name: string,
    ready: boolean,
};

export type Mission = {
    teamSize: number,
    failuresNeededToFail: number,
    failed?: boolean
};

export type GamePhase
    = 'TEAM_ASSIGNMENT' 
    | 'TEAM_VOTE' 
    | 'VOTE_COUNTING' 
    | 'ON_MISSION' 
    | 'MISSION_REPORT'
    | 'SPIES_WIN'
    | 'ALLIANCE_WINS' ;

export type GameState = {
    phase: GamePhase,
    round: number,
    order: string[],
    spies: Dictionary<string>,
    voteTrack: number,
    missions: Mission[],
    currentMission: number,
    currentTeam?: string[]
    votes?: Dictionary<boolean>
};

export type Game = {
    pin: string,
    players?: Dictionary<Player>,
    state?: GameState
};