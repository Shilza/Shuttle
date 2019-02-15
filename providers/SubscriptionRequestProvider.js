'use strict'

const {ServiceProvider} = require('@adonisjs/fold')

class SubscriptionRequestProvider extends ServiceProvider {
    /**
     * Register namespaces to the IoC container
     *
     * @method register
     *
     * @return {void}
     */
    register() {
        this.app.singleton('Adonis/Addons/SubscriptionRequestsService', () => {
            const SubscriptionRequestsService = require('../app/Services/SubscriptionRequestsService');
            return new SubscriptionRequestsService();
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
    boot() {
        //
    }
}

module.exports = SubscriptionRequestProvider
