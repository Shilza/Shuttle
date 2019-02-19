import MediaPlayer from "./MediaPlayer";
import React from "react";

import SaveBar from "./SaveBar/SaveBar";

const PostMedia = ({media, showSavedBar}) => (
    <>
        <MediaPlayer media={media}/>
        {
            showSavedBar &&
            <SaveBar/>
        }
    </>
);

export default PostMedia;