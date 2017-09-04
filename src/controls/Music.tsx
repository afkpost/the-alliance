import * as React from 'react';
import Sound from 'react-sound';

type Props = {
    file: 'background'
};

type State = {
    position: number
};

export default class Music extends React.Component<Props, State> {
    state = {
        position: 0
    };

    render() {
        const { file } = this.props;
        const { position } = this.state;
        return (
            <Sound 
                url={`/resources/sounds/${file}.mp3`} 
                playStatus={Sound.status.PLAYING}
                position={position}
                onPlaying={obj => this.setState({ position: obj.position })}
                onFinishedPlaying={() => this.setState({ position: 0 })}
            />
        );
    }
}