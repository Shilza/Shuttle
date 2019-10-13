import React from "react";
import {Link} from "react-router-dom";

import DefaultAvatar from "components/DefaultAvatar";
import styles from './user.module.css';


const User = ({username, avatar}) => (
  <Link to={`/${username}`} className={styles.container}>
    {
      avatar
        ? <img src={avatar} alt={`${username} avatar`} className={styles.avatar}/>
        : <DefaultAvatar fontSize={'16px'} className={styles.avatar}/>
    }
    <span className={styles.username}>{username}</span>
  </Link>
);

export default User;
