import Http from "../Http";
import * as action from "../store/actions/posts";

export function getFeed(page) {
  return dispatch => (
    new Promise((resolve, reject) => {
        Http.get('/api/v1/feed?page=' + page)
          .then(({data}) => {
            dispatch(action.addFeedPosts(data));
            resolve(data);
          })
          .catch(err => reject(err))
      }
    ));
}
