import React from "react";
import {Icon} from "antd";
import {Link} from "react-router-dom";

import DefaultAvatar from "components/DefaultAvatar";

import styles from './user.module.css';

const User = ({user, onClick, remove}) => (
  <Link to={`/${user.username}`} onClick={onClick} className={styles.container}>
    {
      user.avatar
        ? <img className={styles.avatar} src={user.avatar} alt={'Avatar'}/>
        : <DefaultAvatar className={styles.avatar} fontSize={'22px'}/>
    }
    <span className={styles.username}>{user.username}</span>
    {
      remove && <Icon type='close' onClick={remove} className={styles.close}/>
    }
  </Link>
);

export default User;
