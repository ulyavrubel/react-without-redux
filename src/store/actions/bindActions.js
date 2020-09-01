export default function bindActions(actions, dispatch) {
    const bindAction = (action, dispatch) => {
        return function(...args) {
            return dispatch(action(...args));
        };
    };
    // if it's a single action
    if (typeof actions === 'function')
        return bindAction(actions, dispatch);
    if (typeof actions !== 'object' || actions === null)
        throw new Error(
            `bindActions expected an object or a function, instead received ${
                actions === null ? 'null' : typeof actions
            }. `
        );
    const boundActions = {};
    for (const key in actions) {
        const action = actions[key];
        if (typeof action === 'function')
            boundActions[key] = bindAction(action, dispatch);
    }
    return boundActions;
}
