import * as ActionTypes from '../actionTypes/saved'

export function setCompilations(payload) {
    return {
        type: ActionTypes.SET_COMPILATIONS,
        payload: payload.length ? payload : undefined
    }
}

export function removeCompilation() {
    return {
        type: ActionTypes.REMOVE_COMPILATION
    }
}