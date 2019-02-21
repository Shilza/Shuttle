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

const styleSettingsTitle = {marginLeft: 10};

const SettingsTitle = () => (
    <div>
        <Icon type='setting'/>
        <span style={styleSettingsTitle}>Settings</span>
    </div>
);

export default Settings;
