import styles from './card.module.css';
import React from "react";

const Username = ({username}) =>
    <div className={styles.usernameWrapper}>
        <span className={styles.username}>{username}</span>
    </div>;

export default Username;