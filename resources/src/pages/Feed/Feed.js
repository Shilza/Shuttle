import React from "react";
import PropTypes from 'prop-types';
import {connect} from "react-redux";

import * as FeedService from "services/feed";
import FeedList from "./FeedList/FeedList";
import Paginator from "components/Paginator/Paginator";
import FeedExplainingLabel from "components/ExplainingLabels/FeedLabel/FeedLabel";

import styles from './feed.module.css';

const Feed = ({posts, page = 0, dispatch}) => {

    const fetchFeedPosts = page => dispatch(FeedService.getFeed(page));

    return (
        <div className={styles.container}>
            <div className={styles.list}>
                <Paginator
                    fetcher={fetchFeedPosts}
                    initialPage={page}
                >
                    <FeedList posts={posts}/>
                </Paginator>
                {
                    posts && posts.length === 0 &&
                    <FeedExplainingLabel/>
                }
            </div>
        </div>
    );
};

Feed.propTypes = {
    posts: PropTypes.array,
    page: PropTypes.number,
    dispatch: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
    posts: state.posts.feedPosts.data,
    page: state.posts.feedPosts.page
});

export default connect(mapStateToProps)(Feed);
