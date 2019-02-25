import {Drawer, Icon} from 'antd';
import React from "react";
import SettingsBody from "./SettingsBody";
import style from './settings.module.css';

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
        <span className={style.settingsTitle}>Settings</span>
    </div>
);

export default Settings;
