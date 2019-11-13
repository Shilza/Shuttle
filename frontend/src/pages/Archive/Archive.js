import React from "react";
import PropTypes from 'prop-types';
import {connect} from "react-redux";

import Paginator from "components/Paginator";
import Posts from "components/Posts";

import styles from './archive.module.css';

const Archive = ({posts, dispatch}) => (
  <div className={styles.pageContainer}>
    <span className={styles.title}>Only you can see archived posts</span>
    <Paginator fetcher={dispatch.posts.fetchArchived}>
      <Posts posts={posts}/>
    </Paginator>
  </div>
);

Archive.propTypes = {
  posts: PropTypes.array,
  dispatch: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  posts: state.posts.archived
});

export default connect(mapStateToProps)(Archive);
