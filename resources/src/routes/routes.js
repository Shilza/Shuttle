import {lazy} from "react";

const Welcome = lazy(() => import('pages/Welcome'));
const User = lazy(() => import('pages/User'));
const Feed = lazy(() => import('pages/Feed'));
const Register = lazy(() => import('components/Welcome/Register/Register'));
const ForgotPass = lazy(() => import('components/Welcome/ForgotPass/ForgotPass'));
const ResetPass = lazy(() => import('components/Welcome/ResetPass/ResetPass'));
const PostByCode = lazy(() => import('pages/PostByCode'));
const Archive = lazy(() => import('pages/Archive'));
const LikedPosts = lazy(() => import('pages/LikedPosts'));
const Blacklist = lazy(() => import('pages/Blacklist'));
const Notifications = lazy(() => import('pages/Notifications'));
const Dialogs = lazy(() => import('pages/Dialogs'));
const Dialog = lazy(() => import('pages/Dialog'));

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
    },
    {
      path: '/u/messages',
      exact: true,
      auth: true,
      component: Dialogs
    },
    {
      path: '/u/messages/:username',
      exact: true,
      auth: true,
      component: Dialog
    },
    {
      path: '*',
      exact: true,
      auth: false,
      component: Welcome
    }
];
