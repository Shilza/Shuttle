import {useCallback, useState} from "react";
import {CommentsService} from 'services';
import {transformMetadata} from "utils";

const useComments = (postId) => {

  const [comments, setComments] = useState([]);

  const fetchComments = (page = 1) =>
    CommentsService.get(postId, page)
      .then(({data}) => {
        if (Array.isArray(data.data))
          setComments([...transformMetadata(data.data).reverse(), ...comments]);
        return data;
      });

  const onComment = useCallback((comment) => {
    comment && setComments([...comments, transformMetadata([comment])[0]]);
  }, [comments]);

  const onCommentRemove = useCallback((id) => {
    setComments(comments.filter(comment => comment.id !== id));
  }, [comments]);

  const setCommentLiked = useCallback(({id, liked}) => {
    setComments(comments.map(comment => {
      if (comment.id === id) {
        comment.isLiked = liked;
        liked ? ++comment.likes_count : --comment.likes_count;
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
