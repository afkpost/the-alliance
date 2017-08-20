import * as React from 'react';
import { Mission } from 'types';
import * as cx from 'classnames';
import './mission.css';
import Hidable from 'controls/Hidable';
import Icon from 'controls/Icon';

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
        <Hidable hidden={mission.failed === undefined}>
            <Icon 
                icon={mission.failed ? 'spy' : 'alliance'} 
                className="mission-result"
            />
        </Hidable>
        <div className="mission-number">{missionNumber}</div>
        <div className="mission-team-size">{mission.teamSize}</div>
        <Hidable hidden={mission.failuresNeededToFail < 2} className="failures-needed">
            {
                Array.apply(null, { length: mission.failuresNeededToFail})
                    .map((x: {}, i: number) => <Icon icon="spy" key={i}/>)}
        </Hidable>
    </div>
);