import React from "react";
import PropTypes from 'prop-types';
import {message} from "antd/lib/index";
import {connect} from "react-redux";

import {addToArchive, deleteFromArchive} from "services/post";
import {removeCurrentPost} from "store/actions/posts";

const Archive = ({dispatch, postId, isArchived, closeModal}) => {

  const dispatchAction = action => {
    dispatch(action(postId))
      .then(data => {
        message.success(data);
      })
      .catch(data => {
        message.error(data);
      })
      .finally(() => {
        removeCurrentPost();
        closeModal();
      });
  };

  const archive = () => {
    dispatchAction(addToArchive);
  };

  const unArchive = () => {
    dispatchAction(deleteFromArchive);
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
