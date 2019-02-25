import * as ActionTypes from '../actionTypes/search'
import {AUTH_LOGOUT} from "../actionTypes/auth";

const initialState = {
    users: undefined
};

const Search = (state = initialState, {type, payload = null}) => {
    switch (type) {
        case ActionTypes.SET_USERS:
            return setUsers(state, payload);
        case ActionTypes.REMOVE_USERS:
            return removeUsers(state);
        case AUTH_LOGOUT:
            return initialState;
        default:
            return state;
    }
};

const setUsers = (state, users) => {
    return {
        ...state,
        users
    };
};

const removeUsers = state => {
    return {
        ...state,
        users: undefined
    };
};

export default Search;