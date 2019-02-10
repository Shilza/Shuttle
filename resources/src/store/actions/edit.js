import * as ActionTypes from '../actionTypes/edit'

export function setVisible(payload){
    return {
        type: ActionTypes.SET_VISIBLE,
        payload
    }
}

export function setEditedName(payload){
    return {
        type: ActionTypes.SET_EDITED_USERNAME,
        payload
    }
}

export function setEditedBio(payload){
    return {
        type: ActionTypes.SET_EDITED_BIO,
        payload
    }
}

export function setEditedSite(payload){
    return {
        type: ActionTypes.SET_EDITED_SITE,
        payload
    }
}
