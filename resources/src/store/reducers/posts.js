import * as ActionTypes from '../actionTypes/posts'
import {POST_LIKE, POST_UNLIKE} from "../actionTypes/likes";
import {AUTH_LOGOUT} from "../actionTypes/auth";
import {SET_USER} from "../actionTypes/users";

const initialState = {
    usersPosts: [],
    likedPosts: [],
    feedPosts: [],
    archivePosts: [],
    savedPosts: [],
    currentPost: undefined,
    isModalOpen: false
};

const Posts = (state = initialState, {type, payload = null}) => {
    switch (type) {
        case SET_USER:
            return removeUsersPosts(state);
        case ActionTypes.ADD_POSTS:
            return addUsersPosts(state, payload);
        case ActionTypes.ADD_LIKED_POSTS:
            return addLikedPosts(state, payload);
        case ActionTypes.ADD_FEED_POSTS:
            return addFeedPosts(state, payload);
        case ActionTypes.ADD_ARCHIVE_POSTS:
            return addArchivePosts(state, payload);
        case ActionTypes.ADD_SAVED_POSTS:
            return addSavedPosts(state, payload);
        case ActionTypes.REMOVE_SAVED_POSTS:
            return removeSavedPosts(state);
        case ActionTypes.SET_CURRENT_POST:
            return setCurrentPost(state, payload);
        case ActionTypes.REMOVE_CURRENT_POST:
            return removeCurrentPost(state);
        case ActionTypes.ADD_POST:
            return addPost(state, payload);
        case ActionTypes.REMOVE_POST:
            return removePost(state, payload);
        case POST_LIKE:
            return likePost(state, payload);
        case POST_UNLIKE:
            return unlikePost(state, payload);
        case ActionTypes.SAVE:
            return save(state, payload);
        case ActionTypes.REMOVE_SAVED_POST:
            return removeSavedPost(state, payload);
        case AUTH_LOGOUT:
            return initialState;
        default:
            return state;
    }
};

const removeUsersPosts = state => ({
    ...state,
    usersPosts: []
});

const addArchivePosts = (state, archivePosts) => ({
    ...state,
    archivePosts: {
        ...archivePosts,
        data: prepareToSavePosts(state.archivePosts.data, archivePosts.data)
    }
});

const addFeedPosts = (state, feedPosts) => ({
    ...state,
    feedPosts: {
        ...feedPosts,
        data: prepareToSavePosts(state.feedPosts.data, feedPosts.data)
    }
});

const addLikedPosts = (state, likedPosts) => ({
    ...state,
    likedPosts: {
        ...likedPosts,
        data: prepareToSavePosts(state.likedPosts.data, likedPosts.data)
    }
});


const addUsersPosts = (state, usersPosts) => ({
    ...state,
    usersPosts: {
        ...usersPosts,
        data: prepareToSavePosts(state.usersPosts.data, usersPosts.data)
    }
});

const prepareToSavePosts = (statePosts, newPosts) => {
    const transformedData = transformPostsMetadata(newPosts);
    return statePosts ? [...statePosts, ...transformedData] : transformedData;
};

const transformPostsMetadata = posts => {
    return posts.map(post => {
        if (post.hasOwnProperty('__meta__')) {
            Object.keys(post.__meta__).forEach(key =>
                post[key] = post.__meta__[key]
            );
            delete post.__meta__;
        }

        return post;
    });
};

const addSavedPosts = (state, savedPosts) => ({
    ...state,
    savedPosts: {
        ...savedPosts,
        data: prepareToSavePosts(state.savedPosts.data, savedPosts.data)
    }
});

const removeSavedPosts = state => ({
    ...state,
    savedPosts: []
});

const setCurrentPost = (state, post) => ({
    ...state,
    currentPost: post,
    isModalOpen: true
});

const removeCurrentPost = (state) => ({
    ...state,
    currentPost: undefined,
    isModalOpen: false
});

const removePost = (state, id) => ({
    ...state,
    isModalOpen: false,
    ...applyActionToPosts(state, id, posts => posts.filter(item => item.id !== id))
});

const addPost = (state, post) => {
    let data;
    if(state.usersPosts.data) {
        data = [...state.usersPosts.data];
        data.unshift(post);
    } else
        data = [].unshift(post);

    return {
        ...state,
        usersPosts: {
            ...state.usersPosts,
            data
        }
    };
};

const likePost = (state, postId) => {
    let currentPost = {...state.currentPost};
    if (currentPost.id === postId) {
        currentPost.isLiked = true;
        currentPost.likes_count++;
    }

    return {
        ...applyActionToPosts(state, postId, setPostIsLiked),
        currentPost
    }
};

const setPostIsLiked = (posts, postId) => {
    return posts.map(post => {
        if (post.id === postId) {
            post.isLiked = true;
            post.likes_count++;
            return {...post};
        }

        return post;
    });
};

const unlikePost = (state, postId) => {
    let currentPost = {...state.currentPost};
    if (currentPost.id === postId) {
        currentPost.isLiked = false;
        currentPost.likes_count--;
    }

    return {
        ...applyActionToPosts(state, postId, removeLike),
        currentPost
    }
};

const removeLike = (posts, postId) => {
    return posts.map(post => {
        if (post.id === postId) {
            post.isLiked = false;
            post.likes_count--;
            return {...post};
        }

        return post;
    });
};

const applyActionToPosts = (state, postId, action) => {
    let feedPosts = state.feedPosts;
    if (feedPosts.data && state.feedPosts.data.find(post => post.id === postId))
        feedPosts.data = action(state.feedPosts.data, postId);

    let usersPosts = state.usersPosts;
    if (usersPosts.data && state.usersPosts.data.find(post => post.id === postId))
        usersPosts.data = action(state.usersPosts.data, postId);

    let likedPosts = state.likedPosts;
    if (likedPosts.data && state.likedPosts.data.find(post => post.id === postId))
        likedPosts.data = action(state.likedPosts.data, postId).filter(post => post.isLiked);

    let archivePosts = state.archivePosts;
    if (archivePosts.data && state.archivePosts.data.find(post => post.id === postId))
        archivePosts.data = action(state.archivePosts.data, postId);

    return {
        ...state,
        feedPosts: {
            ...state.feedPosts,
            ...feedPosts
        },
        usersPosts: {
            ...state.usersPosts,
            ...usersPosts
        },
        likedPosts: {
            ...state.likedPosts,
            ...likedPosts
        },
        archivePosts: {
            ...state.archivePosts,
            ...archivePosts
        }
    }
};

const save = (state, postId) => {
    let currentPost = {...state.currentPost};
    currentPost.isSaved = true;

    return {
        ...applyActionToPosts(state, postId, setPostIsSaved),
        currentPost
    }
};

const setPostIsSaved = (posts, postId) => {
    return posts.map(post => {
        if (post.id === postId) {
            post.isSaved = true;

            return {...post};
        }

        return post;
    });
};

const removeSavedPost = (state, postId) => {
    let currentPost = {...state.currentPost};
    currentPost.isSaved = false;

    return {
        ...applyActionToPosts(state, postId, setPostIsNotSaved),
        currentPost
    }
};

const setPostIsNotSaved = (posts, postId) => {
    return posts.map(post => {
        if (post.id === postId) {
            post.isSaved = false;

            return {...post};
        }

        return post;
    });
};


export default Posts;