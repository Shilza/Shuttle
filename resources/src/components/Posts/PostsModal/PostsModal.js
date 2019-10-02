import React from "react";
import PropTypes from 'prop-types';
import {connect} from "react-redux";

import Modal from "components/Modal/Modal";
import {removeCurrentPost} from "store/actions/posts";

import PostModalBody from "./PostModalBody";

const PostsModal = ({isOpen, currentPost, dispatch}) => {

  const closeModal = () => {
    window.history.pushState({}, null, `${window.location.origin}/${currentPost.owner}`);
    dispatch(removeCurrentPost());
  };

  return (
    <>
      {
        (isOpen && currentPost) && (
          <Modal closeModal={closeModal}>
            <PostModalBody post={currentPost} closeModal={closeModal}/>
          </Modal>
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
