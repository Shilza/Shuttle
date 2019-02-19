import * as ActionTypes from '../actionTypes/saved'
import {SET_IS_SAVED_TIMEOUT} from "../actionTypes/saved";
import {SET_POST_TO_BE_SAVED} from "../actionTypes/saved";
import {SET_IS_SAVE_MODAL_OPEN} from "../actionTypes/saved";

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

export function setIsSavedTimeout(payload){
    return {
        type: SET_IS_SAVED_TIMEOUT,
        payload: payload
    }
}

export function setIsSaveModalOpen(payload){
    return {
        type: SET_IS_SAVE_MODAL_OPEN,
        payload: payload
    }
}

export function setPostToBeSaved(payload){
    return {
        type: SET_POST_TO_BE_SAVED,
        payload: payload
    }
}