import React from "react";
import styles from './modal.module.css';

const CloseButton = ({closeModal}) =>
    <button onClick={closeModal}
            className={styles.closeButton}
            aria-label="Close Modal">
        <svg className={styles.closeIcon} viewBox="0 0 40 40">
            <path d="M 10,10 L 30,30 M 30,10 L 10,30"/>
        </svg>
    </button>;

export default CloseButton;