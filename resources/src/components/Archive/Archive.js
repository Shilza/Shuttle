import React from "react";
import {connect} from "react-redux";
import {getArchived} from "../../services/post";
import Posts from "../User/Posts/Posts";
import styles from './archive.module.css';

class Archive extends React.Component {

    componentDidMount() {
        this.props.dispatch(getArchived());
    }

    render() {
        return (
            <div className={styles.pageContainer}>
                <span>Only you can see archived posts</span>
                <Posts posts={this.props.posts}/>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    posts: state.posts.posts
});

export default connect(mapStateToProps)(Archive);