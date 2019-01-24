import React from "react";
import styles from './optionsModal.module.css';
import * as PostService from "../../../../../services/post";
import {message} from "antd/lib/index";
import {closePostsModal} from "../../../../../store/actions/posts";
import {connect} from "react-redux";

const ModalBody = ({post_id, owner_id, currentUserId, dispatch, closeModal}) => {
    const removePost = () => {
        if (owner_id === currentUserId)
            dispatch(PostService.remove(post_id))
                .then(data => {
                    message.success(data.message);
                    dispatch(closePostsModal());
                })
                .catch(err => message.error(err.response.data.message));
        else
            message.error('Only owner can delete post');
    };

    return (
        <ul className={styles.optionsContainer}>
            <li>Complain</li>
            {
                (owner_id === currentUserId) &&
                <li onClick={removePost}>Delete post</li>
            }
            <li>Share</li>
            <li>Copy link</li>
            <li onClick={closeModal}>Cancel</li>
        </ul>
    );
};

const mapStateToProps = state => {
    return {
        currentUserId: state.auth.user.id
    };
};

export default connect(mapStateToProps)(ModalBody);