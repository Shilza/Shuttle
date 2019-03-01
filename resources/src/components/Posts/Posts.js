import React from "react";
import PropTypes from 'prop-types';
import PostsModal from "./PostsModal/PostsModal";
import PostsList from "./PostsList/PostsList";

const Posts = ({posts}) => (
    <>
        <PostsList posts={posts}/>
        <PostsModal/>
    </>
);

Posts.propTypes = {
    posts: PropTypes.array
};

export default Posts;