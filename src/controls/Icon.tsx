import * as React from 'react';
import SVGInline from 'react-svg-inline';

export type Icon
    = 'alliance' 
    | 'spy' 
    | 'approve' 
    | 'reject' 
    | 'gun'
    | 'up'
    | 'ready';

type Props = {
    icon: Icon,
    className?: string
};

export default ({ icon, className}: Props) => (
    <SVGInline svg={require(`./icons/${icon}.svg`)} cleanup className={className}/>
);