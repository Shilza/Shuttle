import {Icon} from "antd";
import React, {useRef, useState} from "react";
import styles from './avatar.module.css';
import {connect} from "react-redux";
import {message} from "antd/lib/index";
import {updateAvatar} from "../../../../services/user";

const inputStyle = {display: 'none'};

const UploadButton = ({dispatch,}) => {

    let fileRef = useRef();

    let [media, setMedia] = useState(undefined);

    const loadMedia = event => {
        setMedia(event.target.files[0]);
        uploadAvatar();
    };

    const uploadAvatar = () => {
        let avatar = new FormData();
        avatar.append('avatar', media);

        dispatch(updateAvatar(avatar))
            .then(data => message.success(data.message))
            .catch(err => message.error(err.response.data.message));
    };

    return (
        <button className={styles.avatarActionButton} onClick={() => fileRef.current.click()}>
            <Icon type='upload'/>
            <input type='file' style={inputStyle} onChange={loadMedia} ref={fileRef}/>
        </button>
    )
};

export default connect()(UploadButton);