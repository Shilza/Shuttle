import React from "react";
import {connect} from "react-redux";
import Uploader from "./Modal/Uploader";
import * as PostService from "../../../services/post";
import {message} from "antd/lib/index";
import Modal from "../../Modal/Modal";
import UploadPost from "./Modal/UploadPost";

class PostsUploader extends React.Component {

    state = {
        isOpen: false,
        media: undefined
    };

    closeModal = () => this.setState({isOpen: false});

    loadMedia = event => this.setState({isOpen: true, media: event.target.files[0]});

    upload = postData => {
        this.props.dispatch(PostService.create(postData))
            .then(data => message.success(data.message))
            .catch(err => message.error(err.response.data.message));

        this.closeModal();
    };

    render() {
        const {isOpen, media} = this.state;

        return (
            <>
                {
                    isOpen &&
                    <Modal closeModal={this.closeModal}>
                        <UploadPost media={media} upload={this.upload}/>
                    </Modal>
                }
                <Uploader loadMedia={this.loadMedia} trigger={this.props.trigger}/>
            </>
        )
    }
}

export default connect()(PostsUploader);