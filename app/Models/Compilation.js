'use strict';

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model');

class Compilation extends Model {

    static get updatedAtColumn () {
        return null;
    }

    post () {
        return this.belongsTo('App/Models/Post', 'post_id', 'id');
    }
}

module.exports = Compilation;
