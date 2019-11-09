import React from "react";
import PropTypes from 'prop-types';
import {Link} from "react-router-dom";
import {connect} from "react-redux";
import {Badge, Icon} from "antd";

import SettingsMenu from "pages/User/User/Direction/Settings/SettingsMenu";
import PostsUploader from "../Posts/Uploader";

import styles from './toolbar.module.css';

const currentLocationColor = '#1890ff';

const getTextColor = () => getComputedStyle(document.documentElement).getPropertyValue('--text');

const Toolbar = ({notificationsCount, dispatch}) => {
  let feedStyle = {color: getTextColor()};
  let notificationsStyle = {color: getTextColor()};

  const openSearch = () => {
    dispatch.search.setIsSearchFocused(true);
  };

  const scrollToTop = () => {
    if (window.location.href === window.location.origin + '/')
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
  };

  if (window.location.href === window.location.origin + '/')
    feedStyle.color = currentLocationColor;
  else if (window.location.href.includes('notifications'))
    notificationsStyle.color = currentLocationColor;

  return (
    <nav className={styles.toolbar}>
      <Link to={'/'} style={feedStyle} onClick={scrollToTop}>
        <Icon type={'fire'} title='News'/>
      </Link>
      <Icon type={'search'} title='Search' className={styles.icon} onClick={openSearch}/>
      <PostsUploader trigger={<Icon type={'plus'} title='Create post' className={styles.icon}/>}/>
      <Link to={'/account/notifications'} style={notificationsStyle}>
        <Badge dot={notificationsCount !== 0}>
          <Icon type="bell" title='Notifications'/>
        </Badge>
      </Link>
      <SettingsMenu trigger={<Icon type={'align-right'} title='Menu' className={styles.icon}/>}/>
    </nav>
  );
};

Toolbar.propTypes = {
  notificationsCount: PropTypes.number.isRequired
};

const mapStateToProps = state => ({
  notificationsCount: state.auth.user.notificationsCount
});

export default connect(mapStateToProps)(Toolbar);
