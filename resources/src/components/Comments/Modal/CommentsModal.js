import React from "react";
import PropTypes from 'prop-types';
import {connect} from "react-redux";
import ModalBody from "./ModalBody";
import {OptionsModal} from 'ui';
import {CommentsService} from "services";

const CommentsModal = ({id, canDelete, closeModal, isModalOpen, onRemove}) => {

  const removeComment = () => {
    CommentsService.remove(id).then(() => onRemove(id));
  };

  return (
    <OptionsModal visible={isModalOpen} onClose={closeModal}>
      <ModalBody closeModal={closeModal} canDelete={canDelete} removeComment={removeComment}/>
    </OptionsModal>
  );
};

CommentsModal.propTypes = {
  dispatch: PropTypes.func.isRequired,
  canDelete: PropTypes.bool.isRequired,
  isModalOpen: PropTypes.bool.isRequired,
  selectedComment: PropTypes.object
};


const mapStateToProps = (state, props) => ({
  canDelete: props.ownerId === state.auth.user.id || props.ownerId === (state.users.user && state.users.user.id)
});

export default connect(mapStateToProps)(CommentsModal);
