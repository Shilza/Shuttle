import React, {useState} from "react";
import {Switch} from "antd";
import {ThemeManager} from "utils";
import ChangeThemeModal from "./ChangeThemeModal/ChangeThemeModal";


const Theme = React.memo(() => {
  const [isDark, setIsDark] = useState(ThemeManager.getCurrentTheme() === 'dark');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const changeTheme = (checked) => {
    setIsDark(checked);
    changeVariables(checked)
  };

  const changeVariables = (isLight) => {
    setIsModalOpen(true);
    (isLight
        ? ThemeManager.toDarkTheme()
        : ThemeManager.toLightTheme()
    ).finally(() => setIsModalOpen(false));
  };

  return (
    <>
      <span>Dark</span>
      <Switch defaultChecked={!!isDark} size='small' onChange={changeTheme}/>
      <ChangeThemeModal visible={isModalOpen} mode={ThemeManager.getCurrentTheme()}/>
    </>
  );
});

export default Theme;
