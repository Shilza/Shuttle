import React from "react";
import styles from './postModal.module.css';
import PostControl from "./PostsControl/PostControl";
import PostMedia from "../../PostMedia/PostMedia";

const PostModalBody = ({post, postIdToBeSaved}) => (
    <article className={styles.postModalContainer}>
        <PostMedia media={post.src} showSavedBar={post.id === postIdToBeSaved}/>
        <PostControl post={post}/>
    </article>
);

export default PostModalBody;