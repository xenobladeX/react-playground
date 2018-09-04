import './Board.css';
import React from 'react';
import Square from './Square';

class Board extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        var borderSquares = (number) => {
            var allSquares = [];
            for (var row = 0; row < number; row++) {
                var rowSquares = [];
                for (var column = 0; column < number; column++) {
                    rowSquares.push(
                        <Square key={row + '_' + column}
                            row={row} column={column} 
                            value={this.props.squares[row][column]}
                            onClick={this.squareClick}
                            />
                    );
                }
                allSquares.push(
                    <div key={row} className="board-row">
                        {rowSquares}
                    </div>
                );
            }
            return allSquares;
        }

        return (
            <div>
                {borderSquares(this.props.number)}
            </div>
        );
    }

    squareClick = (row, column) => {
        if(this.props.squareClick) {
            this.props.squareClick(row, column);
        }
    }

}

export default Board;