import Http from "../Http";
import {
    addComment,
    removeComment,
    addComments,
    setIsCommentsModalOpen,
    setSelectedComment
} from "../store/actions/comments";

export function getComments(id, page) {
    return dispatch => (
        new Promise((resolve, reject) => {
                Http.get(`/api/v1/comments?post_id=${id}&page=${page}`)
                    .then(({data}) => {
                        dispatch(addComments(data));
                        resolve(data);
                    })
                    .catch(err => reject(err))
            }
        ));
}

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
                        dispatch(setIsCommentsModalOpen(false));
                        dispatch(setSelectedComment(undefined));
                        resolve(data);
                    })
                    .catch(err => reject(err))
            }
        ));
}
