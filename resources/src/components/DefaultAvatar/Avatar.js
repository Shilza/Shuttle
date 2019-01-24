import {Icon} from "antd";
import React from "react";
import styles from './avatar.module.css';

const Avatar = () => (
    <div className={styles.avatar}>
        <Icon type='user' />
    </div>
);

export default Avatar