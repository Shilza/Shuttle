import React from "react";
import styles from './settings.module.css';
import Logout from "./Logout";
import { Switch } from 'antd';
import {connect} from "react-redux";
import {message} from "antd/lib/index";
import {setPrivate, setPublic} from "../../../../services/user";
import {Link} from "react-router-dom";

const SettingsBody = ({isPrivate, dispatch}) => {

    const changePrivacy = checked => {
        dispatch(checked ? setPrivate() : setPublic())
            .then(data => message.success(data))
            .catch(data => message.success(data));
    };

    return (
        <ul className={styles.settingsContainer}>
            <li>
                <Link to={'/posts/archive'}>Archive</Link>
            </li>
            <li>
                <Link to={'/posts/liked'}>Liked</Link>
            </li>
            <li>
                <Link to={'/account/blacklist'}>Blacklist</Link>
            </li>
            <li style={{display: 'inline-flex', alignItems: 'center'}}>
                <span>Private account</span>
                <Switch defaultChecked={!!isPrivate} size='small' onChange={changePrivacy}/>
            </li>
            <Logout/>
        </ul>
    )
};

const mapStateToProps = state => ({
    isPrivate: state.auth.user.private
});

export default connect(mapStateToProps)(SettingsBody);