import React from "react";
import {Button} from "antd";
import styles from './userCard.module.css';

const UserRequestCard = ({item}) => (
    <div className={styles.userCardContainer}>
        <div style={{width: 50, height: 50, borderRadius: '50%', background: 'yellow', margin: 0}}/>
        <div className={styles.subContainer}>
            {item.username}
            <div className={styles.actionButtons}>
                <Button size={'small'}>Accept</Button>
                <Button size={'small'}>Deny</Button>
            </div>
        </div>
    </div>
);

export default UserRequestCard;