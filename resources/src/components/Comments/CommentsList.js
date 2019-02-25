import React from "react";
import Comment from "./Comment";
import styles from './comment.module.css';

const CommentsList = ({comments}) =>
    <div className={styles.commentsList}>
        {
            comments.map(
                item => <Comment key={item.id} comment={item}/>
            )
        }
    </div>;


export default React.memo(CommentsList);