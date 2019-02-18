import * as ActionTypes from '../actionTypes/saved'
import {SET_SAVE_COMPILATION_NAME} from "../actionTypes/saved";
import {SET_POST_ID_TO_BE_SAVED} from "../actionTypes/saved";

export function addCompilations(payload) {
    return {
        type: ActionTypes.ADD_COMPILATIONS,
        payload: payload
    }
}

export function removeCompilation() {
    return {
        type: ActionTypes.REMOVE_COMPILATION
    }
}

export function setSaveCompilationName(payload){
    return {
        type: SET_SAVE_COMPILATION_NAME,
        payload: payload
    }
}

export function setPostIdToBeSaved(payload){
    return {
        type: SET_POST_ID_TO_BE_SAVED,
        payload: payload
    }
}