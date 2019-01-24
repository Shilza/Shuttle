import React from "react";
import styles from './postControl.module.css';
import Header from "./Header";
import Actions from "./Actions/Actions";
import Footer from "./Footer";
import Caption from "./Caption";
import CommentsList from "../../../Comments/CommentsList";
import {connect} from "react-redux";

const PostControl = ({post, comments}) => (
    <div className={styles.postControl}>
        <Header username={post.owner}/>
        <Caption post={post}/>
        <CommentsList comments={comments}/>
        <Actions post={post}/>
        <Footer post={post}/>
    </div>
);

const mapStateToProps = state => {
    return {
        comments: state.comments.comments
    };
};

export default connect(mapStateToProps)(PostControl);