import React from "react";
import MediaPlayer from "../../MediaPlayer/MediaPlayer";
import styles from './postModal.module.css';
import PostControl from "./PostsControl/PostControl";

const PostModalBody = ({post}) => (
    <article className={styles.postModalContainer}>
        <MediaPlayer media={post.src}/>
        <PostControl post={post}/>
    </article>
);

export default PostModalBody;