import * as React from 'react';
import { Mission } from '../types';
import * as cx from 'classnames';

type Props = {
    missionNumber: number,
    currentMission: boolean,
    mission: Mission
};

export default (props: Props) => (
    <div
        className={
            cx('mission', {
                'current-mission': props.currentMission,
                failed: props.mission.failed === true,
                succeed: props.mission.failed === false
            })}
    >
        <div className="mission-number">{props.missionNumber}</div>
        <div className="mission-team-size">{props.mission.teamSize}</div>
    </div>
);