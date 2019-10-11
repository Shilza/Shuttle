'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class PostSchema extends Schema {
  up () {
    this.create('posts', (table) => {
      table.increments();
      table.integer('owner_id').unsigned().notNullable().references('id').inTable('users').onDelete('cascade');
      table.string('src').notNullable();
      table.string('caption', 1000).nullable();
      table.string('location', 100).nullable();
      table.boolean('archive').notNullable().defaultTo(false);
      table.timestamps();
    })
  }

  down () {
    this.drop('posts');
  }
}

module.exports = PostSchema;
