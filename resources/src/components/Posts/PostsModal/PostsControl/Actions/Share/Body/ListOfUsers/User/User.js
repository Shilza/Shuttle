import React, {useState} from "react";
import PropTypes from 'prop-types';

import DefaultAvatar from "components/DefaultAvatar";

import styles from './user.module.css';

const User = ({id, username, avatar, send}) => {
  const [isSent, setIsSent] = useState(false);

  const sendMessage = () => {
    send(id);
    setIsSent(true);
  };

  return (
    <li className={styles.container}>
      {
        avatar
          ? <img className={styles.avatar} src={avatar} alt={`${username}'s avatar`}/>
          : <DefaultAvatar fontSize={'18px'} className={styles.avatar}/>
      }
      <div className={styles.info}>
        <span className={styles.username}>{username}</span>
      </div>
      {
        isSent
          ? <button className={styles.sentButton}>Sent</button>
          : <button className={styles.sendButton} onClick={sendMessage}>Send</button>
      }
    </li>
  );
};

User.propTypes = {
  id: PropTypes.number.isRequired,
  username: PropTypes.string.isRequired,
  send: PropTypes.func.isRequired,
  avatar: PropTypes.string
};

export default User;
