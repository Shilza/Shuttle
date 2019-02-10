import FeedPost from "./FeedPost";
import React from "react";
import styles from './feed.module.css';
import * as CommentService from "../../services/comments";
import {setCurrentPost} from "../../store/actions/posts";
import {connect} from "react-redux";
import PostsModal from "../Posts/PostsModal/PostsModal";
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import transitions from '../Drawer/transitions.module.css';

const FeedList = ({posts, dispatch}) => {
    const open = post => {
        dispatch(setCurrentPost(post));
        dispatch(CommentService.getComments(post.id));
    };

    return (
        <>
            <div className={styles.feedList}>
                <ReactCSSTransitionGroup
                    transitionName={{
                        enter: transitions.enter,
                        enterActive: transitions.enterActive,
                        leave: transitions.leave,
                        leaveActive: transitions.leaveActive,
                        appear: transitions.appear,
                        appearActive: transitions.appearActive
                    }}
                    transitionAppear={true}
                    transitionAppearTimeout={500}
                    transitionEnterTimeout={500}
                    transitionLeaveTimeout={300}>
                    {posts.map(post => <FeedPost key={post.id} post={post} open={open}/>)}
                </ReactCSSTransitionGroup>
            </div>
            <PostsModal/>
        </>
    );
};

export default connect()(FeedList);