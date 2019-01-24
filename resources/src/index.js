import './css/normalize.css';
import 'antd/dist/antd.css';
import * as serviceWorker from './serviceWorker';
import React from 'react';
import store from './store';
import {render} from 'react-dom';
import Routes from "./routes";
import Provider from "react-redux/es/components/Provider";
import * as AuthService from './services/auth';
import Loader from "./components/Loader/Loader";


void async function () {
    if (localStorage.hasOwnProperty('accessToken')) {
        render(
            <Loader/>,
            document.getElementById('root')
        );

        await store
            .dispatch(AuthService.me())
            .catch(() => {});
    }

    render(
        <Provider store={store}>
            <Routes/>
        </Provider>,
        document.getElementById('root')
    );
}();

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
