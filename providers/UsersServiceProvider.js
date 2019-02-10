'use strict'

const { ServiceProvider } = require('@adonisjs/fold')

class UsersServiceProvider extends ServiceProvider {
    /**
     * Register namespaces to the IoC container
     *
     * @method register
     *
     * @return {void}
     */
    register () {
        this.app.singleton('Adonis/Addons/UsersService', () => {
            const UsersService = require('../app/Services/UsersService');
            return new UsersService();
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

module.exports = UsersServiceProvider;
