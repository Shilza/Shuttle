import React, {useRef, useState} from "react";
import PropTypes from 'prop-types';

import Loader from "components/Paginator/Loader";
import * as CommentsService from 'services/comments';

import styles from '../postControl.module.css';

const CommentInput = React.memo(({post_id, onComment}) => {
  let [loading, setLoading] = useState(false);
  let [isButtonVisible, setIsButtonVisible] = useState(false);

  let inputRef = useRef();

  const submit = event => {
    event.preventDefault();

    const text = inputRef.current.value;

    if (text) {
      setLoading(true);
      CommentsService.create({post_id, text})
        .then(({data}) => {
          inputRef.current.value = '';
          setIsButtonVisible(false);
          onComment(data);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  };

  const onInputChange = (event) => {
    setIsButtonVisible(event.target.value.length > 0);
  };

  return (
    <form onSubmit={submit} className={styles.commentInputContainer} id={'commentInputContainer' + post_id}>
      <input
        ref={inputRef}
        placeholder='Add comment'
        className={styles.commentInput}
        onChange={onInputChange}
      />
      {
        isButtonVisible && !loading &&
        <button
          type={'submit'}
          className={styles.submitButton}
        >
          Send
        </button>
      }
      {loading && <Loader className={styles.loader}/>}
    </form>
  );
});

CommentInput.propTypes = {
  post_id: PropTypes.number.isRequired,
  onComment: PropTypes.func.isRequired,
};

export default CommentInput;
