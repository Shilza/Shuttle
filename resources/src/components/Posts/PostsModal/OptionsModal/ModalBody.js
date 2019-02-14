import React from "react";
import * as PostService from "../../../../services/post";
import {message} from "antd/lib/index";
import {removeCurrentPost} from "../../../../store/actions/posts";
import {connect} from "react-redux";
import Archive from "./Archive";
import ListModal from "../../../Modal/ListModal";

const ModalBody = ({post_id, owner_id, isArchived, link, currentUserId, dispatch, closeModal}) => {
    const removePost = () => {
        if (owner_id === currentUserId)
            dispatch(PostService.remove(post_id))
                .then(data => {
                    message.success(data.message);
                    dispatch(removeCurrentPost());
                })
                .catch(err => message.error(err.response.data.message));
        else
            message.error('Only owner can delete post');
    };

    const copyLinkToClipboard = () => {
        let el = document.createElement('textarea');
        el.value = link;
        el.setAttribute('readonly', '');
        document.body.appendChild(el);
        el.select();
        document.execCommand('copy');
        document.body.removeChild(el);
        message.success('Link copied to clipboard');
    };

    const me = owner_id === currentUserId;

    return (
        <ListModal>
            <li>Complain</li>
            <li>Share</li>
            <li onClick={copyLinkToClipboard}>Copy link</li>
            {
                me &&
                <>
                    <Archive isArchived={isArchived} post_id={post_id}/>
                    <li>Edit post</li>
                    <li onClick={removePost}>Delete post</li>
                </>
            }
            <li onClick={closeModal}>Cancel</li>
        </ListModal>
    );
};

const mapStateToProps = state => ({
    currentUserId: state.auth.user.id
});

export default connect(mapStateToProps)(ModalBody);