import React from "react";
import PropTypes from 'prop-types';
import styles from './styles.module.css'
import DefaultAvatar from "../../DefaultAvatar/DefaultAvatar";
import {Link} from "react-router-dom";

const User = ({username, avatar, bio}) => (
    <Link to={'/' + username} className={styles.user}>
        {
            avatar
                ? <img className={styles.avatar} src={avatar} alt={'avatar'}/>
                : <div className={styles.avatar}>
                    <DefaultAvatar fontSize={'26px'}/>
                </div>
        }
        <div className={styles.userInfo}>
            <span className={styles.username}>{username}</span>
            <span className={styles.bio}>{bio}</span>
        </div>
    </Link>
);

User.propTypes = {
    username: PropTypes.string.isRequired,
    avatar: PropTypes.string
};

export default User;