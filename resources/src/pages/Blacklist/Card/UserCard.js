import React from "react";
import styles from './card.module.css';
import {Icon} from "antd";
import Username from "./Username";
import RemoveButton from "./RemoveButton";

const UserCard = ({avatar, username, removeUser}) => (
    <div className={styles.userCard}>
        <div className={styles.user}>
            {
                avatar ?
                    <div className={styles.avatar} style={{backgroundImage: `url(${avatar})`}}/>
                    : <DefaultAvatar/>
            }
            <Username username={username}/>
        </div>
       <RemoveButton removeUser={removeUser}/>
    </div>
);

const DefaultAvatar = () => (
    <div className={styles.avatar}>
        <Icon type='user' style={{fontSize: '50px'}}/>
    </div>
);

export default UserCard;