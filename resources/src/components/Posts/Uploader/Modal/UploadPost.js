import {Button} from "antd";
import UploadMediaPlayer from "../../../PostMedia/UploadMediaPlayer";
import React, {useRef} from "react";
import styles from './uploadPost.module.css';
import Header from "../../PostsModal/PostsControl/Header";
import {connect} from "react-redux";
import resizeableImage from "../../../../utils/crop";

const UploadPost = ({upload, media, currentAuthUsername}) => {

    let inputRef = useRef();

    const submit = () => {

        const getCroppedImage = resizeableImage(document.querySelector('.crop-image'));
        let media = getCroppedImage();

        fetch(media)
            .then(res => res.blob())
            .then(blob => {
                let postData = new FormData();
                postData.append('media', new File([blob], "media", {type: 'image/jpeg'}));
                postData.append('caption', inputRef.current.value);

                upload(postData);
            });
    };

    return (
        <>
            {
                media &&
                <div className={styles.mainContainer}>
                    <UploadMediaPlayer media={media}/>
                    <div className={styles.sideContainer}>
                        <Header username={currentAuthUsername}/>
                        <input ref={inputRef}/>
                        <Button type='primary' htmlType="submit" onClick={submit}>Submit</Button>
                    </div>
                </div>
            }
        </>
    );
};

const mapStateToProps = state => ({
    currentAuthUsername: state.auth.user.username
});

export default connect(mapStateToProps)(UploadPost);