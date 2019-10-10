import {saveTokensToLocalStorage} from "utils/saveTokensToLocalStorage";
import Http from '../Http';
import {api} from './api';

export const login = (data) =>
  Http.post(`${api.auth}/login`, data);

export const logout = () =>
  Http.post(`${api.auth}/logout`, {
    refreshToken: localStorage.getItem('refreshToken')
  });

export const me = () => Http.post(`${api.auth}/me`);

export const resetPassword = (credentials) => Http.post(`${api.auth}/password/reset`, credentials);

export const updatePassword = (credentials) => Http.post(`${api.auth}/password/update`, credentials);

export const register = (data) =>
  Http.post(`${api.auth}/register`, data);

export const refresh = () =>
  Http.post(`${api.auth}/refresh`, {
    refreshToken: localStorage.getItem('refreshToken')
  })
    .then(({data}) => {
      const {
        token,
        expiresIn,
        refreshToken,
      } = data;

      saveTokensToLocalStorage(expiresIn, token, refreshToken);
      Http.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      return data;
    });
