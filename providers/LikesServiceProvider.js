'use strict'

const { ServiceProvider } = require('@adonisjs/fold')

class LikesServiceProvider extends ServiceProvider {
  /**
   * Register namespaces to the IoC container
   *
   * @method register
   *
   * @return {void}
   */
  register () {
      this.app.singleton('Adonis/Addons/LikesService', () => {
          const LikesService = require('../app/Services/LikesService');
          return new LikesService();
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

module.exports = LikesServiceProvider
