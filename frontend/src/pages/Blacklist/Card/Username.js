import React from "react";
import PropTypes from 'prop-types';
import styles from './card.module.css';

const Username = ({username}) =>
    <div className={styles.usernameWrapper}>
        <span className={styles.username}>{username}</span>
    </div>;

Username.propTypes = {
    username: PropTypes.string.isRequired
};

export default Username;