import React from "react";
import styles from './post.module.css';
import {Icon} from "antd";
import PostMedia from "../../PostMedia/PostMedia";

const Post = ({post, open}) => (
    <div className={styles.post} onClick={() => open(post)}>
        <PostMedia media={post.src} postId={post.id}/>
        <div className={styles.metaInfo}>
            <div>
                {post.likes_count}
            <Icon style={{marginLeft: '10px'}} type='heart'/>
            </div>
            <div>
                {post.comments_count}
            <Icon style={{marginLeft: '10px'}} type='message'/>
            </div>
        </div>
    </div>
);

export default Post;