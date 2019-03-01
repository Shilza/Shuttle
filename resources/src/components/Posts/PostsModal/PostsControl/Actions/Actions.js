import React, {useEffect} from "react";
import PropTypes from 'prop-types';
import {Icon} from "antd";
import styles from './actions.module.css';
import Like from "./Like";
import {addSmoothScrolling} from "../../../../../utils/scrolling";
import {convertTime} from "../../../../../utils/timeConverter";
import Save from "./Save";

const Actions = ({post}) => {

    useEffect(() => {
        addSmoothScrolling('postCommentLink' + post.id);
    }, []);

    const {likes_count, created_at, isLiked, id} = post;

    return (
        <div className={styles.actionsContainer}>
            <div className={styles.actions}>
                <Like type='post' id={id} isLiked={isLiked} likesCount={likes_count}/>
                <a className={styles.action} id={'postCommentLink' + id} href={'#commentInputContainer' + id}>
                    <Icon type="message"/>
                </a>
                <Save post={post}/>
            </div>
            <time dateTime={created_at}>{`${convertTime(created_at)} ago`}</time>
        </div>
    );
};

Actions.propTypes = {
    post: PropTypes.shape({
        likes_count: PropTypes.number,
        created_at: PropTypes.string.isRequired,
        isLiked: PropTypes.bool.isRequired,
        id: PropTypes.number.isRequired
    }).isRequired
};

export default React.memo(Actions);