import React from "react";
import styles from './post.module.css';
import {Icon} from "antd";

const Post = ({post, open}) => (
    <div className={styles.post} onClick={() => open(post)}>
        {
            post.src.match('.mp4') ?
                <video src={post.src}/> :
                <img
                    alt="user's post"
                    src={post.src}
                />
        }
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