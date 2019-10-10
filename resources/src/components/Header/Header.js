import React from "react";
import PropTypes from 'prop-types';
import {Link} from "react-router-dom";
import {connect} from "react-redux";

import {isMobile} from "utils/isMobile";
import shuttle from 'images/logo.png';
import plane from 'images/plane.svg';

import Search from "./Search";
import DefaultAvatar from "../DefaultAvatar";

import styles from './header.module.css';

const Header = ({username, avatar, countOfUnreadMessages}) => (
  <div className={styles.header}>
    <Link to='/' className={styles.logo}>
      <img src={shuttle} alt={'Shuttle logo'}/>
    </Link>
    <Search/>
    <div className={styles.rightContainer}>
      <Link to={'/u/messages'} className={styles.messagesLink} countofunreadmessages={countOfUnreadMessages}>
        <img src={plane} alt={'messages'} className={styles.messagesIcon}/>
      </Link>
      {
        !isMobile() &&
        <Link to={'/' + username} className={styles.username}>
          {
            avatar
              ? <img src={avatar} alt='avatar' className={styles.avatar}/>
              : <div className={styles.avatar}><DefaultAvatar fontSize={'16px'}/></div>
          }
        </Link>
      }
    </div>
  </div>
);

Header.propTypes = {
  username: PropTypes.string.isRequired,
  avatar: PropTypes.any,
  countOfUnreadMessages: PropTypes.number,
};

const mapStateToProps = state => ({
  username: state.auth.user.username,
  avatar: state.auth.user.avatar,
  countOfUnreadMessages: state.auth.user.unreadDialogs && state.auth.user.unreadDialogs.length,
});

export default connect(mapStateToProps)(Header);
