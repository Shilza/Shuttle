import React from "react";
import PropTypes from 'prop-types';

const Media = ({src}) =>
    <>
        {
            src.match('.mp4') ?
                <video src={src}/> :
                <img
                    alt="user's post"
                    src={src}
                />
        }
    </>;

Media.propTypes = {
    src: PropTypes.string.isRequired,
    style: PropTypes.string
};

export default React.memo(Media);