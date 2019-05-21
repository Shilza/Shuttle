import Http from "../Http";
import * as action from "../store/actions/saved";


export function getCompilations(page = 1) {
    return dispatch => (
        new Promise((resolve, reject) => {
                Http.get('/api/v1/compilations?page=' + page)
                    .then(({data}) => {
                        dispatch(action.addCompilations(data));
                        resolve();
                    })
                    .catch(err => reject(err))
            }
        ));
}

export function removeCompilation(data) {
    return dispatch => (
        new Promise((resolve, reject) => {
                Http.delete('/api/v1/compilations', data)
                    .then(() => dispatch(action.removeCompilation(data)))
                    .catch(err => reject(err))
            }
        ));
}
