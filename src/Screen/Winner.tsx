import * as React from 'react';
import { GamePhase } from 'types';
import Hideable from 'controls/Hidable';

type Props = {
    phase: GamePhase
};

export default ({phase}: Props) => (
    <div>
        <Hideable hidden={phase !== 'SPIES_WIN'}>Spies won</Hideable>
        <Hideable hidden={phase !== 'ALLIANCE_WINS'}>The Alliance won</Hideable>
    </div>
);