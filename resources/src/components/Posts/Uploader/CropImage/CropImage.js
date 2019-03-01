import React from "react";
import PropTypes from 'prop-types';

const CropImage = ({src}) =>
    <div className={'crop-cont'}>
        <img src={src} className="crop-image" alt="cropped"/>
    </div>;

CropImage.propTypes = {
    src: PropTypes.string.isRequired
};

export default React.memo(CropImage);