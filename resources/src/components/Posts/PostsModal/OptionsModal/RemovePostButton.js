import * as React from "react";
import PropTypes from 'prop-types';
import {message} from "antd/lib/index";

import {removeCurrentPost} from "store/actions/posts";
import * as PostService from "services/post";
import {connect} from "react-redux";

const RemovePostButton = ({postId, dispatch}) => {
    const removePost = () => {
        dispatch(PostService.remove(postId))
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

RemovePostButton.propTypes = {
    postId: PropTypes.number.isRequired,
    dispatch: PropTypes.func.isRequired
};

export default connect()(RemovePostButton);
