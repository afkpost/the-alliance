import * as React from 'react';
// import { NewGame } from './actions';
// import dispatcher from 'lib/dispatcher';
import './index.css';

// onClick={() => dispatcher.execute(new NewGame())}

export default class Lobby extends React.Component {
    render() {
        return (
            <div className="lobby">
                <h1>Welcome to "The Alliance"</h1>
                {this.props.children}
            </div>
        );
    }
}