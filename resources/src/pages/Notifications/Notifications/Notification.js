import React from "react";
import PropTypes from 'prop-types';
import {Link} from "react-router-dom";
import styles from './notifications.module.css';
import {convertTime} from "../../../utils/timeConverter";
import DefaultAvatar from "../../../components/DefaultAvatar/DefaultAvatar";
import PostLink from "./PostLink";

const Notification = ({item}) => {
    const {username, avatar, info, post_src, text, created_at} = item;
    let postLink;
    if (post_src)
        postLink = `/p/${post_src.match(/.+?\/.+?\/(.+?)\.+/)[1]}`;

    return (
        <div className={styles.notificationCard}>
            <Link to={`/${username}`} className={styles.avatar}>
                {
                    avatar ? <img src={avatar} alt={'avatar'}/> : <DefaultAvatar fontSize={'30px'}/>
                }
            </Link>
            <div className={styles.infoWrapper}>
            <div className={styles.infoContainer}>
                <Link to={`/${username}`} className={styles.usernameLink}>
                    <span>{username}</span>
                </Link>
                <span>{info}</span>
                {
                    text && <Link to={postLink} className={styles.comment}>{text}</Link>
                }
            </div>
            <span className={styles.timeContainer}>
                    <time>{convertTime(created_at)}</time> ago
                </span>
            </div>
            {
                post_src && <PostLink postSrc={post_src} link={postLink}/>
            }
        </div>
    );
};

Notification.propTypes = {
    item: PropTypes.shape({
        username: PropTypes.string.isRequired,
        avatar: PropTypes.string,
        info: PropTypes.string,
        post_src: PropTypes.string,
        text: PropTypes.string,
        created_at: PropTypes.string
    })
};

export default Notification;