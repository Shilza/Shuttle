import React from "react";
import styles from './card.module.css';

const RemoveButton = ({removeUser}) =>
    <button
        className={styles.removeButton}
        onClick={removeUser}
    >
        Remove
    </button>;

export default RemoveButton;