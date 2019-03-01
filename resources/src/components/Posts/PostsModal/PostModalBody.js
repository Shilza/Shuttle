import React from "react";
import PropTypes from 'prop-types';
import styles from './postModal.module.css';
import PostControl from "./PostsControl/PostControl";
import PostMedia from "../../PostMedia/PostMedia";

const PostModalBody = ({post}) =>
    <article className={styles.postModalContainer}>
        <PostMedia media={post.src} postId={post.id}/>
        <PostControl post={post}/>
    </article>;

PostModalBody.propTypes = {
    post: PropTypes.shape({
        src: PropTypes.string.isRequired,
        id: PropTypes.number.isRequired
    })
};

export default React.memo(PostModalBody);