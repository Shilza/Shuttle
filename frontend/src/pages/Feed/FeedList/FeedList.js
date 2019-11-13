import React from "react";
import PropTypes from 'prop-types';
import FeedPost from "./FeedPost";

const FeedList = ({posts}) => (
  <div>
    {posts && posts.map(post => <FeedPost key={post.id} post={post}/>)}
  </div>
);

FeedList.propTypes = {
  posts: PropTypes.array,
};

export default FeedList;
