import styles from './toolbar.module.css';
import React from "react";
import {Link} from "react-router-dom";
import {Icon, Badge} from "antd";
import SettingsMenu from "../User/Direction/Settings/SettingsMenu";
import PostsUploader from "../Posts/Uploader/PostsUploader";

const Toolbar = () => (
    <div className={styles.toolbar}>
        <Link to={"/"}>
            <Icon type={'fire'}/>
        </Link>
        <Icon type={'search'}/>
        <PostsUploader trigger={<Icon type={'plus'}/>}/>
        <Link to={'/account/notifications'}>
            <Badge status="error">
                <Icon type="bell" style={{color: 'rgba(0, 0, 0, .5)'}}/>
            </Badge>
        </Link>
        <SettingsMenu trigger={<Icon type={'align-right'}/>}/>
    </div>
);

export default Toolbar;