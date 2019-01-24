import React from "react";
import styles from './searchBar.module.css'
import Avatar from "../components/DefaultAvatar/Avatar";
import {Link} from "react-router-dom";

const User = ({user}) => (
    <div className={styles.user}>
        <Link to={user.username}>
        {
            user.avatar
                ? <img className={styles.avatar} src={user.avatar}/>
                : <Avatar/>
        }
        </Link>
        <Link to={user.username}>
            {user.username}
        </Link>
        <span>
            {user.bio}
            </span>
    </div>
);

export default User;