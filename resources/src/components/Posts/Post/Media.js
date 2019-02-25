import React from "react";

const Media = ({src, style=""}) =>
    <>
        {
            src.match('.mp4') ?
                <video src={src} className={style}/> :
                <img
                    alt="user's post"
                    src={src}
                    className={style}
                />
        }
    </>;

export default React.memo(Media);