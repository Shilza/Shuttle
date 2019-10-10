import React, {useState} from "react";
import PropTypes from 'prop-types';
import {Button} from "antd";
import {message} from "antd/lib/index";
import Avatar from "react-avatar-edit";
import {connect} from "react-redux";
import styles from './avatar.module.css';

const AvatarUploader = ({onClose, media, dispatch}) => {

  const buttonStyle = {width: '100%'};

  let [cropRes, setCropRes] = useState();

  const uploadAvatar = () => {
    fetch(cropRes)
      .then(res => res.blob())
      .then(blob => {
        let file = new File([blob], 'file', {type: 'image/jpeg'});
        let avatar = new FormData();
        avatar.append('avatar', file);
        dispatch.users.updateAvatarAsync(avatar)
          .then(data => {
            message.success(data.message);
          })
          .catch(err => {
            message.error(err.response.data.message);
          })
          .finally(onClose);
      });
  };

  return (
    <div className={styles.uploaderContainer}>
      <Avatar
        width={390}
        height={295}
        onCrop={data => {
          setCropRes(data)
        }}
        onClose={onClose}
        src={media}
      />
      <Button style={buttonStyle} onClick={uploadAvatar}>Ok</Button>
    </div>
  )
};

AvatarUploader.propTypes = {
  onClose: PropTypes.func.isRequired,
  media: PropTypes.string.isRequired,
};

export default connect()(AvatarUploader);
