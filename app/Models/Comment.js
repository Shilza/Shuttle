'use strict';

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model');

class Comment extends Model {

    post () {
        return this.belongsTo('App/Models/Post');
    }

    likes () {
        return this.hasMany('App/Models/Like', 'id', 'entity_id')
    }
}

module.exports = Comment;
