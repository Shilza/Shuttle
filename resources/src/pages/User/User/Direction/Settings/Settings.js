import React from "react";
import PropTypes from 'prop-types';
import {Drawer} from 'antd';
import SettingsBody from "./SettingsBody";

const Settings = ({visible, onClose}) => (
  <Drawer
    placement={'right'}
    closable={false}
    onClose={onClose}
    visible={visible}
  >
    <SettingsBody close={onClose}/>
  </Drawer>
);


Settings.propTypes = {
  visible: PropTypes.bool.isRequired,
  onClose: PropTypes.func
};

export default Settings;
