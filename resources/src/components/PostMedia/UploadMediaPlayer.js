import React from "react";
import PropTypes from 'prop-types';
import VideoPlayer from "./VideoPlayer";
import CropImage from "../Posts/Uploader/CropImage/CropImage";

const UploadMediaPlayer = ({media}) =>
    media.type.match('image') ?
        <CropImage src={URL.createObjectURL(media)}/> :
        <VideoPlayer src={URL.createObjectURL(media)}/>;

UploadMediaPlayer.propTypes = {
    media: PropTypes.object
};

export default React.memo(UploadMediaPlayer);