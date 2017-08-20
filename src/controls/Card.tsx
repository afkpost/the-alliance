import * as React from 'react';
import * as cx from 'classnames';
import './card.css';
import Icon from './Icon';

type Props = {
    size?: 's' | 'l',
    orientation: 'vertical' | 'horizontal',
    icon: 'alliance' | 'spy' | 'approve' | 'reject' |  'gun',
    color?: 'dark' | 'light',
    text?: string
    onClick?: () => void,
    hidden?: boolean,
    disabled?: boolean,
    flipped?: boolean
};

export default ({size, orientation, icon, color, text, hidden, onClick, disabled, flipped}: Props) => (
    <div 
        className=
            {
                cx('card', size, orientation, color || 'dark', { 
                    hidden, disabled, flipped,
                    clickable: !!onClick
                })
            } 
        onClick={() => !disabled && onClick && onClick()}
    >
        <Icon icon={icon} className="inner-card"/>
        {text}
    </div>
);