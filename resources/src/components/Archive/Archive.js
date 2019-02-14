import React from "react";
import {connect} from "react-redux";
import {getArchived} from "../../services/post";
import styles from './archive.module.css';
import Posts from "../Posts/Posts";

class Archive extends React.Component {

    componentDidMount() {
        this.props.dispatch(getArchived());
    }

    render() {
        return (
            <div className={styles.pageContainer}>
                <span className={styles.title}>Only you can see archived posts</span>
                <Posts posts={this.props.posts}/>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    posts: state.posts.posts
});

export default connect(mapStateToProps)(Archive);