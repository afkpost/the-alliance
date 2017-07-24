import * as React from 'react';

type Props = {
    pin: string
};

export default ({pin}: Props) => (
    <div className="room-code">
        {pin}
    </div>
);