import * as React from 'react';
// import SVGInline from 'react-svg-inline'
import * as cx from 'classnames';
import './card.css';

const approve = require('./icons/approve.svg');
console.log(approve);

type Props = {
    size?: 's' | 'l',
    orientation: 'vertical' | 'horizontal',
    icon: 'approve' | 'reject' | 'fail' | 'success' | 'spy' | 'resistance_member',
    color: 'dark' | 'light',
    onClick?: () => void
};

export default ({size, orientation, icon, color}: Props) => (
    <div className={cx('card', size, orientation, color)}>
        ...
    </div>
);