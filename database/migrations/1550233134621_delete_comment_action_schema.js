'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');
const Database = use('Database');

class DeleteCommentActionSchema extends Schema {
    async up() {
        await Database
            .raw(
                'CREATE TRIGGER `delete_comment_action` BEFORE DELETE ON `comments`' +
                'FOR EACH ROW DELETE FROM actions WHERE receiver_id = (SELECT owner_id FROM posts WHERE OLD.post_id) AND initiator_id=OLD.owner_id AND type=2 AND entity_id=OLD.id'
            );
    }

    async down() {
        await Database
            .raw('DROP TRIGGER `delete_comment_action`');
    }
}

module.exports = DeleteCommentActionSchema;
