import React, {useState} from "react";
import Settings from "./Settings";

const SettingsMenu = ({trigger}) => {

    let [settingsVisible, setIsSettingsVisible] = useState(false);

    const showDrawer = () => setIsSettingsVisible(true);

    const onClose = () => setIsSettingsVisible(false);

    return (
        <>
            {
                React.cloneElement(trigger, {onClick: showDrawer})
            }
            <Settings visible={settingsVisible} onClose={onClose}/>
        </>
    );
};

export default React.memo(SettingsMenu);