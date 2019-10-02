import React from "react";
import PropTypes from 'prop-types';
import {connect} from "react-redux";
import * as PostService from "services/post";
import PostsExplainingLabel from "components/ExplainingLabels/PostsLabel/PostsExplainingLabel";
import Paginator from "components/Paginator/Paginator";
import PostsList from "components/Posts/PostsList/PostsList";
import PostsModal from "components/Posts/PostsModal/PostsModal";

const PostsManager = ({id, dispatch, posts}) => {

    const fetchUsersPosts = page => dispatch(PostService.getPosts(id, page));

    return (
        <>
            {
                posts && !posts.length && <PostsExplainingLabel/>
            }
            <Paginator
                fetcher={fetchUsersPosts}
            >
                <PostsList posts={posts}/>
            </Paginator>
            <PostsModal/>
        </>
    );
};

PostsManager.propTypes = {
    id: PropTypes.number.isRequired,
    dispatch: PropTypes.func.isRequired,
    posts: PropTypes.array
};

const mapStateToProps = state => ({
    id: state.users.user.id,
    posts: state.posts.usersPosts.data
});

export default connect(mapStateToProps)(PostsManager);
