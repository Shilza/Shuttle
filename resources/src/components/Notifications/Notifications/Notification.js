import React from "react";
import DefaultAvatar from "../../DefaultAvatar/DefaultAvatar";
import {Link} from "react-router-dom";
import styles from './notifications.module.css';
import {convertTime} from "../../../utils/timeConverter";

const Notification = ({item}) => {
    const {username, avatar, info, post_src, created_at} = item;
    return (
        <div className={styles.notificationCard}>
            <div className={styles.avatar}>
                {
                    avatar ? <img src={avatar}/> : <DefaultAvatar fontSize={'30px'}/>
                }
            </div>
            <Link to={`/${username}`}>
                <span>{username}</span>
            </Link>
            <span>{info}</span>
            {
                post_src && <img src={post_src}/>
            }
            {convertTime(created_at)}
        </div>
    );
};

export default Notification;