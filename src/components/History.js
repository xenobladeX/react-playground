import './History.css';
import React from 'react';

class History extends React.Component {

    render() {
        var historyItems = (number) => {
            var items = [];
            for (let i = 0; i < number; i++) {
                items.push(
                    <li key={i} className="history-item">
                        <button
                            className={this.props.currentStep === i + 1 ? 'active' : ''}
                            onClick={this.onClick.bind(this, i)}>{'Jump to step ' + (i + 1)}</button>
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
            this.props.jumpTo(index+1);
        }
    };

}

export default History;