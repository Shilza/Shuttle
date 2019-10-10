import React from "react";
import PropTypes from 'prop-types';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import Post from "../Post/Post";
import transitions from './transitions.module.css';
import styles from './postsList.module.css';

const PostsList = ({posts}) => (
  <ReactCSSTransitionGroup
    transitionName={{
      enter: transitions.enter,
      enterActive: transitions.enterActive,
      leave: transitions.leave,
      leaveActive: transitions.leaveActive,
      appear: transitions.appear,
      appearActive: transitions.appearActive
    }}
    transitionEnterTimeout={500}
    transitionLeaveTimeout={300}>
    <div className={styles.container} id='postsList'>
      {posts && posts.map(post => <Post key={post.id} post={post}/>)}
    </div>
  </ReactCSSTransitionGroup>
);

PostsList.proptTypes = {
  posts: PropTypes.array
};

export default PostsList;
