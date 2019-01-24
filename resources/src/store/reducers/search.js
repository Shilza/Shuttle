import * as ActionTypes from '../actionTypes/search'

const initialState = {
    users: undefined
};

const Search = (state = initialState, {type, payload = null}) => {
    switch (type) {
        case ActionTypes.SET_USERS:
            return setUsers(state, payload);
        case ActionTypes.REMOVE_USERS:
            return removeUsers(state);
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