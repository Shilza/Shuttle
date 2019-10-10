import React, {useCallback, useState} from "react";
import PropTypes from 'prop-types';
import {Icon} from "antd";

import Media from "./Media";
import PostsModal from "../PostsModal";

import camera from './icons/camera.svg';
import styles from './post.module.css';


const Post = ({post}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = useCallback(() => {
    setIsModalOpen(false);
  }, []);

  return (
    <>
      <div className={styles.post} onClick={openModal}>
        <Media src={post.src}/>
        <div className={styles.metaInfo}>
          <div>
            {post.likes_count}
            <Icon className={styles.icon} type='heart'/>
          </div>
          <div>
            {post.comments_count}
            <Icon className={styles.icon} type='message'/>
          </div>
        </div>
        {post.src.match('.mp4') && <picture className={styles.videoCamera}><img src={camera} alt={'Video'}/></picture>}
      </div>
      <PostsModal visible={isModalOpen} post={post} onClose={closeModal}/>
    </>
  );
};

Post.propTypes = {
  post: PropTypes.shape({
    src: PropTypes.string.isRequired,
    likes_count: PropTypes.number.isRequired,
    comments_count: PropTypes.number.isRequired
  }),
};

export default React.memo(Post);
