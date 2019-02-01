import * as ActionTypes from '../actionTypes/users'

export function setUser(payload){
    return {
        type: ActionTypes.SET_USER,
        payload
    }
}

export function setFollowers(payload){
    return {
        type: ActionTypes.SET_FOLLOWERS,
        payload
    }
}

export function setFollows(payload){
    return {
        type: ActionTypes.SET_FOLLOWS,
        payload
    }
}


export function updateAvatar(payload){
    return {
        type: ActionTypes.UPDATE_AVATAR,
        payload
    }
}


export function deleteAvatar(){
    return {
        type: ActionTypes.DELETE_AVATAR,
    }
}
