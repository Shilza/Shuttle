import React, {useRef, useState} from "react";

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

export default React.memo(VideoPlayer);