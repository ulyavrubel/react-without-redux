import {useGlobalStore} from '../store/store';

import bindActions from '../store/actions/bindActions';
import * as actions from '../store/actions/profileActions';

export default function useProfile() {
    const {state, dispatch} = useGlobalStore();

    const {profile} = state;

    const {handleLogin, handleLogout} = actions;

    const loginActions = bindActions({
        handleLogin,
        handleLogout
    }, dispatch);

    return {...profile, ...loginActions};
}
