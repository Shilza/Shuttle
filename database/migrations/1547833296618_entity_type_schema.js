'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class EntityTypeSchema extends Schema {
  up () {
    this.create('entity_types', (table) => {
      table.integer('id').unsigned().notNullable().primary();
      table.string('type').notNullable().unique();
    })
  }

  down () {
    this.drop('entity_types')
  }
}

module.exports = EntityTypeSchema
