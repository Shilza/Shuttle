import * as ActionTypes from '../actionTypes/posts'
import {POST_LIKE, POST_UNLIKE} from "../actionTypes/likes";

const initialState = {
    posts: [],
    currentPost: undefined,
    isModalOpen: false
};

const Posts = (state = initialState, {type, payload = null}) => {
    switch (type) {
        case ActionTypes.SET_POSTS:
            return setPosts(state, payload);
        case ActionTypes.SET_CURRENT_POST:
            return setCurrentPost(state, payload);
        case ActionTypes.CLOSE_POSTS_MODAL:
            return removeCurrentPost(state);
        case ActionTypes.ADD_POST:
            return addPost(state, payload);
        case ActionTypes.REMOVE_POST:
            return removePost(state, payload);
        case POST_LIKE:
            return likePost(state, payload);
        case POST_UNLIKE:
            return unlikePost(state, payload);
        default:
            return state;
    }
};

const setPosts = (state, posts) => {
    posts.forEach(post => {
        if (post.hasOwnProperty('__meta__')) {
            Object.keys(post.__meta__).forEach(key =>
                post[key] = post.__meta__[key]
            );
            delete post.__meta__;
        }
    });

    return {
        ...state,
        posts
    };
};

const setCurrentPost = (state, post) => {
    return {
        ...state,
        currentPost: post,
        isModalOpen: true
    };
};

const removeCurrentPost = (state) => {
    return {
        ...state,
        currentPost: undefined,
        isModalOpen: false
    };
};

const removePost = (state, id) => {
    return {
        ...state,
        posts: state.posts.filter(item => item.id !== id)
    };
};

const addPost = (state, post) => {
    return {
        ...state,
        posts: [
            post,
            ...state.posts
        ]
    };
};

const likePost = (state, postId) => {
    let currentPost = {...state.currentPost};
    currentPost.isLiked = true;
    currentPost.likes_count++;

    const newPosts = [...state.posts].map(post => {
        if(post.id === postId) {
            post.isLiked = true;
            post.likes_count++;
            return {...post};
        }

        return post;
    });

    return {
        ...state,
        posts: newPosts,
        currentPost
    }
};

const unlikePost = (state, postId) => {
    let currentPost = {...state.currentPost};
    currentPost.isLiked = false;
    currentPost.likes_count--;

    const newPosts = [...state.posts].map(post => {
        if(post.id === postId) {
            post.isLiked = false;
            post.likes_count--;
            return {...post};
        }

        return post;
    });

    return {
        ...state,
        posts: newPosts,
        currentPost
    }

};

export default Posts;