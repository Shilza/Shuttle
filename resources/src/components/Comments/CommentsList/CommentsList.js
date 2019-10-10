import React from "react";
import PropTypes from 'prop-types';
import Comment from "../Comment";

const CommentsList = ({comments, onRemove, setCommentLiked}) => (
  <>
    {
      comments.map(comment =>
        <Comment
          key={comment.id}
          comment={comment}
          onRemove={onRemove}
          setCommentLiked={setCommentLiked}
        />)
    }
  </>
);

CommentsList.propTypes = {
  comments: PropTypes.array.isRequired,
  onRemove: PropTypes.func.isRequired,
  setCommentLiked: PropTypes.func.isRequired,
};

export default React.memo(CommentsList);
