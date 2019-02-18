import * as ActionTypes from '../actionTypes/saved'

const initialState = {
    compilations: [],
    saveCompilationName: undefined,
    postIdToBeSaved: undefined
};

const Saved = (state = initialState, {type, payload = null}) => {
    switch (type) {
        case ActionTypes.ADD_COMPILATIONS:
            return addCompilations(state, payload);
        case ActionTypes.REMOVE_COMPILATION:
            return removeCompilation(state);
        case ActionTypes.SET_SAVE_COMPILATION_NAME:
            return setSaveCompilationName(state, payload);
        case ActionTypes.SET_POST_ID_TO_BE_SAVED:
            return setPostIdToBeSaved(state, payload);
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

const removeCompilation = state => ({
    ...state,
    compilations: undefined
});

const setSaveCompilationName = (state, saveCompilationName) => ({
    ...state,
    saveCompilationName
});

const setPostIdToBeSaved = (state, postIdToBeSaved) => ({
    ...state,
    postIdToBeSaved
});

export default Saved;