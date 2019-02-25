import {Icon} from "antd";
import React from "react";
import styles from './avatar.module.css';

const DefaultAvatar = ({fontSize = '50px', color='#3ea1fd'}) =>
    <div className={styles.avatar}>
        <Icon type='user' style={{fontSize, color}}/>
    </div>;

export default DefaultAvatar