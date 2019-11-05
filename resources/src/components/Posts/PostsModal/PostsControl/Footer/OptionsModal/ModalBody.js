import React from "react";
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import Archive from "./Archive";
import RemovePostButton from "./RemovePostButton";
import CopyLinkButton from "./CopyLinkButton";
import Edit from "./Edit";

const ModalBody = ({post, me, closeModal}) => {

  const {id , src, archive} = post;
  const link = window.location.origin + '/p/' + src.match(/.+?\/.+?\/(.+?)\.+/)[1];

  return (
    <>
      <li>Complain</li>
      <CopyLinkButton link={link} closeModal={closeModal}/>
      {
        me &&
        <>
          <Archive closeModal={closeModal} isArchived={archive} postId={id}/>
          <Edit closeModal={closeModal} post={post}/>
          <RemovePostButton postId={id} closeModal={closeModal}/>
        </>
      }
      <li onClick={closeModal}>Cancel</li>
    </>
  );
};

ModalBody.propTypes = {
  post: PropTypes.object,
  closeModal: PropTypes.func.isRequired
};

const mapStateToProps = (state, props) => ({
  me: state.auth.user.id === props.post.owner_id
});

export default connect(mapStateToProps)(ModalBody);
