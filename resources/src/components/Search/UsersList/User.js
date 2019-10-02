import React from "react";
import PropTypes from 'prop-types';

import DefaultAvatar from "components/DefaultAvatar";
import {Link} from "react-router-dom";
import styles from './styles.module.css'

const User = ({username, avatar, bio, closeBar}) => (
  <Link to={'/' + username} onClick={closeBar} className={styles.user}>
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
  closeBar: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
  avatar: PropTypes.string
};

export default User;
