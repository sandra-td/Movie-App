import {
    IS_LOGGED_IN,
    LOG_OUT
} from '../actions/loginActions/types';

import initialState from '../initialState';

export default (state = initialState.auth, action) => {
    switch (action.type) {
        case IS_LOGGED_IN:
            return {
                ...state,
                isSignedIn: true,
                accountId: action.payload.accountId,
                sessionId: action.payload.sessionId
            }
        case LOG_OUT:
            return {
                ...state,
                isSignedIn: false,
                accountId: "",
                sessionId: ""
            }

        default:
            return state;
    }
}
