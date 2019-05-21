import React from "react";
import PropTypes from 'prop-types';
import VideoPlayer from "./VideoPlayer";
import CropImage from "../Posts/Uploader/CropImage/CropImage";

const UploadMediaPlayer = ({media, setCroppedMedia}) =>
    media.type.match('image') ?
        <CropImage
            src={URL.createObjectURL(media)}
            setCroppedMedia={setCroppedMedia}
        /> :
        <VideoPlayer src={URL.createObjectURL(media)}/>;

UploadMediaPlayer.propTypes = {
    media: PropTypes.object,
    setCroppedMedia: PropTypes.func.isRequired
};

export default UploadMediaPlayer;