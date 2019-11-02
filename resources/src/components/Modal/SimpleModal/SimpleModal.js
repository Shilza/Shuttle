import React from "react";
import PropTypes from 'prop-types';
import Loader from "components/Paginator/Loader";
import Modal from "../Modal";
import styles from './simpleModal.module.css';

const SimpleModal = ({
                       title, onOk, onCancel, visible, className,
                       children, withCloseButton, zIndex, okButtonText, cancelButtonText, isLoading, ...props
                     }) => (
  <Modal visible={visible} onClose={onCancel} zIndex={zIndex} withCloseButton={withCloseButton}>
    <div className={`${styles.container} ${className}`} {...props}>
      {title && <h1 className={styles.title}>{title}</h1>}
      {children}
      {
        (onCancel || onOk) &&
        <div className={styles.footer}>
          {onCancel && <button className={styles.cancel} onClick={onCancel}>{cancelButtonText}</button>}
          {onOk &&
          <div className={styles.buttonOkContainer}>
            <button className={styles.ok} onClick={onOk} disabled={isLoading}>{okButtonText}</button>
            {isLoading && <Loader/>}
          </div>
          }
        </div>
      }
    </div>
  </Modal>
);

SimpleModal.defaultProps = {
  zIndex: 999,
  isLoading: false,
  okButtonText: 'Ok',
  cancelButtonText: 'Cancel'
};

SimpleModal.propTypes = {
  title: PropTypes.string,
  zIndex: PropTypes.number,
  onOk: PropTypes.func,
  onCancel: PropTypes.func,
  visible: PropTypes.bool.isRequired,
  className: PropTypes.string,
  withCloseButton: PropTypes.bool,
  isLoading: PropTypes.bool,
  okButtonText: PropTypes.string,
  cancelButtonText: PropTypes.string,
  children: PropTypes.element.isRequired
};

export default SimpleModal;
