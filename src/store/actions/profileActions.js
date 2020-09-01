function fakeLogin(userName) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (userName === '')
                reject({response: {data: 'Username is required'}});
            resolve('Logged in');
        }, 1000);
    });
}

function login() {
    return {
        type: 'LOGIN_INIT'
    };
}

function success(userName) {
    return {
        type: 'LOGIN_SUCCESS',
        payload: userName
    };
}

function failed(error) {
    return {
        type: 'LOGIN_ERROR',
        payload: error
    };
}

export function handleLogin(userName) {
    return async function(dispatch) {
        dispatch(login());

        try {
            await fakeLogin(userName);
            dispatch(success(userName));
        } catch (error) {
            dispatch(failed(error.response.data));
        }
    };
}

export function handleLogout() {
    return {
        type: 'LOGOUT'
    };
}
