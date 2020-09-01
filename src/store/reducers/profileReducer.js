export const initialProfileState = {
    userName: '',
    isLoading: false,
    isLoggedIn: false,
    error: ''
};

export function profileReducer(state = initialProfileState, action = {}) {
    switch (action.type) {
    case 'LOGIN_INIT':
        return {
            ...state,
            error: '',
            isLoading: true
        };
    case 'LOGIN_SUCCESS':
        return {
            ...state,
            userName: action.payload,
            isLoading: false,
            isLoggedIn: true
        };
    case 'LOGIN_ERROR':
        return {
            ...state,
            isLoading: false,
            isLoggedIn: false,
            error: action.payload
        };
    case 'LOGOUT':
        return {
            ...state,
            userName: '',
            isLoggedIn: false
        };
    default: {
        return state;
    }
    }
}


