import React, {useCallback, useEffect, useRef, useState} from "react";
import PropTypes from 'prop-types';
import {connect} from "react-redux";

import Header from "components/Posts/PostsModal/PostsControl/Header";
import Actions from "components/Posts/PostsModal/PostsControl/Actions";
import Footer from "components/Posts/PostsModal/PostsControl/Footer";
import PostMedia from "components/PostMedia";
import CommentsList from "components/Comments/CommentsList";
import TopPagination from "components/TopPagination";
import Loader from "components/Paginator/Loader";
import Http from "Http";
import {getComments} from "store/selectors/comments";

import Caption from "./Caption/Caption";

import styles from './feedPost.module.css';


const useComments = (id, commentsCount) => {

  const [comments, setComments] = useState([]);

  const fetchComments = (page = 1) => {
    if (commentsCount > 0)
      return Http.get(`/api/v1/comments?post_id=${id}&page=${page}`)
        .then(({data}) => {
          setComments([...data.data, ...comments]);
          return data;
        });
  };

  const onComment = (comment) => {
    setComments([...comments, comment]);
  };

  return {
    comments,
    fetchComments,
    onComment
  }
};

const FeedPost = ({post}) => {
  const {owner, avatar, src, marks, id, caption, comments_count} = post;
  const [firstIntersect, setFirstIntersect] = useState(false);
  let containerRef = useRef(null);
  let commentsScrollParentRef = useRef(null);
  const {comments, fetchComments, onComment} = useComments(id, comments_count);

  useEffect(() => {
    const callback = (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !firstIntersect)
          setFirstIntersect(true);
      });
    };
    const observer = new IntersectionObserver(callback);
    observer.observe(containerRef.current);
  }, []);

  const getScrollParentRef = useCallback((ref) => {
    commentsScrollParentRef.current = ref.current;
  }, []);

  return (
    <section className={styles.post} ref={containerRef}>
      <Header username={owner} avatar={avatar}/>
      <div className={styles.mediaContainer}>
        <PostMedia
          media={src}
          postId={id}
          marks={marks}
          playByClick={false}
          autoPlay
        />
      </div>
      <Caption caption={caption} username={owner}/>
      <Actions post={post} className={styles.actions}/>
      {
        firstIntersect &&
        <TopPagination
          fetcher={fetchComments}
          loader={<Loader/>}
          getScrollParent={getScrollParentRef}
          className={styles.comments}
          withScrollHandler
          toBottom
        >
          {
            comments && <CommentsList comments={comments}/>
          }
        </TopPagination>
      }
      <Footer
        post={post}
        onComment={onComment}
        scrollParent={commentsScrollParentRef.current}
      />
    </section>
  );
};

FeedPost.propTypes = {
  post: PropTypes.object.isRequired,
  comments: PropTypes.array
};

const mapStateToProps = (state, props) => ({
  comments: getComments(state.comments.comments.data, props.post),
});

export default connect(mapStateToProps)(FeedPost);
