import * as ActionTypes from '../actionTypes/posts'

export function setPosts(payload){
    return {
        type: ActionTypes.SET_POSTS,
        payload
    }
}

export function setSavedPosts(payload){
    return {
        type: ActionTypes.SET_SAVED_POSTS,
        payload
    }
}

export function setCurrentPost(payload) {
    return {
        type: ActionTypes.SET_CURRENT_POST,
        payload
    }
}

export function closePostsModal() {
    return {
        type: ActionTypes.CLOSE_POSTS_MODAL
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

export function removeSavedPost(payload) {
    return {
        type: ActionTypes.REMOVE_SAVED_POST,
        payload
    }
}