'use strict';

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class FeedSchema extends Schema {
    up() {
        this.create('feeds', (table) => {
            table.increments();
            table.integer('receiver_id').unsigned().notNullable().references('id').inTable('users').onDelete('cascade');
            table.integer('post_id').unsigned().notNullable().references('id').inTable('posts').onDelete('cascade');
            table.timestamp('created_at');
        })
    }

    down() {
        this.drop('feeds')
    }
}

module.exports = FeedSchema;
