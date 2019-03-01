import React from "react";
import PropTypes from 'prop-types';
import styles from './userInfo.module.css';

const PostsCount = ({postsCount}) =>
    <li className={styles.unitContainer}>
        <span className={styles.unitNumber}>{postsCount}</span>
        <a className={styles.simpleTextStyledItem} id='userInfoPostsLink' href={"#postsList"}>Posts</a>
    </li>;

PostsCount.propTypes = {
    postsCount: PropTypes.number.isRequired
};

export default React.memo(PostsCount);