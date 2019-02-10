import React from "react";
import {getLiked} from "../../services/post";
import {connect} from "react-redux";
import styles from './likedPosts.module.css';
import Posts from "../Posts/Posts";

class LikedPosts extends React.Component {

    componentDidMount() {
        this.props.dispatch(getLiked());
    }

    render() {
        return (
            <div className={styles.pageContainer}>
                <span>LikedPosts</span>
                <Posts posts={this.props.posts}/>
            </div>
        );
    }
}


const mapStateToProps = state => ({
    posts: state.posts.posts
});

export default connect(mapStateToProps)(LikedPosts);
