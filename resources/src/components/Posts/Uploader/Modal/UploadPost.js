import {Button} from "antd";
import UploadMediaPlayer from "../../../MediaPlayer/UploadMediaPlayer";
import React, {createRef} from "react";
import styles from './uploadPost.module.css';
import Header from "../../PostsModal/PostsControl/Header";
import {connect} from "react-redux";
import resizeableImage from "../../../../utils/crop";

class UploadPost extends React.Component {

    inputRef = createRef();

    state = {
        getCroppedImage: undefined
    };

    componentDidMount() {
        const getCroppedImage = resizeableImage(document.querySelector('.crop-image'));
        this.setState({getCroppedImage});
    }

    submit = () => {

        let media = this.state.getCroppedImage();

        fetch(media)
            .then(res => res.blob())
            .then(blob => {
                let postData = new FormData();
                postData.append('media', new File([blob], "media", {type:'image/jpeg'}));
                postData.append('caption', this.inputRef.current.value);

                this.props.upload(postData);
            });
    };


    render() {

        const {media, currentAuthUsername} = this.props;

        return (
            <>
                {
                    media &&
                    <div className={styles.mainContainer}>
                        <UploadMediaPlayer media={media}/>
                        <div className={styles.sideContainer}>
                            <Header username={currentAuthUsername}/>
                            <input ref={this.inputRef}/>

                            <Button type='primary' htmlType="submit" onClick={this.submit}>Submit</Button>
                        </div>
                    </div>
                }
            </>
        );
    }
}

const mapStateToProps = state => ({
    currentAuthUsername: state.auth.user.username
});

export default connect(mapStateToProps)(UploadPost);