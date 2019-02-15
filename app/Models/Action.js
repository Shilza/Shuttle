'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Action extends Model {
    static get updatedAtColumn () {
        return null;
    }
}

module.exports = Action
