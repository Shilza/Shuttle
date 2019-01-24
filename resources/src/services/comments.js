import Http from "../Http";
import {addComment, removeComment, setComments} from "../store/actions/comments";

export function create(commentData) {
    return dispatch => (
        new Promise((resolve, reject) => {
                Http.post('/api/v1/comments', commentData)
                    .then(({data}) => {
                        dispatch(addComment(data.comment));
                        resolve(data);
                    })
                    .catch(err => reject(err))
            }
        ));
}

export function remove(id) {
    return dispatch => (
        new Promise((resolve, reject) => {
                Http.delete('/api/v1/comments?id=' + id)
                    .then(({data}) => {
                        dispatch(removeComment(id));
                        resolve(data);
                    })
                    .catch(err => reject(err))
            }
        ));
}

export function getComments(id) {
    return dispatch => (
        new Promise((resolve, reject) => {
                Http.get('/api/v1/comments?post_id=' + id)
                    .then(({data}) => {
                        dispatch(setComments(data.data))
                    })
                    .catch(err => reject(err))
            }
        ));
}