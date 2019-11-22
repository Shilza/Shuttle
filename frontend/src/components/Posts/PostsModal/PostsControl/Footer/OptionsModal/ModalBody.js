import React, {useCallback} from "react";
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {message} from 'antd';
import {MarksService} from 'services';

import Archive from "./Archive";
import RemovePostButton from "./RemovePostButton";
import CopyLinkButton from "./CopyLinkButton";
import Edit from "./Edit";

const ModalBody = ({post, my, closeModal, myMarkId}) => {

  const {id, src, archive} = post;
  const link = window.location.origin + '/p/' + src.match(/.+?\/.+?\/(.+?)\.+/)[1];

  const removeMeFromMarks = useCallback(() => {
    MarksService.remove(myMarkId).then(({data}) => {
      message.success(data.message);
    }).finally(closeModal)
  }, [myMarkId]);

  return (
    <>
      <li>Complain</li>
      <CopyLinkButton link={link} closeModal={closeModal}/>
      {
        my &&
        <>
          <Archive closeModal={closeModal} isArchived={archive} postId={id}/>
          <Edit closeModal={closeModal} post={post}/>
          <RemovePostButton postId={id} closeModal={closeModal}/>
        </>
      }
      {
        myMarkId && <li onClick={removeMeFromMarks}>Remove me from marks</li>
      }
      <li onClick={closeModal}>Cancel</li>
    </>
  );
};

ModalBody.propTypes = {
  post: PropTypes.object,
  my: PropTypes.bool,
  myMarkId: PropTypes.number,
  closeModal: PropTypes.func.isRequired
};

const mapStateToProps = (state, props) => {

  let myMark;
  if (props.post && props.post.marks) {
    myMark = props.post.marks.find(mark => mark.username === state.auth.user.username)
  }

  return {
    my: state.auth.user.id === props.post && props.post.owner_id,
    myMarkId: myMark && myMark.id
  }
};

export default connect(mapStateToProps)(ModalBody);
