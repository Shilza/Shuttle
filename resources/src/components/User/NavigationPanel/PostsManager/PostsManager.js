import React from "react";
import PropTypes from 'prop-types';
import * as PostService from "../../../../services/post";
import {connect} from "react-redux";
import PostsExplainingLabel from "../../../ExplainingLabels/PostsLabel/PostsExplainingLabel";
import Paginator from "../../../Paginator/Paginator";
import PostsList from "../../../Posts/PostsList/PostsList";
import PostsModal from "../../../Posts/PostsModal/PostsModal";

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
                <>
                    <PostsList posts={posts}/>
                    <PostsModal/>
                </>
            </Paginator>
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