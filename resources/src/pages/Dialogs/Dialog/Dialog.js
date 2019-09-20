import React from "react"
import {Link} from "react-router-dom"
import moment from 'moment'
import PropTypes from "prop-types"

import DefaultAvatar from "../../../components/DefaultAvatar/DefaultAvatar"

import styles from './message.module.css';


const Dialog = ({ownerId, username, avatar, text, read, myId, createdAt}) => (
  <div className={!read && ownerId !== myId ? styles.unreadContainer : styles.container} >
    <Link to={`/${username}`} className={styles.avatar}>
      {
        avatar ? <img src={avatar} alt={'avatar'}/> : <DefaultAvatar fontSize={'30px'}/>
      }
    </Link>
    <Link to={`/u/messages/${username}`} className={styles.infoContainer}>
      <div className={styles.infoHeader}>
        <span className={styles.username}>{username}</span>
        <time dateTime={createdAt}>{moment(new Date(createdAt), "YYYYMMDD").fromNow()}</time>
      </div>
      <div className={!read && ownerId === myId ? styles.myMessageIsUnread: ''}>{text}</div>
    </Link>
  </div>
);

Dialog.propTypes = {
  ownerId: PropTypes.number.isRequired,
  username: PropTypes.string.isRequired,
  avatar: PropTypes.string,
  text: PropTypes.string.isRequired,
  read: PropTypes.number,
  myId: PropTypes.number.isRequired,
  createdAt: PropTypes.string.isRequired
};

export default Dialog;
