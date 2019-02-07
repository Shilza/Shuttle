'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model');

class Like extends Model {
    static get updatedAtColumn () {
        return null;
    }

    posts () {
        return this.hasOne('App/Models/Post', 'entity_id', 'id')
    }

    comments () {
        return this.hasOne('App/Models/Comment', 'entity_id', 'id')
    }
}

module.exports = Like;
