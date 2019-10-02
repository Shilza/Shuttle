import React from "react";
import PropTypes from 'prop-types';
import {connect} from "react-redux";
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import Post from "../Post/Post";
import {setCurrentPost} from "store/actions/posts";
import transitions from './transitions.module.css';
import styles from './postsList.module.css';

const PostsList = ({posts, dispatch}) => {
    const open = post => dispatch(setCurrentPost(post));

    return (
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
                {posts && posts.map(post => <Post key={post.id} post={post} open={open}/>)}
            </div>
        </ReactCSSTransitionGroup>
    );
};

PostsList.proptTypes = {
    posts: PropTypes.array,
    dispatch: PropTypes.func.isRequired
};

export default connect()(PostsList);
