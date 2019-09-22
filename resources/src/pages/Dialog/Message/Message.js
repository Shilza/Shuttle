import React from "react"
import {Link} from "react-router-dom"
import PropTypes from "prop-types"

import DefaultAvatar from "../../../components/DefaultAvatar/DefaultAvatar"

import styles from "./message.module.css"


const Message = ({username, avatar, text, my, read, withAvatar = false}) => {
  return (
    <>
      {
        my ?
          <div className={styles.myText}>
            {my && !read && <div className={styles.myTextUnread}/>}
            <span>{text}</span>
          </div>
          :
          <div className={styles.container}>
            {
              withAvatar &&
              <Link to={`/${username}`} className={styles.avatar}>
                {
                  avatar ? <img src={avatar} alt={'avatar'}/> : <DefaultAvatar fontSize={'20px'}/>
                }
              </Link>
            }
            <span className={styles.text}>{text}</span>
          </div>
      }
    </>
  )
};

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
