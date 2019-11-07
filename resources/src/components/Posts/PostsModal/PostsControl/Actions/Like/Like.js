import React, {useState} from "react";
import PropTypes from 'prop-types';
import {Icon} from "antd";
import {LikesService} from "services";

import styles from './like.module.css';


const Like = ({id, isLiked, onLike, type, className}) => {

  const [isBeat, setIsBeat] = useState(false);

  const like = event => {
    event.stopPropagation();

    const data = {
      entity_id: id,
      type
    };
    if (isLiked) {
      onLike({id, liked: false});
      setIsBeat(false);
      LikesService.unlike(data).catch(() => onLike({id, liked: true}));
    } else {
      onLike({id, liked: true});
      setIsBeat(true);
      LikesService.like(data).catch(() => onLike({id, liked: false}));
    }
  };

  return (
    <div className={className} title={'Like'}>
      <button className={[isLiked ? styles.redHeart : styles.heart, isBeat ? styles.beatHeart : ''].join(' ')} onClick={like}>
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
