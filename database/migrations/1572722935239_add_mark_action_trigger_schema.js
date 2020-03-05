'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');
const Database = use('Database');

class AddMarkActionTriggerSchema extends Schema {
  async up() {
    await Database
      .raw(
        'CREATE TRIGGER `add_mark_action` AFTER INSERT ON `marks`' +
        'FOR EACH ROW BEGIN ' +
        'IF (SELECT owner_id FROM posts WHERE id = NEW.post_id) <> (SELECT id FROM users WHERE username = NEW.username)' +
        'THEN' +
        'INSERT INTO actions (receiver_id, initiator_id, type, entity_id, created_at)VALUES((SELECT id FROM users WHERE username=NEW.username), (SELECT owner_id FROM posts WHERE id = NEW.post_id), 4, NEW.post_id, NOW());' +
        'END IF;' +
        'END'
      );
  }

  async down() {
    await Database
      .raw('DROP TRIGGER `add_mark_action`');
  }
}

module.exports = AddMarkActionTriggerSchema;
