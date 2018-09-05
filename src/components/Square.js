import './Square.css'
import React from 'react';

class Square extends React.Component {

    render() {
        return (
            <button className={this.props.value != null ? 'square occupy' : 'square'}
                onClick={this.onClick}>
                {this.props.value ? this.props.value.value : ''}
            </button>
        );
    }

    onClick = (e) => {
        e.preventDefault();
        if (this.props.onClick) {
            this.props.onClick(this.props.row, this.props.column);
        }
    }
}

export default Square;