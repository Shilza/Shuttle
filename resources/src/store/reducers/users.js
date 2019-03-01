import {
    DELETE_AVATAR, SET_BLACKLISTED,
    ADD_FOLLOWERS,
    ADD_FOLLOWS,
    SET_PRIVATE,
    SET_PUBLIC, SET_UNBLACKLISTED,
    SET_USER,
    UPDATE_AVATAR, SET_FOLLOWERS, SET_FOLLOWS
} from "../actionTypes/users";
import {FOLLOW, UNFOLLOW} from "../actionTypes/friendships";
import {ADD_POST, REMOVE_POST} from "../actionTypes/posts";
import {AUTH_LOGOUT} from "../actionTypes/auth";

const initialState = {
    user: undefined,
    followers: [],
    follows: [],
};

const Users = (state = initialState, {type, payload = null}) => {
    switch (type) {
        case SET_USER:
            return setUser(state, payload);
        case ADD_FOLLOWERS:
            return addFollowers(state, payload);
        case ADD_FOLLOWS:
            return addFollows(state, payload);
        case SET_FOLLOWERS:
            return setFollowers(state, payload);
        case SET_FOLLOWS:
            return setFollows(state, payload);
        case FOLLOW:
            return follow(state);
        case UNFOLLOW:
            return unfollow(state);
        case ADD_POST:
            return incrementsPostsCount(state);
        case REMOVE_POST:
            return decrementsPostsCount(state);
        case UPDATE_AVATAR:
            return updateAvatar(state, payload);
        case DELETE_AVATAR:
            return deleteAvatar(state);
        case SET_PRIVATE:
            return setPrivate(state);
        case SET_PUBLIC:
            return setPublic(state);
        case SET_BLACKLISTED:
            return setBlacklisted(state);
        case SET_UNBLACKLISTED:
            return setUnblacklisted(state);
        case AUTH_LOGOUT:
            return initialState;
        default:
            return state;
    }
};

const setUser = (state, user) => {

    if (user.hasOwnProperty('__meta__')) {
        Object.keys(user.__meta__).forEach(key =>
            user[key] = user.__meta__[key]
        );
        delete user.__meta__;
    }

    user.private = !!user.private;

    return {
        ...state,
        user,
        follows: [],
        followers: []
    };
};

const decrementsPostsCount = state => {

    const user = {...state.user};
    user.posts_count--;

    return {
        ...state,
        user
    }
};

const incrementsPostsCount = state => {

    const user = {...state.user};
    user.posts_count++;

    return {
        ...state,
        user
    }
};

const addFollowers = (state, followers) => ({
    ...state,
    followers: [...state.followers, ...followers]
});

const addFollows = (state, follows) => ({
    ...state,
    follows: [...state.follows, ...follows]
});

const setFollowers = (state, followers) => ({
    ...state,
    followers
});

const setFollows = (state, follows) => ({
    ...state,
    follows
});

const follow = state => {
    let user = {...state.user};
    user.friendshipState = user.private ? 1 : 2;

    if(!user.private)
        user.followers_count++;

    return {
        ...state,
        user
    };
};

const unfollow = state => {
    let user = {...state.user};

    if(user.friendshipState !== 1)
        user.followers_count--;

    user.friendshipState = 0;

    return {
        ...state,
        user
    };
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

const deleteAvatar = state => {
    state = {
        ...state,
        user: {
            ...state.user,
            avatar: null
        }
    };

    return state;
};

const setPrivate = state => {
    state = {
        ...state,
        user: {
            ...state.user,
            private: true
        }
    };

    return state;
};

const setPublic = state => {
    state = {
        ...state,
        user: {
            ...state.user,
            private: false
        }
    };

    return state;
};

const setBlacklisted = state => {
    let updatedUser = {...state.user};
    updatedUser.blacklisted = true;

    return {
        ...state,
        user: updatedUser
    }
};

const setUnblacklisted = state => {
    let updatedUser = {...state.user};
    updatedUser.blacklisted = false;

    return {
        ...state,
        user: updatedUser
    }
};

export default Users;