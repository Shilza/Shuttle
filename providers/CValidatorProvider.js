'use strict';

const {ServiceProvider} = require('@adonisjs/fold');

class CValidatorProvider extends ServiceProvider {
    /**
     * Register namespaces to the IoC container
     *
     * @method register
     *
     * @return {void}
     */
    register() {
        this.app.singleton('Adonis/Addons/CValidator', () => {
            const CValidator = require('../app/Utils/CValidator/index');
            return new CValidator();
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

module.exports = CValidatorProvider;
