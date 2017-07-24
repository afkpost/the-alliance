import { Mission } from './types';

type SetupMatrix = {
    [key: string]: {
        spies: number,
        missions: Mission[]
    }
};

function mission(teamSize: number, failuresNeededToFail: number = 1): Mission {
    return { teamSize, failuresNeededToFail };
}

const setupMatrix: SetupMatrix = {
    [5]: {
        spies: 2,
        missions: [mission(2), mission(3), mission(2), mission(3), mission(3)]
    },
    [6]: {
        spies: 2,
        missions: [mission(2), mission(3), mission(4), mission(3), mission(4)]
    },
    [7]: {
        spies: 3,
        missions: [mission(2), mission(3), mission(3), mission(4, 2), mission(4)]
    },
    [8]: {
        spies: 3,
        missions: [mission(3), mission(4), mission(4), mission(5, 2), mission(5)]
    },
    [9]: {
        spies: 3,
        missions: [mission(3), mission(4), mission(4), mission(5, 2), mission(5)]
    },
    [10]: {
        spies: 4,
        missions: [mission(3), mission(4), mission(4), mission(5, 2), mission(5)]
    },
};

export default setupMatrix;