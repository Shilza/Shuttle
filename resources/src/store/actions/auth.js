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


export function addUnreadDialog(payload){
  return {
    type: ActionTypes.ADD_UNREAD_DIALOG,
    payload
  }
}


export function readDialog(payload) {
  return {
    type: ActionTypes.READ_DIALOG,
    payload
  }
}
