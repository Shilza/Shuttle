import React from "react";
import styles from './comment.module.css';
import {Icon} from "antd";
import {convertTime} from "../../utils/timeConverter";

const Comment = ({comment, like}) => (
    <div>
        <div className={styles.comment}>
            <div>
                <span className={styles.username}>{comment.owner}</span>
                <span>{comment.text}</span>
            </div>
            <div className={styles.metaContainer}>
                <time dateTime={comment.created_at}>{convertTime(comment.created_at)}</time>
                <div>
                    <span className={styles.likesCount}>{comment.likes_count || ''}</span>
                    {
                        comment.isLiked ?
                            <Icon type="heart" style={{color: 'rgba(255,0,0,1)'}} onClick={() => like(comment)}/>
                            :
                            <Icon type="heart" style={{color: 'rgba(0,0,0,1)'}} onClick={() => like(comment)}/>
                    }
                </div>
            </div>
        </div>
    </div>
);

export default Comment;