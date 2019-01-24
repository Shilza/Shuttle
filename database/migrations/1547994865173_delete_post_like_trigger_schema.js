'use strict';

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');
const Database = use('Database');

class DeletePostLikeTriggerSchema extends Schema {
    async up() {
        await Database
            .raw(
                'CREATE TRIGGER `delete_post_like` AFTER DELETE ON `posts`\n' +
                'FOR EACH ROW DELETE FROM likes\n' +
                'WHERE owner_id = OLD.owner_id\n' +
                'AND entity_id=OLD.id AND type = 1'
            );
    }

    async down() {
        await Database
            .raw('DROP TRIGGER `delete_post_like`');
    }
}

module.exports = DeletePostLikeTriggerSchema;
