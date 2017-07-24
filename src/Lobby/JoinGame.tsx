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
    componentWillMount() {
        this.setState({pin: ''});
    }

    render() {
        return (
            <Lobby>
                <input
                    onChange={e => this.setState({name: e.target.value})} 
                    value={this.state.name} 
                    placeholder="Enter your name..."
                />
                <input 
                    onChange={e => this.setState({pin: e.target.value.toUpperCase()})} 
                    value={this.state.pin}
                    placeholder="Room code..."
                />
                <button onClick={() => dispatcher.execute(new JoinGame(this.state.pin, this.state.name))}>Join</button>
                <Link to="/">Back</Link>
            </Lobby>
        );
    }
}