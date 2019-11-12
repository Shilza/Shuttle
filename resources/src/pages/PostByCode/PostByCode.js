import React, {useEffect, useState} from "react";
import PropTypes from 'prop-types';
import {connect} from "react-redux";

import {isMobile} from "utils";
import PostModalBody from "components/Posts/PostsModal/PostModalBody";

import styles from './postByCode.module.css';

const PostByCode = ({dispatch, match, currentPost}) => {

  const [error, setError] = useState('');

  useEffect(() => {
    dispatch.posts.getPostByCode(match.params.code)
      .catch((err) => setError(err.response.data.message));
  }, []);

  return (
    <div className={isMobile() ? styles.mobileContainer : styles.container}>
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
