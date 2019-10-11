import React from "react";
import PropTypes from 'prop-types';
import {Link} from "react-router-dom";

import DefaultAvatar from "components/DefaultAvatar";
import styles from '../postControl.module.css';

const Header = ({username, location, avatar}) => (
  <Link to={username}>
    <header className={styles.header}>
      {
        avatar
          ? <img src={avatar} alt='avatar' className={styles.avatar}/>
          : <div className={styles.avatar}><DefaultAvatar fontSize={'16px'}/></div>
      }
      <div className={styles.usernameLocation}>
        <span className={styles.username}>{username}</span>
        <span className={styles.location}>{location}</span>
      </div>
    </header>
  </Link>
);

Header.propTypes = {
  username: PropTypes.string.isRequired,
  location: PropTypes.string,
  avatar: PropTypes.string
};

export default React.memo(Header);
