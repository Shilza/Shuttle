import React from "react";
import styles from './post.module.css';
import {Icon} from "antd";
import Media from "./Media";

const iconsStyle = {marginLeft: '10px'};

const Post = ({post, open}) =>
    <div className={styles.post} onClick={() => open(post)}>
        <Media src={post.src}/>
        <div className={styles.metaInfo}>
            <div>
                {post.likes_count}
            <Icon style={iconsStyle} type='heart'/>
            </div>
            <div>
                {post.comments_count}
            <Icon style={iconsStyle} type='message'/>
            </div>
        </div>
    </div>;

export default React.memo(Post);