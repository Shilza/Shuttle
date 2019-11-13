import React from "react";
import PropTypes from 'prop-types';
import styles from './userInfo.module.css';

const FollowersButton = ({followersCount, onClickFollowers}) => (
  <li className={styles.unitContainer} onClick={onClickFollowers}>
    <span className={styles.unitNumber}>{followersCount}</span>
    <button className={styles.simpleTextStyledItem}>
      Followers
    </button>
  </li>
);

FollowersButton.propTypes = {
  followersCount: PropTypes.number.isRequired,
  onClickFollowers: PropTypes.func.isRequired
};

export default React.memo(FollowersButton);
