import * as PostService from "../../../../services/post";
import React from "react";
import {connect} from "react-redux";
import Posts from "../../Posts/Posts";
import PostsExplainingLabel from "./PostsExplainingLabel/PostsExplainingLabel";

class PostsManager extends React.PureComponent {

    componentDidMount() {
        const {id, dispatch} = this.props;

        dispatch(PostService.getPosts(id));
    }

    render() {
        const {posts} = this.props;

        return (
            <>
                {
                    posts && !posts.length && <PostsExplainingLabel/>
                }
                <Posts posts={posts}/>
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

export default connect(mapStateToProps)(PostsManager);