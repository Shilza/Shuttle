import * as ActionTypes from '../actionTypes/comments'

export function setComments(payload){
    return {
        type: ActionTypes.SET_COMMENTS,
        payload
    }
}

export function removeComment(payload) {
    return {
        type: ActionTypes.REMOVE_COMMENT,
        payload
    }
}

export function addComment(payload) {
    return {
        type: ActionTypes.ADD_COMMENT,
        payload
    }
}