import React, {useEffect} from "react";
import PropTypes from 'prop-types';
import {Button, Form} from "antd";
import UploadMediaPlayer from "../../../PostMedia/UploadMediaPlayer";
import styles from './uploadPost.module.css';
import Header from "../../PostsModal/PostsControl/Header";
import {connect} from "react-redux";
import {resizeableImage} from "../../../../utils/crop";
import Caption from "../../../Fields/Caption";
import {isMobile} from "../../../../utils/isMobile";

let getCroppedImage;

const UploadPost = ({upload, media, form, currentAuthUsername}) => {

    useEffect(() => {
        if(media.type.match('image') && !isMobile())
            getCroppedImage = resizeableImage(document.querySelector('.crop-image'));
    }, []);

    const submit = event => {
        event.preventDefault();
        if(media.type.match('image') && !isMobile()) {
            let media = getCroppedImage();

            fetch(media)
                .then(res => res.blob())
                .then(blob => {
                    uploadPost(blob, 'image/jpeg');
                });
        }
        else if (media.type.match('image'))
            uploadPost(media, 'image/jpeg');
        else
            uploadPost(media, 'video/mp4');
    };

    const uploadPost = (media, type) => {
        form.validateFields((err, {caption}) => {
            if (!err) {
                let postData = new FormData();

                postData.append('media', new File([media], "media", {type}));
                postData.append('caption', caption);

                upload(postData);
            }
        });
    };

    return (
        <>
            {
                media &&
                <Form className={styles.mainContainer} onSubmit={submit}>
                    <UploadMediaPlayer media={media}/>
                    <div className={styles.sideContainer}>
                        <Header username={currentAuthUsername}/>
                        <Caption getFieldDecorator={form.getFieldDecorator}/>
                        <Button type='primary' htmlType="submit">Submit</Button>
                    </div>
                </Form>
            }
        </>
    );
};

UploadPost.propTypes = {
    upload: PropTypes.func.isRequired,
    media: PropTypes.object,
    currentAuthUsername: PropTypes.string.isRequired
};

const mapStateToProps = state => ({
    currentAuthUsername: state.auth.user.username
});

export default Form.create()(connect(mapStateToProps)(UploadPost));