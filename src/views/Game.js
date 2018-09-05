import './Game.css';
import React from 'react';
import Board from '../components/Board';
import History from '../components/History';

class Game extends React.Component {
    constructor(props) {
        super(props);
        var defaultNumber = 19;
        var defaultSquares = new Array(defaultNumber).fill(null);
        for (var i = 0; i < defaultNumber; i++) {
            defaultSquares[i] = Array(defaultNumber).fill(null);
        }
        this.state = {
            first: 'O',
            number: defaultNumber,
            squares: defaultSquares,
            steps: 0,
            winScore: 5,
            winner: null,
            currentStep: 0,
        }
    }

    render() {
        var squares = this.calculateSquares(this.state.squares);
        return (
            <div className="game">
                <div className="game-board">
                    <Board number={this.state.number}
                        squares={squares}
                        squareClick={this.squareClick} />
                </div>
                <div className="game-info">
                    <div className="game-status">{this.gameStatus(squares)}</div>
                    <button onClick={this.reset}>reset</button>
                    <History steps={this.state.steps}
                        currentStep={this.state.currentStep}
                        jumpTo={this.jumpTo}
                    />
                </div>
            </div>
        );
    }

    gameStatus(squares) {
        if(this.state.winner != null) {
            return `Winner: ${this.state.winner}`;
        } else {
            return `Next player: ${this.getNextTurn(this.getTurn(squares))}`
        }
    }

    calculateSquares(squares) {
        return squares.map((row) => {
            var newRow = [...row];
            for (var j=0; j<newRow.length; j++) {
                var value = newRow[j];
                if(value && value.steps>this.state.currentStep) {
                    newRow[j] = null;
                }
            }
            return newRow;
        });
    }

    getTurn(squares) {
        for (var i=0; i<squares.length; i++) {
            var row = squares[i];
            for (var j=0; j<row.length; j++) {
                var value = row[j];
                if(value && value.steps === this.state.currentStep) {
                    return value.value;
                }
            }
        }
        return this.state.first;
    }

    getNextTurn(turn) {
        if(this.state.steps === 0){
            return this.state.first;
        } else {
            return turn === 'X' ? 'O' : 'X';
        }
    }

    reset = (e) => {
        var number = prompt('输入行数', '19');
        
        if(number) {
            number =  number >= this.state.winScore ? number : this.state.number;
            var defaultSquares = new Array(number).fill(null);
            for (var i = 0; i < number; i++) {
                defaultSquares[i] = Array(number).fill(null);
            }
            this.setState({
                number: number,
                squares: defaultSquares,
                steps: 0,
                winScore: 5,
                winner: null,
            });
        }
    }

    jumpTo = (index) => {
        this.setState({
            currentStep: index,
        });
    };

    squareClick = (row, column) => {
        this.setState(preState => {
            var squares = this.calculateSquares(preState.squares);
            var turn = this.getTurn(squares);
            if (squares[row][column] == null) {
                if (preState.currentStep === preState.steps && preState.winner != null) {
                    return preState;
                }
                var steps = preState.currentStep < preState.steps ? preState.currentStep + 1: preState.steps + 1;
                squares[row][column] = {
                    steps: steps,
                    value: this.getNextTurn(turn),
                };
                var hasWin = this.calculateWinner(squares, row, column);
                return {
                    squares: squares,
                    steps: steps,
                    winner: hasWin ? turn : null,
                    currentStep: steps,
                };
            } else {
                return preState;
            }
        })
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