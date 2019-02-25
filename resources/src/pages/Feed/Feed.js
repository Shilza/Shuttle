import React from "react";
import {connect} from "react-redux";
import * as FeedService from "../../services/feed";
import FeedList from "./FeedList";
import styles from './feed.module.css';
import Paginator from "../../components/Paginator/Paginator";

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
            </div>
        </div>
    );
};

const mapStateToProps = state => ({
    posts: state.posts.feedPosts.data,
    page: state.posts.feedPosts.page
});

export default connect(mapStateToProps)(Feed);