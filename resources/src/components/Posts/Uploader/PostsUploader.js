import React, {useState} from "react";
import PropTypes from 'prop-types';
import {connect} from "react-redux";
import Uploader from "./Modal/Uploader";
import * as PostService from "../../../services/post";
import {message} from "antd/lib/index";
import Modal from "../../Modal/Modal";
import UploadPost from "./Modal/UploadPost";

const PostsUploader = ({dispatch, trigger}) => {

  let [isOpen, setIsOpen] = useState(false);
  let [media, setMedia] = useState(false);

  const closeModal = () => setIsOpen(false);

  const loadMedia = event => {
    setIsOpen(true);
    setMedia(event.target.files[0]);
  };

  const upload = postData => {
    dispatch(PostService.create(postData))
      .then(data => message.success(data.message));

    closeModal();
  };

  return (
    <>
      {
        isOpen &&
        <Modal closeModal={closeModal}>
          <UploadPost media={media} upload={upload}/>
        </Modal>
      }
      <Uploader loadMedia={loadMedia} trigger={trigger}/>
    </>
  )
};

PostsUploader.propTypes = {
  dispatch: PropTypes.func.isRequired,
  trigger: PropTypes.element
};

export default connect()(PostsUploader);
