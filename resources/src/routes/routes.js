import Welcome from '../pages/Welcome/Welcome'
import User from '../pages/User/User'
import Home from '../pages/Home/Home'
import Register from '../components/Welcome/Register/Register'
import ForgotPass from '../components/Welcome/ForgotPass/ForgotPass'
import ResetPass from '../components/Welcome/ResetPass/ResetPass'
import PostByCode from "../pages/PostByCode/PostByCode";
import Archive from "../components/Archive/Archive";
import LikedPosts from "../components/LikedPosts/LikedPosts";
import Blacklist from "../components/Blacklist/Blacklist";

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
    },
    {
        path: '/p/:code',
        exact: true,
        auth: true,
        component: PostByCode
    },
    {
        path: '/posts/archive',
        exact: true,
        auth: true,
        component: Archive
    },
    {
        path: '/posts/liked',
        exact: true,
        auth: true,
        component: LikedPosts
    },
    {
        path: '/account/blacklist',
        exact: true,
        auth: true,
        component: Blacklist
    }
];