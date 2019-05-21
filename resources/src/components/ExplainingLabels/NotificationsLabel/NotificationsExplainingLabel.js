import React from "react";
import ExplainingLabel from "../ExplainingLabel";
import styles from './styles.module.css';
import {Icon} from "antd";

const NotificationsExplainingLabel = () => (
    <div className={styles.container}>
        <ExplainingLabel icon={<Icon type='bell' className={styles.icon} />} text='Notifications'>
        <span className={styles.text}>
            Here you can see the photos in which you are marked
        </span>
        </ExplainingLabel>
    </div>
);

export default NotificationsExplainingLabel;