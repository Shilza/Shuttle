import React from "react";
import PropTypes from 'prop-types';
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

Post.propTypes = {
    post: PropTypes.shape({
        src: PropTypes.string.isRequired,
        likes_count: PropTypes.number.isRequired,
        comments_count: PropTypes.number.isRequired
    }),
    open: PropTypes.func.isRequired
};

export default React.memo(Post);