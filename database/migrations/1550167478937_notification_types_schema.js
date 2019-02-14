'use strict';

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class NotificationTypesSchema extends Schema {
    up() {
        this.create('notification_types', (table) => {
            table.integer('id').unsigned().notNullable().primary();
            table.string('type').notNullable().unique();
        });
    }

    down() {
        this.drop('notification_types');
    }
}

module.exports = NotificationTypesSchema;
