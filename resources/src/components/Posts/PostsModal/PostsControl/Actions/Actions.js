import React, {useCallback} from "react";
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Icon} from "antd";
import moment from "moment";

import Save from "./Save";
import Share from "./Share";
import Like from "./Like";

import styles from './actions.module.css';


const Actions = ({post, dispatch, className}) => {

  const {likes_count, created_at, isLiked, id} = post;

  const onLike = useCallback(({id, liked}) => {
    liked ? dispatch.posts.like(id) : dispatch.posts.unLike(id);
  }, []);

  return (
    <div className={`${styles.actionsContainer} ${className}`}>
      <div className={styles.actions}>
        <Like type='post' id={id} isLiked={isLiked} likesCount={likes_count} onLike={onLike}/>
        <div className={styles.action}>
          <Icon type="message"/>
        </div>
        <Share className={styles.action} src={post.src}/>
        <Save post={post}/>
      </div>
      <time dateTime={created_at}>{moment(new Date(created_at), "YYYYMMDD").fromNow()}</time>
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
  }).isRequired,
};

export default connect()(Actions);
