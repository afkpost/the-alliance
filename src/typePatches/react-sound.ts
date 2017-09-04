declare module 'react-sound' {
    type Props = {
        url: string,
        playStatus: 'PLAYING' | 'STOPPED' | 'PAUSED',
        playFromPosition?: number,
        position?: number,
        volume?: number,
        autoLoad?: boolean,
        onLoading?: () => void,
        onPlaying?: (obj: {position: number}) => void,
        onFinishedPlaying?: () => void
    };
    export default class extends React.Component<Props> { 
        static status: {
            PLAYING: 'PLAYING';
            STOPPED: 'STOPPED';
            PAUSED: 'PAUSED'
        };
    }
}