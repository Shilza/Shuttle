import React, {useState} from "react";
import PropTypes from 'prop-types';
import {connect} from "react-redux";
import {message} from "antd";

import Modal from "components/Modal";
import Uploader from "./Modal/Uploader";
import UploadPost from "./Modal/UploadPost";

const PostsUploader = ({dispatch, trigger}) => {

  let [isModalOpen, setIsModalOpen] = useState(false);
  let [media, setMedia] = useState(false);

  const closeModal = () => setIsModalOpen(false);

  const loadMedia = event => {
    if (event.target.files[0].size > 10485760)
      message.warn('File must be less than 10 MB');
    else {
      setIsModalOpen(true);
      setMedia(event.target.files[0]);
    }
  };

  const upload = postData => {
    dispatch.posts.create(postData)
      .then(data => message.success(data.message));
    closeModal();
  };

  return (
    <>
      <Modal visible={isModalOpen} onClose={closeModal}>
        <UploadPost media={media} upload={upload}/>
      </Modal>
      <Uploader loadMedia={loadMedia} trigger={trigger}/>
    </>
  )
};

PostsUploader.propTypes = {
  dispatch: PropTypes.func.isRequired,
  trigger: PropTypes.element
};

export default connect()(PostsUploader);
