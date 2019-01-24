import Http from "../Http";
import * as action from "../store/actions/posts";
import {setComments} from "../store/actions/comments";

export function getFeed() {
    return dispatch => (
        new Promise((resolve, reject) => {
                Http.get('/api/v1/feed')
                    .then(({data}) => {
                        dispatch(action.setPosts(data.data));
                        dispatch(setComments(data.comments));
                    })
                    .catch(err => reject(err))
            }
        ));
}
