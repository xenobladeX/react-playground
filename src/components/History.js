import './History.css';
import React from 'react';

class History extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }

    render() {
        var historyItems = (number) => {
            var items = [];
            for (let i = 0; i < number; i++) {
                items.push(
                    <li key={i} className="history-item">
                        <button
                            className={this.props.currentStep === i + 1 ? 'active' : ''}
                            onClick={(e) => this.onClick(i + 1)}>{'Jump to step ' + (i + 1)}</button>
                    </li>
                );
            }
            return items;
        };
        return (
            <ul className='history-list'>
                {historyItems(this.props.steps)}
            </ul>
        );
    }

    onClick = (index) => {
        if (this.props.jumpTo) {
            this.props.jumpTo(index);
        }
    };

}

export default History;