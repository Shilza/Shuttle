import React from "react";
import styles from './friendships.module.css';
import DefaultAvatar from "../../../DefaultAvatar/DefaultAvatar";

const UserFriendshipCard = ({user}) => (
    <li className={styles.cardContainer}>
        {
            user.avatar
                ? <img src={user.avatar} alt='avatar' className={styles.avatar}/>
                : <div className={styles.avatar}><DefaultAvatar fontSize={'20px'}/></div>
        }
        <span>{user.username}</span>
    </li>
);

export default UserFriendshipCard;