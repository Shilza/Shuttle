import React from "react";
import VideoPlayer from "./VideoPlayer";

const UploadMediaPlayer = ({media}) => (
    media.type.match('image') ?
        <img src={URL.createObjectURL(media)}/> :
        <VideoPlayer src={URL.createObjectURL(media)}/>
);

export default UploadMediaPlayer;