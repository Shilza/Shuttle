import React from "react";

import DefaultAvatar from "components/DefaultAvatar/DefaultAvatar";

import styles from './user.module.css';

const User = ({user, addUser}) => {

  const onClick = () => {
    addUser(user.username);
  };

  return (
    <div onClick={onClick} className={styles.container}>
      {
        user.avatar
          ? <img className={styles.avatar} src={user.avatar} alt={'Avatar'}/>
          : <DefaultAvatar className={styles.avatar} fontSize={'22px'}/>
      }
      <span className={styles.username}>{user.username}</span>
    </div>
  );
};

export default User;
