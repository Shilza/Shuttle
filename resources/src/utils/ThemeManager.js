const setCurrentTheme = (themeName) => localStorage.setItem('app-theme', themeName);

export const getCurrentTheme = () => localStorage.getItem('app-theme');

export const toDarkTheme = () => {
  setCurrentTheme('dark');

  let rootStyle = document.documentElement.style;
  rootStyle.setProperty('--primary', '#262626');
  rootStyle.setProperty('--accent', '#2d2d2d');
  rootStyle.setProperty('--accent-second', '#3f3f3f');
  rootStyle.setProperty('--main-background', '#191919');
  rootStyle.setProperty('--text', '#a3a3a3');
  rootStyle.setProperty('--text-secondary', '#999');
  rootStyle.setProperty('--icon', '#999');
  rootStyle.setProperty('--scrollbar', '#666');
};

export const toLightTheme = () => {
  setCurrentTheme('light');

  let rootStyle = document.documentElement.style;
  rootStyle.setProperty('--primary', '#fff');
  rootStyle.setProperty('--accent', '#efefef');
  rootStyle.setProperty('--accent-second', '#e6e6e6');
  rootStyle.setProperty('--main-background', '#fafafa');
  rootStyle.setProperty('--text', '#666');
  rootStyle.setProperty('--text-secondary', '#999');
  rootStyle.setProperty('--icon', '#000');
  rootStyle.setProperty('--scrollbar', '#bfbfbf');
};

export const initialize = () => {
  getCurrentTheme() === 'dark'
    ? toDarkTheme()
    : toLightTheme()
};
