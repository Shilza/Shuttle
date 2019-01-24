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
                    resolve();
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
                    resolve();
                })
                .catch(err => reject(err))
        })
    )
}