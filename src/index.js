import React from 'react';
import ReactDOM from 'react-dom';
import './styles/index.css';
import Game from './views/Game';
import registerServiceWorker from './utils/registerServiceWorker';

ReactDOM.render(<Game />, document.getElementById('root'));
registerServiceWorker();
