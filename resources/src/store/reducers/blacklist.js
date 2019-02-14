import {REMOVE_FROM_BLACKLISTED_USERS, SET_BLACKLISTED_USERS} from "../actionTypes/blacklist";

const initialState = {
    users: undefined
};

const Blacklist = (state = initialState, {type, payload = null}) => {
    switch (type) {
        case SET_BLACKLISTED_USERS:
            return setBlacklistedUsers(state, payload);
        case REMOVE_FROM_BLACKLISTED_USERS:
            return removeFromBlacklist(state, payload);
        default:
            return state;
    }
};

const setBlacklistedUsers = (state, users) => ({
    ...state,
    users
});

const removeFromBlacklist = (state, id) => ({
    ...state,
    users: state.users.filter(item => item.id !== id)
});


export default Blacklist;