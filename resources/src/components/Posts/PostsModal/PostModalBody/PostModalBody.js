import React from "react";
import PropTypes from 'prop-types';

import PostMedia from "components/PostMedia";
import PostControl from "../PostsControl";

import styles from './postModalBody.module.css';

const PostModalBody = ({post, closeModal}) => {
  const url = window.location.origin + '/p/' + post.src.match(/.+?\/.+?\/(.+?)\.+/)[1];
  window.history.pushState({}, null, url);

  return (
    <section className={styles.container}>
      <PostMedia
        media={post.src}
        postId={post.id}
        marks={post.marks}
        closeModal={closeModal}
        withPlayButton
        fullWidth
      />
      <PostControl post={post}/>
    </section>
  );
};

PostModalBody.propTypes = {
  post: PropTypes.shape({
    src: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired
  }),
  closeModal: PropTypes.func
};

export default React.memo(PostModalBody);
