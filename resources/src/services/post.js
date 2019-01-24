import Http from "../Http";
import {addPost, setPosts, removePost} from "../store/actions/posts";

export function create(postData) {
    return dispatch => (
        new Promise((resolve, reject) => {
                Http.post('/api/v1/posts', postData, {headers: {'Content-Type': 'multipart/form-data'}})
                    .then(({data}) => {
                        dispatch(addPost(data.post));
                        resolve(data);
                    })
                    .catch(err => reject(err))
            }
        ));
}

export function remove(id) {
    return dispatch => (
        new Promise((resolve, reject) => {
                Http.delete('/api/v1/posts?id=' + id, )
                    .then(({data}) => {
                        dispatch(removePost(id));
                        resolve(data);
                    })
                    .catch(err => reject(err))
            }
        ));
}

export function getPosts(id) {
    return dispatch => (
        new Promise((resolve, reject) => {
                Http.get('/api/v1/posts?owner_id=' + id)
                    .then(({data}) => {
                        dispatch(setPosts(data.data))
                    })
                    .catch(err => reject(err))
            }
        ));
}