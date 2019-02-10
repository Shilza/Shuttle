import Http from "../Http";
import {setUsers} from "../store/actions/search";

export function search(username) {
    return dispatch => (
        new Promise((resolve, reject) => {
                Http.get('/api/v1/search?username=' + username)
                    .then(({data}) => {
                        dispatch(setUsers(data.data));
                        resolve();
                    })
                    .catch(err => reject(err))
            }
        ));
}
