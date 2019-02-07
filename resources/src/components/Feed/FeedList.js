import FeedPost from "./FeedPost";
import React from "react";
import styles from './feed.module.css';
import * as CommentService from "../../services/comments";
import {setCurrentPost} from "../../store/actions/posts";
import {connect} from "react-redux";
import PostsModal from "../User/Posts/PostsModal/PostsModal";


const FeedList = ({posts, dispatch}) => {
    const open = post => {
        dispatch(setCurrentPost(post));
        dispatch(CommentService.getComments(post.id));
    };

    return (
        <>
            <div className={styles.feedList}>
                {
                    posts.map(post => <FeedPost key={post.id} post={post} open={open}/>)
                }
            </div>
            <PostsModal/>
        </>
    );
};

export default connect()(FeedList);