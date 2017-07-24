import * as React from 'react';
import * as cx from 'classnames';

type Props = {
    effort: boolean[]
};

type State = {
    position: number
};

export default class MissionReport extends React.Component<Props, State> {
    constructor() {
        super();
        this.state = {
            position: 0
        };
    }

    componentWillMount() {
        this.componentWillReceiveProps(this.props);
    }

    componentWillReceiveProps(newProps: Props) {
        this.setState({
            position: 0
        });

        const timer = setInterval(
            () => {
                const position = this.state.position + 1;
                this.setState({ position });
                if (position === this.props.effort.length) {
                    clearInterval(timer);
                }
            },
            1000);
    }

    render() {
        const { effort } = this.props;
        const { position } = this.state;

        return (
            <div className="mission-report">
                <h1>Mission report</h1>
            {
                effort.map((success, i) => (
                    <div className={cx('mission-effort', { flipped: i < position, success })}/>
                ))
            }
            </div>
        );
    }
}