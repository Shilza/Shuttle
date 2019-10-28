import React from "react";
import PropTypes from 'prop-types';
import Modal from "../Modal";

import styles from './listModal.module.css';

const ListModal = ({visible, title, children, withCloseButton, className, onClose}) => (
  <Modal visible={visible} onClose={onClose} withCloseButton={withCloseButton}>
    <div className={`${styles.container} ${className}`}>
      <h1 className={styles.title}>
        {title}
      </h1>
      <div className={styles.body}>
        {children}
      </div>
    </div>
  </Modal>
);

ListModal.propTypes = {
  visible: PropTypes.bool.isRequired,
  title: PropTypes.string,
  children: PropTypes.element.isRequired,
  className: PropTypes.string,
  onClose: PropTypes.func,
  withCloseButton: PropTypes.bool
};

export default ListModal;
