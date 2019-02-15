'use strict'

const { ServiceProvider } = require('@adonisjs/fold')

class FriendshipProvider extends ServiceProvider {
  /**
   * Register namespaces to the IoC container
   *
   * @method register
   *
   * @return {void}
   */
  register () {
      this.app.singleton('Adonis/Addons/FriendshipsService', () => {
          const FriendshipsService = require('../app/Services/FriendshipsService');
          return new FriendshipsService();
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

module.exports = FriendshipProvider
