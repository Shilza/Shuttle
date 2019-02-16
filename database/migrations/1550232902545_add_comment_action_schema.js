'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');
const Database = use('Database');

class AddCommentActionSchema extends Schema {
    async up() {
        await Database
            .raw(
                'CREATE TRIGGER `add_comment_action` AFTER INSERT ON `comments' +
                'FOR EACH ROW INSERT INTO actions (receiver_id, initiator_id, type, entity_id, created_at)' +
                'VALUES((SELECT owner_id FROM posts WHERE id=new.post_id),' +
                'NEW.owner_id, 2, NEW.id, NOW())'
            );
    }

    async down() {
        await Database
            .raw('DROP TRIGGER `add_comment_action`');
    }
}

module.exports = AddCommentActionSchema;
