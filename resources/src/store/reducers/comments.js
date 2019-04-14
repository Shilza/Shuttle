import * as ActionTypes from '../actionTypes/comments'
import {COMMENT_LIKE, COMMENT_UNLIKE} from "../actionTypes/likes";
import {AUTH_LOGOUT} from "../actionTypes/auth";

const initialState = {
    comments: [],
    isModalOpen: false,
    selectedComment: undefined
};

const Comments = (state = initialState, {type, payload = null}) => {
    switch (type) {
        case ActionTypes.ADD_COMMENTS:
            return addComments(state, payload);
        case ActionTypes.REMOVE_COMMENT:
            return removeComment(state, payload);
        case ActionTypes.ADD_COMMENT:
            return addComment(state, payload);
        case COMMENT_LIKE:
            return likeComment(state, payload);
        case COMMENT_UNLIKE:
            return unlikeComment(state, payload);
        case ActionTypes.SET_IS_COMMENT_MODAL_OPEN:
            return setIsModalOpen(state, payload);
        case ActionTypes.SET_SELECTED_COMMENT:
            return setSelectedComment(state, payload);
        case AUTH_LOGOUT:
            return initialState;
        default:
            return state;
    }
};

const addComments = (state, comments) => ({
    ...state,
    comments: {
        ...comments,
        data: prepareToSavePosts(state.comments.data, comments.data)
    }
});

const prepareToSavePosts = (stateComments, newComments) => {
    const transformedData = transformCommentsMetadata(newComments);
    return stateComments ? concatData(stateComments, transformedData) : transformedData;
};

const concatData = (stateComments, transformedData) => {
    transformedData = transformedData.filter(item => {
        return stateComments.every(comment => comment.id !== item.id);
    });

    return [...stateComments, ...transformedData]
        .sort((a, b ) => new Date(a.created_at) - new Date(b.created_at));
};

const transformCommentsMetadata = comments => {
    comments.forEach(comment => {
        if (comment.hasOwnProperty('__meta__')) {
            Object.keys(comment.__meta__).forEach(key =>
                comment[key] = comment.__meta__[key]
            );
            delete comment.__meta__;
        }
    });

    return comments.sort((a, b) => {
        if (a.id > b.id)
            return 1;
        if (a.id < b.id)
            return -1;

        return 0;
    });
};

const removeComment = (state, id) => ({
    ...state,
    comments: {
        ...state.comments,
        data: state.comments.data.filter(item => item.id !== id)
    }
});

const addComment = (state, comment) => ({
    ...state,
    comments: {
        ...state.comments,
        data: [...state.comments.data, comment]
    }
});

const likeComment = (state, id) => {
    let data = state.comments.data.map(comment => {
        if (comment.id === id) {
            comment.isLiked = true;
            comment.likes_count++;

            return {...comment};
        }

        return comment;
    });

    return {
        ...state,
        comments: {
            ...state.comments,
            data
        }
    };
};

const unlikeComment = (state, id) => {
    let data = state.comments.data.map(comment => {
        if (comment.id === id) {
            comment.isLiked = false;
            comment.likes_count--;

            return {...comment};
        }

        return comment;
    });

    return {
        ...state,
        comments: {
            ...state.comments,
            data
        }
    }
};

const setIsModalOpen = (state, isModalOpen) => ({
    ...state,
    isModalOpen
});

const setSelectedComment = (state, selectedComment) => ({
    ...state,
    selectedComment
});

export default Comments;