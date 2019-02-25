import MediaPlayer from "./MediaPlayer";
import React from "react";
import SaveBar from "./SaveBar/SaveBar";
import {connect} from "react-redux";

const PostMedia = ({media, showBar}) =>
    <div>
        <MediaPlayer media={media}/>
        {
            showBar &&
            <SaveBar/>
        }
    </div>;

const mapStateToProps = (state, props) => ({
    showBar: (state.saved.postToBeSaved ? state.saved.postToBeSaved.id : undefined) === props.postId
});

export default connect(mapStateToProps)(PostMedia);