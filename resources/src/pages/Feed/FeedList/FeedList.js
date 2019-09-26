import React from "react";
import PropTypes from 'prop-types';
import {connect} from "react-redux";
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import FeedPost from "../FeedPost/FeedPost";

import {setCurrentPost} from "store/actions/posts";
import PostsModal from "components/Posts/PostsModal/PostsModal";

import transitions from '../transitions.module.css';

const FeedList = ({posts, dispatch}) => {
    const open = post => dispatch(setCurrentPost(post));

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

FeedList.propTypes = {
    posts: PropTypes.array,
    dispatch: PropTypes.func.isRequired
};

export default connect()(FeedList);
