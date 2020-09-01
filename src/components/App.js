import React from 'react';
import {BrowserRouter as Router, Switch} from 'react-router-dom';
import useProfile from '../hooks/useProfile';

import Main from './Main';
import Login from './Login';

function App() {
    const profile = useProfile();

    return (
        <div className='App'>
            <Router>
                <Switch>
                    {profile.userName ? <Main/> : <Login/>}
                </Switch>
            </Router>
        </div>
    );
}

export default App;
