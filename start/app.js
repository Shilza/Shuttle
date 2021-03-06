'use strict';

/*
|--------------------------------------------------------------------------
| Providers
|--------------------------------------------------------------------------
|
| Providers are building blocks for your Adonis app. Anytime you install
| a new Adonis specific package, chances are you will register the
| provider here.
|
*/
const path = use('path');

const providers = [
  '@adonisjs/framework/providers/AppProvider',
  '@adonisjs/framework/providers/ViewProvider',
  '@adonisjs/lucid/providers/LucidProvider',
  '@adonisjs/bodyparser/providers/BodyParserProvider',
  '@adonisjs/cors/providers/CorsProvider',
  '@adonisjs/shield/providers/ShieldProvider',
  '@adonisjs/session/providers/SessionProvider',
  '@adonisjs/auth/providers/AuthProvider',
  '@adonisjs/validator/providers/ValidatorProvider',
  '@adonisjs/mail/providers/MailProvider',
  '@adonisjs/websocket/providers/WsProvider',
  path.join(__dirname, '..', 'providers', 'CValidatorProvider'),
  path.join(__dirname, '..', 'providers', 'PostsServiceProvider'),
  path.join(__dirname, '..', 'providers', 'LikesServiceProvider'),
  path.join(__dirname, '..', 'providers', 'CommentsServiceProvider'),
  path.join(__dirname, '..', 'providers', 'UsersServiceProvider'),
  path.join(__dirname, '..', 'providers', 'CompilationsServiceProvider'),
  path.join(__dirname, '..', 'providers', 'SubscriptionRequestProvider'),
  path.join(__dirname, '..', 'providers', 'FriendshipProvider'),
  path.join(__dirname, '..', 'providers', 'NotificationProvider'),
  path.join(__dirname, '..', 'providers', 'CloudinaryProvider'),
];

/*
|--------------------------------------------------------------------------
| Ace Providers
|--------------------------------------------------------------------------
|
| Ace providers are required only when running ace commands. For example
| Providers for migrations, tests etc.
|
*/
const aceProviders = [
  '@adonisjs/lucid/providers/MigrationsProvider',
  '@adonisjs/vow/providers/VowProvider'
];

/*
|--------------------------------------------------------------------------
| Aliases
|--------------------------------------------------------------------------
|
| Aliases are short unique names for IoC container bindings. You are free
| to create your own aliases.
|
| For example:
|   { Route: 'Adonis/Src/Route' }
|
*/
const aliases = {
  CValidator: 'Adonis/Addons/CValidator',
  PostsService: 'Adonis/Addons/PostsService',
  LikesService: 'Adonis/Addons/LikesService',
  CommentsService: 'Adonis/Addons/CommentsService',
  CompilationsService: 'Adonis/Addons/CompilationsService',
  UsersService: 'Adonis/Addons/UsersService',
  SubscriptionRequestsService: 'Adonis/Addons/SubscriptionRequestsService',
  FriendshipsService: 'Adonis/Addons/FriendshipsService',
  NotificationsService: 'Adonis/Addons/NotificationsService',
  CloudinaryService: 'Adonis/Addons/CloudinaryService'
};

/*
|--------------------------------------------------------------------------
| Commands
|--------------------------------------------------------------------------
|
| Here you store ace commands for your package
|
*/
const commands = [];

module.exports = {providers, aceProviders, aliases, commands};
