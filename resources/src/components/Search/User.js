import React from "react";
import styles from './searchBar.module.css'
import DefaultAvatar from "../DefaultAvatar/DefaultAvatar";
import {Link} from "react-router-dom";

const User = ({user}) => (
    <Link to={'/' + user.username} className={styles.user}>
        {
            user.avatar
                ? <img className={styles.avatar} src={user.avatar}/>
                : <div className={styles.avatar}><DefaultAvatar/></div>
        }
        <span>{user.username}</span>
        <span>{user.bio}</span>
    </Link>
);

export default User;