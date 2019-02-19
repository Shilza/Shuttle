import React from "react";
import styles from './postsList.module.css';
import transitions from './transitions.module.css';
import Post from "../Post/Post";
import {connect} from "react-redux";
import {setCurrentPost} from "../../../store/actions/posts";
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

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

export default connect()(PostsList);