'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');
const Database = use('Database');

class DeleteFollowsActionSchema extends Schema {
    async up() {
        await Database
            .raw(
                'DELETE FROM actions WHERE receiver_id=OLD.user_id AND initiator_id=OLD.subscriber_id AND type=3 AND entity_id=OLD.subscriber_id'
            );
    }

    async down() {
        await Database
            .raw('DROP TRIGGER `delete_follows_action`');
    }
}

module.exports = DeleteFollowsActionSchema;
