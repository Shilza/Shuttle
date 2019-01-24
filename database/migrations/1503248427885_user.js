'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class UserSchema extends Schema {
  up () {
    this.create('users', (table) => {
      table.increments();
      table.string('username', 16).notNullable().unique();
      table.string('email', 254).notNullable().unique();
      table.string('password', 60).notNullable();
      table.string('bio', 100);
      table.string('avatar');
      table.timestamps();
    })
  }

  down () {
    this.drop('users');
  }
}

module.exports = UserSchema;
