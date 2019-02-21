import {Icon} from "antd";
import React from "react";
import styles from './comment.module.css';

const LikesContainer = ({isLiked, likesCount, like}) => (
    <div>
        <span className={styles.likesCount}>{likesCount || ''}</span>
        {
            isLiked ?
                <Icon type="heart" className={styles.heartActive} onClick={like}/>
                :
                <Icon type="heart" className={styles.heart} onClick={like}/>
        }
    </div>
);

export default LikesContainer;