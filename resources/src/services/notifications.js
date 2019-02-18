import Http from "../Http";
import {addNotifications} from "../store/actions/notifications";


export function getNotifications(page) {
    return dispatch => (new Promise((resolve, reject) => {
            Http.get('/api/v1/notifications?page=' + page)
                .then(({data}) => {
                    dispatch(addNotifications(data));
                    resolve(data);
                })
                .catch(err => reject(err))
        }
    ));
}