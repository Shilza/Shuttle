import React, {useRef, useState} from "react";
import PropTypes from 'prop-types';
import {connect} from "react-redux";
import {Button} from "antd";

import {create} from 'services/comments';
import {isMobile} from "utils/isMobile";
import Http from "Http";

import styles from '../postControl.module.css';

const CommentInput = React.memo(({post_id, scrollParent, onComment, dispatch}) => {
  let [loading, setLoading] = useState(false);

  let inputRef = useRef();

  const submit = event => {
    event.preventDefault();

    const text = inputRef.current.value;

    if (text) {
      setLoading(true);
      let promise;
      if (onComment)
        promise = Http.post('/api/v1/comments', {post_id, text})
          .then(({data}) => {
            onComment(data.comment);
          });
      else
        promise = dispatch(create({post_id, text}));

      promise
        .then(() => {
          inputRef.current.value = '';
          if (scrollParent)
            scrollParent.scrollTo(0, scrollParent.scrollHeight);
        })
        .finally(() => setLoading(false));
    }
  };

  return (
    <form onSubmit={submit} className={styles.commentInputContainer} id={'commentInputContainer' + post_id}>
      <input
        ref={inputRef}
        placeholder='Add comment'
        className={styles.commentInput}
      />
      {
        !isMobile() &&
        <Button
          size={'small'}
          htmlType={'submit'}
          className={styles.submitButton}
          loading={loading}
        >
          Submit
        </Button>
      }
    </form>
  );
});

CommentInput.propTypes = {
  post_id: PropTypes.number.isRequired,
  dispatch: PropTypes.func.isRequired,
  onComment: PropTypes.func,
};

export default connect()(CommentInput);
