import React from "react";
import PostsList from "./PostsList/PostsList";
import * as PostService from "../../../services/post";
import {connect} from "react-redux";
import PostsModal from "./PostsModal/PostsModal";

class Posts extends React.PureComponent {

    componentDidMount() {
        const {id, dispatch} = this.props;

        dispatch(PostService.getPosts(id));
    }

    render() {
        const {posts} = this.props;

        return (
            <>
                {posts ? <PostsList posts={posts}/> : <div>Loading</div>}
                <PostsModal/>
            </>
        )
    }
}

const mapStateToProps = state => {
    return {
        id: state.users.user.id,
        posts: state.posts.posts
    }
};

export default connect(mapStateToProps)(Posts);