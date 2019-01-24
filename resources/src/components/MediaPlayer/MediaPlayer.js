import React from "react";
import VideoPlayer from "./VideoPlayer";
import styles from './mediaPlayer.module.css';

const MediaPlayer = ({media}) => {
    return (
        <div className={styles.mediaContainer}>{
            media.match('.mp4') ?
                <VideoPlayer src={media}/> :
                <img src={media}/>
        }
        </div>
    );
};

export default MediaPlayer;