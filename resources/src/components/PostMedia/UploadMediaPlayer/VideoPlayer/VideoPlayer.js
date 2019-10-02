import React, {useEffect, useRef, useState} from "react";
import PropTypes from 'prop-types';

import playIcon from './icons/play.svg';
import volume from './icons/volume.svg';
import mutedIcon from './icons/muted.svg';

import styles from './videoPlayer.module.css';

const VideoPlayer = ({src, autoPlay, withPlayButton, playByClick}) => {

  const [isPlaying, setIsPlaying] = useState(false);
  const [muted, setMuted] = useState(true);
  const [isSoundShow, setIsSoundShow] = useState(true);
  let soundTimer = useRef(null);
  let playerRef = useRef(null);

  useEffect(() => {
    if(autoPlay) {
      const callback = (entries) => {
        entries.forEach(entry => {
          setIsPlaying(entry.isIntersecting)
        });
      };
      const observer = new IntersectionObserver(callback);
      observer.observe(playerRef.current);

      soundTimer.current = setTimeout(() => {
        setIsSoundShow(false);
      }, 2000);
    }
  }, []);

  useEffect(() => {
    isPlaying ? playerRef.current.play() :  playerRef.current.pause();
  }, [isPlaying]);

  const play = () => {
    if (playByClick) {
      setIsPlaying(!isPlaying);
    } else {
      toggleSound();
    }
  };

  const toggleSound = () => {
    setMuted(!muted);
    if(autoPlay) {
      clearTimeout(soundTimer.current);
      setIsSoundShow(true);
      soundTimer.current = setTimeout(() => {
        setIsSoundShow(false);
      }, 2000);
    }
  };

  return (
    <div className={styles.videoContainer}>
      <video
        src={src}
        ref={playerRef}
        className={styles.video}
        muted={muted}
        onClick={play}
        loop='loop'
      />
      {
        withPlayButton && !isPlaying &&
        <img src={playIcon} className={styles.videoPlayButton} alt={'Play button'} onClick={play}/>
      }
      {
        isSoundShow &&
        <img
          src={muted ? mutedIcon : volume}
          alt={muted ? 'Play sound' : 'Mute'}
          className={styles.sound}
          onClick={toggleSound}
        />
      }
    </div>
  );
};

VideoPlayer.defaultProps = {
  autoPlay: false,
  withPlayButton: false,
  playByClick: true
};

VideoPlayer.propTypes = {
  src: PropTypes.string.isRequired,
  playByClick: PropTypes.bool,
  withPlayButton: PropTypes.bool
};

export default React.memo(VideoPlayer);
