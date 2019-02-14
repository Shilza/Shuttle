import FriendshipActions from "./FriendshipActions";
import {connect} from "react-redux";
import React from "react";
import Edit from "./Edit/Edit";
import UserActions from "./UserActions/UserActions";
import SettingsMenu from "./Settings/SettingsMenu";
import {Icon} from "antd";
import styles from './Settings/settings.module.css';

const DirectionActions = ({me}) => {
    return (
        <>
            {
                me ? <PrivateButtons/>
                    :
                    <>
                        <FriendshipActions/>
                        <UserActions/>
                    </>
            }
        </>
    )
};

const PrivateButtons = () => (
    <>
        <Edit/>
        <SettingsMenu
            trigger={<Icon type="setting" className={styles.settingsButton}/>}
        />
    </>
);

export default connect(state => ({
    me: state.auth.user.id === state.users.user.id
}))(DirectionActions);