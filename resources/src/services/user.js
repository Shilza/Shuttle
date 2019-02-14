import Http from "../Http";
import * as action from "../store/actions/users";
import {setAuthUser} from "../store/actions/auth";
import {removeFromBlackListedUsers, setBlacklistedUsers} from "../store/actions/blacklist";

export function getUser(username) {
    return dispatch => (
        new Promise((resolve, reject) => {
                Http.get('/api/v1/users?username=' + username)
                    .then(({data}) => {
                        dispatch(action.setUser(data));
                        resolve();
                    })
                    .catch(err => reject(err))
            }
        ));
}


export function update(editedData) {
    return dispatch => (
        new Promise((resolve, reject) => {
                Http.patch('/api/v1/users', editedData)
                    .then(({data}) => {
                        dispatch(setAuthUser(data.user));
                        dispatch(action.setUser(data.user));
                        resolve(data.message);
                    })
                    .catch(err => reject(err.response.data.message))
            }
        ));
}

export function getFollowers(id) {
    return dispatch => (
        new Promise((resolve, reject) => {
            Http.get('/api/v1/users/followers?id=' + id)
                .then(({data}) => {
                    dispatch(action.setFollowers(data.followers));
                    resolve({friendships: data.followers});
                })
                .catch(err => reject(err))
        })
    )
}

export function getFollows(id) {
    return dispatch => (
        new Promise((resolve, reject) => {
            Http.get('/api/v1/users/follows?id=' + id)
                .then(({data}) => {
                    dispatch(action.setFollows(data.follows));
                    resolve({friendships: data.follows});
                })
                .catch(err => reject(err))
        })
    )
}

export function checkIsUsernameUnique(username) {
    return new Promise((resolve, reject) => {
        Http.get('/api/v1/users/unique?username=' + username)
            .then(({data}) => {
                resolve(data);
            })
            .catch(err => reject(err.response.data));
    })
}

export function updateAvatar(avatar) {
    return dispatch => (
        new Promise((resolve, reject) => {
                Http.put('/api/v1/users/avatar', avatar, {headers: {'Content-Type': 'multipart/form-data'}})
                    .then(({data}) => {
                        dispatch(action.updateAvatar(data.avatar));
                        resolve(data);
                    })
                    .catch(err => reject(err))
            }
        ));
}

export function deleteAvatar() {
    return dispatch => (
        new Promise((resolve, reject) => {
                Http.delete('/api/v1/users/avatar')
                    .then(() => {
                        dispatch(action.deleteAvatar());
                        resolve();
                    })
                    .catch(err => reject(err))
            }
        ));
}

export function setPrivate() {
    return dispatch => (
        new Promise((resolve, reject) => {
                Http.post('/api/v1/users/privacy')
                    .then(({data}) => {
                        dispatch(action.setPrivate());
                        resolve(data.message);
                    })
                    .catch(err => reject(err))
            }
        ));
}

export function setPublic() {
    return dispatch => (
        new Promise((resolve, reject) => {
                Http.delete('/api/v1/users/privacy')
                    .then(({data}) => {
                        dispatch(action.setPublic());
                        resolve(data.message);
                    })
                    .catch(err => reject(err))
            }
        ));
}

export function getBlacklisted() {
    return dispatch => (
        new Promise((resolve, reject) => {
                Http.get('/api/v1/users/blacklist')
                    .then(({data}) => {
                        dispatch(setBlacklistedUsers(data.data));
                        resolve();
                    })
                    .catch(err => reject(err))
            }
        ));
}

export function addToBlacklist(data) {
    return dispatch => (
        new Promise((resolve, reject) => {
                Http.post('/api/v1/users/blacklist', data)
                    .then(({data}) => {
                        dispatch(action.setBlacklisted());
                        resolve(data.message);
                    })
                    .catch(err => reject(err))
            }
        ));
}

export function removeFromBlacklist(id) {
    return dispatch => (
        new Promise((resolve, reject) => {
                Http.delete('/api/v1/users/blacklist?id=' + id)
                    .then(({data}) => {
                        dispatch(action.setUnblacklisted());
                        dispatch(removeFromBlackListedUsers(id));
                        resolve(data.message);
                    })
                    .catch(err => reject(err))
            }
        ));
}
