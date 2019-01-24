import React from "react";
import styles from './postsList.module.css';
import Post from "../Post/Post";
import {connect} from "react-redux";
import * as CommentService from "../../../../services/comments";
import {setCurrentPost} from "../../../../store/actions/posts";

const PostsList = ({posts, dispatch}) => {
    const open = post => {
        dispatch(setCurrentPost(post));
        dispatch(CommentService.getComments(post.id));
    };

    return (
        <div className={styles.container} id='postsList'>
            {
                posts.map(post => <Post key={post.id} post={post} open={open}/>)
            }
        </div>
    );
};

export default connect()(PostsList);