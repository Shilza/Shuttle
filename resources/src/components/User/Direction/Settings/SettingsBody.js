import React from "react";
import styles from './settings.module.css';
import Logout from "./Logout";

const SettingsBody = () => {
    return (
        <div className={styles.settingsContainer}>
            <p>Some contents...</p>
            <p>Some contents...</p>
            <p>Some contents...</p>
           <Logout/>
        </div>
    )
};

export default SettingsBody;