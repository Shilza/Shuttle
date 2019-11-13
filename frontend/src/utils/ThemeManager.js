const CHANGE_TIMEOUT = 500;

const setCurrentTheme = (themeName) => localStorage.setItem('app-theme', themeName);

export const getCurrentTheme = () => localStorage.getItem('app-theme');

const toDark = () => {
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
  rootStyle.setProperty('--heading', '#efefef');
  rootStyle.setProperty('--badge-unread-message', '#00c4ff');
  rootStyle.setProperty('--post-message-second', '#404040');
  rootStyle.setProperty('--dialog-heading', '#212121');

  rootStyle.setProperty('--btn-border', '#cccccc');
  rootStyle.setProperty('--btn-border-hover', '#40a9ff');
  rootStyle.setProperty('--btn-border-active', '#096dd9');

  rootStyle.setProperty('--login-noise-background', 'url(http://api.thumbr.it/whitenoise-361x370.png?background=141414&noise=626262&density=5&opacity=36');
};

const toLight = () => {
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
  rootStyle.setProperty('--heading', '#666');
  rootStyle.setProperty('--badge-unread-message', '#2f57f9');
  rootStyle.setProperty('--post-message-second', '#d4d4d4');
  rootStyle.setProperty('--dialog-heading', '#fdfdfd');

  rootStyle.setProperty('--btn-border', '#cccccc');
  rootStyle.setProperty('--btn-border-hover', '#40a9ff');
  rootStyle.setProperty('--btn-border-active', '#096dd9');

  rootStyle.setProperty('--login-noise-background', 'url(http://api.thumbr.it/whitenoise-361x370.png?background=efefef&noise=626262&density=5&opacity=36');
};

export const toDarkTheme = (async = true) => {
  return async
    ? new Promise(resolve => {
      setTimeout(() => {
        toDark();
        resolve();
      }, CHANGE_TIMEOUT);
    }) : toDark();
};

export const toLightTheme = (async = true) => {
  return async
    ? new Promise(resolve => {
      setTimeout(() => {
        toLight();
        resolve();
      }, CHANGE_TIMEOUT);
    }) : toLight();
};

export const initialize = () => {
  getCurrentTheme() === 'dark'
    ? toDarkTheme(false)
    : toLightTheme(false)
};
