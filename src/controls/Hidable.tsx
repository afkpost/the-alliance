import * as React from 'react';

export default class Hidable extends React.Component<React.HTMLProps<HTMLDivElement> & {hidden: boolean}> {
    render() {
        return this.props.hidden ? null : <div {...this.props}>{this.props.children}</div>;
    }
}