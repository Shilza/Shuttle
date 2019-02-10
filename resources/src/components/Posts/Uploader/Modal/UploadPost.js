import {Button} from "antd";
import UploadMediaPlayer from "../../../MediaPlayer/UploadMediaPlayer";
import React, {createRef} from "react";
import styles from './uploadPost.module.css';
import Header from "../../PostsModal/PostsControl/Header";
import {connect} from "react-redux";

const UploadPost = ({upload, form, media, currentAuthUsername}) => {

    const inputRef = createRef();

    const submit = event => {
        event.preventDefault();

        let postData = new FormData();
        postData.append('media', media);
        postData.append('caption', inputRef.current.value);

        upload(postData);
    };

    return (
        <form onSubmit={submit}>
            {
                media &&
                <div className={styles.mainContainer}>
                    <UploadMediaPlayer media={media}/>
                    <div className={styles.sideContainer}>
                        <Header username={currentAuthUsername}/>
                        <input ref={inputRef}/>

                        <Button type='primary' htmlType="submit">Submit</Button>
                    </div>
                </div>
            }
        </form>
    );
};

const mapStateToProps = state => ({
    currentAuthUsername: state.auth.user.username
});

export default connect(mapStateToProps)(UploadPost);