import React from "react";
import PropTypes from 'prop-types';
import OptionsModal from "components/Modal/OptionsModal/OptionsModal";

const ModalBody = ({closeModal, canDelete, removeComment}) => (
  <OptionsModal>
    {
      canDelete &&
      <li onClick={removeComment}>
        Delete
      </li>
    }
    <li>
      Reply
    </li>
    <li onClick={closeModal}>
      Cancel
    </li>
  </OptionsModal>
);

ModalBody.propTypes = {
  closeModal: PropTypes.func.isRequired,
  canDelete: PropTypes.bool.isRequired,
  removeComment: PropTypes.func.isRequired
};

export default ModalBody;
