import * as ActionTypes from '../actionTypes/search'
import {AUTH_LOGOUT} from "../actionTypes/auth";

const initialState = {
    users: undefined,
    isSearchFocused: false
};

const Search = (state = initialState, {type, payload = null}) => {
    switch (type) {
        case ActionTypes.SET_USERS:
            return setUsers(state, payload);
        case ActionTypes.REMOVE_USERS:
            return removeUsers(state);
        case ActionTypes.IS_SEARCH_FOCUSED:
            return setIsSearchFocused(state, payload);
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

const setIsSearchFocused = (state, isSearchFocused) => ({
    ...state,
    isSearchFocused
});

const removeUsers = state => {
    return {
        ...state,
        users: undefined
    };
};

export default Search;
