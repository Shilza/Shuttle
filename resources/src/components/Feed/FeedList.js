import FeedPost from "./FeedPost";
import React from "react";
import {setCurrentPost} from "../../store/actions/posts";
import {connect} from "react-redux";
import PostsModal from "../Posts/PostsModal/PostsModal";
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import transitions from '../Drawer/transitions.module.css';

const FeedList = ({posts, dispatch}) => {
    const open = post => {
        dispatch(setCurrentPost(post));
    };

    return (
        <>
            <ReactCSSTransitionGroup
                transitionName={transitions}
                transitionAppear={true}
                transitionAppearTimeout={250}
                transitionEnter={false}
                transitionLeaveTimeout={300}>
                {posts && posts.map(post => <FeedPost key={post.id} post={post} open={open}/>)}
            </ReactCSSTransitionGroup>
            <PostsModal/>
        </>
    );
};

export default connect()(FeedList);