import './Game.css';
import React from 'react';
import Board from '../components/Board';

class Game extends React.Component {
    constructor(props) {
        super(props);

    }

    render() {
        return (
            <div className="game">
                <div className="game-board">
                     <Board />
                </div>
                <div className="game-info">
                    <div>{/* status */}</div>
                    <ol>{/* todo */}</ol>
                </div>
            </div>
        );
    }
}

export default Game;