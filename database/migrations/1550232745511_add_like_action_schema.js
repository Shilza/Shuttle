'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');
const Database = use('Database');

class AddLikeActionSchema extends Schema {
    async up() {
        await Database
            .raw(
                'CREATE TRIGGER `add_like_action` AFTER INSERT ON `likes ' +
                'FOR EACH ROW INSERT INTO actions (receiver_id, initiator_id, type, entity_id)' +
                'VALUES(IF(NEW.type=1, (SELECT owner_id FROM posts WHERE id=NEW.entity_id), (SELECT owner_id FROM comments WHERE id=NEW.entity_id)), ' +
                'NEW.owner_id, 1, NEW.id)'
            );
    }

    async down() {
        await Database
            .raw('DROP TRIGGER `add_like_action`');
    }
}

module.exports = AddLikeActionSchema;
