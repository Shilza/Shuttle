import * as ActionTypes from '../actionTypes/friendships'

export function follow(payload){
    return {
        type: ActionTypes.FOLLOW,
        payload
    }
}

export function unfollow(){
    return {
        type: ActionTypes.UNFOLLOW
    }
}