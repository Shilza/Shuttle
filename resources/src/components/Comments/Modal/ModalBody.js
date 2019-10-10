import React from "react";
import PropTypes from 'prop-types';
import ListModal from "components/Modal/ListsModal/ListModal";

const ModalBody = ({closeModal, canDelete, removeComment}) => (
  <ListModal>
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
  </ListModal>
);

ModalBody.propTypes = {
  closeModal: PropTypes.func.isRequired,
  canDelete: PropTypes.bool.isRequired,
  removeComment: PropTypes.func.isRequired
};

export default ModalBody;
