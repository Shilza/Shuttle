import React from "react";
import PropTypes from 'prop-types';
import {LazyLoadImage} from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

import VideoPlayer from "../UploadMediaPlayer/VideoPlayer/VideoPlayer";
import styles from './mediaPlayer.module.css';

const MediaPlayer = ({media, toggleMuted, fullWidth, autoPlay, withPlayButton, playByClick}) => (
  <div className={styles.mediaContainer}>
    {
      media.match('.mp4')
        ? <VideoPlayer
          src={media}
          playByClick={playByClick}
          withPlayButton={withPlayButton}
          autoPlay={autoPlay}
          toggleMuted={toggleMuted}
        />
        : <LazyLoadImage
          src={media}
          alt={'User media'}
          wrapperClassName={fullWidth ? styles.fullWidthMedia : styles.media}
          effect="blur"
        />
    }
  </div>
);

MediaPlayer.defaultProps = {
  autoPlay: false,
  withPlayButton: false,
  fullWidth: false,
  playByClick: true
};

MediaPlayer.propTypes = {
  media: PropTypes.string.isRequired,
  playByClick: PropTypes.bool,
  withPlayButton: PropTypes.bool,
  fullWidth: PropTypes.bool
};

export default React.memo(MediaPlayer);
