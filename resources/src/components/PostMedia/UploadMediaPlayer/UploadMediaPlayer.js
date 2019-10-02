import React from "react";
import PropTypes from 'prop-types';

import CropImage from "components/Posts/Uploader/CropImage";
import VideoPlayer from "./VideoPlayer";

const UploadMediaPlayer = ({media, setCroppedMedia}) => (
  media.type.match('image') ?
    <CropImage
      src={URL.createObjectURL(media)}
      setCroppedMedia={setCroppedMedia}
    /> :
    <VideoPlayer src={URL.createObjectURL(media)}/>
);

UploadMediaPlayer.propTypes = {
  media: PropTypes.object,
  setCroppedMedia: PropTypes.func.isRequired
};

export default UploadMediaPlayer;
