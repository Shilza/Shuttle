import React from "react";

import User from "../User";
import styles from './markedUsers.module.css';

const MarkedUsers = ({users, removeUser, onClickUser, className}) => (
  <div>
    <div className={styles.header}>On this video</div>
    <div className={`${styles.container} ${className}`}>
      {
        users && users.map(user =>
          <User
            key={user.username}
            user={user}
            onClick={onClickUser}
            remove={removeUser ? () => removeUser(user.username): undefined}
          />
        )
      }
    </div>
  </div>
);

export default MarkedUsers;
