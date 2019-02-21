import React from "react";
import styles from './postModal.module.css';
import PostControl from "./PostsControl/PostControl";
import PostMedia from "../../PostMedia/PostMedia";

const PostModalBody = ({post}) => (
    <article className={styles.postModalContainer}>
        <PostMedia media={post.src} postId={post.id}/>
        <PostControl post={post}/>
    </article>
);

export default PostModalBody;