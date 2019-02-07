'use strict'

const { ServiceProvider } = require('@adonisjs/fold')

class PostsServiceProvider extends ServiceProvider {
  /**
   * Register namespaces to the IoC container
   *
   * @method register
   *
   * @return {void}
   */
  register () {
      this.app.singleton('Adonis/Addons/PostsService', () => {
          const PostsService = require('../app/Services/PostsService');
          return new PostsService();
      })
  }

  /**
   * Attach context getter when all providers have
   * been registered
   *
   * @method boot
   *
   * @return {void}
   */
  boot () {
    //
  }
}

module.exports = PostsServiceProvider;
