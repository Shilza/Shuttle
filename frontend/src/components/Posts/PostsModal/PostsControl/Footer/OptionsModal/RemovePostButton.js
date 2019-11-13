import * as React from "react";
import PropTypes from 'prop-types';
import {message} from "antd/lib/index";
import {connect} from "react-redux";

const RemovePostButton = ({postId, closeModal, dispatch}) => {
  const removePost = () => {
    dispatch.posts.removeAsync(postId)
      .then((data) => {
        message.success(data.message);
      })
      .catch(err => message.error(err.response.data.message))
      .finally(closeModal);
  };

  return (
    <li onClick={removePost}>Delete post</li>
  );
};

RemovePostButton.propTypes = {
  postId: PropTypes.number.isRequired,
  closeModal: PropTypes.func.isRequired,
};

export default connect()(RemovePostButton);
