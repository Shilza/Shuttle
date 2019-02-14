import React from "react";
import VideoPlayer from "./VideoPlayer";
import CropImage from "../Posts/Uploader/CropImage/CropImage";

const UploadMediaPlayer = ({media}) => (
    media.type.match('image') ?
        <CropImage src={URL.createObjectURL(media)}/> :
        <VideoPlayer src={URL.createObjectURL(media)}/>
);

export default UploadMediaPlayer;