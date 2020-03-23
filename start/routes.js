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
}).prefix('api/v1/auth');

Route.group(() => {
  Route.post('logout', 'AuthController.logout');
  Route.post('revokeAll', 'AuthController.revokeAll');
  Route.post('me', 'AuthController.me');
  Route.post('refresh', 'AuthController.refresh');
}).prefix('api/v1/auth').middleware(['auth:jwt']);

Route.group(() => {
  Route.post('reset', 'PasswordController.reset');
  Route.post('update', 'PasswordController.update');
}).prefix('api/v1/auth/password');

Route.group(() => {
  Route.get('', 'UserController.show');
  Route.patch('', 'UserController.update');
  Route.get('/unique', 'UserController.isNameUnique');

  Route.get('followers', 'UserController.followers');
  Route.get('follows', 'UserController.follows');

  Route.get('followersSearch', 'UserController.followersSearch');
  Route.get('followsSearch', 'UserController.followsSearch');
}).prefix('api/v1/users').middleware(['auth:jwt']);

Route.group(() => {
  Route.put('', 'UserController.updateAvatar');
  Route.delete('', 'UserController.deleteAvatar');
}).prefix('api/v1/users/avatar').middleware(['auth:jwt']);

Route.group(() => {
  Route.post('', 'UserController.makePrivate');
  Route.delete('', 'UserController.makePublic');
}).prefix('api/v1/users/privacy').middleware(['auth:jwt']);


Route.group(() => {
  Route.get('', 'PostController.showArchived');
  Route.post('', 'PostController.addToArchive');
  Route.delete('', 'PostController.deleteFromArchive');
}).prefix('api/v1/posts/archive').middleware(['auth:jwt']);

Route.group(() => {
  Route.get('', 'PostController.show');
  Route.get('/liked', 'PostController.showLikedPosts');
  Route.get('/likes', 'PostController.showLikes');
  Route.get('/marked', 'PostController.showMarkedPosts');
  Route.get('/:code', 'PostController.showPostByCode');
  Route.post('', 'PostController.create');
  Route.patch('', 'PostController.update');
  Route.delete('', 'PostController.delete');
}).prefix('api/v1/posts').middleware(['auth:jwt']);

Route.group(() => {
  Route.post('', 'CompilationController.create');
  Route.delete('', 'CompilationController.deletePost');
}).prefix('api/v1/posts/save').middleware(['auth:jwt']);

Route.group(() => {
  Route.delete('', 'MarkController.delete');
}).prefix('api/v1/marks').middleware(['auth:jwt']);

Route.group(() => {
  Route.get('', 'CommentController.show');
  Route.get('/likes', 'CommentController.showLikes');
  Route.post('', 'CommentController.create');
  Route.patch('', 'CommentController.update');
  Route.delete('', 'CommentController.delete');
}).prefix('api/v1/comments').middleware(['auth:jwt']);

Route.group(() => {
  Route.post('like', 'LikeController.like');
  Route.post('unlike', 'LikeController.unlike');
}).prefix('api/v1').middleware(['auth:jwt']);

Route.group(() => {
  Route.post('follow', 'FriendshipController.follow');
  Route.post('unfollow', 'FriendshipController.unfollow');
  Route.delete('follower', 'FriendshipController.deleteFollower');
}).prefix('api/v1/friendships').middleware(['auth:jwt']);

Route.group(() => {
  Route.get('', 'CompilationController.showCompilations');
  Route.get('/posts', 'CompilationController.showPosts');
  Route.patch('', 'CompilationController.update');
  Route.delete('', 'CompilationController.delete');
}).prefix('api/v1/compilations').middleware(['auth:jwt']);

Route.group(() => {
  Route.get('', 'BlacklistController.show');
  Route.post('', 'BlacklistController.add');
  Route.delete('', 'BlacklistController.delete');
}).prefix('api/v1/users/blacklist').middleware(['auth:jwt']);

Route.group(() => {
  Route.get('/preview', 'SubscriptionRequestController.preview');
  Route.get('', 'SubscriptionRequestController.show');
  Route.post('', 'SubscriptionRequestController.accept');
  Route.delete('', 'SubscriptionRequestController.deny');
}).prefix('api/v1/subRequests').middleware(['auth:jwt']);


Route.get('api/v1/notifications', 'NotificationController.show').middleware(['auth:jwt']);
Route.get('api/v1/feed', 'FeedController.show').middleware(['auth:jwt']);
Route.get('api/v1/privateSearch', 'SearchController.privateSearch').middleware(['auth:jwt']);
Route.get('api/v1/search', 'SearchController.search');

Route.group(() => {
  Route.get('', 'DialogController.showAll');
  Route.get('/:peerUsername', 'DialogController.show');
}).prefix('api/v1/dialogs').middleware(['auth:jwt']);


Route.get('*', ({view}) => view.render('index'));




