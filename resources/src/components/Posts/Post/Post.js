import React from "react";
import styles from './post.module.css';
import {Icon} from "antd";
import Media from "./Media";

const Post = ({post, open}) => (
    <div className={styles.post} onClick={() => open(post)}>
        <Media src={post.src}/>
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