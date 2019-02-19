import React from "react";
import styles from './feed.module.css';
import CommentsList from "../Comments/CommentsList";
import {connect} from "react-redux";
import Header from "../Posts/PostsModal/PostsControl/Header";
import Actions from "../Posts/PostsModal/PostsControl/Actions/Actions";
import Footer from "../Posts/PostsModal/PostsControl/Footer";
import PostMedia from "../PostMedia/PostMedia";

const FeedPost = React.memo(({post, comments, postIdToBeSaved, open}) => {
    const openPost = event => {
        const tag = event.target.tagName.toLowerCase();
        if (tag === 'img' || tag === 'video')
            open(post)
    };

    return (
        <article className={styles.item}>
            <Header username={post.owner} avatar={post.avatar}/>
            <div className={styles.mediaContainer} onClick={openPost}>
                <PostMedia media={post.src} showSavedBar={post.id === postIdToBeSaved}/>
            </div>
            <Actions post={post}/>
            {
                comments &&
                <div style={{fontSize: 10}}>
                    <CommentsList comments={comments}/>
                </div>
            }
            <Footer post={post}/>
        </article>
    );
});

const getComments = (comments, props) => {
    let postComments = [];
    if (comments)
        comments.forEach(comment => {
            if (comment.post_id === props.post.id)
                postComments.push(comment);
        });

    return postComments;
};

const mapStateToProps = (state, props) => ({
    comments: getComments(state.comments.comments.data, props),
    postIdToBeSaved: state.saved.postToBeSaved ? state.saved.postToBeSaved.id : undefined
});

export default connect(mapStateToProps)(FeedPost);