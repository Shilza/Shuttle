import {Drawer, Icon} from 'antd';
import React from "react";
import SettingsBody from "./SettingsBody";
import styles from './settings.module.css';

class Settings extends React.Component {
    state = {visible: false};

    showDrawer = () => {
        this.setState({
            visible: true,
        });
    };

    onClose = () => {
        this.setState({
            visible: false,
        });
    };

    render() {
        return (
            <>
                <Icon type="setting" onClick={this.showDrawer} className={styles.settingsButton}/>
                <Drawer
                    title={<SettingsTitle/>}
                    placement={'right'}
                    closable={false}
                    onClose={this.onClose}
                    visible={this.state.visible}
                >
                    <SettingsBody/>
                </Drawer>
            </>
        );
    }
}

const SettingsTitle = () => (
    <div>
        <Icon type='setting'/>
        <span style={{marginLeft: 10}}>Settings</span>
    </div>
);

export default Settings;
