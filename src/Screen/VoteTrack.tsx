import * as React from 'react';
import * as cx from 'classnames';
import './VoteTrack.css';

const range = [0, 1, 2, 3, 4];

const Vote = ({num, reached}: {num: number, reached: boolean}) =>
    <div className={cx('vote', { reached })}/>;

type Props = {
    voteTrack: number
};

export default ({ voteTrack }: Props) => (
    <div className="vote-track">
        <h2>Vote track:</h2>
        <div className={cx('vote-meter', { warning: voteTrack >= 4})}>
            {range.map(i => <Vote key={i} num={i + 1} reached={i <= voteTrack}/>)}
        </div>
    </div>
);