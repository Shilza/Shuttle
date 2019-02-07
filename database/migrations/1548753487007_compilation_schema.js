'use strict';

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class CompilationSchema extends Schema {
    up() {
        this.create('compilations', (table) => {
            table.increments();
            table.integer('owner_id').unsigned().notNullable().references('id').inTable('users').onDelete('cascade');
            table.integer('post_id').unsigned().notNullable().references('id').inTable('posts').onDelete('cascade');
            table.string('name', 32).defaultTo('All');
            table.timestamp('created_at');
        });
    }

    down() {
        this.drop('compilations');
    }
}

module.exports = CompilationSchema;
