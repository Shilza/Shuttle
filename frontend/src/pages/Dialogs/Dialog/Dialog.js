import React from "react"
import PropTypes from "prop-types"
import {Link} from "react-router-dom"
import moment from 'moment'

import DefaultAvatar from "components/DefaultAvatar"
import Typing from "components/Typing";

import styles from './dialog.module.css';


const Dialog = ({ownerId, username, avatar, text, read, myId, createdAt, isTyping}) => {
  const media = text.match(/https?:\/\/[^"' ]+\.(?:png|jpg|jpeg|gif|mp4).*?(?=( |$))/g, '');

  const image = media && media.length > 0 && 'Image';
  const matches = text.match(/^https?:\/\/([^/?#]+)(?:[/?#]|$)/i);
  const post = matches && matches.length >= 2 && matches[1] === window.location.host && 'Post';

  return (
    <div className={!read && ownerId !== myId ? styles.unreadContainer : styles.container}>
      <Link to={`/${username}`} className={styles.avatar}>
        {
          avatar ? <img src={avatar} alt={'avatar'} /> : <DefaultAvatar fontSize={'30px'} />
        }
      </Link>
      <Link to={`/u/messages/${username}`} className={styles.infoContainer}>
        <div className={styles.infoHeader}>
          <span className={styles.username}>{username}</span>
          <time dateTime={createdAt}>{moment(new Date(createdAt), "YYYYMMDD").fromNow()}</time>
        </div>
        {
          isTyping
            ? <Typing/>
            : <div className={!read && ownerId === myId ? styles.myMessageIsUnread : styles.text}>{post || image || text}</div>
        }
      </Link>
    </div>
  );
};

Dialog.propTypes = {
  ownerId: PropTypes.number.isRequired,
  username: PropTypes.string.isRequired,
  avatar: PropTypes.string,
  text: PropTypes.string.isRequired,
  read: PropTypes.number,
  myId: PropTypes.number.isRequired,
  createdAt: PropTypes.string.isRequired,
  isTyping: PropTypes.bool
};

export default Dialog;
