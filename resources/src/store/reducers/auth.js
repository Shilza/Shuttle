import * as ActionTypes from '../actionTypes/auth'

const initialState = {
    isAuthenticated: false,
    user: {}
};

const Auth = (state = initialState, {type, payload = null}) => {
    switch (type) {
        case ActionTypes.AUTH_LOGIN:
            return auth(state, payload);
        case ActionTypes.AUTH_LOGOUT:
            return logout(state);
        default:
            return state;
    }
};

const auth = (state, payload) => {
    state = {
        ...state,
        isAuthenticated: true,
        user: payload
    };

    return state;
};

const logout = (state) => {
    state = {
        ...state,
        isAuthenticated: false
    };

    return state;
};

export default Auth;