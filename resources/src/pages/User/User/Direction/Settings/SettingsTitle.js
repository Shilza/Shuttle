import React from "react";
import {Icon} from 'antd';
import style from './settings.module.css';

const SettingsTitle = () => (
    <div>
        <Icon type='setting'/>
        <span className={style.settingsTitle}>Settings</span>
    </div>
);

export default SettingsTitle;