import React from "react";
import PropTypes from 'prop-types';
import Modal from "../Modal";
import styles from './optionsModal.module.css'

const OptionsModal = React.memo(({visible, className, onClose,
                        children, withCloseButton, zIndex, ...props
                      }) => (
  <Modal visible={visible} onClose={onClose} zIndex={zIndex} withCloseButton={withCloseButton}>
    <ul className={styles.container} {...props}>
      {children}
    </ul>
  </Modal>
));

OptionsModal.defaultProps = {
  zIndex: 999
};

OptionsModal.propTypes = {
  zIndex: PropTypes.number,
  visible: PropTypes.bool.isRequired,
  className: PropTypes.string,
  withCloseButton: PropTypes.bool,
  children: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.element, PropTypes.bool])).isRequired,
  onClose: PropTypes.func
};

export default OptionsModal;
