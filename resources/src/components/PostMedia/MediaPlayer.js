import React from "react";
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

export default React.memo(MediaPlayer);