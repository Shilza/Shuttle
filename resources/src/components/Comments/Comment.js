import React, {useCallback, useState} from "react";
import PropTypes from 'prop-types';
import {Link} from "react-router-dom";
import moment from "moment";

import CLinkify from "components/CLinkify";
import Like from "components/Posts/PostsModal/PostsControl/Actions/Like";
import DefaultAvatar from "components/DefaultAvatar";
import LikesListModal from "components/Posts/PostsModal/PostsControl/Actions/Like/LikesListModal";
import {shortifyNumber} from "utils";
import CommentsModal from "./Modal/CommentsModal";

import styles from './comment.module.css';

const Comment = ({comment, setCommentLiked, onRemove}) => {

  const {isLiked, likes_count, owner, text, created_at, id, avatar} = comment;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isListOpen, setIsListOpen] = useState(false);

  const openList = (event) => {
    event.stopPropagation();
    setIsListOpen(true);
  };

  const closeList = useCallback((event) => {
    event && event.stopPropagation();
    setIsListOpen(false);
  }, []);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = useCallback(() => {
    setIsModalOpen(false);
  }, []);

  return (
    <>
      <div className={styles.comment} onClick={openModal}>
        <div className={styles.infoAvatarContainer}>
          {
            avatar
            ? <img src={avatar} alt={`${owner} avatar`} className={styles.avatar}/>
            : <DefaultAvatar fontSize={'16px'} className={styles.avatar}/>
          }
          <div className={styles.container}>
            <div>
              <Link to={'/' + owner} onClick={e => e.stopPropagation()} className={styles.username}>{owner}</Link>
              <CLinkify className={styles.text}>{text}</CLinkify>
            </div>
            <div className={styles.metaContainer}>
              <time dateTime={created_at}>{moment(new Date(created_at), "YYYYMMDD").fromNow()}</time>
              {
               !!likes_count &&
               <span className={styles.likesCount} onClick={openList}>Likes count: {shortifyNumber(likes_count)}</span>
              }
            </div>
          </div>
          <Like
            type='comment'
            id={id}
            isLiked={isLiked}
            onLike={setCommentLiked}
            className={styles.like}
          />
        </div>
      </div>
      <CommentsModal
        isModalOpen={isModalOpen}
        ownerId={comment.owner_id}
        id={comment.id}
        closeModal={closeModal}
        onRemove={onRemove}
      />
      <LikesListModal isVisible={isListOpen} onClose={closeList} type={'comment'} id={id} />
    </>
  )
};

Comment.propTypes = {
  comment: PropTypes.shape({
    id: PropTypes.number.isRequired,
    isLiked: PropTypes.bool.isRequired,
    likes_count: PropTypes.number,
    owner: PropTypes.string.isRequired,
    avatar: PropTypes.string,
    text: PropTypes.string.isRequired,
    created_at: PropTypes.string.isRequired
  }).isRequired,
  onRemove: PropTypes.func.isRequired
};

export default Comment;
