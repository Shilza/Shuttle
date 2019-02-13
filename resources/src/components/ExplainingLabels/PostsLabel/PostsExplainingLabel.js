import styles from './postsExplainingLabel.module.css';
import navigationStyles from '../../navigationPanel.module.css';
import React from "react";

const PostsExplainingLabel = () => (
    <div className={navigationStyles.sectionContainer}>
        <div className={navigationStyles.iconContainer}>
            <div className={styles.pictureIcon}/>
        </div>
        <span className={navigationStyles.sectionLabel}>Images</span>
        <span>
            Pictures are not yet post
        </span>
    </div>
);

export default PostsExplainingLabel;