'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');
const Database = use('Database');

class AddFollowsActionSchema extends Schema {
    async up() {
        await Database
            .raw(
                'CREATE TRIGGER `add_follows_action` AFTER INSERT ON `friendships' +
                'FOR EACH ROW INSERT INTO actions (receiver_id, initiator_id, type, entity_id, created_at)' +
                'VALUES(NEW.user_id, NEW.subscriber_id, 3, NEW.subscriber_id, NOW())'
            );
    }

    async down() {
        await Database
            .raw('DROP TRIGGER `add_follows_action`');
    }
}

module.exports = AddFollowsActionSchema;
