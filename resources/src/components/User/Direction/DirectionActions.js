import React from "react";
import PropTypes from 'prop-types';
import FriendshipActions from "./FriendshipActions";
import {connect} from "react-redux";
import {Edit} from "./Edit/Edit";
import UserActions from "./UserActions/UserActions";
import SettingsMenu from "./Settings/SettingsMenu";
import {Icon} from "antd";
import styles from './Settings/settings.module.css';

const DirectionActions = ({me, amBlacklisted}) => (
    <>
        {
            me
                ? <PrivateButtons/>
                : <Public amBlacklisted={amBlacklisted}/>
        }
    </>
);

const PrivateButtons = () => (
    <>
        <Edit/>
        <SettingsMenu
            trigger={<Icon type="setting" className={styles.settingsButton}/>}
        />
    </>
);

const Public = ({amBlacklisted}) => (
    <>
        {
            !amBlacklisted && <FriendshipActions/>
        }
        <UserActions/>
    </>
);

DirectionActions.propTypes = {
    me: PropTypes.bool.isRequired,
    amBlacklisted: PropTypes.bool.isRequired
};

const mapStateToProps = state => ({
    me: state.auth.user.id === state.users.user.id,
    amBlacklisted: state.users.user.amBlacklisted
});

export default connect(mapStateToProps)(DirectionActions);