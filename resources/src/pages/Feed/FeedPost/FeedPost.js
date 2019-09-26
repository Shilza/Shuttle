import React from "react";
import PropTypes from 'prop-types';
import {connect} from "react-redux";

import Header from "components/Posts/PostsModal/PostsControl/Header";
import Actions from "components/Posts/PostsModal/PostsControl/Actions/Actions";
import Footer from "components/Posts/PostsModal/PostsControl/Footer";
import PostMedia from "components/PostMedia/PostMedia";
import CommentsList from "components/Comments/CommentsList";

import {getComments} from "store/selectors/comments";

import styles from '../feed.module.css';

const FeedPost = ({post, comments, open}) => {
  const {owner, avatar, src, marks, id} = post;

  const openPost = event => {
    const tag = event.target.tagName.toLowerCase();
    if (tag === 'img' || tag === 'video')
      open(post)
  };

  return (
    <section className={styles.item}>
      <Header username={owner} avatar={avatar}/>
      <div className={styles.mediaContainer} onClick={openPost}>
        <PostMedia media={src} postId={id} marks={marks}/>
      </div>
      <Actions post={post}/>
      {
        comments && comments.length > 0 &&
        <div className={styles.comments}>
          <CommentsList comments={comments}/>
        </div>
      }
      <Footer post={post}/>
    </section>
  );
};

FeedPost.propTypes = {
  post: PropTypes.object.isRequired,
  comments: PropTypes.array,
  open: PropTypes.func.isRequired
};

const mapStateToProps = (state, props) => ({
  comments: getComments(state.comments.comments.data, props.post),
});

export default connect(mapStateToProps)(FeedPost);
