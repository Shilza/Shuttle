import React from "react";
import {connect} from "react-redux";
import {getPostByCode} from "../../services/post";
import {removeCurrentPost} from "../../store/actions/posts";
import PostModalBody from "../../components/Posts/PostsModal/PostModalBody";

class PostByCode extends React.Component {

    componentDidMount() {
        const {dispatch, match} = this.props;
        dispatch(getPostByCode(match.params.code));
    }

    componentWillUnmount() {
        this.props.dispatch(removeCurrentPost());
    }

    render() {
        const {currentPost} = this.props;

        return (
            <>
                {
                    currentPost &&
                    <PostModalBody post={currentPost}/>
                }
            </>
        )
    }
}

const mapStateToProps = state => {
    return {
        currentPost: state.posts.currentPost
    }
};

export default connect(mapStateToProps)(PostByCode);