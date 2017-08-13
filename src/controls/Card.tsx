import * as React from 'react';
import SVGInline from 'react-svg-inline';
import * as cx from 'classnames';
import './card.css';

type Props = {
    size?: 's' | 'l',
    orientation: 'vertical' | 'horizontal',
    icon: 'approve' | 'reject' | 'fail' | 'success' | 'gun',
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
        <SVGInline svg={require(`./icons/${icon}.svg`)} cleanup className="inner-card"/>
        {text}
    </div>
);