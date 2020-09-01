import React from 'react';
import ReactDOM from 'react-dom';

import Provider from './store/store';
import App from './components/App';


import 'reset-css';
import './styles/index.scss';

ReactDOM.render(
    <React.StrictMode>
        <Provider>
            <App/>
        </Provider>
    </React.StrictMode>,
    document.getElementById('root')
);


