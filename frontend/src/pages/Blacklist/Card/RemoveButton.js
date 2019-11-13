import React from "react";
import PropTypes from 'prop-types';
import styles from './card.module.css';

const RemoveButton = ({removeUser}) =>
    <button
        className={styles.removeButton}
        onClick={removeUser}
    >
        Remove
    </button>;

RemoveButton.propTypes = {
    removeUser: PropTypes.func.isRequired
};

export default RemoveButton;