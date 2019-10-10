import React from "react";
import PropTypes from 'prop-types';
import {message} from "antd/lib/index";
import {connect} from "react-redux";

const Archive = ({dispatch, postId, isArchived, closeModal}) => {

  const dispatchAction = action => {
    action(postId)
      .then(({data}) => {
        message.success(data.message);
      })
      .catch(err => {
        message.error(err.response.data.message);
      })
      .finally(closeModal);
  };

  const archive = () => {
    dispatchAction(dispatch.posts.addToArchiveAsync);
  };

  const unArchive = () => {
    dispatchAction(dispatch.posts.removeFromArchiveAsync);
  };

  return (
    <>
      {
        isArchived ? <li onClick={unArchive}>Unarchive</li>
          : <li onClick={archive}>Archive</li>
      }
    </>
  )
};

Archive.propTypes = {
  dispatch: PropTypes.func.isRequired,
  postId: PropTypes.number.isRequired,
  isArchived: PropTypes.number,
  closeButton: PropTypes.func
};

export default connect()(Archive);
