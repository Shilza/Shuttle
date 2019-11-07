import React, {useCallback, useState} from "react";
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import moment from "moment";

import Save from "./Save";
import Share from "./Share";
import Like from "./Like";
import LikesListModal from "./Like/LikesListModal";
import {shortifyNumber} from "utils";


import styles from './actions.module.css';

const Actions = ({post, dispatch, className}) => {

  const {likes_count, created_at, isLiked, id} = post;

  const [isListOpen, setIsListOpen] = useState(false);

  const openList = (event) => {
    event.stopPropagation();
    setIsListOpen(true);
  };

  const closeList = useCallback((event) => {
    event && event.stopPropagation();
    setIsListOpen(false);
  }, []);

  const onLike = useCallback(({id, liked}) => {
    liked ? dispatch.posts.like(id) : dispatch.posts.unLike(id);
  }, []);

  return (
    <>
      <div className={`${styles.actionsContainer} ${className}`}>
        <div className={styles.actions}>
          <div className={styles.likeContainer}>
            {
              !!likes_count &&
              <span onClick={openList} className={styles.likesCount}>{shortifyNumber(likes_count)}</span>
            }
            <Like type='post' id={id} isLiked={isLiked} onLike={onLike}/>
          </div>
          <Share src={post.src}/>
          <Save post={post}/>
        </div>
        <time dateTime={created_at}>{moment(new Date(created_at), "YYYYMMDD").fromNow()}</time>
      </div>
      <LikesListModal isVisible={isListOpen} onClose={closeList} type={'post'} id={id}/>
    </>
  );
};

Actions.propTypes = {
  post: PropTypes.shape({
    likes_count: PropTypes.number,
    created_at: PropTypes.string.isRequired,
    isLiked: PropTypes.bool.isRequired,
    id: PropTypes.number.isRequired,
    className: PropTypes.string
  }).isRequired,
};

export default connect()(Actions);
