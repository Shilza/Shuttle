import React, {useEffect, useRef} from "react";
import PropTypes from 'prop-types';
import Comment from "./Comment";
import styles from './comment.module.css';

const CommentsList = ({comments}) => {
    let scrollRef = useRef();

    useEffect(() => {
        scrollRef.current.scrollTo(0, scrollRef.current.scrollHeight);
    }, []);

    return (
        <div ref={scrollRef} className={styles.commentsList}>
            {
                comments.map(
                    item => <Comment key={item.id} comment={item}/>
                )
            }
        </div>
    );
};


CommentsList.propTypes = {
    comments: PropTypes.array.isRequired
};

export default React.memo(CommentsList);