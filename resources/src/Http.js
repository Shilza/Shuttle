import axios from 'axios';
import store from './store';
import * as actions from './store/actions/auth';
import * as AuthService from './services/auth';
import moment from 'moment';


const token = document.head.querySelector('meta[name="csrf-token"]');
axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
axios.defaults.headers.common['X-CSRF-TOKEN'] = token.content;
axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('accessToken')}`;

axios.interceptors.response.use(
    response => response,
    error => {
        if (error.response.status === 401)
            store.dispatch(actions.authLogout());

        return Promise.reject(error);
    }
);

let isRefreshing = false;

axios.interceptors.request.use(
    async config => {
        //before every request, we check the access token for validity
        //if it is not valid we send a refresh token
        //isRefreshing variable is needed to prevent recursion
        if (localStorage.hasOwnProperty('expiresIn') &&
            localStorage.getItem('expiresIn') < moment().format('X') &&
            !isRefreshing
        ) {
            isRefreshing = true;
            await AuthService.refresh().catch(() => {
                //if an error was received, we interrupt the execution of requests
                throw new axios.Cancel();
            });
            isRefreshing = false;

            //Next request is sent with a new token
            config.headers.Authorization = `Bearer ${localStorage.getItem('accessToken')}`;
        }

        return Promise.resolve(config);
    }
);

export default axios;