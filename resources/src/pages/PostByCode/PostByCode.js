import React, {useEffect, useState} from "react";
import PropTypes from 'prop-types';
import {connect} from "react-redux";
import PostModalBody from "components/Posts/PostsModal/PostModalBody";

import styles from './postByCode.module.css';

const PostByCode = ({dispatch, match, currentPost}) => {

  const [error, setError] = useState('');

  useEffect(() => {
    dispatch.posts.getPostByCode(match.params.code)
      .catch(err => setError(err.message));
  }, []);

  return (
    <div className={styles.container}>
      {
        error
          ? <div>{error}</div>
          : currentPost && <PostModalBody post={currentPost} needReplaceLocation={false}/>
      }
    </div>
  )
};

PostByCode.propTypes = {
  dispatch: PropTypes.func.isRequired,
  match: PropTypes.object
};

export default connect((state) => ({currentPost: state.posts.postByCode[0]}))(PostByCode);
