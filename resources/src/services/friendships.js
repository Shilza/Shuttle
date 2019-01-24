import Http from "../Http";
import * as action from "../store/actions/friendships";

export function follow(id) {
    return dispatch => (
        new Promise((resolve, reject) => {
                Http.post('/api/v1/friendships/follow', id)
                    .then(() => dispatch(action.follow()))
                    .catch(err => reject(err))
            }
        ));
}

export function unfollow(id) {
    return dispatch => (
        new Promise((resolve, reject) => {
                Http.post('/api/v1/friendships/unfollow', id)
                    .then(() => dispatch(action.unfollow()))
                    .catch(err => reject(err))
            }
        ));
}