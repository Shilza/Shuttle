import * as ActionTypes from '../actionTypes/posts'

export function addPosts(payload){
    return {
        type: ActionTypes.ADD_POSTS,
        payload
    }
}

export function addSavedPosts(payload){
    return {
        type: ActionTypes.ADD_SAVED_POSTS,
        payload
    }
}

export function removeSavedPost(payload) {
    return {
        type: ActionTypes.REMOVE_SAVED_POST,
        payload
    }
}

export function addLikedPosts(payload){
    return {
        type: ActionTypes.ADD_LIKED_POSTS,
        payload
    }
}

export function removeLikedPost(payload) {
    return {
        type: ActionTypes.REMOVE_LIKED_POST,
        payload
    }
}

export function addFeedPosts(payload){
    return {
        type: ActionTypes.ADD_FEED_POSTS,
        payload
    }
}

export function removeFeedPost(payload) {
    return {
        type: ActionTypes.REMOVE_FEED_POST,
        payload
    }
}

export function addArchivePosts(payload){
    return {
        type: ActionTypes.ADD_ARCHIVE_POSTS,
        payload
    }
}

export function removeArchivePost(payload) {
    return {
        type: ActionTypes.REMOVE_ARCHIVE_POST,
        payload
    }
}

export function setCurrentPost(payload) {
    return {
        type: ActionTypes.SET_CURRENT_POST,
        payload
    }
}

export function removeCurrentPost() {
    return {
        type: ActionTypes.REMOVE_CURRENT_POST
    }
}

export function removePost(payload) {
    return {
        type: ActionTypes.REMOVE_POST,
        payload
    }
}

export function addPost(payload) {
    return {
        type: ActionTypes.ADD_POST,
        payload
    }
}

export function save(payload){
    return {
        type: ActionTypes.SAVE,
        payload
    }
}