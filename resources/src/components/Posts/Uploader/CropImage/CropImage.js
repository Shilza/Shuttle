import React from "react";

const CropImage = ({src}) =>
    <div className={'crop-cont'}>
        <img src={src} className="crop-image" alt="cropped"/>
    </div>;

export default React.memo(CropImage);