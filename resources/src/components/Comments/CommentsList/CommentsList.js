import React from "react";
import PropTypes from 'prop-types';
import Comment from "../Comment";

const CommentsList = ({comments}) => (
  <>
    {
      comments.map(comment => <Comment key={comment.id} comment={comment}/>)
    }
  </>
);

CommentsList.propTypes = {
  comments: PropTypes.array.isRequired
};

export default React.memo(CommentsList);
