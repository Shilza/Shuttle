import React from "react";
import PropTypes from 'prop-types';
import {connect} from "react-redux";
import {getArchived} from "../../services/post";
import styles from './archive.module.css';
import Paginator from "../../components/Paginator/Paginator";
import Posts from "../../components/Posts/Posts";

const Archive = ({posts, page = 0, dispatch}) => {

    const fetchArchivedPosts = page => dispatch(getArchived(page));

    return (
        <div className={styles.pageContainer}>
            <span className={styles.title}>Only you can see archived posts</span>
            <Paginator
                fetcher={fetchArchivedPosts}
                initialPage={page}
            >
                <Posts posts={posts}/>
            </Paginator>
        </div>
    );
};

Archive.propTypes = {
    posts: PropTypes.array,
    page: PropTypes.number,
    dispatch: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
    posts: state.posts.archivePosts.data,
    page: state.posts.archivePosts.page
});

export default connect(mapStateToProps)(Archive);