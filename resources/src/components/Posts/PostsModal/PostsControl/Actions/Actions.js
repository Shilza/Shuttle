import React, {useEffect} from "react";
import PropTypes from 'prop-types';
import {Icon} from "antd";

import {addSmoothScrolling} from "utils/scrolling";
import {convertTime} from "utils/timeConverter";

import Save from "./Save";
import Share from "./Share";
import Like from "./Like";

import styles from './actions.module.css';

const Actions = ({post, className}) => {

  useEffect(() => {
    addSmoothScrolling('postCommentLink' + post.id);
  }, []);

  const {likes_count, created_at, isLiked, id} = post;

  return (
    <div className={`${styles.actionsContainer} ${className}`}>
      <div className={styles.actions}>
        <Like type='post' id={id} isLiked={isLiked} likesCount={likes_count}/>
        <a className={styles.action} id={'postCommentLink' + id} href={'#commentInputContainer' + id}>
          <Icon type="message"/>
        </a>
        <Share className={styles.action} src={post.src}/>
        <Save post={post}/>
      </div>
      <time dateTime={created_at}>{`${convertTime(created_at)} ago`}</time>
    </div>
  );
};

Actions.propTypes = {
  post: PropTypes.shape({
    likes_count: PropTypes.number,
    created_at: PropTypes.string.isRequired,
    isLiked: PropTypes.bool.isRequired,
    id: PropTypes.number.isRequired,
    className: PropTypes.string
  }).isRequired
};

export default React.memo(Actions);
