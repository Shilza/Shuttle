import MediaPlayer from "./MediaPlayer";
import React from "react";
import SaveBar from "./SaveBar/SaveBar";
import {connect} from "react-redux";

const PostMedia = ({media, showBar}) => (
            <>
                <MediaPlayer media={media}/>
                {
                    showBar &&
                    <SaveBar/>
                }
            </>
);

const mapStateToProps = (state, props) => ({
    showBar: (state.saved.postToBeSaved ? state.saved.postToBeSaved.id : undefined) === props.postId
});

export default connect(mapStateToProps)(PostMedia);