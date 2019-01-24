'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class CommentSchema extends Schema {
    up() {
        this.create('comments', (table) => {
            table.increments();
            table.integer('post_id').unsigned().notNullable().references('id').inTable('posts').onDelete('cascade');
            table.integer('owner_id').unsigned().notNullable().references('id').inTable('users').onDelete('cascade');
            table.string('text', 1000).notNullable();
            table.timestamps();
        })
    }

    down() {
        this.drop('comments')
    }
}

module.exports = CommentSchema
