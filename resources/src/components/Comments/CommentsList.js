import React from "react";
import PropTypes from 'prop-types';
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

CommentsList.propTypes = {
    comments: PropTypes.array.isRequired
};

export default React.memo(CommentsList);