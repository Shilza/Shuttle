import React from "react";
import PropTypes from 'prop-types';
import {Link} from "react-router-dom";
import {connect} from "react-redux";
import {Badge, Icon} from "antd";

import SettingsMenu from "pages/User/User/Direction/Settings/SettingsMenu";
import PostsUploader from "../Posts/Uploader";

import styles from './toolbar.module.css';

const Toolbar = ({notificationsCount, dispatch}) => {
  let feedStyle = {color: 'rgba(0, 0, 0, .7)'};
  let notificationsStyle = {color: 'rgba(0, 0, 0, .7)'};

  const openSearch = () => {
    dispatch.search.setIsSearchFocused(true);
  };

  if (window.location.href === window.location.origin + '/')
    feedStyle.color = '#096dd9';
  else if (window.location.href.includes('notifications'))
    notificationsStyle.color = '#096dd9';

  return (
    <div className={styles.toolbar}>
      <Link to={"/"}
            style={feedStyle}>
        <Icon type={'fire'}/>
      </Link>
      <Icon type={'search'} className={styles.icon} onClick={openSearch}/>
      <PostsUploader trigger={<Icon type={'plus'} className={styles.icon}/>}/>
      <Link to={'/account/notifications'} style={notificationsStyle}>
        <Badge dot={notificationsCount !== 0}>
          <Icon type="bell"/>
        </Badge>
      </Link>
      <SettingsMenu trigger={<Icon type={'align-right'} className={styles.icon}/>}/>
    </div>
  );
};

Toolbar.propTypes = {
  notificationsCount: PropTypes.number.isRequired
};

const mapStateToProps = state => ({
  notificationsCount: state.auth.user.notificationsCount
});

export default connect(mapStateToProps)(Toolbar);
