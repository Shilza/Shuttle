'use strict'

const {ServiceProvider} = require('@adonisjs/fold')

class NotificationProvider extends ServiceProvider {
    /**
     * Register namespaces to the IoC container
     *
     * @method register
     *
     * @return {void}
     */
    register() {
        this.app.singleton('Adonis/Addons/NotificationsService', () => {
            const NotificationsService = require('../app/Services/NotificationsService');
            return new NotificationsService();
        });
    }

    /**
     * Attach context getter when all providers have
     * been registered
     *
     * @method boot
     *
     * @return {void}
     */
    boot() {
        //
    }
}

module.exports = NotificationProvider;
