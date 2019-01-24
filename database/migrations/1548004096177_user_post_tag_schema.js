'use strict';

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class UserPostTagSchema extends Schema {
  up () {
    this.create('user_post_tags', (table) => {
      table.increments();
      table.integer('owner_id').unsigned().notNullable().references('id').inTable('users').onDelete('cascade');
      table.integer('tagged_user_id').unsigned().notNullable().references('id').inTable('users').onDelete('cascade');
      table.integer('x').unsigned().notNullable();
      table.integer('y').unsigned().notNullable();
      table.timestamp('created_at');
    })
  }

  down () {
    this.drop('user_post_tags')
  }
}

module.exports = UserPostTagSchema;
