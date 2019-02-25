import * as React from "react";
import {removeCurrentPost} from "../../../../store/actions/posts";
import {message} from "antd/lib/index";
import * as PostService from "../../../../services/post";
import {connect} from "react-redux";

const RemovePostButton = ({post_id, dispatch}) => {
    const removePost = () => {
        dispatch(PostService.remove(post_id))
            .then(data => {
                message.success(data.message);
                dispatch(removeCurrentPost());
            })
            .catch(err => message.error(err.response.data.message));
    };

    return (
        <li onClick={removePost}>Delete post</li>
    );
};

export default connect()(RemovePostButton);