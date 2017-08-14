import * as React from 'react';
import Card from 'controls/Card';
const shuffle: <T>(arr: T[]) => T[] = require('array-shuffle');

type Props = {
    effort: boolean[]
};

type State = {
    position: number,
    effort: boolean[]
};

export default class MissionReport extends React.Component<Props, State> {
    private timer?: number;

    componentWillMount() {
        this.componentWillReceiveProps(this.props);
    }

    componentWillReceiveProps(newProps: Props) {
        this.setState({
            position: 0,
            effort: shuffle(newProps.effort)
        });
        this.clearTimer();
        this.timer = setInterval(
            () => {
                const position = this.state.position + 1;
                this.setState({ position });
                if (position === this.props.effort.length) {
                    this.clearTimer();
                }
            },
            1500) as {} as number;
    }

    clearTimer() {
        if (this.timer) {
            clearInterval(this.timer);
            this.timer = undefined;
        }
    }

    render() {
        const { position, effort } = this.state;

        return (
            <div className="mission-report">
                <h1>Mission report</h1>
            {
                effort.map((success, i) => (
                    <Card
                        icon={success ? 'success' : 'fail'}
                        orientation="horizontal"
                        flipped={i >= position}
                    />
                ))
            }
            </div>
        );
    }
}