'use strict'

const { ServiceProvider } = require('@adonisjs/fold')

class CompilationsServiceProvider extends ServiceProvider {
  /**
   * Register namespaces to the IoC container
   *
   * @method register
   *
   * @return {void}
   */
  register () {
      this.app.singleton('Adonis/Addons/CompilationsService', () => {
          const CompilationsService = require('../app/Services/CompilationsService');
          return new CompilationsService();
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

module.exports = CompilationsServiceProvider
