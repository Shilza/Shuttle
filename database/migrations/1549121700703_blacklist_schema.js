'use strict';

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class BlacklistSchema extends Schema {
    up() {
        this.create('blacklists', (table) => {
            table.integer('user_id').unsigned().notNullable().references('id').inTable('users').onDelete('cascade');
            table.integer('blacklisted_id').unsigned().notNullable().references('id').inTable('users').onDelete('cascade');
            table.timestamp('updated_at');

            table.primary(['user_id', 'blacklisted_id']);
        });
    }

    down() {
        this.drop('blacklists');
    }
}

module.exports = BlacklistSchema;
