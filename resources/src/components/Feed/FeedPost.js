import React from "react";
import styles from './feed.module.css';
import CommentsList from "../Comments/CommentsList";
import {connect} from "react-redux";
import Header from "../Posts/PostsModal/PostsControl/Header";
import Actions from "../Posts/PostsModal/PostsControl/Actions/Actions";
import Footer from "../Posts/PostsModal/PostsControl/Footer";
import PostMedia from "../Posts/Post/PostMedia";

const FeedPost = React.memo(({post, comments, open}) => (
    <article className={styles.item}>
        <Header username={post.owner} avatar={post.avatar}/>
        <div className={styles.mediaContainer} onClick={() => open(post)}>
            <PostMedia src={post.src} style={styles.media}/>
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
));

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
});

export default connect(mapStateToProps)(FeedPost);