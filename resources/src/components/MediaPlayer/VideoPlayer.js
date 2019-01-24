import React from "react";

class VideoPlayer extends React.Component{
    constructor(props ){
        super(props);

        this.state = {
            play: false
        };

        this.playerRef = React.createRef();
        this.play = this.play.bind(this);
    }

    play() {
        this.state.play ? this.playerRef.current.pause() : this.playerRef.current.play();
        this.setState(prevState => ({play: !prevState.play}));
    }

    render() {
        return (
            <video onClick={this.play}
                   src={this.props.src}
                   ref={this.playerRef}
            />
        );
    }
}

export default VideoPlayer;