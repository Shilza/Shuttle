import React from "react";
import styles from './comment.module.css';
import {convertTime} from "../../utils/timeConverter";
import {connect} from "react-redux";
import {setIsCommentsModalOpen, setSelectedComment} from "../../store/actions/comments";
import {Link} from "react-router-dom";
import Like from "../Posts/PostsModal/PostsControl/Actions/Like";

const Comment = ({comment, dispatch}) => {

    const {isLiked, likes_count, owner, text, created_at, id} = comment;

    const openModal = () => {
        dispatch(setIsCommentsModalOpen(true));
        dispatch(setSelectedComment(comment));
    };

    return (
        <div className={styles.comment} onClick={openModal}>
            <div>
                <Link to={'/' + owner} onClick={e => e.stopPropagation()} className={styles.username}>{owner}</Link>
                <span>{text}</span>
            </div>
            <div className={styles.metaContainer}>
                <time dateTime={created_at}>{convertTime(created_at)}</time>
                <Like type='comment' id={id} isLiked={isLiked} likesCount={likes_count}/>
            </div>
        </div>
    )
};


export default connect()(Comment);