import './css/normalize.css';
import './css/styles.css';
import 'antd/dist/antd.css';

import React from 'react';
import {render} from 'react-dom';
import {Provider} from "react-redux";

import App from "./app/App";
import store from "./store";
import ws from "./Ws";
import * as serviceWorker from './serviceWorker';

render(
  <Provider store={store}>
    <App/>
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.register();

