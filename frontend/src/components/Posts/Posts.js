import React from "react";
import PropTypes from 'prop-types';
import PostsList from "./PostsList";

const Posts = ({posts}) => (
  <PostsList posts={posts}/>
);

Posts.propTypes = {
  posts: PropTypes.array
};

export default Posts;
