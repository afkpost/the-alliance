import { GamePhase } from '../types';

export class SetPlayerReadyState {
    constructor(public pin: string, public ready: boolean) {}
}

export class SetPlayerOnTeam {
    constructor(public pin: string, public playerId: string, public onTeam: boolean) {}
}

export class ConfirmTeam {
    constructor(public pin: string) {}
}

export class Vote {
    constructor(public pin: string, public playerId: string, public accept: boolean) {}
}

export class MissionVote {
    constructor(public pin: string, public playerId: string, public success: boolean) {}
}

export class Continue {
    constructor(public pin: string, public currentPhase: GamePhase) {} 
}