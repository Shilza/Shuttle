import React from "react";
import PropTypes from 'prop-types';
import styles from './userInfo.module.css';

const FollowsButton = ({followsCount, onClickFollows}) => (
  <li className={styles.unitContainer} onClick={onClickFollows}>
    <span className={styles.unitNumber}>{followsCount}</span>
    <button className={styles.simpleTextStyledItem}>
      Follows
    </button>
  </li>
);

FollowsButton.propTypes = {
  followsCount: PropTypes.number.isRequired,
  onClickFollows: PropTypes.func.isRequired
};

export default React.memo(FollowsButton);
