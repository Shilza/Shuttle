import Http from "../Http";
import * as action from "../store/actions/likes";

export function like(data) {
    return dispatch => (
        new Promise((resolve, reject) => {
                Http.post('/api/v1/like', data)
                    .then(() => dispatch(action.like(data)))
                    .catch(err => reject(err))
            }
        ));
}

export function unlike(data) {
    return dispatch => (
        new Promise((resolve, reject) => {
                Http.post('/api/v1/unlike', data)
                    .then(() => dispatch(action.unlike(data)))
                    .catch(err => reject(err))
            }
        ));
}