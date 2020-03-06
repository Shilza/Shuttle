import axios from 'axios';
import moment from 'moment';
import store from 'store';
import {AuthService} from 'services';
import {CONFIG} from "./config";


const axiosInstance = axios.create({
  baseURL: CONFIG.BASE_URL
});

//const CsrfToken = document.head.querySelector('meta[name="csrf-token"]');
axiosInstance.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
//axios.defaults.headers.common['X-CSRF-TOKEN'] = CsrfToken.content;
axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('accessToken')}`;

axiosInstance.interceptors.response.use(
  response => response,
  error => {
    if (error.response.status === 401)
      store.dispatch.auth.logoutAsync();

    return Promise.reject(error);
  }
);

let isRefreshing = false;

axiosInstance.interceptors.request.use(
  async config => {
    //before every request, we check the access token for validity
    //if it is not valid we send a refresh token
    //isRefreshing variable is needed to prevent recursion
    if (localStorage.hasOwnProperty('expiresIn') &&
      +localStorage.getItem('expiresIn') < +moment().format('X') &&
      !isRefreshing
    ) {
      isRefreshing = true;
      await AuthService.refresh().catch(() => {
        //if an error was received, we interrupt the execution of requests
        throw new axiosInstance.Cancel();
      });
      isRefreshing = false;

      //Next request is sent with a new token
      config.headers.Authorization = `Bearer ${localStorage.getItem('accessToken')}`;
    }

    return config;
  }
);

export default axiosInstance;
