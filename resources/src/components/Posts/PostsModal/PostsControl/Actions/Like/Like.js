import React, {useCallback, useState} from "react";
import PropTypes from 'prop-types';
import {Icon} from "antd";

import ListModal from 'components/Modal/ListModal';
import * as LikeService from "services/likes";
import ModalBody from "./ModalBody";

import styles from './like.module.css';


const Like = ({id, likesCount, isLiked, onLike, type}) => {

  const [isListOpen, setIsListOpen] = useState(false);

  const openList = (event) => {
    event.stopPropagation();
    setIsListOpen(true);
  };

  const closeList = useCallback((event) => {
    event && event.stopPropagation();
    setIsListOpen(false);
  }, []);

  const like = event => {
    event.stopPropagation();

    const data = {
      entity_id: id,
      type
    };
    if (isLiked) {
      onLike({id, liked: false});
      LikeService.unlike(data).catch(() => onLike({id, liked: true}));
    } else {
      onLike({id, liked: true});
      LikeService.like(data).catch(() => onLike({id, liked: false}));
    }
  };

  return (
    <div>
      {!!likesCount &&
      <span onClick={openList} className={styles.likesCount}>{likesCount}</span>
      }
      <button className={styles.action} onClick={like}>
        {
          isLiked
            ? <Icon type="heart" className={styles.redHeart}/>
            : <Icon type="heart" className={styles.heart}/>
        }
      </button>
      <ListModal visible={isListOpen} onClose={closeList} title={'Likes'}>
        <ModalBody id={id} type={type}/>
      </ListModal>
    </div>
  );
};

Like.propTypes = {
  id: PropTypes.number.isRequired,
  likesCount: PropTypes.number,
  isLiked: PropTypes.bool.isRequired,
  type: PropTypes.string.isRequired,
  onLike: PropTypes.func.isRequired
};

export default Like;
