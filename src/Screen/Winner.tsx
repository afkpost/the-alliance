import * as React from 'react';
import { GamePhase } from '../types';
import If from '../controls/If';

type Props = {
    phase: GamePhase
};

export default ({phase}: Props) => (
    <div>
        <If condition={phase === 'SPIES_WIN'}>Spies won</If>
        <If condition={phase === 'RESISTANCE_WINS'}>The resistance won</If>
    </div>
);