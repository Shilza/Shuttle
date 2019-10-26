import React, {useState} from "react";
import {Switch} from "antd";
import * as ThemeManager from "utils/ThemeManager";


const Theme = React.memo(() => {
  const [isDark, setIsDark] = useState(ThemeManager.getCurrentTheme() === 'dark');

  const changeTheme = (checked) => {
    setIsDark(checked);
    changeVariables(checked)
  };

  const changeVariables = (isLight) => {
    isLight
      ? ThemeManager.toDarkTheme()
      : ThemeManager.toLightTheme()
  };

  return (
    <>
      <span>Dark</span>
      <Switch defaultChecked={!!isDark} size='small' onChange={changeTheme}/>
    </>
  );
});

export default Theme;
