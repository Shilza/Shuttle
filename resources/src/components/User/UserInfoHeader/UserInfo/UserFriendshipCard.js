import React from "react";
import styles from './friendships.module.css';
import DefaultAvatar from "../../../DefaultAvatar/DefaultAvatar";
import {Link} from "react-router-dom";

const UserFriendshipCard = ({avatar, username}) =>
    <li>
        <Link to={'/' + username} className={styles.cardContainer}>
            {
                avatar
                    ? <img src={avatar} alt='avatar' className={styles.avatar}/>
                    : <div className={styles.avatar}><DefaultAvatar fontSize={'20px'}/></div>
            }
            <span>{username}</span>
        </Link>
    </li>;

export default React.memo(UserFriendshipCard);