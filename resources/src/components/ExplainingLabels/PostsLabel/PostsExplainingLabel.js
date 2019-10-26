import styles from './postsExplainingLabel.module.css';
import React from "react";
import ExplainingLabel from "../ExplainingLabel";

const PostsExplainingLabel = () =>
    <ExplainingLabel icon={<div className={styles.pictureIcon}/>} text='Posts'>
       <span>
            Media are not yet post
        </span>
    </ExplainingLabel>;

export default PostsExplainingLabel;
