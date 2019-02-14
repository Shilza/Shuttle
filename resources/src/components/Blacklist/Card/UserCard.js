import React from "react";
import styles from './card.module.css';
import {Icon} from "antd";

const UserCard = ({avatar, username, removeUser}) => (
    <div className={styles.userCard}>
        <div className={styles.user}>
            {
                avatar ?
                    <div className={styles.avatar} style={{backgroundImage: `url(${avatar})`}}/>
                    : <DefaultAvatar/>
            }
            <div className={styles.usernameWrapper}>
                <span className={styles.username}>{username}</span>
            </div>
        </div>
        <button
            className={styles.removeButton}
            onClick={removeUser}
        >
            Remove
        </button>
    </div>
);

const DefaultAvatar = () => (
    <div className={styles.avatar}>
        <Icon type='user' style={{fontSize: '50px'}}/>
    </div>
);

export default UserCard;