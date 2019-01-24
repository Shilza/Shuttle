'use strict';

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model');

class Friendship extends Model {

    static get updatedAtColumn () {
        return null;
    }
}

module.exports = Friendship;
