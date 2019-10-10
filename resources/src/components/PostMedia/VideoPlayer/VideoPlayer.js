import React, {useEffect, useRef, useState} from "react";
import PropTypes from 'prop-types';

import styles from './videoPlayer.module.css';

const VideoPlayer = React.memo(({src, muted, autoPlay}) => {

  const [isPlaying, setIsPlaying] = useState(false);
  let playerRef = useRef(null);

  useEffect(() => {
    if (autoPlay) {
      const callback = (entries) => {
        entries.forEach(entry => {
          setIsPlaying(entry.isIntersecting)
        });
      };
      const observer = new IntersectionObserver(callback);
      observer.observe(playerRef.current);
    }
  }, []);

  useEffect(() => {
    isPlaying ? playerRef.current.play() : playerRef.current.pause();
  }, [isPlaying]);

  return (
      <video
        src={src}
        ref={playerRef}
        className={styles.video}
        loop='loop'
        preload="metadata"
        muted={muted}
        controls
      />
  );
});

VideoPlayer.defaultProps = {
  autoPlay: false,
  muted: false
};

VideoPlayer.propTypes = {
  src: PropTypes.string.isRequired,
  muted: PropTypes.bool,
  autoPlay: PropTypes.bool,
};

export default VideoPlayer;
