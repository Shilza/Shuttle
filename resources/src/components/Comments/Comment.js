import React, {useCallback, useState} from "react";
import PropTypes from 'prop-types';
import {Link} from "react-router-dom";
import Linkify from 'linkifyjs/react';
import moment from "moment";

import Like from "components/Posts/PostsModal/PostsControl/Actions/Like";
import DefaultAvatar from "components/DefaultAvatar";
import CommentsModal from "./Modal/CommentsModal";

import styles from './comment.module.css';


const Comment = ({comment, setCommentLiked, onRemove}) => {

  const {isLiked, likes_count, owner, text, created_at, id, avatar} = comment;
  const [isModalOpen, setIsModalOpen] = useState(false);

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
              <Linkify className={styles.text}>{text}</Linkify>
            </div>
            <div className={styles.metaContainer}>
              <time dateTime={created_at}>{moment(new Date(created_at), "YYYYMMDD").fromNow()}</time>
              <Like
                type='comment'
                id={id}
                isLiked={isLiked}
                likesCount={likes_count}
                onLike={setCommentLiked}
              />
            </div>
          </div>
        </div>
      </div>
      <CommentsModal
        isModalOpen={isModalOpen}
        ownerId={comment.owner_id}
        id={comment.id}
        closeModal={closeModal}
        onRemove={onRemove}
      />
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
