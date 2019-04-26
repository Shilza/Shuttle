import React, {useRef, useState} from "react";
import PropTypes from 'prop-types';
import styles from './mediaPlayer.module.css';

const VideoPlayer = ({src}) => {

    let [isPlay, setIsPlay] = useState(false);

    let playerRef = useRef();

    const play = () => {
        isPlay ? playerRef.current.pause() : playerRef.current.play();
        setIsPlay(!isPlay);
    };

    return (
        <video onClick={play}
               src={src}
               ref={playerRef}
               className={styles.video}
               loop='loop'
        />
    );
};

VideoPlayer.propTypes = {
    src: PropTypes.string.isRequired
};

export default React.memo(VideoPlayer);