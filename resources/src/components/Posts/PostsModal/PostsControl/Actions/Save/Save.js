import React from "react";
import PropTypes from 'prop-types';
import {connect} from "react-redux";
import {debounce} from "utils";
import store from 'store';

import {IconButton} from 'ui';
import bookmarkFlat from './icons/bookmarkFlat.svg';
import bookmarkSolid from './icons/bookmarkSolid.svg';

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
          ? <IconButton ariaLabel='Remove from saved' title='Remove from saved' iconProps={{icon: bookmarkSolid}}
                        onClick={removeSaved}/>
          : <IconButton ariaLabel='Save' title='Save' iconProps={{icon: bookmarkFlat}} onClick={save}/>
      }
    </div>
  );
};

Save.propTypes = {
  post: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired
};

export default connect()(Save);
