import React, {useCallback, useEffect, useState} from "react";
import {connect} from 'react-redux';
import Paginator from "components/Paginator/Paginator";
import FeedExplainingLabel from "components/ExplainingLabels/FeedLabel/FeedLabel";
import FeedList from "./FeedList";

import styles from './feed.module.css';
import Loader from "components/Paginator/Loader";

const Feed = ({posts, dispatch}) => {

  const [firstLoading, setFirstLoading] = useState(false);

  const fetcher = useCallback((page) => {
    return dispatch.posts.fetchFeed(page)
      .then((data) => {
        if (!firstLoading)
          setFirstLoading(true);
        return data;
      })
  }, [dispatch.posts, firstLoading]);

  useEffect(() => {
    dispatch.posts.resetFeed();
  }, [dispatch.posts]);

  return (
    <div className={styles.container}>
      <div className={styles.list}>
        <Paginator fetcher={fetcher}>
          <FeedList posts={posts}/>
        </Paginator>
        {
          posts && posts.length === 0 && firstLoading &&
          <FeedExplainingLabel/>
        }
        {!firstLoading && <Loader/>}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  posts: state.posts.feed
});

export default connect(mapStateToProps)(Feed);
