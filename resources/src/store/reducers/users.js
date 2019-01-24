import {SET_FOLLOWERS, SET_FOLLOWS, SET_USER} from "../actionTypes/users";
import {FOLLOW, UNFOLLOW} from "../actionTypes/friendships";

const initialState = {
    user: undefined,
    followers: undefined,
    follows: undefined
};

const Users = (state = initialState, {type, payload = null}) => {
    switch (type) {
        case SET_USER:
            return setUser(state, payload);
        case SET_FOLLOWERS:
            return setFollowers(state, payload);
        case SET_FOLLOWS:
            return setFollows(state, payload);
        case FOLLOW:
            return follow(state);
        case UNFOLLOW:
            return unfollow(state);
        default:
            return state;
    }
};

const setUser = (state, user) => {

    if(user.hasOwnProperty('__meta__')) {
        Object.keys(user.__meta__).forEach(key =>
            user[key] = user.__meta__[key]
        );
        delete user.__meta__;
    }

    return {
        ...state,
        user
    };
};

const setFollowers = (state, followers) => {
    return {
        ...state,
        followers
    };
};

const setFollows = (state, follows) => {
    return {
        ...state,
        follows
    };
};

const follow = state => {
    let user = {...state.user};
    user.isFollows = true;
    user.followers_count++;

    return {
        ...state,
        user
    };
};

const unfollow = state => {
    let user = {...state.user};
    user.isFollows = false;
    user.followers_count--;

    return {
        ...state,
        user
    };
};

export default Users;