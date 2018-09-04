import './Game.css';
import React from 'react';
import Board from '../components/Board';

class Game extends React.Component {
    constructor(props) {
        super(props);
        var defaultNumber = 19;
        var defaultSquares = new Array(defaultNumber).fill(null);
        for (var i = 0; i < defaultNumber; i++) {
            defaultSquares[i] = Array(defaultNumber).fill(null);
        }
        this.state = {
            whiteTurn: true,
            number: defaultNumber,
            squares: defaultSquares,
            steps: 0,
            winScore: 5,
            hasWin: false,
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
        if (this.state.squares[row][column] == null && !this.state.hasWin) {
            var squares = [...this.state.squares];
            squares[row][column] = {
                steps: this.state.steps,
                value: this.state.whiteTurn ? 'O' : 'X',
            };
            var hasWin = this.calculateWinner(squares, row, column);
            this.setState({
                squares: squares,
                whiteTurn: !this.state.whiteTurn,
                steps: this.state.steps + 1,
                hasWin: hasWin,
            });
        }
    }

    calculateWinner(squares, row, column) {

        if (this.calculateInDirection(squares, row, column, 0, 1) ||
            this.calculateInDirection(squares, row, column, 1, 1) ||
            this.calculateInDirection(squares, row, column, 1, 0) ||
            this.calculateInDirection(squares, row, column, -1, 1)) {
            return true;
        }
    }

    calculateInDirection(squares, row, column, rowPlus, columnPlus) {
        var number = 1;
        console.log('calculate');
        var value = squares[row][column].value;
        var foreDirection = true, preDireation = true;
        for (var i = 1; i < this.state.winScore; i++) {
            if (foreDirection) {
                var newRow = row + i * rowPlus;
                var newColumn = column + i * columnPlus
                if (0 <= newRow && newRow < this.state.number &&
                    0 <= newColumn && newColumn < this.state.number) {
                    var nextValue = squares[newRow][newColumn];
                    if (nextValue && nextValue.value === value) {
                        number++;
                        if (number === this.state.winScore) {
                            return true;
                        }
                    } else {
                        foreDirection = false;
                    }
                } else {
                    foreDirection = false;
                }
            }
            if (preDireation) {
                var newRow = row - i * rowPlus;
                var newColumn = column - i * columnPlus
                if (0 <= newRow && newRow < this.state.number &&
                    0 <= newColumn && newColumn < this.state.number) {
                    var nextValue = squares[row - i * rowPlus][column - i * columnPlus];
                    if (nextValue && nextValue.value === value) {
                        number++;
                        if (number === this.state.winScore) {
                            return true;
                        }
                    } else {
                        preDireation = false;
                    }
                } else {
                    preDireation = false;
                }

            }
            if (!preDireation && !foreDirection) {
                return false;
            }
        }
        return false;
    }
}

export default Game;