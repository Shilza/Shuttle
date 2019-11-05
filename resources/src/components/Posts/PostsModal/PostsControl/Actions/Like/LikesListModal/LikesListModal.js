import React from "react";
import PropTypes from 'prop-types';

import {ListModal} from 'ui';
import ModalBody from "./ModalBody";

const LikesListModal = ({onClose, isVisible, id, type}) => (
  <ListModal visible={isVisible} onClose={onClose} title={'Likes'}>
    <ModalBody id={id} type={type}/>
  </ListModal>
);

LikesListModal.propTypes = {
  onClose: PropTypes.func,
  isVisible: PropTypes.bool.isRequired,
  id: PropTypes.number.isRequired,
  type: PropTypes.string.isRequired
};

export default LikesListModal;
