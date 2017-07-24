import * as React from 'react';
import * as cx from 'classnames';

const range = [0, 1, 2, 3, 4];

const Vote = ({num, currentVote}: {num: number, currentVote: boolean}) => (
    <div className={cx('vote', { 'current-vote': currentVote })}>
        <div>{num}</div>
    </div>
);

type Props = {
    voteTrack: number
};

export default ({ voteTrack }: Props) => (
    <div className="vote-track">
        <h2>Vote track:</h2>
        <div>
            {range.map(i => <Vote key={i} num={i + 1} currentVote={i === voteTrack}/>)}
        </div>
    </div>
);