import React from "react";
import styles from './comment.module.css';
import {convertTime} from "../../utils/timeConverter";
import LikesContainer from "./LikesContainer";
import * as LikeService from "../../services/likes";
import {connect} from "react-redux";
import {setIsCommentsModalOpen, setSelectedComment} from "../../store/actions/comments";
import {Link} from "react-router-dom";

const Comment = ({comment, dispatch}) => {

    const {isLiked, likes_count, owner, text, created_at} = comment;

    const openModal = () => {
        dispatch(setIsCommentsModalOpen(true));
        dispatch(setSelectedComment(comment));
    };

    const onLikeClick = event => {
        event.stopPropagation();
        const data = {
            entity_id: comment.id,
            type: 'comment'
        };
        dispatch(comment.isLiked ? LikeService.unlike(data) : LikeService.like(data));
    };

    return (
        <div className={styles.comment} onClick={openModal}>
            <div>
                <Link to={'/' + owner} onClick={e => e.stopPropagation()} className={styles.username}>{owner}</Link>
                <span>{text}</span>
            </div>
            <div className={styles.metaContainer}>
                <time dateTime={created_at}>{convertTime(created_at)}</time>
                <LikesContainer isLiked={isLiked} likesCount={likes_count} like={onLikeClick}/>
            </div>
        </div>
    )
};


export default connect()(Comment);