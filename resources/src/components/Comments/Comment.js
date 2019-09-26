import React from "react";
import PropTypes from 'prop-types';
import {Link} from "react-router-dom";
import {connect} from "react-redux";
import Linkify from 'linkifyjs/react'

import {convertTime} from "utils/timeConverter";
import {setIsCommentsModalOpen, setSelectedComment} from "store/actions/comments";
import Like from "../Posts/PostsModal/PostsControl/Actions/Like/Like";

import styles from './comment.module.css';

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
                <Linkify>{text}</Linkify>
            </div>
            <div className={styles.metaContainer}>
                <time dateTime={created_at}>{convertTime(created_at)}</time>
                <Like type='comment' id={id} isLiked={isLiked} likesCount={likes_count}/>
            </div>
        </div>
    )
};

Comment.propTypes = {
    comment: PropTypes.shape({
        id: PropTypes.number.isRequired,
        isLiked: PropTypes.bool.isRequired,
        likes_count: PropTypes.number,
        owner: PropTypes.string.isRequired,
        text: PropTypes.string.isRequired,
        created_at: PropTypes.string.isRequired
    }).isRequired,
    dispatch: PropTypes.func.isRequired
};

export default connect()(Comment);
