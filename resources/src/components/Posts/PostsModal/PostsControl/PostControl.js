import React from "react";
import styles from './postControl.module.css';
import Header from "./Header";
import Actions from "./Actions/Actions";
import Footer from "./Footer";
import Caption from "./Caption";
import CommentsList from "../../../Comments/CommentsList";
import {connect} from "react-redux";
import Paginator from "../../../Paginator";
import * as CommentService from "../../../../services/comments";

const PostControl = ({post, dispatch, comments, page = 0}) => {

    const fetchComments = page => dispatch(CommentService.getComments(post.id, page));

    return (
        <div className={styles.postControl}>
            <Header username={post.owner} avatar={post.avatar}/>
            <Caption post={post}/>
            <Paginator
                fetcher={fetchComments}
                initialPage={page}
                isReverse={true}
            >
                {
                    comments && <CommentsList comments={comments}/>
                }
            </Paginator>
            <Actions post={post}/>
            <Footer post={post}/>
        </div>
    );
};

const mapStateToProps = state => ({
    comments: state.comments.comments.data,
    page: state.comments.comments.page
});

export default connect(mapStateToProps)(PostControl);