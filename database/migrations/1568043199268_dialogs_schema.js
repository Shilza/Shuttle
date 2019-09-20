'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class DialogsSchema extends Schema {
  up () {
    this.create('dialogs', (table) => {
      table.increments();
      table.integer('owner_id').unsigned().notNullable().references('id').inTable('users').onDelete('cascade');
      table.integer('receiver_id').unsigned().notNullable().references('id').inTable('users').onDelete('cascade');
      table.string('message', 1000).notNullable();
      table.boolean('read').defaultTo(false);
      table.timestamps();
    })
  }

  down () {
    this.drop('dialogs')
  }
}

module.exports = DialogsSchema
