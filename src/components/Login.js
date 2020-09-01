import React, {useState} from 'react';

import useProfile from '../hooks/useProfile';

function Login() {
    const [userNameInput, setUserNameInput] = useState('');

    const {error, handleLogin} = useProfile();

    function handleChange(event) {
        event.preventDefault();
        setUserNameInput(event.target.value);
    }

    function handleSubmit(event) {
        event.preventDefault();
        handleLogin(userNameInput);
    }

    return (
        <div className='login'>
            <form onSubmit={handleSubmit}>
                <input type='text' value={userNameInput} placeholder='Your name' onChange={handleChange}/>
                <button type='submit'>Login</button>
                {error && <div>{error}</div>}
            </form>

        </div>
    );
}

export default Login;
