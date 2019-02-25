import React from "react";
import styles from './feed.module.css';
import {connect} from "react-redux";
import Header from "../../components/Posts/PostsModal/PostsControl/Header";
import Actions from "../../components/Posts/PostsModal/PostsControl/Actions/Actions";
import Footer from "../../components/Posts/PostsModal/PostsControl/Footer";
import PostMedia from "../../components/PostMedia/PostMedia";
import CommentsList from "../../components/Comments/CommentsList";
import {getComments} from "../../store/selectors/comments";

const FeedPost = React.memo(({post, comments, open}) => {
    const openPost = event => {
        const tag = event.target.tagName.toLowerCase();
        if (tag === 'img' || tag === 'video')
            open(post)
    };

    const {owner, avatar, src, id} = post;

    return (
        <article className={styles.item}>
            <Header username={owner} avatar={avatar}/>
            <div className={styles.mediaContainer} onClick={openPost}>
                <PostMedia media={src} postId={id}/>
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