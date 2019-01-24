import React from "react";
import VideoPlayer from "./VideoPlayer";

const UploadMediaPlayer = ({media}) => {
    return (
        media.type.match('image') ?
            <img src={URL.createObjectURL(media)}/> :
            <VideoPlayer src={URL.createObjectURL(media)}/>
    );
};

export default UploadMediaPlayer;