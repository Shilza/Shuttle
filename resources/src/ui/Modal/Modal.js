import React from "react";
import PropTypes from 'prop-types';
import Window from "./Window";

const Modal = React.memo(({children, onClose, zIndex, withCloseButton, visible}) => (
  <>
    {
      visible && <Window withCloseButton={withCloseButton} zIndex={zIndex} onClose={onClose}>{children}</Window>
    }
  </>
));

Modal.defaultProps = {
  zIndex: 999,
  withCloseButton: true,
  visible: false,
  onClose: () => {}
};

Modal.propTypes = {
  children: PropTypes.element.isRequired,
  onClose: PropTypes.func,
  visible: PropTypes.bool.isRequired,
  withCloseButton: PropTypes.bool,
  zIndex: PropTypes.number
};

export default Modal;
