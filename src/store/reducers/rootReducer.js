import {profileReducer, initialProfileState} from './profileReducer.js';

const logger = (action, prevState, currentState) => {
    console.groupCollapsed('Logger');
    console.log('%c Action:', 'color: blue', action);
    console.log('%c Previous State:', 'color: red', prevState);
    console.log('%c Current State:', 'color: green', currentState);
    console.groupEnd();
};

export const initialState = {
    profile: initialProfileState
};

export default function rootReducer(state, action) {
    const {profile} = state;

    const currentState = {
        profile: profileReducer(profile, action)
    };

    logger(action, profile, currentState);

    return currentState;
}


