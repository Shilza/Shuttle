import Http from "../Http";
import *as actions from "../store/actions/posts";

export function create(postData) {
    return dispatch => (
        new Promise((resolve, reject) => {
                Http.post('/api/v1/posts', postData, {headers: {'Content-Type': 'multipart/form-data'}})
                    .then(({data}) => {
                        dispatch(actions.addPost(data.post));
                        resolve(data);
                    })
                    .catch(err => reject(err))
            }
        ));
}

export function remove(id) {
    return dispatch => (
        new Promise((resolve, reject) => {
                Http.delete('/api/v1/posts?id=' + id,)
                    .then(({data}) => {
                        dispatch(actions.removePost(id));
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
                        dispatch(actions.setPosts(data.data))
                    })
                    .catch(err => reject(err))
            }
        ));
}

export function getSavedPosts(compilationName) {
    return dispatch => (
        new Promise((resolve, reject) => {
                Http.get('/api/v1/compilations/posts?compilation=' + compilationName)
                    .then(({data}) => {
                        dispatch(actions.setSavedPosts(data.data));
                        resolve();
                    })
                    .catch(err => reject(err))
            }
        ));
}

export function save(data) {
    return dispatch => (
        new Promise((resolve, reject) => {
                Http.post('/api/v1/posts/save', data)
                    .then(() => dispatch(actions.save(data.post_id)))
                    .catch(err => reject(err))
            }
        ));
}


export function removeSavedPost(postId) {
    return dispatch => (
        new Promise((resolve, reject) => {
                Http.delete('/api/v1/posts/save?post_id=' + postId)
                    .then(() => dispatch(actions.removeSavedPost(postId)))
                    .catch(err => reject(err))
            }
        ));
}