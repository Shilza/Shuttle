import React from "react";
import PropTypes from 'prop-types';
import {getLiked} from "../../services/post";
import {connect} from "react-redux";
import styles from './likedPosts.module.css';
import Paginator from "../../components/Paginator/Paginator";
import Posts from "../../components/Posts/Posts";

const LikedPosts = ({posts, page = 0, dispatch}) => {

    const fetchLikedPosts = page => dispatch(getLiked(page));

    return (
        <div className={styles.pageContainer}>
            <span className={styles.title}>LikedPosts</span>
            <Paginator
                fetcher={fetchLikedPosts}
                initialPage={page}
            >
                <Posts posts={posts}/>
            </Paginator>
        </div>
    );
};

LikedPosts.propTypes = {
    posts: PropTypes.array,
    page: PropTypes.number,
    dispatch: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
    posts: state.posts.likedPosts.data,
    page: state.posts.likedPosts.page,
});

export default connect(mapStateToProps)(LikedPosts);
