import React from "react";
import {connect} from "react-redux";
import {getPostByCode} from "../../services/post";
import ModalBody from "../../components/User/Posts/PostsModal/ModalBody";
import {removeCurrentPost} from "../../store/actions/posts";

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
                    <ModalBody post={currentPost}/>
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