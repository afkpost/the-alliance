import * as React from 'react';
import Lobby from './Lobby';
import { Link } from 'react-router-dom';
import dispatcher from '../lib/dispatcher';
import { JoinGame } from './actions';

type Props = {

};

type State = {
    pin: string,
    name: string
};

export default class extends React.Component<Props, State> {
    private elms: {
        name: HTMLElement | null;
        pin: HTMLElement | null;
        join: HTMLElement | null;
    } = { name: null, pin: null, join: null};

    componentWillMount() {
        this.setState({pin: ''});
    }

    render() {
        return (
            <Lobby>
                <input
                    onChange={e => this.setState({name: e.target.value})}
                    onKeyDown={e => this.handle(e, this.elms.pin, name => name.focus())}
                    value={this.state.name || ''} 
                    placeholder="Enter your name..."
                    ref = {name => this.elms.name = name}
                />
                <input 
                    onChange={e => this.setState({pin: e.target.value.toUpperCase()})} 
                    value={this.state.pin || ''}
                    onKeyDown={e => this.handle(e, this.elms.join, this.joinGame)}
                    placeholder="Room code..."
                    ref = {pin => this.elms.pin = pin}
                />
                <button 
                    onClick={this.joinGame}
                    ref={join => this.elms.join = join}
                >
                    Join
                </button>
                <Link to="/">Back</Link>
            </Lobby>
        );
    }

    private joinGame = () => dispatcher.execute(new JoinGame(this.state.pin, this.state.name));

    private handle(e: React.KeyboardEvent<HTMLInputElement>, elm: HTMLElement | null, cb: (e: HTMLElement) => void) {
        if (e.key === 'Enter' && elm) {
            cb(elm);
        }
    }
}