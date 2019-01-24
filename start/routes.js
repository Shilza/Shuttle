'use strict';

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URL's and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route');


Route.group(() => {
    Route.post('register', 'AuthController.register');
    Route.post('login', 'AuthController.login');
    Route.post('refresh', 'AuthController.refresh');
}).prefix('api/v1/auth');

Route.group(() => {
    Route.post('reset', 'PasswordController.reset');
    Route.post('update', 'PasswordController.update');
}).prefix('api/v1/auth/password');

Route.group(() => {
    Route.post('logout', 'AuthController.logout');
    Route.post('revokeAll', 'AuthController.revokeAll');
    Route.post('me', 'AuthController.me');
}).prefix('api/v1/auth').middleware(['auth:jwt']);

Route.group(() => {
    Route.put('avatar', 'UserController.updateAvatar');
    Route.delete('avatar', 'UserController.deleteAvatar');
}).prefix('api/v1/users').middleware(['auth:jwt']);

Route.group(() => {
    Route.get('', 'UserController.show');
    Route.get('followers', 'UserController.followers');
    Route.get('follows', 'UserController.follows');
}).prefix('api/v1/users');


Route.group(() => {
    Route.get('posts', 'PostC' +
        'ontroller.show');
    Route.post('posts', 'PostController.create');
    Route.patch('posts', 'PostController.update');
    Route.delete('posts', 'PostController.delete');
}).prefix('api/v1').middleware(['auth:jwt']);

Route.group(() => {
    Route.get('comments', 'CommentController.show');
    Route.post('comments', 'CommentController.create');
    Route.patch('comments', 'CommentController.update');
    Route.delete('comments', 'CommentController.delete');
}).prefix('api/v1').middleware(['auth:jwt']);

Route.group(() => {
    Route.post('like', 'LikeController.like');
    Route.post('unlike', 'LikeController.unlike');
}).prefix('api/v1').middleware(['auth:jwt']);

Route.group(() => {
    Route.post('follow', 'FriendshipController.follow');
    Route.post('unfollow', 'FriendshipController.unfollow');
}).prefix('api/v1/friendships').middleware(['auth:jwt']);

Route.get('api/v1/feed', 'FeedController.show').middleware(['auth:jwt']);
Route.get('api/v1/search', 'SearchController.search');

Route.get('*', ({view}) => view.render('index'));




