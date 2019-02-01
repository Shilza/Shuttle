import {Icon} from "antd";
import React from "react";
import styles from './avatar.module.css';

const DefaultAvatar = ({fontSize = '50px'}) => (
    <div className={styles.avatar}>
        <Icon type='user' style={{fontSize}}/>
    </div>
);

export default DefaultAvatar