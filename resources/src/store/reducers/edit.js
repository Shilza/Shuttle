import * as ActionTypes from '../actionTypes/edit'

const initialState = {
    visible: false,
    username: undefined,
    bio: undefined,
    site: undefined
};

const Edit = (state = initialState, {type, payload = null}) => {
    switch (type) {
        case ActionTypes.SET_VISIBLE:
            return setVisible(state, payload);
        case ActionTypes.SET_EDITED_USERNAME:
            return setName(state, payload);
        case ActionTypes.SET_EDITED_BIO:
            return setBio(state, payload);
        case ActionTypes.SET_EDITED_SITE:
            return setSite(state, payload);
        default:
            return state;
    }
};


const setVisible = (state, visible) => {
    return  {
        ...state,
        visible
    };
};

const setName = (state, username) => {
    return  {
        ...state,
        username
    };
};

const setBio = (state, bio) => {
    return  {
        ...state,
        bio
    };
};

const setSite = (state, site) => {
    return  {
        ...state,
        site
    };
};

export default Edit;