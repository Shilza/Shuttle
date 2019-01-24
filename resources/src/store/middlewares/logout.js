import * as ActionTypes from '../actionTypes/auth'

const logout = store => next => action => {
    if(action.type === ActionTypes.AUTH_LOGOUT) {
        localStorage.removeItem('expiresIn');
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
    }
    return next(action);
};

export default logout;