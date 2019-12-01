'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class MarksSchema extends Schema {
  up () {
    this.create('marks', (table) => {
      table.increments();
      table.integer('post_id').unsigned().notNullable().references('id').inTable('posts').onDelete('cascade');
      table.string('username', 16).notNullable().references('username').inTable('users').onDelete('cascade');
      table.integer('top');
      table.integer('left');
      table.timestamp('created_at');
    })
  }

  down () {
    this.drop('marks')
  }
}

module.exports = MarksSchema;
