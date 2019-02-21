import styles from './postControl.module.css';
import React from "react";

const Caption = ({post}) => (
    <>
        {
            post.caption &&
            <div className={styles.caption}>
                <h4 className={styles.captionUsername}>{post.owner}</h4>
                <span>{post.caption}</span>
            </div>
        }
    </>
);

export default Caption;