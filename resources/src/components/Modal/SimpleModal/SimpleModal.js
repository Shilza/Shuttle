import React from "react";
import PropTypes from 'prop-types';
import Modal from "../Modal";
import styles from './simpleModal.module.css';

const SimpleModal = ({title, onOk, onCancel, visible, className, children, withCloseButton, zIndex, ...props}) => (
  <Modal visible={visible} onClose={onCancel} zIndex={zIndex} withCloseButton={withCloseButton}>
    <div className={`${styles.container} ${className}`} {...props}>
      {title && <h1 className={styles.title}>{title}</h1>}
      {children}
      {
        (onCancel || onOk) &&
        <div className={styles.footer}>
          {onCancel && <button className={styles.cancel} onClick={onCancel}>Cancel</button>}
          {onOk && <button className={styles.ok} onClick={onOk}>Ok</button>}
        </div>
      }
    </div>
  </Modal>
);

SimpleModal.defaultProps = {
  zIndex: 999
};

SimpleModal.propTypes = {
  title: PropTypes.string,
  zIndex: PropTypes.number,
  onOk: PropTypes.func,
  onCancel: PropTypes.func,
  visible: PropTypes.bool.isRequired,
  className: PropTypes.string,
  withCloseButton: PropTypes.bool,
  children: PropTypes.element.isRequired
};

export default SimpleModal;
