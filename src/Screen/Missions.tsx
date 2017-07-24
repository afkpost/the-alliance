import * as React from 'react';
import { Mission as Model } from '../types';
import Mission from './Mission';

type Props = {
    missions: Model[]
    currentMission: number
};

export default (props: Props) => (
    <div>
        <h2>Missions:</h2>
        <div className="missions">
            {props.missions.map((mission, i) => (
                <Mission 
                    mission={mission} 
                    missionNumber={i + 1} 
                    key={i} 
                    currentMission={i === props.currentMission}
                />))}
        </div>
    </div>
);