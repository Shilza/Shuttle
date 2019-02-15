'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class ActionsSchema extends Schema {
    up() {
        this.create('actions', (table) => {
            table.integer('receiver_id').unsigned().notNullable().references('id').inTable('users').onDelete('cascade');
            table.integer('initiator_id').unsigned().notNullable().references('id').inTable('users').onDelete('cascade');
            table.integer('type').unsigned().notNullable().references('id').inTable('action_types');
            table.integer('entity_id').notNullable();
            table.boolean('is_read').defaultTo(false);
            table.timestamp('created_at');
        })
    }

    down() {
        this.drop('actions');
    }
}

module.exports = ActionsSchema;
