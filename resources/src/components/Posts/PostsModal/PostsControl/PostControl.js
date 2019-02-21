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
import {getComments} from "../../../../store/selectors/comments";

const PostControl = ({post, dispatch, comments}) => {

    const fetchComments = page => dispatch(CommentService.getComments(post.id, page));

    return (
        <div className={styles.postControl}>
            <Header username={post.owner} avatar={post.avatar}/>
            <Caption post={post}/>
            <Paginator
                fetcher={fetchComments}
                initialPage={0}
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

const mapStateToProps = (state, props) => ({
    comments: getComments(state.comments.comments.data, props.post)
});

export default connect(mapStateToProps)(PostControl);