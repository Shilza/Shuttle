import React from "react";
import PropTypes from 'prop-types';
import {LazyLoadImage} from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

import VideoPlayer from "../VideoPlayer";
import styles from './mediaPlayer.module.css';

const MediaPlayer = ({media, toggleMuted, fullWidth, muted, autoPlay}) => (
  <div className={styles.mediaContainer}>
    {
      media.match('.mp4')
        ? <VideoPlayer
          src={media}
          autoPlay={autoPlay}
          muted={muted}
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
  fullWidth: false,
};

MediaPlayer.propTypes = {
  media: PropTypes.string.isRequired,
  fullWidth: PropTypes.bool,
  autoPlay: PropTypes.bool,
  muted: PropTypes.bool
};

export default React.memo(MediaPlayer);
