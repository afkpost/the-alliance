import * as React from 'react';

type Props = {
    onClick: () => void;
    lockedFor?: number
};

type State = {
    disabled: boolean,
    readyIn: number
};

export default class Continue extends React.Component<Props, State> {

    private timer?: {};

    componentWillMount() {
        this.componentWillReceiveProps(this.props);
    }

    componentWillReceiveProps({ lockedFor }: Props) {
        lockedFor = lockedFor || 3;
        this.setState({
            disabled: true,
            readyIn: lockedFor
        });
        if (this.timer) {
            clearInterval(this.timer as number);
            this.timer = undefined;
        }
        this.timer = setInterval(
            () => {
                const readyIn = this.state.readyIn - 1;
                this.setState({readyIn});

                if (readyIn === 0) {
                    clearInterval(this.timer as number);
                    this.setState({disabled: false});
                    this.timer = undefined;
                }
            }, 
            1000);
    }

    render() {
        return (
            <button disabled={this.state.disabled} onClick={this.props.onClick}>
                {this.state.readyIn || this.props.children}
            </button>
        );
    }
}