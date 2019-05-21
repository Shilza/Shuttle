import React, {useRef, useState} from "react";
import {Icon} from "antd";
import styles from './avatar.module.css';
import Modal from "../../../Modal/Modal";
import AvatarUploader from "./AvatarUploader";

const inputStyle = {display: 'none'};

export const UploadButton = () => {

    let fileRef = useRef();

    let [media, setMedia] = useState(undefined);

    const loadMedia = event => {
        const file = event.target.files[0];
        let reader  = new FileReader();

        reader.onloadend = function () {
            setMedia(reader.result);
        };

        if (file)
            reader.readAsDataURL(file);
    };

    return (
        <>
            <button className={styles.avatarActionButton} onClick={() => fileRef.current.click()}>
                <Icon type='upload'/>
                <input type='file' style={inputStyle} onChange={loadMedia} ref={fileRef}/>
            </button>
            {
                !!media &&
                <Modal
                    closeModal={() => {setMedia(undefined)}}>
                    <AvatarUploader onClose={() => setMedia(undefined)} media={media}/>
                </Modal>
            }
        </>
    )
};