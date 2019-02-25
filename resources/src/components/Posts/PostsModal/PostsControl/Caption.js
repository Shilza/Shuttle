import styles from './postControl.module.css';
import React from "react";

const Caption = ({caption, owner}) => (
    <>
        {
            caption &&
            <div className={styles.caption}>
                <h4 className={styles.captionUsername}>{owner}</h4>
                <span>{caption}</span>
            </div>
        }
    </>
);

export default React.memo(Caption);