import React from "react";
import PropTypes from 'prop-types';
import {Icon} from "antd";
import {Link} from "react-router-dom";

import {Button} from 'ui';
import DefaultAvatar from "components/DefaultAvatar";
import styles from './friendships.module.css';


const UserFriendshipCard = ({avatar, onUnfollow, username, id, onRemove, closeModal}) => (
  <li>
    <Link to={'/' + username} onClick={closeModal} className={styles.cardContainer}>
      {
        avatar
          ? <img src={avatar} alt='avatar' className={styles.avatar}/>
          : <div className={styles.avatar}><DefaultAvatar fontSize={'20px'}/></div>
      }
      <span>{username}</span>
    </Link>
    {onRemove && <Icon type={'close'} onClick={() => onRemove(id)} title={'Remove'}/>}
    {onUnfollow && <Button onClick={() => onUnfollow(id)} className={styles.unFollowButton}>Unfollow</Button>}
  </li>
);

UserFriendshipCard.propTypes = {
  avatar: PropTypes.string,
  id: PropTypes.number,
  username: PropTypes.string.isRequired,
  closeModal: PropTypes.func.isRequired,
  onRemove: PropTypes.func,
  onUnfollow: PropTypes.func
};

export default React.memo(UserFriendshipCard);
