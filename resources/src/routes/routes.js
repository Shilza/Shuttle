import Welcome from '../pages/Welcome/Welcome'
import User from '../pages/User/User'
import Feed from '../pages/Feed/Feed'
import Register from '../components/Welcome/Register/Register'
import ForgotPass from '../components/Welcome/ForgotPass/ForgotPass'
import ResetPass from '../components/Welcome/ResetPass/ResetPass'
import PostByCode from "../pages/PostByCode/PostByCode";
import Archive from "../pages/Archive/Archive";
import LikedPosts from "../pages/LikedPosts/LikedPosts";
import Blacklist from "../pages/Blacklist/Blacklist";
import Notifications from "../pages/Notifications/Notifications";

export const routes = [
    {
        path: '/',
        exact: true,
        auth: true,
        component: Feed
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
    },
    {
        path: '/account/notifications',
        exact: true,
        auth: true,
        component: Notifications
    }
];