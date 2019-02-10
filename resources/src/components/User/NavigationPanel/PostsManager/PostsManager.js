import * as PostService from "../../../../services/post";
import React from "react";
import {connect} from "react-redux";
import PostsExplainingLabel from "./PostsExplainingLabel/PostsExplainingLabel";
import Posts from "../../../Posts/Posts";

class PostsManager extends React.PureComponent {

    state = {
        isPrivate: false
    };

    componentDidMount() {
        const {id, dispatch} = this.props;

        dispatch(PostService.getPosts(id))
            .then(({isPrivate}) => this.setState({isPrivate}));
    }

    render() {
        const {posts} = this.props;
        const {isPrivate} = this.state;

        return (
            <>
                {
                    isPrivate ? <span>Private</span> :
                        <>
                            {
                                posts && !posts.length && <PostsExplainingLabel/>
                            }
                            <Posts posts={posts}/>
                        </>
                }
            </>
        )
    }
}

const mapStateToProps = state => ({
    id: state.users.user.id,
    posts: state.posts.posts
});

export default connect(mapStateToProps)(PostsManager);