import React from "react";
import PropTypes from 'prop-types';

import PostControl from "./PostsControl/PostControl";
import PostMedia from "../../PostMedia/PostMedia";

import styles from './postModal.module.css';

const PostModalBody = ({post}) =>
    <section className={styles.postModalContainer}>
        <PostMedia media={post.src} postId={post.id} marks={post.marks}/>
        <PostControl post={post}/>
    </section>;

PostModalBody.propTypes = {
    post: PropTypes.shape({
        src: PropTypes.string.isRequired,
        id: PropTypes.number.isRequired
    })
};

export default React.memo(PostModalBody);
