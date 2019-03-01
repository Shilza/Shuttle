import React from "react";
import PropTypes from 'prop-types';
import ModalBody from "./ModalBody";
import Modal from "../../Modal/Modal";
import {connect} from "react-redux";
import {setIsCommentsModalOpen} from "../../../store/actions/comments";
import * as CommentService from "../../../services/comments";

const CommentsModal = ({dispatch, selectedComment: selectedCommentId, canDelete, isModalOpen}) => {

    const closeModal = () => dispatch(setIsCommentsModalOpen(false));

    const removeComment = () => dispatch(CommentService.remove(selectedCommentId));

    return (
        <>
            {
                isModalOpen &&
                <Modal closeModal={closeModal}>
                    <ModalBody closeModal={closeModal} canDelete={canDelete} removeComment={removeComment}/>
                </Modal>
            }
        </>
    );
};

CommentsModal.propTypes = {
    dispatch: PropTypes.func.isRequired,
    canDelete: PropTypes.bool.isRequired,
    isModalOpen: PropTypes.bool.isRequired,
    selectedCommentId: PropTypes.number
};

const canDelete = state => {
    return state.comments.isModalOpen &&
        (
            (state.comments.selectedComment.owner_id === state.auth.user.id)
            || (state.comments.selectedComment.owner_id === (state.users.user && state.users.user.id))
        );
};

const mapStateToProps = state => ({
    isModalOpen: state.comments.isModalOpen,
    selectedCommentId: (state.comments.selectedComment ? state.comments.selectedComment.id : undefined),
    canDelete: canDelete(state)
});

export default connect(mapStateToProps)(CommentsModal);