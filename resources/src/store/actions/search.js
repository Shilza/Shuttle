import * as ActionTypes from '../actionTypes/search'

export function setUsers(payload){
    return {
        type: ActionTypes.SET_USERS,
        payload
    }
}

export function removeUsers() {
    return {
        type: ActionTypes.REMOVE_USERS,
    }
}
