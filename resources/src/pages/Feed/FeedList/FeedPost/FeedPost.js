import React, {useCallback, useEffect, useRef, useState} from "react";
import PropTypes from 'prop-types';

import Header from "components/Posts/PostsModal/PostsControl/Header";
import Actions from "components/Posts/PostsModal/PostsControl/Actions";
import Footer from "components/Posts/PostsModal/PostsControl/Footer";
import PostMedia from "components/PostMedia";
import CommentsList from "components/Comments/CommentsList";
import TopPagination from "components/TopPagination";
import Loader from "components/Paginator/Loader";
import Caption from "components/Posts/Caption";
import useComments from "utils/useComments";

import styles from './feedPost.module.css';


const FeedPost = ({post}) => {
  const {owner, avatar, src, marks, id, caption, location, comments_count} = post;
  const [firstIntersect, setFirstIntersect] = useState(false);
  let containerRef = useRef(null);
  let commentsScrollParentRef = useRef(null);
  const {comments, fetchComments, onComment, onCommentRemove, setCommentLiked} = useComments(id, comments_count);

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
  }, [commentsScrollParentRef]);

  const onCom = useCallback((comment) => {
    onComment(comment);
    commentsScrollParentRef.current.scrollTo(0, commentsScrollParentRef.current.scrollHeight);
  }, [commentsScrollParentRef, onComment]);

  return (
    <section className={styles.post} ref={containerRef}>
      <Header username={owner} avatar={avatar} location={location}/>
      <div className={styles.mediaContainer}>
        <PostMedia
          media={src}
          postId={id}
          marks={marks}
          autoPlay
          muted
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
            comments &&
            <CommentsList
              comments={comments}
              onRemove={onCommentRemove}
              setCommentLiked={setCommentLiked}
            />
          }
        </TopPagination>
      }
      <Footer
        post={post}
        onComment={onCom}
      />
    </section>
  );
};

FeedPost.propTypes = {
  post: PropTypes.object.isRequired,
};

export default FeedPost;
