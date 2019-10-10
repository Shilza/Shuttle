import React from "react";
import PropTypes from 'prop-types';
import {connect} from "react-redux";
import styles from './likedPosts.module.css';
import Paginator from "components/Paginator";
import Posts from "components/Posts";

const LikedPosts = ({posts, dispatch}) => (
  <div className={styles.pageContainer}>
    <span className={styles.title}>LikedPosts</span>
    <Paginator fetcher={dispatch.posts.fetchLiked}>
      <Posts posts={posts}/>
    </Paginator>
  </div>
);

LikedPosts.propTypes = {
  posts: PropTypes.array
};

const mapStateToProps = state => ({
  posts: state.posts.liked
});

export default connect(mapStateToProps)(LikedPosts);
