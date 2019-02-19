import * as ActionTypes from '../actionTypes/saved'

const initialState = {
    compilations: [],
    isSavedTimeout: false,
    postToBeSaved: undefined,
    isModalOpen: false
};

const Saved = (state = initialState, {type, payload = null}) => {
    switch (type) {
        case ActionTypes.ADD_COMPILATIONS:
            return addCompilations(state, payload);
        case ActionTypes.REMOVE_COMPILATION:
            return removeCompilation(state);
        case ActionTypes.SET_IS_SAVED_TIMEOUT:
            return setIsSavedTimeout(state, payload);
        case ActionTypes.SET_POST_TO_BE_SAVED:
            return setPostToBeSaved(state, payload);
        case ActionTypes.SET_IS_SAVE_MODAL_OPEN:
            return setIsModalOpen(state, payload);
        default:
            return state;
    }
};

const addCompilations = (state, compilations) => ({
    ...state,
    compilations: {
        ...compilations,
        data: compilations.data
    }
});

const setIsModalOpen = (state, isModalOpen) => ({
    ...state,
    isModalOpen
});

const removeCompilation = state => ({
    ...state,
    compilations: undefined
});

const setIsSavedTimeout = (state, isSavedTimeout) => ({
    ...state,
    isSavedTimeout
});

const setPostToBeSaved = (state, postToBeSaved) => ({
    ...state,
    postToBeSaved
});

export default Saved;