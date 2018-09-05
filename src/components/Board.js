import './Board.css';
import React from 'react';
import Square from './Square';

class Board extends React.Component {

    render() {
        return (
            <div>
                {this.props.squares.map((row, rowIndex) => {
                    return (
                        <div key={rowIndex} className="board-row">
                            {row.map((square, columnIndex) => {
                                return (
                                    <Square key={rowIndex + '_' + columnIndex}
                                        row={rowIndex} column={columnIndex}
                                        value={square}
                                        onClick={this.squareClick}
                                    />
                                )
                            })}
                        </div>
                    )
                })}
            </div>
        );
    }

    squareClick = (row, column) => {
        if (this.props.squareClick) {
            this.props.squareClick(row, column);
        }
    }

}

export default Board;