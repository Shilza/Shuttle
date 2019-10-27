import React from "react";
import PropTypes from 'prop-types';
import {Icon} from "antd";
import * as LikeService from "services/likes";

import styles from './like.module.css';


const Like = ({id, isLiked, onLike, type, className}) => {

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
    <div className={className} title={'Like'}>
      <button className={isLiked ? styles.redHeart : styles.heart} onClick={like}>
        <Icon type="heart"/>
      </button>
    </div>
  );
};

Like.propTypes = {
  id: PropTypes.number.isRequired,
  isLiked: PropTypes.bool.isRequired,
  type: PropTypes.string.isRequired,
  onLike: PropTypes.func.isRequired,
  className: PropTypes.string,
};

export default Like;
