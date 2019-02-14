import {Drawer, Icon} from 'antd';
import React from "react";
import SettingsBody from "./SettingsBody";

const Settings = ({visible, onClose}) => (
    <Drawer
        title={<SettingsTitle/>}
        placement={'right'}
        closable={false}
        onClose={onClose}
        visible={visible}
    >
        <SettingsBody/>
    </Drawer>
);

const SettingsTitle = () => (
    <div>
        <Icon type='setting'/>
        <span style={{marginLeft: 10}}>Settings</span>
    </div>
);

export default Settings;
