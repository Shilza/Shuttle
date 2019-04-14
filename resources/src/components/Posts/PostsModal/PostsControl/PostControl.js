import React from "react";
import PropTypes from 'prop-types';
import styles from './postControl.module.css';
import Header from "./Header";
import Actions from "./Actions/Actions";
import Footer from "./Footer";
import Caption from "./Caption";
import CommentsList from "../../../Comments/CommentsList";
import {connect} from "react-redux";
import Paginator from "../../../Paginator/Paginator";
import * as CommentService from "../../../../services/comments";
import {getComments} from "../../../../store/selectors/comments";

const PostControl = ({post, dispatch, comments}) => {

    const {owner, avatar, caption, id} = post;

    const fetchComments = page => dispatch(CommentService.getComments(id, page));

    return (
        <section className={styles.postControl}>
            <Header username={owner} avatar={avatar}/>
            <Caption owner={owner} caption={caption}/>
            <Paginator
                fetcher={fetchComments}
                isReverse={true}
            >
                {
                    comments && <CommentsList comments={comments}/>
                }
            </Paginator>
            <Actions post={post}/>
            <Footer post={post}/>
        </section>
    );
};

PostControl.propTypes = {
    post: PropTypes.shape({
        owner: PropTypes.string.isRequired,
        avatar: PropTypes.string,
        caption: PropTypes.string,
        id: PropTypes.number.isRequired
    }),
    dispatch: PropTypes.func.isRequired,
    comments: PropTypes.array
};

const mapStateToProps = (state, props) => ({
    comments: getComments(state.comments.comments.data, props.post)
});

export default connect(mapStateToProps)(PostControl);