'use strict';

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model');

class Blacklist extends Model {
    static get createdAtColumn () {
        return null;
    }

    blacklisted () {
        return this.hasMany('App/Models/User', 'blacklisted_id', 'id')
    }
}

module.exports = Blacklist;
