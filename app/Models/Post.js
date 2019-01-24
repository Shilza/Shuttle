'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model');

class Post extends Model {
    /**
     * @returns {string[]}
     */
    static get hidden() {
        return ['updated_at']
    }

    comments () {
        return this.hasMany('App/Models/Comment')
    }

    likes () {
        return this.hasMany('App/Models/Like', 'id', 'entity_id')
    }

    owner () {
        return this.belongsTo('App/Models/User');
    }
}

module.exports = Post;
