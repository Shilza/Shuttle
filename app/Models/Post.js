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

  static scopeArchived(query) {
    return query.where('archive', true);
  }

  static scopeNotArchived(query) {
    return query.where('archive', false);
  }

  comments() {
    return this.hasMany('App/Models/Comment');
  }

  feedComments() {
    return this.hasMany('App/Models/Comment').withCount('likes').limit(3);
  }

  likes() {
    return this.hasMany('App/Models/Like', 'id', 'entity_id').where('type', 1);
  }

  owner() {
    return this.belongsTo('App/Models/User');
  }

  marks() {
    return this.hasMany('App/Models/Mark');
  }
}

module.exports = Post;
