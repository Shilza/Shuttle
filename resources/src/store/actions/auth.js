import * as ActionTypes from '../actionTypes/auth'


export function setAuthUser(payload){
    return {
        type: ActionTypes.SET_AUTH_USER,
        payload
    }
}

export function authLogin(payload){
    return {
        type: ActionTypes.AUTH_LOGIN,
        payload
    }
}

export function authLogout(){
    return {
        type: ActionTypes.AUTH_LOGOUT
    }
}