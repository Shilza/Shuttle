import React from "react";
import {connect} from "react-redux";
import Comment from "./Comment";
import styles from './comment.module.css';
import * as LikeService from "../../services/likes";

const CommentsList = ({comments, dispatch}) => {

    const like = comment => {
        const data = {
            entity_id: comment.id,
            type: 'comment'
        };
        dispatch(comment.isLiked ? LikeService.unlike(data) : LikeService.like(data));
    };

    return (
        <div className={styles.commentList}>
            {
                comments.map(
                    (item, index) => <Comment key={index} comment={item} like={like}/>
                )
            }
        </div>
    );
};

export default connect()(CommentsList);