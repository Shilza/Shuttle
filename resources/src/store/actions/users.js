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