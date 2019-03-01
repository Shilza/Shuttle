import React from "react";
import PropTypes from 'prop-types';
import styles from './searchBar.module.css'
import DefaultAvatar from "../DefaultAvatar/DefaultAvatar";
import {Link} from "react-router-dom";

const User = ({username, avatar}) => (
    <Link to={'/' + username} className={styles.user}>
        {
            avatar
                ? <img className={styles.avatar} src={avatar} alt={'avatar'}/>
                : <div className={styles.avatar}><DefaultAvatar/></div>
        }
        <span>{username}</span>
    </Link>
);

User.propTypes = {
    username: PropTypes.string.isRequired,
    avatar: PropTypes.string
};

export default User;