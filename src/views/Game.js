import './Game.css';
import React from 'react';
import Board from '../components/Board';

class Game extends React.Component {
    constructor(props) {
        super(props);
        var defaultNumber = 19;
        var defaultSquares = new Array(defaultNumber).fill(null);
        for (var i=0; i<defaultNumber; i++) {
            defaultSquares[i] = Array(defaultNumber).fill(null);
        }
        this.state = {
            whiteTurn: true,
            number: defaultNumber,
            squares: defaultSquares,
        }
    }

    render() {
        return (
            <div className="game">
                <div className="game-board">
                    <Board number={this.state.number}
                        squares={this.state.squares}
                        squareClick={this.squareClick} />
                </div>
                <div className="game-info">
                    <div>{/* status */}</div>
                    <ol>{/* todo */}</ol>
                </div>
            </div>
        );
    }

    squareClick = (row, column) => {
        if (this.state.squares[row][column] == null) {
            var squares = [...this.state.squares];
            squares[row][column] = this.state.whiteTurn ? 'O' : 'X';
            this.setState({
                squares: squares,
                whiteTurn: !this.state.whiteTurn,
            });
        }
    }
}

export default Game;