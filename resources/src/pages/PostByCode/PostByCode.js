import React, {useEffect, useState} from "react";
import PropTypes from 'prop-types';
import {connect} from "react-redux";

import {getPostByCode} from "services/post";
import {removeCurrentPost} from "store/actions/posts";
import PostModalBody from "components/Posts/PostsModal/PostModalBody";

import styles from './postByCode.module.css';

const PostByCode = ({dispatch, match, currentPost}) => {

  const [error, setError] = useState('');

  useEffect(() => {
    dispatch(getPostByCode(match.params.code))
      .catch(err => setError(err.message));
    return () => dispatch(removeCurrentPost());
  }, []);

  return (
    <div className={styles.container}>
      {
        error
          ? <div>{error}</div>
          : currentPost && <PostModalBody post={currentPost}/>
      }
    </div>
  )
};

PostByCode.propTypes = {
  dispatch: PropTypes.func.isRequired,
  match: PropTypes.object,
  currentPost: PropTypes.object
};

const mapStateToProps = state => ({
  currentPost: state.posts.currentPost
});

export default connect(mapStateToProps)(PostByCode);
