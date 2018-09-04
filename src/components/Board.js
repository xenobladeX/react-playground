import './Board.css';
import React from 'react';
import Square from './Square';

class Board extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const status = 'Next player: X';

        return (
            <div>
                <div className="status">{status}</div>
                <div className="boader-row">
                    {this.renderSquare(0)}
                    {this.renderSquare(1)}
                    {this.renderSquare(2)}
                </div>
                <div className="boader-row">
                    {this.renderSquare(3)}
                    {this.renderSquare(4)}
                    {this.renderSquare(5)}
                </div>
                <div className="boader-row">
                    {this.renderSquare(6)}
                    {this.renderSquare(7)}
                    {this.renderSquare(8)}
                </div>
            </div>    
        );
    }

    renderSquare(i) {
        return (
            <Square value={i}/>
        )
    }
}

export default Board;