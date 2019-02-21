import React from "react";
import ModalBody from "./ModalBody";
import Modal from "../../Modal/Modal";
import {connect} from "react-redux";
import {setIsCommentsModalOpen} from "../../../store/actions/comments";
import * as CommentService from "../../../services/comments";

const CommentsModal = ({dispatch, selectedComment, isModalOpen}) => {

    console.log('comment modal rend');

    const closeModal = () => dispatch(setIsCommentsModalOpen(false));

    const removeComment = () => dispatch(CommentService.remove(selectedComment.id));

    return (
        <>
            {
                isModalOpen &&
                <Modal closeModal={closeModal}>
                    <ModalBody closeModal={closeModal} removeComment={removeComment}/>
                </Modal>
            }
        </>
    );
};

const mapStateToProps = state => ({
    isModalOpen: state.comments.isModalOpen,
    selectedComment: state.comments.selectedComment
});

export default connect(mapStateToProps)(CommentsModal);