import React from "react";
import Modal from "../../Modal/Modal";
import PostModalBody from "./PostModalBody";
import {connect} from "react-redux";
import {removeCurrentPost} from "../../../store/actions/posts";
import CommentModal from "../../Comments/Modal/CommentsModal";

const PostsModal = ({isOpen, currentPost, dispatch}) => {

    const closeModal = () => dispatch(removeCurrentPost());

    return (
        <>
            {
                (isOpen && currentPost) && (
                    <>
                        <Modal closeModal={closeModal}>
                            <PostModalBody post={currentPost}/>
                        </Modal>
                        <CommentModal/>
                    </>
                )
            }
        </>
    );
};

const mapStateToProps = state => ({
    isOpen: state.posts.isModalOpen,
    currentPost: state.posts.currentPost
});

export default connect(mapStateToProps)(PostsModal);