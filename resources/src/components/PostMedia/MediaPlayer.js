import React from "react";
import PropTypes from 'prop-types';
import {LazyLoadImage} from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

import VideoPlayer from "./VideoPlayer";
import styles from './mediaPlayer.module.css';

const MediaPlayer = ({media}) =>
  <div className={styles.mediaContainer}>
    {
      media.match('.mp4') ?
        <VideoPlayer src={media}/> :
        <LazyLoadImage
          src={media}
          alt={'User media'}
          wrapperClassName={styles.media}
          effect="blur"
        />
    }
  </div>;

MediaPlayer.propTypes = {
  media: PropTypes.string.isRequired,
};

export default React.memo(MediaPlayer);
