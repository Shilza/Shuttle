import React from "react";
import PropTypes from 'prop-types';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import FeedPost from "./FeedPost";

import PostsModal from "components/Posts/PostsModal";

import transitions from '../transitions.module.css';

const FeedList = ({posts}) => (
  <>
    <ReactCSSTransitionGroup
      transitionName={transitions}
      transitionAppear={true}
      transitionAppearTimeout={250}
      transitionEnter={false}
      transitionLeaveTimeout={300}>
      {posts && posts.map(post => <FeedPost key={post.id} post={post}/>)}
    </ReactCSSTransitionGroup>
    <PostsModal/>
  </>
);

FeedList.propTypes = {
  posts: PropTypes.array
};

export default FeedList;
