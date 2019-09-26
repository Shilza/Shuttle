import React from "react";
import {Link} from "react-router-dom";

import styles from "./post.module.css";

const Post = ({post, my, postCode}) => {
  const onLickClick = (event) => {if(post.error) event.preventDefault();}

  return (
    <Link to={`/p/${postCode}`} className={my ? styles.myContainer : styles.container} onClick={onLickClick}>
      <div className={styles.header}>
        <img src={post.avatar} className={styles.avatar} alt=''/>
        <span className={styles.username}>{post.owner}</span>
      </div>
      {
        post.error ? <div className={styles.media} error={post.error}/>
          :
          post.src && post.src.match('.mp4')
            ? <video src={post.src} className={styles.media} />
            : <img src={post.src} className={styles.media} alt='Post'/>
      }
      {
        post.caption && <span className={styles.caption}>{post.caption}</span>
      }
    </Link>
  );
}

export default Post;
