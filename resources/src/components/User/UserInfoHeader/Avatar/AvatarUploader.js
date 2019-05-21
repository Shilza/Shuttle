import React, {useState} from "react";
import PropTypes from 'prop-types';
import {Button} from "antd";
import {message} from "antd/lib/index";
import Avatar from "react-avatar-edit";
import {updateAvatar} from "../../../../services/user";
import {connect} from "react-redux";

const AvatarUploader = ({onClose, media, dispatch}) => {

    const buttonStyle = { width: '100%' };

    let [cropRes, setCropRes] = useState();

    const uploadAvatar = () => {
        fetch(cropRes)
            .then(res => res.blob())
            .then(blob => {
                let file = new File([blob], 'file', {type: 'image/jpeg'});
                let avatar = new FormData();
                avatar.append('avatar', file);
                dispatch(updateAvatar(avatar))
                    .then(data => {
                        message.success(data.message);
                        onClose();
                    })
                    .catch(err => {
                        message.error(err.response.data.message);
                        onClose();
                    });
            });
    };

    return (
        <>
            <Avatar
                width={390}
                height={295}
                onCrop={data => {setCropRes(data)}}
                onClose={onClose}
                src={media}
            />
            <Button style={buttonStyle} onClick={uploadAvatar}>Ok</Button>
        </>
    )
};

AvatarUploader.propTypes = {
    onClose: PropTypes.func.isRequired,
    media: PropTypes.string.isRequired,
};

export default connect()(AvatarUploader);