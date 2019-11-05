import React from "react";
import PropTypes from 'prop-types';

const ModalBody = ({closeModal, canDelete, removeComment}) => (
  <>
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
  </>
);

ModalBody.propTypes = {
  closeModal: PropTypes.func.isRequired,
  canDelete: PropTypes.bool.isRequired,
  removeComment: PropTypes.func.isRequired
};

export default ModalBody;
