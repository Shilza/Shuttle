'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ActionTypesSchema extends Schema {
  up () {
    this.create('action_types', (table) => {
        table.integer('id').unsigned().notNullable().primary();
        table.string('type').notNullable().unique();
    })
  }

  down () {
    this.drop('action_types')
  }
}

module.exports = ActionTypesSchema
