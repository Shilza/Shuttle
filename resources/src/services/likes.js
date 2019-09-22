import Http from "../Http";
import * as action from "../store/actions/likes";

export const like = (data) => dispatch =>
  new Promise((resolve, reject) => {
      dispatch(action.like(data));
      Http.post('/api/v1/like', data)
        .catch(err => {
          dispatch(action.unlike(data));
          reject(err);
        })
    }
  );

export const unlike = (data) => dispatch =>
  new Promise((resolve, reject) => {
      dispatch(action.unlike(data));
      Http.post('/api/v1/unlike', data)
        .catch(err => {
          dispatch(action.like(data));
          reject(err);
        });
    }
  );
