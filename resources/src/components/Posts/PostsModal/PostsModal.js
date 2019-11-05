import React, {useCallback} from "react";
import PropTypes from 'prop-types';

import {Modal} from 'ui';

import PostModalBody from "./PostModalBody";

const PostsModal = ({visible, onClose, post}) => {

  const closeModal = useCallback(() => {
    onClose();
  }, [onClose]);

  return (
    <Modal visible={post && visible} onClose={closeModal}>
      <PostModalBody post={post} closeModal={closeModal}/>
    </Modal>
  );
};

PostsModal.propTypes = {
  visible: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired,
};

export default PostsModal;
