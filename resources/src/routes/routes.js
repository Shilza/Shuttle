import Welcome from '../pages/Welcome/Welcome'
import User from '../pages/User/User'
import Home from '../pages/Home/Home'
import Register from '../components/Welcome/Register/Register'
import ForgotPass from '../components/Welcome/ForgotPass/ForgotPass'
import ResetPass from '../components/Welcome/ResetPass/ResetPass'

export const routes = [
    {
        path: '/',
        exact: true,
        auth: true,
        component: Home
    },
    {
        path: '/',
        exact: true,
        auth: false,
        component: Welcome
    },
    {
        path: '/login',
        exact: true,
        auth: false,
        component: Welcome
    },
    {
        path: '/register',
        exact: true,
        auth: false,
        component: Register
    },
    {
        path: '/password-reset',
        exact: true,
        auth: false,
        component: ForgotPass
    },
    {
        path: '/:username',
        exact: true,
        auth: true,
        component: User
    },
    {
        path: '/password-update/:token/:email',
        exact: true,
        auth: false,
        component: ResetPass
    }
];