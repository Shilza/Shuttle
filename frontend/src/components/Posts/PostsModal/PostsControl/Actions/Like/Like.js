import React, {useState} from "react";
import PropTypes from 'prop-types';
import {Icon} from "antd";
import {LikesService} from "services";

import styles from './like.module.css';


const Like = ({id, isLiked, onLike, type, createLike, className}) => {

  const [isBeat, setIsBeat] = useState(false);

  const like = event => {
    event.stopPropagation();

    const data = {
      entity_id: id,
      type
    };
    if (isLiked) {
      if (onLike)
        onLike({id, liked: false});
      setIsBeat(false);
      if (createLike)
        LikesService.unlike(data).catch(() => onLike({id, liked: true}));
    } else {
      if (onLike)
        onLike({id, liked: true});
      setIsBeat(true);
      if (createLike)
        LikesService.like(data).catch(() => onLike({id, liked: false}));
    }
  };

  return (
    <div className={className} title={'Like'}>
      <button className={[isLiked ? styles.redHeart : styles.heart, isBeat ? styles.beatHeart : ''].join(' ')}
              onClick={like}>
        <Icon type="heart"/>
      </button>
    </div>
  );
};

Like.defaultProps = {
  createLike: true
};

Like.propTypes = {
  id: PropTypes.number.isRequired,
  isLiked: PropTypes.bool.isRequired,
  type: PropTypes.string.isRequired,
  onLike: PropTypes.func,
  className: PropTypes.string,
  createLike: PropTypes.bool
};

export default Like;
