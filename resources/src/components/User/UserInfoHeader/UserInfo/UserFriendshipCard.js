import React from "react";
import PropTypes from 'prop-types';
import {Link} from "react-router-dom";

import DefaultAvatar from "components/DefaultAvatar";
import styles from './friendships.module.css';

const UserFriendshipCard = ({avatar, username, closeModal}) =>
  <li>
    <Link to={'/' + username} onClick={closeModal} className={styles.cardContainer}>
      {
        avatar
          ? <img src={avatar} alt='avatar' className={styles.avatar}/>
          : <div className={styles.avatar}><DefaultAvatar fontSize={'20px'}/></div>
      }
      <span>{username}</span>
    </Link>
  </li>;

UserFriendshipCard.propTypes = {
  avatar: PropTypes.string,
  username: PropTypes.string.isRequired,
  closeModal: PropTypes.func.isRequired
};

export default React.memo(UserFriendshipCard);
