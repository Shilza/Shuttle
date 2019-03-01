import * as ActionTypes from '../actionTypes/auth'
import {UPDATE_AVATAR} from "../actionTypes/users";

const initialState = {
    isAuthenticated: false,
    user: {}
};

const Auth = (state = initialState, {type, payload = null}) => {
    switch (type) {
        case ActionTypes.AUTH_LOGIN:
            return auth(state, payload);
        case ActionTypes.SET_AUTH_USER:
            return setUser(state, payload);
        case UPDATE_AVATAR:
            return updateAvatar(state, payload);
        case ActionTypes.AUTH_LOGOUT:
            return logout(state);
        default:
            return state;
    }
};

const setUser = (state, derUser) => {
    let user = derUser;
    user.private = !!user.private;

    return {
        ...state,
        user
    }
};

const updateAvatar = (state, avatar) => {
    state = {
        ...state,
        user: {
            ...state.user,
            avatar
        }
    };

    return state;
};

const auth = (state, derUser) => {
    let user = derUser;
    user.private = !!user.private;

    return {
        ...state,
        isAuthenticated: true,
        user
    }
};

const logout = state => ({
    ...state,
    isAuthenticated: false
});

export default Auth;