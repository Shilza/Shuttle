import React, {useEffect} from "react";
import PropTypes from 'prop-types';
import {connect} from "react-redux";
import {getPostByCode} from "../../services/post";
import {removeCurrentPost} from "../../store/actions/posts";
import PostModalBody from "../../components/Posts/PostsModal/PostModalBody";

const PostByCode = ({dispatch, match, currentPost}) => {

    useEffect(() => {
        dispatch(getPostByCode(match.params.code));
        return componentWillUnmount;
    }, []);

    const componentWillUnmount = () => dispatch(removeCurrentPost());

    return (
        <>
            {
                currentPost &&
                <PostModalBody post={currentPost}/>
            }
        </>
    )
};

PostByCode.propTypes = {
    dispatch: PropTypes.func.isRequired,
    match: PropTypes.object,
    currentPost: PropTypes.object
};

const mapStateToProps = state => ({
    currentPost: state.posts.currentPost
});

export default connect(mapStateToProps)(PostByCode);