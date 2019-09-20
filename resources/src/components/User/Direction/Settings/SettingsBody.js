import React from "react";
import PropTypes from 'prop-types';
import styles from './settings.module.css';
import Logout from "./Logout";
import {Switch} from 'antd';
import {connect} from "react-redux";
import {message} from "antd/lib/index";
import {setPrivate, setPublic} from "../../../../services/user";
import {Link} from "react-router-dom";

const SettingsBody = ({isPrivate, countOfUnreadMessages, dispatch}) => {

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
  isPrivate: PropTypes.bool.isRequired,
  dispatch: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  isPrivate: state.auth.user.private,
  countOfUnreadMessages: state.auth.user.unreadDialogs && state.auth.user.unreadDialogs.length
});

export default connect(mapStateToProps)(SettingsBody);
