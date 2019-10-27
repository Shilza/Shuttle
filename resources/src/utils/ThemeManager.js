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
  rootStyle.setProperty('--modal-heading', '#efefef');
  rootStyle.setProperty('--badge-unread-message', '#00c4ff');
  rootStyle.setProperty('--post-message-second', '#404040');
  rootStyle.setProperty('--dialog-heading', '#212121');

  window.less.modifyVars({
    '@btn-default-bg': '#e2e2e2',
  });
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
  rootStyle.setProperty('--modal-heading', '#666');
  rootStyle.setProperty('--badge-unread-message', '#2f57f9');
  rootStyle.setProperty('--post-message-second', '#d4d4d4');
  rootStyle.setProperty('--dialog-heading', '#fdfdfd');

  window.less.modifyVars({
    '@btn-default-bg': '#fff',
  });
};

export const initialize = () => {
  getCurrentTheme() === 'dark'
    ? toDarkTheme()
    : toLightTheme()
};
