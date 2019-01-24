'use strict';

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class FriendshipSchema extends Schema {
  up () {
    this.create('friendships', (table) => {
        table.integer('user_id').unsigned().notNullable().references('id').inTable('users').onDelete('cascade');
        table.integer('subscriber_id').unsigned().notNullable().references('id').inTable('users').onDelete('cascade');
        table.timestamp('created_at');

        table.primary(['user_id', 'subscriber_id']);
    })
  }

  down () {
    this.drop('friendships')
  }
}

module.exports = FriendshipSchema;
