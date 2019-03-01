import React from "react";
import PropTypes from 'prop-types';
import Modal from "../../Modal/Modal";
import PostModalBody from "./PostModalBody";
import {connect} from "react-redux";
import {removeCurrentPost} from "../../../store/actions/posts";

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
                    </>
                )
            }
        </>
    );
};

PostsModal.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    currentPost: PropTypes.object,
    dispatch: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
    isOpen: state.posts.isModalOpen,
    currentPost: state.posts.currentPost
});

export default connect(mapStateToProps)(PostsModal);