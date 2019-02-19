'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');
const Database = use('Database');

class DeleteLikeActionSchema extends Schema {
    async up() {
        await Database
            .raw(
                'CREATE TRIGGER `delete_like_action` BEFORE DELETE ON `likes`' +
                'FOR EACH ROW DELETE FROM actions' +
                'WHERE receiver_id = IF(OLD.type = 1, (SELECT owner_id FROM posts WHERE id=OLD.entity_id), (SELECT owner_id FROM comments WHERE id=OLD.entity_id))' +
                'AND initiator_id=OLD.owner_id AND type=1 AND entity_id=OLD.id'
            );
    }

    async down() {
        await Database
            .raw('DROP TRIGGER `delete_like_action`');
    }
}

module.exports = DeleteLikeActionSchema;
