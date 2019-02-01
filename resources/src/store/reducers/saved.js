import * as ActionTypes from '../actionTypes/saved'

const initialState = {
    compilations: undefined
};

const Saved = (state = initialState, {type, payload = null}) => {
    switch (type) {
        case ActionTypes.SET_COMPILATIONS:
            return setCompilations(state, payload);
        case ActionTypes.REMOVE_COMPILATION:
            return removeCompilation(state);
        default:
            return state;
    }
};

const setCompilations = (state, compilations) => {
    return {
        ...state,
        compilations
    };
};

const removeCompilation = state => {
    return {
        ...state,
        compilations: undefined
    };
};

export default Saved;