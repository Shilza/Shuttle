import React from "react";
import styles from './feed.module.css';
import CommentsList from "../Comments/CommentsList";
import {connect} from "react-redux";
import Header from "../Posts/PostsModal/PostsControl/Header";
import Actions from "../Posts/PostsModal/PostsControl/Actions/Actions";
import Footer from "../Posts/PostsModal/PostsControl/Footer";

const FeedPost = React.memo(({post, comments, open}) => (
    <article className={styles.item}>
        <Header username={post.owner} avatar={post.avatar}/>
        <div className={styles.mediaContainer} onClick={() => open(post)}>
            {
                post.src.match('.mp4') ?
                    <video src={post.src}
                           className={styles.media}
                    /> :
                    <img
                        alt="user's post"
                        className={styles.media}
                        src={post.src}
                    />
            }
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

function getComments(comments, props) {

    let com = [];
    comments.forEach(comment => {
        if (comment.post_id === props.post.id)
            com.push(comment);
    });

    return com;
}

const mapStateToProps = (state, props) => ({
    comments: getComments(state.comments.comments, props)
});

export default connect(mapStateToProps)(FeedPost);