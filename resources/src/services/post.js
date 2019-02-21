import Http from "../Http";
import *as actions from "../store/actions/posts";
import {setCurrentPost} from "../store/actions/posts";
import * as CommentService from "./comments";
import {setIsSavedTimeout, setPostToBeSaved} from "../store/actions/saved";

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

export function getPosts(id, page) {
    return dispatch => (
        new Promise((resolve, reject) => {
                Http.get(`/api/v1/posts?owner_id=${id}&page=${page}`)
                    .then(({data}) => {
                        dispatch(actions.addPosts(data));
                        resolve(data);
                    })
                    .catch(err => reject(err))
            }
        ));
}

export function getPostByCode(code) {
    return dispatch => (
        new Promise((resolve, reject) => {
                Http.get('/api/v1/posts/' + code)
                    .then(({data}) => {
                        dispatch(setCurrentPost(data.post));
                        dispatch(CommentService.getComments(data.post.id));
                    })
                    .catch(err => reject(err))
            }
        ));
}

export function getSavedPosts(compilationName, page) {
    return dispatch => (
        new Promise((resolve, reject) => {
                Http.get(`/api/v1/compilations/posts?compilation=${compilationName}&page=${page}`)
                    .then(({data}) => {
                        dispatch(actions.addSavedPosts(data));
                        resolve(data);
                    })
                    .catch(err => reject(err))
            }
        ));
}

export function save(data) {
    return dispatch => (
        new Promise((resolve, reject) => {
                Http.post('/api/v1/posts/save', data)
                    .then(() => {
                        dispatch(actions.save(data.post_id));
                        dispatch(setPostToBeSaved(undefined));
                        dispatch(setIsSavedTimeout(false));
                        resolve();
                    })
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

export function getArchived(page) {
    return dispatch => (
        new Promise((resolve, reject) => {
                Http.get('/api/v1/posts/archive?page=' + page)
                    .then(({data}) => {
                        dispatch(actions.addArchivePosts(data));
                        resolve(data);
                    })
                    .catch(err => reject(err))
            }
        ));
}

export function getLiked(page) {
    return dispatch => (
        new Promise((resolve, reject) => {
                Http.get('/api/v1/posts/liked?page=' + page)
                    .then(({data}) => {
                        dispatch(actions.addLikedPosts(data));
                        resolve(data);
                    })
                    .catch(err => reject(err))
            }
        ));
}

export function addToArchive(postData) {
    return dispatch => (
        new Promise((resolve, reject) => {
                Http.post('/api/v1/posts/archive', postData)
                    .then(({data}) => {
                        dispatch(actions.removePost(postData.post_id));
                        resolve(data.message);
                    })
                    .catch(err => reject(err.response.data.message))
            }
        ));
}

export function deleteFromArchive(id) {
    return dispatch => (
        new Promise((resolve, reject) => {
                Http.delete('/api/v1/posts/archive?post_id=' + id)
                    .then(({data}) => {
                        dispatch(actions.removePost(id));
                        resolve(data.message);
                    })
                    .catch(err => reject(err.response.data.message))
            }
        ));
}
