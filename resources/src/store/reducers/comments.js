import * as ActionTypes from '../actionTypes/comments'
import {COMMENT_LIKE, COMMENT_UNLIKE} from "../actionTypes/likes";

const initialState = {
    comments: []
};

const Comments = (state = initialState, {type, payload = null}) => {
    switch (type) {
        case ActionTypes.SET_COMMENTS:
            return setComments(state, payload);
        case ActionTypes.REMOVE_COMMENT:
            return removeComment(state);
        case ActionTypes.ADD_COMMENT:
            return addComment(state, payload);
        case COMMENT_LIKE:
            return likeComment(state, payload);
        case COMMENT_UNLIKE:
            return unlikeComment(state, payload);
        default:
            return state;
    }
};

const setComments = (state, comments) => {
    comments.forEach(comment => {
        if(comment.hasOwnProperty('__meta__')) {
            Object.keys(comment.__meta__).forEach(key =>
                comment[key] = comment.__meta__[key]
            );
            delete comment.__meta__;
        }
    });
    comments = comments.sort((a, b) => {
        if (a.id > b.id)
            return 1;
        if (a.id < b.id)
            return -1;

        return 0;
    });

    return {
        ...state,
        comments
    };
};

const removeComment = (state, id) => {
    return {
        ...state,
        comments: state.comments.filter(item => item.id !== id)
    };
};

const addComment = (state, comment) => {
    return {
        ...state,
        comments: [
            ...state.comments,
            comment
        ]
    };
};

const likeComment = (state, id) => {
    let comments = [...state.comments].map(comment => {
        if(comment.id === id){
            comment.isLiked = true;
            comment.likes_count++;
        }

        return comment;
    });

    return {
        ...state,
        comments
    }
};

const unlikeComment = (state, id) => {
    let comments = [...state.comments].map(comment => {
        if(comment.id === id) {
            comment.isLiked = false;
            comment.likes_count--;
        }
        return comment;
    });

    return {
        ...state,
        comments
    }
};

export default Comments;