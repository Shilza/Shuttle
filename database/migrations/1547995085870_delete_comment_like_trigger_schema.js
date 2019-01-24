'use strict';

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');
const Database = use('Database');

class DeleteCommentLikeTriggerSchema extends Schema {
  async up () {
      await Database
          .raw(
              'CREATE TRIGGER `delete_comment_like` AFTER DELETE ON `comments`\n' +
              ' FOR EACH ROW DELETE FROM likes\n' +
              ' WHERE owner_id = OLD.owner_id\n' +
              ' AND entity_id=OLD.id AND type = 2'
          );
  }

  async down () {
      await Database
          .raw('DROP TRIGGER `delete_comment_like`');
  }
}

module.exports = DeleteCommentLikeTriggerSchema;
