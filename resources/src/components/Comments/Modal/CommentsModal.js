import React from "react";
import ModalBody from "./ModalBody";
import Modal from "../../Modal/Modal";
import {connect} from "react-redux";
import {setIsCommentsModalOpen} from "../../../store/actions/comments";
import * as CommentService from "../../../services/comments";

const CommentsModal = ({dispatch, selectedComment, canDelete, isModalOpen}) => {

    const closeModal = () => dispatch(setIsCommentsModalOpen(false));

    const removeComment = () => dispatch(CommentService.remove(selectedComment.id));

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

const mapStateToProps = state => ({
    isModalOpen: state.comments.isModalOpen,
    selectedComment: state.comments.selectedComment,
    canDelete: state.comments.isModalOpen &&
    (
        (state.comments.selectedComment.owner_id === state.auth.user.id)
        || (state.comments.selectedComment.owner_id === (state.users.user && state.users.user.id))
    )
});

export default connect(mapStateToProps)(CommentsModal);