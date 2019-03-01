import React, {useRef, useState} from "react";
import PropTypes from 'prop-types';

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
        />
    );
};

VideoPlayer.propTypes = {
    src: PropTypes.object.isRequired
};

export default React.memo(VideoPlayer);