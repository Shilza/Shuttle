'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class PassResetSchema extends Schema {
  up () {
    this.create('pass_resets', (table) => {
      table.increments();
      table.string('token').unique();
      table.string('email').notNullable().references('email').inTable('users').onDelete('cascade');
      table.timestamps();
    })
  }

  down () {
    this.drop('pass_resets');
  }
}

module.exports = PassResetSchema;
