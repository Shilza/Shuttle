import React from "react";
import PropTypes from 'prop-types';
import MediaPlayer from "./MediaPlayer";
import SaveBar from "./SaveBar/SaveBar";
import {connect} from "react-redux";

const PostMedia = ({media, showBar}) =>
    <div>
        <MediaPlayer media={media}/>
        <SaveBar showBar={showBar}/>
    </div>;

PostMedia.propTypes = {
    media: PropTypes.string.isRequired,
    showBar: PropTypes.bool.isRequired
};

const mapStateToProps = (state, props) => ({
    showBar: (state.saved.postToBeSaved ? state.saved.postToBeSaved.id : undefined) === props.postId
});

export default connect(mapStateToProps)(PostMedia);