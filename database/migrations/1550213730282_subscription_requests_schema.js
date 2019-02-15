'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class SubscriptionRequestsSchema extends Schema {
    up() {
        this.create('subscription_requests', (table) => {
            table.increments();
            table.integer('receiver_id').unsigned().notNullable().references('id').inTable('users').onDelete('cascade');
            table.integer('subscriber_id').unsigned().notNullable().references('id').inTable('users').onDelete('cascade');
            table.timestamp('created_at');
        });
    }

    down() {
        this.drop('subscription_requests');
    }
}

module.exports = SubscriptionRequestsSchema;
