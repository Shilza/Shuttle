import * as ActionTypes from '../actionTypes/blacklist'


export function setBlacklistedUsers(payload){
    return {
        type: ActionTypes.SET_BLACKLISTED_USERS,
        payload
    }
}

export function removeFromBlackListedUsers(payload){
    return {
        type: ActionTypes.REMOVE_FROM_BLACKLISTED_USERS,
        payload
    }
}