import React from "react";
import PropTypes from 'prop-types';
import styles from './toolbar.module.css';
import {Link} from "react-router-dom";
import {Badge, Icon} from "antd";
import SettingsMenu from "../User/Direction/Settings/SettingsMenu";
import PostsUploader from "../Posts/Uploader/PostsUploader";
import {connect} from "react-redux";

const Toolbar = ({notificationsCount}) => {
    let feedStyle = {color: 'rgba(0, 0, 0, .7)'};
    let notificationsStyle = {color: 'rgba(0, 0, 0, .7)'};

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
            <Icon type={'search'} className={styles.icon}/>
            <PostsUploader trigger={<Icon type={'plus'} className={styles.icon}/>}/>
            <Link to={'/account/notifications'} style={notificationsStyle}>
                <Badge status="error" dot={!!notificationsCount}>
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