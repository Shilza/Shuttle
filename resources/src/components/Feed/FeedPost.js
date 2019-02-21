import React from "react";
import styles from './feed.module.css';
import {connect} from "react-redux";
import Header from "../Posts/PostsModal/PostsControl/Header";
import Actions from "../Posts/PostsModal/PostsControl/Actions/Actions";
import Footer from "../Posts/PostsModal/PostsControl/Footer";
import PostMedia from "../PostMedia/PostMedia";
import CommentsList from "../Comments/CommentsList";
import {getComments} from "../../store/selectors/comments";

const FeedPost = React.memo(({post, comments, open}) => {
    const openPost = event => {
        const tag = event.target.tagName.toLowerCase();
        if (tag === 'img' || tag === 'video')
            open(post)
    };

    return (
        <article className={styles.item}>
            <Header username={post.owner} avatar={post.avatar}/>
            <div className={styles.mediaContainer} onClick={openPost}>
                <PostMedia media={post.src} postId={post.id}/>
            </div>
            <Actions post={post}/>
            {
                comments &&
                <div className={styles.comments}>
                    <CommentsList comments={comments}/>
                </div>
            }
            <Footer post={post}/>
        </article>
    );
});


const mapStateToProps = (state, props) => ({
    comments: getComments(state.comments.comments.data, props.post),
});

export default connect(mapStateToProps)(FeedPost);