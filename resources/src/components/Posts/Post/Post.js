import React from "react";
import PropTypes from 'prop-types';
import {Icon} from "antd";

import Media from "./Media";

import camera from './icons/camera.svg';
import styles from './post.module.css';

const Post = ({post, open}) => (
    <div className={styles.post} onClick={() => open(post)}>
        <Media src={post.src}/>
        <div className={styles.metaInfo}>
            <div>
                {post.likes_count}
                <Icon className={styles.icon} type='heart'/>
            </div>
            <div>
                {post.comments_count}
                <Icon className={styles.icon} type='message'/>
            </div>
        </div>
      {post.src.match('.mp4') && <img src={camera} alt={'Video'} className={styles.videoCamera}/>}
    </div>
);

Post.propTypes = {
    post: PropTypes.shape({
        src: PropTypes.string.isRequired,
        likes_count: PropTypes.number.isRequired,
        comments_count: PropTypes.number.isRequired
    }),
    open: PropTypes.func.isRequired
};

export default React.memo(Post);
