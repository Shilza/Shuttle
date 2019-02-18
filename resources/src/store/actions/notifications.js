import {ADD_NOTIFICATIONS} from "../actionTypes/notifications";

export function addNotifications(payload){
    return {
        type: ADD_NOTIFICATIONS,
        payload: payload
    }
}
