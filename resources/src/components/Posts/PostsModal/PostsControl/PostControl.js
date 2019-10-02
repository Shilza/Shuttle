import React, {useRef} from "react";
import PropTypes from 'prop-types';
import {connect} from "react-redux";

import Header from "./Header";
import Actions from "./Actions";
import Footer from "./Footer";
import Caption from "./Caption";

import CommentsList from "components/Comments/CommentsList";
import * as CommentService from "services/comments";
import {getComments} from "store/selectors/comments";
import TopPagination from "components/TopPagination";
import Loader from "components/Paginator/Loader";

import styles from './postControl.module.css';


const PostControl = ({post, dispatch, comments}) => {

  const {owner, avatar, caption, id} = post;
  let scrollParent = useRef(null);

  const getScrollParent = (ref) => {
    scrollParent.current = ref.current;
  };

  const fetchComments = page => dispatch(CommentService.getComments(id, page));

  return (
    <section className={styles.postControl}>
      <Header username={owner} avatar={avatar}/>
      <Caption owner={owner} caption={caption}/>
      <TopPagination
        fetcher={fetchComments}
        withScrollHandler
        loader={<Loader/>}
        className={styles.commentsList}
        getScrollParent={getScrollParent}
        toBottom
      >
        {
          comments && <CommentsList comments={comments}/>
        }
      </TopPagination>
      <Actions post={post}/>
      <Footer post={post} scrollParent={scrollParent.current}/>
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
