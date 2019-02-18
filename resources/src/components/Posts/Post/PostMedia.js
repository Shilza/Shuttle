import React from "react";

const PostMedia = ({src, style=""}) => (
    <div style={{marginLeft: -15}}>
        {
            src.match('.mp4') ?
                <video src={src} className={style}/> :
                <img
                    alt="user's post"
                    src={src}
                    className={style}
                />
        }
        <div style={{width: '100%', height: '50px', background: 'gray', position: 'absolute'}}/>
    </div>
);

export default PostMedia;