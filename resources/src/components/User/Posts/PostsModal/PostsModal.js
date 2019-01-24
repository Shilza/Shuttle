import React from "react";
import Modal from "../../../Modal/Modal";
import ModalBody from "./ModalBody";
import {connect} from "react-redux";
import {closePostsModal} from "../../../../store/actions/posts";

const PostsModal = ({isOpen, currentPost, dispatch}) => {

    const closeModal = () => dispatch(closePostsModal());

    return (
        <>
            {
                (isOpen && currentPost) &&
                <Modal closeModal={closeModal}>
                    <ModalBody post={currentPost}/>
                </Modal>
            }
        </>
    );
};


const mapStateToProps = state => {
    return {
        isOpen: state.posts.isModalOpen,
        currentPost: state.posts.currentPost
    }
};

export default connect(mapStateToProps)(PostsModal);