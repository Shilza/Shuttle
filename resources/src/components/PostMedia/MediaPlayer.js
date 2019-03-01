import React from "react";
import PropTypes from 'prop-types';
import VideoPlayer from "./VideoPlayer";
import styles from './mediaPlayer.module.css';

const MediaPlayer = ({media}) =>
    <div className={styles.mediaContainer}>
        {
            media.match('.mp4') ?
                <VideoPlayer src={media}/> :
                <img src={media} alt={'User media'}/>
        }
    </div>;

MediaPlayer.propTypes = {
    media: PropTypes.string.isRequired,
};

export default React.memo(MediaPlayer);