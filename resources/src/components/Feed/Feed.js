import React from "react";
import {connect} from "react-redux";
import * as FeedService from "../../services/feed";
import FeedList from "./FeedList";
import styles from './feed.module.css';
import Paginator from "../Paginator";

const Feed = ({posts, page = 0, dispatch}) => {

    const fetchFeedPosts = page => dispatch(FeedService.getFeed(page));

    return (
        <div className={styles.feedList}>
            <Paginator
                fetcher={fetchFeedPosts}
                initialPage={page}
            >
                <FeedList posts={posts}/>
            </Paginator>
        </div>
    );
};

const mapStateToProps = state => {
    return {
        posts: state.posts.feedPosts.data,
        page: state.posts.feedPosts.page
    }
};

export default connect(mapStateToProps)(Feed);