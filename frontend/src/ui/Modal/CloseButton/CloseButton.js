import React from "react";
import PropTypes from 'prop-types';
import styles from './closeButton.module.css';

const CloseButton = ({closeModal, zIndex}) =>
  <button onClick={closeModal}
          className={styles.closeButton}
          aria-label="Close modal"
          title="Close"
          style={{zIndex}}>
    <svg className={styles.closeIcon} viewBox="0 0 40 40">
      <path d="M 10,10 L 30,30 M 30,10 L 10,30"/>
    </svg>
  </button>;

CloseButton.propTypes = {
  closeModal: PropTypes.func.isRequired,
  zIndex: PropTypes.number
};

export default CloseButton;
