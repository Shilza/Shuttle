import React from "react";
import PropTypes from 'prop-types';
import {Icon} from "antd";

import Edit from "../Edit/Edit";
import UserActions from "../UserActions/UserActions";
import SettingsMenu from "../Settings/SettingsMenu";

import styles from '../Settings/settings.module.css';

const DirectionActions = ({me}) => (
  <>
    {
      me
        ? <PrivateButtons/>
        : <UserActions/>
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

DirectionActions.propTypes = {
  me: PropTypes.bool.isRequired
};

export default DirectionActions;
