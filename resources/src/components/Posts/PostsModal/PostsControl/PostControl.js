import React, {useRef} from "react";
import PropTypes from 'prop-types';

import Header from "./Header";
import Actions from "./Actions";
import Footer from "./Footer";

import CommentsList from "components/Comments/CommentsList";
import TopPagination from "components/TopPagination";
import Loader from "components/Paginator/Loader";
import useComments from "utils/useComments";

import styles from './postControl.module.css';
import Caption from "components/Posts/Caption";


const PostControl = ({post}) => {

  const {owner, avatar, caption, id, location, comments_count} = post;
  let scrollParent = useRef(null);
  const {comments, fetchComments, onComment, onCommentRemove, setCommentLiked} = useComments(id, comments_count);

  let style;
  if(post.src.match('.mp4'))
    style = {width: 'auto'};

  const getScrollParent = (ref) => {
    scrollParent.current = ref.current;
  };

  const scrollCommentsToBottom = (comment) => {
    onComment(comment);
    scrollParent.current.scrollTo(0, scrollParent.current.scrollHeight);
  };

  return (
    <section className={styles.postControl} style={style}>
      <Header username={owner} avatar={avatar} location={location}/>
      <Caption username={owner} caption={caption} className={styles.caption}/>
      <TopPagination
        fetcher={fetchComments}
        withScrollHandler
        loader={<Loader/>}
        className={styles.commentsList}
        getScrollParent={getScrollParent}
        toBottom
      >
        {
          comments &&
          <CommentsList
            comments={comments}
            onRemove={onCommentRemove}
            setCommentLiked={setCommentLiked}
          />
        }
      </TopPagination>
      <Actions post={post}/>
      <Footer post={post} onComment={scrollCommentsToBottom}/>
    </section>
  );
};

PostControl.propTypes = {
  post: PropTypes.shape({
    owner: PropTypes.string.isRequired,
    avatar: PropTypes.string,
    caption: PropTypes.string,
    id: PropTypes.number.isRequired
  })
};



export default PostControl;
