import {Icon} from "antd";
import React, {createRef} from "react";
import styles from './avatar.module.css';
import {connect} from "react-redux";
import {message} from "antd/lib/index";
import {updateAvatar} from "../../../../services/user";

class UploadButton extends React.Component{

    fileRef = createRef();

    state = {
        media: undefined
    };

    loadMedia = event => {
        this.setState({media: event.target.files[0]}, this.uploadAvatar);
    };

    uploadAvatar = () => {
        let avatar = new FormData();
        avatar.append('avatar', this.state.media);

        this.props.dispatch(updateAvatar(avatar))
            .then(data => message.success(data.message))
            .catch(err => message.error(err.response.data.message));
    };

    render() {
        return (
            <button className={styles.avatarActionButton} onClick={() => this.fileRef.current.click()}>
                <Icon type='upload'/>
                <input type='file' style={{display: 'none'}} onChange={this.loadMedia} ref={this.fileRef}/>
            </button>
        )
    }
}

export default connect()(UploadButton);