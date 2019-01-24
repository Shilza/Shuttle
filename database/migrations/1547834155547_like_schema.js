'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class LikeSchema extends Schema {
  up () {
    this.create('likes', (table) => {
      table.increments();
      table.integer('type').unsigned().notNullable().references('id').inTable('entity_types');
      table.integer('entity_id').notNullable();
      table.integer('owner_id').unsigned().notNullable().references('id').inTable('users').onDelete('cascade');
      table.timestamp('created_at');
    })
  }

  down () {
    this.drop('likes')
  }
}

module.exports = LikeSchema
