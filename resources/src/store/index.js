import {applyMiddleware,createStore} from 'redux';
import RootReducer from './reducers/index';
import thunk from 'redux-thunk';
import logout from './middlewares/logout';

const store = createStore(
    RootReducer,
    applyMiddleware(thunk, logout)
);

export default store;