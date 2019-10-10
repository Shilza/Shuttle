import {useCallback, useState} from "react";
import * as CommentsService from 'services/comments';

const useComments = (id, commentsCount) => {

  const [comments, setComments] = useState([]);

  const fetchComments = (page = 1) => {
    if (commentsCount > 0)
      return CommentsService.get(id, page)
        .then(({data}) => {
          setComments([...(data.data).reverse(), ...comments]);
          return data;
        });
  };

  const onComment = useCallback((comment) => {
    setComments([...comments, comment]);
  }, [comments]);

  const onCommentRemove = useCallback((id) => {
    setComments(comments.filter(comment => comment.id !== id));
  }, [comments]);

  const setCommentLiked = useCallback(({id, liked}) => {
    setComments(comments.map(comment => {
      if(comment.id === id) {
        comment.isLiked = liked;
        return {...comment};
      }
      return comment;
    }));
  }, [comments]);

  return {
    comments,
    fetchComments,
    onComment,
    onCommentRemove,
    setCommentLiked
  }
};

export default useComments;
