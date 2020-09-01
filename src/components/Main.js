import React from 'react';

import useProfile from '../hooks/useProfile';

function Main() {
    const {userName, handleLogout} = useProfile();

    function handleClick() {
        handleLogout();
    }

    return (
        <div className='main'>
            <h1>Защищенная часть</h1>
            <p>Username: {userName}</p>
            <button onClick={handleClick}>Logout</button>
        </div>
    );
}

export default Main;
