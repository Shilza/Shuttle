'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model');

class SubscriptionRequest extends Model {
    static get updatedAtColumn () {
        return null;
    }
}

module.exports = SubscriptionRequest;
