import React from "react";
import {connect} from "react-redux";
import {getArchived} from "../../services/post";
import styles from './archive.module.css';
import Paginator from "../../components/Paginator/Paginator";
import Posts from "../../components/Posts/Posts";

const Archive = ({posts, page, dispatch}) => {

    const fetchArchivedPosts = page => dispatch(getArchived(page));

    return (
        <div className={styles.pageContainer}>
            <span className={styles.title}>Only you can see archived posts</span>
            <Paginator
                fetcher={fetchArchivedPosts}
                initialPage={page || 0}
            >
                <Posts posts={posts}/>
            </Paginator>
        </div>
    );
};

const mapStateToProps = state => ({
    posts: state.posts.archivePosts.data,
    page: state.posts.archivePosts.page
});

export default connect(mapStateToProps)(Archive);