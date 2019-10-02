import React from "react"
import PropTypes from "prop-types"
import Linkify from 'linkifyjs/react'
import moment from "moment";

import Post from "./Post";
import Avatar from "./Avatar";
import Images from "./Images";
import SingleImage from "./Images/SingleImage";

import styles from "./message.module.css";


const Message = ({username, avatar, post, images, text, my, read, time, withAvatar = false}) => (
  <div className={my ? styles.myWrapper : styles.wrapper}>
    {withAvatar && <Avatar my={my} post={post} src={avatar} images={images} username={username}/>}
    {
      post
        ? <Post post={post} my={my} postCode={text.split('/')[4]}/>
        : <div className={styles.container}>
          {
            text.length > 0 || (images && images.length > 1) ?
              <div className={my ? styles.myText : styles.text}>
                {my && !read && <div className={styles.unreadBadge}/>}
                <Linkify>{text}</Linkify>
                <Images images={images}/>
              </div>
              :
              <SingleImage my={my} images={images}/>
          }
        </div>
    }
    <time className={my ? styles.myTime : styles.time}>{moment(time).format('HH:mm')}</time>
  </div>
);

Message.propTypes = {
  username: PropTypes.string.isRequired,
  avatar: PropTypes.string,
  text: PropTypes.string.isRequired,
  my: PropTypes.bool.isRequired,
  read: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.number
  ]),
  withAvatar: PropTypes.bool
};

export default Message;
