import Http from '../Http'
import * as action from '../store/actions/auth'

function setTokens(expiresIn, accessToken, refreshToken) {
    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('expiresIn', expiresIn);
    localStorage.setItem('refreshToken', refreshToken);
}

export function login({remember, ...data}) {
    return dispatch => (
        new Promise((resolve, reject) => {
                Http.post('/api/v1/auth/login', data)
                    .then(({data}) => {
                        const {
                            token,
                            expiresIn,
                            refreshToken,
                            user
                        } = data;
                        dispatch(action.authLogin(user));

                        if (remember)
                            setTokens(expiresIn, token, refreshToken);
                        Http.defaults.headers.common['Authorization'] = `Bearer ${token}`;
                    })
                    .catch(err => reject(err))
            }
        ));
}

export function logout() {
    return dispatch => (
        Http.post('/api/v1/auth/logout', {
            refreshToken: localStorage.getItem('refreshToken')
        }).then(() => dispatch(action.authLogout()))
    )
}

export function me() {
    return dispatch => (
        new Promise((resolve, reject) => {
                Http.post('/api/v1/auth/me')
                    .then(({data}) => {
                        dispatch(action.authLogin(data.user));

                        resolve(data);
                    })
                    .catch(err => reject(err))
            }
        ));
}

export function refresh() {
    return new Promise((resolve, reject) => {
        Http.post('/api/v1/auth/refresh', {
            refreshToken: localStorage.getItem('refreshToken')
        })
            .then(({data}) => {
                const {
                    token,
                    expiresIn,
                    refreshToken,
                } = data;

                setTokens(expiresIn, token, refreshToken);
                Http.defaults.headers.common['Authorization'] = `Bearer ${token}`;
                resolve(data);
            })
            .catch(err => reject(err))
    });
}

export function resetPassword(credentials) {
    return dispatch => (
        new Promise((resolve, reject) => {
            Http.post('/api/v1/auth/password/reset', credentials)
                .then(({data}) => {
                    return resolve(data.message)
                })
                .catch(({response}) => {
                    return reject(response.data.message)
                })
        })
    )
}

export function updatePassword(credentials) {
    return dispatch => (
        new Promise((resolve, reject) => {
            Http.post('/api/v1/auth/password/update', credentials)
                .then(({data}) => {
                    return resolve(data.message);
                })
                .catch(err => {
                    const data = {
                        message: err.response.data.message,
                        statusCode: err.response.status,
                    };
                    return reject(data);
                })
        })
    )
}

export function register(data) {
    return dispatch => (
        new Promise((resolve, reject) => {
            Http.post('/api/v1/auth/register', data)
                .then(({data}) => resolve(data))
                .catch(err => reject(err.response.data))
        })
    )
}
