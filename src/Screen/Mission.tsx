import * as React from 'react';
import { Mission } from '../types';
import * as cx from 'classnames';
import './mission.css';
import { asString } from '../lib/format';

type Props = {
    missionNumber: number,
    currentMission: boolean,
    mission: Mission
};

export default ({missionNumber, currentMission, mission}: Props) => (
    <div
        className={
            cx('mission', {
                'current-mission': currentMission,
                failed: mission.failed === true,
                succeed: mission.failed === false
            })}
    >
        <div className="mission-number">{missionNumber}</div>
        <div className="mission-team-size">{mission.teamSize}</div>
        { 
            mission.failuresNeededToFail > 1 && 
            <div className="mission-failures-needed">{asString(mission.failuresNeededToFail)}</div>
        }
    </div>
);