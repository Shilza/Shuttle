import React from "react";
import PropTypes from 'prop-types';
import styles from './settings.module.css';
import Logout from "./Logout";
import {Switch} from 'antd';
import {connect} from "react-redux";
import {message} from "antd/lib/index";
import {Link} from "react-router-dom";

import {setPrivate, setPublic} from "services/user";
import DefaultAvatar from "components/DefaultAvatar";

const SettingsBody = ({isPrivate, username, avatar, countOfUnreadMessages, close, dispatch}) => {

  const changePrivacy = checked => {
    dispatch(checked ? setPrivate() : setPublic())
      .then(data => message.success(data))
      .catch(data => {
        message.success(data)
      });
  };

  return (
    <ul className={styles.settingsContainer}>
      <li>
        <Link to={'/' + username} onClick={close} className={styles.user}>
          {
            avatar
              ? <img src={avatar} alt='avatar' className={styles.avatar}/>
              : <div className={styles.avatar}><DefaultAvatar fontSize={'16px'}/></div>
          }
          <span>{username}</span>
        </Link>
      </li>
      <li>
        <Link to={'/posts/archive'} className={styles.linkStyle}>Archive</Link>
      </li>
      <li>
        <Link to={'/posts/liked'} className={styles.linkStyle}>Liked</Link>
      </li>
      <li>
        <Link to={'/u/messages'} className={styles.messagesLink} countofunreadmessages={countOfUnreadMessages}>
          Messages
        </Link>
      </li>
      <li>
        <Link to={'/account/blacklist'} className={styles.linkStyle}>Blacklist</Link>
      </li>
      <li>
        <Link to={'/account/notifications'} className={styles.linkStyle}>Notifications</Link>
      </li>
      <li className={styles.privateContainer}>
        <span>Private account</span>
        <Switch defaultChecked={!!isPrivate} size='small' onChange={changePrivacy}/>
      </li>
      <Logout/>
    </ul>
  )
};

SettingsBody.propTypes = {
  close: PropTypes.func.isRequired,
  isPrivate: PropTypes.bool.isRequired,
  username: PropTypes.string,
  avatar: PropTypes.string,
  dispatch: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  isPrivate: state.auth.user.private,
  username: state.auth.user.username,
  avatar: state.auth.user.avatar,
  countOfUnreadMessages: state.auth.user.unreadDialogs && state.auth.user.unreadDialogs.length
});

export default connect(mapStateToProps)(SettingsBody);
