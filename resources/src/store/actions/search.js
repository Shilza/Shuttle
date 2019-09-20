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


export function setIsSearchFocused(payload) {
  return {
      type: ActionTypes.IS_SEARCH_FOCUSED,
      payload
  }
}
