import React, {useEffect} from "react";
import PropTypes from 'prop-types';

import {isMobile} from "utils";
import PostMedia from "components/PostMedia";
import PostControl from "../PostsControl";

import styles from './postModalBody.module.css';

const PostModalBody = ({post, closeModal, needReplaceLocation = true}) => {

  useEffect(() => {
    if (needReplaceLocation) {
      const url = window.location.origin + '/p/' + post.src.match(/.+?\/.+?\/(.+?)\.+/)[1];
      window.history.pushState({}, null, url);
      return () => window.history.pushState({}, null, `${window.location.origin}/${post.owner}`);
    }
  }, []);

  let style;
  if (post.src.match('.mp4'))
    style = {flexDirection: 'column', height: 'auto'};

  return (
    <section className={isMobile() ? styles.mobileWrapper : styles.wrapper}>
      <div className={styles.container} style={style}>
        <PostMedia
          media={post.src}
          postId={post.id}
          marks={post.marks}
          closeModal={closeModal}
          fullWidth
        />
        <PostControl post={post}/>
      </div>
    </section>
  );
};

PostModalBody.propTypes = {
  post: PropTypes.shape({
    src: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired
  }),
  closeModal: PropTypes.func,
  needReplaceLocation: PropTypes.bool
};

export default React.memo(PostModalBody);
