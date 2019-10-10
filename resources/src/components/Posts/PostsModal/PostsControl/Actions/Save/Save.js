import React from "react";
import PropTypes from 'prop-types';
import {connect} from "react-redux";
import {debounce} from "utils/debounce";
import store from 'store';

import styles from './save.module.css';

const Save = ({post, dispatch}) => {

  const save = () => {
    dispatch.saved.setPostToBeSaved(post);
    dispatch.saved.setIsSavedTimeout(true);
    debounce(savedStore => {
      const saved = savedStore.getState().saved;
      if (saved.isSavedTimeout && saved.postToBeSaved) {
        dispatch.posts.saveAsync({post_id: saved.postToBeSaved.id});
      }
    }, 5000)(store);
  };

  const removeSaved = () => dispatch.posts.removeSavedPost(post.id);

  return (
    <div className={styles.save} role='button'>
      {
        post.isSaved
          ? <div className={styles.bookmarkSolid} onClick={removeSaved}/>
          : <div className={styles.bookmarkFlat} onClick={save}/>
      }
    </div>
  );
};

Save.propTypes = {
  post: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired
};

export default connect()(Save);
