import Http from "../Http";
import * as action from "../store/actions/users";

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