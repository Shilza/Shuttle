import React, {useState} from "react";
import PropTypes from 'prop-types';
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

SettingsMenu.propTypes = {
  trigger: PropTypes.element.isRequired
};

export default React.memo(SettingsMenu);
