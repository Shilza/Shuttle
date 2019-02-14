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

     b64toBlob = (b64Data, contentType, sliceSize) => {
        contentType = contentType || '';
        sliceSize = sliceSize || 512;

        var byteCharacters = atob(b64Data);
        var byteArrays = [];

        for (var offset = 0; offset < byteCharacters.length; offset += sliceSize) {
            var slice = byteCharacters.slice(offset, offset + sliceSize);

            var byteNumbers = new Array(slice.length);
            for (var i = 0; i < slice.length; i++) {
                byteNumbers[i] = slice.charCodeAt(i);
            }

            var byteArray = new Uint8Array(byteNumbers);

            byteArrays.push(byteArray);
        }

        var blob = new Blob(byteArrays, {type: contentType});
        return blob;
    };

    submit = () => {

        let media = this.state.getCroppedImage();
        var block = media.split(";");
// Get the content type of the image
        var contentType = block[0].split(":")[1];// In this case "image/gif"
        console.log(contentType);
// get the real base64 content of the file
        var realData = block[1].split(",")[1];// In this case "R0lGODlhPQBEAPeoAJosM...."

// Convert it to a blob to upload
        var blob = this.b64toBlob(realData, contentType);

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

        const {upload, form, media, currentAuthUsername} = this.props;

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