import Http from "../Http";
import * as action from "../store/actions/posts";
import {addComments} from "../store/actions/comments";

export function getFeed(page) {
    return dispatch => (
        new Promise((resolve, reject) => {
                Http.get('/api/v1/feed?page=' + page)
                    .then(({data}) => {
                        dispatch(action.addFeedPosts(data));
                        dispatch(addComments({data: data.comments}));
                        resolve(data);
                    })
                    .catch(err => reject(err))
            }
        ));
}
